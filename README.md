# 🌤️ Weer App - Lokale Weer-Applicatie

Een moderne, responsieve weer-applicatie die actuele lokale weersinformatie toont voor Nederland.

## 🚀 Functies

- **Huidig weer**: Temperatuur, wind, neerslag, bewolking
- **24-uurs voorspelling**: Gedetailleerde voorspelling per 3 uur
- **7-dagen voorspelling**: Dagelijkse voorspelling voor de komende week
- **Regenradar**: Live regenradar via Windy.com
- **Nederlandse lokalisatie**: Alle teksten in het Nederlands
- **Responsief design**: Werkt op desktop, tablet en mobiel
- **Automatische updates**: Data wordt elke 10 minuten ververst

## 🛠️ Technische Specificaties

### Backend (FastAPI)
- **Framework**: FastAPI 0.104.1
- **Endpoints**:
  - `GET /`: Hoofdpagina
  - `GET /current`: Huidig weer
  - `GET /forecast`: 24u & 7d voorspelling
  - `GET /alerts`: Weerswaarschuwingen
  - `GET /health`: Health check
- **Data bron**: Open-Meteo API (gratis, geen API key vereist)
- **Caching**: TTL cache (10 minuten)
- **Performance**: API response ≤ 500ms

### Frontend
- **HTML5/CSS3/ES6 JavaScript**
- **Responsive design** (mobile-first)
- **Load time**: < 2 seconden
- **Auto-refresh**: Elke 10 minuten
- **Offline-ready**: Error handling en fallbacks

## 📋 Installatie & Setup

### Vereisten
- Python 3.8+
- Geen API key vereist (Open-Meteo is gratis)

### Stap 1: Dependencies installeren
```bash
pip install -r requirements.txt
```

### Stap 2: Environment variabelen (optioneel)
```bash
cp .env.example .env
```

Bewerk `.env` om de standaard locatie aan te passen:
```
DEFAULT_LAT=52.3676
DEFAULT_LON=4.9041
CACHE_DURATION=600
```

### Stap 3: Applicatie starten
```bash
python app.py
```

Of gebruik uvicorn direct:
```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

### Stap 4: Open in browser
Ga naar: `http://localhost:8000`

## 🌍 Open-Meteo API

Deze applicatie gebruikt de gratis [Open-Meteo API](https://open-meteo.com/) voor weerdata:

- **Geen API key vereist**: Volledig gratis en open source
- **Hoge betrouwbaarheid**: Data van nationale weerdiensten
- **Complete dekking**: Wereldwijde weerdata
- **Real-time updates**: Actuele weersinformatie

## 📱 Gebruik

1. **Automatische locatie**: Amsterdam (default)
2. **Handmatige locatie**: Voeg `?lat=XX&lon=XX` toe aan de URL
3. **Verversen**: Klik op de "🔄 Vernieuwen" knop
4. **Mobiel**: Volledig responsive design

## 🔧 API Endpoints

### GET /current
```json
{
  "timestamp": "2025-01-13T10:30:00",
  "location": {
    "name": "Amsterdam",
    "lat": 52.3676,
    "lon": 4.9041
  },
  "temperature": {
    "current": 15,
    "feels_like": 13,
    "min": 12,
    "max": 18
  },
  "wind": {
    "speed": 12.5,
    "direction": 230
  },
  "weather": {
    "description": "licht bewolkt",
    "icon": "02d"
  }
}
```

### GET /forecast
Retourneert 24-uurs en 7-dagen voorspelling in vergelijkbaar formaat.

### GET /alerts
```json
{
  "timestamp": "2025-01-13T10:30:00",
  "alerts": [],
  "message": "Geen waarschuwingen beschikbaar in MVP versie"
}
```

## 🎯 Performance Metrics

- **Frontend load time**: < 2 seconden
- **API response time**: ≤ 500ms
- **Data freshness**: ≤ 10 minuten
- **Cache duration**: 10 minuten
- **Auto-refresh**: 10 minuten

## 🔒 Beveiliging

- Environment variabelen voor API keys
- Request timeouts (5 seconden)
- Error handling en graceful degradation
- No sensitive data in frontend

## 🚀 Deployment

### Docker (optioneel)
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Systemd Service (Linux)
```ini
[Unit]
Description=Weer App
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/weer
ExecStart=/usr/bin/python3 app.py
Restart=always

[Install]
WantedBy=multi-user.target
```

## 🐛 Troubleshooting

### API Key problemen
- **Geen API key nodig**: Open-Meteo is volledig gratis
- **Rate limiting**: Maximaal 1000 requests per dag voor gratis gebruik
- **Uptime**: >99% beschikbaarheid

### Performance problemen
- Controleer internetverbinding
- Verhoog cache duration in `.env`
- Monitor API response times in browser dev tools

### Frontend problemen
- Hard refresh (Ctrl+F5 of Cmd+Shift+R)
- Controleer browser console voor JavaScript errors
- Controleer of alle static files laden

## 📈 Toekomstige Verbeteringen

- [ ] KNMI API integratie voor lokale waarschuwingen
- [ ] PWA ondersteuning (offline functionaliteit)
- [ ] Dark mode
- [ ] Grafische weertrends
- [ ] Push notificaties voor waarschuwingen
- [ ] Meerdere locaties opslaan
- [ ] Historical weather data
- [ ] Weather widgets voor andere sites

## 📄 Licentie

BSD 3-Clause License - zie [LICENSE](LICENSE) bestand.

## 🤝 Bijdragen

Bijdragen zijn welkom! Open een issue of submit een pull request.

## 📞 Support

Voor vragen of problemen, open een issue op GitHub.