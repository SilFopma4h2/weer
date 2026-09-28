import SwiftUI

struct AirQualityView: View {
    let airQuality: AirQuality?

    var body: some View {
        Group {
            if let airQuality {
                content(airQuality)
            } else {
                UnavailableCard(title: String(localized: "The air quality service did not respond."))
            }
        }
    }

    private func content(_ data: AirQuality) -> some View {
        VStack(alignment: .leading, spacing: 20) {
            GaugeCard(
                caption: String(localized: "Air quality index"),
                value: "\(data.aqi.value)",
                headline: severityLabel(data.aqi.css),
                detail: scaleLabel(data.aqi.scale),
                severity: Severity(token: data.aqi.css),
                systemImage: "aqi.medium"
            )

            if let uv = data.uvIndex {
                StatGrid(items: [
                    (String(localized: "UV index"), String(format: "%.1f", uv), "sun.max", Severity.moderate.foreground)
                ])
            }

            if let smoke = data.pm10Wildfires, smoke > 0 {
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

            SectionHeader(title: String(localized: "Pollutants"), systemImage: "list.bullet")
            Card(padding: 14) {
                VStack(spacing: 0) {
                    ForEach(Array(pollutants(data).enumerated()), id: \.offset) { index, item in
                        if index > 0 { Divider().padding(.vertical, 10) }
                        HStack {
                            Text(item.name)
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

            if let coords = data.location.coords {
                Text(coords)
                    .font(.caption2)
                    .foregroundStyle(.tertiary)
                    .frame(maxWidth: .infinity, alignment: .center)
            }
        }
    }

    private func pollutants(_ data: AirQuality) -> [(name: String, value: String)] {
        let values: [(String, Double?)] = [
            (String(localized: "PM2.5"), data.pollutants.pm25),
            ("PM10", data.pollutants.pm10),
            (String(localized: "Ozone"), data.pollutants.ozone),
            (String(localized: "Nitrogen dioxide"), data.pollutants.nitrogenDioxide),
            (String(localized: "Sulphur dioxide"), data.pollutants.sulphurDioxide),
            (String(localized: "Carbon monoxide"), data.pollutants.carbonMonoxide)
        ]
        return values.map { name, value in
            (name, value.map { String(format: "%.1f μg/m³", $0) } ?? "--")
        }
    }

    private func severityLabel(_ css: String) -> String {
        switch Severity(token: css) {
        case .good: return String(localized: "Good")
        case .moderate: return String(localized: "Moderate")
        case .elevated: return String(localized: "Unhealthy for sensitive groups")
        case .unhealthy: return String(localized: "Unhealthy")
        default: return String(localized: "Hazardous")
        }
    }

    private func scaleLabel(_ scale: String) -> String {
        scale == "us" ? String(localized: "US AQI scale") : String(localized: "European AQI scale")
    }
}
