import Foundation

struct ForecastResponse: Codable {
    let timestamp: String
    let location: GeoLocation
    let forecast24h: [HourlyForecast]
    let forecast7d: [DailyForecast]

    enum CodingKeys: String, CodingKey {
        case timestamp, location
        case forecast24h = "forecast_24h"
        case forecast7d = "forecast_7d"
    }
}

struct HourlyForecast: Codable, Identifiable {
    struct Temperature: Codable, Hashable {
        let temp: Int
        let feelsLike: Int

        enum CodingKeys: String, CodingKey {
            case temp
            case feelsLike = "feels_like"
        }
    }

    let datetime: String
    let temperature: Temperature
    let humidity: Int
    let wind: Wind
    let weather: WeatherDescription
    let clouds: Int
    let rain: Double
    let precipitationProbability: Int

    enum CodingKeys: String, CodingKey {
        case datetime, temperature, humidity, wind, weather, clouds, rain
        case precipitationProbability = "precipitation_probability"
    }

    var id: String { datetime }
}

struct DailyForecast: Codable, Identifiable {
    struct Temperature: Codable, Hashable {
        let temp: Int
        let feelsLike: Int
        let min: Int
        let max: Int

        enum CodingKeys: String, CodingKey {
            case temp, min, max
            case feelsLike = "feels_like"
        }
    }

    let datetime: String
    let temperature: Temperature
    let wind: Wind
    let weather: WeatherDescription
    let rain: Double
    let precipitationProbability: Int
    let sunrise: String
    let sunset: String
    let uvIndexMax: Double

    enum CodingKeys: String, CodingKey {
        case datetime, temperature, wind, weather, rain, sunrise, sunset
        case precipitationProbability = "precipitation_probability"
        case uvIndexMax = "uv_index_max"
    }

    var id: String { datetime }
}
