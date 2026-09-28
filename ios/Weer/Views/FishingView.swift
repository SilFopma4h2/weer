import SwiftUI

struct FishingView: View {
    let now: FishingConditions?
    let forecast: [(day: DailyForecast, conditions: FishingConditions)]

    var body: some View {
        Group {
            if let now {
                content(now)
            } else {
                UnavailableCard(title: String(localized: "No fishing data available."))
            }
        }
    }

    private func content(_ conditions: FishingConditions) -> some View {
        VStack(alignment: .leading, spacing: 20) {
            GaugeCard(
                caption: String(localized: "Fishing score"),
                value: "\(conditions.score)",
                headline: conditions.rating,
                detail: conditions.summary,
                severity: Severity(token: conditions.severity),
                systemImage: "fish"
            )

            SectionHeader(title: String(localized: "Factors"), systemImage: "list.bullet")
            Card(padding: 16) {
                VStack(spacing: 0) {
                    ForEach(Array(conditions.factors.enumerated()), id: \.element.id) { index, factor in
                        if index > 0 { Divider().padding(.vertical, 4) }
                        ScoreFactorRow(
                            title: factor.title,
                            value: factor.value,
                            status: factor.status,
                            fraction: factor.fraction,
                            systemImage: factor.systemImage
                        )
                    }
                }
            }

            if !forecast.isEmpty {
                SectionHeader(title: String(localized: "Next 7 days"), systemImage: "calendar")
                Card(padding: 14) {
                    VStack(spacing: 0) {
                        ForEach(Array(forecast.enumerated()), id: \.element.day.id) { index, entry in
                            if index > 0 { Divider().padding(.vertical, 10) }
                            HStack(spacing: 12) {
                                Circle()
                                    .fill(Severity(token: entry.conditions.severity).foreground)
                                    .frame(width: 10, height: 10)
                                Text(WeerDate.dayColumn(entry.day.datetime))
                                    .font(.subheadline.weight(.medium))
                                    .lineLimit(1)
                                    .frame(width: 72, alignment: .leading)
                                Text(entry.conditions.rating)
                                    .font(.caption.weight(.semibold))
                                    .foregroundStyle(Severity(token: entry.conditions.severity).foreground)
                                Spacer(minLength: 4)
                                Text("\(entry.day.temperature.max)°")
                                    .font(.subheadline.weight(.semibold))
                                    .foregroundStyle(Palette.temperature)
                                Text("\(entry.conditions.score)")
                                    .font(.caption.weight(.semibold))
                                    .foregroundStyle(Palette.brandStart)
                                    .monospacedDigit()
                                    .frame(width: 26, alignment: .trailing)
                            }
                            .accessibilityElement(children: .combine)
                            .accessibilityLabel(
                                "\(WeerDate.dayTitle(entry.day.datetime)), \(entry.conditions.rating), "
                                    + String(localized: "score") + " \(entry.conditions.score)"
                            )
                        }
                    }
                }
            }
        }
    }
}
