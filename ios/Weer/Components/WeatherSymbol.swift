import SwiftUI

enum WeatherSymbol {
    static func name(for icon: String, isDay: Bool = true) -> String {
        let night = !isDay
        let code = String(icon.prefix(2))
        switch code {
        case "01": return night ? "moon.stars.fill" : "sun.max.fill"
        case "02": return night ? "cloud.moon.fill" : "cloud.sun.fill"
        case "03": return "cloud.fill"
        case "09": return "cloud.sun.rain.fill"
        case "10": return "cloud.rain.fill"
        case "11": return "cloud.bolt.rain.fill"
        case "13": return "cloud.snow.fill"
        case "50": return "cloud.fog.fill"
        default: return "cloud.fill"
        }
    }

    static func isNight(_ icon: String) -> Bool { icon.hasSuffix("n") }

    static func cloudCoverEstimate(for icon: String) -> Int {
        switch String(icon.prefix(2)) {
        case "01": return 5
        case "02": return 45
        case "03": return 85
        case "50": return 95
        case "10": return 80
        case "13": return 90
        case "09": return 75
        case "11": return 80
        default: return 45
        }
    }
}

struct WeatherSymbolView: View {
    let icon: String

    private var symbol: String { WeatherSymbol.name(for: icon) }

    var body: some View {
        Image(systemName: symbol)
            .symbolRenderingMode(.multicolor)
            .resizable()
            .scaledToFit()
            .accessibilityHidden(true)
    }
}
