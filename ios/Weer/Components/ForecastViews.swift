import SwiftUI

struct HourlyForecastStrip: View {
    let items: [HourlyForecast]

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 12) {
                ForEach(items) { item in
                    VStack(spacing: 10) {
                        Text(WeerDate.clockTime(item.datetime))
                            .font(.caption)
                            .foregroundStyle(.secondary)
                        WeatherSymbolView(icon: item.weather.icon)
                            .frame(width: 30, height: 30)
                        Text("\(item.temperature.temp)°")
                            .font(.headline)
                        if item.precipitationProbability > 0 {
                            Label("\(item.precipitationProbability)%", systemImage: "drop.fill")
                                .font(.caption2)
                                .foregroundStyle(.blue)
                        } else {
                            Text(" ")
                                .font(.caption2)
                        }
                    }
                    .frame(width: 62)
                    .padding(.vertical, 12)
                    .background(.background.secondary, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
                    .accessibilityElement(children: .combine)
                    .accessibilityLabel(
                        "\(WeerDate.clockTime(item.datetime)), \(item.temperature.temp) degrees, \(item.weather.description)"
                    )
                }
            }
            .padding(.horizontal, 2)
        }
    }
}

struct DailyForecastList: View {
    let items: [DailyForecast]

    var body: some View {
        Card {
            VStack(spacing: 0) {
                ForEach(Array(items.enumerated()), id: \.element.id) { index, item in
                    if index > 0 { Divider().padding(.vertical, 10) }
                    HStack(spacing: 12) {
                        Text(WeerDate.dayTitle(item.datetime))
                            .font(.subheadline.weight(.medium))
                            .frame(width: 78, alignment: .leading)
                        WeatherSymbolView(icon: item.weather.icon)
                            .frame(width: 26, height: 26)
                        Text("\(item.temperature.min)°")
                            .font(.subheadline)
                            .foregroundStyle(.tertiary)
                            .frame(width: 34, alignment: .trailing)
                        Text("\(item.temperature.max)°")
                            .font(.subheadline.weight(.semibold))
                            .frame(width: 34, alignment: .trailing)
                        Spacer(minLength: 4)
                        if item.precipitationProbability > 0 {
                            Label("\(item.precipitationProbability)%", systemImage: "drop.fill")
                                .font(.caption2)
                                .foregroundStyle(.blue)
                                .frame(width: 46, alignment: .trailing)
                        } else {
                            Color.clear.frame(width: 46, height: 1)
                        }
                    }
                    .accessibilityElement(children: .combine)
                    .accessibilityLabel(
                        "\(WeerDate.dayTitle(item.datetime)), \(item.weather.description), "
                            + String(localized: "High") + " \(item.temperature.max) degrees, "
                            + String(localized: "Low") + " \(item.temperature.min) degrees"
                    )
                }
            }
        }
    }
}
