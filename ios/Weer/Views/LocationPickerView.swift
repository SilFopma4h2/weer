import SwiftUI

struct LocationPickerView: View {
    @Bindable var model: WeatherViewModel
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Button {
                        Task { await model.useDeviceLocation() }
                        dismiss()
                    } label: {
                        Label(String(localized: "Use my location"), systemImage: "location.fill")
                    }
                    .disabled(model.isLocating)
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
                    Button(String(localized: "Cancel")) { dismiss() }
                }
            }
            .task { await model.loadCities() }
        }
    }

    private func placeRow(_ place: Place) -> some View {
        Button {
            Task { await model.select(place) }
            dismiss()
        } label: {
            HStack {
                Text(place.name)
                Spacer()
                if model.selectedPlace == place {
                    Image(systemName: "checkmark")
                        .foregroundStyle(AppTheme.accentEnd)
                }
            }
        }
    }
}
