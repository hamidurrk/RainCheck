const FAVORITES_KEY = "raincheck:favorites";
const UNIT_KEY = "raincheck:unit";

const WEATHER_CODE_MAP = {
    0: { label: "Clear sky", iconDay: "wi-day-sunny", iconNight: "wi-night-clear" },
    1: { label: "Mainly clear", iconDay: "wi-day-sunny-overcast", iconNight: "wi-night-alt-partly-cloudy" },
    2: { label: "Partly cloudy", iconDay: "wi-day-cloudy", iconNight: "wi-night-alt-cloudy" },
    3: { label: "Overcast", iconDay: "wi-cloudy", iconNight: "wi-cloudy" },
    45: { label: "Fog", iconDay: "wi-fog", iconNight: "wi-fog" },
    48: { label: "Depositing rime fog", iconDay: "wi-fog", iconNight: "wi-fog" },
    51: { label: "Light drizzle", iconDay: "wi-sprinkle", iconNight: "wi-sprinkle" },
    53: { label: "Drizzle", iconDay: "wi-showers", iconNight: "wi-showers" },
    55: { label: "Dense drizzle", iconDay: "wi-rain", iconNight: "wi-rain" },
    56: { label: "Freezing drizzle", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    57: { label: "Freezing drizzle", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    61: { label: "Light rain", iconDay: "wi-rain-mix", iconNight: "wi-rain-mix" },
    63: { label: "Rain", iconDay: "wi-rain", iconNight: "wi-rain" },
    65: { label: "Heavy rain", iconDay: "wi-rain", iconNight: "wi-rain" },
    66: { label: "Freezing rain", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    67: { label: "Freezing rain", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    71: { label: "Light snow", iconDay: "wi-snow", iconNight: "wi-snow" },
    73: { label: "Snow", iconDay: "wi-snow", iconNight: "wi-snow" },
    75: { label: "Heavy snow", iconDay: "wi-snow", iconNight: "wi-snow" },
    77: { label: "Snow grains", iconDay: "wi-snow", iconNight: "wi-snow" },
    80: { label: "Light shower", iconDay: "wi-showers", iconNight: "wi-showers" },
    81: { label: "Shower", iconDay: "wi-showers", iconNight: "wi-showers" },
    82: { label: "Heavy shower", iconDay: "wi-showers", iconNight: "wi-showers" },
    85: { label: "Snow shower", iconDay: "wi-snow", iconNight: "wi-snow" },
    86: { label: "Snow shower", iconDay: "wi-snow", iconNight: "wi-snow" },
    95: { label: "Thunderstorm", iconDay: "wi-thunderstorm", iconNight: "wi-thunderstorm" },
    96: { label: "Thunderstorm", iconDay: "wi-thunderstorm", iconNight: "wi-thunderstorm" },
    99: { label: "Severe thunderstorm", iconDay: "wi-thunderstorm", iconNight: "wi-thunderstorm" }
};

const WTTR_CODE_MAP = {
    113: { label: "Clear", iconDay: "wi-day-sunny", iconNight: "wi-night-clear" },
    116: { label: "Partly cloudy", iconDay: "wi-day-cloudy", iconNight: "wi-night-alt-partly-cloudy" },
    119: { label: "Cloudy", iconDay: "wi-cloudy", iconNight: "wi-cloudy" },
    122: { label: "Overcast", iconDay: "wi-cloudy", iconNight: "wi-cloudy" },
    143: { label: "Mist", iconDay: "wi-fog", iconNight: "wi-fog" },
    176: { label: "Patchy rain", iconDay: "wi-showers", iconNight: "wi-showers" },
    179: { label: "Patchy snow", iconDay: "wi-snow", iconNight: "wi-snow" },
    182: { label: "Sleet", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    185: { label: "Freezing drizzle", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    200: { label: "Thunderstorm", iconDay: "wi-thunderstorm", iconNight: "wi-thunderstorm" },
    227: { label: "Blizzard", iconDay: "wi-snow-wind", iconNight: "wi-snow-wind" },
    230: { label: "Blizzard", iconDay: "wi-snow-wind", iconNight: "wi-snow-wind" },
    248: { label: "Fog", iconDay: "wi-fog", iconNight: "wi-fog" },
    260: { label: "Freezing fog", iconDay: "wi-fog", iconNight: "wi-fog" },
    263: { label: "Light drizzle", iconDay: "wi-sprinkle", iconNight: "wi-sprinkle" },
    266: { label: "Drizzle", iconDay: "wi-sprinkle", iconNight: "wi-sprinkle" },
    281: { label: "Freezing drizzle", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    284: { label: "Freezing drizzle", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    293: { label: "Light rain", iconDay: "wi-rain-mix", iconNight: "wi-rain-mix" },
    296: { label: "Light rain", iconDay: "wi-rain-mix", iconNight: "wi-rain-mix" },
    299: { label: "Moderate rain", iconDay: "wi-rain", iconNight: "wi-rain" },
    302: { label: "Moderate rain", iconDay: "wi-rain", iconNight: "wi-rain" },
    305: { label: "Heavy rain", iconDay: "wi-rain", iconNight: "wi-rain" },
    308: { label: "Heavy rain", iconDay: "wi-rain", iconNight: "wi-rain" },
    311: { label: "Light freezing rain", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    314: { label: "Moderate freezing rain", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    317: { label: "Light sleet", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    320: { label: "Moderate sleet", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    323: { label: "Patchy snow", iconDay: "wi-snow", iconNight: "wi-snow" },
    326: { label: "Light snow", iconDay: "wi-snow", iconNight: "wi-snow" },
    329: { label: "Moderate snow", iconDay: "wi-snow", iconNight: "wi-snow" },
    332: { label: "Moderate snow", iconDay: "wi-snow", iconNight: "wi-snow" },
    335: { label: "Heavy snow", iconDay: "wi-snow", iconNight: "wi-snow" },
    338: { label: "Heavy snow", iconDay: "wi-snow", iconNight: "wi-snow" },
    350: { label: "Ice pellets", iconDay: "wi-hail", iconNight: "wi-hail" },
    353: { label: "Light showers", iconDay: "wi-showers", iconNight: "wi-showers" },
    356: { label: "Showers", iconDay: "wi-showers", iconNight: "wi-showers" },
    359: { label: "Heavy showers", iconDay: "wi-showers", iconNight: "wi-showers" },
    362: { label: "Light sleet", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    365: { label: "Sleet", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    368: { label: "Light snow", iconDay: "wi-snow", iconNight: "wi-snow" },
    371: { label: "Snow", iconDay: "wi-snow", iconNight: "wi-snow" },
    374: { label: "Light sleet", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    377: { label: "Sleet", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    386: { label: "Thunderstorm", iconDay: "wi-thunderstorm", iconNight: "wi-thunderstorm" },
    389: { label: "Thunderstorm", iconDay: "wi-thunderstorm", iconNight: "wi-thunderstorm" },
    392: { label: "Snow thunder", iconDay: "wi-storm-showers", iconNight: "wi-storm-showers" },
    395: { label: "Snow thunder", iconDay: "wi-storm-showers", iconNight: "wi-storm-showers" }
};

const SEVENTIMER_MAP = {
    clear: { label: "Clear", iconDay: "wi-day-sunny", iconNight: "wi-night-clear" },
    pcloudy: { label: "Partly cloudy", iconDay: "wi-day-cloudy", iconNight: "wi-night-alt-partly-cloudy" },
    mcloudy: { label: "Mostly cloudy", iconDay: "wi-cloud", iconNight: "wi-cloud" },
    cloudy: { label: "Cloudy", iconDay: "wi-cloudy", iconNight: "wi-cloudy" },
    humid: { label: "Humid", iconDay: "wi-humidity", iconNight: "wi-humidity" },
    lightrain: { label: "Light rain", iconDay: "wi-rain-mix", iconNight: "wi-rain-mix" },
    oshower: { label: "Occasional showers", iconDay: "wi-showers", iconNight: "wi-showers" },
    ishower: { label: "Isolated showers", iconDay: "wi-showers", iconNight: "wi-showers" },
    lightsnow: { label: "Light snow", iconDay: "wi-snow", iconNight: "wi-snow" },
    rain: { label: "Rain", iconDay: "wi-rain", iconNight: "wi-rain" },
    snow: { label: "Snow", iconDay: "wi-snow", iconNight: "wi-snow" },
    rainsnow: { label: "Rain & snow", iconDay: "wi-sleet", iconNight: "wi-sleet" },
    tsrain: { label: "Thunderstorm", iconDay: "wi-thunderstorm", iconNight: "wi-thunderstorm" },
    ts: { label: "Thunderstorm", iconDay: "wi-thunderstorm", iconNight: "wi-thunderstorm" },
    windy: { label: "Windy", iconDay: "wi-strong-wind", iconNight: "wi-strong-wind" }
};

const PROVIDER_COLORS = {
    openMeteo: "#5ad0ff",
    wttr: "#ff8f8f",
    sevenTimer: "#ffd35a"
};

const elements = {
    app: document.getElementById("app"),
    header: document.querySelector(".app__header"),
    searchForm: document.getElementById("search-form"),
    searchInput: document.getElementById("search-input"),
    suggestions: document.getElementById("suggestions"),
    useLocationButton: document.getElementById("use-location-btn"),
    useIpButton: document.getElementById("use-ip-btn"),
    toggleFavorite: document.getElementById("toggle-favorite"),
    favoritesList: document.getElementById("favorites-list"),
    unitToggleButtons: document.querySelectorAll(".unit-toggle__btn"),
    currentIcon: document.getElementById("current-icon"),
    currentTemp: document.getElementById("current-temp"),
    currentUnit: document.getElementById("current-unit"),
    currentSummary: document.getElementById("current-summary"),
    currentApparent: document.getElementById("current-apparent"),
    currentWind: document.getElementById("current-wind"),
    currentHumidity: document.getElementById("current-humidity"),
    locationName: document.getElementById("location-name"),
    hourlyContainer: document.getElementById("hourly-container"),
    dailyContainer: document.getElementById("daily-container"),
    providersList: document.getElementById("providers-list"),
    loader: document.getElementById("loader"),
    providersChart: document.getElementById("providers-chart"),
    providersLegend: document.getElementById("providers-legend"),
    mapContainer: document.getElementById("map"),
    liveRegion: document.getElementById("live-region")
};

const state = {
    unit: loadUnit(),
    favorites: loadFavorites(),
    currentLocation: null,
    openMeteo: null,
    wttr: null,
    sevenTimer: null,
    chart: null,
    map: null,
    mapLayer: null
};

let suggestionAbortController = null;

init();

function init() {
    applyUnitToggleState();
    renderFavorites();
    attachEventListeners();

    if (state.favorites.length > 0) {
        loadWeatherForLocation(state.favorites[0]);
    } else {
        setTimeout(() => {
            autoDetectByIP();
        }, 600);
    }
}

function attachEventListeners() {
    elements.searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = elements.searchInput.value.trim();
        if (query.length === 0) {
            return;
        }
        searchAndLoad(query);
    });

    elements.searchInput.addEventListener("input", debounce(handleSearchInput, 280));

    elements.searchInput.addEventListener("focus", () => {
        if (elements.suggestions.childElementCount > 0) {
            elements.suggestions.classList.add("suggestions--visible");
        }
    });

    document.addEventListener("click", (event) => {
        if (!elements.suggestions.contains(event.target) && event.target !== elements.searchInput) {
            hideSuggestions();
        }
    });

    elements.useLocationButton.addEventListener("click", () => {
        if (!navigator.geolocation) {
            notify("Geolocation is not supported in this browser.");
            return;
        }
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            const name = await reverseGeocode(latitude, longitude);
            loadWeatherForLocation({
                name: name || "My location",
                latitude,
                longitude
            });
        }, (error) => {
            notify(`Unable to get your location (${error.message}).`);
        }, {
            enableHighAccuracy: true,
            timeout: 12000,
            maximumAge: 300000
        });
    });

    elements.useIpButton.addEventListener("click", autoDetectByIP);

    elements.toggleFavorite.addEventListener("click", toggleFavoriteForCurrent);

    elements.unitToggleButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedUnit = button.dataset.unit;
            if (selectedUnit && selectedUnit !== state.unit) {
                state.unit = selectedUnit;
                saveUnit(selectedUnit);
                applyUnitToggleState();
                renderAll();
            }
        });
    });

    const handleResize = debounce(() => {
        if (state.openMeteo) {
            renderProviderChart();
        }
        queueMapResize();
    }, 220);

    window.addEventListener("resize", handleResize);
}

async function searchAndLoad(query) {
    try {
        const results = await geocodeSearch(query);
        if (results.length === 0) {
            notify("No matching locations found.");
            return;
        }
        const bestMatch = results[0];
        await loadWeatherForLocation(bestMatch);
    } catch (error) {
        console.error(error);
        notify("Search failed. Please try again later.");
    }
}

async function loadWeatherForLocation(location) {
    showLoader(true);
    try {
        const [openMeteo, wttr, sevenTimer] = await Promise.all([
            fetchOpenMeteo(location.latitude, location.longitude),
            fetchWttr(location.latitude, location.longitude),
            fetchSevenTimer(location.latitude, location.longitude)
        ]);

        if (!openMeteo) {
            throw new Error("Open-Meteo data unavailable");
        }

        const displayName = selectLocationName(location);
        state.currentLocation = {
            name: displayName,
            rawName: location.name,
            address: location.address || null,
            latitude: location.latitude,
            longitude: location.longitude,
            timezone: openMeteo.timezone,
            utcOffsetSeconds: openMeteo.utc_offset_seconds
        };
        state.openMeteo = openMeteo;
        state.wttr = wttr;
        state.sevenTimer = sevenTimer;

        activateLayout();
        renderAll();
        updateFavoriteButton();
        updateMap();
    } catch (error) {
        console.error(error);
        notify("Unable to load weather right now.");
    } finally {
        showLoader(false);
    }
}

function activateLayout() {
    elements.app.classList.add("app--activated");
    elements.app.classList.remove("app--initial");
}

function renderAll() {
    if (!state.openMeteo) {
        return;
    }
    renderCurrent();
    renderHourly();
    renderDaily();
    renderProviderSnapshots();
    renderProviderChart();
}

function renderCurrent() {
    const current = state.openMeteo.current;
    const daily = state.openMeteo.daily;
    const now = new Date();
    const todaySunrise = daily?.sunrise?.[0];
    const todaySunset = daily?.sunset?.[0];
    const isNight = computeIsNight(now, todaySunrise, todaySunset, state.currentLocation.utcOffsetSeconds);

    const temperatureC = current.temperature_2m;
    const apparentC = current.apparent_temperature;
    const weatherCode = current.weather_code;
    const weatherInfo = WEATHER_CODE_MAP[weatherCode] || { label: "Unknown", iconDay: "wi-na", iconNight: "wi-na" };
    const iconClass = isNight ? weatherInfo.iconNight : weatherInfo.iconDay;

    elements.currentIcon.innerHTML = `<i class="wi ${iconClass}"></i>`;
    elements.currentTemp.textContent = formatTemperature(temperatureC);
    elements.currentUnit.textContent = formatUnitSymbol();
    elements.currentSummary.textContent = weatherInfo.label;
    elements.currentApparent.textContent = `Feels like ${formatTemperature(apparentC)}`;
    elements.currentWind.textContent = `Wind ${formatWind(current.wind_speed_10m)}`;
    elements.currentHumidity.textContent = `Humidity ${Math.round(current.relative_humidity_2m)}%`;
    elements.locationName.textContent = state.currentLocation.name;

    updateBackground(temperatureC, isNight);
}

function renderHourly() {
    const container = elements.hourlyContainer;
    container.innerHTML = "";

    const hourlyTimes = state.openMeteo.hourly.time.map((time) => new Date(time));
    const hourlyTemps = state.openMeteo.hourly.temperature_2m;
    const hourlyCodes = state.openMeteo.hourly.weather_code;

    const nowMillis = Date.now();
    let startIndex = hourlyTimes.findIndex((date) => date.getTime() >= nowMillis - 30 * 60000);
    if (startIndex < 0) {
        startIndex = 0;
    }

    const hoursToShow = 24;
    const sliceTimes = hourlyTimes.slice(startIndex, startIndex + hoursToShow);
    const sliceTemps = hourlyTemps.slice(startIndex, startIndex + hoursToShow);
    const sliceCodes = hourlyCodes.slice(startIndex, startIndex + hoursToShow);

    sliceTimes.forEach((date, index) => {
        const code = sliceCodes[index];
        const temp = sliceTemps[index];
        const info = WEATHER_CODE_MAP[code] || { label: "Weather", iconDay: "wi-na", iconNight: "wi-na" };
        const isNight = isNightAtDate(date, state.openMeteo.daily.sunrise, state.openMeteo.daily.sunset, state.currentLocation.utcOffsetSeconds);
        const icon = isNight ? info.iconNight : info.iconDay;
        const hourLabel = new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(date);

        const item = document.createElement("div");
        item.className = "timeline__item";
        item.innerHTML = `
            <strong>${hourLabel}</strong>
            <i class="wi ${icon}" aria-hidden="true"></i>
            <span>${info.label}</span>
            <strong>${formatTemperature(temp)}</strong>
        `;
        container.appendChild(item);
    });
}

function renderDaily() {
    const container = elements.dailyContainer;
    container.innerHTML = "";
    const daily = state.openMeteo.daily;
    if (!daily) {
        return;
    }

    daily.time.forEach((dateString, index) => {
        const date = new Date(dateString);
        const label = new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric" }).format(date);
        const code = daily.weather_code[index];
        const info = WEATHER_CODE_MAP[code] || { label: "Weather", iconDay: "wi-na", iconNight: "wi-na" };
        const icon = info.iconDay;
        const maxTemp = daily.temperature_2m_max[index];
        const minTemp = daily.temperature_2m_min[index];
        const precip = daily.precipitation_sum?.[index];

        const card = document.createElement("div");
        card.className = "forecast__day";
        card.innerHTML = `
            <strong>${label}</strong>
            <i class="wi ${icon}" aria-hidden="true"></i>
            <span>${info.label}</span>
            <div class="forecast__temps">
                <span>${formatTemperature(maxTemp)}</span>
                <span>${formatTemperature(minTemp)}</span>
            </div>
            <span>Precip ${precip != null ? precip.toFixed(1) : "--"} mm</span>
        `;
        container.appendChild(card);
    });
}

function renderProviderSnapshots() {
    if (!elements.providersList) {
        return;
    }

    elements.providersList.innerHTML = "";

    const unitSymbol = formatUnitSymbol();
    const cards = [
        buildOpenMeteoSnapshot(unitSymbol),
        buildWttrSnapshot(unitSymbol),
        buildSevenTimerSnapshot(unitSymbol)
    ].filter(Boolean);

    cards.forEach((card) => {
        elements.providersList.appendChild(card);
    });
}

function renderProviderChart() {
    if (!state.openMeteo || !state.wttr || !state.sevenTimer) {
        return;
    }

    const target = computeTargetHours();
    const labels = target.times.map((date) => new Intl.DateTimeFormat("en", { hour: "numeric" }).format(date));

    const openMeteoSeries = getOpenMeteoSeries(target);
    const wttrSeries = getWttrSeries(target);
    const sevenTimerSeries = getSevenTimerSeries(target);

    const datasets = [
        { name: "Open-Meteo", values: openMeteoSeries, chartType: "line", color: PROVIDER_COLORS.openMeteo },
        { name: "wttr.in", values: wttrSeries, chartType: "line", color: PROVIDER_COLORS.wttr },
        { name: "7timer", values: sevenTimerSeries, chartType: "line", color: PROVIDER_COLORS.sevenTimer }
    ];

    const data = {
        labels,
        datasets: datasets.map((set) => ({
            ...set,
            values: set.values.map((value) => value != null ? convertTemperature(value) : null)
        }))
    };

    elements.providersChart.innerHTML = "";
    state.chart = new frappe.Chart(elements.providersChart, {
        data,
        type: "line",
        height: 280,
        axisOptions: {
            yAxisMode: "span",
            xAxisMode: "tick"
        },
        lineOptions: {
            heatline: true,
            regionFill: 1
        },
        colors: datasets.map((set) => set.color)
    });

    renderLegend(datasets);
}

function renderLegend(datasets) {
    elements.providersLegend.innerHTML = "";
    datasets.forEach((set) => {
        const item = document.createElement("span");
        item.className = "legend-item";
        item.innerHTML = `
            <span class="legend-swatch" style="background:${set.color}"></span>
            ${set.name}
        `;
        elements.providersLegend.appendChild(item);
    });
}

function computeTargetHours() {
    const allTimes = state.openMeteo.hourly.time.map((time) => new Date(time));
    const now = Date.now();
    let startIndex = allTimes.findIndex((date) => date.getTime() >= now - 30 * 60000);
    if (startIndex < 0) {
        startIndex = 0;
    }

    let times = allTimes.slice(startIndex, startIndex + 24);
    if (times.length < 24) {
        times = allTimes.slice(-24);
        startIndex = Math.max(0, allTimes.length - times.length);
    }

    return {
        times,
        timestamps: times.map((date) => date.getTime()),
        startIndex
    };
}

function getOpenMeteoSeries(target) {
    const series = state.openMeteo.hourly.temperature_2m.slice(target.startIndex, target.startIndex + target.times.length);
    while (series.length < target.times.length) {
        series.push(null);
    }
    return series;
}

function getWttrSeries(target) {
    const points = getWttrDataPoints();
    return mapToNearestSeries(points, target.timestamps, (point) => point.tempC);
}

function getSevenTimerSeries(target) {
    const points = getSevenTimerDataPoints();
    return mapToNearestSeries(points, target.timestamps, (point) => point.tempC);
}

function getWttrDataPoints() {
    const daily = state.wttr?.weather?.[0];
    const hourly = daily?.hourly || [];
    if (!daily) {
        return [];
    }
    const baseDate = daily.date ? new Date(`${daily.date}T00:00:00`) : new Date();
    return hourly.map((entry, index) => {
        const timeRaw = entry.time != null ? Number(entry.time) : index * 300;
        const offsetHours = Number.isNaN(timeRaw) ? index * 3 : timeRaw / 100;
        const timestamp = baseDate.getTime() + offsetHours * 3600 * 1000;
        return {
            time: timestamp,
            tempC: entry.tempC != null ? parseFloat(entry.tempC) : null,
            weatherCode: entry.weatherCode != null ? parseInt(entry.weatherCode, 10) : null,
            humidity: entry.humidity != null ? parseFloat(entry.humidity) : null,
            windMps: entry.windspeedKmph != null ? parseFloat(entry.windspeedKmph) / 3.6 : null
        };
    });
}

function getSevenTimerDataPoints() {
    const series = state.sevenTimer?.dataseries || [];
    if (series.length === 0) {
        return [];
    }
    const base = Date.now();
    return series.map((entry) => {
        const timestamp = base + (entry.timepoint || 0) * 3600 * 1000;
        return {
            time: timestamp,
            tempC: entry.temp2m ?? null,
            weather: entry.weather,
            windMps: entry.wind10m?.speed ?? null,
            cloudcover: entry.cloudcover
        };
    });
}

function mapToNearestSeries(points, targets, selector) {
    if (!points || points.length === 0) {
        return targets.map(() => null);
    }
    return targets.map((target) => {
        let closest = points[0];
        let minDiff = Math.abs(points[0].time - target);
        for (let index = 1; index < points.length; index += 1) {
            const candidate = points[index];
            const diff = Math.abs(candidate.time - target);
            if (diff < minDiff) {
                closest = candidate;
                minDiff = diff;
            }
        }
        const value = selector(closest);
        return value != null ? value : null;
    });
}

function buildOpenMeteoSnapshot(unitSymbol) {
    if (!state.openMeteo) {
        return null;
    }
    const current = state.openMeteo.current;
    const daily = state.openMeteo.daily;
    const now = new Date();
    const isNight = computeIsNight(now, daily?.sunrise?.[0], daily?.sunset?.[0], state.currentLocation?.utcOffsetSeconds ?? 0);
    const info = WEATHER_CODE_MAP[current.weather_code] || { label: "Unknown", iconDay: "wi-na", iconNight: "wi-na" };
    const icon = isNight ? info.iconNight : info.iconDay;
    return createProviderCard({
        name: "Open-Meteo",
        tempC: current.temperature_2m,
        icon,
        summary: info.label,
        windText: `Wind ${formatWind(current.wind_speed_10m)}`,
        humidityText: `Humidity ${Math.round(current.relative_humidity_2m)}%`,
        unitSymbol
    });
}

function buildWttrSnapshot(unitSymbol) {
    const condition = state.wttr?.current_condition?.[0];
    if (!condition) {
        return null;
    }
    const code = condition.weatherCode != null ? parseInt(condition.weatherCode, 10) : null;
    const info = (code != null && WTTR_CODE_MAP[code]) ? WTTR_CODE_MAP[code] : { label: condition.weatherDesc?.[0]?.value || "wttr.in", iconDay: "wi-na", iconNight: "wi-na" };
    const icon = info.iconDay;
    const windMps = condition.windspeedKmph != null ? parseFloat(condition.windspeedKmph) / 3.6 : null;
    const humidity = condition.humidity != null ? `Humidity ${condition.humidity}%` : "Humidity --";
    const summary = condition.weatherDesc?.[0]?.value || info.label;
    return createProviderCard({
        name: "wttr.in",
        tempC: condition.temp_C != null ? parseFloat(condition.temp_C) : null,
        icon,
        summary,
        windText: windMps != null ? `Wind ${formatWind(windMps)}` : "Wind --",
        humidityText: humidity,
        unitSymbol
    });
}

function buildSevenTimerSnapshot(unitSymbol) {
    const entry = state.sevenTimer?.dataseries?.[0];
    if (!entry) {
        return null;
    }
    const mapping = entry.weather ? SEVENTIMER_MAP[entry.weather] : null;
    const icon = mapping ? mapping.iconDay : "wi-na";
    const summary = mapping ? mapping.label : "7timer";
    const windMps = entry.wind10m?.speed ?? null;
    const cloudPercent = entry.cloudcover != null ? Math.round((entry.cloudcover / 9) * 100) : null;
    const humidityText = cloudPercent != null ? `Clouds ${cloudPercent}%` : "Clouds --";
    return createProviderCard({
        name: "7timer",
        tempC: entry.temp2m ?? null,
        icon,
        summary,
        windText: windMps != null ? `Wind ${formatWind(windMps)}` : "Wind --",
        humidityText,
        unitSymbol
    });
}

function createProviderCard({ name, tempC, icon, summary, windText, humidityText, unitSymbol }) {
    const card = document.createElement("article");
    card.className = "provider-card";
    const temperature = tempC != null ? `${formatTemperature(tempC)}${unitSymbol}` : "--";
    card.innerHTML = `
        <div class="provider-card__header">
            <span>${name}</span>
            <span>${temperature}</span>
        </div>
        <div class="provider-card__icon" aria-hidden="true"><i class="wi ${icon}"></i></div>
        <span>${summary}</span>
        <div class="provider-card__metrics">
            <span>${windText || "Wind --"}</span>
            <span>${humidityText || "Humidity --"}</span>
        </div>
    `;
    return card;
}

function renderFavorites() {
    elements.favoritesList.innerHTML = "";
    state.favorites.forEach((favorite) => {
        const label = selectLocationName(favorite);
        const item = document.createElement("div");
        item.className = "favorite-item";
        item.dataset.lat = favorite.latitude;
        item.dataset.lon = favorite.longitude;
        item.innerHTML = `
            <span>${label}</span>
            <button type="button" aria-label="Remove ${label}">✕</button>
        `;
        item.addEventListener("click", (event) => {
            if (event.target.tagName === "BUTTON") {
                event.stopPropagation();
                removeFavorite(favorite);
                return;
            }
            loadWeatherForLocation(favorite);
        });
        elements.favoritesList.appendChild(item);
    });
}

function toggleFavoriteForCurrent() {
    if (!state.currentLocation) {
        return;
    }
    const exists = state.favorites.some((fav) => isSameLocation(fav, state.currentLocation));
    if (exists) {
        state.favorites = state.favorites.filter((fav) => !isSameLocation(fav, state.currentLocation));
        notify(`${state.currentLocation.name} removed from favorites.`);
    } else {
        const entry = {
            name: state.currentLocation.name,
            rawName: state.currentLocation.rawName,
            address: state.currentLocation.address,
            latitude: state.currentLocation.latitude,
            longitude: state.currentLocation.longitude
        };
        state.favorites.unshift(entry);
        notify(`${state.currentLocation.name} added to favorites.`);
    }
    saveFavorites(state.favorites);
    renderFavorites();
    updateFavoriteButton();
}

function removeFavorite(favorite) {
    state.favorites = state.favorites.filter((entry) => !isSameLocation(entry, favorite));
    saveFavorites(state.favorites);
    renderFavorites();
    updateFavoriteButton();
}

function updateFavoriteButton() {
    if (!state.currentLocation) {
        elements.toggleFavorite.disabled = true;
        return;
    }
    const exists = state.favorites.some((fav) => isSameLocation(fav, state.currentLocation));
    elements.toggleFavorite.textContent = exists ? "Remove from favorites" : "+ Add to favorites";
    elements.toggleFavorite.disabled = false;
}

function isSameLocation(a, b) {
    return Math.abs(a.latitude - b.latitude) < 0.0001 && Math.abs(a.longitude - b.longitude) < 0.0001;
}

function updateMap() {
    if (!state.currentLocation) {
        return;
    }
    const { latitude, longitude, name } = state.currentLocation;
    if (!state.map) {
        state.map = L.map(elements.mapContainer).setView([latitude, longitude], 9);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors"
        }).addTo(state.map);
    } else {
        state.map.setView([latitude, longitude], 9);
    }

    if (state.mapLayer) {
        state.mapLayer.remove();
    }

    const feature = {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
        },
        properties: { name }
    };

    state.mapLayer = L.geoJSON(feature, {
        pointToLayer: (_, latlng) => L.circleMarker(latlng, {
            radius: 9,
            color: "#5ad0ff",
            weight: 2,
            fillColor: "#5ad0ff",
            fillOpacity: 0.6
        })
    }).addTo(state.map);

    state.mapLayer.eachLayer((layer) => {
        layer.bindPopup(name).openPopup();
    });

    queueMapResize();
}

function queueMapResize() {
    if (!state.map) {
        return;
    }
    requestAnimationFrame(() => {
        if (state.map) {
            state.map.invalidateSize();
        }
    });
}

function updateBackground(temperatureC, isNight) {
    const app = elements.app;
    let gradient;
    if (isNight) {
        gradient = "linear-gradient(135deg, rgba(8,11,30,0.95), rgba(30,20,60,0.85))";
    } else if (temperatureC <= 0) {
        gradient = "linear-gradient(135deg, rgba(45,95,255,0.92), rgba(12,20,45,0.85))";
    } else if (temperatureC <= 15) {
        gradient = "linear-gradient(135deg, rgba(80,160,255,0.92), rgba(10,30,60,0.8))";
    } else if (temperatureC <= 28) {
        gradient = "linear-gradient(135deg, rgba(120,200,255,0.92), rgba(40,80,120,0.75))";
    } else {
        gradient = "linear-gradient(135deg, rgba(255,140,102,0.92), rgba(120,40,40,0.75))";
    }
    app.style.background = `${gradient}, radial-gradient(circle at top, rgba(90,208,255,0.25), transparent 55%)`;
}

function computeIsNight(now, sunriseIso, sunsetIso, utcOffsetSeconds = 0) {
    if (!sunriseIso || !sunsetIso) {
        return now.getHours() < 6 || now.getHours() >= 20;
    }
    const sunrise = new Date(sunriseIso).getTime() - utcOffsetSeconds * 1000 + now.getTimezoneOffset() * 60000;
    const sunset = new Date(sunsetIso).getTime() - utcOffsetSeconds * 1000 + now.getTimezoneOffset() * 60000;
    const current = now.getTime();
    return current < sunrise || current > sunset;
}

function isNightAtDate(date, sunrises, sunsets, utcOffsetSeconds = 0) {
    if (!sunrises || !sunsets) {
        return date.getHours() < 6 || date.getHours() >= 20;
    }
    const index = sunrises.findIndex((value) => sameDay(new Date(value), date));
    const sunrise = new Date(index >= 0 ? sunrises[index] : sunrises[0]);
    const sunset = new Date(index >= 0 ? sunsets[index] : sunsets[0]);
    const sunriseLocal = sunrise.getTime() - utcOffsetSeconds * 1000 + date.getTimezoneOffset() * 60000;
    const sunsetLocal = sunset.getTime() - utcOffsetSeconds * 1000 + date.getTimezoneOffset() * 60000;
    const current = date.getTime();
    return current < sunriseLocal || current > sunsetLocal;
}

function sameDay(a, b) {
    return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() === b.getUTCDate();
}

function formatTemperature(valueC) {
    if (valueC == null || Number.isNaN(valueC)) {
        return "--";
    }
    return `${Math.round(convertTemperature(valueC))}`;
}

function formatUnitSymbol() {
    switch (state.unit) {
        case "fahrenheit":
            return "°F";
        case "kelvin":
            return "K";
        default:
            return "°C";
    }
}

function convertTemperature(valueC) {
    switch (state.unit) {
        case "fahrenheit":
            return valueC * 9 / 5 + 32;
        case "kelvin":
            return valueC + 273.15;
        default:
            return valueC;
    }
}

function formatWind(speedMetersPerSecond) {
    if (speedMetersPerSecond == null || Number.isNaN(speedMetersPerSecond)) {
        return "--";
    }
    if (state.unit === "fahrenheit") {
        const mph = speedMetersPerSecond * 2.23694;
        return `${mph.toFixed(1)} mph`;
    }
    const kmh = speedMetersPerSecond * 3.6;
    return `${kmh.toFixed(1)} km/h`;
}

function handleSearchInput(event) {
    const query = event.target.value.trim();
    if (query.length < 3) {
        hideSuggestions();
        return;
    }
    fetchSuggestions(query);
}

async function fetchSuggestions(query) {
    if (suggestionAbortController) {
        suggestionAbortController.abort();
    }
    suggestionAbortController = new AbortController();
    try {
        const results = await geocodeSearch(query, suggestionAbortController.signal);
        if (results.length === 0) {
            hideSuggestions();
            return;
        }
        elements.suggestions.innerHTML = "";
        results.slice(0, 5).forEach((result) => {
            const item = document.createElement("li");
            item.textContent = result.name;
            item.setAttribute("role", "option");
            item.addEventListener("click", () => {
                elements.searchInput.value = result.name;
                hideSuggestions();
                loadWeatherForLocation(result);
            });
            elements.suggestions.appendChild(item);
        });
        elements.suggestions.classList.add("suggestions--visible");
    } catch (error) {
        if (error.name === "AbortError") {
            return;
        }
        console.error(error);
        hideSuggestions();
    }
}

function hideSuggestions() {
    elements.suggestions.classList.remove("suggestions--visible");
    elements.suggestions.innerHTML = "";
}

async function geocodeSearch(query, signal) {
    const url = new URL("https://geocode.maps.co/search");
    url.searchParams.set("q", query);
    url.searchParams.set("limit", "5");
    const response = await fetch(url.toString(), { signal });
    if (!response.ok) {
        throw new Error("Geocoding failed");
    }
    const data = await response.json();
    return data.map((entry) => buildLocationFromGeocode(entry, query));
}

async function reverseGeocode(latitude, longitude) {
    try {
        const url = new URL("https://geocode.maps.co/reverse");
        url.searchParams.set("lat", latitude);
        url.searchParams.set("lon", longitude);
        const response = await fetch(url.toString());
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return selectLocationName({
            name: data.display_name,
            address: data.address,
            latitude,
            longitude
        }) || `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function fetchOpenMeteo(latitude, longitude) {
    const params = new URLSearchParams({
        latitude: latitude.toFixed(4),
        longitude: longitude.toFixed(4),
        current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m",
        hourly: "temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m",
        daily: "temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,sunrise,sunset",
        forecast_days: "7",
        timezone: "auto"
    });
    const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Open-Meteo request failed");
    }
    return response.json();
}

async function fetchWttr(latitude, longitude) {
    try {
        const url = `https://wttr.in/${latitude.toFixed(4)},${longitude.toFixed(4)}?format=j1`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("wttr request failed");
        }
        return response.json();
    } catch (error) {
        console.error("wttr error", error);
        return null;
    }
}

async function fetchSevenTimer(latitude, longitude) {
    try {
        const url = `https://www.7timer.info/bin/api.pl?lat=${latitude.toFixed(4)}&lon=${longitude.toFixed(4)}&product=meteo&output=json`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("7timer request failed");
        }
        return response.json();
    } catch (error) {
        console.error("7timer error", error);
        return null;
    }
}

async function autoDetectByIP() {
    try {
        const response = await fetch("http://ip-api.com/json/?fields=status,message,city,lat,lon");
        const data = await response.json();
        if (data.status !== "success") {
            throw new Error(data.message || "IP lookup failed");
        }
        const name = data.city ? `${data.city}` : `Lat ${data.lat.toFixed(2)}, Lon ${data.lon.toFixed(2)}`;
        await loadWeatherForLocation({ name, latitude: data.lat, longitude: data.lon });
    } catch (error) {
        console.error(error);
        notify("Automatic detection failed.");
    }
}

function notify(message) {
    if (!message) {
        return;
    }
    console.info(message);
    if (elements.liveRegion) {
        elements.liveRegion.textContent = message;
        setTimeout(() => {
            if (elements.liveRegion.textContent === message) {
                elements.liveRegion.textContent = "";
            }
        }, 1600);
    }
}

function buildLocationFromGeocode(entry, fallbackQuery) {
    const latitude = parseFloat(entry.lat);
    const longitude = parseFloat(entry.lon);
    const rawName = entry.display_name || entry.name || fallbackQuery;
    const address = entry.address || null;
    return {
        name: selectLocationName({
            name: rawName,
            rawName,
            address,
            latitude,
            longitude
        }) || rawName || fallbackQuery,
        rawName,
        address,
        latitude,
        longitude
    };
}

function selectLocationName(location) {
    if (!location) {
        return "";
    }
    const address = location.address || null;
    const baseName = location.rawName || location.name;
    const fromAddress = formatLocationFromAddress(address);
    if (fromAddress) {
        return fromAddress;
    }
    const compact = compactLocationString(baseName);
    if (compact) {
        return compact;
    }
    if (location.latitude != null && location.longitude != null) {
        return `${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)}`;
    }
    return baseName || "";
}

function formatLocationFromAddress(address) {
    if (!address) {
        return null;
    }
    const locality = address.city || address.town || address.village || address.hamlet || address.municipality || address.locality || address.suburb || address.neighbourhood;
    const admin = address.state || address.state_district || address.province || address.region || address.county;
    const country = address.country;
    const parts = [];
    if (locality) {
        parts.push(locality);
    } else if (address.name) {
        parts.push(address.name);
    }
    if (admin && admin !== country && admin !== parts[0]) {
        parts.push(admin);
    }
    if (country && country !== parts[0]) {
        parts.push(country);
    }
    const unique = [...new Set(parts.filter(Boolean))];
    if (unique.length > 0) {
        return unique.join(", ");
    }
    return null;
}

function compactLocationString(input) {
    if (!input || typeof input !== "string") {
        return null;
    }
    const parts = input.split(",").map((part) => part.trim()).filter(Boolean);
    if (parts.length === 0) {
        return null;
    }
    if (parts.length === 1) {
        return parts[0];
    }
    const locality = parts[0];
    const country = parts[parts.length - 1];
    const admin = parts.slice(1, -1).find((part) => !/^(?:[A-Z]{1,3}\s?\d{1,3}|[\d\-]+)$/.test(part));
    const result = [locality];
    if (admin && admin !== locality && admin !== country) {
        result.push(admin);
    }
    if (country && country !== locality) {
        result.push(country);
    }
    return [...new Set(result)].join(", ");
}

function showLoader(visible) {
    if (visible) {
        elements.loader.classList.add("loader--visible");
        elements.loader.setAttribute("aria-hidden", "false");
    } else {
        elements.loader.classList.remove("loader--visible");
        elements.loader.setAttribute("aria-hidden", "true");
    }
}

function loadFavorites() {
    try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        if (!stored) {
            return [];
        }
        return JSON.parse(stored);
    } catch (error) {
        console.error("Failed to parse favorites", error);
        return [];
    }
}

function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function loadUnit() {
    const stored = localStorage.getItem(UNIT_KEY);
    if (stored === "fahrenheit" || stored === "kelvin") {
        return stored;
    }
    return "celsius";
}

function saveUnit(unit) {
    localStorage.setItem(UNIT_KEY, unit);
}

function applyUnitToggleState() {
    elements.unitToggleButtons.forEach((button) => {
        const isSelected = button.dataset.unit === state.unit;
        button.setAttribute("aria-checked", String(isSelected));
    });
    if (elements.currentUnit) {
        elements.currentUnit.textContent = formatUnitSymbol();
    }
}

function debounce(callback, delay = 200) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback.apply(null, args);
        }, delay);
    };
}
