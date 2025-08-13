#!/usr/bin/env python3
"""
Demo version of the weather app with mock data for demonstration purposes
"""

import os
import asyncio
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from cachetools import TTLCache
import uvicorn

app = FastAPI(title="Weer App - Demo", description="Local Weather Application MVP (Demo)")

# Mount static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Demo data
def get_mock_current_weather():
    return {
        "timestamp": datetime.now().isoformat(),
        "location": {
            "name": "Amsterdam",
            "lat": 52.3676,
            "lon": 4.9041
        },
        "temperature": {
            "current": 18,
            "feels_like": 16,
            "min": 14,
            "max": 22
        },
        "humidity": 72,
        "pressure": 1015,
        "wind": {
            "speed": 15.3,
            "direction": 245,
            "gust": 22.1
        },
        "weather": {
            "main": "Clouds",
            "description": "half bewolkt",
            "icon": "03d"
        },
        "clouds": 65,
        "visibility": 8.5,
        "rain": 0.2,
        "snow": 0
    }

def get_mock_forecast():
    forecast_24h = []
    forecast_7d = []
    
    # Generate 24h forecast (8 periods of 3 hours)
    base_time = datetime.now()
    for i in range(8):
        time_offset = base_time + timedelta(hours=i*3)
        temp = 18 + (i % 4) - 2  # Varying temperature
        forecast_24h.append({
            "datetime": time_offset.isoformat(),
            "temperature": {
                "temp": temp,
                "feels_like": temp - 2,
                "min": temp - 1,
                "max": temp + 1
            },
            "humidity": 70 + (i * 2),
            "wind": {
                "speed": 12 + (i % 3) * 3,
                "direction": 200 + i * 10
            },
            "weather": {
                "main": ["Clear", "Clouds", "Rain"][i % 3],
                "description": ["heldere hemel", "bewolkt", "lichte regen"][i % 3],
                "icon": ["01d", "03d", "10d"][i % 3]
            },
            "clouds": 20 + i * 8,
            "rain": 0.1 * (i % 3),
            "snow": 0
        })
    
    # Generate 7-day forecast
    for i in range(7):
        day_offset = base_time + timedelta(days=i)
        temp_max = 20 + (i % 5) - 2
        temp_min = temp_max - 8
        forecast_7d.append({
            "datetime": day_offset.replace(hour=14).isoformat(),
            "temperature": {
                "temp": temp_max - 2,
                "feels_like": temp_max - 4,
                "min": temp_min,
                "max": temp_max
            },
            "humidity": 65 + i * 3,
            "wind": {
                "speed": 10 + i * 2,
                "direction": 180 + i * 15
            },
            "weather": {
                "main": ["Clear", "Clouds", "Rain", "Clear", "Clouds", "Rain", "Clear"][i],
                "description": ["heldere hemel", "bewolkt", "regen", "zonnig", "half bewolkt", "buien", "helder"][i],
                "icon": ["01d", "03d", "10d", "01d", "02d", "09d", "01d"][i]
            },
            "clouds": 15 + i * 10,
            "rain": [0, 0, 2.5, 0, 0, 1.2, 0][i],
            "snow": 0
        })
    
    return {
        "timestamp": datetime.now().isoformat(),
        "location": {
            "name": "Amsterdam",
            "lat": 52.3676,
            "lon": 4.9041
        },
        "forecast_24h": forecast_24h,
        "forecast_7d": forecast_7d
    }

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    """Serve the main page"""
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/current")
async def get_current_weather(lat: Optional[float] = None, lon: Optional[float] = None):
    """Get current weather data (mock)"""
    return get_mock_current_weather()

@app.get("/forecast")
async def get_weather_forecast(lat: Optional[float] = None, lon: Optional[float] = None):
    """Get weather forecast (mock)"""
    return get_mock_forecast()

@app.get("/alerts")
async def get_weather_alerts(lat: Optional[float] = None, lon: Optional[float] = None):
    """Get weather alerts (mock)"""
    return {
        "timestamp": datetime.now().isoformat(),
        "alerts": [
            {
                "severity": "Code Geel",
                "description": "Wind: Zware windstoten uit het zuidwesten. Windkracht 7 à 8, in de kust- en wadgebieden windkracht 8 à 9.",
                "start": (datetime.now() - timedelta(hours=2)).isoformat(),
                "end": (datetime.now() + timedelta(hours=6)).isoformat()
            }
        ]
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "mode": "demo"
    }

if __name__ == "__main__":
    print("🌤️ Starting Weather App Demo...")
    print("📍 Using mock data for demonstration")
    print("🌐 Navigate to http://localhost:8000 to see the full app in action")
    uvicorn.run("demo:app", host="0.0.0.0", port=8000, reload=True)