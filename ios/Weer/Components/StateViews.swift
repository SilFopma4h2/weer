import SwiftUI

struct AlertsBanner: View {
    let alerts: [WeatherAlert]

    var body: some View {
        VStack(spacing: 10) {
            ForEach(alerts) { alert in
                HStack(alignment: .top, spacing: 12) {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .foregroundStyle(.orange)
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
                .background(.orange.opacity(0.12), in: RoundedRectangle(cornerRadius: 16, style: .continuous))
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
            .tint(AppTheme.accentEnd)
        }
    }
}
