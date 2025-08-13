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

# Load environment variables
load_dotenv()

app = FastAPI(title="Weer App", description="Local Weather Application MVP")

# Mount static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Configuration
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
DEFAULT_LAT = float(os.getenv("DEFAULT_LAT", "52.3676"))
DEFAULT_LON = float(os.getenv("DEFAULT_LON", "4.9041"))
CACHE_DURATION = int(os.getenv("CACHE_DURATION", "600"))

# Cache for API responses
cache = TTLCache(maxsize=100, ttl=CACHE_DURATION)

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

def translate_weather_description(description: str) -> str:
    """Translate weather description to Dutch"""
    return WEATHER_TRANSLATIONS.get(description.lower(), description)

async def get_weather_data(lat: float, lon: float, endpoint: str) -> Dict[str, Any]:
    """Fetch weather data from OpenWeatherMap API with caching"""
    cache_key = f"{endpoint}_{lat}_{lon}"
    
    if cache_key in cache:
        return cache[cache_key]
    
    if not OPENWEATHER_API_KEY:
        raise HTTPException(status_code=500, detail="Weather API key not configured")
    
    base_url = "http://api.openweathermap.org/data/2.5"
    
    try:
        if endpoint == "current":
            url = f"{base_url}/weather"
        elif endpoint == "forecast":
            url = f"{base_url}/forecast"
        else:
            raise HTTPException(status_code=400, detail="Invalid endpoint")
        
        params = {
            "lat": lat,
            "lon": lon,
            "appid": OPENWEATHER_API_KEY,
            "units": "metric",
            "lang": "nl"
        }
        
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
        
        data = response.json()
        cache[cache_key] = data
        return data
    
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=503, detail=f"Weather service unavailable: {str(e)}")

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
        data = await get_weather_data(lat, lon, "current")
        
        # Process and format the response
        current_weather = {
            "timestamp": datetime.now().isoformat(),
            "location": {
                "name": data.get("name", "Onbekende locatie"),
                "lat": lat,
                "lon": lon
            },
            "temperature": {
                "current": round(data["main"]["temp"]),
                "feels_like": round(data["main"]["feels_like"]),
                "min": round(data["main"]["temp_min"]),
                "max": round(data["main"]["temp_max"])
            },
            "humidity": data["main"]["humidity"],
            "pressure": data["main"]["pressure"],
            "wind": {
                "speed": round(data["wind"]["speed"] * 3.6, 1),  # Convert m/s to km/h
                "direction": data["wind"].get("deg", 0),
                "gust": round(data["wind"].get("gust", 0) * 3.6, 1) if data["wind"].get("gust") else None
            },
            "weather": {
                "main": data["weather"][0]["main"],
                "description": translate_weather_description(data["weather"][0]["description"]),
                "icon": data["weather"][0]["icon"]
            },
            "clouds": data["clouds"]["all"],
            "visibility": data.get("visibility", 0) / 1000 if data.get("visibility") else None,  # Convert to km
            "rain": data.get("rain", {}).get("1h", 0),
            "snow": data.get("snow", {}).get("1h", 0)
        }
        
        return current_weather
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching current weather: {str(e)}")

@app.get("/forecast")
async def get_weather_forecast(lat: Optional[float] = None, lon: Optional[float] = None):
    """Get weather forecast (24h and 7 days)"""
    if lat is None:
        lat = DEFAULT_LAT
    if lon is None:
        lon = DEFAULT_LON
    
    try:
        data = await get_weather_data(lat, lon, "forecast")
        
        now = datetime.now()
        forecast_24h = []
        forecast_7d = []
        daily_forecasts = {}
        
        for item in data["list"]:
            forecast_time = datetime.fromtimestamp(item["dt"])
            
            forecast_item = {
                "datetime": forecast_time.isoformat(),
                "temperature": {
                    "temp": round(item["main"]["temp"]),
                    "feels_like": round(item["main"]["feels_like"]),
                    "min": round(item["main"]["temp_min"]),
                    "max": round(item["main"]["temp_max"])
                },
                "humidity": item["main"]["humidity"],
                "wind": {
                    "speed": round(item["wind"]["speed"] * 3.6, 1),
                    "direction": item["wind"].get("deg", 0)
                },
                "weather": {
                    "main": item["weather"][0]["main"],
                    "description": translate_weather_description(item["weather"][0]["description"]),
                    "icon": item["weather"][0]["icon"]
                },
                "clouds": item["clouds"]["all"],
                "rain": item.get("rain", {}).get("3h", 0),
                "snow": item.get("snow", {}).get("3h", 0)
            }
            
            # 24h forecast (next 8 periods of 3 hours)
            if len(forecast_24h) < 8:
                forecast_24h.append(forecast_item)
            
            # Daily forecast (one per day at 12:00 or closest)
            day_key = forecast_time.date().isoformat()
            if day_key not in daily_forecasts and forecast_time.hour >= 12:
                daily_forecasts[day_key] = forecast_item
        
        # Convert daily forecasts to list (max 7 days)
        forecast_7d = list(daily_forecasts.values())[:7]
        
        return {
            "timestamp": now.isoformat(),
            "location": {
                "name": data["city"]["name"],
                "lat": lat,
                "lon": lon
            },
            "forecast_24h": forecast_24h,
            "forecast_7d": forecast_7d
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching forecast: {str(e)}")

@app.get("/alerts")
async def get_weather_alerts(lat: Optional[float] = None, lon: Optional[float] = None):
    """Get weather alerts (KNMI warnings - simplified implementation)"""
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

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)