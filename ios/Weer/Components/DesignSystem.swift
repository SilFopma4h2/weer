import SwiftUI

struct Card<Content: View>: View {
    var padding: CGFloat = 16
    @ViewBuilder var content: Content

    var body: some View {
        content
            .padding(padding)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Palette.surface, in: RoundedRectangle(cornerRadius: 20, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 20, style: .continuous)
                    .strokeBorder(Palette.hairline.opacity(0.06), lineWidth: 1)
            )
    }
}

struct SectionHeader: View {
    let title: String
    var systemImage: String?

    var body: some View {
        HStack(spacing: 8) {
            if let systemImage {
                Image(systemName: systemImage)
                    .font(.footnote.weight(.semibold))
                    .foregroundStyle(Palette.brandEnd)
            }
            Text(title.uppercased())
                .font(.footnote.weight(.semibold))
                .foregroundStyle(.secondary)
            Rectangle()
                .fill(Palette.brandEnd.opacity(0.35))
                .frame(height: 1)
        }
        .accessibilityAddTraits(.isHeader)
    }
}

struct StatTile: View {
    let title: String
    let value: String
    let systemImage: String
    var tint: Color = Palette.brandEnd

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Label(title, systemImage: systemImage)
                .font(.caption)
                .foregroundStyle(.secondary)
                .labelStyle(.titleAndIcon)
            Text(value)
                .font(.headline)
                .foregroundStyle(tint)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(Palette.surface, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .strokeBorder(Palette.hairline.opacity(0.06), lineWidth: 1)
        )
        .accessibilityElement(children: .combine)
    }
}

struct StatGrid: View {
    let items: [(title: String, value: String, image: String, tint: Color)]

    private let columns = [
        GridItem(.flexible(), spacing: 12),
        GridItem(.flexible(), spacing: 12)
    ]

    var body: some View {
        LazyVGrid(columns: columns, spacing: 12) {
            ForEach(Array(items.enumerated()), id: \.offset) { _, item in
                StatTile(title: item.title, value: item.value, systemImage: item.image, tint: item.tint)
            }
        }
    }
}

struct GaugeCard: View {
    let caption: String
    let value: String
    let headline: String
    let detail: String?
    let severity: Severity
    var systemImage: String?

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 8) {
                if let systemImage {
                    Image(systemName: systemImage)
                        .font(.subheadline.weight(.semibold))
                }
                Text(caption.uppercased())
                    .font(.caption.weight(.semibold))
                    .tracking(0.6)
            }
            .foregroundStyle(severity.foreground)

            Text(value)
                .font(.system(size: 52, weight: .semibold, design: .rounded))
                .contentTransition(.numericText())

            Text(headline)
                .font(.title3.weight(.semibold))
                .foregroundStyle(severity.foreground)

            if let detail {
                Text(detail)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(18)
        .background(severity.background, in: RoundedRectangle(cornerRadius: 22, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 22, style: .continuous)
                .strokeBorder(severity.foreground.opacity(0.22), lineWidth: 1)
        )
        .accessibilityElement(children: .combine)
    }
}

struct ScoreFactorRow: View {
    let title: String
    let value: String
    let status: String
    let fraction: Double
    let systemImage: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(spacing: 10) {
                Image(systemName: systemImage)
                    .font(.subheadline)
                    .foregroundStyle(Palette.brandEnd)
                    .frame(width: 22)
                Text(title)
                    .font(.subheadline.weight(.medium))
                Spacer(minLength: 8)
                Text(value)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                Text(status)
                    .font(.caption.weight(.medium))
                    .foregroundStyle(Palette.brandStart)
                    .multilineTextAlignment(.trailing)
            }
            ProgressView(value: fraction)
                .tint(Palette.brandGradient)
        }
        .padding(.vertical, 6)
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\(title), \(value), \(status)")
    }
}
