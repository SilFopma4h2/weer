import Foundation

enum AppConfig {
    static let infoPlistKey = "WEER_API_BASE_URL"

    static var baseURL: URL {
        let configured = Bundle.main.object(forInfoDictionaryKey: infoPlistKey) as? String
        let raw = configured?.trimmingCharacters(in: .whitespacesAndNewlines)
        if let raw, !raw.isEmpty, let url = URL(string: raw) {
            return url
        }
        return URL(string: "http://localhost:8000")!
    }

    static var language: String {
        let code = Locale.current.language.languageCode?.identifier ?? "nl"
        return Self.supportedLanguages.contains(code) ? code : "nl"
    }

    static let supportedLanguages = ["nl", "en", "de", "it", "fr"]

    static let requestTimeout: TimeInterval = 15
}
