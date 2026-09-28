import Foundation

struct AlertsResponse: Codable {
    let timestamp: String
    let alerts: [WeatherAlert]
}

struct WeatherAlert: Codable, Identifiable, Hashable {
    let severity: String
    let title: String
    let description: String
    let time: String

    var id: String { "\(title)-\(time)" }
}
