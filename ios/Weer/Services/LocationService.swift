import CoreLocation
import Foundation

enum LocationError: LocalizedError {
    case denied
    case restricted
    case failed(String)

    var errorDescription: String? {
        switch self {
        case .denied:
            return String(localized: "Location access is off. Turn it on in Settings, or pick a city instead.")
        case .restricted:
            return String(localized: "Location services are not available on this device.")
        case let .failed(message):
            return String(localized: "Could not determine your location: \(message)")
        }
    }
}

@MainActor
final class LocationService: NSObject, CLLocationManagerDelegate {
    private let manager = CLLocationManager()
    private var pending: CheckedContinuation<CLLocationCoordinate2D, Error>?

    override init() {
        super.init()
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyKilometer
    }

    var authorizationStatus: CLAuthorizationStatus { manager.authorizationStatus }

    var canRequest: Bool {
        switch manager.authorizationStatus {
        case .notDetermined: true
        case .denied, .restricted: false
        default: true
        }
    }

    func requestCurrentCoordinate() async throws -> CLLocationCoordinate2D {
        if manager.authorizationStatus == .denied { throw LocationError.denied }
        if manager.authorizationStatus == .restricted { throw LocationError.restricted }

        if manager.authorizationStatus == .notDetermined {
            manager.requestWhenInUseAuthorization()
        }

        return try await withCheckedThrowingContinuation { continuation in
            pending = continuation
            manager.requestLocation()
        }
    }

    private func finish(_ result: Result<CLLocationCoordinate2D, Error>) {
        guard let continuation = pending else { return }
        pending = nil
        continuation.resume(with: result)
    }

    nonisolated func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let coordinate = locations.last?.coordinate else { return }
        Task { @MainActor [weak self] in self?.finish(.success(coordinate)) }
    }

    nonisolated func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        let resolved: Error
        if let clError = error as? CLError, clError.code == .denied {
            resolved = LocationError.denied
        } else {
            resolved = LocationError.failed(error.localizedDescription)
        }
        Task { @MainActor [weak self] in self?.finish(.failure(resolved)) }
    }

    nonisolated func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        let status = manager.authorizationStatus
        guard status == .denied || status == .restricted else { return }
        Task { @MainActor [weak self] in self?.finish(.failure(status == .denied ? LocationError.denied : LocationError.restricted)) }
    }
}
