import Foundation

struct FishingFactor: Identifiable, Hashable {
    let id: String
    let title: String
    let value: String
    let status: String
    let score: Int
    let maxScore: Int
    let systemImage: String

    var fraction: Double { maxScore == 0 ? 0 : Double(score) / Double(maxScore) }
}

struct FishingConditions: Hashable {
    let score: Int
    let rating: String
    let summary: String
    let factors: [FishingFactor]

    var maxScore: Int { factors.reduce(0) { $0 + $1.maxScore } }

    var severity: String {
        switch score {
        case 80...: return "excellent"
        case 60..<80: return "good"
        case 40..<60: return "fair"
        default: return "poor"
        }
    }
}

enum FishingCalculator {
    private static func temperatureBand(_ value: Int) -> (score: Int, status: String) {
        switch value {
        case 15...25: return (25, String(localized: "Ideal for fishing"))
        case 10...14, 26...30: return (15, String(localized: "Good for fishing"))
        case 5...9, 31...35: return (10, String(localized: "Fair for fishing"))
        default: return (5, String(localized: "Difficult conditions"))
        }
    }

    private static func windBand(_ value: Int) -> (score: Int, status: String) {
        switch value {
        case 5...15: return (25, String(localized: "Perfect for fishing"))
        case 0...4, 16...25: return (15, String(localized: "Acceptable"))
        case 26...35: return (10, String(localized: "Too windy"))
        default: return (5, String(localized: "Very difficult"))
        }
    }

    private static func cloudBand(_ value: Int) -> (score: Int, status: String) {
        switch value {
        case 50...80: return (20, String(localized: "Ideally cloudy"))
        case 30...49, 81...95: return (15, String(localized: "Good"))
        case 0...29: return (10, String(localized: "Too sunny"))
        default: return (8, String(localized: "Too cloudy"))
        }
    }

    private static func rainBand(_ value: Double) -> (score: Int, status: String) {
        if value <= 0 { return (15, String(localized: "Dry weather")) }
        if value <= 2 { return (20, String(localized: "Light rain - good!")) }
        if value <= 5 { return (10, String(localized: "Moderate rain")) }
        return (5, String(localized: "Too much rain"))
    }

    private static func humidityBand(_ value: Int) -> (score: Int, status: String) {
        switch value {
        case 60...80: return (10, String(localized: "Ideally humid"))
        case 50...59, 81...90: return (8, String(localized: "Acceptable"))
        case 0...49: return (5, String(localized: "Too dry"))
        default: return (5, String(localized: "Too humid"))
        }
    }

    private static func rating(for score: Int) -> (rating: String, summary: String) {
        switch score {
        case 80...:
            return (String(localized: "Excellent"), String(localized: "Perfect weather to go fishing!"))
        case 60..<80:
            return (String(localized: "Good"), String(localized: "Good conditions for fishing."))
        case 40..<60:
            return (String(localized: "Fair"), String(localized: "Fair conditions. Still worth a try."))
        default:
            return (String(localized: "Poor"), String(localized: "Difficult conditions. Consider another day."))
        }
    }

    static func conditions(
        temperature: Int,
        windSpeed: Int,
        cloudCover: Int,
        precipitation: Double,
        humidity: Int
    ) -> FishingConditions {
        let temperatureResult = temperatureBand(temperature)
        let windResult = windBand(windSpeed)
        let cloudResult = cloudBand(cloudCover)
        let rainResult = rainBand(precipitation)
        let humidityResult = humidityBand(humidity)

        let rainText = precipitation > 0
            ? String(format: "%.1f mm", precipitation)
            : String(localized: "None")

        let factors = [
            FishingFactor(
                id: "temperature",
                title: String(localized: "Temperature"),
                value: "\(temperature)°C",
                status: temperatureResult.status,
                score: temperatureResult.score,
                maxScore: 25,
                systemImage: "thermometer.medium"
            ),
            FishingFactor(
                id: "wind",
                title: String(localized: "Wind"),
                value: "\(windSpeed) km/h",
                status: windResult.status,
                score: windResult.score,
                maxScore: 25,
                systemImage: "wind"
            ),
            FishingFactor(
                id: "clouds",
                title: String(localized: "Cloud cover"),
                value: "\(cloudCover)%",
                status: cloudResult.status,
                score: cloudResult.score,
                maxScore: 20,
                systemImage: "cloud"
            ),
            FishingFactor(
                id: "precipitation",
                title: String(localized: "Precipitation"),
                value: rainText,
                status: rainResult.status,
                score: rainResult.score,
                maxScore: 20,
                systemImage: "drop"
            ),
            FishingFactor(
                id: "humidity",
                title: String(localized: "Humidity"),
                value: "\(humidity)%",
                status: humidityResult.status,
                score: humidityResult.score,
                maxScore: 10,
                systemImage: "humidity"
            )
        ]

        let score = factors.reduce(0) { $0 + $1.score }
        let rating = rating(for: score)
        return FishingConditions(score: score, rating: rating.rating, summary: rating.summary, factors: factors)
    }
}
