# Weer — iOS app

Native iPhone app (Swift + SwiftUI) for this repository's existing FastAPI backend.
No third-party dependencies, no CocoaPods, no SPM packages.

## Requirements

- Xcode 15 or newer (developed and verified against Xcode 27, iOS SDK 27)
- iOS 17.0+
- The backend running locally

## 1. Start the backend

From the repository root:

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
ENABLE_NGROK=false .venv/bin/uvicorn app:app --host 0.0.0.0 --port 8000
```

Verify it responds:

```bash
curl http://localhost:8000/health
# {"status":"healthy",...}
```

> The iOS Simulator shares the host network stack, so `localhost` from the app
> reaches the backend on the host.

## 2. Run the app

```bash
open ios/Weer.xcodeproj
```

Then select the `Weer` scheme and an iPhone simulator and press Run.

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

## Configuration

There are **no API keys and no secrets** anywhere in this app or in the backend.
The backend reads Open-Meteo, which is keyless. Nothing sensitive is committed.

The only setting is the API base URL, kept out of the Swift source:

| Key | Where | Default |
|---|---|---|
| `WEER_API_BASE_URL` | `ios/Weer/Info.plist` | `http://localhost:8000` |

It is read at runtime by `AppConfig.baseURL` (`ios/Weer/App/AppConfig.swift`), which
falls back to `http://localhost:8000` if the key is missing or unparseable.

**To point the app at a deployed backend**, change `WEER_API_BASE_URL` in
`ios/Weer/Info.plist`. A path prefix is supported and is preserved when requests
are built, so `https://example.com/api` correctly calls `https://example.com/api/current`.

`NSAllowsLocalNetworking` is enabled in `Info.plist` so plain-HTTP development
against `localhost` is permitted by App Transport Security. A production HTTPS URL
needs no exception at all.

**Language** is derived from the device locale and passed to the backend as
`?lang=`, so weather descriptions are localized server-side. Supported values are
`nl`, `en`, `de`, `it`, `fr` (see `AppConfig.supportedLanguages`); the default is `nl`,
matching the backend's default.

## What the app uses from the backend

All endpoints are read-only and need no authentication.

| Endpoint | Used for |
|---|---|
| `GET /current` | temperature, feels-like, humidity, pressure, wind + gust, clouds, precipitation, visibility |
| `GET /forecast` | `forecast_24h` (8 steps, 3-hourly) and `forecast_7d` (7 days) |
| `GET /alerts` | severe-weather alert banner |
| `GET /locations` | city list for the location picker (added for this app) |

The five weather endpoints are fetched concurrently, mirroring the web client's
`Promise.all`. The backend reverse-geocodes coordinates into `location.name`, so the
app never geocodes on its own — it passes `lat`/`lon` and renders what comes back.

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
├── App/           WeerApp.swift (entry point), AppConfig.swift (base URL, language)
├── Models/        Codable types mirroring the JSON exactly + FishingConditions
├── Services/      APIClient (URLSession, error mapping), WeatherService, LocationService (CoreLocation)
├── ViewModels/    WeatherViewModel (@Observable, owns all loading/error state)
├── Views/         RootView (tab bar), ScreenScaffold, the four feature screens, LocationPickerView
├── Components/    Theme (palette/severity), DesignSystem (Card, GaugeCard, StatGrid), current card, forecast rows
└── Support/       WeerDate (parsing of the backend's timezone-less timestamps)
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

`/fire-risk` returns its `level` and `description` fields hardcoded in Dutch, and the
web app translates them client-side from the `css` token. The app does the same through
`FireLevel.label(token:)` / `FireLevel.detail(token:)`, so the tab reads in English
while still honouring the same tokens.

## Notes and limitations

- **Times are shown as the backend emits them.** The backend pins
  `timezone=Europe/Amsterdam` and returns local wall-clock strings without an offset.
  The app displays those values directly rather than re-interpreting them, so a
  device in another timezone sees Amsterdam local time. This matches the web app.
- **Location is not persisted.** Same as the web app, the selected location is
  session-only; the app falls back to the backend default on next launch.
- **The location permission prompt is only shown after you tap "Use my location"**,
  which is why the city list is the primary way to switch locations.
- **The radar tab needs network access to windy.com** and renders inside a web view,
  so it is the only screen that depends on a third party.
- **Not ported from the web app:** the seven mini-games.
- **No login.** The weather endpoints never required it; the app's backend
  interactions are the same anonymous ones the web frontend uses when signed out.
