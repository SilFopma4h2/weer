// ============================================================================
// Weer App - Frontend JavaScript
// ============================================================================

const TRANSLATIONS = {
    nl: {
        app_title: "🌤️ Weer App",
        app_subtitle: "Actueel lokaal weer voor Nederland",
        theme_dark: "🌙 Dark",
        theme_light: "☀️ Light",
        nav_today: "🌤️ Vandaag",
        nav_week: "📅 Week",
        nav_radar: "🌧️ Radar",
        nav_fishing: "🎣 Vissen",
        nav_fire: "🔥 Bosbranden",
        nav_air: "🌫️ Luchtkwaliteit",
        nav_games: "🎮 Games",
        current_weather: "Huidig Weer",
        loading: "Weerdata laden...",
        feels_like: "Gevoelstemperatuur:",
        wind: "Wind:",
        wind_gust: "Windstoten:",
        pressure: "Luchtdruk:",
        visibility: "Zicht:",
        humidity: "Luchtvochtigheid:",
        clouds: "Bewolking:",
        precipitation: "Neerslag:",
        forecast_24h: "24 Uur Voorspelling",
        forecast_7d: "7 Dagen Voorspelling",
        rain_radar: "Regenradar",
        weather_alerts: "Weerswaarschuwingen",
        no_alerts: "Geen actuele waarschuwingen",
        fishing_conditions: "🎣 Visomstandigheden",
        fishing_forecast: "📊 Visvoorspelling Komende Dagen",
        games_title: "🎮 Games",
        game_2048: "🔢 2048",
        game_flappy: "🐦 Flappy Bird",
        game_guess: "🔢 Raad het Getal",
        game_snake: "🐍 Snake",
        game_pong: "🏓 Pong",
        game_breakout: "🧱 Breakout",
        game_memory: "🃏 Memory",
        game_menu: "📋 Menu",
        game_2048_title: "🔢 2048",
        game_flappy_title: "🐦 Flappy Bird",
        game_guess_title: "🔢 Raad het Getal",
        game_snake_title: "🐍 Snake",
        game_pong_title: "🏓 Pong",
        game_breakout_title: "🧱 Breakout",
        game_memory_title: "🃏 Memory",
        score: "Score:",
        best_score: "Record:",
        moves: "Zetten:",
        new_game: "Nieuw Spel",
        start_game: "Start Spel",
        game_over: "Game Over",
        you_win: "Gefeliciteerd, je hebt gewonnen!",
        game_2048_instructions: "Gebruik pijltjestoetsen of swipe om tegels te bewegen",
        game_flappy_instructions: "Klik of druk op spatie om te springen",
        game_snake_instructions: "Gebruik pijltjestoetsen om de slang te besturen",
        game_pong_instructions: "Gebruik W/S toetsen om de paddle te bewegen",
        game_breakout_instructions: "Gebruik pijltjestoetsen of muis om de paddle te bewegen",
        game_memory_instructions: "Vind de paren met dezelfde kaarten",
        guess_range: "Ik denk aan een getal tussen 1 en 100",
        attempts: "Pogingen:",
        guess_button: "Raad",
        too_low: "📈 Te laag! Kies een hoger getal.",
        too_high: "📉 Te hoog! Kies een lager getal.",
        guess_correct: "🎉 Gefeliciteerd! Geraden in",
        guess_attempts: "pogingen!",
        guess_invalid: "Voer een getal tussen 1 en 100 in.",
        last_updated: "Laatst bijgewerkt:",
        refresh: "🔄 Vernieuwen",
        data_source: "Data: Open-Meteo | Radar: Windy.com",
        error_title: "⚠️ Fout opgetreden",
        error_message: "Er is een fout opgetreden bij het laden van de weerdata.",
        close: "Sluiten",
        try_again: "Opnieuw proberen",
        use_location: "📍 Gebruik mijn locatie",
        determining_location: "📍 Locatie bepalen...",
        unknown_weather: "onbekend weer",
        fire_risk_title: "🔥 Brandrisico",
        fire_forecast_title: "📅 Brandrisico Komende Dagen",
        fire_loading: "Brandrisico laden...",
        fire_level_matig: "Matig",
        fire_level_verhoogd: "Verhoogd",
        fire_level_hoog: "Hoog",
        fire_level_extreem: "Extreem",
        fire_level_laag: "Laag",
        fire_desc_laag: "Laag brandgevaar. Brandomstandigheden zijn gunstig.",
        fire_desc_matig: "Beperkt brandgevaar. Condities voor bosbranden zijn gunstig.",
        fire_desc_verhoogd: "Verhoogd brandgevaar. Droge en warme omstandigheden.",
        fire_desc_hoog: "Hoog brandgevaar. Wees extra voorzichtig met open vuur.",
        fire_desc_extreem: "Extreem brandgevaar. Open vuur is ten zeerste af te raden.",
        fire_angstrom: "Angström-index",
        fire_smoke: "Rook van bosbranden",
        air_quality_title: "🌫️ Luchtkwaliteit",
        air_loading: "Luchtkwaliteit laden...",
        aqi_good: "Goed",
        aqi_moderate: "Matig",
        aqi_unhealthy: "Ongezond",
        aqi_hazardous: "Gevaarlijk",
        aqi_scale_us: "US AQI",
        aqi_scale_european: "Europese AQI",
        pollutants: "Verontreinigende stoffen",
        login: "Inloggen",
        register: "Registreren",
        logout: "Uitloggen",
        settings: "Instellingen",
        login_title: "Inloggen",
        register_title: "Registreren",
        settings_title: "Instellingen",
        email: "E-mailadres",
        password: "Wachtwoord",
        confirm_password: "Bevestig wachtwoord",
        password_hint: "Minimaal 8 tekens, met een letter en een cijfer.",
        location: "Locatie",
        location_hint: "Laat leeg voor de standaardlocatie (Amsterdam).",
        no_account: "Nog geen account? Registreren",
        have_account: "Al een account? Inloggen",
        save: "Opslaan",
    },
    en: {
        app_title: "🌤️ Weather App",
        app_subtitle: "Current local weather information",
        theme_dark: "🌙 Dark",
        theme_light: "☀️ Light",
        nav_today: "🌤️ Today",
        nav_week: "📅 Week",
        nav_radar: "🌧️ Radar",
        nav_fishing: "🎣 Fishing",
        nav_fire: "🔥 Forest Fires",
        nav_air: "🌫️ Air Quality",
        nav_games: "🎮 Games",
        current_weather: "Current Weather",
        loading: "Loading weather data...",
        feels_like: "Feels like:",
        wind: "Wind:",
        wind_gust: "Wind gusts:",
        pressure: "Pressure:",
        visibility: "Visibility:",
        humidity: "Humidity:",
        clouds: "Clouds:",
        precipitation: "Precipitation:",
        forecast_24h: "24 Hour Forecast",
        forecast_7d: "7 Day Forecast",
        rain_radar: "Rain Radar",
        weather_alerts: "Weather Alerts",
        no_alerts: "No current alerts",
        fishing_conditions: "🎣 Fishing Conditions",
        fishing_forecast: "📊 Fishing Forecast Next Days",
        games_title: "🎮 Games",
        game_2048: "🔢 2048",
        game_flappy: "🐦 Flappy Bird",
        game_guess: "🔢 Guess the Number",
        game_snake: "🐍 Snake",
        game_pong: "🏓 Pong",
        game_breakout: "🧱 Breakout",
        game_memory: "🃏 Memory",
        game_menu: "📋 Menu",
        game_2048_title: "🔢 2048",
        game_flappy_title: "🐦 Flappy Bird",
        game_guess_title: "🔢 Guess the Number",
        game_snake_title: "🐍 Snake",
        game_pong_title: "🏓 Pong",
        game_breakout_title: "🧱 Breakout",
        game_memory_title: "🃏 Memory",
        score: "Score:",
        best_score: "Best:",
        moves: "Moves:",
        new_game: "New Game",
        start_game: "Start Game",
        game_over: "Game Over",
        you_win: "Congratulations, you won!",
        game_2048_instructions: "Use arrow keys or swipe to move tiles",
        game_flappy_instructions: "Click or press space to jump",
        game_snake_instructions: "Use arrow keys to control the snake",
        game_pong_instructions: "Use W/S keys to move the paddle",
        game_breakout_instructions: "Use arrow keys or mouse to move the paddle",
        game_memory_instructions: "Find the matching pairs",
        guess_range: "I'm thinking of a number between 1 and 100",
        attempts: "Attempts:",
        guess_button: "Guess",
        too_low: "📈 Too low! Try a higher number.",
        too_high: "📉 Too high! Try a lower number.",
        guess_correct: "🎉 Congratulations! Guessed in",
        guess_attempts: "attempts!",
        guess_invalid: "Please enter a number between 1 and 100.",
        last_updated: "Last updated:",
        refresh: "🔄 Refresh",
        data_source: "Data: Open-Meteo | Radar: Windy.com",
        error_title: "⚠️ Error Occurred",
        error_message: "An error occurred while loading weather data.",
        close: "Close",
        try_again: "Try Again",
        use_location: "📍 Use my location",
        determining_location: "📍 Determining location...",
        unknown_weather: "unknown weather",
        fire_risk_title: "🔥 Fire Risk",
        fire_forecast_title: "📅 Fire Risk Next Days",
        fire_loading: "Loading fire risk...",
        fire_level_matig: "Moderate",
        fire_level_verhoogd: "Elevated",
        fire_level_hoog: "High",
        fire_level_extreem: "Extreme",
        fire_level_laag: "Low",
        fire_desc_laag: "Low fire danger. Conditions are favourable.",
        fire_desc_matig: "Limited fire danger. Conditions are favourable.",
        fire_desc_verhoogd: "Elevated fire danger. Dry and warm conditions.",
        fire_desc_hoog: "High fire danger. Be careful with open flames.",
        fire_desc_extreem: "Extreme fire danger. Open flames strongly discouraged.",
        fire_angstrom: "Angström index",
        fire_smoke: "Wildfire smoke",
        air_quality_title: "🌫️ Air Quality",
        air_loading: "Loading air quality...",
        aqi_good: "Good",
        aqi_moderate: "Moderate",
        aqi_unhealthy: "Unhealthy",
        aqi_hazardous: "Hazardous",
        aqi_scale_us: "US AQI",
        aqi_scale_european: "European AQI",
        pollutants: "Pollutants",
        login: "Log in",
        register: "Register",
        logout: "Log out",
        settings: "Settings",
        login_title: "Log in",
        register_title: "Register",
        settings_title: "Settings",
        email: "Email address",
        password: "Password",
        confirm_password: "Confirm password",
        password_hint: "At least 8 characters, with a letter and a number.",
        location: "Location",
        location_hint: "Leave empty for the default location (Amsterdam).",
        no_account: "No account yet? Register",
        have_account: "Already have an account? Log in",
        save: "Save",
    },
    de: {
        app_title: "🌤️ Wetter App",
        app_subtitle: "Aktuelle lokale Wetterinformationen",
        theme_dark: "🌙 Dunkel",
        theme_light: "☀️ Hell",
        nav_today: "🌤️ Heute",
        nav_week: "📅 Woche",
        nav_radar: "🌧️ Radar",
        nav_fishing: "🎣 Angeln",
        nav_fire: "🔥 Waldbrände",
        nav_air: "🌫️ Luftqualität",
        nav_games: "🎮 Spiele",
        current_weather: "Aktuelles Wetter",
        loading: "Wetterdaten laden...",
        feels_like: "Gefühlt wie:",
        wind: "Wind:",
        wind_gust: "Windböen:",
        pressure: "Druck:",
        visibility: "Sicht:",
        humidity: "Luftfeuchtigkeit:",
        clouds: "Bewölkung:",
        precipitation: "Niederschlag:",
        forecast_24h: "24 Stunden Vorhersage",
        forecast_7d: "7 Tage Vorhersage",
        rain_radar: "Regenradar",
        weather_alerts: "Wetterwarnungen",
        no_alerts: "Keine aktuellen Warnungen",
        fishing_conditions: "🎣 Angelbedingungen",
        fishing_forecast: "📊 Angelvorhersage Nächste Tage",
        games_title: "🎮 Spiele",
        game_2048: "🔢 2048",
        game_flappy: "🐦 Flappy Bird",
        game_guess: "🔢 Rate die Zahl",
        game_snake: "🐍 Schlange",
        game_pong: "🏓 Pong",
        game_breakout: "🧱 Breakout",
        game_memory: "🃏 Memory",
        game_menu: "📋 Menü",
        game_2048_title: "🔢 2048",
        game_flappy_title: "🐦 Flappy Bird",
        game_guess_title: "🔢 Rate die Zahl",
        game_snake_title: "🐍 Schlange",
        game_pong_title: "🏓 Pong",
        game_breakout_title: "🧱 Breakout",
        game_memory_title: "🃏 Memory",
        score: "Punktzahl:",
        best_score: "Rekord:",
        moves: "Züge:",
        new_game: "Neues Spiel",
        start_game: "Spiel starten",
        game_over: "Spiel vorbei",
        you_win: "Glückwunsch, du hast gewonnen!",
        game_2048_instructions: "Verwende Pfeiltasten oder Wischen",
        game_flappy_instructions: "Klicken oder Leertaste zum Springen",
        game_snake_instructions: "Verwende Pfeiltasten für die Schlange",
        game_pong_instructions: "W/S Tasten für den Schläger",
        game_breakout_instructions: "Pfeiltasten oder Maus für den Schläger",
        game_memory_instructions: "Finde die passenden Paare",
        guess_range: "Ich denke an eine Zahl zwischen 1 und 100",
        attempts: "Versuche:",
        guess_button: "Raten",
        too_low: "📈 Zu niedrig! Versuche eine höhere Zahl.",
        too_high: "📉 Zu hoch! Versuche eine niedrigere Zahl.",
        guess_correct: "🎉 Glückwunsch! Erraten in",
        guess_attempts: "Versuchen!",
        guess_invalid: "Bitte gib eine Zahl zwischen 1 und 100 ein.",
        last_updated: "Zuletzt aktualisiert:",
        refresh: "🔄 Aktualisieren",
        data_source: "Daten: Open-Meteo | Radar: Windy.com",
        error_title: "⚠️ Fehler aufgetreten",
        error_message: "Fehler beim Laden der Wetterdaten.",
        close: "Schließen",
        try_again: "Erneut versuchen",
        use_location: "📍 Mein Standort verwenden",
        determining_location: "📍 Standort bestimmen...",
        unknown_weather: "unbekanntes Wetter",
        fire_risk_title: "🔥 Brandrisiko",
        fire_forecast_title: "📅 Brandrisiko Nächste Tage",
        fire_loading: "Brandrisiko wird geladen...",
        fire_level_matig: "Mäßig",
        fire_level_verhoogd: "Erhöht",
        fire_level_hoog: "Hoch",
        fire_level_extreem: "Extrem",
        fire_level_laag: "Niedrig",
        fire_desc_laag: "Niedrige Brandgefahr. Bedingungen sind günstig.",
        fire_desc_matig: "Begrenzte Brandgefahr. Bedingungen sind günstig.",
        fire_desc_verhoogd: "Erhöhte Brandgefahr. Trockene und warme Bedingungen.",
        fire_desc_hoog: "Hohe Brandgefahr. Sei vorsichtig mit offenem Feuer.",
        fire_desc_extreem: "Extreme Brandgefahr. Offenes Feuer wird dringend abgeraten.",
        fire_angstrom: "Angström-Index",
        fire_smoke: "Waldbrandrauch",
        air_quality_title: "🌫️ Luftqualität",
        air_loading: "Luftqualität wird geladen...",
        aqi_good: "Gut",
        aqi_moderate: "Mäßig",
        aqi_unhealthy: "Ungesund",
        aqi_hazardous: "Gefährlich",
        aqi_scale_us: "US AQI",
        aqi_scale_european: "Europäischer AQI",
        pollutants: "Schadstoffe",
        login: "Anmelden",
        register: "Registrieren",
        logout: "Abmelden",
        settings: "Einstellungen",
        login_title: "Anmelden",
        register_title: "Registrieren",
        settings_title: "Einstellungen",
        email: "E-Mail-Adresse",
        password: "Passwort",
        confirm_password: "Passwort bestätigen",
        password_hint: "Mindestens 8 Zeichen, mit Buchstabe und Zahl.",
        location: "Standort",
        location_hint: "Leer lassen für den Standardstandort (Amsterdam).",
        no_account: "Noch kein Konto? Registrieren",
        have_account: "Schon ein Konto? Anmelden",
        save: "Speichern",
    },
    it: {
        app_title: "🌤️ App Meteo",
        app_subtitle: "Informazioni meteo locali attuali",
        theme_dark: "🌙 Scuro",
        theme_light: "☀️ Chiaro",
        nav_today: "🌤️ Oggi",
        nav_week: "📅 Settimana",
        nav_radar: "🌧️ Radar",
        nav_fishing: "🎣 Pesca",
        nav_fire: "🔥 Incendi Boschivi",
        nav_air: "🌫️ Qualità dell'Aria",
        nav_games: "🎮 Giochi",
        current_weather: "Meteo Attuale",
        loading: "Caricamento dati meteo...",
        feels_like: "Percepita:",
        wind: "Vento:",
        wind_gust: "Raffiche:",
        pressure: "Pressione:",
        visibility: "Visibilità:",
        humidity: "Umidità:",
        clouds: "Nuvolosità:",
        precipitation: "Precipitazioni:",
        forecast_24h: "Previsioni 24 Ore",
        forecast_7d: "Previsioni 7 Giorni",
        rain_radar: "Radar Pioggia",
        weather_alerts: "Allerte Meteo",
        no_alerts: "Nessun allerta attuale",
        fishing_conditions: "🎣 Condizioni di Pesca",
        fishing_forecast: "📊 Previsioni Pesca Prossimi Giorni",
        games_title: "🎮 Giochi",
        game_2048: "🔢 2048",
        game_flappy: "🐦 Flappy Bird",
        game_guess: "🔢 Indovina il Numero",
        game_snake: "🐍 Serpente",
        game_pong: "🏓 Pong",
        game_breakout: "🧱 Breakout",
        game_memory: "🃏 Memory",
        game_menu: "📋 Menu",
        game_2048_title: "🔢 2048",
        game_flappy_title: "🐦 Flappy Bird",
        game_guess_title: "🔢 Indovina il Numero",
        game_snake_title: "🐍 Serpente",
        game_pong_title: "🏓 Pong",
        game_breakout_title: "🧱 Breakout",
        game_memory_title: "🃏 Memory",
        score: "Punti:",
        best_score: "Record:",
        moves: "Mosse:",
        new_game: "Nuova Partita",
        start_game: "Inizia",
        game_over: "Game Over",
        you_win: "Congratulazioni, hai vinto!",
        game_2048_instructions: "Usa le frecce o scorri per muovere le tessere",
        game_flappy_instructions: "Clicca o premi spazio per saltare",
        game_snake_instructions: "Usa le frecce per controllare il serpente",
        game_pong_instructions: "Usa i tasti W/S per la racchetta",
        game_breakout_instructions: "Frecce o mouse per la racchetta",
        game_memory_instructions: "Trova le coppie corrispondenti",
        guess_range: "Penso a un numero tra 1 e 100",
        attempts: "Tentativi:",
        guess_button: "Indovina",
        too_low: "📈 Troppo basso! Prova più in alto.",
        too_high: "📉 Troppo alto! Prova più in basso.",
        guess_correct: "🎉 Congratulazioni! Indovinato in",
        guess_attempts: "tentativi!",
        guess_invalid: "Inserisci un numero tra 1 e 100.",
        last_updated: "Ultimo aggiornamento:",
        refresh: "🔄 Aggiorna",
        data_source: "Dati: Open-Meteo | Radar: Windy.com",
        error_title: "⚠️ Errore Verificato",
        error_message: "Si è verificato un errore nel caricamento dei dati meteo.",
        close: "Chiudi",
        try_again: "Riprova",
        use_location: "📍 Usa la mia posizione",
        determining_location: "📍 Determinazione posizione...",
        unknown_weather: "tempo sconosciuto",
        fire_risk_title: "🔥 Rischio Incendio",
        fire_forecast_title: "📅 Rischio Incendio Prossimi Giorni",
        fire_loading: "Caricamento rischio incendio...",
        fire_level_matig: "Moderato",
        fire_level_verhoogd: "Elevato",
        fire_level_hoog: "Alto",
        fire_level_extreem: "Estremo",
        fire_level_laag: "Basso",
        fire_desc_laag: "Pericolo basso. Condizioni favorevoli.",
        fire_desc_matig: "Pericolo limitato. Condizioni favorevoli.",
        fire_desc_verhoogd: "Pericolo elevato. Condizioni secche e calde.",
        fire_desc_hoog: "Pericolo alto. Attenzione al fuoco all'aperto.",
        fire_desc_extreem: "Pericolo estremo. Fuoco all'aperto sconsigliato.",
        fire_angstrom: "Indice Angström",
        fire_smoke: "Fumo di incendi",
        air_quality_title: "🌫️ Qualità dell'Aria",
        air_loading: "Caricamento qualità dell'aria...",
        aqi_good: "Buona",
        aqi_moderate: "Moderata",
        aqi_unhealthy: "Malsana",
        aqi_hazardous: "Pericolosa",
        aqi_scale_us: "AQI USA",
        aqi_scale_european: "AQI Europeo",
        pollutants: "Inquinanti",
        login: "Accedi",
        register: "Registrati",
        logout: "Esci",
        settings: "Impostazioni",
        login_title: "Accedi",
        register_title: "Registrati",
        settings_title: "Impostazioni",
        email: "Indirizzo email",
        password: "Password",
        confirm_password: "Conferma password",
        password_hint: "Almeno 8 caratteri, con una lettera e un numero.",
        location: "Posizione",
        location_hint: "Lascia vuoto per la posizione predefinita (Amsterdam).",
        no_account: "Non hai un account? Registrati",
        have_account: "Hai già un account? Accedi",
        save: "Salva",
    },
    fr: {
        app_title: "🌤️ App Météo",
        app_subtitle: "Informations météo locales actuelles",
        theme_dark: "🌙 Sombre",
        theme_light: "☀️ Clair",
        nav_today: "🌤️ Aujourd'hui",
        nav_week: "📅 Semaine",
        nav_radar: "🌧️ Radar",
        nav_fishing: "🎣 Pêche",
        nav_fire: "🔥 Feux de forêt",
        nav_air: "🌫️ Qualité de l'air",
        nav_games: "🎮 Jeux",
        current_weather: "Météo Actuelle",
        loading: "Chargement des données météo...",
        feels_like: "Ressenti:",
        wind: "Vent:",
        wind_gust: "Rafales:",
        pressure: "Pression:",
        visibility: "Visibilité:",
        humidity: "Humidité:",
        clouds: "Nuages:",
        precipitation: "Précipitations:",
        forecast_24h: "Prévisions 24h",
        forecast_7d: "Prévisions 7 Jours",
        rain_radar: "Radar Pluie",
        weather_alerts: "Alertes Météo",
        no_alerts: "Aucune alerte actuelle",
        fishing_conditions: "🎣 Conditions de Pêche",
        fishing_forecast: "📊 Prévisions Pêche Prochains Jours",
        games_title: "🎮 Jeux",
        game_2048: "🔢 2048",
        game_flappy: "🐦 Flappy Bird",
        game_guess: "🔢 Devine le Nombre",
        game_snake: "🐍 Serpent",
        game_pong: "🏓 Pong",
        game_breakout: "🧱 Breakout",
        game_memory: "🃏 Memory",
        game_menu: "📋 Menu",
        game_2048_title: "🔢 2048",
        game_flappy_title: "🐦 Flappy Bird",
        game_guess_title: "🔢 Devine le Nombre",
        game_snake_title: "🐍 Serpent",
        game_pong_title: "🏓 Pong",
        game_breakout_title: "🧱 Breakout",
        game_memory_title: "🃏 Memory",
        score: "Score:",
        best_score: "Record:",
        moves: "Coups:",
        new_game: "Nouvelle Partie",
        start_game: "Commencer",
        game_over: "Game Over",
        you_win: "Félicitations, vous avez gagné!",
        game_2048_instructions: "Flèches ou glisser pour déplacer les tuiles",
        game_flappy_instructions: "Cliquer ou espace pour sauter",
        game_snake_instructions: "Flèches pour contrôler le serpent",
        game_pong_instructions: "W/S pour la raquette",
        game_breakout_instructions: "Flèches ou souris pour la raquette",
        game_memory_instructions: "Trouvez les paires correspondantes",
        guess_range: "Je pense à un nombre entre 1 et 100",
        attempts: "Essais:",
        guess_button: "Deviner",
        too_low: "📈 Trop bas! Essayez plus haut.",
        too_high: "📉 Trop haut! Essayez plus bas.",
        guess_correct: "🎉 Félicitations! Trouvé en",
        guess_attempts: "essais!",
        guess_invalid: "Entrez un nombre entre 1 et 100.",
        last_updated: "Dernière mise à jour:",
        refresh: "🔄 Actualiser",
        data_source: "Données: Open-Meteo | Radar: Windy.com",
        error_title: "⚠️ Erreur Survenue",
        error_message: "Une erreur s'est produite lors du chargement des données météo.",
        close: "Fermer",
        try_again: "Réessayer",
        use_location: "📍 Utiliser ma position",
        determining_location: "📍 Détermination de la position...",
        unknown_weather: "temps inconnu",
        fire_risk_title: "🔥 Risque d'incendie",
        fire_forecast_title: "📅 Risque d'incendie Prochains Jours",
        fire_loading: "Chargement du risque d'incendie...",
        fire_level_matig: "Modéré",
        fire_level_verhoogd: "Élevé",
        fire_level_hoog: "Haut",
        fire_level_extreem: "Extrême",
        fire_level_laag: "Faible",
        fire_desc_laag: "Danger faible. Conditions favorables.",
        fire_desc_matig: "Danger limité. Conditions favorables.",
        fire_desc_verhoogd: "Danger élevé. Conditions sèches et chaudes.",
        fire_desc_hoog: "Danger haut. Prudence avec le feu.",
        fire_desc_extreem: "Danger extrême. Feu à l'air libre déconseillé.",
        fire_angstrom: "Indice d'Angström",
        fire_smoke: "Fumée de feux de forêt",
        air_quality_title: "🌫️ Qualité de l'air",
        air_loading: "Chargement de la qualité de l'air...",
        aqi_good: "Bonne",
        aqi_moderate: "Modérée",
        aqi_unhealthy: "Malsaine",
        aqi_hazardous: "Dangereuse",
        aqi_scale_us: "AQI US",
        aqi_scale_european: "AQI Européen",
        pollutants: "Polluants",
        login: "Connexion",
        register: "S'inscrire",
        logout: "Déconnexion",
        settings: "Paramètres",
        login_title: "Connexion",
        register_title: "Inscription",
        settings_title: "Paramètres",
        email: "Adresse e-mail",
        password: "Mot de passe",
        confirm_password: "Confirmer le mot de passe",
        password_hint: "Au moins 8 caractères, avec une lettre et un chiffre.",
        location: "Emplacement",
        location_hint: "Laissez vide pour l'emplacement par défaut (Amsterdam).",
        no_account: "Pas encore de compte ? S'inscrire",
        have_account: "Déjà un compte ? Connexion",
        save: "Enregistrer",
    }
};

// ============================================================================
// WeatherApp core
// ============================================================================
class WeatherApp {
    constructor() {
        this.currentLanguage = localStorage.getItem('weatherAppLanguage') || 'nl';
        this.userLocation = null;
        this.currentData = null;
        this.forecast24h = null;
        this.forecast7d = null;
        this.alerts = null;

        this.initElements();
        this.initLanguageSystem();
        this.bindEvents();
        this.loadWeatherData();
        setInterval(() => {
            const { lat, lon } = this._coords();
            this.loadWeatherData(false, lat, lon);
        }, 10 * 60 * 1000);
    }

    _coords() {
        return this.userLocation
            ? { lat: this.userLocation.lat, lon: this.userLocation.lon }
            : { lat: null, lon: null };
    }

    initElements() {
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

    initLanguageSystem() {
        if (this.languageSelector) {
            this.languageSelector.value = this.currentLanguage;
            this.languageSelector.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }
        this.applyTranslations();
    }

    translate(key) {
        return (TRANSLATIONS[this.currentLanguage] || TRANSLATIONS.nl)[key]
            || TRANSLATIONS.nl[key] || key;
    }

    changeLanguage(lang) {
        if (!TRANSLATIONS[lang]) return;
        this.currentLanguage = lang;
        localStorage.setItem('weatherAppLanguage', lang);
        this.applyTranslations();
        const { lat, lon } = this._coords();
        this.loadWeatherData(true, lat, lon);
        this.loadFireRisk();
        this.loadAirQuality();
    }

    applyTranslations() {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            el.textContent = this.translate(key);
        });
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const themeText = this.translate(isDark ? 'theme_light' : 'theme_dark');
        if (this.themeToggle && this.themeToggle.querySelector('span')) {
            this.themeToggle.querySelector('span').textContent = themeText;
        }
    }

    bindEvents() {
        this.refreshBtn.addEventListener('click', () => this.refreshWeatherData());

        document.querySelectorAll('.nav-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = e.currentTarget.dataset.tab;
                if (tabName) this.switchTab(tabName);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeErrorModal();
        });
    }

    switchTab(tabName) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        const targetButton = document.querySelector(`.nav-btn[data-tab="${tabName}"]`);
        if (targetButton) targetButton.classList.add('active');

        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        const targetContent = document.getElementById(`tab-${tabName}`);
        if (targetContent) targetContent.classList.add('active');

        if (tabName === 'fishing') this.updateFishingConditions();
        if (tabName === 'fire') this.loadFireRisk();
        if (tabName === 'air') this.loadAirQuality();
        if (tabName !== 'games') stopAllGames();
    }

    async _fetchJSON(url) {
        const res = await fetch(url);
        if (res.status === 401) {
            window.location.href = '/login';
            throw new Error('Not authenticated');
        }
        if (!res.ok) throw new Error(`Request failed: ${url}`);
        return res.json();
    }

    async loadWeatherData(showLoading = true, lat = null, lon = null) {
        if (showLoading) this.showLoading();
        const lang = this.currentLanguage;
        const q = (lat && lon) ? `?lat=${lat}&lon=${lon}` : '';

        try {
            const [currentData, forecastData, alertsData] = await Promise.all([
                this._fetchJSON(`/current${q}${q ? '&' : '?'}lang=${lang}`),
                this._fetchJSON(`/forecast${q}${q ? '&' : '?'}lang=${lang}`),
                this._fetchJSON(`/alerts${q}${q ? '&' : '?'}lang=${lang}`)
            ]);

            this.currentData = currentData;
            this.forecast24h = forecastData.forecast_24h;
            this.forecast7d = forecastData.forecast_7d;
            this.alerts = alertsData.alerts;

            this.updateCurrentWeather(currentData);
            this.updateForecast24h(this.forecast24h);
            this.updateForecast7d(this.forecast7d);
            this.updateAlerts(this.alerts);
            this.updateLastUpdate();

            if (this.tabIsActive('fishing')) this.updateFishingConditions();
            if (this.tabIsActive('fire')) this.loadFireRisk();
            if (this.tabIsActive('air')) this.loadAirQuality();
        } catch (error) {
            console.error('Error loading weather data:', error);
            this.showError('Kon weerdata niet laden. Controleer uw internetverbinding en probeer het opnieuw.');
        } finally {
            if (showLoading) this.hideLoading();
        }
    }

    tabIsActive(tabName) {
        const content = document.getElementById(`tab-${tabName}`);
        return content && content.classList.contains('active');
    }

    updateCurrentWeather(data) {
        document.getElementById('current-temp').textContent = data.temperature.current;
        document.getElementById('feels-like').textContent = `${data.temperature.feels_like}°C`;
        document.getElementById('weather-description').textContent = data.weather.description;
        document.getElementById('wind').textContent = `${data.wind.speed} km/h`;
        document.getElementById('wind-gust').textContent = data.wind.gust ? `${data.wind.gust} km/h` : '--';
        document.getElementById('humidity').textContent = `${data.humidity}%`;
        document.getElementById('pressure').textContent = `${data.pressure} hPa`;
        document.getElementById('clouds').textContent = `${data.clouds}%`;
        document.getElementById('visibility').textContent =
            data.visibility != null ? `${(data.visibility / 1000).toFixed(1)} km` : '--';

        const precipitation = data.rain + data.snow;
        document.getElementById('precipitation').textContent =
            precipitation > 0 ? `${precipitation.toFixed(1)} mm` : '0 mm';

        const locationElement = document.getElementById('location-name');
        if (data.location.coords) {
            locationElement.innerHTML =
                `<strong>${data.location.name}</strong><br><small>${data.location.coords}</small>`;
        } else {
            locationElement.textContent = data.location.name;
        }

        const iconElement = document.getElementById('weather-icon');
        const emojiIcon = this.getWeatherEmoji(data.weather.icon);
        iconElement.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="70" font-size="60" text-anchor="middle" x="50">${emojiIcon}</text></svg>`;
        iconElement.alt = data.weather.description;
    }

    _timeString(datetime) {
        return new Date(datetime).toLocaleTimeString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    updateForecast24h(forecast) {
        if (!this.forecast24hElement) return;
        this.forecast24hElement.innerHTML = '';
        (forecast || []).forEach(item => {
            const emoji = this.getWeatherEmoji(item.weather.icon);
            const el = document.createElement('div');
            el.className = 'forecast-item';
            el.innerHTML = `
                <div class="forecast-time">${this._timeString(item.datetime)}</div>
                <img class="forecast-icon" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='70' font-size='50' text-anchor='middle' x='50'>${emoji}</text></svg>" alt="${item.weather.description}">
                <div class="forecast-temp">${item.temperature.temp}°</div>
                <div class="forecast-desc">${item.weather.description}</div>
                ${item.rain > 0 ? `<div class="forecast-rain">${item.rain.toFixed(1)}mm</div>` : ''}
                ${item.precipitation_probability > 0 ? `<div class="forecast-rain">💧 ${item.precipitation_probability}%</div>` : ''}
            `;
            this.forecast24hElement.appendChild(el);
        });
    }

    updateForecast7d(forecast) {
        if (!this.forecast7dElement) return;
        this.forecast7dElement.innerHTML = '';
        (forecast || []).forEach(item => {
            const date = new Date(item.datetime);
            const dayName = date.toLocaleDateString('nl-NL', {
                weekday: 'long', month: 'short', day: 'numeric'
            });
            const emoji = this.getWeatherEmoji(item.weather.icon);
            const el = document.createElement('div');
            el.className = 'forecast-day';
            el.innerHTML = `
                <div class="forecast-day-info">
                    <div class="forecast-day-name">${this.capitalizeFirst(dayName)}</div>
                    <img class="forecast-day-icon" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='70' font-size='50' text-anchor='middle' x='50'>${emoji}</text></svg>" alt="${item.weather.description}">
                    <div class="forecast-day-desc">${item.weather.description}</div>
                    ${item.precipitation_probability ? `<div class="forecast-rain">💧 ${item.precipitation_probability}%</div>` : ''}
                </div>
                <div class="forecast-day-temp">
                    <strong>${item.temperature.max}°</strong> / ${item.temperature.min}°
                </div>
            `;
            this.forecast7dElement.appendChild(el);
        });
    }

    updateAlerts(alerts) {
        if (!this.alertsElement) return;
        if (!alerts || alerts.length === 0) {
            this.alertsElement.innerHTML = '<p class="no-alerts">Geen actuele waarschuwingen</p>';
            return;
        }
        this.alertsElement.innerHTML = '';
        alerts.forEach(alert => {
            const el = document.createElement('div');
            el.className = 'alert-item';
            el.innerHTML = `
                <div class="alert-severity">${alert.severity}</div>
                <div class="alert-description">${alert.description}</div>
            `;
            this.alertsElement.appendChild(el);
        });
    }

    updateLastUpdate() {
        this.lastUpdateElement.textContent = new Date().toLocaleTimeString('nl-NL', {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
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
        const original = this.refreshBtn.textContent;
        this.refreshBtn.textContent = '🔄 ...';
        const { lat, lon } = this._coords();
        this.loadWeatherData(true, lat, lon).finally(() => {
            setTimeout(() => {
                this.refreshBtn.disabled = false;
                this.refreshBtn.textContent = original;
            }, 1000);
        });
    }

    showError(message) {
        if (!this.errorMessage || !this.errorModal) return;
        this.errorMessage.textContent = message;
        this.errorModal.style.display = 'flex';
    }

    closeErrorModal() {
        if (this.errorModal) this.errorModal.style.display = 'none';
    }

    capitalizeFirst(str) {
        return str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
    }

    getWeatherEmoji(iconCode) {
        const iconMap = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌦️', '09n': '🌦️',
            '10d': '🌧️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        return iconMap[iconCode] || '☁️';
    }

    // ========================================================================
    // Fishing
    // ========================================================================
    _cloudFromCode(code) {
        if (code === 0) return 5;
        if (code === 1) return 20;
        if (code === 2) return 45;
        if (code === 3) return 85;
        if (code === 45 || code === 48) return 95;
        if (code >= 51 && code <= 67) return 80;
        if (code >= 71 && code <= 77) return 90;
        if (code >= 80 && code <= 82) return 75;
        return 80;
    }

    updateFishingConditions() {
        const element = document.getElementById('fishing-data');
        if (!element) return;
        if (!this.currentData) {
            element.innerHTML = '<p class="no-alerts">Nog geen weerdata. Laad eerst het weer.</p>';
            return;
        }
        const c = this.currentData;
        const fishingData = this.calculateFishingConditions({
            temperature: c.temperature.current,
            windSpeed: c.wind.speed,
            clouds: c.clouds,
            humidity: c.humidity,
            precipitation: c.rain + c.snow
        });
        this.displayFishingConditions(fishingData);
        this.displayFishingForecast();
    }

    calculateFishingConditions(weather) {
        let score = 0;
        const factors = [];
        const temp = weather.temperature;

        let tempScore, tempStatus;
        if (temp >= 15 && temp <= 25) { tempScore = 25; tempStatus = 'Ideaal voor vissen'; }
        else if ((temp >= 10 && temp < 15) || (temp > 25 && temp <= 30)) { tempScore = 15; tempStatus = 'Goed voor vissen'; }
        else if ((temp >= 5 && temp < 10) || (temp > 30 && temp <= 35)) { tempScore = 10; tempStatus = 'Matig voor vissen'; }
        else { tempScore = 5; tempStatus = 'Moeilijke omstandigheden'; }
        factors.push({ icon: '🌡️', name: 'Temperatuur', value: `${temp}°C`, status: tempStatus });

        const wind = weather.windSpeed;
        let windScore, windStatus;
        if (wind >= 5 && wind <= 15) { windScore = 25; windStatus = 'Perfect voor vissen'; }
        else if ((wind >= 0 && wind < 5) || (wind > 15 && wind <= 25)) { windScore = 15; windStatus = 'Acceptabel'; }
        else if (wind > 25 && wind <= 35) { windScore = 10; windStatus = 'Te winderig'; }
        else { windScore = 5; windStatus = 'Zeer moeilijk'; }
        factors.push({ icon: '💨', name: 'Wind', value: `${wind} km/h`, status: windStatus });

        const cloudCover = weather.clouds;
        let cloudScore, cloudStatus;
        if (cloudCover >= 50 && cloudCover <= 80) { cloudScore = 20; cloudStatus = 'Ideaal bewolkt'; }
        else if ((cloudCover >= 30 && cloudCover < 50) || (cloudCover > 80 && cloudCover <= 95)) { cloudScore = 15; cloudStatus = 'Goed'; }
        else if (cloudCover < 30) { cloudScore = 10; cloudStatus = 'Te zonnig'; }
        else { cloudScore = 8; cloudStatus = 'Te bewolkt'; }
        factors.push({ icon: '☁️', name: 'Bewolking', value: `${cloudCover}%`, status: cloudStatus });

        const rain = weather.precipitation;
        let rainScore, rainStatus;
        if (rain === 0) { rainScore = 15; rainStatus = 'Droog weer'; }
        else if (rain > 0 && rain <= 2) { rainScore = 20; rainStatus = 'Lichte regen - goed!'; }
        else if (rain > 2 && rain <= 5) { rainScore = 10; rainStatus = 'Matige regen'; }
        else { rainScore = 5; rainStatus = 'Teveel regen'; }
        factors.push({ icon: '🌧️', name: 'Neerslag', value: rain > 0 ? `${rain} mm` : 'Geen', status: rainStatus });

        const humid = weather.humidity;
        let humidScore, humidStatus;
        if (humid >= 60 && humid <= 80) { humidScore = 10; humidStatus = 'Ideaal vochtig'; }
        else if ((humid >= 50 && humid < 60) || (humid > 80 && humid <= 90)) { humidScore = 8; humidStatus = 'Acceptabel'; }
        else { humidScore = 5; humidStatus = humid < 50 ? 'Te droog' : 'Te vochtig'; }
        factors.push({ icon: '💧', name: 'Luchtvochtigheid', value: `${humid}%`, status: humidStatus });

        score = tempScore + windScore + cloudScore + rainScore + humidScore;

        let rating, description;
        if (score >= 80) { rating = 'Uitstekend'; description = 'Perfect weer om te gaan vissen!'; }
        else if (score >= 60) { rating = 'Goed'; description = 'Goede omstandigheden voor het vissen.'; }
        else if (score >= 40) { rating = 'Matig'; description = 'Redelijke omstandigheden. Nog steeds kansrijk.'; }
        else { rating = 'Slecht'; description = 'Moeilijke omstandigheden. Overweeg een andere dag.'; }

        return { score, rating, description, factors };
    }

    displayFishingConditions(fishingData) {
        const element = document.getElementById('fishing-data');
        if (!element) return;

        const scoreColor = fishingData.score >= 80 ? '#00b894'
            : fishingData.score >= 60 ? '#74b9ff'
            : fishingData.score >= 40 ? '#fdcb6e'
            : '#e17055';

        element.innerHTML = `
            <div class="fishing-overview">
                <div class="fishing-score" style="background: linear-gradient(135deg, ${scoreColor}, ${scoreColor}aa);">
                    <div class="score-value">${fishingData.score}</div>
                    <div class="score-label">${fishingData.rating}</div>
                    <div class="score-description">${fishingData.description}</div>
                </div>
            </div>
            <div class="fishing-factors">
                ${fishingData.factors.map(f => `
                    <div class="fishing-factor">
                        <div class="factor-icon">${f.icon}</div>
                        <div class="factor-info">
                            <h4>${f.name}</h4>
                            <p class="factor-value">${f.value}</p>
                            <p class="factor-status">${f.status}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    displayFishingForecast() {
        const element = document.getElementById('fishing-forecast-data');
        if (!element) return;
        if (!this.forecast7d) {
            element.innerHTML = '<p class="no-alerts">Nog geen voorspelling.</p>';
            return;
        }

        element.innerHTML = this.forecast7d.map(day => {
            const conditions = this.calculateFishingConditions({
                temperature: day.temperature.max,
                windSpeed: day.wind.speed,
                clouds: this._cloudFromCode(this._codeFromIcon(day.weather.icon)),
                humidity: 65,
                precipitation: day.rain
            });

            const ratingClass = conditions.score >= 80 ? 'excellent'
                : conditions.score >= 60 ? 'good'
                : conditions.score >= 40 ? 'fair' : 'poor';

            const date = new Date(day.datetime);
            const dayName = date.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'short' });

            return `
                <div class="fishing-forecast-day ${ratingClass}">
                    <div class="fishing-day-info">
                        <div class="fishing-day-name">${this.capitalizeFirst(dayName)}</div>
                        <div class="fishing-score-badge ${ratingClass}">${conditions.score}</div>
                        <div class="fishing-conditions-summary">
                            ${day.wind.speed} km/h wind, ${this._cloudFromCode(this._codeFromIcon(day.weather.icon))}% bewolkt
                            ${day.rain > 0 ? `, ${day.rain.toFixed(1)}mm neerslag` : ''}
                        </div>
                    </div>
                    <div class="fishing-weather-summary">
                        <div class="fishing-temp">${day.temperature.max}°C</div>
                        <div class="fishing-weather-desc">${conditions.rating}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    _codeFromIcon(icon) {
        const map = { '01': 0, '02': 2, '03': 3, '04': 3, '50': 45, '10': 61, '13': 71, '09': 81, '11': 95 };
        const prefix = (icon || '02d').slice(0, 2);
        return map[prefix] !== undefined ? map[prefix] : 2;
    }

    // ========================================================================
    // Fire risk (Bosbranden)
    // ========================================================================
    _fireLevelText(css) {
        return this.translate(`fire_level_${css}`) || this.translate('fire_level_matig');
    }

    _fireDescription(css) {
        return this.translate(`fire_desc_${css}`) || this.translate('fire_desc_matig');
    }

    async loadFireRisk() {
        const element = document.getElementById('fire-data');
        if (!element) return;
        element.innerHTML = `<p class="no-alerts">${this.translate('fire_loading')}</p>`;
        const { lat, lon } = this._coords();
        const q = (lat && lon) ? `?lat=${lat}&lon=${lon}` : '';

        try {
            const data = await this._fetchJSON(`/fire-risk${q}`);
            const cur = data.current;
            const levelText = this._fireLevelText(cur.css);
            const desc = this._fireDescription(cur.css);

            element.innerHTML = `
                <div class="fire-overview">
                    <div class="fire-gauge ${cur.css}">
                        <div class="fire-level">${levelText}</div>
                        <div class="fire-desc">${desc}</div>
                    </div>
                </div>
                <div class="fishing-factors">
                    <div class="fishing-factor"><div class="factor-icon">🌡️</div>
                        <div class="factor-info"><h4>Temperatuur</h4><p class="factor-value">${cur.temperature}°C</p></div></div>
                    <div class="fishing-factor"><div class="factor-icon">💧</div>
                        <div class="factor-info"><h4>Luchtvochtigheid</h4><p class="factor-value">${cur.humidity}%</p></div></div>
                    <div class="fishing-factor"><div class="factor-icon">💨</div>
                        <div class="factor-info"><h4>Wind</h4><p class="factor-value">${cur.wind_speed} km/h</p></div></div>
                    <div class="fishing-factor"><div class="factor-icon">🌧️</div>
                        <div class="factor-info"><h4>Neerslag</h4><p class="factor-value">${cur.precipitation} mm</p></div></div>
                    <div class="fishing-factor"><div class="factor-icon">🧯</div>
                        <div class="factor-info"><h4>${this.translate('fire_angstrom')}</h4><p class="factor-value">${cur.angstrom_index}</p></div></div>
                </div>
                ${cur.smoke_from_wildfires ? `
                <div class="fire-smoke-warning">
                    ${this.translate('fire_smoke')}: ${cur.smoke_from_wildfires.toFixed(1)} μg/m³
                </div>` : ''}
            `;

            this.renderFireForecast(data.forecast || []);
        } catch (error) {
            console.error('Fire risk error:', error);
            element.innerHTML = `<p class="no-alerts">⚠️ ${this.translate('error_message')}</p>`;
        }
    }

    renderFireForecast(forecast) {
        const element = document.getElementById('fire-forecast-data');
        if (!element) return;
        if (!forecast.length) {
            element.innerHTML = `<p class="no-alerts">${this.translate('no_alerts')}</p>`;
            return;
        }
        element.innerHTML = forecast.map(day => {
            const date = new Date(`${day.date}T12:00:00`);
            const dayName = date.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'short' });
            return `
                <div class="fire-day ${day.css}">
                    <div class="fire-day-name">${this.capitalizeFirst(dayName)}</div>
                    <div class="fire-day-level">${this._fireLevelText(day.css)}</div>
                    <div class="fire-day-meta">
                        ${day.max_temp}°C · ${day.humidity}% vocht · ${day.max_wind} km/h wind
                        ${day.precipitation_sum > 0 ? ` · ${day.precipitation_sum.toFixed(1)}mm neerslag` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    // ========================================================================
    // Air quality (Luchtkwaliteit)
    // ========================================================================
    _aqiLevelText(css) {
        return this.translate(`aqi_${css}`) || this.translate('aqi_moderate');
    }

    async loadAirQuality() {
        const element = document.getElementById('air-data');
        if (!element) return;
        element.innerHTML = `<p class="no-alerts">${this.translate('air_loading')}</p>`;
        const { lat, lon } = this._coords();
        const q = (lat && lon) ? `?lat=${lat}&lon=${lon}` : '';

        try {
            const data = await this._fetchJSON(`/air-quality${q}`);
            const aqi = data.aqi;
            const scaleLabel = aqi.scale === 'us' ? this.translate('aqi_scale_us') : this.translate('aqi_scale_european');

            const pollutants = [
                { key: 'pm2_5', label: 'PM2.5', unit: 'μg/m³' },
                { key: 'pm10', label: 'PM10', unit: 'μg/m³' },
                { key: 'ozone', label: 'Ozon (O₃)', unit: 'μg/m³' },
                { key: 'nitrogen_dioxide', label: 'NO₂', unit: 'μg/m³' },
                { key: 'sulphur_dioxide', label: 'SO₂', unit: 'μg/m³' },
                { key: 'carbon_monoxide', label: 'CO', unit: 'μg/m³' }
            ];

            element.innerHTML = `
                <div class="aqi-overview">
                    <div class="aqi-card ${aqi.css}">
                        <div class="aqi-value">${aqi.value}</div>
                        <div class="aqi-label">${this._aqiLevelText(aqi.css)}</div>
                        <div class="aqi-scale">${scaleLabel}</div>
                    </div>
                    <div class="aqi-extra">
                        ${data.uv_index != null ? `<div class="aqi-extra-item">☀️ UV-index: <strong>${data.uv_index}</strong></div>` : ''}
                        ${data.pm10_wildfires != null ? `<div class="aqi-extra-item">🔥 ${this.translate('fire_smoke')}: <strong>${data.pm10_wildfires.toFixed(1)} μg/m³</strong></div>` : ''}
                    </div>
                </div>
                <h4 class="aqi-subtitle">${this.translate('pollutants')}</h4>
                <div class="aqi-pollutants">
                    ${pollutants.map(p => {
                        const val = data.pollutants[p.key];
                        return `
                            <div class="aqi-pollutant">
                                <span class="aqi-pollutant-name">${p.label}</span>
                                <span class="aqi-pollutant-value">${val != null ? `${val} ${p.unit}` : '--'}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        } catch (error) {
            console.error('Air quality error:', error);
            element.innerHTML = `<p class="no-alerts">⚠️ ${this.translate('error_message')}</p>`;
        }
    }

    // ========================================================================
    // Geolocation
    // ========================================================================
    getUserLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocatie wordt niet ondersteund door deze browser'));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                (position) => resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }),
                (error) => {
                    const messages = {
                        [error.PERMISSION_DENIED]: 'Locatietoegang geweigerd.',
                        [error.POSITION_UNAVAILABLE]: 'Locatie niet beschikbaar.',
                        [error.TIMEOUT]: 'Time-out bij bepalen van locatie.'
                    };
                    reject(new Error(messages[error.code] || 'Onbekende fout bij locatiebepaling.'));
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
            );
        });
    }
}

// ============================================================================
// Global helpers used from templates
// ============================================================================
function closeErrorModal() {
    if (window.weatherApp) window.weatherApp.closeErrorModal();
}

function refreshWeatherData() {
    if (window.weatherApp) window.weatherApp.refreshWeatherData();
}

// ============================================================================
// Games
// ============================================================================
let currentGame = 'menu';
const activeLoops = {};

function stopLoop(key) {
    if (activeLoops[key] !== undefined) {
        cancelAnimationFrame(activeLoops[key]);
        delete activeLoops[key];
    }
}

function stopAllGames() {
    Object.keys(activeLoops).forEach(stopLoop);
    ['flappy', 'snake', 'pong', 'breakout'].forEach(key => {
        const state = gameStates[key];
        if (state) state.running = false;
    });
    pongGame.keys = {};
    breakoutGame.keys = {};
}

const gameStates = {};

// Unified keyboard handling (bound once, routed per active game).
function handleGlobalKeyDown(e) {
    if (currentGame === '2048') { handle2048Key(e); return; }
    if (currentGame === 'flappy') {
        if (e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); flappyJump(); }
        return;
    }
    if (currentGame === 'snake') { handleSnakeKey(e); return; }
    if (currentGame === 'pong') { pongGame.keys[e.key] = true; return; }
    if (currentGame === 'breakout') { breakoutGame.keys[e.key] = true; return; }
}

function handleGlobalKeyUp(e) {
    pongGame.keys[e.key] = false;
    breakoutGame.keys[e.key] = false;
}

document.addEventListener('keydown', handleGlobalKeyDown);
document.addEventListener('keyup', handleGlobalKeyUp);

function showGame(gameType) {
    document.querySelectorAll('.game-container').forEach(c => c.style.display = 'none');
    currentGame = gameType;
    if (gameType === 'menu') return;

    const container = document.getElementById(`game-${gameType}`);
    if (!container) return;
    container.style.display = 'block';

    if (gameType === '2048') {
        if (!document.getElementById('grid-2048').hasChildNodes()) initGame2048();
        else render2048();
    } else if (gameType === 'guess') {
        newGuessGame();
    } else if (gameType === 'memory') {
        startMemoryGame();
    }
}

// ---------------------------------------------------------------------------
// High scores (localStorage)
// ---------------------------------------------------------------------------
function loadHighScore(game) {
    return parseInt(localStorage.getItem(`weer-highscore-${game}`) || '0', 10);
}

function updateHighScore(game, score) {
    const prev = loadHighScore(game);
    if (score > prev) {
        localStorage.setItem(`weer-highscore-${game}`, String(score));
    }
    const el = document.getElementById(`highscore-${game}`);
    if (el) el.textContent = String(Math.max(prev, score));
}

function initHighScore(game) {
    const el = document.getElementById(`highscore-${game}`);
    if (el) el.textContent = String(loadHighScore(game));
}

// ---------------------------------------------------------------------------
// 2048
// ---------------------------------------------------------------------------
const game2048 = { grid: [], score: 0, size: 4, over: false, won: false };

function initGame2048() {
    const container = document.getElementById('grid-2048');
    container.innerHTML = '';
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.dataset.index = i;
        container.appendChild(cell);
    }
    initHighScore('2048');
    newGame2048();
    bind2048Touch();
}

function bind2048Touch() {
    const grid = document.getElementById('grid-2048');
    if (!grid || grid.dataset.touchBound) return;
    grid.dataset.touchBound = 'true';
    let startX = 0, startY = 0;
    grid.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        startX = t.clientX;
        startY = t.clientY;
    }, { passive: true });
    grid.addEventListener('touchend', (e) => {
        if (currentGame !== '2048' || game2048.over) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - startX;
        const dy = t.clientY - startY;
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 30) return;
        if (Math.abs(dx) > Math.abs(dy)) {
            move2048(dx > 0 ? 'right' : 'left');
        } else {
            move2048(dy > 0 ? 'down' : 'up');
        }
    }, { passive: true });
}

function newGame2048() {
    game2048.grid = Array(16).fill(0);
    game2048.score = 0;
    game2048.over = false;
    game2048.won = false;
    addRandomTile2048();
    addRandomTile2048();
    document.getElementById('gameover-2048').style.display = 'none';
    updateScore2048();
    render2048();
}

function addRandomTile2048() {
    const empty = [];
    game2048.grid.forEach((v, i) => { if (v === 0) empty.push(i); });
    if (!empty.length) return;
    const idx = empty[Math.floor(Math.random() * empty.length)];
    game2048.grid[idx] = Math.random() < 0.9 ? 2 : 4;
}

function render2048() {
    document.querySelectorAll('#grid-2048 .grid-cell').forEach((cell, index) => {
        const value = game2048.grid[index];
        cell.textContent = value === 0 ? '' : value;
        cell.className = `grid-cell ${value === 0 ? '' : `tile-${value}`}`;
    });
    document.getElementById('score-2048').textContent = game2048.score;
}

function updateScore2048() {
    document.getElementById('score-2048').textContent = game2048.score;
}

function hasMoves2048() {
    const g = game2048.grid;
    for (let i = 0; i < 16; i++) {
        if (g[i] === 0) return true;
        if (i % 4 !== 3 && g[i] === g[i + 1]) return true;
        if (i < 12 && g[i] === g[i + 4]) return true;
    }
    return false;
}

function end2048(won) {
    game2048.over = true;
    updateHighScore('2048', game2048.score);
    const overlay = document.getElementById('gameover-2048');
    const title = overlay.querySelector('h4');
    const translate = (k) => (window.weatherApp ? window.weatherApp.translate(k) : k);
    title.textContent = won ? translate('you_win') : translate('game_over');
    overlay.style.display = 'flex';
}

function move2048(direction) {
    if (game2048.over || currentGame !== '2048') return;

    const original = [...game2048.grid];
    const rows = [0, 1, 2, 3];

    const transform = (indices) => {
        let moved = false;
        indices.forEach(row => {
            const arr = row.map(c => game2048.grid[c]);
            const newArr = slideAndMerge(arr);
            newArr.forEach((val, k) => {
                if (game2048.grid[row[k]] !== val) moved = true;
                game2048.grid[row[k]] = val;
            });
        });
        return moved;
    };

    let moved = false;
    if (direction === 'left') moved = transform(rows.map(r => [r * 4, r * 4 + 1, r * 4 + 2, r * 4 + 3]));
    if (direction === 'right') moved = transform(rows.map(r => [r * 4 + 3, r * 4 + 2, r * 4 + 1, r * 4]));
    if (direction === 'up') moved = transform(rows.map(c => [c, c + 4, c + 8, c + 12]));
    if (direction === 'down') moved = transform(rows.map(c => [c + 12, c + 8, c + 4, c]));

    if (!moved) return;

    addRandomTile2048();
    render2048();
    updateScore2048();
    trackGameMove(direction, game2048.score);

    if (game2048.grid.includes(2048) && !game2048.won) {
        game2048.won = true;
        end2048(true);
        return;
    }
    if (!hasMoves2048()) {
        end2048(false);
    }
}

function handle2048Key(e) {
    const map = {
        ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right'
    };
    const dir = map[e.key];
    if (!dir) return;
    e.preventDefault();
    move2048(dir);
}

function slideAndMerge(array) {
    const filtered = array.filter(v => v !== 0);
    for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
            filtered[i] *= 2;
            game2048.score += filtered[i];
            filtered[i + 1] = 0;
        }
    }
    const result = filtered.filter(v => v !== 0);
    while (result.length < 4) result.push(0);
    return result;
}

async function trackGameMove(direction, score) {
    try {
        const formData = new FormData();
        formData.append('direction', direction);
        formData.append('score', score);
        await fetch('/api/track/move', { method: 'POST', body: formData });
    } catch (error) {
        console.error('Error tracking move:', error);
    }
}

// ---------------------------------------------------------------------------
// Flappy Bird
// ---------------------------------------------------------------------------
const flappyGame = {
    bird: { x: 50, y: 150, velocity: 0 },
    pipes: [], score: 0, running: false, canvas: null, ctx: null
};
gameStates.flappy = flappyGame;

function startFlappyGame() {
    stopLoop('flappy');
    const canvas = document.getElementById('flappy-canvas');
    flappyGame.canvas = canvas;
    flappyGame.ctx = canvas.getContext('2d');
    flappyGame.bird = { x: 50, y: 150, velocity: 0 };
    flappyGame.pipes = [];
    flappyGame.score = 0;
    flappyGame.running = true;
    document.getElementById('score-flappy').textContent = '0';
    initHighScore('flappy');

    canvas.addEventListener('click', flappyJump);
    activeLoops.flappy = requestAnimationFrame(flappyLoop);
}

function flappyJump() {
    if (flappyGame.running) flappyGame.bird.velocity = -8;
}

function flappyLoop() {
    if (!flappyGame.running) return;
    const ctx = flappyGame.ctx;
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, 400, 300);

    flappyGame.bird.velocity += 0.5;
    flappyGame.bird.y += flappyGame.bird.velocity;

    if (flappyGame.bird.y < 0 || flappyGame.bird.y > 280) {
        endFlappyGame();
        return;
    }

    if (flappyGame.pipes.length === 0 || flappyGame.pipes[flappyGame.pipes.length - 1].x < 200) {
        const pipeHeight = Math.random() * 150 + 50;
        flappyGame.pipes.push({ x: 400, topHeight: pipeHeight, bottomY: pipeHeight + 80, scored: false });
    }

    flappyGame.pipes = flappyGame.pipes.filter(pipe => pipe.x > -30);
    for (const pipe of flappyGame.pipes) {
        pipe.x -= 3;
        ctx.fillStyle = '#228B22';
        ctx.fillRect(pipe.x, 0, 30, pipe.topHeight);
        ctx.fillRect(pipe.x, pipe.bottomY, 30, 300 - pipe.bottomY);

        if (flappyGame.bird.x + 20 > pipe.x && flappyGame.bird.x < pipe.x + 30) {
            if (flappyGame.bird.y < pipe.topHeight || flappyGame.bird.y + 20 > pipe.bottomY) {
                endFlappyGame();
                return;
            }
        }
        if (!pipe.scored && pipe.x + 30 < flappyGame.bird.x) {
            pipe.scored = true;
            flappyGame.score++;
            document.getElementById('score-flappy').textContent = flappyGame.score;
        }
    }

    ctx.fillStyle = '#FFD700';
    ctx.fillRect(flappyGame.bird.x, flappyGame.bird.y, 20, 20);

    activeLoops.flappy = requestAnimationFrame(flappyLoop);
}

function endFlappyGame() {
    flappyGame.running = false;
    stopLoop('flappy');
    updateHighScore('flappy', flappyGame.score);
    const ctx = flappyGame.ctx;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0, 100, 400, 100);
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', 200, 145);
    ctx.fillText(`Score: ${flappyGame.score}`, 200, 180);
}

// ---------------------------------------------------------------------------
// Guess the Number
// ---------------------------------------------------------------------------
const guessGame = { targetNumber: 0, attempts: 0, maxNumber: 100 };

function newGuessGame() {
    guessGame.targetNumber = Math.floor(Math.random() * guessGame.maxNumber) + 1;
    guessGame.attempts = 0;
    const input = document.getElementById('guess-input');
    document.getElementById('attempts-count').textContent = '0';
    document.getElementById('guess-feedback').innerHTML = '';
    input.value = '';
    input.disabled = false;
    input.focus();
}

function makeGuess() {
    const input = document.getElementById('guess-input');
    const feedback = document.getElementById('guess-feedback');
    const guess = parseInt(input.value, 10);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        feedback.innerHTML = `<p style="color: red;">${window.weatherApp ? window.weatherApp.translate('guess_invalid') : ''}</p>`;
        return;
    }

    guessGame.attempts++;
    document.getElementById('attempts-count').textContent = guessGame.attempts;

    if (guess === guessGame.targetNumber) {
        feedback.innerHTML = `<p style="color: green;">${window.weatherApp ? window.weatherApp.translate('guess_correct') : '🎉'}<b> ${guessGame.attempts}</b> ${window.weatherApp ? window.weatherApp.translate('guess_attempts') : 'attempts!'}</p>`;
        input.disabled = true;
    } else if (guess < guessGame.targetNumber) {
        feedback.innerHTML = `<p style="color: blue;">${window.weatherApp ? window.weatherApp.translate('too_low') : ''}</p>`;
    } else {
        feedback.innerHTML = `<p style="color: orange;">${window.weatherApp ? window.weatherApp.translate('too_high') : ''}</p>`;
    }
    input.value = '';
    input.focus();
}

// ---------------------------------------------------------------------------
// Snake
// ---------------------------------------------------------------------------
const snakeGame = {
    canvas: null, ctx: null, snake: [], food: {}, direction: 'right',
    score: 0, running: false, gridSize: 20, lastTick: 0, tickMs: 150
};
gameStates.snake = snakeGame;

function startSnakeGame() {
    stopLoop('snake');
    const canvas = document.getElementById('snake-canvas');
    snakeGame.canvas = canvas;
    snakeGame.ctx = canvas.getContext('2d');
    snakeGame.snake = [{ x: 200, y: 200 }];
    snakeGame.food = generateFood();
    snakeGame.direction = 'right';
    snakeGame.score = 0;
    snakeGame.tickMs = 150;
    snakeGame.lastTick = performance.now();
    snakeGame.running = true;
    document.getElementById('score-snake').textContent = '0';
    initHighScore('snake');
    activeLoops.snake = requestAnimationFrame(snakeLoop);
}

function generateFood() {
    const canvas = snakeGame.canvas;
    const g = snakeGame.gridSize;
    return {
        x: Math.floor(Math.random() * (canvas.width / g)) * g,
        y: Math.floor(Math.random() * (canvas.height / g)) * g
    };
}

function handleSnakeKey(e) {
    if (!snakeGame.running) return;
    const map = {
        ArrowUp: ['up', 'down'], ArrowDown: ['down', 'up'],
        ArrowLeft: ['left', 'right'], ArrowRight: ['right', 'left']
    };
    if (map[e.key]) {
        e.preventDefault();
        if (snakeGame.direction !== map[e.key][1]) snakeGame.direction = map[e.key][0];
    }
}

function snakeLoop(timestamp) {
    if (!snakeGame.running) return;
    if (timestamp - snakeGame.lastTick >= snakeGame.tickMs) {
        snakeGame.lastTick = timestamp;
        if (!stepSnake()) return;
    }
    drawSnake();
    activeLoops.snake = requestAnimationFrame(snakeLoop);
}

function stepSnake() {
    const ctx = snakeGame.ctx;
    const head = { ...snakeGame.snake[0] };
    if (snakeGame.direction === 'up') head.y -= snakeGame.gridSize;
    if (snakeGame.direction === 'down') head.y += snakeGame.gridSize;
    if (snakeGame.direction === 'left') head.x -= snakeGame.gridSize;
    if (snakeGame.direction === 'right') head.x += snakeGame.gridSize;

    if (head.x < 0 || head.x >= snakeGame.canvas.width || head.y < 0 || head.y >= snakeGame.canvas.height) {
        endSnakeGame();
        return false;
    }
    for (const seg of snakeGame.snake) {
        if (head.x === seg.x && head.y === seg.y) {
            endSnakeGame();
            return false;
        }
    }

    snakeGame.snake.unshift(head);
    if (head.x === snakeGame.food.x && head.y === snakeGame.food.y) {
        snakeGame.score += 10;
        document.getElementById('score-snake').textContent = snakeGame.score;
        snakeGame.food = generateFood();
        snakeGame.tickMs = Math.max(60, snakeGame.tickMs - 5);
    } else {
        snakeGame.snake.pop();
    }
    return true;
}

function drawSnake() {
    const ctx = snakeGame.ctx;
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, 0, snakeGame.canvas.width, snakeGame.canvas.height);
    ctx.fillStyle = '#27ae60';
    snakeGame.snake.forEach(seg => ctx.fillRect(seg.x, seg.y, snakeGame.gridSize, snakeGame.gridSize));
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(snakeGame.food.x, snakeGame.food.y, snakeGame.gridSize, snakeGame.gridSize);
}

function endSnakeGame() {
    snakeGame.running = false;
    stopLoop('snake');
    updateHighScore('snake', snakeGame.score);
    const ctx = snakeGame.ctx;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, snakeGame.canvas.width, snakeGame.canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '26px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', snakeGame.canvas.width / 2, snakeGame.canvas.height / 2 - 10);
    ctx.fillText(`Score: ${snakeGame.score}`, snakeGame.canvas.width / 2, snakeGame.canvas.height / 2 + 30);
}

// ---------------------------------------------------------------------------
// Pong
// ---------------------------------------------------------------------------
const pongGame = {
    canvas: null, ctx: null, paddleHeight: 60, paddleWidth: 10, ballRadius: 8,
    leftPaddle: { y: 0 }, rightPaddle: { y: 0 },
    ball: { x: 0, y: 0, dx: 0, dy: 0 },
    leftScore: 0, rightScore: 0, running: false, keys: {}, winScore: 10
};
gameStates.pong = pongGame;

function startPongGame() {
    stopLoop('pong');
    const canvas = document.getElementById('pong-canvas');
    pongGame.canvas = canvas;
    pongGame.ctx = canvas.getContext('2d');
    pongGame.leftPaddle.y = canvas.height / 2 - pongGame.paddleHeight / 2;
    pongGame.rightPaddle.y = canvas.height / 2 - pongGame.paddleHeight / 2;
    pongGame.ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 3, dy: 2 };
    pongGame.leftScore = 0;
    pongGame.rightScore = 0;
    pongGame.running = true;
    pongGame.keys = {};
    document.getElementById('score-pong').textContent = '0 - 0';
    activeLoops.pong = requestAnimationFrame(pongLoop);
}

function resetPongBall() {
    pongGame.ball.x = pongGame.canvas.width / 2;
    pongGame.ball.y = pongGame.canvas.height / 2;
    pongGame.ball.dx = -pongGame.ball.dx;
}

function pongLoop() {
    if (!pongGame.running) return;
    const ctx = pongGame.ctx;
    const w = pongGame.canvas.width;
    const h = pongGame.canvas.height;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

    if (pongGame.keys['w'] && pongGame.leftPaddle.y > 0) pongGame.leftPaddle.y -= 5;
    if (pongGame.keys['s'] && pongGame.leftPaddle.y < h - pongGame.paddleHeight) pongGame.leftPaddle.y += 5;
    if (pongGame.keys['ArrowUp'] && pongGame.rightPaddle.y > 0) pongGame.rightPaddle.y -= 5;
    if (pongGame.keys['ArrowDown'] && pongGame.rightPaddle.y < h - pongGame.paddleHeight) pongGame.rightPaddle.y += 5;

    pongGame.ball.x += pongGame.ball.dx;
    pongGame.ball.y += pongGame.ball.dy;

    if (pongGame.ball.y <= pongGame.ballRadius || pongGame.ball.y >= h - pongGame.ballRadius) {
        pongGame.ball.dy = -pongGame.ball.dy;
    }

    if (pongGame.ball.x <= pongGame.paddleWidth + pongGame.ballRadius &&
        pongGame.ball.y >= pongGame.leftPaddle.y && pongGame.ball.y <= pongGame.leftPaddle.y + pongGame.paddleHeight) {
        pongGame.ball.dx = Math.abs(pongGame.ball.dx);
    }
    if (pongGame.ball.x >= w - pongGame.paddleWidth - pongGame.ballRadius &&
        pongGame.ball.y >= pongGame.rightPaddle.y && pongGame.ball.y <= pongGame.rightPaddle.y + pongGame.paddleHeight) {
        pongGame.ball.dx = -Math.abs(pongGame.ball.dx);
    }

    if (pongGame.ball.x < 0) { pongGame.rightScore++; resetPongBall(); }
    if (pongGame.ball.x > w) { pongGame.leftScore++; resetPongBall(); }

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, pongGame.leftPaddle.y, pongGame.paddleWidth, pongGame.paddleHeight);
    ctx.fillRect(w - pongGame.paddleWidth, pongGame.rightPaddle.y, pongGame.paddleWidth, pongGame.paddleHeight);

    ctx.beginPath();
    ctx.arc(pongGame.ball.x, pongGame.ball.y, pongGame.ballRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.setLineDash([]);

    document.getElementById('score-pong').textContent = `${pongGame.leftScore} - ${pongGame.rightScore}`;

    if (pongGame.leftScore >= pongGame.winScore || pongGame.rightScore >= pongGame.winScore) {
        endPongGame();
        return;
    }
    activeLoops.pong = requestAnimationFrame(pongLoop);
}

function endPongGame() {
    pongGame.running = false;
    stopLoop('pong');
    const ctx = pongGame.ctx;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, pongGame.canvas.width, pongGame.canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', pongGame.canvas.width / 2, pongGame.canvas.height / 2);
    ctx.fillText(`${pongGame.leftScore} - ${pongGame.rightScore}`, pongGame.canvas.width / 2, pongGame.canvas.height / 2 + 30);
}

// ---------------------------------------------------------------------------
// Breakout
// ---------------------------------------------------------------------------
const breakoutGame = {
    canvas: null, ctx: null,
    paddle: { x: 0, y: 0, width: 80, height: 10 },
    ball: { x: 0, y: 0, dx: 0, dy: 0, radius: 8 },
    bricks: [], score: 0, lives: 3, running: false, keys: {}
};
gameStates.breakout = breakoutGame;

function startBreakoutGame() {
    stopLoop('breakout');
    const canvas = document.getElementById('breakout-canvas');
    breakoutGame.canvas = canvas;
    breakoutGame.ctx = canvas.getContext('2d');
    breakoutGame.paddle.x = canvas.width / 2 - breakoutGame.paddle.width / 2;
    breakoutGame.paddle.y = canvas.height - 20;
    breakoutGame.ball = { x: canvas.width / 2, y: canvas.height - 40, dx: 3, dy: -3, radius: 8 };
    breakoutGame.score = 0;
    breakoutGame.lives = 3;
    breakoutGame.running = true;
    breakoutGame.keys = {};
    breakoutGame.bricks = [];
    const brickRows = 5, brickCols = 8, brickWidth = 50, brickHeight = 20;
    for (let row = 0; row < brickRows; row++) {
        for (let col = 0; col < brickCols; col++) {
            breakoutGame.bricks.push({
                x: col * (brickWidth + 5) + 30,
                y: row * (brickHeight + 5) + 50,
                width: brickWidth, height: brickHeight,
                visible: true
            });
        }
    }
    document.getElementById('score-breakout').textContent = '0';
    initHighScore('breakout');
    breakoutGame.canvas.addEventListener('mousemove', handleBreakoutMouse);
    activeLoops.breakout = requestAnimationFrame(breakoutLoop);
}

function handleBreakoutMouse(e) {
    if (!breakoutGame.running) return;
    const rect = breakoutGame.canvas.getBoundingClientRect();
    const scaleX = breakoutGame.canvas.width / rect.width;
    breakoutGame.paddle.x = (e.clientX - rect.left) * scaleX - breakoutGame.paddle.width / 2;
    const maxX = breakoutGame.canvas.width - breakoutGame.paddle.width;
    if (breakoutGame.paddle.x < 0) breakoutGame.paddle.x = 0;
    if (breakoutGame.paddle.x > maxX) breakoutGame.paddle.x = maxX;
}

function breakoutLoop() {
    if (!breakoutGame.running) return;
    const ctx = breakoutGame.ctx;
    const w = breakoutGame.canvas.width;
    const h = breakoutGame.canvas.height;

    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, 0, w, h);

    if (breakoutGame.keys['ArrowLeft'] && breakoutGame.paddle.x > 0) breakoutGame.paddle.x -= 7;
    if (breakoutGame.keys['ArrowRight'] && breakoutGame.paddle.x < w - breakoutGame.paddle.width) breakoutGame.paddle.x += 7;

    breakoutGame.ball.x += breakoutGame.ball.dx;
    breakoutGame.ball.y += breakoutGame.ball.dy;

    if (breakoutGame.ball.x <= breakoutGame.ball.radius || breakoutGame.ball.x >= w - breakoutGame.ball.radius) {
        breakoutGame.ball.dx = -breakoutGame.ball.dx;
    }
    if (breakoutGame.ball.y <= breakoutGame.ball.radius) {
        breakoutGame.ball.dy = -breakoutGame.ball.dy;
    }

    if (breakoutGame.ball.y >= breakoutGame.paddle.y - breakoutGame.ball.radius &&
        breakoutGame.ball.x >= breakoutGame.paddle.x &&
        breakoutGame.ball.x <= breakoutGame.paddle.x + breakoutGame.paddle.width) {
        breakoutGame.ball.dy = -Math.abs(breakoutGame.ball.dy);
    }

    for (const brick of breakoutGame.bricks) {
        if (brick.visible &&
            breakoutGame.ball.x >= brick.x && breakoutGame.ball.x <= brick.x + brick.width &&
            breakoutGame.ball.y >= brick.y && breakoutGame.ball.y <= brick.y + brick.height) {
            brick.visible = false;
            breakoutGame.ball.dy = -breakoutGame.ball.dy;
            breakoutGame.score += 10;
            document.getElementById('score-breakout').textContent = breakoutGame.score;
        }
    }

    if (breakoutGame.bricks.every(b => !b.visible)) {
        endBreakoutGame(true);
        return;
    }

    if (breakoutGame.ball.y > h) {
        breakoutGame.lives--;
        if (breakoutGame.lives <= 0) {
            endBreakoutGame(false);
            return;
        }
        breakoutGame.ball = { x: w / 2, y: h - 40, dx: 3, dy: -3, radius: 8 };
    }

    ctx.fillStyle = '#74b9ff';
    ctx.fillRect(breakoutGame.paddle.x, breakoutGame.paddle.y, breakoutGame.paddle.width, breakoutGame.paddle.height);

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(breakoutGame.ball.x, breakoutGame.ball.y, breakoutGame.ball.radius, 0, Math.PI * 2);
    ctx.fill();

    for (const brick of breakoutGame.bricks) {
        if (brick.visible) {
            ctx.fillStyle = '#e74c3c';
            ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        }
    }

    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Lives: ${'❤️'.repeat(Math.max(0, breakoutGame.lives))}`, 10, 20);

    activeLoops.breakout = requestAnimationFrame(breakoutLoop);
}

function endBreakoutGame(won) {
    breakoutGame.running = false;
    stopLoop('breakout');
    updateHighScore('breakout', breakoutGame.score);
    const ctx = breakoutGame.ctx;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, breakoutGame.canvas.width, breakoutGame.canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(won ? 'You Win!' : 'Game Over!', breakoutGame.canvas.width / 2, breakoutGame.canvas.height / 2);
    ctx.fillText(`Score: ${breakoutGame.score}`, breakoutGame.canvas.width / 2, breakoutGame.canvas.height / 2 + 30);
}

// ---------------------------------------------------------------------------
// Memory
// ---------------------------------------------------------------------------
const memoryGame = {
    cards: [], flipped: [], matched: 0, moves: 0, lock: false, running: false
};

const MEMORY_EMOJIS = ['🌤️', '🌧️', '❄️', '⛈️', '🌪️', '🌈', '☀️', '🌊'];

function startMemoryGame() {
    const grid = document.getElementById('memory-grid');
    const emojis = [...MEMORY_EMOJIS, ...MEMORY_EMOJIS];
    // Shuffle
    for (let i = emojis.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
    }
    memoryGame.cards = emojis.map((emoji, index) => ({ emoji, index, matched: false }));
    memoryGame.flipped = [];
    memoryGame.matched = 0;
    memoryGame.moves = 0;
    memoryGame.lock = false;
    memoryGame.running = true;

    document.getElementById('moves-memory').textContent = '0';
    document.getElementById('score-memory').textContent = '0';

    grid.innerHTML = '';
    memoryGame.cards.forEach(card => {
        const el = document.createElement('div');
        el.className = 'memory-card';
        el.dataset.index = card.index;
        el.addEventListener('click', () => flipMemoryCard(card.index, el));
        grid.appendChild(el);
    });
}

function flipMemoryCard(index, el) {
    if (!memoryGame.running || memoryGame.lock) return;
    const card = memoryGame.cards[index];
    if (card.matched || el.classList.contains('flipped')) return;
    if (memoryGame.flipped.length >= 2) return;

    el.classList.add('flipped');
    el.textContent = card.emoji;
    memoryGame.flipped.push({ index, el });

    if (memoryGame.flipped.length === 2) {
        memoryGame.moves++;
        document.getElementById('moves-memory').textContent = memoryGame.moves;
        const [a, b] = memoryGame.flipped;
        if (memoryGame.cards[a.index].emoji === memoryGame.cards[b.index].emoji) {
            memoryGame.cards[a.index].matched = true;
            memoryGame.cards[b.index].matched = true;
            memoryGame.matched += 2;
            document.getElementById('score-memory').textContent = memoryGame.matched * 10;
            memoryGame.flipped = [];
            if (memoryGame.matched === memoryGame.cards.length) {
                memoryGame.running = false;
                alert('🎉 ' + (window.weatherApp ? window.weatherApp.translate('you_win') : 'You won!'));
            }
        } else {
            memoryGame.lock = true;
            setTimeout(() => {
                a.el.classList.remove('flipped');
                a.el.textContent = '';
                b.el.classList.remove('flipped');
                b.el.textContent = '';
                memoryGame.flipped = [];
                memoryGame.lock = false;
            }, 900);
        }
    }
}

// ============================================================================
// Init
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    window.weatherApp = new WeatherApp();
    initHighScore('2048');
    initHighScore('flappy');
    initHighScore('snake');
    initHighScore('breakout');

    // Geolocation button
    if (navigator.geolocation) {
        const subtitle = document.querySelector('header p');
        if (subtitle) {
            const locationBtn = document.createElement('button');
            locationBtn.className = 'location-btn';
            locationBtn.textContent = window.weatherApp.translate('use_location');

            locationBtn.addEventListener('click', async () => {
                try {
                    locationBtn.disabled = true;
                    locationBtn.textContent = window.weatherApp.translate('determining_location');
                    const location = await window.weatherApp.getUserLocation();
                    window.weatherApp.userLocation = location;
                    await window.weatherApp.loadWeatherData(true, location.lat, location.lon);
                    window.weatherApp.loadFireRisk();
                    window.weatherApp.loadAirQuality();
                } catch (error) {
                    console.error('Geolocation error:', error);
                    window.weatherApp.showError(error.message);
                } finally {
                    locationBtn.disabled = false;
                    locationBtn.textContent = window.weatherApp.translate('use_location');
                }
            });
            subtitle.appendChild(locationBtn);
        }
    }
});
