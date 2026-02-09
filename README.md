# 🌤️ Weer App - Lokale Weer-Applicatie

Een moderne, responsieve weer-applicatie die actuele lokale weersinformatie toont voor Nederland. Nu gebouwd met **Node.js** en **Electron** voor desktop ondersteuning!

## 🚀 Functies

- **Huidig weer**: Temperatuur, wind, neerslag, bewolking
- **24-uurs voorspelling**: Gedetailleerde voorspelling per 3 uur
- **7-dagen voorspelling**: Dagelijkse voorspelling voor de komende week
- **Regenradar**: Live regenradar via Windy.com
- **Nederlandse lokalisatie**: Alle teksten in het Nederlands
- **Responsief design**: Werkt op desktop, tablet en mobiel
- **Automatische updates**: Data wordt elke 10 minuten ververst
- **🆕 Electron Desktop App**: Draait als native desktop applicatie

## 🛠️ Technische Specificaties

### Backend (Node.js + Express)
- **Framework**: Express.js
- **Runtime**: Node.js 18+
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
- **Node.js 18+** (met npm)
- Geen API key vereist (Open-Meteo is gratis)

### Stap 1: Dependencies installeren
```bash
npm install
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

#### 🖥️ Als Electron Desktop App (aanbevolen)
```bash
npm start
```

#### 🌐 Als Web Server (development)
```bash
npm run dev
```

Of start de server direct:
```bash
node server.js
```

### Stap 4: Open in browser (web mode alleen)
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

### 🏗️ Build Desktop App
```bash
npm run build
```

Dit maakt distributie packages voor:
- **Windows**: NSIS installer in `dist/`
- **macOS**: DMG en app bundle in `dist/`
- **Linux**: AppImage in `dist/`

### Docker (optioneel voor web mode)
```dockerfile
FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 8000
CMD ["node", "server.js"]
```

### Systemd Service (Linux web server)
```ini
[Unit]
Description=Weer App
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/weer
ExecStart=/usr/bin/node server.js
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
- [ ] Native systeem notificaties (Electron)
- [ ] Meerdere locaties opslaan
- [ ] Historical weather data
- [ ] Auto-update functionaliteit (Electron)
- [ ] Tray icon met quick stats

## 🔄 Migratie naar Node.js

Deze app is gemigreerd van Python/FastAPI naar Node.js/Express met Electron ondersteuning:

- ✅ Backend: Python → Node.js/Express
- ✅ Desktop: Electron ondersteuning toegevoegd
- ✅ Dependencies: `requirements.txt` → `package.json`
- ✅ Alle API endpoints behouden
- ✅ Frontend HTML/CSS/JS ongewijzigd

Voor gedetailleerde informatie, zie [README-NODE.md](README-NODE.md).

## 📄 Licentie

BSD 3-Clause License - zie [LICENSE](LICENSE) bestand.

## 🤝 Bijdragen

Bijdragen zijn welkom! Open een issue of submit een pull request.

## 📞 Support

Voor vragen of problemen, open een issue op GitHub.