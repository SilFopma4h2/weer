import Foundation

enum APIError: LocalizedError, Equatable {
    case invalidURL
    case transport(String)
    case server(status: Int, detail: String)
    case decoding(String)

    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return String(localized: "The server address is not valid.")
        case .transport:
            return String(localized: "Could not reach the weather service. Check your connection and try again.")
        case let .server(status, detail):
            return String(localized: "Server error (\(status)): \(detail)")
        case .decoding:
            return String(localized: "The weather service returned data the app could not read.")
        }
    }
}

enum AppConfig {
    static let requestTimeout: TimeInterval = 15
}
