import Foundation

enum WeatherCodes {
    /// WMO weather code to English description, matching the Open-Meteo code set.
    static func description(_ code: Int) -> String {
        switch code {
        case 0: return "Clear sky"
        case 1: return "Mainly clear"
        case 2: return "Partly cloudy"
        case 3: return "Overcast"
        case 45, 48: return "Fog"
        case 51, 53, 55: return "Drizzle"
        case 56, 57: return "Freezing drizzle"
        case 61: return "Light rain"
        case 63: return "Rain"
        case 65: return "Heavy rain"
        case 66, 67: return "Freezing rain"
        case 71: return "Light snow"
        case 73: return "Snow"
        case 75: return "Heavy snow"
        case 77: return "Snow grains"
        case 80: return "Rain showers"
        case 81: return "Heavy rain showers"
        case 82: return "Violent rain showers"
        case 85: return "Snow showers"
        case 86: return "Heavy snow showers"
        case 95: return "Thunderstorm"
        case 96, 99: return "Thunderstorm with hail"
        default: return "Unknown weather"
        }
    }

    /// WMO code to a two-digit icon key the `WeatherSymbol` mapper understands.
    static func icon(_ code: Int, isDay: Bool) -> String {
        let suffix = isDay ? "d" : "n"
        let key: String
        switch code {
        case 0: key = "01"
        case 1: key = "02"
        case 2: key = "03"
        case 3: key = "04"
        case 45, 48: key = "50"
        case 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82: key = "10"
        case 71, 73, 75, 77, 85, 86: key = "13"
        case 95, 96, 99: key = "11"
        default: key = "03"
        }
        return key + suffix
    }

    static func description(_ code: Int, isDay: Bool) -> WeatherDescription {
        let text = description(code)
        return WeatherDescription(main: text, description: text, icon: icon(code, isDay: isDay))
    }

    /// The backend treats hours 06:00 through 19:00 as daylight.
    static func isDayHour(_ timestamp: String) -> Bool {
        guard timestamp.count > 12 else { return true }
        let start = timestamp.index(timestamp.startIndex, offsetBy: 11)
        let end = timestamp.index(start, offsetBy: 2)
        guard let hour = Int(timestamp[start..<end]) else { return true }
        return (6..<20).contains(hour)
    }
}
