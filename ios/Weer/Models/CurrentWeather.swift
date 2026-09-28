import Foundation

struct CurrentWeather: Codable, Identifiable {
    struct Temperature: Codable, Hashable {
        let current: Int
        let feelsLike: Int

        enum CodingKeys: String, CodingKey {
            case current
            case feelsLike = "feels_like"
        }
    }

    let timestamp: String
    let location: GeoLocation
    let temperature: Temperature
    let humidity: Int
    let pressure: Int
    let wind: CurrentWind
    let weather: WeatherDescription
    let clouds: Int
    let visibility: Double?
    let rain: Double
    let snow: Double
    let isDay: Bool

    enum CodingKeys: String, CodingKey {
        case timestamp, location, temperature, humidity, pressure, wind, weather, clouds
        case visibility, rain, snow
        case isDay = "is_day"
    }

    var id: String { timestamp }

    var precipitation: Double { rain + snow }
}
