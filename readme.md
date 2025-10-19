## RainCheck – Multi-Provider Weather Dashboard

RainCheck is a single-page weather experience that utilizes multiple forecast providers, an interactive map, responsive charts, and a themable glassmorphism UI. The project is intentionally framework-free (vanilla HTML, CSS, and JavaScript) so it can be served statically and extended without a build step.

<p align="center">
  <img src="./assets/media/raincheck-themes.gif" alt="Raincheck UI" width="1080"/>
</p>

---

### Contents
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Application Architecture](#application-architecture)
- [Data Providers & API Endpoints](#data-providers--api-endpoints)
- [Weather Rendering Pipeline](#weather-rendering-pipeline)
- [Interactive Visualisations](#interactive-visualisations)
- [Dynamic Themes & Styling](#dynamic-themes--styling)
- [Search, Shortcuts & Favorites](#search-shortcuts--favorites)
- [Loader Animation](#loader-animation)
- [Naming Conventions](#naming-conventions)
- [Notable CSS Techniques](#notable-css-techniques)
- [Extensibility Notes](#extensibility-notes)

---

### Tech Stack

- **Language:** HTML5, modern ES2020+ JavaScript, modular CSS
- **Libraries:**
	- [Leaflet](https://leafletjs.com/) (shipped locally in `assets/js/vendor/leaflet`) for mapping
	- [Frappe Charts](https://frappe.io/charts) (CDN IIFE) for comparative temperature charts
	- [Weather Icons](https://erikflowers.github.io/weather-icons/) for condition glyphs
- **Tooling:** Vanilla setup – no bundler, transpiler, or framework required
- **Assets:** Custom loader GIF (`assets/media/loader-animation.gif`), local Leaflet CSS/JS, Google Fonts (Manrope)

---

### Project Structure

```
RainCheck/
├─ index.html                    # Application shell
├─ assets/
│  ├─ css/styles.css             # Global styling, themes, responsive rules
│  ├─ js/app.js                  # Core logic, state management, data fetching
│  ├─ js/vendor/leaflet/         # Local Leaflet distribution
│  └─ media/loader-animation.gif # Loader animation
└─ ... (weather icon CDN, frappe charts via CDN script)
```

---

### Getting Started

1. Clone or download the repository.
2. Serve the project with any static file server (VS Code Live Server, `python -m http.server`, etc.) or open `index.html` directly in a modern browser.
3. Ensure outbound network access to the listed APIs. The app is entirely client-side; no additional configuration is required.

---

### Application Architecture

- **Single entry point:** `index.html` contains semantic sections for search, current conditions, hourlies, providers, the comparison chart, and the Leaflet map.
- **State management:** `assets/js/app.js` holds a global `state` object (unit, favorites, provider payloads, map references) and orchestrates rendering.
- **Lifecycle:**
	1. `init()` loads unit/favorite preferences from `localStorage`.
	2. If favorites exist, the first favorite loads; otherwise, an IP lookup auto-detects the user location.
	3. Weather data from Open-Meteo, wttr.in, and 7timer are fetched concurrently. Render functions update every UI section once all data is available.
- **Resilience:** Fetching uses `Promise.all` with graceful fallback handling (e.g., 7timer “civil” product with a “meteo” fallback, geocoding fallback to Nominatim when geocode.maps.co fails, abort controllers for debounced search).

---

### Data Providers & API Endpoints

| Purpose | Endpoint | Notes & Example |
|---------|----------|-----------------|
| **Primary forecast (hourly/daily)** | `https://api.open-meteo.com/v1/forecast` | Parameters: `latitude`, `longitude`, `hourly=temperature_2m,weather_code`, `daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset`, `timezone=auto`. <br>Example:<br>`https://api.open-meteo.com/v1/forecast?latitude=51.50&longitude=-0.12&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto` |
| **Supplemental provider (wttr.in)** | `https://wttr.in/{lat},{lon}?format=j1` | Used for alternative temperature/wind/humidity readings. Example: `https://wttr.in/51.50,-0.12?format=j1` |
| **7timer forecast** | `https://www.7timer.info/bin/api.pl` | Query params: `lon`, `lat`, `product=civil` (fallback `meteo`), `output=json`. Example: `https://www.7timer.info/bin/api.pl?lon=-0.12&lat=51.50&product=civil&output=json` |
| **Forward geocoding (autocomplete)** | `https://geocode.maps.co/search` | Query params: `q`, `limit`. Example: `https://geocode.maps.co/search?q=London&limit=5` |
| **Forward geocoding fallback** | `https://nominatim.openstreetmap.org/search` | Used when the primary geocoder fails. Includes `format=jsonv2`, `addressdetails=1`. |
| **Reverse geocoding** | `https://geocode.maps.co/reverse` | Derives readable names for GPS coordinates. |
| **IP-based auto detection** | `http://ip-api.com/json/?fields=status,message,city,lat,lon` | Produces approximate city & coordinates for initial load. |

Each fetch wrapper normalises provider responses into consistent objects consumed by the rendering functions. Weather codes are mapped to icon classes via lookup tables (`WEATHER_CODE_MAP`, `WTTR_CODE_MAP`, `SEVENTIMER_MAP`).

---

### Weather Rendering Pipeline

Located in `assets/js/app.js`:

- **`renderCurrent()`** uses Open-Meteo data for primary conditions, applies unit conversions, and selects day/night icons using sunrise/sunset times.
- **`renderHourly()`** renders the next 24 hours, dynamically switching icons based on whether each hour falls before sunrise or after sunset. Cards show temperature with the active unit symbol.
- **`renderDaily()`** builds seven-day summaries with max/min temperatures and precipitation.
- **`renderProviderSnapshots()`** composes cards for Open-Meteo, wttr.in, and 7timer, highlighting temperature, wind, humidity/cloud cover, and provider-specific summaries.
- **`renderProviderChart()`** builds a Frappe line chart comparing hourly temperatures across providers (see below).
- **Map updates** occur via `updateMap()`, which keeps a single Leaflet map instance in sync with the current location.

Unit toggling (`°C`, `°F`, `K`) converts values on the fly, while favourites persist in `localStorage`. Debounced resize handling ensures the chart and map stay responsive.

---

### Interactive Visualisations

#### Frappe Charts (`renderProviderChart`)
- Located in `assets/js/app.js`, using the global `frappe.Chart` IIFE.
- Three datasets are plotted (`Open-Meteo`, `wttr.in`, `7timer`), each colour-coded via `PROVIDER_COLORS` in the JS file.
- The chart automatically converts provider temperatures to the active unit before rendering.
- Tooltips, heatline and region fill options provide quick comparisons.
- On narrow screens the chart container becomes horizontally scrollable with a minimum width, keeping axis labels legible.

#### Leaflet map (`updateMap`)
- Map container: `#map`. Initialised once with a tile layer (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).
- The current location is represented with a styled `L.circleMarker`; colours derive from the active accent theme so the map marker matches the UI palette.
- Popups show the formatted location name. The map auto-reflows via `map.invalidateSize()` when the layout changes.

---

### Dynamic Themes & Styling

The CSS (`assets/css/styles.css`) defines a palette of theme tokens:

- Root variables handle glassmorphism, typography, and base accent colours.
- Weather-driven classes (e.g. `theme-hot-day`, `theme-rainy-night`) override accent gradients and app background.
- `updateBackground()` in JS chooses the appropriate theme using:
	- Weather codes (rain vs snow)
	- Temperature thresholds (>25 °C = hot, >15 °C = warm, else cold)
	- Day/night derived from sunrise/sunset

Applying a theme class updates buttons, hover states, scrollbars, provider cards, and even the Leaflet marker via shared CSS variables. A small `data-theme` attribute on the app element reflects the active theme (`hot-day`, `rainy-night`, etc.).

---

### Search, Shortcuts & Favorites

- **Debounced autocomplete:** Input events are debounced (`handleSearchInput`) to avoid hammering the geocoder. Fetched suggestions populate the nested `<ul class="suggestions">` dropdown without shifting layout. Status rows ("Searching…", "No matches found") keep feedback immediate.
- **Fallback geocoding:** When geocode.maps.co fails or rate-limits, the app retries with Nominatim.
- **Selection:** Clicking a suggestion loads weather data and hides the dropdown. Favorites can be added/removed with a toggle button, persisting across sessions.
- **Shortcuts:** “Use my location” uses browser geolocation (with high-accuracy options), while “Use my IP address” uses ip-api as a fallback for users who deny GPS.

---

### Loader Animation

- The full-screen loader overlay (`.loader`) prevents interaction during provider fetches.
- `.loader__spinner` now houses the custom GIF (`assets/media/loader-animation.gif`) to create a branded loading experience rooted in vanilla CSS (no JavaScript timers besides adding/removing `loader--visible`).

---

### Naming Conventions

- **CSS classes & IDs:** Follow a BEM-inspired pattern (`block__element--modifier`) without actual modifier classes. Blocks (e.g., `search`, `timeline`, `provider-card`) and elements (`__item`, `__icon`, `__label`) stay readable and consistent.
- **JavaScript variables:** camelCase for functions and variables (`renderHourly`, `formatWind`). Constants are upper snake case (`WEATHER_CODE_MAP`, `PROVIDER_COLORS`).
- **ARIA & accessibility:** Regions use `aria-label`, forms use labelled inputs, live-updating spans go through `#live-region`. Suggestions use the `role=listbox`/`role=option` pattern.

---

### Notable CSS Techniques

- **Glassmorphism:** Semi-transparent backgrounds (`rgba(255,255,255,0.08)`), heavy blur filters, and soft drop shadows unify the layout with the “glass card” aesthetic.
- **Responsive auto layouts:** CSS grid and flex handle major sections. Timeline uses a snap-scrolling flex row on desktop and retains horizontal scrolling with custom scrollbars.
- **Custom scrollbars:** Timeline and chart containers use gradient thumb styling (WebKit) and `scrollbar-color` for Firefox.
- **Autocomplete overlay:** Suggestions list sits inside the input wrapper with absolute positioning, transitions, and high z-index to prevent layout shifts.
- **Theme-aware accents:** Buttons, hover states, and icons draw from CSS variables updated by theme classes.
- **Mobile chart UX:** Minimum widths and padding create a horizontal scroll experience so axis labels stay legible, even on very narrow devices.

---

### Extensibility Notes

- **Adding providers:** Extend `PROVIDER_COLORS`, add mapping logic, and update `renderProviderSnapshots`/`renderProviderChart` to handle additional datasets.
- **Additional metrics:** Helpers such as `formatTemperature`, `formatWind`, and the weather code maps make it straightforward to include new values (e.g., precipitation, pressure).
- **Styling:** Theme classes encapsulate palette changes; creating new looks is as simple as defining a `.app.theme-<name>-<day|night>` block.
