# Weer — iOS app

Native iPhone app (Swift + SwiftUI). No third-party dependencies, no CocoaPods,
no SPM packages.

**The app talks straight to Open-Meteo.** It does not use this repository's
FastAPI backend, so it runs on a real iPhone with no server and no laptop.

## Requirements

- Xcode 15 or newer (developed and verified against Xcode 27, iOS SDK 27)
- iOS 17.0+
- An internet connection

## 1. Run the app

```bash
open ios/Weer.xcodeproj
```

Select the `Weer` scheme and an iPhone simulator and press Run.

From the command line:

```bash
cd ios
xcodebuild -project Weer.xcodeproj -scheme Weer \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 18 Pro' \
  build
```

If `xcodebuild` reports that it requires Xcode, your `xcode-select` points at
Command Line Tools. Either select the full Xcode, or set `DEVELOPER_DIR` for the
session only:

```bash
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
```

## Running on a physical iPhone

The app is fully self-contained, so a device install behaves the same as the
simulator. To build for hardware, set a signing team in Xcode under
*Signing & Capabilities* (a free Apple ID works for ad-hoc installs, but those
expire after 7 days; TestFlight builds last 90 days per upload).

## Configuration

There are **no API keys and no secrets** anywhere in this app. Open-Meteo is
keyless and needs no account. Nothing sensitive is committed.

No base URL is configurable any more: the endpoints are hardcoded in
`OpenMeteoService` and all use HTTPS, so App Transport Security needs no
exception.

**Language** is not a server concern any more. WMO weather codes are mapped to
English text in `WeatherCodes.swift`; the reverse-geocoding lookup asks Nominatim
for `en`. Localizing the app would mean adding an `en.lproj` strings table for the
UI copy and a code-to-description table per language in `WeatherCodes`.

## Data sources

| Source | Used for |
|---|---|
| `api.open-meteo.com/v1/forecast` | current conditions, 24h and 7d forecast, fire risk inputs |
| `air-quality-api.open-meteo.com/v1/air-quality` | AQI, six pollutants, UV index, wildfire smoke |
| `nominatim.openstreetmap.org/reverse` | place name for a device location |

Both Open-Meteo calls are issued concurrently. Air quality is optional: a failure
there degrades that tab to a placeholder instead of breaking the app.

The fire risk and alert rules, the AQI banding and the Angström index were ported
from `app.py` into `OpenMeteoService` so the device computes them locally. The
seven-day fire risk forecast was diffed against the backend's own output and
matches value for value.

### Reverse geocoding

Nominatim's usage policy asks for an identifying User-Agent, which the app sends.
Coordinates that match a built-in city skip the network lookup entirely.

## Screens
## Screens

A five-tab `TabView`, each tab wrapped in `WeatherScaffold` (navigation bar, location
button, pull-to-refresh via `ScreenScroll`):

| Tab | Source | Notes |
| --- | --- | --- |
| Today | `/current`, `/forecast`, `/alerts` | Hero card, detail grid, 24h strip, 7-day list, alert banner |
| Fishing | client-side `FishingCalculator` | Score gauge, five factor rows, 7-day outlook |
| Air | `/air-quality` | AQI gauge, UV index, wildfire smoke, six pollutants |
| Fire | `/fire-risk` | Angström gauge, current factors, 7-day levels |
| Radar | Windy embed in a `WKWebView` | Centred on the selected coordinates |

`/air-quality` and `/fire-risk` are fetched with `try?`, so a failure in either one
degrades that tab to a "not available right now" card instead of breaking the whole app.

Fishing conditions are computed on-device with the algorithm ported from
`static/script.js`: temperature, wind, cloud cover, precipitation and humidity each
contribute a banded score (max 25/25/20/20/10) for a total of 100.

## Structure

```
ios/Weer/
├── App/           WeerApp.swift (entry point)
├── Models/        Decodable value types the views consume + FishingConditions
├── Services/      OpenMeteoService (all network + ported calculations), LocationService (CoreLocation)
├── ViewModels/    WeatherViewModel (@Observable, owns all loading/error state)
├── Views/         RootView (tab bar), ScreenScaffold, the four feature screens, LocationPickerView
├── Components/    Theme (palette/severity), DesignSystem (Card, GaugeCard, StatGrid), current card, forecast rows
├── Assets.xcassets/ AppIcon
└── Support/       WeerDate (timestamp parsing), WeatherCodes, KnownPlaces
```

The Xcode project uses a folder-synchronized group, so new files added anywhere
under `ios/Weer/` are compiled automatically — no need to edit `project.pbxproj`.

## Design

`Theme.swift` holds a single adaptive palette built on
`Color.adaptive(light:dark:)` (a `UIColor` dynamic provider keyed off
`userInterfaceStyle`), so every colour resolves correctly in light and dark mode
without duplicated declarations. Severity tokens from the backend (`laag`, `matig`,
`verhoogd`, `hoog`, `extreem`, `good`/`moderate`/`unhealthy`) map to colours via
`Severity.init(token:)`.

Fire risk levels arrive as a `css` token. `FireLevel.label(token:)` and
`FireLevel.detail(token:)` turn it into display text, keeping the same tokens the
web app uses.

## Notes and limitations

- **Times are shown as the backend emits them.** The backend pins
  `timezone=Europe/Amsterdam` and returns local wall-clock strings without an offset.
  The app displays those values directly rather than re-interpreting them, so a
  device in another timezone sees Amsterdam local time. This matches the web app.
- **Location is not persisted.** The selected location is session-only; the app
  falls back to Amsterdam on next launch.
- **CoreLocation "kCLErrorDomain error 0"** means no fix is available *yet*. It is
  transient, so `LocationService` retries up to four times with a delay and has a
  12 second overall timeout instead of surfacing the raw error. The authorization
  prompt is also awaited before the first `requestLocation()` call, which is what
  made the first attempt fail.
- **The location permission prompt is only shown after you tap "Use my location"**,
  which is why the city list is the primary way to switch locations.
- **The radar tab needs network access to windy.com** and renders inside a web view,
  so it is the only screen that depends on a third party.
- **Not ported from the web app:** the seven mini-games, and everything that needs a
  database (accounts, location history, game score tracking). Those all live in the
  FastAPI backend, which the app no longer talks to.
- **Only English is implemented.** See the language note above.
