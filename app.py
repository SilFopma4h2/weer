import logging
import os
import sys
from datetime import datetime
from typing import Any, Dict, List, Optional, Tuple

import httpx
import uvicorn
from cachetools import TTLCache
from dotenv import load_dotenv
from fastapi import FastAPI, Form, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from auth import get_current_user, sanitize_input, validate_email, validate_password
from database import (
    GameMoveTracker,
    LocationLoadTracker,
    SessionManager,
    UserManager,
    init_database,
)
from translations import SUPPORTED_LANGUAGES, get_weather_description

# ---------------------------------------------------------------------------
# Setup
# ---------------------------------------------------------------------------
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger("weer")

try:
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
except (AttributeError, ValueError):
    pass

load_dotenv()

app = FastAPI(title="Weer App", description="Lokale weer-app met authenticatie")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the SQLite database
init_database()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Configuration from environment
DEFAULT_LAT = float(os.getenv("DEFAULT_LAT", "52.3676"))
DEFAULT_LON = float(os.getenv("DEFAULT_LON", "4.9041"))
CACHE_DURATION = int(os.getenv("CACHE_DURATION", "600"))

TZ = "Europe/Amsterdam"
FORECAST_BASE = "https://api.open-meteo.com/v1/forecast"
AIR_QUALITY_BASE = "https://air-quality-api.open-meteo.com/v1/air-quality"

# Simple in-memory TTL cache keyed by the resolved parameters
cache = TTLCache(maxsize=256, ttl=CACHE_DURATION)

# Shared async HTTP client (non-blocking)
_client = httpx.AsyncClient(timeout=6.0, follow_redirects=True)


async def _fetch_json(
    url: str, params: Dict[str, Any], headers: Optional[Dict[str, str]] = None
) -> Dict[str, Any]:
    """Fetch JSON from a URL, returning {} on any failure."""
    try:
        response = await _client.get(url, params=params, headers=headers)
        response.raise_for_status()
        return response.json()
    except httpx.HTTPError as exc:
        logger.warning("Request failed (%s, %s): %s", url, params, exc)
        return {}


async def _cached_get(base_url: str, key: str, params: Dict[str, Any]) -> Dict[str, Any]:
    cache_key = f"{key}|{params.get('latitude')}|{params.get('longitude')}"
    if cache_key in cache:
        return cache[cache_key]
    data = await _fetch_json(base_url, params)
    if data:
        cache[cache_key] = data
    return data


# ---------------------------------------------------------------------------
# Location helpers
# ---------------------------------------------------------------------------
MAJOR_CITIES: List[Tuple[Tuple[float, float], str]] = [
    ((52.3676, 4.9041), "Amsterdam"),
    ((52.0907, 5.1214), "Utrecht"),
    ((51.9225, 4.4792), "Rotterdam"),
    ((52.1601, 4.4970), "Den Haag"),
    ((51.4416, 5.4697), "Eindhoven"),
    ((51.5074, -0.1278), "Londen"),
    ((48.8566, 2.3522), "Parijs"),
    ((52.5200, 13.4050), "Berlijn"),
    ((41.9028, 12.4964), "Rome"),
    ((40.4168, -3.7038), "Madrid"),
    ((48.2082, 16.3738), "Wenen"),
    ((48.1351, 11.5820), "München"),
    ((53.5511, 9.9937), "Hamburg"),
    ((50.1109, 8.6821), "Frankfurt"),
    ((50.8503, 4.3517), "Brussel"),
    ((48.8566, 2.3522), "Parijs"),
]


def _matches_city(lat: float, lon: float) -> Optional[str]:
    for (city_lat, city_lon), name in MAJOR_CITIES:
        if abs(lat - city_lat) < 0.05 and abs(lon - city_lon) < 0.05:
            return name
    return None


async def get_location_name(lat: float, lon: float) -> Optional[str]:
    """Reverse-geocode coordinates via Nominatim, falling back to a known city."""
    name = _matches_city(lat, lon)
    if name:
        return name
    try:
        params = {
            "lat": lat,
            "lon": lon,
            "format": "json",
            "addressdetails": 1,
            "accept-language": "nl,en",
        }
        headers = {"User-Agent": "Weer-App/1.0 (weather-app)"}
        data = await _fetch_json(
            "https://nominatim.openstreetmap.org/reverse", params, headers=headers
        )
        if not data:
            return None
        address = data.get("address", {})
        place = (
            address.get("village")
            or address.get("town")
            or address.get("city")
            or address.get("municipality")
            or address.get("county")
            or address.get("state")
            or address.get("country")
        )
        return place.title() if place else None
    except Exception as exc:  # pragma: no cover - defensive
        logger.warning("Geocoding failed for %s,%s: %s", lat, lon, exc)
        return None


def _resolve_coords(user: Optional[Dict[str, Any]]) -> Tuple[float, float]:
    """Use the user's saved location, otherwise the configured default."""
    if user and user.get("location") and "," in user["location"]:
        try:
            lat_str, lon_str = user["location"].split(",", 1)
            return float(lat_str.strip()), float(lon_str.strip())
        except (ValueError, AttributeError):
            pass
    return DEFAULT_LAT, DEFAULT_LON


# ---------------------------------------------------------------------------
# Weather helpers
# ---------------------------------------------------------------------------
def get_weather_icon(weather_code: int, is_day: bool = True) -> str:
    """Map a WMO weather code to an icon identifier used by the frontend."""
    suffix = "d" if is_day else "n"
    code = weather_code
    if code == 0:
        return f"01{suffix}"
    if code in (1, 2):
        return f"02{suffix}"
    if code == 3:
        return f"03{suffix}"
    if code in (45, 48):
        return f"50{suffix}"
    if code in (51, 53, 55, 61, 63, 65, 66, 67):
        return f"10{suffix}"
    if code in (71, 73, 75, 77, 85, 86):
        return f"13{suffix}"
    if code in (80, 81, 82):
        return f"09{suffix}"
    if code in (95, 96, 99):
        return f"11{suffix}"
    return f"02{suffix}"


def _f(val: Optional[float], default: float = 0.0) -> float:
    """Return a float or a default, guarding against None."""
    try:
        return float(val)
    except (TypeError, ValueError):
        return default


def _is_day_hour(datetime_str: str) -> bool:
    """Bestimate day/night from an hourly timestamp (e.g. '2026-08-05T14:00')."""
    try:
        hour = int(datetime_str[11:13])
    except (ValueError, IndexError, TypeError):
        return True
    return 6 <= hour < 20


def _location_block(lat: float, lon: float, location_name: Optional[str]) -> Dict[str, Any]:
    """Build a consistent location payload for API responses."""
    if location_name:
        name, coords = location_name, f"Lat: {lat}, Lon: {lon}"
    else:
        name, coords = f"Lat: {lat}, Lon: {lon}", None
    return {"name": name, "coords": coords, "lat": lat, "lon": lon}


async def _locate_and_track(request: Request) -> Tuple[float, float, Optional[str]]:
    """Resolve coordinates and return (lat, lon, location_name)."""
    user = get_current_user(request)
    lat, lon = _resolve_coords(user)
    location_name = await get_location_name(lat, lon)
    LocationLoadTracker.log_location_load(
        lat, lon, location_name, user["id"] if user else None
    )
    return lat, lon, location_name


# ---------------------------------------------------------------------------
# Page routes
# ---------------------------------------------------------------------------
def _user_to_template_context(user: Optional[dict]) -> Optional[dict]:
    """Convert user dict to template-safe context (only hashable primitives)."""
    if user is None:
        return None
    return {"email": user.get("email"), "location": user.get("location")}


@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    user = get_current_user(request)
    return templates.TemplateResponse(
        request, "index.html", {"request": request, "user": _user_to_template_context(user)}
    )


@app.get("/login", response_class=HTMLResponse)
async def login_page(request: Request):
    user = get_current_user(request)
    if user:
        return RedirectResponse(url="/", status_code=status.HTTP_302_FOUND)
    return templates.TemplateResponse(request, "index.html", {"request": request, "show_login": True})


@app.get("/register", response_class=HTMLResponse)
async def register_page(request: Request):
    user = get_current_user(request)
    if user:
        return RedirectResponse(url="/", status_code=status.HTTP_302_FOUND)
    return templates.TemplateResponse(request, "index.html", {"request": request, "show_register": True})


@app.get("/settings", response_class=HTMLResponse)
async def settings_page(request: Request):
    user = get_current_user(request)
    if not user:
        return RedirectResponse(url="/login", status_code=status.HTTP_302_FOUND)
    return templates.TemplateResponse(
        request, "index.html", {"request": request, "user": _user_to_template_context(user), "show_settings": True}
    )


def _set_session_cookie(response: RedirectResponse, session_id: str):
    response.set_cookie(
        key="session_id",
        value=session_id,
        max_age=30 * 24 * 60 * 60,  # 30 days
        httponly=True,
        samesite="lax",
        secure=False,  # set True behind a reverse proxy that terminates TLS
    )


@app.post("/login")
async def login(request: Request, email: str = Form(...), password: str = Form(...)):
    email = sanitize_input(email)
    if not validate_email(email):
        return templates.TemplateResponse(
            request, "index.html", {"request": request, "show_login": True, "error": "Ongeldig e-mailadres"}
        )

    user = UserManager.authenticate_user(email, password)
    if not user:
        return templates.TemplateResponse(
            request, "index.html", {"request": request, "show_login": True, "error": "Ongeldig e-mailadres of wachtwoord"}
        )

    session_id = SessionManager.create_session(user["id"])
    if not session_id:
        return templates.TemplateResponse(
            request, "index.html", {"request": request, "show_login": True, "error": "Sessie aanmaken mislukt. Probeer opnieuw."}
        )

    response = RedirectResponse(url="/", status_code=status.HTTP_302_FOUND)
    _set_session_cookie(response, session_id)
    return response


@app.post("/register")
async def register(
    request: Request,
    email: str = Form(...),
    password: str = Form(...),
    confirm_password: str = Form(...),
    location: str = Form(default=""),
):
    email = sanitize_input(email)
    location = sanitize_input(location)

    if not validate_email(email):
        return templates.TemplateResponse(
            request, "index.html", {"request": request, "show_register": True, "error": "Ongeldig e-mailadres"}
        )
    if password != confirm_password:
        return templates.TemplateResponse(
            request, "index.html", {"request": request, "show_register": True, "error": "Wachtwoorden komen niet overeen"}
        )

    valid, message = validate_password(password)
    if not valid:
        return templates.TemplateResponse(
            request, "index.html", {"request": request, "show_register": True, "error": message}
        )

    user_id = UserManager.create_user(email, password, location or None)
    if not user_id:
        return templates.TemplateResponse(
            request, "index.html", {"request": request, "show_register": True, "error": "E-mailadres bestaat al of registratie mislukt"}
        )

    session_id = SessionManager.create_session(user_id)
    if not session_id:
        return templates.TemplateResponse(
            request, "index.html", {"request": request, "show_register": True, "error": "Registratie gelukt maar inloggen mislukt. Log handmatig in."}
        )

    response = RedirectResponse(url="/", status_code=status.HTTP_302_FOUND)
    _set_session_cookie(response, session_id)
    return response


@app.post("/logout")
async def logout(request: Request):
    session_id = request.cookies.get("session_id")
    if session_id:
        SessionManager.delete_session(session_id)
    response = RedirectResponse(url="/", status_code=status.HTTP_302_FOUND)
    response.delete_cookie("session_id")
    return response


@app.post("/settings")
async def update_settings(request: Request, location: str = Form(...)):
    user = get_current_user(request)
    if not user:
        return RedirectResponse(url="/login", status_code=status.HTTP_302_FOUND)

    location = sanitize_input(location)
    if UserManager.update_user_location(user["id"], location):
        return templates.TemplateResponse(
            request, "index.html",
            {"request": request, "user": {**_user_to_template_context(user), "location": location},
             "show_settings": True, "success": "Locatie succesvol bijgewerkt!"},
        )
    return templates.TemplateResponse(
        request, "index.html",
        {"request": request, "user": _user_to_template_context(user), "show_settings": True, "error": "Locatie bijwerken mislukt"},
    )


# ---------------------------------------------------------------------------
# Weather API routes
# ---------------------------------------------------------------------------
CURRENT_VARS = (
    "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,"
    "rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,"
    "wind_speed_10m,wind_direction_10m,wind_gusts_10m,visibility"
)
HOURLY_VARS = (
    "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,"
    "precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m"
)
DAILY_VARS = (
    "temperature_2m_max,temperature_2m_min,relative_humidity_2m_mean,weather_code,"
    "precipitation_sum,apparent_temperature_max,precipitation_probability_max,"
    "wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset,uv_index_max"
)


def _forecast_params(lat: float, lon: float) -> Dict[str, Any]:
    return {
        "latitude": lat,
        "longitude": lon,
        "current": CURRENT_VARS,
        "hourly": HOURLY_VARS,
        "daily": DAILY_VARS,
        "timezone": TZ,
        "forecast_days": 7,
    }


def _build_weather_description(code: int, is_day: bool, lang: str) -> Dict[str, Any]:
    return {
        "main": get_weather_description(code, lang),
        "description": get_weather_description(code, lang),
        "icon": get_weather_icon(code, is_day),
    }


@app.get("/current")
async def get_current_weather(
    request: Request,
    lat: Optional[float] = None,
    lon: Optional[float] = None,
    lang: str = "nl",
):
    user = get_current_user(request)
    if lat is None or lon is None:
        lat, lon = _resolve_coords(user)
    location_name = None
    if _matches_city(lat, lon) or (lat == DEFAULT_LAT and lon == DEFAULT_LON):
        location_name = _matches_city(lat, lon) or "Amsterdam"
    else:
        location_name = await get_location_name(lat, lon)

    LocationLoadTracker.log_location_load(lat, lon, location_name, user["id"] if user else None)

    data = await _cached_get(FORECAST_BASE, "current", _forecast_params(lat, lon))
    if not data:
        raise HTTPException(status_code=502, detail="Weerdata niet beschikbaar")

    cur = data.get("current", {})
    is_day = cur.get("is_day", 1) == 1
    code = int(cur.get("weather_code", 0))

    current_weather = {
        "timestamp": datetime.now().isoformat(),
        "location": _location_block(lat, lon, location_name),
        "temperature": {
            "current": round(_f(cur.get("temperature_2m"))),
            "feels_like": round(_f(cur.get("apparent_temperature"))),
        },
        "humidity": round(_f(cur.get("relative_humidity_2m"))),
        "pressure": round(_f(cur.get("surface_pressure"), 1013)),
        "wind": {
            "speed": round(_f(cur.get("wind_speed_10m"))),
            "direction": round(_f(cur.get("wind_direction_10m"))),
            "gust": round(_f(cur.get("wind_gusts_10m"))) or None,
        },
        "weather": _build_weather_description(code, is_day, lang),
        "clouds": round(_f(cur.get("cloud_cover"))),
        "visibility": _f(cur.get("visibility")) if cur.get("visibility") is not None else None,
        "rain": round(_f(cur.get("precipitation")), 1),
        "snow": round(_f(cur.get("snowfall")), 1),
        "is_day": is_day,
    }
    return current_weather


@app.get("/forecast")
async def get_weather_forecast(
    request: Request,
    lat: Optional[float] = None,
    lon: Optional[float] = None,
    lang: str = "nl",
):
    user = get_current_user(request)
    if lat is None or lon is None:
        lat, lon = _resolve_coords(user)
    location_name = await get_location_name(lat, lon)
    LocationLoadTracker.log_location_load(lat, lon, location_name, user["id"] if user else None)

    data = await _cached_get(FORECAST_BASE, "forecast", _forecast_params(lat, lon))
    if not data:
        raise HTTPException(status_code=502, detail="Voorspelling niet beschikbaar")

    hourly = data.get("hourly", {})
    times = hourly.get("time", [])

    def _safely(field: str, index: int) -> float:
        arr = hourly.get(field, [])
        return _f(arr[index]) if index < len(arr) else 0.0

    # 24-hour forecast: pick 8 entries at 3-hour intervals (accurate display).
    forecast_24h: List[Dict[str, Any]] = []
    for i in range(1, 9):
        idx = (i * 3) % max(len(times), 1)
        if idx >= len(times):
            continue
        code = int(_safely("weather_code", idx))
        forecast_24h.append({
            "datetime": times[idx],
            "temperature": {
                "temp": round(_safely("temperature_2m", idx)),
                "feels_like": round(_safely("apparent_temperature", idx)),
            },
            "humidity": round(_safely("relative_humidity_2m", idx)),
            "wind": {
                "speed": round(_safely("wind_speed_10m", idx)),
                "direction": round(_safely("wind_direction_10m", idx)),
            },
            "weather": _build_weather_description(code, _is_day_hour(times[idx]), lang),
            "clouds": round(_safely("cloud_cover", idx)),
            "rain": round(_safely("precipitation", idx), 1),
            "precipitation_probability": round(_safely("precipitation_probability", idx)),
        })

    daily = data.get("daily", {})
    day_times = daily.get("time", [])

    def _daily(field: str, index: int) -> float:
        arr = daily.get(field, [])
        return _f(arr[index]) if index < len(arr) else 0.0

    forecast_7d: List[Dict[str, Any]] = []
    for i, day in enumerate(day_times[:7]):
        code = int(_daily("weather_code", i))
        max_t = _daily("temperature_2m_max", i)
        min_t = _daily("temperature_2m_min", i)
        forecast_7d.append({
            "datetime": f"{day}T12:00:00",
            "temperature": {
                "temp": round((max_t + min_t) / 2),
                "feels_like": round(_daily("apparent_temperature_max", i)),
                "min": round(min_t),
                "max": round(max_t),
            },
            "wind": {
                "speed": round(_daily("wind_speed_10m_max", i)),
                "direction": round(_daily("wind_direction_10m_dominant", i)),
            },
            "weather": _build_weather_description(code, True, lang),
            "rain": round(_daily("precipitation_sum", i), 1),
            "precipitation_probability": round(_daily("precipitation_probability_max", i)),
            "sunrise": daily.get("sunrise", [""] * 7)[i] if i < len(daily.get("sunrise", [])) else "",
            "sunset": daily.get("sunset", [""] * 7)[i] if i < len(daily.get("sunset", [])) else "",
            "uv_index_max": round(_daily("uv_index_max", i), 1),
        })

    return {
        "timestamp": datetime.now().isoformat(),
        "location": _location_block(lat, lon, location_name),
        "forecast_24h": forecast_24h,
        "forecast_7d": forecast_7d,
    }


@app.get("/alerts")
async def get_weather_alerts(
    request: Request, lat: Optional[float] = None, lon: Optional[float] = None, lang: str = "nl"
):
    user = get_current_user(request)
    if lat is None or lon is None:
        lat, lon = _resolve_coords(user)

    data = await _cached_get(FORECAST_BASE, "alerts", _forecast_params(lat, lon))
    alerts = []
    if data:
        cur = data.get("current", {})
        code = int(cur.get("weather_code", 0))
        label = get_weather_description(code, lang)
        if code in (95, 96, 99):
            alerts.append({
                "severity": "Waarschuwing",
                "title": "Onweer",
                "description": f"Onweersbuien verwacht ({label}).",
                "time": datetime.now().isoformat(),
            })
        gust = _f(cur.get("wind_gusts_10m"))
        if gust >= 75:
            alerts.append({
                "severity": "Waarschuwing",
                "title": "Zware windstoten",
                "description": f"Windstoten tot {round(gust)} km/h mogelijk.",
                "time": datetime.now().isoformat(),
            })

    return {"timestamp": datetime.now().isoformat(), "alerts": alerts}


# ---------------------------------------------------------------------------
# Feature 2 (chosen): Air Quality / Luchtkwaliteit
# ---------------------------------------------------------------------------
AIR_QUALITY_VARS = (
    "us_aqi,european_aqi,pm2_5,pm10,pm10_wildfires,uv_index,"
    "ozone,nitrogen_dioxide,sulphur_dioxide,carbon_monoxide"
)


def _aq_index_to_level(value: float, use_us: bool = True) -> Dict[str, Any]:
    """Categorise an AQI value into a human readable band + colour."""
    if use_us:
        bands = [
            (50, "Goed", "good"),
            (100, "Matig", "moderate"),
            (150, "Ongezond voor gevoelige groepen", "unhealthy"),
            (200, "Ongezond", "unhealthy"),
            (300, "Zeer ongezond", "hazardous"),
            (float("inf"), "Gevaarlijk", "hazardous"),
        ]
    else:
        bands = [
            (20, "Goed", "good"),
            (40, "Redelijk", "moderate"),
            (60, "Matig", "moderate"),
            (80, "Slecht", "unhealthy"),
            (100, "Zeer slecht", "unhealthy"),
            (float("inf"), "Extreem slecht", "hazardous"),
        ]
    for limit, label, css in bands:
        if value <= limit:
            return {"level": label, "css": css}
    return {"level": "Onbekend", "css": "moderate"}


@app.get("/air-quality")
async def get_air_quality(
    request: Request, lat: Optional[float] = None, lon: Optional[float] = None, lang: str = "nl"
):
    """Current + forecast air quality using the Open-Meteo air quality API."""
    user = get_current_user(request)
    if lat is None or lon is None:
        lat, lon = _resolve_coords(user)
    location_name = await get_location_name(lat, lon)

    params = {
        "latitude": lat,
        "longitude": lon,
        "current": AIR_QUALITY_VARS,
        "timezone": TZ,
        "forecast_days": 1,
    }
    data = await _cached_get(AIR_QUALITY_BASE, "air-quality", params)
    if not data:
        raise HTTPException(status_code=502, detail="Luchtkwaliteit niet beschikbaar")

    cur = data.get("current", {})
    us_aqi = _f(cur.get("us_aqi"))
    e_aqi = _f(cur.get("european_aqi"))
    use_us = us_aqi > 0

    def _safe(field: str) -> Optional[float]:
        v = cur.get(field)
        return round(_f(v), 1) if v is not None else None

    return {
        "timestamp": datetime.now().isoformat(),
        "location": _location_block(lat, lon, location_name),
        "aqi": {
            "value": round(us_aqi if use_us else e_aqi),
            "scale": "us" if use_us else "european",
            **(_aq_index_to_level(us_aqi if use_us else e_aqi, use_us)),
        },
        "pollutants": {
            "pm2_5": _safe("pm2_5"),
            "pm10": _safe("pm10"),
            "ozone": _safe("ozone"),
            "nitrogen_dioxide": _safe("nitrogen_dioxide"),
            "sulphur_dioxide": _safe("sulphur_dioxide"),
            "carbon_monoxide": _safe("carbon_monoxide"),
        },
        "pm10_wildfires": _safe("pm10_wildfires"),
        "uv_index": _safe("uv_index"),
    }


# ---------------------------------------------------------------------------
# Feature 1 (requested): Bosbranden / Fire Risk via Open-Meteo
# ---------------------------------------------------------------------------
def _angstrom_index(temp: float, humidity: float) -> float:
    """Angström fire-risk index: lower values mean higher risk."""
    return humidity / 20.0 + (27.0 - temp) / 10.0 - 2.0


def _fire_level(angstrom: float, wind: float) -> Dict[str, Any]:
    """Map the Angström index + wind + rain onto a 5-level risk band.

    Higher Angström values are safer. Strong wind escalates the risk.
    """
    # Base level from the Angström index (higher = safer).
    if angstrom >= 4.0:
        base = 0
    elif angstrom >= 2.5:
        base = 1
    elif angstrom >= 2.0:
        base = 2
    elif angstrom >= 1.0:
        base = 3
    else:
        base = 4

    # Strong wind spreads fire quickly and escalates the risk.
    bonus = 0
    if wind >= 75:
        bonus = 2
    elif wind >= 50:
        bonus = 1

    score = max(0, min(4, base + bonus))
    css = ("laag", "matig", "verhoogd", "hoog", "extreem")[score]
    label = {"laag": "Laag", "matig": "Matig", "verhoogd": "Verhoogd",
             "hoog": "Hoog", "extreem": "Extreem"}[css]
    return {"css": css, "level": label, "order": score}


_DESCRIPTIONS = {
    "laag": "Laag brandgevaar. Brandomstandigheden zijn gunstig.",
    "matig": "Beperkt brandgevaar. Condities voor bosbranden zijn gunstig.",
    "verhoogd": "Verhoogd brandgevaar. Droge en warme omstandigheden.",
    "hoog": "Hoog brandgevaar. Wees extra voorzichtig met open vuur.",
    "extreem": "Extreem brandgevaar. Open vuur is ten zeerste af te raden.",
}


@app.get("/fire-risk")
async def get_fire_risk(
    request: Request, lat: Optional[float] = None, lon: Optional[float] = None, lang: str = "nl"
):
    """Forest fire risk based on Open-Meteo weather data (Angström index)."""
    user = get_current_user(request)
    if lat is None or lon is None:
        lat, lon = _resolve_coords(user)
    location_name = await get_location_name(lat, lon)

    params = _forecast_params(lat, lon)
    weather = await _cached_get(FORECAST_BASE, "fire-risk", params)

    aq_params = {
        "latitude": lat,
        "longitude": lon,
        "current": "pm10_wildfires",
    }
    aq = await _cached_get(AIR_QUALITY_BASE, "fire-smoke", aq_params)

    if not weather:
        raise HTTPException(status_code=502, detail="Brandrisico niet beschikbaar")

    cur = weather.get("current", {})
    temp = _f(cur.get("temperature_2m"))
    humidity = _f(cur.get("relative_humidity_2m"))
    wind = _f(cur.get("wind_speed_10m"))
    precipitation = _f(cur.get("precipitation"))
    angstrom = _angstrom_index(temp, humidity)
    # Rain suppresses the index.
    if precipitation > 0:
        angstrom += precipitation

    current_level = _fire_level(angstrom, wind)
    smoke = aq.get("current", {}).get("pm10_wildfires")
    current_level["smoke_from_wildfires"] = _f(smoke) if smoke is not None else None

    daily = weather.get("daily", {})
    day_times = daily.get("time", [])

    def _daily(field: str, index: int) -> float:
        arr = daily.get(field, [])
        return _f(arr[index]) if index < len(arr) else 0.0

    forecast = []
    for i, day in enumerate(day_times[:7]):
        dt = _daily("temperature_2m_max", i)
        dh = _daily("relative_humidity_2m_mean", i)
        dw = _daily("wind_speed_10m_max", i)
        dp = _daily("precipitation_sum", i)
        d_angstrom = _angstrom_index(dt, dh)
        if dp > 0:
            d_angstrom += dp
        d_level = _fire_level(d_angstrom, dw)
        forecast.append({
            "date": day,
            "level": d_level["level"],
            "css": d_level["css"],
            "max_temp": round(dt),
            "max_wind": round(dw),
            "precipitation_sum": round(dp, 1),
            "humidity": round(dh),
        })

    return {
        "timestamp": datetime.now().isoformat(),
        "location": _location_block(lat, lon, location_name),
        "current": {
            "level": current_level["level"],
            "css": current_level["css"],
            "angstrom_index": round(angstrom, 2),
            "temperature": round(temp),
            "humidity": round(humidity),
            "wind_speed": round(wind),
            "precipitation": round(precipitation, 1),
            "description": _DESCRIPTIONS[current_level["css"]],
            "smoke_from_wildfires": current_level.get("smoke_from_wildfires"),
        },
        "forecast": forecast,
    }


# ---------------------------------------------------------------------------
# Tracking / stats / misc routes
# ---------------------------------------------------------------------------
@app.post("/api/track/move")
async def track_game_move(request: Request, direction: str = Form(...), score: int = Form(default=0)):
    user = get_current_user(request)
    if direction not in ("left", "right", "up", "down"):
        raise HTTPException(status_code=400, detail="Ongeldige richting")
    if not GameMoveTracker.log_move(direction, score, user["id"] if user else None):
        raise HTTPException(status_code=500, detail="Move bijhouden mislukt")
    return {"status": "success"}


@app.post("/api/track/location")
async def track_location_load(
    request: Request,
    latitude: float = Form(...),
    longitude: float = Form(...),
    location_name: str = Form(default=None),
):
    user = get_current_user(request)
    if not LocationLoadTracker.log_location_load(latitude, longitude, location_name,
                                                 user["id"] if user else None):
        raise HTTPException(status_code=500, detail="Locatie bijhouden mislukt")
    return {"status": "success"}


@app.get("/api/stats/moves")
async def get_move_stats(request: Request):
    user = get_current_user(request)
    return {"stats": GameMoveTracker.get_move_statistics(user["id"] if user else None)}


@app.get("/api/stats/locations")
async def get_location_stats(request: Request):
    user = get_current_user(request)
    return LocationLoadTracker.get_location_statistics(user["id"] if user else None)


@app.get("/languages")
async def get_languages():
    return {"languages": SUPPORTED_LANGUAGES}


@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat(), "cache_size": len(cache)}


def start_ngrok_tunnel(port: int) -> Optional[str]:
    """Start an ngrok tunnel to the local app. Returns the public URL or None."""
    if os.getenv("ENABLE_NGROK", "true").lower() in ("0", "false", "no", "off"):
        return None
    try:
        from pyngrok import ngrok
    except ImportError:
        logger.warning(
            "pyngrok niet geïnstalleerd; ngrok wordt overgeslagen (pip install pyngrok)"
        )
        return None
    try:
        tunnel = ngrok.connect(port, bind_tls=True)
        url = tunnel.public_url
        logger.info("Ngrok tunnel actief: %s -> http://localhost:%s", url, port)
        return url
    except Exception as exc:
        logger.warning("Ngrok starten mislukt: %s", exc)
        return None


if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    url = start_ngrok_tunnel(port)
    if url:
        print(f"\n🌍 Public URL: {url}\n")
    try:
        uvicorn.run(
            "app:app",
            host=host,
            port=port,
            reload=os.getenv("RELOAD", "true").lower() in ("1", "true", "yes"),
        )
    finally:
        if url:
            try:
                from pyngrok import ngrok

                ngrok.kill()
            except Exception:
                pass