import SwiftUI

struct RootView: View {
    enum Tab: Hashable {
        case today, fishing, air, fire, radar
    }

    @State private var model = WeatherViewModel()
    @State private var selectedTab: Tab = .today

    var body: some View {
        TabView(selection: $selectedTab) {
            WeatherScaffold(
                title: model.locationTitle
            ) {
                todayContent
            }
            .tabItem { Label(String(localized: "Today"), systemImage: "sun.max") }
            .tag(Tab.today)

            WeatherScaffold(title: String(localized: "Fishing")) {
                ScreenScroll {
                    FishingView(now: model.fishingNow, forecast: model.fishingForecast)
                }
            }
            .tabItem { Label(String(localized: "Fishing"), systemImage: "fish") }
            .tag(Tab.fishing)

            WeatherScaffold(title: String(localized: "Air quality")) {
                ScreenScroll {
                    AirQualityView(airQuality: model.airQuality)
                }
            }
            .tabItem { Label(String(localized: "Air"), systemImage: "aqi.medium") }
            .tag(Tab.air)

            WeatherScaffold(title: String(localized: "Fire risk")) {
                ScreenScroll {
                    FireRiskView(fireRisk: model.fireRisk)
                }
            }
            .tabItem { Label(String(localized: "Fire"), systemImage: "flame") }
            .tag(Tab.fire)

            WeatherScaffold(title: String(localized: "Radar")) {
                RadarView(lat: coordinate.lat, lon: coordinate.lon)
                    .padding(16)
            }
            .tabItem { Label(String(localized: "Radar"), systemImage: "cloud.rain") }
            .tag(Tab.radar)
        }
        .tint(Palette.brandStart)
        .task {
            await model.load()
            await model.loadCities()
        }
        .environment(model)
    }

    private var coordinate: (lat: Double, lon: Double) {
        (model.selectedPlace?.lat ?? 52.3676, model.selectedPlace?.lon ?? 4.9041)
    }

    @ViewBuilder
    private var todayContent: some View {
        if model.isLoading && !model.hasContent {
            ProgressView().controlSize(.large).frame(maxWidth: .infinity, maxHeight: .infinity)
        } else if let message = model.errorMessage, !model.hasContent {
            ErrorStateView(message: message) { await model.retry() }
        } else {
            ScreenScroll {
                loadedContent
            }
        }
    }

    @ViewBuilder
    private var loadedContent: some View {
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
            SectionHeader(title: String(localized: "Details"), systemImage: "square.grid.2x2")
            WeatherDetailGrid(current: current)
        }
        if let forecast = model.forecast {
            if !forecast.forecast24h.isEmpty {
                SectionHeader(title: String(localized: "Next 24 hours"), systemImage: "clock")
                HourlyForecastStrip(items: forecast.forecast24h)
            }
            if !forecast.forecast7d.isEmpty {
                SectionHeader(title: String(localized: "7-day forecast"), systemImage: "calendar")
                DailyForecastList(items: forecast.forecast7d)
            }
        }
    }
}
