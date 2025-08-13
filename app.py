import os
import asyncio
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import requests
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from dotenv import load_dotenv
from cachetools import TTLCache
import uvicorn
import logging

# Load environment variables
load_dotenv()

app = FastAPI(title="Weer App", description="Local Weather Application MVP")

# Mount static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Configuration
DEFAULT_LAT = float(os.getenv("DEFAULT_LAT", "52.3676"))
DEFAULT_LON = float(os.getenv("DEFAULT_LON", "4.9041"))
CACHE_DURATION = int(os.getenv("CACHE_DURATION", "600"))

# Cache for API responses
cache = TTLCache(maxsize=100, ttl=CACHE_DURATION)

# Setup logging for events
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Weather translations to Dutch
WEATHER_TRANSLATIONS = {
    "clear sky": "heldere hemel",
    "few clouds": "licht bewolkt",
    "scattered clouds": "half bewolkt",
    "broken clouds": "bewolkt",
    "overcast clouds": "zwaar bewolkt",
    "light rain": "lichte regen",
    "moderate rain": "matige regen",
    "heavy rain": "zware regen",
    "thunderstorm": "onweer",
    "snow": "sneeuw",
    "mist": "mist",
    "fog": "mist"
}

def log_event(message: str) -> None:
    """Log events for weather API operations"""
    logger.info(f"Weather API: {message}")

def get_weather(lat, lon):
    """Get current weather from Open-Meteo API"""
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
    try:
        r = requests.get(url, timeout=8)
        if r.status_code != 200:
            log_event(f"current_weather HTTP {r.status_code}")
            return {}
        return r.json().get("current_weather", {}) or {}
    except Exception as e:
        log_event(f"current_weather error: {e}")
        return {}

def get_weather_extended(lat, lon):
    """Get extended weather data including current and forecast from Open-Meteo API"""
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,precipitation,rain,snowfall,weathercode,windspeed_10m,winddirection_10m,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,snowfall_sum,windspeed_10m_max,winddirection_10m_dominant,weathercode&timezone=auto"
    try:
        r = requests.get(url, timeout=8)
        if r.status_code != 200:
            log_event(f"extended_weather HTTP {r.status_code}")
            return {}
        return r.json()
    except Exception as e:
        log_event(f"extended_weather error: {e}")
        return {}

def weather_code_to_description(code):
    """Convert Open-Meteo weather code to description"""
    weather_codes = {
        0: "heldere hemel",
        1: "overwegend helder",
        2: "deels bewolkt",
        3: "bewolkt",
        45: "mist",
        48: "mist met ijsvorming",
        51: "lichte motregen",
        53: "matige motregen",
        55: "dichte motregen",
        56: "lichte motregen met ijs",
        57: "dichte motregen met ijs",
        61: "lichte regen",
        63: "matige regen",
        65: "zware regen",
        66: "lichte regen met ijs",
        67: "zware regen met ijs",
        71: "lichte sneeuw",
        73: "matige sneeuw",
        75: "zware sneeuw",
        77: "sneeuwkorrels",
        80: "lichte buien",
        81: "matige buien",
        82: "zware buien",
        85: "lichte sneeuwbuien",
        86: "zware sneeuwbuien",
        95: "onweer",
        96: "onweer met lichte hagel",
        99: "onweer met zware hagel"
    }
    return weather_codes.get(code, "onbekend")

def translate_weather_description(description: str) -> str:
    """Translate weather description to Dutch"""
    return WEATHER_TRANSLATIONS.get(description.lower(), description)

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    """Serve the main page"""
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/current")
async def get_current_weather(lat: Optional[float] = None, lon: Optional[float] = None):
    """Get current weather data"""
    if lat is None:
        lat = DEFAULT_LAT
    if lon is None:
        lon = DEFAULT_LON
    
    try:
        # Check cache first
        cache_key = f"current_{lat}_{lon}"
        if cache_key in cache:
            return cache[cache_key]
        
        # Get current weather using our specified function
        current_data = get_weather(lat, lon)
        if not current_data:
            raise HTTPException(status_code=503, detail="Weather service unavailable")
        
        # Get extended data for additional info
        extended_data = get_weather_extended(lat, lon)
        
        # Extract additional data from extended response
        current_extended = {}
        if extended_data and "current_weather" in extended_data:
            current_extended = extended_data["current_weather"]
        
        # Get hourly data for more details (first hour)
        hourly_data = {}
        if extended_data and "hourly" in extended_data:
            hourly = extended_data["hourly"]
            if hourly and len(hourly.get("temperature_2m", [])) > 0:
                hourly_data = {
                    "humidity": hourly.get("relativehumidity_2m", [0])[0],
                    "apparent_temperature": hourly.get("apparent_temperature", [current_data.get("temperature", 0)])[0]
                }
        
        # Format response to match existing structure
        current_weather = {
            "timestamp": datetime.now().isoformat(),
            "location": {
                "name": "Locatie", # Open-Meteo doesn't provide city names
                "lat": lat,
                "lon": lon
            },
            "temperature": {
                "current": round(current_data.get("temperature", 0)),
                "feels_like": round(hourly_data.get("apparent_temperature", current_data.get("temperature", 0))),
                "min": round(current_data.get("temperature", 0) - 2), # Approximation
                "max": round(current_data.get("temperature", 0) + 2)  # Approximation
            },
            "humidity": hourly_data.get("humidity", 50),
            "pressure": 1013,  # Default value as Open-Meteo current doesn't include this
            "wind": {
                "speed": round(current_data.get("windspeed", 0) * 3.6, 1),  # Convert m/s to km/h
                "direction": current_data.get("winddirection", 0),
                "gust": None  # Not available in current weather
            },
            "weather": {
                "main": "Unknown",
                "description": weather_code_to_description(current_data.get("weathercode", 0)),
                "icon": "01d"  # Default icon
            },
            "clouds": 0,  # Not available in current weather
            "visibility": None,
            "rain": 0,  # Not available in current weather
            "snow": 0   # Not available in current weather
        }
        
        # Cache the result
        cache[cache_key] = current_weather
        return current_weather
        
    except Exception as e:
        log_event(f"Error in get_current_weather: {e}")
        raise HTTPException(status_code=500, detail=f"Error fetching current weather: {str(e)}")

@app.get("/forecast")
async def get_weather_forecast(lat: Optional[float] = None, lon: Optional[float] = None):
    """Get weather forecast (24h and 7 days)"""
    if lat is None:
        lat = DEFAULT_LAT
    if lon is None:
        lon = DEFAULT_LON
    
    try:
        # Check cache first
        cache_key = f"forecast_{lat}_{lon}"
        if cache_key in cache:
            return cache[cache_key]
        
        # Get extended weather data
        data = get_weather_extended(lat, lon)
        if not data:
            raise HTTPException(status_code=503, detail="Weather service unavailable")
        
        now = datetime.now()
        forecast_24h = []
        forecast_7d = []
        
        # Process hourly data for 24h forecast
        if "hourly" in data:
            hourly = data["hourly"]
            times = hourly.get("time", [])
            temperatures = hourly.get("temperature_2m", [])
            humidity = hourly.get("relativehumidity_2m", [])
            wind_speed = hourly.get("windspeed_10m", [])
            wind_direction = hourly.get("winddirection_10m", [])
            weather_codes = hourly.get("weathercode", [])
            apparent_temp = hourly.get("apparent_temperature", [])
            precipitation = hourly.get("precipitation", [])
            rain = hourly.get("rain", [])
            snow = hourly.get("snowfall", [])
            
            # Take next 8 periods (24 hours with 3-hour intervals)
            for i in range(min(8, len(times))):
                if i < len(temperatures):
                    forecast_item = {
                        "datetime": times[i],
                        "temperature": {
                            "temp": round(temperatures[i]),
                            "feels_like": round(apparent_temp[i] if i < len(apparent_temp) else temperatures[i]),
                            "min": round(temperatures[i] - 1),
                            "max": round(temperatures[i] + 1)
                        },
                        "humidity": humidity[i] if i < len(humidity) else 50,
                        "wind": {
                            "speed": round((wind_speed[i] if i < len(wind_speed) else 0) * 3.6, 1),
                            "direction": wind_direction[i] if i < len(wind_direction) else 0
                        },
                        "weather": {
                            "main": "Unknown",
                            "description": weather_code_to_description(weather_codes[i] if i < len(weather_codes) else 0),
                            "icon": "01d"
                        },
                        "clouds": 0,  # Not available
                        "rain": rain[i] if i < len(rain) else 0,
                        "snow": snow[i] if i < len(snow) else 0
                    }
                    forecast_24h.append(forecast_item)
        
        # Process daily data for 7-day forecast
        if "daily" in data:
            daily = data["daily"]
            daily_times = daily.get("time", [])
            temp_max = daily.get("temperature_2m_max", [])
            temp_min = daily.get("temperature_2m_min", [])
            daily_codes = daily.get("weathercode", [])
            daily_wind = daily.get("windspeed_10m_max", [])
            daily_wind_dir = daily.get("winddirection_10m_dominant", [])
            daily_rain = daily.get("rain_sum", [])
            daily_snow = daily.get("snowfall_sum", [])
            
            for i in range(min(7, len(daily_times))):
                forecast_item = {
                    "datetime": f"{daily_times[i]}T14:00:00",
                    "temperature": {
                        "temp": round((temp_max[i] + temp_min[i]) / 2 if i < len(temp_max) and i < len(temp_min) else 15),
                        "feels_like": round((temp_max[i] + temp_min[i]) / 2 if i < len(temp_max) and i < len(temp_min) else 15),
                        "min": round(temp_min[i]) if i < len(temp_min) else 10,
                        "max": round(temp_max[i]) if i < len(temp_max) else 20
                    },
                    "humidity": 70,  # Default value
                    "wind": {
                        "speed": round((daily_wind[i] if i < len(daily_wind) else 0) * 3.6, 1),
                        "direction": daily_wind_dir[i] if i < len(daily_wind_dir) else 0
                    },
                    "weather": {
                        "main": "Unknown",
                        "description": weather_code_to_description(daily_codes[i] if i < len(daily_codes) else 0),
                        "icon": "01d"
                    },
                    "clouds": 0,
                    "rain": daily_rain[i] if i < len(daily_rain) else 0,
                    "snow": daily_snow[i] if i < len(daily_snow) else 0
                }
                forecast_7d.append(forecast_item)
        
        result = {
            "timestamp": now.isoformat(),
            "location": {
                "name": "Locatie",
                "lat": lat,
                "lon": lon
            },
            "forecast_24h": forecast_24h,
            "forecast_7d": forecast_7d
        }
        
        # Cache the result
        cache[cache_key] = result
        return result
        
    except Exception as e:
        log_event(f"Error in get_weather_forecast: {e}")
        raise HTTPException(status_code=500, detail=f"Error fetching forecast: {str(e)}")

@app.get("/alerts")
async def get_weather_alerts(lat: Optional[float] = None, lon: Optional[float] = None):
    """Get weather alerts (simplified implementation using Open-Meteo)"""
    # Note: Open-Meteo API doesn't provide weather alerts in the free tier
    # This is a placeholder that maintains the existing interface
    log_event("Weather alerts requested - not available in Open-Meteo free tier")
    return {
        "timestamp": datetime.now().isoformat(),
        "alerts": [],
        "message": "Geen waarschuwingen beschikbaar - Open-Meteo ondersteunt geen alerts in gratis versie"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "cache_size": len(cache)
    }

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)