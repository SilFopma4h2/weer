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
        "nav_air": "💨 Luchtkwaliteit",
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
        "unknown_weather": "onbekend weer",
        "air_quality": "💨 Luchtkwaliteit",
        "aqi_history": "📊 Luchtkwaliteit Geschiedenis",
        "aqi_excellent": "Uitstekend",
        "aqi_good": "Goed",
        "aqi_moderate": "Matig",
        "aqi_unhealthy_sensitive": "Ongezond voor gevoeligengroepen",
        "aqi_unhealthy": "Ongezond",
        "aqi_very_unhealthy": "Zeer ongezond",
        "aqi_hazardous": "Gevaarlijk",
        "pm25": "Fijnstof (PM2.5)",
        "pm10": "Fijnstof (PM10)",
        "o3": "Ozon",
        "no2": "Stikstofdioxide",
        "so2": "Zwaveldioxide",
        "co": "Koolstofmonoxide",
        "health_recommendations": "🏥 Gezondheidsaanbevelingen",
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
        "nav_air": "💨 Air Quality",
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
        "unknown_weather": "unknown weather",
        "air_quality": "💨 Air Quality",
        "aqi_history": "📊 Air Quality History",
        "aqi_excellent": "Excellent",
        "aqi_good": "Good",
        "aqi_moderate": "Moderate",
        "aqi_unhealthy_sensitive": "Unhealthy for Sensitive Groups",
        "aqi_unhealthy": "Unhealthy",
        "aqi_very_unhealthy": "Very Unhealthy",
        "aqi_hazardous": "Hazardous",
        "pm25": "Fine Particles (PM2.5)",
        "pm10": "Particulate Matter (PM10)",
        "o3": "Ozone",
        "no2": "Nitrogen Dioxide",
        "so2": "Sulfur Dioxide",
        "co": "Carbon Monoxide",
        "health_recommendations": "🏥 Health Recommendations",
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
        "fishing_conditions": "🎣 Angelvoorwaarden",
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
        "unknown_weather": "unbekanntes Wetter",
        "air_quality": "💨 Luftqualität",
        "aqi_history": "📊 Luftqualitätsverlauf",
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
        "unknown_weather": "tempo sconosciuto",
        "air_quality": "💨 Qualità dell'aria",
        "aqi_history": "📊 Storico Qualità dell'aria",
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
        "unknown_weather": "temps inconnu",
        "air_quality": "💨 Qualité de l'air",
        "aqi_history": "📊 Historique Qualité de l'air",
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

        // Load air quality data when switching to air tab
        if (tabName === 'air') {
            this.updateAirQuality();
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
            
            // Also load air quality if on air tab
            const activeTab = document.querySelector('.tab-content.active');
            if (activeTab && activeTab.id === 'tab-air') {
                this.updateAirQuality();
            }
            
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

    async updateAirQuality() {
        try {
            const loadingElement = document.getElementById('loading-aqi');
            const dataElement = document.getElementById('air-quality-data');
            
            if (loadingElement) loadingElement.style.display = 'block';
            if (dataElement) dataElement.style.display = 'none';
            
            const lat = this.userLocation ? this.userLocation.lat : null;
            const lon = this.userLocation ? this.userLocation.lon : null;
            
            const aqiUrl = lat && lon ? `/air-quality?lat=${lat}&lon=${lon}` : '/air-quality';
            const response = await fetch(aqiUrl);
            
            if (!response.ok) {
                throw new Error('Failed to fetch air quality data');
            }
            
            const aqiData = await response.json();
            this.displayAirQuality(aqiData);
            
            // Load historical data
            await this.updateAirQualityHistory(lat, lon);
            
            if (loadingElement) loadingElement.style.display = 'none';
            if (dataElement) dataElement.style.display = 'block';
            
        } catch (error) {
            console.error('Error loading air quality data:', error);
            this.showError('Could not load air quality data: ' + error.message);
        }
    }

    displayAirQuality(data) {
        const aqi = data.aqi.value;
        const level = data.aqi.level;
        const color = data.aqi.color;
        
        // Update AQI Score Card
        const scoreElement = document.getElementById('aqi-score');
        if (scoreElement) {
            scoreElement.style.background = `linear-gradient(135deg, ${color}, ${color}aa)`;
            scoreElement.querySelector('.aqi-value').textContent = Math.round(aqi);
            scoreElement.querySelector('.aqi-level').textContent = level;
            scoreElement.querySelector('.aqi-color-bar').style.background = 
                'linear-gradient(90deg, #00E400 0%, #FFFF00 25%, #FF7E00 50%, #FF0000 75%, #8F3F97 100%)';
        }
        
        // Update info section
        const infoElement = document.getElementById('aqi-info');
        if (infoElement) {
            infoElement.querySelector('#aqi-recommendation').textContent = data.aqi.recommendation;
            infoElement.querySelector('#aqi-location').textContent = 
                `📍 ${data.location.name}${data.location.coords ? ' - ' + data.location.coords : ''}`;
            infoElement.querySelector('#aqi-time').textContent = 
                `🕒 ${new Date(data.data_time || data.timestamp).toLocaleTimeString(this.currentLanguage)}`;
        }
        
        // Display pollutants
        this.displayPollutants(data.pollutants);
        
        // Display health warnings
        this.displayHealthWarnings(aqi);
    }

    displayPollutants(pollutants) {
        const container = document.getElementById('pollutants-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        const pollutantOrder = ['pm25', 'pm10', 'o3', 'no2', 'so2', 'co'];
        
        for (const pollutantKey of pollutantOrder) {
            if (pollutants[pollutantKey]) {
                const pollutant = pollutants[pollutantKey];
                const card = document.createElement('div');
                card.className = 'pollutant-card';
                
                card.innerHTML = `
                    <div class="pollutant-name">${pollutant.name}</div>
                    <div class="pollutant-value">${pollutant.value.toFixed(1)}</div>
                    <div class="pollutant-unit">${this.getPollutantUnit(pollutantKey)}</div>
                `;
                
                container.appendChild(card);
            }
        }
    }

    getPollutantUnit(key) {
        const units = {
            'pm25': 'µg/m³',
            'pm10': 'µg/m³',
            'o3': 'ppb',
            'no2': 'ppb',
            'so2': 'ppb',
            'co': 'ppm'
        };
        return units[key] || '';
    }

    displayHealthWarnings(aqi) {
        const warningsElement = document.getElementById('aqi-warnings');
        if (!warningsElement) return;
        
        let warningHTML = `<h4>${this.translate('health_recommendations')}</h4>`;
        
        if (aqi <= 50) {
            warningHTML += `
                <div class="aqi-warning-item">
                    <span class="aqi-warning-icon">✅</span>
                    <strong>Uitstekend:</strong> Volledige buitenactiviteiten zijn veilig.
                </div>
            `;
        } else if (aqi <= 100) {
            warningHTML += `
                <div class="aqi-warning-item">
                    <span class="aqi-warning-icon">👍</span>
                    <strong>Goed:</strong> Normale buitenactiviteiten zijn veilig.
                </div>
            `;
        } else if (aqi <= 150) {
            warningHTML += `
                <div class="aqi-warning-item">
                    <span class="aqi-warning-icon">⚠️</span>
                    <strong>Voor gevoeligengroepen:</strong>
                    <ul>
                        <li>Kinderen, ouderen en mensen met adem- of hartproblemen moeten buitenactiviteiten beperken</li>
                        <li>Anderen kunnen normaal buitenshuis zijn</li>
                    </ul>
                </div>
            `;
        } else if (aqi <= 200) {
            warningHTML += `
                <div class="aqi-warning-item">
                    <span class="aqi-warning-icon">🚫</span>
                    <strong>Ongezond:</strong>
                    <ul>
                        <li>Gevoeligengroepen moeten buitenactiviteiten vermijden</li>
                        <li>Het publiek kan symptomen ondervinden</li>
                        <li>Intensieve buitenactiviteiten vermijden</li>
                    </ul>
                </div>
            `;
        } else if (aqi <= 300) {
            warningHTML += `
                <div class="aqi-warning-item">
                    <span class="aqi-warning-icon">💀</span>
                    <strong>Zeer ongezond:</strong>
                    <ul>
                        <li>Alle groepen moeten intensieve buitenactiviteiten vermijden</li>
                        <li>Gezondheidsalerting: Zware symptomen</li>
                        <li>Blijf binnenshuis en houdt aktiviteiten minimaal</li>
                    </ul>
                </div>
            `;
        } else {
            warningHTML += `
                <div class="aqi-warning-item">
                    <span class="aqi-warning-icon">☢️</span>
                    <strong>Gevaarlijk:</strong>
                    <ul>
                        <li>NOODTOESTAND - IEDEREEN BEÏNVLOED</li>
                        <li>Blijf binnenshuis</li>
                        <li>Alle buitenactiviteiten worden ontraden</li>
                        <li>Zoek medische hulp indien nodig</li>
                    </ul>
                </div>
            `;
        }
        
        warningsElement.innerHTML = warningHTML;
    }

    async updateAirQualityHistory(lat = null, lon = null) {
        try {
            const url = lat && lon ? `/air-quality/history?lat=${lat}&lon=${lon}&days=7` : '/air-quality/history?days=7';
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Failed to fetch air quality history');
            }
            
            const historyData = await response.json();
            this.displayAirQualityHistory(historyData.history);
            
        } catch (error) {
            console.error('Error loading air quality history:', error);
        }
    }

    displayAirQualityHistory(history) {
        const historySection = document.getElementById('aqi-history-section');
        const chartElement = document.getElementById('aqi-history-chart');
        
        if (!historySection || !chartElement || !history || history.length === 0) {
            if (historySection) historySection.style.display = 'none';
            return;
        }
        
        historySection.style.display = 'block';
        
        // Find min and max for scaling
        const aiqValues = history.map(h => h.aqi);
        const maxAQI = Math.max(...aiqValues);
        const minAQI = Math.min(...aiqValues);
        const range = maxAQI - minAQI || 100;
        
        // Create chart
        chartElement.innerHTML = history.map((day, index) => {
            const height = ((day.aqi - minAQI) / range) * 100 + 10; // Between 10% and 110%
            const dayLabel = new Date(day.date).toLocaleDateString('nl-NL', { weekday: 'short' });
            
            return `
                <div class="aqi-history-bar" style="height: ${height}%; background-color: ${day.color};">
                    <div class="aqi-history-value">${day.aqi}</div>
                    <div class="aqi-history-label">${dayLabel}</div>
                </div>
            `;
        }).join('');
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

// Track game move in database
async function trackGameMove(direction, score) {
    try {
        const formData = new FormData();
        formData.append('direction', direction);
        formData.append('score', score);
        
        await fetch('/api/track/move', {
            method: 'POST',
            body: formData
        });
    } catch (error) {
        console.error('Error tracking move:', error);
    }
}

function handle2048KeyPress(e) {
    if (currentGame !== '2048') return;
    
    let moved = false;
    let direction = '';
    const originalGrid = [...game2048.grid];
    
    switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            moved = moveUp2048();
            direction = 'up';
            break;
        case 'ArrowDown':
            e.preventDefault();
            moved = moveDown2048();
            direction = 'down';
            break;
        case 'ArrowLeft':
            e.preventDefault();
            moved = moveLeft2048();
            direction = 'left';
            break;
        case 'ArrowRight':
            e.preventDefault();
            moved = moveRight2048();
            direction = 'right';
            break;
    }
    
    if (moved) {
        addRandomTile2048();
        render2048();
        updateScore2048();
        
        // Track the move in the database
        trackGameMove(direction, game2048.score);
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
console.log('Weather app script loaded');