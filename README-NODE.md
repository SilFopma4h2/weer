# 🌤️ Weer App - Lokale Weer-Applicatie (Node.js + Electron)

Een moderne, responsieve weer-applicatie die actuele lokale weersinformatie toont voor Nederland, nu gebouwd met Node.js en Electron.

## 🚀 Functies

- **Huidig weer**: Temperatuur, wind, neerslag, bewolking
- **24-uurs voorspelling**: Gedetailleerde voorspelling per 3 uur
- **7-dagen voorspelling**: Dagelijkse voorspelling voor de komende week
- **Regenradar**: Live regenradar via Windy.com
- **Nederlandse lokalisatie**: Alle teksten in het Nederlands (met meertalige ondersteuning)
- **Responsief design**: Werkt op desktop, tablet en mobiel
- **Automatische updates**: Data wordt elke 10 minuten ververst
- **Desktop App**: Draait als native desktop applicatie met Electron

## 🛠️ Technische Specificaties

### Backend (Node.js + Express)
- **Framework**: Express.js
- **Runtime**: Node.js
- **Endpoints**:
  - `GET /`: Hoofdpagina
  - `GET /current`: Huidig weer
  - `GET /forecast`: 24u & 7d voorspelling
  - `GET /alerts`: Weerswaarschuwingen
  - `GET /health`: Health check
  - `GET /air-quality`: Luchtkwaliteit
- **Data bron**: Open-Meteo API (gratis, geen API key vereist)
- **Caching**: TTL cache (10 minuten)
- **Performance**: API response ≤ 500ms

### Frontend
- **HTML5/CSS3/ES6 JavaScript**
- **Responsive design** (mobile-first)
- **Load time**: < 2 seconden
- **Auto-refresh**: Elke 10 minuten
- **Offline-ready**: Error handling en fallbacks

### Desktop App (Electron)
- **Platform**: Cross-platform (Windows, macOS, Linux)
- **Native integration**: Systeem tray, notifications
- **Auto-start**: Kan automatisch starten bij opstarten

## 📋 Installatie & Setup

### Vereisten
- Node.js 18+ (met npm)
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
AQICN_API_KEY=demo
```

### Stap 3: Applicatie starten

#### Als Electron Desktop App (aanbevolen)
```bash
npm start
```

#### Als Web Server (development)
```bash
npm run dev
```

Of start de server direct:
```bash
node server.js
```

### Stap 4: Open in browser (web mode)
Ga naar: `http://localhost:8000`

## 🏗️ Bouwen voor Distributie

### Desktop App Bouwen
```bash
npm run build
```

Dit maakt distributie packages voor:
- **Windows**: NSIS installer in `dist/`
- **macOS**: DMG en app bundle in `dist/`
- **Linux**: AppImage in `dist/`

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
5. **Desktop**: Start als native app met Electron

## 🔧 API Endpoints

### GET /current
```json
{
  "timestamp": "2026-02-09T10:30:00",
  "location": {
    "name": "Amsterdam",
    "lat": 52.3676,
    "lon": 4.9041
  },
  "temperature": {
    "current": 15,
    "feels_like": 13
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
  "timestamp": "2026-02-09T10:30:00",
  "alerts": [],
  "message": "Geen waarschuwingen beschikbaar in MVP versie"
}
```

### GET /health
```json
{
  "status": "ok",
  "timestamp": "2026-02-09T10:30:00",
  "version": "1.0.0"
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

## 📦 Project Structuur

```
weer/
├── server.js              # Node.js Express server
├── electron-main.js       # Electron main process
├── package.json           # NPM dependencies en scripts
├── translations.json      # Meertalige vertalingen
├── static/               # Frontend assets
│   ├── script.js         # Client-side JavaScript
│   └── style.css         # Styling
├── templates/            # HTML templates
│   └── index.html        # Hoofdpagina
└── .env                  # Environment configuratie
```

## 🚀 Development

### Run in development mode
```bash
# Server met auto-reload
npm run dev

# Electron met development tools
npm run electron-dev
```

### Scripts
- `npm start` - Start Electron app
- `npm run dev` - Start server met nodemon (auto-reload)
- `npm run electron-dev` - Start Electron in development mode
- `npm run build` - Build distributie packages

## 🐛 Troubleshooting

### API Key problemen
- **Geen API key nodig**: Open-Meteo is volledig gratis
- **Rate limiting**: Maximaal 1000 requests per dag voor gratis gebruik
- **Uptime**: >99% beschikbaarheid

### Performance problemen
- Controleer internetverbinding
- Verhoog cache duration in `.env`
- Monitor API response times in browser dev tools

### Electron problemen
- Zorg dat Node.js 18+ is geïnstalleerd
- Verwijder `node_modules` en run `npm install` opnieuw
- Check `npm start` logs voor errors

### Frontend problemen
- Hard refresh (Ctrl+F5 of Cmd+Shift+R)
- Controleer browser console voor JavaScript errors
- Controleer of alle static files laden

## 📈 Toekomstige Verbeteringen

- [ ] KNMI API integratie voor lokale waarschuwingen
- [ ] PWA ondersteuning (offline functionaliteit)
- [ ] Native systeem notificaties
- [ ] Grafische weertrends
- [ ] Meerdere locaties opslaan
- [ ] Historical weather data
- [ ] Auto-update functionaliteit
- [ ] Tray icon met quick stats

## 🔄 Migratie van Python

Deze applicatie is gemigreerd van Python/FastAPI naar Node.js/Express met Electron ondersteuning:

### Wat is veranderd:
- ✅ Backend: Python → Node.js/Express
- ✅ Desktop: Toegevoegd Electron support
- ✅ Dependencies: requirements.txt → package.json
- ✅ Database: SQLite met better-sqlite3 → In-memory storage (voor MVP)
- ✅ Authentication: Tijdelijk verwijderd (kan later worden toegevoegd)

### Wat is hetzelfde:
- ✅ Alle API endpoints behouden
- ✅ Frontend HTML/CSS/JS ongewijzigd
- ✅ Open-Meteo API integratie
- ✅ Cache systeem
- ✅ Meertalige ondersteuning

## 📄 Licentie

BSD 3-Clause License - zie [LICENSE](LICENSE) bestand.

## 🤝 Bijdragen

Bijdragen zijn welkom! Open een issue of submit een pull request.

## 📞 Support

Voor vragen of problemen, open een issue op GitHub.
