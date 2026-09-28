import SwiftUI

struct FireRiskView: View {
    let fireRisk: FireRisk?

    var body: some View {
        Group {
            if let fireRisk {
                content(fireRisk)
            } else {
                UnavailableCard(title: String(localized: "The fire risk service did not respond."))
            }
        }
    }

    private func content(_ data: FireRisk) -> some View {
        VStack(alignment: .leading, spacing: 20) {
            GaugeCard(
                caption: String(localized: "Fire risk"),
                value: FireLevel.label(token: data.current.css),
                headline: String(format: String(localized: "Angström index %.2f"), data.current.angstromIndex),
                detail: FireLevel.detail(token: data.current.css),
                severity: Severity(token: data.current.css),
                systemImage: "flame"
            )

            if let smoke = data.current.smokeFromWildfires, smoke > 0 {
                HStack(alignment: .top, spacing: 12) {
                    Image(systemName: "smoke.fill")
                        .foregroundStyle(Severity.elevated.foreground)
                    VStack(alignment: .leading, spacing: 2) {
                        Text(String(localized: "Wildfire smoke"))
                            .font(.subheadline.weight(.semibold))
                        Text(String(format: "%.1f μg/m³", smoke))
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    Spacer(minLength: 0)
                }
                .padding(14)
                .background(
                    Severity.elevated.background,
                    in: RoundedRectangle(cornerRadius: 18, style: .continuous)
                )
            }

            SectionHeader(title: String(localized: "Current factors"), systemImage: "list.bullet")
            Card(padding: 14) {
                VStack(spacing: 0) {
                    ForEach(Array(factors(data.current).enumerated()), id: \.offset) { index, item in
                        if index > 0 { Divider().padding(.vertical, 10) }
                        HStack {
                            Label(item.name, systemImage: item.image)
                                .font(.subheadline)
                            Spacer(minLength: 12)
                            Text(item.value)
                                .font(.subheadline.weight(.semibold))
                                .foregroundStyle(Palette.brandStart)
                                .monospacedDigit()
                        }
                    }
                }
            }

            SectionHeader(title: String(localized: "Next 7 days"), systemImage: "calendar")
            Card(padding: 14) {
                VStack(spacing: 0) {
                    ForEach(Array(data.forecast.enumerated()), id: \.element.id) { index, day in
                        if index > 0 { Divider().padding(.vertical, 10) }
                        HStack(spacing: 12) {
                            Circle()
                                .fill(Severity(token: day.css).foreground)
                                .frame(width: 10, height: 10)
                            Text(WeerDate.dayColumn(day.date))
                                .font(.subheadline.weight(.medium))
                                .lineLimit(1)
                                .frame(width: 72, alignment: .leading)
                            Text(FireLevel.label(token: day.css))
                                .font(.caption.weight(.semibold))
                                .foregroundStyle(Severity(token: day.css).foreground)
                                .lineLimit(1)
                            Spacer(minLength: 4)
                            Text("\(day.maxTemp)°")
                                .font(.subheadline.weight(.semibold))
                                .foregroundStyle(Palette.temperature)
                            Text("\(day.maxWind) km/h")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                                .frame(width: 62, alignment: .trailing)
                        }
                        .accessibilityElement(children: .combine)
                        .accessibilityLabel(
                            "\(WeerDate.dayTitle(day.date)), \(day.level), "
                                + String(localized: "High") + " \(day.maxTemp) degrees, "
                                + String(localized: "Wind") + " \(day.maxWind) km/h"
                        )
                    }
                }
            }
        }
    }

    private func factors(_ current: FireRisk.Current) -> [(name: String, value: String, image: String)] {
        [
            (
                String(localized: "Temperature"),
                "\(current.temperature)°C",
                "thermometer.medium"
            ),
            (String(localized: "Humidity"), "\(current.humidity)%", "humidity"),
            (String(localized: "Wind"), "\(current.windSpeed) km/h", "wind"),
            (
                String(localized: "Precipitation"),
                String(format: "%.1f mm", current.precipitation),
                "drop"
            )
        ]
    }
}
