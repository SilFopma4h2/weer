import SwiftUI
import UIKit

struct LocationPickerView: View {
    @Bindable var model: WeatherViewModel
    var onDismiss: (() -> Void)? = nil

    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Button {
                        Task {
                            if await model.useDeviceLocation() { close() }
                        }
                    } label: {
                        HStack {
                            Label(String(localized: "Use my location"), systemImage: "location.fill")
                            Spacer()
                            if model.isLocating {
                                ProgressView()
                            }
                        }
                    }
                    .disabled(model.isLocating)
                }
                if let message = model.locationErrorMessage {
                    Section {
                        VStack(alignment: .leading, spacing: 10) {
                            HStack(alignment: .top, spacing: 10) {
                                Image(systemName: "location.slash")
                                    .foregroundStyle(Severity.moderate.foreground)
                                Text(message)
                                    .font(.footnote)
                                    .foregroundStyle(.secondary)
                            }
                            if model.locationNeedsSettings {
                                Button(String(localized: "Open Settings")) {
                                    if let url = URL(string: UIApplication.openSettingsURLString) {
                                        UIApplication.shared.open(url)
                                    }
                                }
                                .font(.footnote.weight(.semibold))
                            }
                        }
                        .padding(.vertical, 2)
                    }
                }
                Section {
                    if let defaultPlace = model.defaultPlace {
                        placeRow(defaultPlace)
                    }
                } header: {
                    Text(String(localized: "Default"))
                }
                Section {
                    ForEach(model.cities) { place in
                        placeRow(place)
                    }
                } header: {
                    Text(String(localized: "Cities"))
                }
            }
            .navigationTitle(String(localized: "Location"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel")) { close() }
                }
            }
            .task { await model.loadCities() }
        }
        .tint(Palette.brandStart)
    }

    private func placeRow(_ place: Place) -> some View {
        Button {
            Task {
                await model.select(place)
                close()
            }
        } label: {
            HStack {
                Text(place.name)
                Spacer()
                if model.selectedPlace == place {
                    Image(systemName: "checkmark")
                        .foregroundStyle(Palette.brandStart)
                }
            }
        }
    }

    private func close() {
        if let onDismiss {
            onDismiss()
        } else {
            dismiss()
        }
    }
}
