import SwiftUI

struct DetailTile: View {
    let title: String
    let value: String
    let systemImage: String

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Label(title, systemImage: systemImage)
                .font(.caption)
                .foregroundStyle(.secondary)
                .labelStyle(.titleAndIcon)
            Text(value)
                .font(.headline)
                .foregroundStyle(.primary)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(.background.secondary, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
        .accessibilityElement(children: .combine)
    }
}

struct DetailGrid: View {
    let current: CurrentWeather

    private let columns = [
        GridItem(.flexible(), spacing: 12),
        GridItem(.flexible(), spacing: 12)
    ]

    private var tiles: [(String, String, String)] {
        let visibility = current.visibility.map { String(format: "%.1f km", $0 / 1000) } ?? "--"
        let gust = current.wind.gust.map { "\($0) km/h" } ?? "--"
        return [
            (String(localized: "Wind"), "\(current.wind.speed) km/h", "wind"),
            (String(localized: "Gusts"), gust, "wind.arrow.trianglehead.3.turn.right"),
            (String(localized: "Humidity"), "\(current.humidity)%", "humidity"),
            (String(localized: "Pressure"), "\(current.pressure) hPa", "gauge.with.dots.needle.67percent"),
            (String(localized: "Clouds"), "\(current.clouds)%", "cloud"),
            (String(localized: "Precipitation"), String(format: "%.1f mm", current.precipitation), "drop"),
            (String(localized: "Visibility"), visibility, "eye"),
            (String(localized: "Direction"), "\(current.wind.direction)°", "location.north.line")
        ]
    }

    var body: some View {
        LazyVGrid(columns: columns, spacing: 12) {
            ForEach(tiles, id: \.0) { tile in
                DetailTile(title: tile.0, value: tile.1, systemImage: tile.2)
            }
        }
    }
}
