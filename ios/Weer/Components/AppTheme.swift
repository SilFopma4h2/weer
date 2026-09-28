import SwiftUI

enum AppTheme {
    static let accentStart = Color(red: 116 / 255, green: 185 / 255, blue: 1.0)
    static let accentEnd = Color(red: 9 / 255, green: 132 / 255, blue: 227 / 255)
    static let gradient = LinearGradient(
        colors: [accentStart, accentEnd],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
}

struct SectionHeader: View {
    let title: String

    var body: some View {
        HStack(spacing: 8) {
            Text(title.uppercased())
                .font(.footnote.weight(.semibold))
                .foregroundStyle(.secondary)
            Rectangle()
                .fill(AppTheme.accentStart.opacity(0.35))
                .frame(height: 1)
        }
        .accessibilityAddTraits(.isHeader)
    }
}

struct Card<Content: View>: View {
    @ViewBuilder var content: Content

    var body: some View {
        content
            .padding(16)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(.background.secondary, in: RoundedRectangle(cornerRadius: 20, style: .continuous))
    }
}
