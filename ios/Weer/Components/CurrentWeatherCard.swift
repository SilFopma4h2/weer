import SwiftUI

struct CurrentWeatherCard: View {
    let current: CurrentWeather

    var body: some View {
        VStack(spacing: 18) {
            WeatherSymbolView(icon: current.weather.icon)
                .frame(width: 92, height: 92)

            Text("\(current.temperature.current)°")
                .font(.system(size: 78, weight: .light, design: .rounded))
                .foregroundStyle(.white)
                .contentTransition(.numericText())

            VStack(spacing: 4) {
                Text(current.weather.description.capitalized)
                    .font(.title3.weight(.medium))
                    .foregroundStyle(.white.opacity(0.95))
                    .multilineTextAlignment(.center)

                Text(String(localized: "Feels like") + " \(current.temperature.feelsLike)°")
                    .font(.subheadline)
                    .foregroundStyle(.white.opacity(0.75))
            }
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 28)
        .padding(.horizontal, 16)
        .background(
            Palette.brandGradient,
            in: RoundedRectangle(cornerRadius: 26, style: .continuous)
        )
        .shadow(color: Palette.brandStart.opacity(0.28), radius: 18, y: 10)
        .accessibilityElement(children: .combine)
        .accessibilityLabel(
            "\(current.temperature.current) degrees, \(current.weather.description), "
                + String(localized: "Feels like") + " \(current.temperature.feelsLike) degrees"
        )
    }
}

struct WeatherDetailGrid: View {
    let current: CurrentWeather

    var body: some View {
        StatGrid(items: [
            (String(localized: "Wind"), "\(current.wind.speed) km/h", "wind", Palette.wind),
            (
                String(localized: "Gusts"),
                current.wind.gust.map { "\($0) km/h" } ?? "--",
                "wind.arrow.trianglehead.3.turn.right",
                Palette.wind
            ),
            (String(localized: "Humidity"), "\(current.humidity)%", "humidity", Palette.humidity),
            (String(localized: "Pressure"), "\(current.pressure) hPa", "gauge.with.dots.needle.67percent", Palette.cloud),
            (String(localized: "Clouds"), "\(current.clouds)%", "cloud", Palette.cloud),
            (
                String(localized: "Precipitation"),
                String(format: "%.1f mm", current.precipitation),
                "drop",
                Palette.precipitation
            ),
            (
                String(localized: "Visibility"),
                current.visibility.map { String(format: "%.1f km", $0 / 1000) } ?? "--",
                "eye",
                Palette.brandEnd
            ),
            (String(localized: "Direction"), "\(current.wind.direction)°", "location.north.line", Palette.cloud)
        ])
    }
}
