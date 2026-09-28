import Foundation

/// Fetches weather, air quality and fire risk straight from Open-Meteo, so the app
/// needs no backend of its own. It produces the same model types the views already
/// consume, which were originally decoded from the FastAPI responses.
struct OpenMeteoService: Sendable {
    private let session: URLSession
    private let decoder = JSONDecoder()

    private let forecastBase = "https://api.open-meteo.com/v1/forecast"
    private let airQualityBase = "https://air-quality-api.open-meteo.com/v1/air-quality"

    private static let currentVars = [
        "temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day",
        "precipitation", "rain", "showers", "snowfall", "weather_code", "cloud_cover",
        "pressure_msl", "surface_pressure", "wind_speed_10m", "wind_direction_10m",
        "wind_gusts_10m", "visibility"
    ]
    private static let hourlyVars = [
        "temperature_2m", "relative_humidity_2m", "apparent_temperature",
        "precipitation_probability", "precipitation", "weather_code", "cloud_cover",
        "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"
    ]
    private static let dailyVars = [
        "temperature_2m_max", "temperature_2m_min", "relative_humidity_2m_mean",
        "weather_code", "precipitation_sum", "apparent_temperature_max",
        "precipitation_probability_max", "wind_speed_10m_max",
        "wind_direction_10m_dominant", "sunrise", "sunset", "uv_index_max"
    ]
    private static let airQualityVars = [
        "us_aqi", "european_aqi", "pm2_5", "pm10", "pm10_wildfires", "uv_index",
        "ozone", "nitrogen_dioxide", "sulphur_dioxide", "carbon_monoxide"
    ]

    init(session: URLSession? = nil) {
        if let session {
            self.session = session
        } else {
            let configuration = URLSessionConfiguration.default
            configuration.timeoutIntervalForRequest = AppConfig.requestTimeout
            configuration.waitsForConnectivity = false
            self.session = URLSession(configuration: configuration)
        }
    }

    // MARK: - Open-Meteo response shapes

    private struct ForecastPayload: Decodable {
        struct Current: Decodable {
            let time: String
            let temperature: Double?
            let relativeHumidity: Double?
            let apparentTemperature: Double?
            let isDay: Double?
            let precipitation: Double?
            let rain: Double?
            let showers: Double?
            let snowfall: Double?
            let weatherCode: Double?
            let cloudCover: Double?
            let pressureMsl: Double?
            let surfacePressure: Double?
            let windSpeed: Double?
            let windDirection: Double?
            let windGusts: Double?
            let visibility: Double?

            enum CodingKeys: String, CodingKey {
                case time
                case temperature = "temperature_2m"
                case relativeHumidity = "relative_humidity_2m"
                case apparentTemperature = "apparent_temperature"
                case isDay = "is_day"
                case precipitation, rain, showers, snowfall
                case weatherCode = "weather_code"
                case cloudCover = "cloud_cover"
                case pressureMsl = "pressure_msl"
                case surfacePressure = "surface_pressure"
                case windSpeed = "wind_speed_10m"
                case windDirection = "wind_direction_10m"
                case windGusts = "wind_gusts_10m"
                case visibility
            }
        }

        struct Hourly: Decodable {
            let time: [String]
            let temperature: [Double?]
            let relativeHumidity: [Double?]
            let apparentTemperature: [Double?]
            let precipitationProbability: [Double?]
            let precipitation: [Double?]
            let weatherCode: [Double?]
            let cloudCover: [Double?]
            let windSpeed: [Double?]
            let windDirection: [Double?]

            enum CodingKeys: String, CodingKey {
                case time
                case temperature = "temperature_2m"
                case relativeHumidity = "relative_humidity_2m"
                case apparentTemperature = "apparent_temperature"
                case precipitationProbability = "precipitation_probability"
                case precipitation
                case weatherCode = "weather_code"
                case cloudCover = "cloud_cover"
                case windSpeed = "wind_speed_10m"
                case windDirection = "wind_direction_10m"
            }
        }

        struct Daily: Decodable {
            let time: [String]
            let temperatureMax: [Double?]
            let temperatureMin: [Double?]
            let humidityMean: [Double?]
            let weatherCode: [Double?]
            let precipitationSum: [Double?]
            let apparentTemperatureMax: [Double?]
            let precipitationProbabilityMax: [Double?]
            let windSpeedMax: [Double?]
            let windDirectionDominant: [Double?]
            let sunrise: [String]
            let sunset: [String]
            let uvIndexMax: [Double?]

            enum CodingKeys: String, CodingKey {
                case time
                case temperatureMax = "temperature_2m_max"
                case temperatureMin = "temperature_2m_min"
                case humidityMean = "relative_humidity_2m_mean"
                case weatherCode = "weather_code"
                case precipitationSum = "precipitation_sum"
                case apparentTemperatureMax = "apparent_temperature_max"
                case precipitationProbabilityMax = "precipitation_probability_max"
                case windSpeedMax = "wind_speed_10m_max"
                case windDirectionDominant = "wind_direction_10m_dominant"
                case sunrise, sunset
                case uvIndexMax = "uv_index_max"
            }
        }

        let current: Current
        let hourly: Hourly
        let daily: Daily
    }

    private struct AirQualityPayload: Decodable {
        struct Current: Decodable {
            let usAqi: Double?
            let europeanAqi: Double?
            let pm25: Double?
            let pm10: Double?
            let pm10Wildfires: Double?
            let uvIndex: Double?
            let ozone: Double?
            let nitrogenDioxide: Double?
            let sulphurDioxide: Double?
            let carbonMonoxide: Double?

            enum CodingKeys: String, CodingKey {
                case usAqi = "us_aqi"
                case europeanAqi = "european_aqi"
                case pm25 = "pm2_5"
                case pm10
                case pm10Wildfires = "pm10_wildfires"
                case uvIndex = "uv_index"
                case ozone
                case nitrogenDioxide = "nitrogen_dioxide"
                case sulphurDioxide = "sulphur_dioxide"
                case carbonMonoxide = "carbon_monoxide"
            }
        }

        let current: Current
    }

    // MARK: - Public entry point

    struct Dashboard {
        let current: CurrentWeather
        let forecast: ForecastResponse
        let alerts: [WeatherAlert]
        let airQuality: AirQuality?
        let fireRisk: FireRisk?
    }

    func dashboard(lat: Double, lon: Double) async throws -> Dashboard {
        async let forecastPayload: ForecastPayload = request(
            forecastBase,
            query: [
                query("latitude", "\(lat)"),
                query("longitude", "\(lon)"),
                query("current", Self.currentVars.joined(separator: ",")),
                query("hourly", Self.hourlyVars.joined(separator: ",")),
                query("daily", Self.dailyVars.joined(separator: ",")),
                query("timezone", "Europe/Amsterdam"),
                query("forecast_days", "7")
            ]
        )
        async let airQualityPayload: AirQualityPayload? = try? request(
            airQualityBase,
            query: [
                query("latitude", "\(lat)"),
                query("longitude", "\(lon)"),
                query("current", Self.airQualityVars.joined(separator: ",")),
                query("timezone", "Europe/Amsterdam"),
                query("forecast_days", "1")
            ]
        )

        let (forecast, air) = try await (forecastPayload, airQualityPayload)
        let location = GeoLocation(
            name: KnownPlaces.match(lat: lat, lon: lon)?.name ?? "My location",
            coords: String(format: "Lat: %.4f, Lon: %.4f", lat, lon),
            lat: lat,
            lon: lon
        )
        let stamp = Self.timestamp()

        return Dashboard(
            current: Self.makeCurrent(forecast, location: location, stamp: stamp),
            forecast: Self.makeForecast(forecast, location: location, stamp: stamp),
            alerts: Self.makeAlerts(forecast.current, stamp: stamp),
            airQuality: air.map { Self.makeAirQuality($0, location: location, stamp: stamp) },
            fireRisk: Self.makeFireRisk(forecast, air, location: location, stamp: stamp)
        )
    }

    /// Reverse-geocodes a coordinate to a place name, falling back to the nearest
    /// known city. Mirrors the backend's Nominatim lookup.
    func placeName(lat: Double, lon: Double) async -> String {
        if let match = KnownPlaces.match(lat: lat, lon: lon) { return match.name }
        var components = URLComponents(string: "https://nominatim.openstreetmap.org/reverse")
        components?.queryItems = [
            query("lat", "\(lat)"),
            query("lon", "\(lon)"),
            query("format", "json"),
            query("addressdetails", "1")
        ]
        guard let url = components?.url else { return "My location" }
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("en", forHTTPHeaderField: "Accept-Language")
        request.setValue("Weer/1.0 (iOS)", forHTTPHeaderField: "User-Agent")

        struct Response: Decodable {
            struct Address: Decodable {
                let village: String?
                let town: String?
                let city: String?
                let municipality: String?
                let county: String?
                let state: String?
                let country: String?
            }
            let address: Address?
        }

        guard let result = try? await session.data(for: request),
              let response = try? decoder.decode(Response.self, from: result.0),
              let address = response.address,
              let place = [address.village, address.town, address.city, address.municipality,
                           address.county, address.state, address.country]
                  .compactMap({ $0 }).first
        else { return "My location" }
        return place
    }

    // MARK: - Model construction

    private static func makeCurrent(
        _ data: ForecastPayload,
        location: GeoLocation,
        stamp: String
    ) -> CurrentWeather {
        let cur = data.current
        let isDay = (cur.isDay ?? 1) == 1
        let code = Int(cur.weatherCode ?? 0)
        let gust = int(cur.windGusts)

        return CurrentWeather(
            timestamp: stamp,
            location: location,
            temperature: .init(
                current: int(cur.temperature),
                feelsLike: int(cur.apparentTemperature)
            ),
            humidity: int(cur.relativeHumidity),
            pressure: int(cur.surfacePressure, fallback: 1013),
            wind: .init(
                speed: int(cur.windSpeed),
                direction: int(cur.windDirection),
                gust: gust == 0 ? nil : gust
            ),
            weather: WeatherCodes.description(code, isDay: isDay),
            clouds: int(cur.cloudCover),
            visibility: cur.visibility,
            rain: ((cur.precipitation ?? 0) * 10).rounded() / 10,
            snow: ((cur.snowfall ?? 0) * 10).rounded() / 10,
            isDay: isDay
        )
    }

    private static func makeForecast(
        _ data: ForecastPayload,
        location: GeoLocation,
        stamp: String
    ) -> ForecastResponse {
        let hourly = data.hourly
        var hours: [HourlyForecast] = []
        for i in 1...8 {
            let index = (i * 3) % max(hourly.time.count, 1)
            guard index < hourly.time.count else { continue }
            hours.append(
                HourlyForecast(
                    datetime: hourly.time[index],
                    temperature: .init(
                        temp: Int(value(hourly.temperature, index).rounded()),
                        feelsLike: Int(value(hourly.apparentTemperature, index).rounded())
                    ),
                    humidity: Int(value(hourly.relativeHumidity, index).rounded()),
                    wind: .init(
                        speed: Int(value(hourly.windSpeed, index).rounded()),
                        direction: Int(value(hourly.windDirection, index).rounded())
                    ),
                    weather: WeatherCodes.description(
                        Int(value(hourly.weatherCode, index)),
                        isDay: WeatherCodes.isDayHour(hourly.time[index])
                    ),
                    clouds: Int(value(hourly.cloudCover, index).rounded()),
                    rain: (value(hourly.precipitation, index) * 10).rounded() / 10,
                    precipitationProbability: Int(value(hourly.precipitationProbability, index).rounded())
                )
            )
        }

        let daily = data.daily
        var days: [DailyForecast] = []
        for i in 0..<min(daily.time.count, 7) {
            let max = value(daily.temperatureMax, i)
            let min = value(daily.temperatureMin, i)
            days.append(
                DailyForecast(
                    datetime: "\(daily.time[i])T12:00:00",
                    temperature: .init(
                        temp: Int(((max + min) / 2).rounded()),
                        feelsLike: Int(value(daily.apparentTemperatureMax, i).rounded()),
                        min: Int(min.rounded()),
                        max: Int(max.rounded())
                    ),
                    wind: .init(
                        speed: Int(value(daily.windSpeedMax, i).rounded()),
                        direction: Int(value(daily.windDirectionDominant, i).rounded())
                    ),
                    weather: WeatherCodes.description(Int(value(daily.weatherCode, i)), isDay: true),
                    rain: (value(daily.precipitationSum, i) * 10).rounded() / 10,
                    precipitationProbability: Int(value(daily.precipitationProbabilityMax, i).rounded()),
                    sunrise: i < daily.sunrise.count ? daily.sunrise[i] : "",
                    sunset: i < daily.sunset.count ? daily.sunset[i] : "",
                    uvIndexMax: (value(daily.uvIndexMax, i) * 10).rounded() / 10
                )
            )
        }

        return ForecastResponse(
            timestamp: stamp,
            location: location,
            forecast24h: hours,
            forecast7d: days
        )
    }

    private static func makeAlerts(_ cur: ForecastPayload.Current, stamp: String) -> [WeatherAlert] {
        var alerts: [WeatherAlert] = []
        let code = Int(cur.weatherCode ?? 0)
        if [95, 96, 99].contains(code) {
            alerts.append(
                WeatherAlert(
                    severity: String(localized: "Warning"),
                    title: String(localized: "Thunderstorm"),
                    description: String(
                        localized: "Thunderstorms expected (\(WeatherCodes.description(code)))."
                    ),
                    time: stamp
                )
            )
        }
        let gust = (cur.windGusts ?? 0).rounded()
        if gust >= 75 {
            alerts.append(
                WeatherAlert(
                    severity: String(localized: "Warning"),
                    title: String(localized: "Strong wind gusts"),
                    description: String(
                        localized: "Gusts of up to \(Int(gust)) km/h possible."
                    ),
                    time: stamp
                )
            )
        }
        return alerts
    }

    private static func makeAirQuality(
        _ data: AirQualityPayload,
        location: GeoLocation,
        stamp: String
    ) -> AirQuality {
        let cur = data.current
        let us = cur.usAqi ?? 0
        let european = cur.europeanAqi ?? 0
        let useUS = us > 0
        let value = useUS ? us : european
        let band = aqBand(value, useUS: useUS)

        return AirQuality(
            timestamp: stamp,
            location: location,
            aqi: .init(
                value: Int(value.rounded()),
                scale: useUS ? "us" : "european",
                level: band.label,
                css: band.css
            ),
            pollutants: .init(
                pm25: rounded(cur.pm25),
                pm10: rounded(cur.pm10),
                ozone: rounded(cur.ozone),
                nitrogenDioxide: rounded(cur.nitrogenDioxide),
                sulphurDioxide: rounded(cur.sulphurDioxide),
                carbonMonoxide: rounded(cur.carbonMonoxide)
            ),
            pm10Wildfires: rounded(cur.pm10Wildfires),
            uvIndex: rounded(cur.uvIndex)
        )
    }

    private static func makeFireRisk(
        _ weather: ForecastPayload,
        _ air: AirQualityPayload?,
        location: GeoLocation,
        stamp: String
    ) -> FireRisk {
        let cur = weather.current
        let temperature = cur.temperature ?? 0
        let humidity = cur.relativeHumidity ?? 0
        let wind = cur.windSpeed ?? 0
        let precipitation = cur.precipitation ?? 0

        var index = angstrom(temperature: temperature, humidity: humidity)
        if precipitation > 0 { index += precipitation }
        let level = fireLevel(index, wind: wind)
        let smoke = air?.current.pm10Wildfires

        var days: [FireRisk.Day] = []
        let daily = weather.daily
        for i in 0..<min(daily.time.count, 7) {
            let maxTemp = value(daily.temperatureMax, i)
            let humidityMean = value(daily.humidityMean, i)
            let maxWind = value(daily.windSpeedMax, i)
            let rain = value(daily.precipitationSum, i)
            var dayIndex = angstrom(temperature: maxTemp, humidity: humidityMean)
            if rain > 0 { dayIndex += rain }
            days.append(
                FireRisk.Day(
                    date: daily.time[i],
                    level: fireLevel(dayIndex, wind: maxWind).label,
                    css: fireLevel(dayIndex, wind: maxWind).css,
                    maxTemp: Int(maxTemp.rounded()),
                    maxWind: Int(maxWind.rounded()),
                    precipitationSum: (rain * 10).rounded() / 10,
                    humidity: Int(humidityMean.rounded())
                )
            )
        }

        return FireRisk(
            timestamp: stamp,
            location: location,
            current: .init(
                level: level.label,
                css: level.css,
                angstromIndex: (index * 100).rounded() / 100,
                temperature: Int(temperature.rounded()),
                humidity: Int(humidity.rounded()),
                windSpeed: Int(wind.rounded()),
                precipitation: (precipitation * 10).rounded() / 10,
                description: level.detail,
                smokeFromWildfires: smoke
            ),
            forecast: days
        )
    }

    // MARK: - Ported calculations

    /// Angström fire-risk index: lower values mean higher risk.
    private static func angstrom(temperature: Double, humidity: Double) -> Double {
        humidity / 20.0 + (27.0 - temperature) / 10.0 - 2.0
    }

    private static func fireLevel(_ index: Double, wind: Double) -> (css: String, label: String, detail: String) {
        let base: Int
        if index >= 4.0 { base = 0 }
        else if index >= 2.5 { base = 1 }
        else if index >= 2.0 { base = 2 }
        else if index >= 1.0 { base = 3 }
        else { base = 4 }

        let bonus: Int
        if wind >= 75 { bonus = 2 } else if wind >= 50 { bonus = 1 } else { bonus = 0 }

        let score = max(0, min(4, base + bonus))
        let css = ["laag", "matig", "verhoogd", "hoog", "extreem"][score]
        let label = [
            "laag": String(localized: "Low"),
            "matig": String(localized: "Moderate"),
            "verhoogd": String(localized: "Elevated"),
            "hoog": String(localized: "High"),
            "extreem": String(localized: "Extreme")
        ][css]!
        return (css, label, FireLevel.detail(token: css))
    }

    private static func aqBand(_ value: Double, useUS: Bool) -> (label: String, css: String) {
        let bands: [(limit: Double, label: String, css: String)]
        if useUS {
            bands = [
                (50, String(localized: "Good"), "good"),
                (100, String(localized: "Moderate"), "moderate"),
                (150, String(localized: "Unhealthy for sensitive groups"), "unhealthy"),
                (200, String(localized: "Unhealthy"), "unhealthy"),
                (300, String(localized: "Very unhealthy"), "hazardous"),
                (.infinity, String(localized: "Hazardous"), "hazardous")
            ]
        } else {
            bands = [
                (20, String(localized: "Good"), "good"),
                (40, String(localized: "Fair"), "moderate"),
                (60, String(localized: "Moderate"), "moderate"),
                (80, String(localized: "Poor"), "unhealthy"),
                (100, String(localized: "Very poor"), "unhealthy"),
                (.infinity, String(localized: "Extremely poor"), "hazardous")
            ]
        }
        for band in bands where value <= band.limit { return (band.label, band.css) }
        return (String(localized: "Unknown"), "moderate")
    }

    // MARK: - Helpers

    private func query(_ name: String, _ value: String) -> URLQueryItem {
        URLQueryItem(name: name, value: value)
    }

    private static func value(_ array: [Double?], _ index: Int) -> Double {
        guard index < array.count, let value = array[index] else { return 0 }
        return value
    }

    private static func rounded(_ value: Double?) -> Double? {
        guard let value else { return nil }
        return (value * 10).rounded() / 10
    }

    private static func int(_ value: Double?, fallback: Double = 0) -> Int {
        Int((value ?? fallback).rounded())
    }

    private static func timestamp() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
        formatter.timeZone = TimeZone(identifier: "Europe/Amsterdam")
        formatter.locale = Locale(identifier: "en_US_POSIX")
        return formatter.string(from: Date())
    }

    private func request<Response: Decodable>(_ base: String, query items: [URLQueryItem]) async throws -> Response {
        var components = URLComponents(string: base)
        components?.queryItems = items
        guard let url = components?.url else { throw APIError.invalidURL }

        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.setValue("application/json", forHTTPHeaderField: "Accept")

        let data: Data
        let response: URLResponse
        do {
            (data, response) = try await session.data(for: request)
        } catch is CancellationError {
            throw CancellationError()
        } catch {
            throw APIError.transport(error.localizedDescription)
        }
        guard let http = response as? HTTPURLResponse else {
            throw APIError.transport("No HTTP response")
        }
        guard (200..<300).contains(http.statusCode) else {
            throw APIError.server(status: http.statusCode, detail: "HTTP \(http.statusCode)")
        }
        do {
            return try decoder.decode(Response.self, from: data)
        } catch {
            throw APIError.decoding(error.localizedDescription)
        }
    }
}
