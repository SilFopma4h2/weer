import CoreLocation
import Foundation

@MainActor
@Observable
final class WeatherViewModel {
    private let service: WeatherService
    private let locationService: LocationService

    private(set) var current: CurrentWeather?
    private(set) var forecast: ForecastResponse?
    private(set) var alerts: [WeatherAlert] = []
    private(set) var airQuality: AirQuality?
    private(set) var fireRisk: FireRisk?
    private(set) var updatedStamp: String?
    private(set) var isLoading = false
    private(set) var isLocating = false
    private(set) var errorMessage: String?
    private(set) var cities: [Place] = []
    private(set) var defaultPlace: Place?

    private(set) var selectedPlace: Place?

    init(service: WeatherService? = nil, locationService: LocationService? = nil) {
        self.service = service ?? WeatherService()
        self.locationService = locationService ?? LocationService()
    }

    var locationTitle: String {
        selectedPlace?.name ?? current?.location.name ?? String(localized: "Weather")
    }

    var hasContent: Bool { current != nil }

    var fishingNow: FishingConditions? {
        guard let current else { return nil }
        return FishingCalculator.conditions(
            temperature: current.temperature.current,
            windSpeed: current.wind.speed,
            cloudCover: current.clouds,
            precipitation: current.precipitation,
            humidity: current.humidity
        )
    }

    var fishingForecast: [(day: DailyForecast, conditions: FishingConditions)] {
        guard let forecast else { return [] }
        return forecast.forecast7d.map { day in
            (
                day,
                FishingCalculator.conditions(
                    temperature: day.temperature.max,
                    windSpeed: day.wind.speed,
                    cloudCover: WeatherSymbol.cloudCoverEstimate(for: day.weather.icon),
                    precipitation: day.rain,
                    humidity: 65
                )
            )
        }
    }

    func load() async {
        await fetch(showSpinner: current == nil)
    }

    func refresh() async {
        await fetch(showSpinner: false)
    }

    func retry() async {
        errorMessage = nil
        await fetch(showSpinner: current == nil)
    }

    func select(_ place: Place?) async {
        selectedPlace = place
        await fetch(showSpinner: true)
    }

    func useDeviceLocation() async {
        isLocating = true
        defer { isLocating = false }
        do {
            let coordinate = try await locationService.requestCurrentCoordinate()
            selectedPlace = Place(
                name: String(localized: "My location"),
                lat: coordinate.latitude,
                lon: coordinate.longitude
            )
            await fetch(showSpinner: true)
        } catch {
            errorMessage = (error as? LocalizedError)?.errorDescription ?? error.localizedDescription
        }
    }

    func loadCities() async {
        if !cities.isEmpty { return }
        do {
            let known = try await service.knownLocations()
            cities = known.cities
            defaultPlace = Place(
                name: known.default.name ?? String(localized: "Server default"),
                lat: known.default.lat,
                lon: known.default.lon
            )
        } catch {
            cities = []
        }
    }

    private func fetch(showSpinner: Bool) async {
        if showSpinner { isLoading = true }
        errorMessage = nil
        do {
            let data = try await service.dashboard(
                lat: selectedPlace?.lat,
                lon: selectedPlace?.lon
            )
            current = data.current
            forecast = data.forecast
            alerts = data.alerts.alerts
            airQuality = data.airQuality
            fireRisk = data.fireRisk
            updatedStamp = WeerDate.updatedStamp(data.current.timestamp)
            selectedPlace = Place(
                name: data.current.location.name,
                lat: data.current.location.lat,
                lon: data.current.location.lon
            )
        } catch is CancellationError {
            return
        } catch {
            errorMessage = (error as? LocalizedError)?.errorDescription ?? error.localizedDescription
        }
        if showSpinner { isLoading = false }
    }
}
