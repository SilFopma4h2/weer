# Quick Start Guide - Weer App

## 🚀 Get Started in 3 Steps

### 1️⃣ Install Node.js
Download and install Node.js 18 or later from [nodejs.org](https://nodejs.org)

### 2️⃣ Install Dependencies
Open a terminal in the project folder and run:
```bash
npm install
```

### 3️⃣ Start the App

#### Desktop App (Recommended)
```bash
npm start
```

Or use the convenient scripts:
- **Linux/Mac**: `./start.sh`
- **Windows**: `start.bat`

#### Web Browser Mode
```bash
npm run dev
```
Then open: http://localhost:8000

## 🎯 Features Available

✅ Current weather for any location
✅ 24-hour detailed forecast
✅ 7-day weather outlook
✅ Air quality information
✅ Rain radar (Windy.com integration)
✅ Multi-language support (NL, EN, DE, IT, FR)
✅ Interactive games
✅ Fishing conditions forecast

## ⚙️ Configuration

Create a `.env` file to customize:
```env
DEFAULT_LAT=52.3676
DEFAULT_LON=4.9041
CACHE_DURATION=600
AQICN_API_KEY=demo
```

## 🐛 Troubleshooting

### Error: "Cannot find module 'express'"
Run: `npm install`

### Port 8000 already in use
Change the port in `.env`:
```env
PORT=3000
```

### Electron won't start
- Make sure Node.js 18+ is installed
- Try: `npm install electron --save-dev`
- For headless systems, use web mode instead: `npm run dev`

## 📚 More Information

- Full documentation: See [README.md](README.md)
- Node.js details: See [README-NODE.md](README-NODE.md)
- API documentation: Check the README for endpoint details

## 💡 Tips

- Use `Ctrl+C` to stop the server
- Refresh the page to see the latest weather data
- The app caches data for 10 minutes by default
- No API key required - completely free to use!
