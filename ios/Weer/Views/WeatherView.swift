import SwiftUI

struct WeatherView: View {
    @State private var model = WeatherViewModel()
    @State private var showingLocationPicker = false

    var body: some View {
        NavigationStack {
            Group {
                if model.isLoading && !model.hasContent {
                    ProgressView().controlSize(.large)
                } else if let message = model.errorMessage, !model.hasContent {
                    ErrorStateView(message: message) { await model.retry() }
                } else {
                    content
                }
            }
            .navigationTitle(model.locationTitle)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showingLocationPicker = true
                    } label: {
                        Image(systemName: "location.circle")
                    }
                    .accessibilityLabel(String(localized: "Change location"))
                }
            }
            .refreshable { await model.refresh() }
            .task {
                await model.load()
                await model.loadCities()
            }
            .sheet(isPresented: $showingLocationPicker) {
                LocationPickerView(model: model)
            }
        }
    }

    @ViewBuilder
    private var content: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 20) {
                if let message = model.errorMessage {
                    ErrorStateView(message: message) { await model.retry() }
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 8)
                }
                if let current = model.current {
                    if !model.alerts.isEmpty {
                        AlertsBanner(alerts: model.alerts)
                    }
                    CurrentWeatherCard(current: current)
                    if let coords = current.location.coords {
                        Text(coords)
                            .font(.caption2)
                            .foregroundStyle(.tertiary)
                            .frame(maxWidth: .infinity, alignment: .center)
                    }
                    if let updated = model.updatedStamp {
                        Text(updated)
                            .font(.caption)
                            .foregroundStyle(.tertiary)
                            .frame(maxWidth: .infinity)
                    }
                    SectionHeader(title: String(localized: "Details"))
                    DetailGrid(current: current)
                }
                if let forecast = model.forecast {
                    if !forecast.forecast24h.isEmpty {
                        SectionHeader(title: String(localized: "Next 24 hours"))
                        HourlyForecastStrip(items: forecast.forecast24h)
                    }
                    if !forecast.forecast7d.isEmpty {
                        SectionHeader(title: String(localized: "7-day forecast"))
                        DailyForecastList(items: forecast.forecast7d)
                    }
                }
            }
            .padding(16)
        }
        .background(AppTheme.gradient.opacity(0.06).ignoresSafeArea())
    }
}
