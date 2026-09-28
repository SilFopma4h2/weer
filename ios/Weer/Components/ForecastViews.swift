import SwiftUI

struct HourlyForecastStrip: View {
    let items: [HourlyForecast]

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 10) {
                ForEach(items) { item in
                    VStack(spacing: 10) {
                        Text(WeerDate.clockTime(item.datetime))
                            .font(.caption.weight(.medium))
                            .foregroundStyle(.secondary)
                        WeatherSymbolView(icon: item.weather.icon)
                            .frame(width: 30, height: 30)
                        Text("\(item.temperature.temp)°")
                            .font(.headline)
                            .foregroundStyle(Palette.temperature)
                        if item.precipitationProbability > 0 {
                            Label("\(item.precipitationProbability)%", systemImage: "drop.fill")
                                .font(.caption2)
                                .foregroundStyle(Palette.precipitation)
                        } else {
                            Color.clear.frame(height: 11)
                        }
                    }
                    .frame(width: 64)
                    .padding(.vertical, 14)
                    .background(Palette.surface, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
                    .accessibilityElement(children: .combine)
                    .accessibilityLabel(
                        "\(WeerDate.clockTime(item.datetime)), \(item.temperature.temp) degrees, \(item.weather.description)"
                    )
                }
            }
            .padding(.vertical, 2)
        }
    }
}

struct DailyForecastList: View {
    let items: [DailyForecast]

    var body: some View {
        Card(padding: 14) {
            VStack(spacing: 0) {
                ForEach(Array(items.enumerated()), id: \.element.id) { index, item in
                    if index > 0 {
                        Divider().padding(.vertical, 10)
                    }
                    HStack(spacing: 12) {
                        Text(WeerDate.dayColumn(item.datetime))
                            .font(.subheadline.weight(.medium))
                            .lineLimit(1)
                            .frame(width: 78, alignment: .leading)
                        WeatherSymbolView(icon: item.weather.icon)
                            .frame(width: 26, height: 26)
                        Text("\(item.temperature.min)°")
                            .font(.subheadline)
                            .foregroundStyle(.tertiary)
                            .frame(width: 32, alignment: .trailing)
                        Text("\(item.temperature.max)°")
                            .font(.subheadline.weight(.semibold))
                            .foregroundStyle(Palette.temperature)
                            .frame(width: 32, alignment: .trailing)
                        Spacer(minLength: 4)
                        if item.precipitationProbability > 0 {
                            Label("\(item.precipitationProbability)%", systemImage: "drop.fill")
                                .font(.caption2)
                                .foregroundStyle(Palette.precipitation)
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

struct AlertsBanner: View {
    let alerts: [WeatherAlert]

    var body: some View {
        VStack(spacing: 10) {
            ForEach(alerts) { alert in
                HStack(alignment: .top, spacing: 12) {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .foregroundStyle(Palette.alert)
                    VStack(alignment: .leading, spacing: 2) {
                        Text(alert.title)
                            .font(.subheadline.weight(.semibold))
                        Text(alert.description)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    Spacer(minLength: 0)
                }
                .padding(14)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(
                    Severity.unhealthy.background,
                    in: RoundedRectangle(cornerRadius: 18, style: .continuous)
                )
            }
        }
    }
}

struct ErrorStateView: View {
    let message: String
    let onRetry: () async -> Void

    var body: some View {
        ContentUnavailableView {
            Label(String(localized: "Weather unavailable"), systemImage: "cloud.slash")
        } description: {
            Text(message)
        } actions: {
            Button(String(localized: "Try again")) {
                Task { await onRetry() }
            }
            .buttonStyle(.borderedProminent)
        }
    }
}

struct UnavailableCard: View {
    let title: String

    var body: some View {
        Card {
            VStack(alignment: .leading, spacing: 8) {
                Label(String(localized: "Not available right now"), systemImage: "exclamationmark.circle")
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(Severity.moderate.foreground)
                Text(title)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
    }
}
