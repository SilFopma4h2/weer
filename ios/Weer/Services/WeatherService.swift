import Foundation

struct DashboardData {
    let current: CurrentWeather
    let forecast: ForecastResponse
    let alerts: AlertsResponse
}

struct WeatherService {
    private let client: APIClient
    private let language: String

    init(baseURL: URL = AppConfig.baseURL, language: String = AppConfig.language) {
        client = APIClient(baseURL: baseURL)
        self.language = language
    }

    private func query(lat: Double?, lon: Double?) -> [URLQueryItem] {
        var items = [URLQueryItem(name: "lang", value: language)]
        if let lat, let lon {
            items.append(URLQueryItem(name: "lat", value: String(lat)))
            items.append(URLQueryItem(name: "lon", value: String(lon)))
        }
        return items
    }

    func dashboard(lat: Double? = nil, lon: Double? = nil) async throws -> DashboardData {
        let items = query(lat: lat, lon: lon)
        async let current = client.get("/current", queryItems: items, as: CurrentWeather.self)
        async let forecast = client.get("/forecast", queryItems: items, as: ForecastResponse.self)
        async let alerts = client.get("/alerts", queryItems: items, as: AlertsResponse.self)
        return try await DashboardData(current: current, forecast: forecast, alerts: alerts)
    }

    func knownLocations() async throws -> KnownLocations {
        try await client.get("/locations", as: KnownLocations.self)
    }
}
