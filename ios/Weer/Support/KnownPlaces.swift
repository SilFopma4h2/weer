import Foundation

/// The built-in city list, mirroring the backend's `MAJOR_CITIES` so the app can
/// offer a picker without calling the server.
enum KnownPlaces {
    static let defaultPlace = Place(name: "Amsterdam", lat: 52.3676, lon: 4.9041)

    static let cities: [Place] = [
        Place(name: "Amsterdam", lat: 52.3676, lon: 4.9041),
        Place(name: "Utrecht", lat: 52.0907, lon: 5.1214),
        Place(name: "Rotterdam", lat: 51.9225, lon: 4.4792),
        Place(name: "Den Haag", lat: 52.1601, lon: 4.497),
        Place(name: "Eindhoven", lat: 51.4416, lon: 5.4697),
        Place(name: "Oosterbeek", lat: 51.9814, lon: 5.5336),
        Place(name: "London", lat: 51.5074, lon: -0.1278),
        Place(name: "Paris", lat: 48.8566, lon: 2.3522),
        Place(name: "Berlin", lat: 52.52, lon: 13.405),
        Place(name: "Rome", lat: 41.9028, lon: 12.4964),
        Place(name: "Madrid", lat: 40.4168, lon: -3.7038),
        Place(name: "Vienna", lat: 48.2082, lon: 16.3738),
        Place(name: "Munich", lat: 48.1351, lon: 11.582),
        Place(name: "Hamburg", lat: 53.5511, lon: 9.9937),
        Place(name: "Frankfurt", lat: 50.1109, lon: 8.6821),
        Place(name: "Brussels", lat: 50.8503, lon: 4.3517)
    ]

    /// Nearest known city for a coordinate, or nil when the user is somewhere else.
    static func match(lat: Double, lon: Double) -> Place? {
        let threshold = 0.02
        return cities.first { abs($0.lat - lat) < threshold && abs($0.lon - lon) < threshold }
    }
}
