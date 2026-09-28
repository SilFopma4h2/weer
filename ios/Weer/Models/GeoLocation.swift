import Foundation

struct GeoLocation: Codable, Hashable {
    let name: String
    let coords: String?
    let lat: Double
    let lon: Double
}

struct Place: Codable, Hashable, Identifiable {
    let name: String
    let lat: Double
    let lon: Double

    var id: String { name }
}

struct KnownLocations: Codable {
    struct ServerDefault: Codable {
        let name: String?
        let lat: Double
        let lon: Double
    }

    let `default`: ServerDefault
    let cities: [Place]
}

struct WeatherDescription: Codable, Hashable {
    let main: String
    let description: String
    let icon: String
}

struct CurrentWind: Codable, Hashable {
    let speed: Int
    let direction: Int
    let gust: Int?
}

struct Wind: Codable, Hashable {
    let speed: Int
    let direction: Int
}
