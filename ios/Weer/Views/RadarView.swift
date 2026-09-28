import SwiftUI
import WebKit

struct RadarView: View {
    let lat: Double
    let lon: Double

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Card(padding: 12) {
                VStack(alignment: .leading, spacing: 6) {
                    Label(String(localized: "Rain radar"), systemImage: "cloud.rain")
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(Palette.brandStart)
                    Text(String(localized: "Live radar provided by Windy.com"))
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }

            RadarWebView(url: Self.embedURL(lat: lat, lon: lon))
                .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: 20, style: .continuous)
                        .strokeBorder(Palette.hairline.opacity(0.08), lineWidth: 1)
                )
        }
    }

    static func embedURL(lat: Double, lon: Double) -> URL? {
        var components = URLComponents(string: "https://embed.windy.com/embed2.html")
        components?.queryItems = [
            URLQueryItem(name: "lat", value: String(format: "%.3f", lat)),
            URLQueryItem(name: "lon", value: String(format: "%.3f", lon)),
            URLQueryItem(name: "detailLat", value: String(format: "%.3f", lat)),
            URLQueryItem(name: "detailLon", value: String(format: "%.3f", lon)),
            URLQueryItem(name: "zoom", value: "7"),
            URLQueryItem(name: "level", value: "surface"),
            URLQueryItem(name: "overlay", value: "rain"),
            URLQueryItem(name: "product", value: "ecmwf"),
            URLQueryItem(name: "menu", value: ""),
            URLQueryItem(name: "message", value: ""),
            URLQueryItem(name: "marker", value: ""),
            URLQueryItem(name: "calendar", value: "now"),
            URLQueryItem(name: "pressure", value: ""),
            URLQueryItem(name: "type", value: "map"),
            URLQueryItem(name: "location", value: "coordinates"),
            URLQueryItem(name: "detail", value: ""),
            URLQueryItem(name: "metricWind", value: "km%2Fh"),
            URLQueryItem(name: "metricTemp", value: "%C2%B0C"),
            URLQueryItem(name: "radarRange", value: "-1")
        ]
        return components?.url
    }
}

struct RadarWebView: UIViewRepresentable {
    let url: URL?

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.backgroundColor = .clear
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        guard let url, webView.url != url else { return }
        webView.load(URLRequest(url: url))
    }
}
