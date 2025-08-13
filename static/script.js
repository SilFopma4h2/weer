// Weather App JavaScript
class WeatherApp {
    constructor() {
        this.init();
        this.bindEvents();
        this.userLocation = null; // Store GPS coordinates
        
        // Only load weather data if user is authenticated
        // Check if we're logged in by looking for user email in the header
        const userEmail = document.querySelector('.user-email');
        if (userEmail) {
            this.loadWeatherData();
            
            // Auto-refresh every 10 minutes
            setInterval(() => {
                const lat = this.userLocation ? this.userLocation.lat : null;
                const lon = this.userLocation ? this.userLocation.lon : null;
                this.loadWeatherData(false, lat, lon);
            }, 10 * 60 * 1000);
        } else {
            // Hide weather sections and show authentication message
            this.showAuthenticationRequired();
        }
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
            const timeString = time.toLocaleTimeString('nl-NL', { 
                hour: '2-digit', 
                minute: '2-digit' 
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

    showAuthenticationRequired() {
        // Hide loading spinner and show authentication message
        this.hideLoading();
        
        // Replace weather data with authentication message
        if (this.currentWeatherElement) {
            this.currentWeatherElement.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h3>🔒 Inloggen vereist</h3>
                    <p>Log in of registreer om het weer te bekijken</p>
                    <div style="margin-top: 20px;">
                        <button onclick="showLogin()" class="btn-primary">🔑 Inloggen</button>
                        <button onclick="showRegister()" class="btn-secondary" style="margin-left: 10px;">📝 Registreren</button>
                    </div>
                </div>
            `;
            this.currentWeatherElement.style.display = 'block';
        }
        
        // Hide forecast sections
        if (this.forecast24hElement) {
            this.forecast24hElement.innerHTML = '<p style="text-align: center;">Log in om voorspelling te zien</p>';
        }
        if (this.forecast7dElement) {
            this.forecast7dElement.innerHTML = '<p style="text-align: center;">Log in om voorspelling te zien</p>';
        }
        if (this.alertsElement) {
            this.alertsElement.innerHTML = '<p style="text-align: center;">Log in om waarschuwingen te zien</p>';
        }
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
                    reject(new Error('Kon locatie niet bepalen: ' + error.message));
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