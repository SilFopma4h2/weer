// Weather App JavaScript
class WeatherApp {
    constructor() {
        this.init();
        this.bindEvents();
        this.userLocation = null; // Store GPS coordinates
        
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
    }

    bindEvents() {
        this.refreshBtn.addEventListener('click', () => {
            this.refreshWeatherData();
        });

        // Tab navigation
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
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
        document.querySelector(`.nav-btn[data-tab="${tabName}"]`).classList.add('active');

        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(`tab-${tabName}`).classList.add('active');

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
            // Build URLs with coordinates if provided
            const currentUrl = lat && lon ? `/current?lat=${lat}&lon=${lon}` : '/current';
            const forecastUrl = lat && lon ? `/forecast?lat=${lat}&lon=${lon}` : '/forecast';
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

        // Weather icon
        const iconElement = document.getElementById('weather-icon');
        iconElement.src = `https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`;
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
            
            forecastItem.innerHTML = `
                <div class="forecast-time">${timeString}</div>
                <img class="forecast-icon" 
                     src="https://openweathermap.org/img/wn/${item.weather.icon}.png" 
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
            
            forecastDay.innerHTML = `
                <div class="forecast-day-info">
                    <div class="forecast-day-name">${this.capitalizeFirst(dayName)}</div>
                    <img class="forecast-day-icon" 
                         src="https://openweathermap.org/img/wn/${item.weather.icon}.png" 
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
        locationBtn.innerHTML = '📍 Gebruik mijn locatie';
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
                locationBtn.innerHTML = '📍 Locatie bepalen...';
                
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
                locationBtn.innerHTML = '📍 Gebruik mijn locatie';
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