// Weather App JavaScript
// Translation support
const TRANSLATIONS = {
    nl: {
        "app_title": "🌤️ Weer App",
        "app_subtitle": "Actueel lokaal weer voor Nederland",
        "theme_dark": "🌙 Dark",
        "theme_light": "☀️ Light",
        "nav_today": "🌤️ Vandaag",
        "nav_week": "📅 Week",
        "nav_radar": "🌧️ Radar",
        "nav_fishing": "🎣 Vissen",
        "nav_games": "🎮 Games",
        "current_weather": "Huidig Weer",
        "loading": "Weerdata laden...",
        "feels_like": "Gevoelstemperatuur:",
        "min_max": "Min/Max:",
        "wind": "Wind:",
        "humidity": "Luchtvochtigheid:",
        "clouds": "Bewolking:",
        "precipitation": "Neerslag:",
        "forecast_24h": "24 Uur Voorspelling",
        "forecast_7d": "7 Dagen Voorspelling",
        "rain_radar": "Regenradar",
        "weather_alerts": "Weerswaarschuwingen",
        "no_alerts": "Geen actuele waarschuwingen",
        "fishing_conditions": "🎣 Visomstandigheden",
        "fishing_forecast": "📊 Visvoorspelling Komende Dagen",
        "games_title": "🎮 Games",
        "game_2048": "🔢 2048",
        "game_flappy": "🐦 Flappy Bird",
        "game_guess": "🔢 Raad het Getal",
        "game_snake": "🐍 Snake",
        "game_pong": "🏓 Pong",
        "game_breakout": "🧱 Breakout",
        "game_menu": "📋 Menu",
        "game_2048_title": "🔢 2048",
        "game_flappy_title": "🐦 Flappy Bird",
        "game_guess_title": "🔢 Raad het Getal",
        "game_snake_title": "🐍 Snake",
        "game_pong_title": "🏓 Pong",
        "game_breakout_title": "🧱 Breakout",
        "score": "Score:",
        "new_game": "Nieuw Spel",
        "start_game": "Start Spel",
        "game_2048_instructions": "Gebruik pijltjestoetsen of swipe om tegels te bewegen",
        "game_flappy_instructions": "Klik of druk op spatie om te springen",
        "game_snake_instructions": "Gebruik pijltjestoetsen om de slang te besturen",
        "game_pong_instructions": "Gebruik W/S toetsen om de paddle te bewegen",
        "game_breakout_instructions": "Gebruik pijltjestoetsen of muis om de paddle te bewegen",
        "guess_range": "Ik denk aan een getal tussen 1 en 100",
        "attempts": "Pogingen:",
        "guess_button": "Raad",
        "last_updated": "Laatst bijgewerkt:",
        "refresh": "🔄 Vernieuwen",
        "data_source": "Data: Open-Meteo | Radar: Windy.com",
        "error_title": "⚠️ Fout opgetreden",
        "error_message": "Er is een fout opgetreden bij het laden van de weerdata.",
        "close": "Sluiten",
        "try_again": "Opnieuw proberen",
        "use_location": "📍 Gebruik mijn locatie",
        "determining_location": "📍 Locatie bepalen...",
        "unknown_weather": "onbekend weer"
    },
    en: {
        "app_title": "🌤️ Weather App",
        "app_subtitle": "Current local weather information",
        "theme_dark": "🌙 Dark",
        "theme_light": "☀️ Light",
        "nav_today": "🌤️ Today",
        "nav_week": "📅 Week",
        "nav_radar": "🌧️ Radar",
        "nav_fishing": "🎣 Fishing",
        "nav_games": "🎮 Games",
        "current_weather": "Current Weather",
        "loading": "Loading weather data...",
        "feels_like": "Feels like:",
        "min_max": "Min/Max:",
        "wind": "Wind:",
        "humidity": "Humidity:",
        "clouds": "Clouds:",
        "precipitation": "Precipitation:",
        "forecast_24h": "24 Hour Forecast",
        "forecast_7d": "7 Day Forecast",
        "rain_radar": "Rain Radar",
        "weather_alerts": "Weather Alerts",
        "no_alerts": "No current alerts",
        "fishing_conditions": "🎣 Fishing Conditions",
        "fishing_forecast": "📊 Fishing Forecast Next Days",
        "games_title": "🎮 Games",
        "game_2048": "🔢 2048",
        "game_flappy": "🐦 Flappy Bird",
        "game_guess": "🔢 Guess the Number",
        "game_snake": "🐍 Snake",
        "game_pong": "🏓 Pong",
        "game_breakout": "🧱 Breakout",
        "game_menu": "📋 Menu",
        "game_2048_title": "🔢 2048",
        "game_flappy_title": "🐦 Flappy Bird",
        "game_guess_title": "🔢 Guess the Number",
        "game_snake_title": "🐍 Snake",
        "game_pong_title": "🏓 Pong",
        "game_breakout_title": "🧱 Breakout",
        "score": "Score:",
        "new_game": "New Game",
        "start_game": "Start Game",
        "game_2048_instructions": "Use arrow keys or swipe to move tiles",
        "game_flappy_instructions": "Click or press space to jump",
        "game_snake_instructions": "Use arrow keys to control the snake",
        "game_pong_instructions": "Use W/S keys to move the paddle",
        "game_breakout_instructions": "Use arrow keys or mouse to move the paddle",
        "guess_range": "I'm thinking of a number between 1 and 100",
        "attempts": "Attempts:",
        "guess_button": "Guess",
        "last_updated": "Last updated:",
        "refresh": "🔄 Refresh",
        "data_source": "Data: Open-Meteo | Radar: Windy.com",
        "error_title": "⚠️ Error Occurred",
        "error_message": "An error occurred while loading weather data.",
        "close": "Close",
        "try_again": "Try Again",
        "use_location": "📍 Use my location",
        "determining_location": "📍 Determining location...",
        "unknown_weather": "unknown weather"
    },
    de: {
        "app_title": "🌤️ Wetter App",
        "app_subtitle": "Aktuelle lokale Wetterinformationen",
        "theme_dark": "🌙 Dunkel",
        "theme_light": "☀️ Hell",
        "nav_today": "🌤️ Heute",
        "nav_week": "📅 Woche",
        "nav_radar": "🌧️ Radar",
        "nav_fishing": "🎣 Angeln",
        "current_weather": "Aktuelles Wetter",
        "loading": "Wetterdaten laden...",
        "feels_like": "Gefühlt wie:",
        "min_max": "Min/Max:",
        "wind": "Wind:",
        "humidity": "Luftfeuchtigkeit:",
        "clouds": "Bewölkung:",
        "precipitation": "Niederschlag:",
        "forecast_24h": "24 Stunden Vorhersage",
        "forecast_7d": "7 Tage Vorhersage",
        "rain_radar": "Regenradar",
        "weather_alerts": "Wetterwarnungen",
        "no_alerts": "Keine aktuellen Warnungen",
        "fishing_conditions": "🎣 Angelbedingungen",
        "fishing_forecast": "📊 Angelvorhersage Nächste Tage",
        "last_updated": "Zuletzt aktualisiert:",
        "refresh": "🔄 Aktualisieren",
        "data_source": "Daten: Open-Meteo | Radar: Windy.com",
        "error_title": "⚠️ Fehler aufgetreten",
        "error_message": "Fehler beim Laden der Wetterdaten.",
        "close": "Schließen",
        "try_again": "Erneut versuchen",
        "use_location": "📍 Mein Standort verwenden",
        "determining_location": "📍 Standort bestimmen...",
        "unknown_weather": "unbekanntes Wetter"
    },
    it: {
        "app_title": "🌤️ App Meteo",
        "app_subtitle": "Informazioni meteo locali attuali",
        "theme_dark": "🌙 Scuro",
        "theme_light": "☀️ Chiaro",
        "nav_today": "🌤️ Oggi",
        "nav_week": "📅 Settimana",
        "nav_radar": "🌧️ Radar",
        "nav_fishing": "🎣 Pesca",
        "current_weather": "Meteo Attuale",
        "loading": "Caricamento dati meteo...",
        "feels_like": "Percepita:",
        "min_max": "Min/Max:",
        "wind": "Vento:",
        "humidity": "Umidità:",
        "clouds": "Nuvolosità:",
        "precipitation": "Precipitazioni:",
        "forecast_24h": "Previsioni 24 Ore",
        "forecast_7d": "Previsioni 7 Giorni",
        "rain_radar": "Radar Pioggia",
        "weather_alerts": "Allerte Meteo",
        "no_alerts": "Nessun allerta attuale",
        "fishing_conditions": "🎣 Condizioni di Pesca",
        "fishing_forecast": "📊 Previsioni Pesca Prossimi Giorni",
        "last_updated": "Ultimo aggiornamento:",
        "refresh": "🔄 Aggiorna",
        "data_source": "Dati: Open-Meteo | Radar: Windy.com",
        "error_title": "⚠️ Errore Verificato",
        "error_message": "Si è verificato un errore nel caricamento dei dati meteo.",
        "close": "Chiudi",
        "try_again": "Riprova",
        "use_location": "📍 Usa la mia posizione",
        "determining_location": "📍 Determinazione posizione...",
        "unknown_weather": "tempo sconosciuto"
    },
    fr: {
        "app_title": "🌤️ App Météo",
        "app_subtitle": "Informations météo locales actuelles",
        "theme_dark": "🌙 Sombre",
        "theme_light": "☀️ Clair",
        "nav_today": "🌤️ Aujourd'hui",
        "nav_week": "📅 Semaine",
        "nav_radar": "🌧️ Radar",
        "nav_fishing": "🎣 Pêche",
        "current_weather": "Météo Actuelle",
        "loading": "Chargement des données météo...",
        "feels_like": "Ressenti:",
        "min_max": "Min/Max:",
        "wind": "Vent:",
        "humidity": "Humidité:",
        "clouds": "Nuages:",
        "precipitation": "Précipitations:",
        "forecast_24h": "Prévisions 24h",
        "forecast_7d": "Prévisions 7 Jours",
        "rain_radar": "Radar Pluie",
        "weather_alerts": "Alertes Météo",
        "no_alerts": "Aucune alerte actuelle",
        "fishing_conditions": "🎣 Conditions de Pêche",
        "fishing_forecast": "📊 Prévisions Pêche Prochains Jours",
        "last_updated": "Dernière mise à jour:",
        "refresh": "🔄 Actualiser",
        "data_source": "Données: Open-Meteo | Radar: Windy.com",
        "error_title": "⚠️ Erreur Survenue",
        "error_message": "Une erreur s'est produite lors du chargement des données météo.",
        "close": "Fermer",
        "try_again": "Réessayer",
        "use_location": "📍 Utiliser ma position",
        "determining_location": "📍 Détermination de la position...",
        "unknown_weather": "temps inconnu"
    }
};

class WeatherApp {
    constructor() {
        this.currentLanguage = localStorage.getItem('weatherAppLanguage') || 'nl';
        this.init();
        this.bindEvents();
        this.userLocation = null; // Store GPS coordinates
        
        // Initialize language system
        this.initLanguageSystem();
        
        // Load weather data immediately (no authentication required)
        this.loadWeatherData();
        
        // Auto-refresh every 10 minutes
        setInterval(() => {
            const lat = this.userLocation ? this.userLocation.lat : null;
            const lon = this.userLocation ? this.userLocation.lon : null;
            this.loadWeatherData(false, lat, lon);
        }, 10 * 60 * 1000);
    }

    init() {
        this.currentWeatherElement = document.getElementById('current-data');
        this.loadingElement = document.getElementById('loading');
        this.forecast24hElement = document.getElementById('forecast-24h-data');
        this.forecast7dElement = document.getElementById('forecast-7d-data');
        this.alertsElement = document.getElementById('alerts-data');
        this.lastUpdateElement = document.getElementById('last-update');
        this.refreshBtn = document.getElementById('refresh-btn');
        this.errorModal = document.getElementById('error-modal');
        this.errorMessage = document.getElementById('error-message');
        this.languageSelector = document.getElementById('language-selector');
        this.themeToggle = document.getElementById('theme-toggle');
    }

    // Language system methods
    initLanguageSystem() {
        // Set initial language
        if (this.languageSelector) {
            this.languageSelector.value = this.currentLanguage;
            this.languageSelector.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }
        
        // Apply translations
        this.applyTranslations();
    }

    translate(key) {
        return TRANSLATIONS[this.currentLanguage]?.[key] || TRANSLATIONS['nl'][key] || key;
    }

    changeLanguage(lang) {
        if (TRANSLATIONS[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('weatherAppLanguage', lang);
            this.applyTranslations();
            
            // Reload weather data with new language
            const lat = this.userLocation ? this.userLocation.lat : null;
            const lon = this.userLocation ? this.userLocation.lon : null;
            this.loadWeatherData(true, lat, lon);
        }
    }

    applyTranslations() {
        // Apply translations to all elements with data-translate attribute
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = this.translate(key);
        });

        // Update theme toggle button text based on current theme
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const themeText = this.translate(isDark ? 'theme_light' : 'theme_dark');
        if (this.themeToggle && this.themeToggle.querySelector('span')) {
            this.themeToggle.querySelector('span').textContent = themeText;
        }
        
        // Update location button if it exists
        const locationBtn = document.querySelector('.location-btn');
        if (locationBtn && !locationBtn.disabled) {
            locationBtn.innerHTML = this.translate('use_location');
        }
    }

    bindEvents() {
        this.refreshBtn.addEventListener('click', () => {
            this.refreshWeatherData();
        });

        // Tab navigation
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = e.target.dataset.tab;
                if (tabName) {
                    this.switchTab(tabName);
                }
            });
        });

        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeErrorModal();
            }
            if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
                e.preventDefault();
                this.refreshWeatherData();
            }
        });
    }

    switchTab(tabName) {
        // Update active button
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const targetButton = document.querySelector(`.nav-btn[data-tab="${tabName}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        }

        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const targetContent = document.getElementById(`tab-${tabName}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // Load fishing data when switching to fishing tab
        if (tabName === 'fishing') {
            this.updateFishingConditions();
        }
    }

    async loadWeatherData(showLoading = true, lat = null, lon = null) {
        if (showLoading) {
            this.showLoading();
        }

        try {
            // Build URLs with coordinates and language if provided
            const langParam = `&lang=${this.currentLanguage}`;
            const currentUrl = lat && lon ? `/current?lat=${lat}&lon=${lon}${langParam}` : `/current?lang=${this.currentLanguage}`;
            const forecastUrl = lat && lon ? `/forecast?lat=${lat}&lon=${lon}${langParam}` : `/forecast?lang=${this.currentLanguage}`;
            const alertsUrl = lat && lon ? `/alerts?lat=${lat}&lon=${lon}` : '/alerts';

            // Load all data in parallel for better performance
            const [currentResponse, forecastResponse, alertsResponse] = await Promise.all([
                fetch(currentUrl),
                fetch(forecastUrl),
                fetch(alertsUrl)
            ]);

            if (!currentResponse.ok || !forecastResponse.ok || !alertsResponse.ok) {
                // Check if any response is an authentication error
                if (currentResponse.status === 401 || forecastResponse.status === 401 || alertsResponse.status === 401) {
                    // Redirect to login page
                    window.location.href = '/login';
                    return;
                }
                throw new Error('Failed to fetch weather data');
            }

            const [currentData, forecastData, alertsData] = await Promise.all([
                currentResponse.json(),
                forecastResponse.json(),
                alertsResponse.json()
            ]);

            this.updateCurrentWeather(currentData);
            this.updateForecast24h(forecastData.forecast_24h);
            this.updateForecast7d(forecastData.forecast_7d);
            this.updateAlerts(alertsData.alerts);
            this.updateLastUpdate();
            
            if (showLoading) {
                this.hideLoading();
            }

        } catch (error) {
            console.error('Error loading weather data:', error);
            this.showError('Kon weerdata niet laden. Controleer uw internetverbinding en probeer het opnieuw.');
            
            if (showLoading) {
                this.hideLoading();
            }
        }
    }

    updateCurrentWeather(data) {
        document.getElementById('current-temp').textContent = data.temperature.current;
        document.getElementById('feels-like').textContent = `${data.temperature.feels_like}°C`;
        document.getElementById('min-max').textContent = `${data.temperature.min}° / ${data.temperature.max}°`;
        document.getElementById('weather-description').textContent = data.weather.description;
        
        // Update location display - show place name and coordinates separately if available
        const locationElement = document.getElementById('location-name');
        if (data.location.coords) {
            // Show place name above coordinates
            locationElement.innerHTML = `<strong>${data.location.name}</strong><br><small>${data.location.coords}</small>`;
        } else {
            // Show just the name
            locationElement.textContent = data.location.name;
        }
        
        document.getElementById('wind').textContent = `${data.wind.speed} km/h`;
        document.getElementById('humidity').textContent = `${data.humidity}%`;
        document.getElementById('clouds').textContent = `${data.clouds}%`;
        
        // Precipitation (rain or snow)
        const precipitation = data.rain + data.snow;
        document.getElementById('precipitation').textContent = precipitation > 0 ? `${precipitation.toFixed(1)} mm` : '0 mm';

        // Weather icon - use emoji instead of external images
        const iconElement = document.getElementById('weather-icon');
        const emojiIcon = this.getWeatherEmoji(data.weather.icon);
        iconElement.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="70" font-size="60" text-anchor="middle" x="50">${emojiIcon}</text></svg>`;
        iconElement.alt = data.weather.description;
    }

    updateForecast24h(forecast) {
        this.forecast24hElement.innerHTML = '';
        
        forecast.forEach(item => {
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            
            const time = new Date(item.datetime);
            const timeString = time.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true
            });
            
            const emojiIcon = this.getWeatherEmoji(item.weather.icon);
            
            forecastItem.innerHTML = `
                <div class="forecast-time">${timeString}</div>
                <img class="forecast-icon" 
                     src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='70' font-size='50' text-anchor='middle' x='50'>${emojiIcon}</text></svg>" 
                     alt="${item.weather.description}">
                <div class="forecast-temp">${item.temperature.temp}°</div>
                <div class="forecast-desc">${item.weather.description}</div>
                <div class="forecast-rain">${item.rain > 0 ? `${item.rain.toFixed(1)}mm` : ''}</div>
            `;
            
            this.forecast24hElement.appendChild(forecastItem);
        });
    }

    updateForecast7d(forecast) {
        this.forecast7dElement.innerHTML = '';
        
        forecast.forEach(item => {
            const forecastDay = document.createElement('div');
            forecastDay.className = 'forecast-day';
            
            const date = new Date(item.datetime);
            const dayName = date.toLocaleDateString('nl-NL', { 
                weekday: 'long',
                month: 'short',
                day: 'numeric'
            });
            
            const emojiIcon = this.getWeatherEmoji(item.weather.icon);
            
            forecastDay.innerHTML = `
                <div class="forecast-day-info">
                    <div class="forecast-day-name">${this.capitalizeFirst(dayName)}</div>
                    <img class="forecast-day-icon" 
                         src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='70' font-size='50' text-anchor='middle' x='50'>${emojiIcon}</text></svg>" 
                         alt="${item.weather.description}">
                    <div class="forecast-day-desc">${item.weather.description}</div>
                </div>
                <div class="forecast-day-temp">
                    <strong>${item.temperature.max}°</strong> / ${item.temperature.min}°
                </div>
            `;
            
            this.forecast7dElement.appendChild(forecastDay);
        });
    }

    updateAlerts(alerts) {
        if (!alerts || alerts.length === 0) {
            this.alertsElement.innerHTML = '<p class="no-alerts">Geen actuele waarschuwingen</p>';
            return;
        }

        this.alertsElement.innerHTML = '';
        
        alerts.forEach(alert => {
            const alertItem = document.createElement('div');
            alertItem.className = 'alert-item';
            
            alertItem.innerHTML = `
                <div class="alert-severity">${alert.severity}</div>
                <div class="alert-description">${alert.description}</div>
                <div class="alert-time">Geldig tot: ${new Date(alert.end).toLocaleString('nl-NL')}</div>
            `;
            
            this.alertsElement.appendChild(alertItem);
        });
    }

    updateLastUpdate() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        this.lastUpdateElement.textContent = timeString;
    }

    showLoading() {
        this.loadingElement.style.display = 'block';
        this.currentWeatherElement.style.display = 'none';
    }

    hideLoading() {
        this.loadingElement.style.display = 'none';
        this.currentWeatherElement.style.display = 'block';
    }

    refreshWeatherData() {
        this.refreshBtn.disabled = true;
        this.refreshBtn.innerHTML = '🔄 Laden...';
        
        // Use stored GPS coordinates if available
        const lat = this.userLocation ? this.userLocation.lat : null;
        const lon = this.userLocation ? this.userLocation.lon : null;
        
        this.loadWeatherData(true, lat, lon).finally(() => {
            setTimeout(() => {
                this.refreshBtn.disabled = false;
                this.refreshBtn.innerHTML = '🔄 Vernieuwen';
            }, 1000);
        });
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorModal.style.display = 'flex';
    }

    closeErrorModal() {
        this.errorModal.style.display = 'none';
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getWeatherEmoji(iconCode) {
        // Convert OpenWeatherMap-style icon codes to emoji
        const iconMap = {
            '01d': '☀️',   // clear sky day
            '01n': '🌙',   // clear sky night
            '02d': '⛅',   // few clouds day
            '02n': '☁️',   // few clouds night
            '03d': '☁️',   // scattered clouds
            '03n': '☁️',   // scattered clouds
            '04d': '☁️',   // broken clouds
            '04n': '☁️',   // broken clouds
            '09d': '🌦️',   // shower rain
            '09n': '🌦️',   // shower rain
            '10d': '🌧️',   // rain day
            '10n': '🌧️',   // rain night
            '11d': '⛈️',   // thunderstorm
            '11n': '⛈️',   // thunderstorm
            '13d': '❄️',   // snow
            '13n': '❄️',   // snow
            '50d': '🌫️',   // mist
            '50n': '🌫️'    // mist
        };
        
        return iconMap[iconCode] || '☁️'; // default to cloud emoji
    }

    // Fishing conditions logic
    updateFishingConditions() {
        // Try to get weather data for fishing analysis
        const currentTemp = document.getElementById('current-temp')?.textContent || '15';
        const windSpeed = document.getElementById('wind')?.textContent?.replace(' km/h', '') || '10';
        const clouds = document.getElementById('clouds')?.textContent?.replace('%', '') || '50';
        const humidity = document.getElementById('humidity')?.textContent?.replace('%', '') || '60';
        const precipitation = document.getElementById('precipitation')?.textContent?.replace(' mm', '') || '0';

        const fishingData = this.calculateFishingConditions({
            temperature: parseInt(currentTemp),
            windSpeed: parseInt(windSpeed),
            clouds: parseInt(clouds),
            humidity: parseInt(humidity),
            precipitation: parseFloat(precipitation)
        });

        this.displayFishingConditions(fishingData);
        this.displayFishingForecast();
    }

    calculateFishingConditions(weather) {
        let score = 0;
        let factors = [];

        // Temperature factor (ideal: 15-25°C)
        const temp = weather.temperature;
        let tempScore = 0;
        let tempStatus = '';
        if (temp >= 15 && temp <= 25) {
            tempScore = 25;
            tempStatus = 'Ideaal voor vissen';
        } else if (temp >= 10 && temp < 15 || temp > 25 && temp <= 30) {
            tempScore = 15;
            tempStatus = 'Goed voor vissen';
        } else if (temp >= 5 && temp < 10 || temp > 30 && temp <= 35) {
            tempScore = 10;
            tempStatus = 'Matig voor vissen';
        } else {
            tempScore = 5;
            tempStatus = 'Moeilijke omstandigheden';
        }
        
        factors.push({
            icon: '🌡️',
            name: 'Temperatuur',
            value: `${temp}°C`,
            status: tempStatus
        });

        // Wind factor (ideal: 5-15 km/h)
        const wind = weather.windSpeed;
        let windScore = 0;
        let windStatus = '';
        if (wind >= 5 && wind <= 15) {
            windScore = 25;
            windStatus = 'Perfect voor vissen';
        } else if (wind >= 0 && wind < 5 || wind > 15 && wind <= 25) {
            windScore = 15;
            windStatus = 'Acceptabel';
        } else if (wind > 25 && wind <= 35) {
            windScore = 10;
            windStatus = 'Te winderig';
        } else {
            windScore = 5;
            windStatus = 'Zeer moeilijk';
        }
        
        factors.push({
            icon: '💨',
            name: 'Wind',
            value: `${wind} km/h`,
            status: windStatus
        });

        // Cloud cover factor (ideal: 50-80% overcast)
        const cloudCover = weather.clouds;
        let cloudScore = 0;
        let cloudStatus = '';
        if (cloudCover >= 50 && cloudCover <= 80) {
            cloudScore = 20;
            cloudStatus = 'Ideaal bewolkt';
        } else if (cloudCover >= 30 && cloudCover < 50 || cloudCover > 80 && cloudCover <= 95) {
            cloudScore = 15;
            cloudStatus = 'Goed';
        } else if (cloudCover < 30) {
            cloudScore = 10;
            cloudStatus = 'Te zonnig';
        } else {
            cloudScore = 8;
            cloudStatus = 'Te bewolkt';
        }
        
        factors.push({
            icon: '☁️',
            name: 'Bewolking',
            value: `${cloudCover}%`,
            status: cloudStatus
        });

        // Precipitation factor (light rain can be good)
        const rain = weather.precipitation;
        let rainScore = 0;
        let rainStatus = '';
        if (rain === 0) {
            rainScore = 15;
            rainStatus = 'Droog weer';
        } else if (rain > 0 && rain <= 2) {
            rainScore = 20;
            rainStatus = 'Lichte regen - goed!';
        } else if (rain > 2 && rain <= 5) {
            rainScore = 10;
            rainStatus = 'Matige regen';
        } else {
            rainScore = 5;
            rainStatus = 'Teveel regen';
        }
        
        factors.push({
            icon: '🌧️',
            name: 'Neerslag',
            value: rain > 0 ? `${rain} mm` : 'Geen',
            status: rainStatus
        });

        // Humidity factor
        const humid = weather.humidity;
        let humidScore = 0;
        let humidStatus = '';
        if (humid >= 60 && humid <= 80) {
            humidScore = 10;
            humidStatus = 'Ideaal vochtig';
        } else if (humid >= 50 && humid < 60 || humid > 80 && humid <= 90) {
            humidScore = 8;
            humidStatus = 'Acceptabel';
        } else {
            humidScore = 5;
            humidStatus = humid < 50 ? 'Te droog' : 'Te vochtig';
        }
        
        factors.push({
            icon: '💧',
            name: 'Luchtvochtigheid',
            value: `${humid}%`,
            status: humidStatus
        });

        score = tempScore + windScore + cloudScore + rainScore + humidScore;
        
        let rating = '';
        let description = '';
        if (score >= 80) {
            rating = 'Uitstekend';
            description = 'Perfect weer om te gaan vissen! Alle omstandigheden zijn ideaal.';
        } else if (score >= 60) {
            rating = 'Goed';
            description = 'Goede omstandigheden voor het vissen. Succes verwacht!';
        } else if (score >= 40) {
            rating = 'Matig';
            description = 'Redelijke omstandigheden. Met de juiste techniek nog steeds kansrijk.';
        } else {
            rating = 'Slecht';
            description = 'Moeilijke omstandigheden voor het vissen. Overweeg een andere dag.';
        }

        return {
            score: score,
            rating: rating,
            description: description,
            factors: factors
        };
    }

    displayFishingConditions(fishingData) {
        const fishingDataElement = document.getElementById('fishing-data');
        if (!fishingDataElement) return;

        let scoreColor = '';
        if (fishingData.score >= 80) scoreColor = '#00b894';
        else if (fishingData.score >= 60) scoreColor = '#74b9ff';
        else if (fishingData.score >= 40) scoreColor = '#fdcb6e';
        else scoreColor = '#e17055';

        fishingDataElement.innerHTML = `
            <div class="fishing-overview">
                <div class="fishing-score" style="background: linear-gradient(135deg, ${scoreColor}, ${scoreColor}aa);">
                    <div class="score-value">${fishingData.score}</div>
                    <div class="score-label">${fishingData.rating}</div>
                    <div class="score-description">${fishingData.description}</div>
                </div>
            </div>
            
            <div class="fishing-factors">
                ${fishingData.factors.map(factor => `
                    <div class="fishing-factor">
                        <div class="factor-icon">${factor.icon}</div>
                        <div class="factor-info">
                            <h4>${factor.name}</h4>
                            <p class="factor-value">${factor.value}</p>
                            <p class="factor-status">${factor.status}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="margin-top: 25px; padding: 20px; background: rgba(116, 185, 255, 0.1); border-radius: 12px; border-left: 4px solid #74b9ff;">
                <h4 style="margin: 0 0 10px 0; color: var(--text-primary);">🎯 Vis Tips voor Vandaag</h4>
                <ul style="margin: 0; padding-left: 20px; color: var(--text-secondary); line-height: 1.6;">
                    ${this.getFishingTips(fishingData).map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    getFishingTips(fishingData) {
        const tips = [];
        const temp = parseInt(document.getElementById('current-temp')?.textContent || '15');
        const wind = parseInt(document.getElementById('wind')?.textContent?.replace(' km/h', '') || '10');
        
        // Temperature-based tips
        if (temp < 10) {
            tips.push('Gebruik langzaam bewegende aas bij koude temperaturen');
            tips.push('Vis dieper waar het water warmer is');
        } else if (temp > 25) {
            tips.push('Vroeg in de ochtend of laat in de avond vissen');
            tips.push('Zoek schaduwrijke plekken op');
        } else {
            tips.push('Ideale temperatuur - probeer verschillende dieptes');
        }

        // Wind-based tips
        if (wind < 5) {
            tips.push('Bij weinig wind: probeer oppervlakte lokken');
        } else if (wind > 20) {
            tips.push('Gebruik zwaardere gewichten vanwege de wind');
            tips.push('Zoek luwe plekken achter obstakels');
        } else {
            tips.push('Perfecte wind - probeer de lijzijde van het water');
        }

        // Weather-based tips
        const rain = parseFloat(document.getElementById('precipitation')?.textContent?.replace(' mm', '') || '0');
        if (rain > 0 && rain <= 2) {
            tips.push('Lichte regen activeert vissen - goede kans!');
        } else if (rain > 2) {
            tips.push('Zoek beschutting en vis dicht bij oevers');
        }

        // Ensure we have at least 3 tips
        if (tips.length < 3) {
            tips.push('Houd uw aas in beweging voor betere resultaten');
            tips.push('Let op vogels - zij wijzen vaak naar vis');
            tips.push('Wees geduldig en wissel van techniek als het niet werkt');
        }

        return tips.slice(0, 4); // Maximum 4 tips
    }

    displayFishingForecast() {
        // Generate forecast for upcoming days based on 7-day weather data
        const forecastElement = document.getElementById('fishing-forecast-data');
        if (!forecastElement) return;

        // Mock forecast data - in real app would use actual forecast data
        const days = [
            { name: 'Morgen', temp: 18, wind: 12, rain: 0, clouds: 60 },
            { name: 'Overmorgen', temp: 22, wind: 8, rain: 1, clouds: 40 },
            { name: 'Woensdag', temp: 16, wind: 15, rain: 3, clouds: 80 },
            { name: 'Donderdag', temp: 20, wind: 6, rain: 0, clouds: 30 },
            { name: 'Vrijdag', temp: 24, wind: 18, rain: 0, clouds: 20 }
        ];

        const forecastHTML = days.map(day => {
            const conditions = this.calculateFishingConditions({
                temperature: day.temp,
                windSpeed: day.wind,
                clouds: day.clouds,
                humidity: 65,
                precipitation: day.rain
            });

            let ratingClass = '';
            if (conditions.score >= 80) ratingClass = 'excellent';
            else if (conditions.score >= 60) ratingClass = 'good';
            else if (conditions.score >= 40) ratingClass = 'fair';
            else ratingClass = 'poor';

            return `
                <div class="fishing-forecast-day ${ratingClass}">
                    <div class="fishing-day-info">
                        <div class="fishing-day-name">${day.name}</div>
                        <div class="fishing-score-badge ${ratingClass}">${conditions.score}</div>
                        <div class="fishing-conditions-summary">
                            ${day.wind} km/h wind, ${day.clouds}% bewolkt
                            ${day.rain > 0 ? `, ${day.rain}mm regen` : ''}
                        </div>
                    </div>
                    <div class="fishing-weather-summary">
                        <div class="fishing-temp">${day.temp}°C</div>
                        <div class="fishing-weather-desc">${conditions.rating}</div>
                    </div>
                </div>
            `;
        }).join('');

        forecastElement.innerHTML = forecastHTML;
    }


    // Get user's location (with permission)
    async getUserLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocatie wordt niet ondersteund door deze browser'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => {
                    let errorMessage = 'Kon locatie niet bepalen';
                    
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = 'Locatietoegang geweigerd. Geef toestemming voor locatie in uw browser.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = 'Locatie niet beschikbaar. Controleer uw GPS-verbinding.';
                            break;
                        case error.TIMEOUT:
                            errorMessage = 'Time-out bij bepalen van locatie. Probeer het opnieuw.';
                            break;
                        default:
                            errorMessage = 'Onbekende fout bij bepalen van locatie: ' + error.message;
                            break;
                    }
                    
                    reject(new Error(errorMessage));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes
                }
            );
        });
    }
}

// Global functions for modal
function closeErrorModal() {
    if (window.weatherApp) {
        window.weatherApp.closeErrorModal();
    }
}

function refreshWeatherData() {
    if (window.weatherApp) {
        window.weatherApp.refreshWeatherData();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.weatherApp = new WeatherApp();
    
    // Add geolocation button if supported
    if (navigator.geolocation) {
        const header = document.querySelector('header p');
        const locationBtn = document.createElement('button');
        locationBtn.innerHTML = window.weatherApp ? window.weatherApp.translate('use_location') : '📍 Gebruik mijn locatie';
        locationBtn.className = 'location-btn';
        locationBtn.style.cssText = `
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.3);
            padding: 8px 16px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9em;
            margin-top: 10px;
            transition: all 0.3s ease;
        `;
        
        locationBtn.addEventListener('click', async () => {
            try {
                locationBtn.disabled = true;
                locationBtn.innerHTML = window.weatherApp ? window.weatherApp.translate('determining_location') : '📍 Locatie bepalen...';
                
                const location = await window.weatherApp.getUserLocation();
                
                // Store GPS coordinates in the app instance
                window.weatherApp.userLocation = location;
                
                // Load weather data with GPS coordinates
                window.weatherApp.loadWeatherData(true, location.lat, location.lon);
                
            } catch (error) {
                console.error('Geolocation error:', error);
                window.weatherApp.showError(error.message);
            } finally {
                locationBtn.disabled = false;
                locationBtn.innerHTML = window.weatherApp ? window.weatherApp.translate('use_location') : '📍 Gebruik mijn locatie';
            }
        });
        
        locationBtn.addEventListener('mouseenter', () => {
            locationBtn.style.background = 'rgba(255, 255, 255, 0.3)';
            locationBtn.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        });
        
        locationBtn.addEventListener('mouseleave', () => {
            locationBtn.style.background = 'rgba(255, 255, 255, 0.2)';
            locationBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });
        
        header.appendChild(locationBtn);
    }
});

// Service Worker registration for offline functionality (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.registerServiceWorker('/sw.js')
        // Service worker implementation would go here for offline support
    });
}

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Weather app loaded in ${Math.round(loadTime)}ms`);
    
    // Check if load time exceeds requirement (2 seconds)
    if (loadTime > 2000) {
        console.warn('Load time exceeds 2 second requirement');
    }
});

// Games functionality
let currentGame = 'menu';

function showGame(gameType) {
    // Hide all game containers
    document.querySelectorAll('.game-container').forEach(container => {
        container.style.display = 'none';
    });
    
    // Show selected game or menu
    if (gameType === 'menu') {
        currentGame = 'menu';
        return;
    }
    
    const gameContainer = document.getElementById(`game-${gameType}`);
    if (gameContainer) {
        gameContainer.style.display = 'block';
        currentGame = gameType;
        
        // Initialize the specific game
        if (gameType === '2048' && !document.getElementById('grid-2048').hasChildNodes()) {
            initGame2048();
        } else if (gameType === 'guess') {
            newGuessGame();
        } else if (gameType === 'snake') {
            // Snake game will be initialized when start button is clicked
        } else if (gameType === 'pong') {
            // Pong game will be initialized when start button is clicked
        } else if (gameType === 'breakout') {
            // Breakout game will be initialized when start button is clicked
        }
    }
}

// 2048 Game Implementation
let game2048 = {
    grid: [],
    score: 0,
    size: 4
};

function initGame2048() {
    const gridContainer = document.getElementById('grid-2048');
    gridContainer.innerHTML = '';
    
    // Create grid cells
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.dataset.index = i;
        gridContainer.appendChild(cell);
    }
    
    newGame2048();
    
    // Add keyboard listeners
    document.addEventListener('keydown', handle2048KeyPress);
}

function newGame2048() {
    game2048.grid = Array(16).fill(0);
    game2048.score = 0;
    updateScore2048();
    addRandomTile2048();
    addRandomTile2048();
    render2048();
}

function addRandomTile2048() {
    const emptyCells = [];
    for (let i = 0; i < 16; i++) {
        if (game2048.grid[i] === 0) {
            emptyCells.push(i);
        }
    }
    
    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        game2048.grid[randomIndex] = Math.random() < 0.9 ? 2 : 4;
    }
}

function render2048() {
    const cells = document.querySelectorAll('#grid-2048 .grid-cell');
    cells.forEach((cell, index) => {
        const value = game2048.grid[index];
        cell.textContent = value === 0 ? '' : value;
        cell.className = `grid-cell ${value === 0 ? '' : `tile-${value}`}`;
    });
}

function updateScore2048() {
    document.getElementById('score-2048').textContent = game2048.score;
}

function handle2048KeyPress(e) {
    if (currentGame !== '2048') return;
    
    let moved = false;
    const originalGrid = [...game2048.grid];
    
    switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            moved = moveUp2048();
            break;
        case 'ArrowDown':
            e.preventDefault();
            moved = moveDown2048();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            moved = moveLeft2048();
            break;
        case 'ArrowRight':
            e.preventDefault();
            moved = moveRight2048();
            break;
    }
    
    if (moved) {
        addRandomTile2048();
        render2048();
        updateScore2048();
    }
}

function moveLeft2048() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        const rowArray = [];
        for (let col = 0; col < 4; col++) {
            rowArray.push(game2048.grid[row * 4 + col]);
        }
        
        const newRow = slideAndMerge(rowArray);
        for (let col = 0; col < 4; col++) {
            const newValue = newRow[col];
            const oldValue = game2048.grid[row * 4 + col];
            if (newValue !== oldValue) {
                moved = true;
            }
            game2048.grid[row * 4 + col] = newValue;
        }
    }
    return moved;
}

function moveRight2048() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        const rowArray = [];
        for (let col = 3; col >= 0; col--) {
            rowArray.push(game2048.grid[row * 4 + col]);
        }
        
        const newRow = slideAndMerge(rowArray);
        for (let col = 0; col < 4; col++) {
            const newValue = newRow[col];
            const oldValue = game2048.grid[row * 4 + (3 - col)];
            if (newValue !== oldValue) {
                moved = true;
            }
            game2048.grid[row * 4 + (3 - col)] = newValue;
        }
    }
    return moved;
}

function moveUp2048() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        const colArray = [];
        for (let row = 0; row < 4; row++) {
            colArray.push(game2048.grid[row * 4 + col]);
        }
        
        const newCol = slideAndMerge(colArray);
        for (let row = 0; row < 4; row++) {
            const newValue = newCol[row];
            const oldValue = game2048.grid[row * 4 + col];
            if (newValue !== oldValue) {
                moved = true;
            }
            game2048.grid[row * 4 + col] = newValue;
        }
    }
    return moved;
}

function moveDown2048() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        const colArray = [];
        for (let row = 3; row >= 0; row--) {
            colArray.push(game2048.grid[row * 4 + col]);
        }
        
        const newCol = slideAndMerge(colArray);
        for (let row = 0; row < 4; row++) {
            const newValue = newCol[row];
            const oldValue = game2048.grid[(3 - row) * 4 + col];
            if (newValue !== oldValue) {
                moved = true;
            }
            game2048.grid[(3 - row) * 4 + col] = newValue;
        }
    }
    return moved;
}

function slideAndMerge(array) {
    // Remove zeros
    const filtered = array.filter(val => val !== 0);
    
    // Merge adjacent equal numbers
    for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
            filtered[i] *= 2;
            game2048.score += filtered[i];
            filtered[i + 1] = 0;
        }
    }
    
    // Remove zeros again and fill to length 4
    const result = filtered.filter(val => val !== 0);
    while (result.length < 4) {
        result.push(0);
    }
    
    return result;
}

// Flappy Bird Game Implementation
let flappyGame = {
    bird: { x: 50, y: 150, velocity: 0 },
    pipes: [],
    score: 0,
    gameRunning: false,
    canvas: null,
    ctx: null
};

function startFlappyGame() {
    const canvas = document.getElementById('flappy-canvas');
    const ctx = canvas.getContext('2d');
    
    flappyGame.canvas = canvas;
    flappyGame.ctx = ctx;
    flappyGame.bird = { x: 50, y: 150, velocity: 0 };
    flappyGame.pipes = [];
    flappyGame.score = 0;
    flappyGame.gameRunning = true;
    
    document.getElementById('score-flappy').textContent = '0';
    
    // Add event listeners
    canvas.addEventListener('click', flappyJump);
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' && currentGame === 'flappy') {
            e.preventDefault();
            flappyJump();
        }
    });
    
    // Start game loop
    flappyGameLoop();
}

function flappyJump() {
    if (flappyGame.gameRunning) {
        flappyGame.bird.velocity = -8;
    }
}

function flappyGameLoop() {
    if (!flappyGame.gameRunning) return;
    
    // Clear canvas
    flappyGame.ctx.fillStyle = '#87CEEB';
    flappyGame.ctx.fillRect(0, 0, 400, 300);
    
    // Update bird
    flappyGame.bird.velocity += 0.5; // gravity
    flappyGame.bird.y += flappyGame.bird.velocity;
    
    // Check ground/ceiling collision
    if (flappyGame.bird.y < 0 || flappyGame.bird.y > 280) {
        endFlappyGame();
        return;
    }
    
    // Add pipes
    if (flappyGame.pipes.length === 0 || flappyGame.pipes[flappyGame.pipes.length - 1].x < 200) {
        const pipeHeight = Math.random() * 150 + 50;
        flappyGame.pipes.push({
            x: 400,
            topHeight: pipeHeight,
            bottomY: pipeHeight + 80,
            scored: false
        });
    }
    
    // Update and draw pipes
    flappyGame.pipes.forEach((pipe, index) => {
        pipe.x -= 3;
        
        // Draw top pipe
        flappyGame.ctx.fillStyle = '#228B22';
        flappyGame.ctx.fillRect(pipe.x, 0, 30, pipe.topHeight);
        
        // Draw bottom pipe
        flappyGame.ctx.fillRect(pipe.x, pipe.bottomY, 30, 300 - pipe.bottomY);
        
        // Check collision
        if (flappyGame.bird.x + 20 > pipe.x && flappyGame.bird.x < pipe.x + 30) {
            if (flappyGame.bird.y < pipe.topHeight || flappyGame.bird.y + 20 > pipe.bottomY) {
                endFlappyGame();
                return;
            }
        }
        
        // Score
        if (!pipe.scored && pipe.x + 30 < flappyGame.bird.x) {
            pipe.scored = true;
            flappyGame.score++;
            document.getElementById('score-flappy').textContent = flappyGame.score;
        }
        
        // Remove off-screen pipes
        if (pipe.x < -30) {
            flappyGame.pipes.splice(index, 1);
        }
    });
    
    // Draw bird
    flappyGame.ctx.fillStyle = '#FFD700';
    flappyGame.ctx.fillRect(flappyGame.bird.x, flappyGame.bird.y, 20, 20);
    
    requestAnimationFrame(flappyGameLoop);
}

function endFlappyGame() {
    flappyGame.gameRunning = false;
    alert(`Game Over! Final Score: ${flappyGame.score}`);
}

// Guess the Number Game Implementation
let guessGame = {
    targetNumber: 0,
    attempts: 0,
    maxNumber: 100
};

function newGuessGame() {
    guessGame.targetNumber = Math.floor(Math.random() * guessGame.maxNumber) + 1;
    guessGame.attempts = 0;
    document.getElementById('attempts-count').textContent = '0';
    document.getElementById('guess-input').value = '';
    document.getElementById('guess-feedback').innerHTML = '';
    document.getElementById('guess-input').focus();
    
    // Add enter key listener
    document.getElementById('guess-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            makeGuess();
        }
    });
}

function makeGuess() {
    const input = document.getElementById('guess-input');
    const feedback = document.getElementById('guess-feedback');
    const guess = parseInt(input.value);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        feedback.innerHTML = '<p style="color: red;">Please enter a number between 1 and 100</p>';
        return;
    }
    
    guessGame.attempts++;
    document.getElementById('attempts-count').textContent = guessGame.attempts;
    
    if (guess === guessGame.targetNumber) {
        feedback.innerHTML = `<p style="color: green;">🎉 Congratulations! You guessed it in ${guessGame.attempts} attempts!</p>`;
        input.disabled = true;
    } else if (guess < guessGame.targetNumber) {
        feedback.innerHTML = '<p style="color: blue;">📈 Too low! Try a higher number.</p>';
    } else {
        feedback.innerHTML = '<p style="color: orange;">📉 Too high! Try a lower number.</p>';
    }
    
    input.value = '';
    input.focus();
}

// Snake Game Implementation
let snakeGame = {
    canvas: null,
    ctx: null,
    snake: [],
    food: {},
    direction: 'right',
    score: 0,
    gameRunning: false,
    gridSize: 20
};

function startSnakeGame() {
    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');
    
    snakeGame.canvas = canvas;
    snakeGame.ctx = ctx;
    snakeGame.snake = [{x: 200, y: 200}];
    snakeGame.food = generateFood();
    snakeGame.direction = 'right';
    snakeGame.score = 0;
    snakeGame.gameRunning = true;
    
    document.getElementById('score-snake').textContent = '0';
    
    // Add event listeners
    document.addEventListener('keydown', handleSnakeKeyPress);
    
    // Start game loop
    snakeGameLoop();
}

function generateFood() {
    const canvas = snakeGame.canvas;
    const gridSize = snakeGame.gridSize;
    return {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
    };
}

function handleSnakeKeyPress(e) {
    if (currentGame !== 'snake' || !snakeGame.gameRunning) return;
    
    switch(e.key) {
        case 'ArrowUp':
            if (snakeGame.direction !== 'down') snakeGame.direction = 'up';
            break;
        case 'ArrowDown':
            if (snakeGame.direction !== 'up') snakeGame.direction = 'down';
            break;
        case 'ArrowLeft':
            if (snakeGame.direction !== 'right') snakeGame.direction = 'left';
            break;
        case 'ArrowRight':
            if (snakeGame.direction !== 'left') snakeGame.direction = 'right';
            break;
    }
}

function snakeGameLoop() {
    if (!snakeGame.gameRunning) return;
    
    // Clear canvas
    snakeGame.ctx.fillStyle = '#2c3e50';
    snakeGame.ctx.fillRect(0, 0, snakeGame.canvas.width, snakeGame.canvas.height);
    
    // Move snake
    const head = {...snakeGame.snake[0]};
    switch(snakeGame.direction) {
        case 'up': head.y -= snakeGame.gridSize; break;
        case 'down': head.y += snakeGame.gridSize; break;
        case 'left': head.x -= snakeGame.gridSize; break;
        case 'right': head.x += snakeGame.gridSize; break;
    }
    
    // Check wall collision
    if (head.x < 0 || head.x >= snakeGame.canvas.width || 
        head.y < 0 || head.y >= snakeGame.canvas.height) {
        endSnakeGame();
        return;
    }
    
    // Check self collision
    for (let segment of snakeGame.snake) {
        if (head.x === segment.x && head.y === segment.y) {
            endSnakeGame();
            return;
        }
    }
    
    snakeGame.snake.unshift(head);
    
    // Check food collision
    if (head.x === snakeGame.food.x && head.y === snakeGame.food.y) {
        snakeGame.score += 10;
        document.getElementById('score-snake').textContent = snakeGame.score;
        snakeGame.food = generateFood();
    } else {
        snakeGame.snake.pop();
    }
    
    // Draw snake
    snakeGame.ctx.fillStyle = '#27ae60';
    for (let segment of snakeGame.snake) {
        snakeGame.ctx.fillRect(segment.x, segment.y, snakeGame.gridSize, snakeGame.gridSize);
    }
    
    // Draw food
    snakeGame.ctx.fillStyle = '#e74c3c';
    snakeGame.ctx.fillRect(snakeGame.food.x, snakeGame.food.y, snakeGame.gridSize, snakeGame.gridSize);
    
    setTimeout(snakeGameLoop, 150);
}

function endSnakeGame() {
    snakeGame.gameRunning = false;
    snakeGame.ctx.fillStyle = '#f01212ff';
    snakeGame.ctx.font = '24px Arial';
    snakeGame.ctx.textAlign = 'center';
    snakeGame.ctx.fillText('Game Over!', snakeGame.canvas.width/2, snakeGame.canvas.height/2);
    snakeGame.ctx.fillText(`Score: ${snakeGame.score}`, snakeGame.canvas.width/2, snakeGame.canvas.height/2 + 30);
}

// Pong Game Implementation
let pongGame = {
    canvas: null,
    ctx: null,
    paddleHeight: 60,
    paddleWidth: 10,
    ballRadius: 8,
    leftPaddle: { y: 0 },
    rightPaddle: { y: 0 },
    ball: { x: 0, y: 0, dx: 0, dy: 0 },
    leftScore: 0,
    rightScore: 0,
    gameRunning: false,
    keys: {}
};

function startPongGame() {
    const canvas = document.getElementById('pong-canvas');
    const ctx = canvas.getContext('2d');
    
    pongGame.canvas = canvas;
    pongGame.ctx = ctx;
    pongGame.leftPaddle.y = canvas.height / 2 - pongGame.paddleHeight / 2;
    pongGame.rightPaddle.y = canvas.height / 2 - pongGame.paddleHeight / 2;
    pongGame.ball.x = canvas.width / 2;
    pongGame.ball.y = canvas.height / 2;
    pongGame.ball.dx = 3;
    pongGame.ball.dy = 2;
    pongGame.leftScore = 0;
    pongGame.rightScore = 0;
    pongGame.gameRunning = true;
    
    document.getElementById('score-pong').textContent = '0 - 0';
    
    // Add event listeners
    document.addEventListener('keydown', handlePongKeyDown);
    document.addEventListener('keyup', handlePongKeyUp);
    
    // Start game loop
    pongGameLoop();
}

function handlePongKeyDown(e) {
    if (currentGame !== 'pong') return;
    pongGame.keys[e.key] = true;
}

function handlePongKeyUp(e) {
    if (currentGame !== 'pong') return;
    pongGame.keys[e.key] = false;
}

function pongGameLoop() {
    if (!pongGame.gameRunning) return;
    
    // Clear canvas
    pongGame.ctx.fillStyle = '#000';
    pongGame.ctx.fillRect(0, 0, pongGame.canvas.width, pongGame.canvas.height);
    
    // Move left paddle (W/S keys)
    if (pongGame.keys['w'] && pongGame.leftPaddle.y > 0) {
        pongGame.leftPaddle.y -= 5;
    }
    if (pongGame.keys['s'] && pongGame.leftPaddle.y < pongGame.canvas.height - pongGame.paddleHeight) {
        pongGame.leftPaddle.y += 5;
    }
    
    // Simple AI for right paddle
    if (pongGame.ball.y < pongGame.rightPaddle.y + pongGame.paddleHeight / 2) {
        pongGame.rightPaddle.y -= 3;
    } else {
        pongGame.rightPaddle.y += 3;
    }
    
    // Move ball
    pongGame.ball.x += pongGame.ball.dx;
    pongGame.ball.y += pongGame.ball.dy;
    
    // Ball collision with top/bottom
    if (pongGame.ball.y <= pongGame.ballRadius || pongGame.ball.y >= pongGame.canvas.height - pongGame.ballRadius) {
        pongGame.ball.dy = -pongGame.ball.dy;
    }
    
    // Ball collision with left paddle
    if (pongGame.ball.x <= pongGame.paddleWidth + pongGame.ballRadius &&
        pongGame.ball.y >= pongGame.leftPaddle.y &&
        pongGame.ball.y <= pongGame.leftPaddle.y + pongGame.paddleHeight) {
        pongGame.ball.dx = -pongGame.ball.dx;
    }
    
    // Ball collision with right paddle
    if (pongGame.ball.x >= pongGame.canvas.width - pongGame.paddleWidth - pongGame.ballRadius &&
        pongGame.ball.y >= pongGame.rightPaddle.y &&
        pongGame.ball.y <= pongGame.rightPaddle.y + pongGame.paddleHeight) {
        pongGame.ball.dx = -pongGame.ball.dx;
    }
    
    // Score
    if (pongGame.ball.x < 0) {
        pongGame.rightScore++;
        resetBall();
    } else if (pongGame.ball.x > pongGame.canvas.width) {
        pongGame.leftScore++;
        resetBall();
    }
    
    // Draw paddles
    pongGame.ctx.fillStyle = '#fff';
    pongGame.ctx.fillRect(0, pongGame.leftPaddle.y, pongGame.paddleWidth, pongGame.paddleHeight);
    pongGame.ctx.fillRect(pongGame.canvas.width - pongGame.paddleWidth, pongGame.rightPaddle.y, pongGame.paddleWidth, pongGame.paddleHeight);
    
    // Draw ball
    pongGame.ctx.beginPath();
    pongGame.ctx.arc(pongGame.ball.x, pongGame.ball.y, pongGame.ballRadius, 0, Math.PI * 2);
    pongGame.ctx.fill();
    
    // Draw center line
    pongGame.ctx.setLineDash([5, 5]);
    pongGame.ctx.beginPath();
    pongGame.ctx.moveTo(pongGame.canvas.width / 2, 0);
    pongGame.ctx.lineTo(pongGame.canvas.width / 2, pongGame.canvas.height);
    pongGame.ctx.stroke();
    
    // Update score
    document.getElementById('score-pong').textContent = `${pongGame.leftScore} - ${pongGame.rightScore}`;
    
    requestAnimationFrame(pongGameLoop);
}

function resetBall() {
    pongGame.ball.x = pongGame.canvas.width / 2;
    pongGame.ball.y = pongGame.canvas.height / 2;
    pongGame.ball.dx = -pongGame.ball.dx;
}

// Breakout Game Implementation
let breakoutGame = {
    canvas: null,
    ctx: null,
    paddle: { x: 0, y: 0, width: 80, height: 10 },
    ball: { x: 0, y: 0, dx: 0, dy: 0, radius: 8 },
    bricks: [],
    score: 0,
    gameRunning: false,
    keys: {}
};

function startBreakoutGame() {
    const canvas = document.getElementById('breakout-canvas');
    const ctx = canvas.getContext('2d');
    
    breakoutGame.canvas = canvas;
    breakoutGame.ctx = ctx;
    breakoutGame.paddle.x = canvas.width / 2 - breakoutGame.paddle.width / 2;
    breakoutGame.paddle.y = canvas.height - 20;
    breakoutGame.ball.x = canvas.width / 2;
    breakoutGame.ball.y = canvas.height - 40;
    breakoutGame.ball.dx = 3;
    breakoutGame.ball.dy = -3;
    breakoutGame.score = 0;
    breakoutGame.gameRunning = true;
    
    // Initialize bricks
    breakoutGame.bricks = [];
    const brickRows = 5;
    const brickCols = 8;
    const brickWidth = 50;
    const brickHeight = 20;
    
    for (let row = 0; row < brickRows; row++) {
        for (let col = 0; col < brickCols; col++) {
            breakoutGame.bricks.push({
                x: col * (brickWidth + 5) + 30,
                y: row * (brickHeight + 5) + 50,
                width: brickWidth,
                height: brickHeight,
                visible: true
            });
        }
    }
    
    document.getElementById('score-breakout').textContent = '0';
    
    // Add event listeners
    document.addEventListener('keydown', handleBreakoutKeyDown);
    document.addEventListener('keyup', handleBreakoutKeyUp);
    
    // Start game loop
    breakoutGameLoop();
}

function handleBreakoutKeyDown(e) {
    if (currentGame !== 'breakout') return;
    breakoutGame.keys[e.key] = true;
}

function handleBreakoutKeyUp(e) {
    if (currentGame !== 'breakout') return;
    breakoutGame.keys[e.key] = false;
}

function breakoutGameLoop() {
    if (!breakoutGame.gameRunning) return;
    
    // Clear canvas
    breakoutGame.ctx.fillStyle = '#2c3e50';
    breakoutGame.ctx.fillRect(0, 0, breakoutGame.canvas.width, breakoutGame.canvas.height);
    
    // Move paddle
    if (breakoutGame.keys['ArrowLeft'] && breakoutGame.paddle.x > 0) {
        breakoutGame.paddle.x -= 7;
    }
    if (breakoutGame.keys['ArrowRight'] && breakoutGame.paddle.x < breakoutGame.canvas.width - breakoutGame.paddle.width) {
        breakoutGame.paddle.x += 7;
    }
    
    // Move ball
    breakoutGame.ball.x += breakoutGame.ball.dx;
    breakoutGame.ball.y += breakoutGame.ball.dy;
    
    // Ball collision with walls
    if (breakoutGame.ball.x <= breakoutGame.ball.radius || breakoutGame.ball.x >= breakoutGame.canvas.width - breakoutGame.ball.radius) {
        breakoutGame.ball.dx = -breakoutGame.ball.dx;
    }
    if (breakoutGame.ball.y <= breakoutGame.ball.radius) {
        breakoutGame.ball.dy = -breakoutGame.ball.dy;
    }
    
    // Ball collision with paddle
    if (breakoutGame.ball.y >= breakoutGame.paddle.y - breakoutGame.ball.radius &&
        breakoutGame.ball.x >= breakoutGame.paddle.x &&
        breakoutGame.ball.x <= breakoutGame.paddle.x + breakoutGame.paddle.width) {
        breakoutGame.ball.dy = -breakoutGame.ball.dy;
    }
    
    // Ball collision with bricks
    for (let brick of breakoutGame.bricks) {
        if (brick.visible &&
            breakoutGame.ball.x >= brick.x &&
            breakoutGame.ball.x <= brick.x + brick.width &&
            breakoutGame.ball.y >= brick.y &&
            breakoutGame.ball.y <= brick.y + brick.height) {
            brick.visible = false;
            breakoutGame.ball.dy = -breakoutGame.ball.dy;
            breakoutGame.score += 10;
            document.getElementById('score-breakout').textContent = breakoutGame.score;
        }
    }
    
    // Check win condition
    if (breakoutGame.bricks.every(brick => !brick.visible)) {
        endBreakoutGame(true);
        return;
    }
    
    // Check lose condition
    if (breakoutGame.ball.y > breakoutGame.canvas.height) {
        endBreakoutGame(false);
        return;
    }
    
    // Draw paddle
    breakoutGame.ctx.fillStyle = '#74b9ff';
    breakoutGame.ctx.fillRect(breakoutGame.paddle.x, breakoutGame.paddle.y, breakoutGame.paddle.width, breakoutGame.paddle.height);
    
    // Draw ball
    breakoutGame.ctx.fillStyle = '#fff';
    breakoutGame.ctx.beginPath();
    breakoutGame.ctx.arc(breakoutGame.ball.x, breakoutGame.ball.y, breakoutGame.ball.radius, 0, Math.PI * 2);
    breakoutGame.ctx.fill();
    
    // Draw bricks
    for (let brick of breakoutGame.bricks) {
        if (brick.visible) {
            breakoutGame.ctx.fillStyle = '#e74c3c';
            breakoutGame.ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        }
    }
    
    requestAnimationFrame(breakoutGameLoop);
}

function endBreakoutGame(won) {
    breakoutGame.gameRunning = false;
    breakoutGame.ctx.fillStyle = '#fff';
    breakoutGame.ctx.font = '24px Arial';
    breakoutGame.ctx.textAlign = 'center';
    if (won) {
        breakoutGame.ctx.fillText('You Win!', breakoutGame.canvas.width/2, breakoutGame.canvas.height/2);
    } else {
        breakoutGame.ctx.fillText('Game Over!', breakoutGame.canvas.width/2, breakoutGame.canvas.height/2);
    }
    breakoutGame.ctx.fillText(`Score: ${breakoutGame.score}`, breakoutGame.canvas.width/2, breakoutGame.canvas.height/2 + 30);
}