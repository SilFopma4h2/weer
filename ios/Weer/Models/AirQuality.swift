import Foundation

struct AirQuality: Codable {
    struct Index: Codable, Hashable {
        let value: Int
        let scale: String
        let level: String
        let css: String
    }

    struct Pollutants: Codable, Hashable {
        let pm25: Double?
        let pm10: Double?
        let ozone: Double?
        let nitrogenDioxide: Double?
        let sulphurDioxide: Double?
        let carbonMonoxide: Double?

        enum CodingKeys: String, CodingKey {
            case pm25 = "pm2_5"
            case pm10, ozone
            case nitrogenDioxide = "nitrogen_dioxide"
            case sulphurDioxide = "sulphur_dioxide"
            case carbonMonoxide = "carbon_monoxide"
        }
    }

    let timestamp: String
    let location: GeoLocation
    let aqi: Index
    let pollutants: Pollutants
    let pm10Wildfires: Double?
    let uvIndex: Double?

    enum CodingKeys: String, CodingKey {
        case timestamp, location, aqi, pollutants
        case pm10Wildfires = "pm10_wildfires"
        case uvIndex = "uv_index"
    }
}

struct FireRisk: Codable {
    struct Current: Codable, Hashable {
        let level: String
        let css: String
        let angstromIndex: Double
        let temperature: Int
        let humidity: Int
        let windSpeed: Int
        let precipitation: Double
        let description: String
        let smokeFromWildfires: Double?

        enum CodingKeys: String, CodingKey {
            case level, css, temperature, humidity, precipitation, description
            case angstromIndex = "angstrom_index"
            case windSpeed = "wind_speed"
            case smokeFromWildfires = "smoke_from_wildfires"
        }
    }

    struct Day: Codable, Identifiable {
        let date: String
        let level: String
        let css: String
        let maxTemp: Int
        let maxWind: Int
        let precipitationSum: Double
        let humidity: Int

        enum CodingKeys: String, CodingKey {
            case date, level, css, humidity
            case maxTemp = "max_temp"
            case maxWind = "max_wind"
            case precipitationSum = "precipitation_sum"
        }

        var id: String { date }
    }

    let timestamp: String
    let location: GeoLocation
    let current: Current
    let forecast: [Day]
}
