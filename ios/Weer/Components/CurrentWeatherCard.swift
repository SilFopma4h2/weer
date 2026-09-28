import SwiftUI

struct CurrentWeatherCard: View {
    let current: CurrentWeather

    var body: some View {
        Card {
            VStack(spacing: 16) {
                WeatherSymbolView(icon: current.weather.icon)
                    .frame(width: 88, height: 88)

                Text("\(current.temperature.current)°")
                    .font(.system(size: 76, weight: .light))
                    .contentTransition(.numericText())

                Text(current.weather.description)
                    .font(.title3)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)

                Text(String(localized: "Feels like") + " \(current.temperature.feelsLike)°")
                    .font(.subheadline)
                    .foregroundStyle(.tertiary)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 8)
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel(
            "\(current.temperature.current) degrees, \(current.weather.description), "
                + String(localized: "Feels like") + " \(current.temperature.feelsLike) degrees"
        )
    }
}
