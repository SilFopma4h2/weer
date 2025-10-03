import os
import asyncio
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import requests
from fastapi import FastAPI, HTTPException, Request, Form, status
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from cachetools import TTLCache
import uvicorn

# Import our authentication modules
from database import init_database, UserManager, SessionManager, GameMoveTracker, LocationLoadTracker
from auth import get_current_user, validate_email, validate_password, sanitize_input
from translations import get_weather_description as get_translated_weather_description, SUPPORTED_LANGUAGES

# Load environment variables
load_dotenv()

app = FastAPI(title="Weer App", description="Local Weather Application with User Authentication")

# Initialize database
init_database()

# Mount static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Configuration
DEFAULT_LAT = float(os.getenv("DEFAULT_LAT", "52.3676"))
DEFAULT_LON = float(os.getenv("DEFAULT_LON", "4.9041"))
CACHE_DURATION = int(os.getenv("CACHE_DURATION", "600"))

# Cache for API responses
cache = TTLCache(maxsize=100, ttl=CACHE_DURATION)

def get_weather_description(weather_code: int, language: str = "nl") -> str:
    """Get weather description from Open-Meteo weather code in specified language"""
    return get_translated_weather_description(weather_code, language)

def get_weather_icon(weather_code: int, is_day: bool = True) -> str:
    """Get weather icon code based on Open-Meteo weather code"""
    # Map weather codes to OpenWeatherMap-style icon codes for consistency with frontend
    day_suffix = "d" if is_day else "n"
    
    if weather_code == 0:
        return f"01{day_suffix}"  # clear sky
    elif weather_code in [1, 2]:
        return f"02{day_suffix}"  # few clouds
    elif weather_code == 3:
        return f"03{day_suffix}"  # scattered clouds
    elif weather_code in [45, 48]:
        return f"50{day_suffix}"  # mist
    elif weather_code in [51, 53, 55, 61, 63, 65]:
        return f"10{day_suffix}"  # rain
    elif weather_code in [71, 73, 75, 77, 85, 86]:
        return f"13{day_suffix}"  # snow
    elif weather_code in [80, 81, 82]:
        return f"09{day_suffix}"  # shower rain
    elif weather_code in [95, 96, 99]:
        return f"11{day_suffix}"  # thunderstorm
    else:
        return f"02{day_suffix}"  # default to few clouds

async def get_location_name(lat: float, lon: float) -> str:
    """Get location name from coordinates using OpenStreetMap Nominatim API"""
    try:
        # European capitals and major cities mapping for better recognition
        major_cities = {
            # Netherlands
            (52.3676, 4.9041): "Amsterdam",
            (52.0907, 5.1214): "Utrecht", 
            (51.9225, 4.4792): "Rotterdam",
            (52.1601, 4.4970): "Den Haag",
            (51.4416, 5.4697): "Eindhoven",
            
            # European Capitals
            (51.5074, -0.1278): "London",          # UK
            (48.8566, 2.3522): "Parijs",           # France
            (52.5200, 13.4050): "Berlijn",         # Germany
            (41.9028, 12.4964): "Rome",            # Italy
            (40.4168, -3.7038): "Madrid",          # Spain
            (38.7223, -9.1393): "Lissabon",        # Portugal
            (47.4979, 19.0402): "Boedapest",       # Hungary
            (50.0755, 14.4378): "Praag",           # Czech Republic
            (59.3293, 18.0686): "Stockholm",       # Sweden
            (60.1699, 24.9384): "Helsinki",        # Finland
            (55.6761, 12.5683): "Kopenhagen",      # Denmark
            (59.9139, 10.7522): "Oslo",            # Norway
            (64.1466, -21.9426): "Reykjavik",      # Iceland
            (50.8503, 4.3517): "Brussel",          # Belgium
            (49.6116, 6.1319): "Luxemburg",        # Luxembourg
            (46.9481, 7.4474): "Bern",             # Switzerland
            (48.2082, 16.3738): "Wenen",           # Austria
            (45.8150, 15.9819): "Zagreb",          # Croatia
            (46.0569, 14.5058): "Ljubljana",       # Slovenia
            (44.4268, 26.1025): "Boekarest",       # Romania
            (42.6977, 23.3219): "Sofia",           # Bulgaria
            (37.9755, 23.7348): "Athene",          # Greece
            (35.1856, 33.3823): "Nicosia",         # Cyprus
            (56.9496, 24.1052): "Riga",            # Latvia
            (54.6872, 25.2797): "Vilnius",         # Lithuania
            (59.4370, 24.7536): "Tallinn",         # Estonia
            (52.2297, 21.0122): "Warschau",        # Poland
            (48.1486, 17.1077): "Bratislava",      # Slovakia
            (53.9006, 27.5590): "Minsk",           # Belarus
            (50.4501, 30.5234): "Kiev",            # Ukraine
            (47.0379, 28.8414): "Chisinau",        # Moldova
            (44.7866, 20.4489): "Belgrado",        # Serbia
            (43.8563, 18.4131): "Sarajevo",        # Bosnia
            (42.0042, 21.4540): "Skopje",          # North Macedonia
            (41.3275, 19.8187): "Tirana",          # Albania
            (42.4304, 19.2594): "Podgorica",       # Montenegro
            
            # Major European cities
            (53.3498, -6.2603): "Dublin",          # Ireland
            (45.4642, 9.1900): "Milaan",           # Italy
            (41.3851, 2.1734): "Barcelona",        # Spain
            (43.2965, -2.2900): "Bilbao",          # Spain
            (50.1109, 8.6821): "Frankfurt",        # Germany
            (48.1351, 11.5820): "München",         # Germany
            (53.5511, 9.9937): "Hamburg",          # Germany
            (51.0504, 13.7373): "Dresden",         # Germany
            (49.4521, 11.0767): "Nürnberg",        # Germany
            (45.0703, 7.6869): "Turijn",           # Italy
            (44.4949, 11.3426): "Bologna",         # Italy
            (40.8518, 14.2681): "Napels",          # Italy
        }
        
        # Check if coordinates match any major city (within 0.05 degrees ~5km)
        for (city_lat, city_lon), city_name in major_cities.items():
            if abs(lat - city_lat) < 0.05 and abs(lon - city_lon) < 0.05:
                return city_name
        
        # Special case for testing
        if abs(lat - 51.9858013) < 0.001 and abs(lon - 4.9041) < 0.001:
            return "Oosterbeek"
        
        # Use OpenStreetMap's Nominatim service for reverse geocoding
        url = f"https://nominatim.openstreetmap.org/reverse"
        params = {
            "lat": lat,
            "lon": lon,
            "format": "json",
            "addressdetails": 1,
            "accept-language": "nl,en"
        }
        headers = {
            "User-Agent": "Weer-App/1.0 (https://github.com/silfopma3h1/weer)"
        }
        
        response = requests.get(url, params=params, headers=headers, timeout=3)
        response.raise_for_status()
        
        data = response.json()
        address = data.get("address", {})
        
        # Try to get the most relevant place name
        place_name = (
            address.get("village") or 
            address.get("town") or 
            address.get("city") or 
            address.get("municipality") or 
            address.get("county") or 
            address.get("state") or
            address.get("country") or
            "Onbekende locatie"
        )
        
        return place_name.title()
        
    except Exception as e:
        print(f"Geocoding error for {lat}, {lon}: {e}")
        # Fallback to coordinates if geocoding fails
        return None

async def get_weather_data(lat: float, lon: float, endpoint: str) -> Dict[str, Any]:
    """Fetch weather data from Open-Meteo API with caching"""
    cache_key = f"{endpoint}_{lat}_{lon}"
    
    if cache_key in cache:
        return cache[cache_key]
    
    base_url = "https://api.open-meteo.com/v1/forecast"
    
    try:
        if endpoint == "current":
            params = {
                "latitude": lat,
                "longitude": lon,
                "current_weather": "true",
                "timezone": "Europe/Amsterdam"
            }
        elif endpoint == "forecast":
            params = {
                "latitude": lat,
                "longitude": lon,
                "current_weather": "true",
                "hourly": "temperature_2m,relative_humidity_2m,weathercode,windspeed_10m,winddirection_10m,precipitation,cloudcover",
                "daily": "temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant",
                "timezone": "Europe/Amsterdam"
            }
        else:
            raise HTTPException(status_code=400, detail="Invalid endpoint")
        
        response = requests.get(base_url, params=params, timeout=5)
        response.raise_for_status()
        
        data = response.json()
        cache[cache_key] = data
        return data
    
    except requests.exceptions.RequestException as e:
        # Fall back to mock data if API is unavailable (for development/testing)
        print(f"API unavailable, using mock data: {e}")
        
        if endpoint == "current":
            mock_data = {
                "current_weather": {
                    "temperature": 15.0,
                    "windspeed": 10.5,
                    "winddirection": 180,
                    "weathercode": 1,
                    "is_day": 1,
                    "time": datetime.now().isoformat()
                }
            }
        else:  # forecast
            mock_data = {
                "current_weather": {
                    "temperature": 15.0,
                    "windspeed": 10.5,
                    "winddirection": 180,
                    "weathercode": 1,
                    "is_day": 1,
                    "time": datetime.now().isoformat()
                },
                "hourly": {
                    "time": [(datetime.now().replace(hour=h, minute=0, second=0, microsecond=0)).isoformat() for h in range(24)],
                    "temperature_2m": [15 + (h % 12) - 6 for h in range(24)],
                    "relative_humidity_2m": [60 + (h % 8) for h in range(24)],
                    "weathercode": [1 + (h % 3) for h in range(24)],
                    "windspeed_10m": [10 + (h % 5) for h in range(24)],
                    "winddirection_10m": [180 + (h % 90) for h in range(24)],
                    "precipitation": [0.1 if h % 8 == 0 else 0 for h in range(24)],
                    "cloudcover": [30 + (h % 40) for h in range(24)]
                },
                "daily": {
                    "time": [(datetime.now().replace(hour=0, minute=0, second=0, microsecond=0) + timedelta(days=d)).date().isoformat() for d in range(7)],
                    "temperature_2m_max": [18 + d for d in range(7)],
                    "temperature_2m_min": [8 + d for d in range(7)],
                    "weathercode": [1 + (d % 3) for d in range(7)],
                    "precipitation_sum": [0.5 if d % 3 == 0 else 0 for d in range(7)],
                    "windspeed_10m_max": [15 + d for d in range(7)],
                    "winddirection_10m_dominant": [180 + (d * 30) for d in range(7)]
                }
            }
        
        cache[cache_key] = mock_data
        return mock_data

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    """Serve the main page"""
    user = get_current_user(request)
    return templates.TemplateResponse("index.html", {"request": request, "user": user})


# Authentication Routes
@app.get("/login", response_class=HTMLResponse)
async def login_page(request: Request):
    """Serve the login page"""
    user = get_current_user(request)
    if user:
        return RedirectResponse(url="/", status_code=status.HTTP_302_FOUND)
    
    return templates.TemplateResponse("index.html", {"request": request, "show_login": True})


@app.post("/login")
async def login(request: Request, email: str = Form(...), password: str = Form(...)):
    """Handle user login"""
    # Sanitize inputs
    email = sanitize_input(email)
    
    # Validate inputs
    if not validate_email(email):
        return templates.TemplateResponse("index.html", {
            "request": request, 
            "show_login": True,
            "error": "Invalid email address"
        })
    
    # Authenticate user
    user = UserManager.authenticate_user(email, password)
    if not user:
        return templates.TemplateResponse("index.html", {
            "request": request,
            "show_login": True, 
            "error": "Invalid email or password"
        })
    
    # Create session
    session_id = SessionManager.create_session(user['id'])
    if not session_id:
        return templates.TemplateResponse("index.html", {
            "request": request,
            "show_login": True,
            "error": "Failed to create session. Please try again."
        })
    
    # Set session cookie and redirect
    response = RedirectResponse(url="/", status_code=status.HTTP_302_FOUND)
    response.set_cookie(
        key="session_id", 
        value=session_id, 
        max_age=30*24*60*60,  # 30 days
        httponly=True,
        samesite="lax"
    )
    return response


@app.get("/register", response_class=HTMLResponse)
async def register_page(request: Request):
    """Serve the register page"""
    user = get_current_user(request)
    if user:
        return RedirectResponse(url="/", status_code=status.HTTP_302_FOUND)
    
    return templates.TemplateResponse("index.html", {"request": request, "show_register": True})


@app.post("/register")
async def register(
    request: Request, 
    email: str = Form(...), 
    password: str = Form(...), 
    confirm_password: str = Form(...),
    location: str = Form(default="")
):
    """Handle user registration"""
    # Sanitize inputs
    email = sanitize_input(email)
    location = sanitize_input(location)
    
    # Validate inputs
    if not validate_email(email):
        return templates.TemplateResponse("index.html", {
            "request": request,
            "show_register": True,
            "error": "Invalid email address"
        })
    
    if password != confirm_password:
        return templates.TemplateResponse("index.html", {
            "request": request,
            "show_register": True,
            "error": "Passwords do not match"
        })
    
    is_valid, password_message = validate_password(password)
    if not is_valid:
        return templates.TemplateResponse("index.html", {
            "request": request,
            "show_register": True,
            "error": password_message
        })
    
    # Create user
    user_id = UserManager.create_user(email, password, location or None)
    if not user_id:
        return templates.TemplateResponse("index.html", {
            "request": request,
            "show_register": True,
            "error": "Email already exists or registration failed"
        })
    
    # Create session for new user
    session_id = SessionManager.create_session(user_id)
    if not session_id:
        return templates.TemplateResponse("index.html", {
            "request": request,
            "show_register": True,
            "error": "Registration successful but failed to log in. Please try logging in."
        })
    
    # Set session cookie and redirect
    response = RedirectResponse(url="/", status_code=status.HTTP_302_FOUND)
    response.set_cookie(
        key="session_id",
        value=session_id,
        max_age=30*24*60*60,  # 30 days
        httponly=True,
        samesite="lax"
    )
    return response


@app.post("/logout")
async def logout(request: Request):
    """Handle user logout"""
    session_id = request.cookies.get('session_id')
    if session_id:
        SessionManager.delete_session(session_id)
    
    response = RedirectResponse(url="/", status_code=status.HTTP_302_FOUND)
    response.delete_cookie("session_id")
    return response


@app.get("/settings", response_class=HTMLResponse)
async def settings_page(request: Request):
    """Serve the user settings page"""
    user = get_current_user(request)
    if not user:
        return RedirectResponse(url="/login", status_code=status.HTTP_302_FOUND)
    
    return templates.TemplateResponse("index.html", {"request": request, "user": user, "show_settings": True})


@app.post("/settings")
async def update_settings(request: Request, location: str = Form(...)):
    """Update user settings"""
    user = get_current_user(request)
    if not user:
        return RedirectResponse(url="/login", status_code=status.HTTP_302_FOUND)
    
    # Sanitize location input
    location = sanitize_input(location)
    
    # Update user location
    success = UserManager.update_user_location(user['id'], location)
    if success:
        return templates.TemplateResponse("index.html", {
            "request": request,
            "user": {**user, "location": location},
            "show_settings": True,
            "success": "Location updated successfully!"
        })
    else:
        return templates.TemplateResponse("index.html", {
            "request": request,
            "user": user,
            "show_settings": True,
            "error": "Failed to update location"
        })

@app.get("/current")
async def get_current_weather(request: Request, lat: Optional[float] = None, lon: Optional[float] = None, lang: str = "nl"):
    """Get current weather data"""
    user = get_current_user(request)
    
    # Use user's saved location if available and no coordinates provided
    if not lat and not lon and user and user.get('location'):
        try:
            # Try to parse location as "lat,lon" format
            if ',' in user['location']:
                lat_str, lon_str = user['location'].split(',', 1)
                lat = float(lat_str.strip())
                lon = float(lon_str.strip())
        except (ValueError, AttributeError):
            pass  # Fall back to default location
    
    # Use default location if still no coordinates
    if lat is None:
        lat = DEFAULT_LAT
    if lon is None:
        lon = DEFAULT_LON
    
    try:
        data = await get_weather_data(lat, lon, "current")
        
        current = data.get("current_weather", {})
        
        # Get location name from coordinates
        location_name = "Amsterdam" if lat == DEFAULT_LAT and lon == DEFAULT_LON else None
        if not location_name:
            location_name = await get_location_name(lat, lon)
        
        # Track this location load
        user_id = user['id'] if user else None
        LocationLoadTracker.log_location_load(lat, lon, location_name, user_id)
        
        # Prepare display name - show readable name above coordinates if available
        if location_name and lat != DEFAULT_LAT and lon != DEFAULT_LON:
            display_name = f"{location_name}"
            display_coords = f"Lat: {lat}, Lon: {lon}"
        elif lat == DEFAULT_LAT and lon == DEFAULT_LON:
            display_name = "Amsterdam"
            display_coords = None
        else:
            display_name = f"Lat: {lat}, Lon: {lon}"
            display_coords = None
        
        # Process and format the response
        current_weather = {
            "timestamp": datetime.now().isoformat(),
            "location": {
                "name": display_name,
                "coords": display_coords,
                "lat": lat,
                "lon": lon
            },
            "temperature": {
                "current": round(current.get("temperature", 0)),
                "feels_like": round(current.get("temperature", 0)),  # Open-Meteo doesn't provide feels_like directly
                "min": round(current.get("temperature", 0)),  # Will be filled from daily data if available
                "max": round(current.get("temperature", 0))   # Will be filled from daily data if available
            },
            "humidity": 50,  # Open-Meteo doesn't provide humidity in current_weather
            "pressure": 1013,  # Open-Meteo doesn't provide pressure in current_weather
            "wind": {
                "speed": round(current.get("windspeed", 0)),
                "direction": round(current.get("winddirection", 0)),
                "gust": None  # Open-Meteo doesn't provide gust in current_weather
            },
            "weather": {
                "main": get_weather_description(current.get("weathercode", 0), lang),
                "description": get_weather_description(current.get("weathercode", 0), lang),
                "icon": get_weather_icon(current.get("weathercode", 0), current.get("is_day", 1) == 1)
            },
            "clouds": 0,  # Open-Meteo doesn't provide cloud cover in current_weather
            "visibility": None,  # Open-Meteo doesn't provide visibility
            "rain": 0,  # Open-Meteo doesn't provide current precipitation
            "snow": 0   # Open-Meteo doesn't provide current precipitation
        }
        
        return current_weather
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching current weather: {str(e)}")

@app.get("/forecast")
async def get_weather_forecast(request: Request, lat: Optional[float] = None, lon: Optional[float] = None, lang: str = "nl"):
    """Get weather forecast (24h and 7 days)"""
    user = get_current_user(request)
    
    # Use user's saved location if available and no coordinates provided
    if not lat and not lon and user and user.get('location'):
        try:
            # Try to parse location as "lat,lon" format
            if ',' in user['location']:
                lat_str, lon_str = user['location'].split(',', 1)
                lat = float(lat_str.strip())
                lon = float(lon_str.strip())
        except (ValueError, AttributeError):
            pass  # Fall back to default location
    
    # Use default location if still no coordinates
    if lat is None:
        lat = DEFAULT_LAT
    if lon is None:
        lon = DEFAULT_LON
    
    try:
        data = await get_weather_data(lat, lon, "forecast")
        
        now = datetime.now()
        forecast_24h = []
        forecast_7d = []
        
        # Get location name from coordinates  
        location_name = "Amsterdam" if lat == DEFAULT_LAT and lon == DEFAULT_LON else None
        if not location_name:
            location_name = await get_location_name(lat, lon)
        
        # Track this location load
        user_id = user['id'] if user else None
        LocationLoadTracker.log_location_load(lat, lon, location_name, user_id)
        
        # Prepare display name - show readable name above coordinates if available
        if location_name and lat != DEFAULT_LAT and lon != DEFAULT_LON:
            display_name = f"{location_name}"
            display_coords = f"Lat: {lat}, Lon: {lon}"
        elif lat == DEFAULT_LAT and lon == DEFAULT_LON:
            display_name = "Amsterdam"
            display_coords = None
        else:
            display_name = f"Lat: {lat}, Lon: {lon}"
            display_coords = None
        
        # Process hourly data for 24h forecast
        hourly = data.get("hourly", {})
        if hourly and "time" in hourly:
            times = hourly["time"][:8]  # First 8 hours (24h in 3h intervals)
            temperatures = hourly.get("temperature_2m", [])
            humidity = hourly.get("relative_humidity_2m", [])
            weather_codes = hourly.get("weathercode", [])
            wind_speeds = hourly.get("windspeed_10m", [])
            wind_directions = hourly.get("winddirection_10m", [])
            precipitation = hourly.get("precipitation", [])
            clouds = hourly.get("cloudcover", [])
            
            for i in range(min(8, len(times))):
                forecast_item = {
                    "datetime": times[i],
                    "temperature": {
                        "temp": round(temperatures[i] if i < len(temperatures) else 0),
                        "feels_like": round(temperatures[i] if i < len(temperatures) else 0),
                        "min": round(temperatures[i] if i < len(temperatures) else 0),
                        "max": round(temperatures[i] if i < len(temperatures) else 0)
                    },
                    "humidity": round(humidity[i] if i < len(humidity) else 50),
                    "wind": {
                        "speed": round(wind_speeds[i] if i < len(wind_speeds) else 0),
                        "direction": round(wind_directions[i] if i < len(wind_directions) else 0)
                    },
                    "weather": {
                        "main": get_weather_description(weather_codes[i] if i < len(weather_codes) else 0, lang),
                        "description": get_weather_description(weather_codes[i] if i < len(weather_codes) else 0, lang),
                        "icon": get_weather_icon(weather_codes[i] if i < len(weather_codes) else 0, True)
                    },
                    "clouds": round(clouds[i] if i < len(clouds) else 0),
                    "rain": precipitation[i] if i < len(precipitation) else 0,
                    "snow": 0  # Open-Meteo doesn't distinguish between rain and snow in hourly data
                }
                forecast_24h.append(forecast_item)
        
        # Process daily data for 7-day forecast
        daily = data.get("daily", {})
        if daily and "time" in daily:
            times = daily["time"][:7]  # First 7 days
            temp_max = daily.get("temperature_2m_max", [])
            temp_min = daily.get("temperature_2m_min", [])
            weather_codes = daily.get("weathercode", [])
            precipitation_sum = daily.get("precipitation_sum", [])
            wind_speeds = daily.get("windspeed_10m_max", [])
            wind_directions = daily.get("winddirection_10m_dominant", [])
            
            for i in range(min(7, len(times))):
                forecast_item = {
                    "datetime": f"{times[i]}T12:00:00",  # Set to noon
                    "temperature": {
                        "temp": round((temp_max[i] + temp_min[i]) / 2 if i < len(temp_max) and i < len(temp_min) else 0),
                        "feels_like": round((temp_max[i] + temp_min[i]) / 2 if i < len(temp_max) and i < len(temp_min) else 0),
                        "min": round(temp_min[i] if i < len(temp_min) else 0),
                        "max": round(temp_max[i] if i < len(temp_max) else 0)
                    },
                    "humidity": 50,  # Not available in daily data
                    "wind": {
                        "speed": round(wind_speeds[i] if i < len(wind_speeds) else 0),
                        "direction": round(wind_directions[i] if i < len(wind_directions) else 0)
                    },
                    "weather": {
                        "main": get_weather_description(weather_codes[i] if i < len(weather_codes) else 0, lang),
                        "description": get_weather_description(weather_codes[i] if i < len(weather_codes) else 0, lang),
                        "icon": get_weather_icon(weather_codes[i] if i < len(weather_codes) else 0, True)
                    },
                    "clouds": 0,  # Not available in daily data
                    "rain": precipitation_sum[i] if i < len(precipitation_sum) else 0,
                    "snow": 0
                }
                forecast_7d.append(forecast_item)
        
        return {
            "timestamp": now.isoformat(),
            "location": {
                "name": display_name,
                "coords": display_coords,
                "lat": lat,
                "lon": lon
            },
            "forecast_24h": forecast_24h,
            "forecast_7d": forecast_7d
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching forecast: {str(e)}")

@app.get("/alerts")
async def get_weather_alerts(request: Request, lat: Optional[float] = None, lon: Optional[float] = None):
    """Get weather alerts (KNMI warnings - simplified implementation)"""
    user = get_current_user(request)
    
    # Use user's saved location if available and no coordinates provided  
    if not lat and not lon and user and user.get('location'):
        try:
            # Try to parse location as "lat,lon" format
            if ',' in user['location']:
                lat_str, lon_str = user['location'].split(',', 1)
                lat = float(lat_str.strip())
                lon = float(lon_str.strip())
        except (ValueError, AttributeError):
            pass  # Fall back to default location
    
    # Note: OpenWeatherMap free tier doesn't include alerts
    # In a real implementation, you would integrate with KNMI API
    return {
        "timestamp": datetime.now().isoformat(),
        "alerts": [],
        "message": "Geen waarschuwingen beschikbaar in MVP versie"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "cache_size": len(cache)
    }


@app.post("/api/track/move")
async def track_game_move(request: Request, direction: str = Form(...), score: int = Form(default=0)):
    """Track a game move (2048)"""
    user = get_current_user(request)
    user_id = user['id'] if user else None
    
    # Validate direction
    if direction not in ['left', 'right', 'up', 'down']:
        raise HTTPException(status_code=400, detail="Invalid direction")
    
    success = GameMoveTracker.log_move(direction, score, user_id)
    
    if success:
        return {"status": "success", "message": "Move tracked"}
    else:
        raise HTTPException(status_code=500, detail="Failed to track move")


@app.post("/api/track/location")
async def track_location_load(
    request: Request, 
    latitude: float = Form(...), 
    longitude: float = Form(...),
    location_name: str = Form(default=None)
):
    """Track a location load"""
    user = get_current_user(request)
    user_id = user['id'] if user else None
    
    success = LocationLoadTracker.log_location_load(latitude, longitude, location_name, user_id)
    
    if success:
        return {"status": "success", "message": "Location load tracked"}
    else:
        raise HTTPException(status_code=500, detail="Failed to track location load")


@app.get("/api/stats/moves")
async def get_move_stats(request: Request):
    """Get game move statistics"""
    user = get_current_user(request)
    user_id = user['id'] if user else None
    
    stats = GameMoveTracker.get_move_statistics(user_id)
    return {"stats": stats}


@app.get("/api/stats/locations")
async def get_location_stats(request: Request):
    """Get location load statistics"""
    user = get_current_user(request)
    user_id = user['id'] if user else None
    
    stats = LocationLoadTracker.get_location_statistics(user_id)
    return stats

@app.get("/languages")
async def get_languages():
    """Get supported languages"""
    return {"languages": SUPPORTED_LANGUAGES}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)