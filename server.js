const express = require('express');
const path = require('path');
const axios = require('axios');
const NodeCache = require('node-cache');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Initialize cache (TTL in seconds)
const cache = new NodeCache({ stdTTL: parseInt(process.env.CACHE_DURATION || '600') });

// Simple in-memory storage for tracking (optional features)
const gameMoves = [];
const locationLoads = [];

console.log('✅ Server initialized successfully');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'static')));

// Rate limiting middleware for all routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);

// Configuration
const DEFAULT_LAT = parseFloat(process.env.DEFAULT_LAT || '52.3676');
const DEFAULT_LON = parseFloat(process.env.DEFAULT_LON || '4.9041');
const AQICN_API_KEY = process.env.AQICN_API_KEY || 'demo';

// Translations module (simplified version)
const translations = require('./translations.json');

function getWeatherDescription(weatherCode, language = 'nl') {
  const descriptions = translations[language] || translations.nl;
  return descriptions[weatherCode] || descriptions[0];
}

function getWeatherIcon(weatherCode, isDay = true) {
  const suffix = isDay ? 'd' : 'n';
  
  if (weatherCode === 0) return `01${suffix}`;
  if ([1, 2].includes(weatherCode)) return `02${suffix}`;
  if (weatherCode === 3) return `03${suffix}`;
  if ([45, 48].includes(weatherCode)) return `50${suffix}`;
  if ([51, 53, 55, 61, 63, 65].includes(weatherCode)) return `10${suffix}`;
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return `13${suffix}`;
  if ([80, 81, 82].includes(weatherCode)) return `09${suffix}`;
  if ([95, 96, 99].includes(weatherCode)) return `11${suffix}`;
  return `02${suffix}`;
}

async function getLocationName(lat, lon) {
  const majorCities = {
    '52.3676,4.9041': 'Amsterdam',
    '52.0907,5.1214': 'Utrecht',
    '51.9225,4.4792': 'Rotterdam',
    '52.1601,4.4970': 'Den Haag',
    '51.4416,5.4697': 'Eindhoven',
    '51.5074,-0.1278': 'London',
    '48.8566,2.3522': 'Parijs',
    '52.5200,13.4050': 'Berlijn',
    '41.9028,12.4964': 'Rome',
    '40.4168,-3.7038': 'Madrid',
  };

  // Check major cities (within 0.05 degrees ~5km)
  for (const [coords, name] of Object.entries(majorCities)) {
    const [cityLat, cityLon] = coords.split(',').map(Number);
    if (Math.abs(lat - cityLat) < 0.05 && Math.abs(lon - cityLon) < 0.05) {
      return name;
    }
  }

  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`,
      {
        headers: { 'User-Agent': 'WeerApp/1.0' },
        timeout: 5000
      }
    );
    
    const address = response.data.address;
    return address.city || address.town || address.village || address.municipality || 'Unknown Location';
  } catch (error) {
    console.error('Error fetching location name:', error.message);
    return 'Unknown Location';
  }
}

// Cookie parser middleware (not used for now, but kept for compatibility)
function parseCookies(req) {
  const cookies = {};
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const [name, ...rest] = cookie.split('=');
      cookies[name.trim()] = rest.join('=').trim();
    });
  }
  return cookies;
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.get('/current', async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat || DEFAULT_LAT);
    const lon = parseFloat(req.query.lon || DEFAULT_LON);
    const language = req.query.language || 'nl';
    
    const cacheKey = `current_${lat}_${lon}_${language}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&timezone=auto`;
    
    const weatherResponse = await axios.get(weatherUrl, { timeout: 5000 });
    const data = weatherResponse.data;
    const current = data.current;

    const locationName = await getLocationName(lat, lon);

    const result = {
      timestamp: new Date().toISOString(),
      location: {
        name: locationName,
        lat,
        lon
      },
      temperature: {
        current: Math.round(current.temperature_2m),
        feels_like: Math.round(current.apparent_temperature),
      },
      wind: {
        speed: Math.round(current.wind_speed_10m * 10) / 10,
        direction: current.wind_direction_10m
      },
      humidity: current.relative_humidity_2m,
      clouds: current.cloud_cover,
      precipitation: current.precipitation,
      weather: {
        description: getWeatherDescription(current.weather_code, language),
        icon: getWeatherIcon(current.weather_code, current.is_day === 1),
        code: current.weather_code
      }
    };

    cache.set(cacheKey, result);
    res.json(result);
  } catch (error) {
    console.error('Error fetching current weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.get('/forecast', async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat || DEFAULT_LAT);
    const lon = parseFloat(req.query.lon || DEFAULT_LON);
    const language = req.query.language || 'nl';
    
    const cacheKey = `forecast_${lat}_${lon}_${language}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&timezone=auto&forecast_days=7`;
    
    const weatherResponse = await axios.get(weatherUrl, { timeout: 5000 });
    const data = weatherResponse.data;

    const hourly24 = [];
    for (let i = 0; i < 24 && i < data.hourly.time.length; i++) {
      hourly24.push({
        time: data.hourly.time[i],
        temperature: Math.round(data.hourly.temperature_2m[i]),
        precipitation: data.hourly.precipitation[i],
        precipitation_probability: data.hourly.precipitation_probability[i],
        wind_speed: Math.round(data.hourly.wind_speed_10m[i] * 10) / 10,
        weather: {
          description: getWeatherDescription(data.hourly.weather_code[i], language),
          icon: getWeatherIcon(data.hourly.weather_code[i], data.hourly.is_day[i] === 1),
          code: data.hourly.weather_code[i]
        }
      });
    }

    const daily7 = [];
    for (let i = 0; i < 7 && i < data.daily.time.length; i++) {
      daily7.push({
        date: data.daily.time[i],
        temperature: {
          max: Math.round(data.daily.temperature_2m_max[i]),
          min: Math.round(data.daily.temperature_2m_min[i])
        },
        precipitation: {
          sum: data.daily.precipitation_sum[i],
          probability: data.daily.precipitation_probability_max[i]
        },
        wind_speed: Math.round(data.daily.wind_speed_10m_max[i] * 10) / 10,
        weather: {
          description: getWeatherDescription(data.daily.weather_code[i], language),
          icon: getWeatherIcon(data.daily.weather_code[i], true),
          code: data.daily.weather_code[i]
        }
      });
    }

    const result = {
      timestamp: new Date().toISOString(),
      hourly: hourly24,
      daily: daily7
    };

    cache.set(cacheKey, result);
    res.json(result);
  } catch (error) {
    console.error('Error fetching forecast:', error.message);
    res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
});

app.get('/air-quality', async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat || DEFAULT_LAT);
    const lon = parseFloat(req.query.lon || DEFAULT_LON);
    
    const cacheKey = `air_quality_${lat}_${lon}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${AQICN_API_KEY}`;
    const response = await axios.get(url, { timeout: 5000 });
    
    if (response.data.status === 'ok') {
      const result = {
        timestamp: new Date().toISOString(),
        aqi: response.data.data.aqi,
        city: response.data.data.city.name,
        station: response.data.data.city.name,
        pollutants: response.data.data.iaqi || {}
      };
      cache.set(cacheKey, result);
      res.json(result);
    } else {
      res.status(404).json({ error: 'Air quality data not available' });
    }
  } catch (error) {
    console.error('Error fetching air quality:', error.message);
    res.status(500).json({ error: 'Failed to fetch air quality data' });
  }
});

app.get('/alerts', (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    alerts: [],
    message: 'Geen waarschuwingen beschikbaar in MVP versie'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/languages', (req, res) => {
  res.json({
    supported: ['nl', 'en', 'de', 'it', 'fr'],
    default: 'nl'
  });
});

// Track game moves
app.post('/api/track/move', (req, res) => {
  try {
    const { direction, score } = req.body;
    gameMoves.push({ direction, score: score || 0, timestamp: new Date() });
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking move:', error.message);
    res.status(500).json({ error: 'Failed to track move' });
  }
});

// Track location loads
app.post('/api/track/location', (req, res) => {
  try {
    const { latitude, longitude, location_name } = req.body;
    locationLoads.push({ latitude, longitude, location_name, timestamp: new Date() });
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking location:', error.message);
    res.status(500).json({ error: 'Failed to track location' });
  }
});

// Get stats
app.get('/api/stats/moves', (req, res) => {
  try {
    const stats = {};
    gameMoves.forEach(move => {
      stats[move.direction] = (stats[move.direction] || 0) + 1;
    });
    res.json({ stats: Object.entries(stats).map(([direction, count]) => ({ direction, count })) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.get('/api/stats/locations', (req, res) => {
  try {
    const stats = {};
    locationLoads.forEach(load => {
      if (load.location_name) {
        stats[load.location_name] = (stats[load.location_name] || 0) + 1;
      }
    });
    const sorted = Object.entries(stats)
      .map(([location_name, count]) => ({ location_name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    res.json({ stats: sorted });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Weather App server running on http://localhost:${PORT}`);
});

module.exports = app;
