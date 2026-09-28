import CoreLocation
import Foundation

@MainActor
@Observable
final class WeatherViewModel {
    private let service: OpenMeteoService
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
    private(set) var cities: [Place] = KnownPlaces.cities
    private(set) var defaultPlace: Place? = KnownPlaces.defaultPlace

    private(set) var selectedPlace: Place? = KnownPlaces.defaultPlace

    init(service: OpenMeteoService? = nil, locationService: LocationService? = nil) {
        self.service = service ?? OpenMeteoService()
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
            let name = await service.placeName(lat: coordinate.latitude, lon: coordinate.longitude)
            let place = Place(name: name, lat: coordinate.latitude, lon: coordinate.longitude)
            selectedPlace = place
            await fetch(showSpinner: true)
        } catch {
            errorMessage = (error as? LocalizedError)?.errorDescription ?? error.localizedDescription
        }
    }

    func loadCities() async {
        cities = KnownPlaces.cities
        defaultPlace = KnownPlaces.defaultPlace
    }

    private func fetch(showSpinner: Bool) async {
        if showSpinner { isLoading = true }
        errorMessage = nil
        let place = selectedPlace ?? KnownPlaces.defaultPlace
        do {
            let data = try await service.dashboard(lat: place.lat, lon: place.lon)
            current = data.current
            forecast = data.forecast
            alerts = data.alerts
            airQuality = data.airQuality
            fireRisk = data.fireRisk
            updatedStamp = WeerDate.updatedStamp(data.current.timestamp)
        } catch is CancellationError {
            return
        } catch {
            errorMessage = (error as? LocalizedError)?.errorDescription ?? error.localizedDescription
        }
        if showSpinner { isLoading = false }
    }
}
