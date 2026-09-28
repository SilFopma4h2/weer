import SwiftUI

struct WeatherScaffold<Content: View>: View {
    let title: String
    let systemImage: String
    @ViewBuilder var content: Content

    @Environment(WeatherViewModel.self) private var model
    @State private var showingLocationPicker = false

    var body: some View {
        NavigationStack {
            content
                .navigationTitle(title)
                .navigationBarTitleDisplayMode(.inline)
                .toolbarBackground(Palette.surface, for: .navigationBar)
                .toolbar {
                    ToolbarItem(placement: .topBarLeading) {
                        Label(title, systemImage: systemImage)
                            .labelStyle(.titleAndIcon)
                            .font(.subheadline.weight(.semibold))
                            .foregroundStyle(Palette.brandStart)
                    }
                    ToolbarItem(placement: .topBarTrailing) {
                        Button {
                            showingLocationPicker = true
                        } label: {
                            Image(systemName: "location.circle.fill")
                                .symbolRenderingMode(.hierarchical)
                        }
                        .tint(Palette.brandStart)
                        .accessibilityLabel(String(localized: "Change location"))
                    }
                }
                .background(Palette.background)
        }
        .sheet(isPresented: $showingLocationPicker) {
            LocationPickerView(model: model) {
                showingLocationPicker = false
            }
        }
    }
}

struct ScreenScroll<Content: View>: View {
    @ViewBuilder var content: Content

    @Environment(WeatherViewModel.self) private var model

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                if let message = model.errorMessage, model.hasContent {
                    inlineError(message)
                }
                content
            }
            .padding(16)
        }
        .background(Palette.background)
        .refreshable { await model.refresh() }
    }

    private func inlineError(_ message: String) -> some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: "wifi.exclamationmark")
                .foregroundStyle(Severity.moderate.foreground)
            VStack(alignment: .leading, spacing: 2) {
                Text(String(localized: "Showing the last successful update"))
                    .font(.caption.weight(.semibold))
                Text(message)
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
            Spacer(minLength: 0)
            Button(String(localized: "Retry")) {
                Task { await model.retry() }
            }
            .font(.caption.weight(.semibold))
            .buttonStyle(.plain)
            .tint(Palette.brandStart)
        }
        .padding(12)
        .background(
            Severity.moderate.background,
            in: RoundedRectangle(cornerRadius: 16, style: .continuous)
        )
    }
}
