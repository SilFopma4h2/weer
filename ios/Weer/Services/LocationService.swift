import CoreLocation
import Foundation

enum LocationError: LocalizedError {
    case denied
    case restricted
    case unavailable
    case timedOut

    var errorDescription: String? {
        switch self {
        case .denied:
            return String(localized: "Location access is off. Turn it on in Settings, or pick a city instead.")
        case .restricted:
            return String(localized: "Location services are not available on this device.")
        case .unavailable:
            return String(localized: "Could not get a location fix. Try again, or pick a city instead.")
        case .timedOut:
            return String(localized: "Getting your location took too long. Try again, or pick a city instead.")
        }
    }
}

@MainActor
final class LocationService: NSObject, CLLocationManagerDelegate {
    private let manager = CLLocationManager()
    private var authorizationWaiter: CheckedContinuation<CLAuthorizationStatus, Never>?
    private var pending: CheckedContinuation<CLLocationCoordinate2D, Error>?
    private var timeoutTask: Task<Void, Never>?
    private var retryTask: Task<Void, Never>?

    private let maximumAttempts = 4
    private let retryDelay: Duration = .milliseconds(700)
    private let overallTimeout: Duration = .seconds(12)
    private var attempt = 0

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
        var status = manager.authorizationStatus
        if status == .notDetermined {
            status = await requestAuthorization()
        }
        switch status {
        case .denied: throw LocationError.denied
        case .restricted: throw LocationError.restricted
        default: break
        }

        attempt = 0
        return try await withCheckedThrowingContinuation { continuation in
            pending = continuation
            startTimeout()
            requestFix()
        }
    }

    private func requestAuthorization() async -> CLAuthorizationStatus {
        await withCheckedContinuation { continuation in
            authorizationWaiter = continuation
            manager.requestWhenInUseAuthorization()
        }
    }

    private func requestFix() {
        attempt += 1
        manager.requestLocation()
    }

    private func startTimeout() {
        timeoutTask?.cancel()
        timeoutTask = Task { [weak self] in
            try? await Task.sleep(for: self?.overallTimeout ?? .seconds(12))
            guard !Task.isCancelled else { return }
            self?.finish(.failure(LocationError.timedOut))
        }
    }

    private func finish(_ result: Result<CLLocationCoordinate2D, Error>) {
        guard let continuation = pending else { return }
        pending = nil
        timeoutTask?.cancel()
        timeoutTask = nil
        retryTask?.cancel()
        retryTask = nil
        continuation.resume(with: result)
    }

    private func scheduleRetry() {
        retryTask?.cancel()
        retryTask = Task { [weak self] in
            try? await Task.sleep(for: self?.retryDelay ?? .milliseconds(700))
            guard !Task.isCancelled, let self, self.pending != nil else { return }
            self.requestFix()
        }
    }

    nonisolated func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let coordinate = locations.last?.coordinate,
              CLLocationCoordinate2DIsValid(coordinate),
              abs(coordinate.latitude) <= 90,
              abs(coordinate.longitude) <= 180
        else { return }
        Task { @MainActor [weak self] in self?.finish(.success(coordinate)) }
    }

    nonisolated func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        let clError = error as? CLError
        let status = manager.authorizationStatus
        let resolved: Error?
        switch clError?.code {
        case .locationUnknown:
            // kCLErrorDomain 0 is transient: no fix yet, so retry instead of failing.
            resolved = nil
        case .denied:
            resolved = LocationError.denied
        default:
            resolved = status == .denied
                ? LocationError.denied
                : LocationError.unavailable
        }
        Task { @MainActor [weak self] in
            guard let self else { return }
            if let resolved {
                self.finish(.failure(resolved))
            } else if self.attempt < self.maximumAttempts {
                self.scheduleRetry()
            } else {
                self.finish(.failure(LocationError.unavailable))
            }
        }
    }

    nonisolated func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        let status = manager.authorizationStatus
        Task { @MainActor [weak self] in
            if let waiter = self?.authorizationWaiter {
                self?.authorizationWaiter = nil
                waiter.resume(returning: status)
            }
            guard status == .denied || status == .restricted, let self, self.pending != nil else {
                return
            }
            self.finish(.failure(status == .denied ? LocationError.denied : LocationError.restricted))
        }
    }
}
