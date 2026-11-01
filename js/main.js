var TICKETMASTER_KEY = "VwECw2OiAzxVzIqnwmKJUG41FbeXJk1y";
var EXCHANGE_KEY = "805842951e5953ad31497176";

var navItems = document.querySelectorAll(".nav-item");
var views = document.querySelectorAll(".view");
var pageTitle = document.getElementById("page-title");
var pageSubtitle = document.getElementById("page-subtitle");
var currentDatetime = document.getElementById("current-datetime");
var sidebar = document.getElementById("sidebar");
var sidebarOverlay = document.getElementById("sidebar-overlay");
var mobileMenuBtn = document.getElementById("mobile-menu-btn");
var loadingOverlay = document.getElementById("loading-overlay");
var loadingText = document.getElementById("loading-text");
var toastContainer = document.getElementById("toast-container");

var statHolidays = document.getElementById("stat-holidays");
var statSaved = document.getElementById("stat-saved");
var exploreBtn = document.getElementById("global-search-btn");
var selectedDestination = document.getElementById("selected-destination");
var selectedCountryFlag = document.getElementById("selected-country-flag");
var selectedCountryName = document.getElementById("selected-country-name");
var selectedCityName = document.getElementById("selected-city-name");
var clearSelectionBtn = document.getElementById("clear-selection-btn");
var dashboardCountryInfo = document.getElementById("dashboard-country-info");

var holidaysContent = document.getElementById("holidays-content");
var eventsContent = document.getElementById("events-content");
var weatherContent = document.getElementById("weather-content");
var lwContent = document.getElementById("lw-content");
var sunTimesContent = document.getElementById("sun-times-content");
var plansContent = document.getElementById("plans-content");

var currencyAmount = document.getElementById("currency-amount");
var swapBtn = document.getElementById("swap-currencies-btn");
var convertBtn = document.getElementById("convert-btn");
var currencyResult = document.getElementById("currency-result");
var popularCurrencies = document.getElementById("popular-currencies");

var plansCount = document.getElementById("plans-count");
var clearAllPlansBtn = document.getElementById("clear-all-plans-btn");
var planFilters = document.querySelectorAll(".plan-filter");

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var egyptCities = [
    { value: "", text: "Select City" },
    { value: "Cairo", text: "Cairo" },
    { value: "Alexandria", text: "Alexandria" }
];
var cityCoords = {
    Cairo: [30.0444, 31.2357],
    Alexandria: [31.2001, 29.9187]
};

var viewInfo = {
    "dashboard": ["Dashboard", "Welcome back! Ready to plan your next adventure?"],
    "holidays": ["Holidays", "Explore public holidays around the world"],
    "events": ["Events", "Find concerts, sports, and entertainment"],
    "weather": ["Weather", "Check forecasts for any destination"],
    "long-weekends": ["Long Weekends", "Find the perfect mini-trip opportunities"],
    "currency": ["Currency", "Convert currencies with live exchange rates"],
    "sun-times": ["Sun Times", "Check sunrise and sunset times worldwide"],
    "my-plans": ["My Plans", "Your saved holidays and events"]
};

var viewContainers = {
    "holidays": holidaysContent,
    "events": eventsContent,
    "weather": weatherContent,
    "long-weekends": lwContent,
    "sun-times": sunTimesContent
};

var viewIcons = {
    "holidays": "fa-calendar-days",
    "events": "fa-ticket",
    "weather": "fa-cloud-sun",
    "long-weekends": "fa-umbrella-beach",
    "sun-times": "fa-sun"
};

var weatherCodes = {
    0: ["Clear sky", "fa-sun", "sunny"],
    1: ["Mainly clear", "fa-cloud-sun", "sunny"],
    2: ["Partly cloudy", "fa-cloud-sun", "cloudy"],
    3: ["Overcast", "fa-cloud", "cloudy"],
    45: ["Fog", "fa-smog", "foggy"],
    48: ["Depositing rime fog", "fa-smog", "foggy"],
    51: ["Light drizzle", "fa-cloud-rain", "rainy"],
    53: ["Moderate drizzle", "fa-cloud-rain", "rainy"],
    55: ["Dense drizzle", "fa-cloud-rain", "rainy"],
    56: ["Freezing drizzle", "fa-cloud-rain", "rainy"],
    57: ["Freezing drizzle", "fa-cloud-rain", "rainy"],
    61: ["Slight rain", "fa-cloud-rain", "rainy"],
    63: ["Moderate rain", "fa-cloud-rain", "rainy"],
    65: ["Heavy rain", "fa-cloud-showers-heavy", "rainy"],
    66: ["Freezing rain", "fa-cloud-rain", "rainy"],
    67: ["Freezing rain", "fa-cloud-showers-heavy", "rainy"],
    71: ["Slight snow", "fa-snowflake", "snowy"],
    73: ["Moderate snow", "fa-snowflake", "snowy"],
    75: ["Heavy snow", "fa-snowflake", "snowy"],
    77: ["Snow grains", "fa-snowflake", "snowy"],
    80: ["Slight rain showers", "fa-cloud-rain", "rainy"],
    81: ["Moderate rain showers", "fa-cloud-showers-heavy", "rainy"],
    82: ["Violent rain showers", "fa-cloud-showers-heavy", "rainy"],
    85: ["Slight snow showers", "fa-snowflake", "snowy"],
    86: ["Heavy snow showers", "fa-snowflake", "snowy"],
    95: ["Thunderstorm", "fa-cloud-bolt", "stormy"],
    96: ["Thunderstorm with hail", "fa-cloud-bolt", "stormy"],
    99: ["Thunderstorm with heavy hail", "fa-cloud-bolt", "stormy"]
};

var currencyNames = {
    USD: "US Dollar", EUR: "Euro", GBP: "British Pound", EGP: "Egyptian Pound",
    AED: "UAE Dirham", SAR: "Saudi Riyal", JPY: "Japanese Yen", CAD: "Canadian Dollar",
    INR: "Indian Rupee", AUD: "Australian Dollar", CHF: "Swiss Franc", CNY: "Chinese Yuan",
    TRY: "Turkish Lira", KWD: "Kuwaiti Dinar", QAR: "Qatari Riyal", BHD: "Bahraini Dinar",
    OMR: "Omani Rial", JOD: "Jordanian Dinar", MAD: "Moroccan Dirham", RUB: "Russian Ruble",
    BRL: "Brazilian Real", MXN: "Mexican Peso", KRW: "South Korean Won", SGD: "Singapore Dollar",
    HKD: "Hong Kong Dollar", NZD: "New Zealand Dollar", SEK: "Swedish Krona", NOK: "Norwegian Krone",
    DKK: "Danish Krone", PLN: "Polish Zloty", CZK: "Czech Koruna", HUF: "Hungarian Forint",
    ZAR: "South African Rand", THB: "Thai Baht", MYR: "Malaysian Ringgit", IDR: "Indonesian Rupiah",
    PHP: "Philippine Peso", ILS: "Israeli Shekel", PKR: "Pakistani Rupee"
};

var popularCodes = ["EUR", "GBP", "EGP", "AED", "SAR", "JPY", "CAD", "INR"];
var popularFlags = { EUR: "eu", GBP: "gb", EGP: "eg", AED: "ae", SAR: "sa", JPY: "jp", CAD: "ca", INR: "in" };

var selected = { code: "", name: "", city: "", year: 2026 };
var destination = null; 
var countryCache = {};
var holidaysCache = {};
var loadedKey = {};    
var holidaysData = [];
var lwData = [];
var eventsData = [];
var plans = JSON.parse(localStorage.getItem("wanderlustPlans")) || [];
var currentFilter = "all";
var rates = null;        
var localTimeTimer = null;
var localOffsetMs = 0;


async function getJSON(url) {
    var response = await fetch(url);
    if (response.status === 204) {
        return [];
    }
    if (!response.ok) {
        throw new Error("Request failed: " + response.status);
    }
    return await response.json();
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function pad(number) {
    return number < 10 ? "0" + number : "" + number;
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function flagUrl(code, size) {
    return "https://flagcdn.com/w" + size + "/" + code.toLowerCase() + ".png";
}

function parseDate(text) {
    var parts = text.split("-");
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
}

function formatDate(text) {
    var d = parseDate(text);
    return monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

function formatTime(ms) {
    var d = new Date(ms);
    var h = d.getUTCHours();
    var m = pad(d.getUTCMinutes());
    var ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return pad(h) + ":" + m + " " + ampm;
}

function formatDuration(seconds) {
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    return h + "h " + m + "m";
}

function formatTimeString(text) {
    var h = parseInt(text.slice(11, 13));
    var m = text.slice(14, 16);
    var ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return pad(h) + ":" + m + " " + ampm;
}

function formatHour(h) {
    if (h === 0) return "12 AM";
    if (h < 12) return h + " AM";
    if (h === 12) return "12 PM";
    return (h - 12) + " PM";
}

function showToast(message, type) {
    var icons = { success: "fa-circle-check", error: "fa-circle-exclamation", info: "fa-circle-info" };
    var toast = document.createElement("div");
    toast.className = "toast " + type;
    toast.innerHTML = `<i class="fa-solid ${icons[type]}"></i>
        <span>${escapeHtml(message)}</span>
        <button class="toast-close"><i class="fa-solid fa-xmark"></i></button>`;
    toast.querySelector(".toast-close").addEventListener("click", function () {
        toast.remove();
    });
    toastContainer.appendChild(toast);
    setTimeout(function () {
        toast.remove();
    }, 3500);
}

function showLoading(text) {
    loadingText.textContent = text;
    loadingOverlay.classList.remove("hidden");
}

function hideLoading() {
    loadingOverlay.classList.add("hidden");
}

function emptyStateHTML(icon, title, text, withButton) {
    var button = withButton
        ? `<button class="btn-primary go-dashboard-btn"><i class="fa-solid fa-compass"></i> Start Exploring</button>`
        : "";
    return `<div class="empty-state">
        <div class="empty-icon"><i class="fa-solid ${icon}"></i></div>
        <h3>${title}</h3>
        <p>${text}</p>
        ${button}
    </div>`;
}

function showNoDestination(name) {
    viewContainers[name].innerHTML = emptyStateHTML(
        viewIcons[name],
        "No Destination Selected",
        "Select a country from the Dashboard and press Explore first.",
        true
    );
}

function showError(container, message) {
    container.innerHTML = emptyStateHTML("fa-triangle-exclamation", "Something went wrong", message, false);
}


var allSelects = [];

function createSelect(originalElement, config) {
    var isSimple = config.type === "simple";
    var triggerClass = isSimple ? "simple-select-trigger" : "custom-select-trigger";
    var dropdownClass = isSimple ? "simple-select-dropdown" : "custom-select-dropdown";
    var optionClass = isSimple ? "simple-select-option" : "custom-select-option";
    var wrapperClass = isSimple ? "simple-select-wrapper" : "custom-select-wrapper";

    var wrapper = document.createElement("div");
    wrapper.className = wrapperClass;
    if (originalElement.id) wrapper.id = originalElement.id;

    originalElement.parentNode.replaceChild(wrapper, originalElement);

    var searchHTML = "";
    if (config.search) {
        searchHTML = `<div class="custom-select-search">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="${config.searchPlaceholder}">
        </div>`;
    }
    var iconHTML = isSimple ? `<i class="select-icon ${config.icon}"></i>` : `<span class="flag"></span>`;
    var optionsClass = isSimple ? "" : "custom-select-options";

    wrapper.innerHTML = `
        <div class="${triggerClass}">
            ${iconHTML}
            <span class="selected-text placeholder">${config.placeholder}</span>
            <i class="fa-solid fa-chevron-down arrow"></i>
        </div>
        <div class="${dropdownClass}">
            ${searchHTML}
            <div class="${optionsClass}"></div>
        </div>`;

    var trigger = wrapper.querySelector("." + triggerClass);
    var dropdown = wrapper.querySelector("." + dropdownClass);
    var optionsBox = dropdown.lastElementChild;
    var searchInput = wrapper.querySelector(".custom-select-search input");
    var selectedText = trigger.querySelector(".selected-text");
    var flagBox = trigger.querySelector(".flag");

    var select = { items: [], value: "", disabled: false };

    function optionInner(item) {
        if (isSimple) {
            return escapeHtml(item.text);
        }
        var flag = item.flag ? `<img class="flag-img" src="${item.flag}" alt="">` : "";
        return `<span class="flag">${flag}</span>
            <span class="country-name">${escapeHtml(item.text)}</span>
            <span class="country-code">${escapeHtml(item.code || "")}</span>`;
    }

    function renderOptions(filter) {
        var text = (filter || "").toLowerCase();
        var html = "";
        var count = 0;
        for (var i = 0; i < select.items.length; i++) {
            var item = select.items[i];
            var searchable = (item.text + " " + (item.code || "")).toLowerCase();
            if (text && searchable.indexOf(text) === -1) {
                continue;
            }
            var selectedClass = item.value === select.value ? " selected" : "";
            html += `<div class="${optionClass}${selectedClass}" data-value="${escapeHtml(item.value)}">${optionInner(item)}</div>`;
            count++;
        }
        if (count === 0) {
            html = `<div class="${optionClass} no-results">No results found</div>`;
        }
        optionsBox.innerHTML = html;
    }

    function open() {
        if (select.disabled) return;
        closeAllSelects();
        trigger.classList.add("open");
        dropdown.classList.add("open");
        renderOptions("");
        if (searchInput) {
            searchInput.value = "";
            searchInput.focus();
        }
    }

    function close() {
        trigger.classList.remove("open");
        dropdown.classList.remove("open");
    }

    select.setItems = function (items) {
        select.items = items;
        renderOptions("");
    };

    select.reset = function () {
        select.value = "";
        selectedText.textContent = config.placeholder;
        selectedText.classList.add("placeholder");
        if (flagBox) flagBox.innerHTML = "";
    };

    select.setValue = function (value, fire) {
        var found = null;
        for (var i = 0; i < select.items.length; i++) {
            if (select.items[i].value === value) {
                found = select.items[i];
            }
        }
        if (!found) return;
        if (value === "") {
            select.reset();
        } else {
            select.value = value;
            selectedText.textContent = found.text;
            selectedText.classList.remove("placeholder");
            if (flagBox) {
                flagBox.innerHTML = found.flag ? `<img class="flag-img" src="${found.flag}" alt="">` : "";
            }
        }
        if (fire && config.onChange) {
            config.onChange(found);
        }
    };

    select.setDisabled = function (disabled) {
        select.disabled = disabled;
        trigger.classList.toggle("disabled", disabled);
        if (disabled) close();
    };

    trigger.addEventListener("click", function () {
        if (dropdown.classList.contains("open")) {
            close();
        } else {
            open();
        }
    });

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            renderOptions(searchInput.value);
        });
    }

    optionsBox.addEventListener("click", function (e) {
        var option = e.target.closest("." + optionClass);
        if (!option || option.classList.contains("no-results")) return;
        select.setValue(option.getAttribute("data-value"), true);
        close();
    });

    allSelects.push({ wrapper: wrapper, close: close });
    return select;
}

function closeAllSelects() {
    for (var i = 0; i < allSelects.length; i++) {
        allSelects[i].close();
    }
}

document.addEventListener("click", function (e) {
    for (var i = 0; i < allSelects.length; i++) {
        if (!allSelects[i].wrapper.contains(e.target)) {
            allSelects[i].close();
        }
    }
});


var countrySelect = createSelect(document.getElementById("global-country"), {
    type: "custom",
    search: true,
    placeholder: "Select Country",
    searchPlaceholder: "Search countries...",
    onChange: onCountryChange
});

var citySelect = createSelect(document.getElementById("global-city"), {
    type: "simple",
    icon: "fa-solid fa-city",
    placeholder: "Select City",
    onChange: onCityChange
});

var yearSelect = createSelect(document.getElementById("global-year"), {
    type: "simple",
    icon: "fa-solid fa-calendar",
    placeholder: "Select Year",
    onChange: onYearChange
});

var currencyFromSelect = createSelect(document.getElementById("currency-from"), {
    type: "custom",
    search: true,
    placeholder: "From",
    searchPlaceholder: "Search currency..."
});

var currencyToSelect = createSelect(document.getElementById("currency-to"), {
    type: "custom",
    search: true,
    placeholder: "To",
    searchPlaceholder: "Search currency..."
});


function showView(name) {
    for (var i = 0; i < views.length; i++) {
        views[i].classList.toggle("active", views[i].id === name + "-view");
    }
    for (var j = 0; j < navItems.length; j++) {
        navItems[j].classList.toggle("active", navItems[j].getAttribute("data-view") === name);
    }
    pageTitle.textContent = viewInfo[name][0];
    pageSubtitle.textContent = viewInfo[name][1];
    closeSidebar();
    window.scrollTo(0, 0);
    loadView(name);
}

function destKey() {
    if (!destination) return "";
    return destination.code + "|" + destination.city + "|" + destination.year;
}

function loadView(name) {
    if (name === "dashboard") return;
    if (name === "currency") {
        loadCurrency();
        return;
    }
    if (name === "my-plans") {
        renderPlans();
        return;
    }
    if (!destination) {
        showNoDestination(name);
        return;
    }
    var key = destKey();
    if (loadedKey[name] === key) return;
    loadedKey[name] = key;

    if (name === "holidays") loadHolidays();
    if (name === "events") loadEvents();
    if (name === "weather") loadWeather();
    if (name === "long-weekends") loadLongWeekends();
    if (name === "sun-times") loadSunTimes();
}

for (var n = 0; n < navItems.length; n++) {
    navItems[n].addEventListener("click", function (e) {
        e.preventDefault();
        showView(this.getAttribute("data-view"));
    });
}

function openSidebar() {
    sidebar.classList.add("open");
    sidebarOverlay.classList.remove("hidden");
    sidebarOverlay.classList.add("active");
}

function closeSidebar() {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
    sidebarOverlay.classList.add("hidden");
}

mobileMenuBtn.addEventListener("click", openSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

document.addEventListener("click", function (e) {
    if (e.target.closest(".go-dashboard-btn")) {
        showView("dashboard");
    }
});


function updateClock() {
    var now = new Date();
    currentDatetime.textContent = dayNames[now.getDay()].slice(0, 3) + ", " +
        monthNames[now.getMonth()] + " " + now.getDate() + ", " +
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function onCountryChange(item) {
    selected.code = item.value;
    selected.name = item.text;
    selected.city = "";
    citySelect.reset();
    if (item.value === "EG") {
        citySelect.setItems(egyptCities);
        citySelect.setDisabled(false);
    } else {
        citySelect.setItems([]);
        citySelect.setDisabled(true);
    }
    updateSelectedDestination();
}

function onCityChange(item) {
    selected.city = item.value;
    updateSelectedDestination();
}

function onYearChange(item) {
    selected.year = parseInt(item.value);
}

function updateSelectedDestination() {
    if (!selected.code) {
        selectedDestination.classList.add("hidden");
        return;
    }
    selectedDestination.classList.remove("hidden");
    selectedCountryFlag.setAttribute("src", flagUrl(selected.code, 80));
    selectedCountryFlag.setAttribute("alt", selected.name);
    selectedCountryName.textContent = selected.name;
    selectedCityName.textContent = selected.city ? "• " + selected.city : "";
}

function updateBadges() {
    var badges = document.querySelectorAll(".current-selection-badge");
    for (var i = 0; i < badges.length; i++) {
        if (!destination) {
            badges[i].classList.add("hidden");
            continue;
        }
        badges[i].classList.remove("hidden");
        var viewId = badges[i].closest(".view").id;
        var extra = "";
        if (viewId === "holidays-view" || viewId === "long-weekends-view") {
            extra = `<span class="selection-year">${destination.year}</span>`;
        } else if (destination.city) {
            extra = `<span class="selection-city">• ${destination.city}</span>`;
        }
        badges[i].innerHTML = `<img src="${flagUrl(destination.code, 40)}" alt="${escapeHtml(destination.name)}" class="selection-flag">
            <span>${escapeHtml(destination.name)}</span>${extra}`;
    }
}

exploreBtn.addEventListener("click", function () {
    if (!selected.code) {
        showToast("Please select a country first", "error");
        return;
    }
    destination = { code: selected.code, name: selected.name, city: selected.city, year: selected.year };
    loadedKey = {};
    updateBadges();
    loadCountryInfo();
    updateHolidayStat();
    var place = destination.city ? destination.name + ", " + destination.city : destination.name;
    showToast("Exploring " + place, "success");
});

clearSelectionBtn.addEventListener("click", function () {
    selected.code = "";
    selected.name = "";
    selected.city = "";
    destination = null;
    loadedKey = {};
    countrySelect.reset();
    citySelect.reset();
    citySelect.setItems([]);
    citySelect.setDisabled(true);
    updateSelectedDestination();
    updateBadges();
    showCountryPlaceholder();
    for (var name in viewContainers) {
        showNoDestination(name);
    }
    clearInterval(localTimeTimer);
    showToast("Selection cleared", "info");
});


async function getCountry(code) {
    if (countryCache[code]) {
        return countryCache[code];
    }
    var data = await getJSON("https://restcountries.com/v3.1/alpha/" + code);
    var countryData = Array.isArray(data) ? data[0] : data;
    if (!countryData) throw new Error("No data received");
    countryCache[code] = countryData;
    return countryData;
}

function showCountryPlaceholder() {
    dashboardCountryInfo.innerHTML = `<div class="country-info-placeholder">
        <div class="placeholder-icon"><i class="fa-solid fa-globe"></i></div>
        <p>Select a country to view detailed information</p>
    </div>`;
}

async function loadCountryInfo() {
    var code = destination.code;
    dashboardCountryInfo.innerHTML = `<div class="country-info-loading">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <p>Loading country information...</p>
    </div>`;
    try {
        var country = await getCountry(code);
        if (!destination || destination.code !== code) return;
        renderCountryInfo(country);
    } catch (error) {
        if (!destination || destination.code !== code) return;
        dashboardCountryInfo.innerHTML = `<div class="country-info-placeholder">
            <div class="placeholder-icon error"><i class="fa-solid fa-triangle-exclamation"></i></div>
            <p>Failed to load country information. Please try again.</p>
        </div>`;
    }
}

function parseOffset(timezone) {
    var match = /UTC([+-])(\d{2}):(\d{2})/.exec(timezone);
    if (!match) return 0;
    var ms = (parseInt(match[2]) * 60 + parseInt(match[3])) * 60000;
    return match[1] === "-" ? -ms : ms;
}

function updateLocalTime() {
    var element = document.getElementById("country-local-time");
    if (!element) return;
    var d = new Date(Date.now() + localOffsetMs);
    var h = d.getUTCHours();
    var ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    element.textContent = pad(h) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + " " + ampm;
}

function renderCountryInfo(c) {
    if (!c) return;

    var capital = c.capital && c.capital.length ? c.capital[0] : "N/A";

    var callingCode = "N/A";
    if (c.idd && c.idd.root) {
        callingCode = c.idd.root;
        if (c.idd.suffixes && c.idd.suffixes.length > 0) {
            callingCode += c.idd.suffixes.length === 1 ? c.idd.suffixes[0] : "";
        }
    }

    var drivingSide = c.car && c.car.side ? capitalize(c.car.side) : "N/A";
    var weekStart = c.startOfWeek ? capitalize(c.startOfWeek) : "N/A";
    var area = c.area ? c.area.toLocaleString("en-US") + " km²" : "N/A";
    var timezone = c.timezones && c.timezones.length ? c.timezones[0] : "UTC";
    var subregion = c.subregion ? " • " + c.subregion : "";

    var currencyTags = "";
    if (c.currencies) {
        for (var code in c.currencies) {
            var cur = c.currencies[code];
            currencyTags += `<span class="extra-tag">${escapeHtml(cur.name)} (${code}${cur.symbol ? " " + escapeHtml(cur.symbol) : ""})</span>`;
        }
    }
    if (currencyTags === "") currencyTags = `<span class="extra-tag">N/A</span>`;

    var languageTags = "";
    if (c.languages) {
        for (var lang in c.languages) {
            languageTags += `<span class="extra-tag">${escapeHtml(c.languages[lang])}</span>`;
        }
    }
    if (languageTags === "") languageTags = `<span class="extra-tag">N/A</span>`;

    var borderTags = "";
    if (c.borders) {
        for (var i = 0; i < c.borders.length; i++) {
            borderTags += `<span class="extra-tag border-tag">${c.borders[i]}</span>`;
        }
    }
    if (borderTags === "") borderTags = `<span class="extra-tag">No land borders</span>`;

    var nameCommon = c.name && c.name.common ? c.name.common : "Country";
    var nameOfficial = c.name && c.name.official ? c.name.official : nameCommon;
    var region = c.region || "N/A";
    var pop = c.population ? c.population.toLocaleString("en-US") : "N/A";
    var flagCode = c.cca2 || destination.code || "UN";
    
    var mapLink = c.maps && c.maps.googleMaps ? c.maps.googleMaps : "https://www.google.com/maps/place/" + encodeURIComponent(nameCommon);

    dashboardCountryInfo.innerHTML = `
        <div class="dashboard-country-header">
            <img src="${flagUrl(flagCode, 160)}" alt="${escapeHtml(nameCommon)}" class="dashboard-country-flag">
            <div class="dashboard-country-title">
                <h3>${escapeHtml(nameCommon)}</h3>
                <p class="official-name">${escapeHtml(nameOfficial)}</p>
                <span class="region"><i class="fa-solid fa-location-dot"></i> ${region}${subregion}</span>
            </div>
        </div>

        <div class="dashboard-local-time">
            <div class="local-time-display">
                <i class="fa-solid fa-clock"></i>
                <span class="local-time-value" id="country-local-time">--:--:--</span>
                <span class="local-time-zone">${timezone}</span>
            </div>
        </div>

        <div class="dashboard-country-grid">
            <div class="dashboard-country-detail"><i class="fa-solid fa-building-columns"></i><span class="label">Capital</span><span class="value">${escapeHtml(capital)}</span></div>
            <div class="dashboard-country-detail"><i class="fa-solid fa-users"></i><span class="label">Population</span><span class="value">${pop}</span></div>
            <div class="dashboard-country-detail"><i class="fa-solid fa-ruler-combined"></i><span class="label">Area</span><span class="value">${area}</span></div>
            <div class="dashboard-country-detail"><i class="fa-solid fa-globe"></i><span class="label">Continent</span><span class="value">${region}</span></div>
            <div class="dashboard-country-detail"><i class="fa-solid fa-phone"></i><span class="label">Calling Code</span><span class="value">${callingCode}</span></div>
            <div class="dashboard-country-detail"><i class="fa-solid fa-car"></i><span class="label">Driving Side</span><span class="value">${drivingSide}</span></div>
            <div class="dashboard-country-detail"><i class="fa-solid fa-calendar-week"></i><span class="label">Week Starts</span><span class="value">${weekStart}</span></div>
        </div>

        <div class="dashboard-country-extras">
            <div class="dashboard-country-extra">
                <h4><i class="fa-solid fa-coins"></i> Currency</h4>
                <div class="extra-tags">${currencyTags}</div>
            </div>
            <div class="dashboard-country-extra">
                <h4><i class="fa-solid fa-language"></i> Languages</h4>
                <div class="extra-tags">${languageTags}</div>
            </div>
            <div class="dashboard-country-extra">
                <h4><i class="fa-solid fa-map-location-dot"></i> Neighbors</h4>
                <div class="extra-tags">${borderTags}</div>
            </div>
        </div>

        <div class="dashboard-country-actions">
            <a href="${mapLink}" target="_blank" class="btn-map-link">
                <i class="fa-solid fa-map"></i> View on Google Maps
            </a>
        </div>`;

    localOffsetMs = parseOffset(timezone);
    clearInterval(localTimeTimer);
    updateLocalTime();
    localTimeTimer = setInterval(updateLocalTime, 1000);
}


async function getHolidays(code, year) {
    var key = code + "|" + year;
    if (holidaysCache[key]) {
        return holidaysCache[key];
    }
    var list = await getJSON("https://date.nager.at/api/v3/PublicHolidays/" + year + "/" + code);
    holidaysCache[key] = list;
    return list;
}


async function updateHolidayStat() {
    var key = destKey();
    try {
        var list = await getHolidays(destination.code, destination.year);
        if (key === destKey()) {
            statHolidays.textContent = list.length;
        }
    } catch (error) {
        console.log("Could not load holidays count");
    }
}

async function loadHolidays() {
    var key = destKey();
    showLoading("Loading holidays...");
    try {
        var list = await getHolidays(destination.code, destination.year);
        if (key !== destKey()) return;
        holidaysData = list;
        renderHolidays();
    } catch (error) {
        loadedKey["holidays"] = "";
        showError(holidaysContent, "Failed to load holidays. Please try again.");
        showToast("Failed to load holidays", "error");
    } finally {
        hideLoading();
    }
}

function renderHolidays() {
    if (holidaysData.length === 0) {
        holidaysContent.innerHTML = emptyStateHTML("fa-calendar-days", "No Holidays Found", "No public holidays found for this country.", false);
        return;
    }
    var html = "";
    for (var i = 0; i < holidaysData.length; i++) {
        var h = holidaysData[i];
        var d = parseDate(h.date);
        var type = h.types && h.types.length ? h.types[0] : "Public";
        html += `<div class="holiday-card">
            <div class="holiday-card-header">
                <div class="holiday-date-box"><span class="day">${d.getDate()}</span><span class="month">${monthNames[d.getMonth()]}</span></div>
                <button class="holiday-action-btn" data-index="${i}" data-save-id="${escapeHtml(holidayId(h))}"><i class="fa-regular fa-heart"></i></button>
            </div>
            <h3>${escapeHtml(h.localName)}</h3>
            <p class="holiday-name">${escapeHtml(h.name)}</p>
            <div class="holiday-card-footer">
                <span class="holiday-day-badge"><i class="fa-regular fa-calendar"></i> ${dayNames[d.getDay()]}</span>
                <span class="holiday-type-badge">${escapeHtml(type)}</span>
            </div>
        </div>`;
    }
    holidaysContent.innerHTML = html;
    refreshSaveButtons();
}

function holidayId(h) {
    return "holiday|" + destination.code + "|" + h.date + "|" + h.name;
}

holidaysContent.addEventListener("click", function (e) {
    var btn = e.target.closest(".holiday-action-btn");
    if (!btn) return;
    var h = holidaysData[btn.getAttribute("data-index")];
    toggleSave({
        id: holidayId(h),
        type: "holiday",
        title: h.localName,
        date: formatDate(h.date),
        detail: h.name
    });
});


async function loadLongWeekends() {
    var key = destKey();
    showLoading("Finding long weekends...");
    try {
        var list = await getJSON("https://date.nager.at/api/v3/LongWeekend/" + destination.year + "/" + destination.code);
        if (key !== destKey()) return;
        lwData = list;
        renderLongWeekends();
    } catch (error) {
        loadedKey["long-weekends"] = "";
        showError(lwContent, "Failed to load long weekends. Please try again.");
        showToast("Failed to load long weekends", "error");
    } finally {
        hideLoading();
    }
}

function lwId(lw) {
    return "longweekend|" + destination.code + "|" + lw.startDate;
}

function renderLongWeekends() {
    if (lwData.length === 0) {
        lwContent.innerHTML = emptyStateHTML("fa-umbrella-beach", "No Long Weekends Found", "No long weekends found for this year.", false);
        return;
    }
    var html = "";
    for (var i = 0; i < lwData.length; i++) {
        var lw = lwData[i];

        var infoBox = lw.needBridgeDay
            ? `<div class="lw-info-box warning"><i class="fa-solid fa-info-circle"></i> Requires taking a bridge day off</div>`
            : `<div class="lw-info-box success"><i class="fa-solid fa-check-circle"></i> No extra days off needed!</div>`;


        var daysHTML = "";
        var current = parseDate(lw.startDate);
        var end = parseDate(lw.endDate);
        while (current <= end) {
            var dow = current.getDay();
            var weekend = dow === 0 || dow === 6 ? " weekend" : "";
            daysHTML += `<div class="lw-day${weekend}"><span class="name">${dayNames[dow].slice(0, 3)}</span><span class="num">${current.getDate()}</span></div>`;
            current.setDate(current.getDate() + 1);
        }

        html += `<div class="lw-card">
            <div class="lw-card-header">
                <span class="lw-badge"><i class="fa-solid fa-calendar-days"></i> ${lw.dayCount} Days</span>
                <button class="holiday-action-btn" data-index="${i}" data-save-id="${escapeHtml(lwId(lw))}"><i class="fa-regular fa-heart"></i></button>
            </div>
            <h3>Long Weekend #${i + 1}</h3>
            <div class="lw-dates"><i class="fa-regular fa-calendar"></i> ${formatDate(lw.startDate)} - ${formatDate(lw.endDate)}</div>
            ${infoBox}
            <div class="lw-days-visual">${daysHTML}</div>
        </div>`;
    }
    lwContent.innerHTML = html;
    refreshSaveButtons();
}

lwContent.addEventListener("click", function (e) {
    var btn = e.target.closest(".holiday-action-btn");
    if (!btn) return;
    var lw = lwData[btn.getAttribute("data-index")];
    toggleSave({
        id: lwId(lw),
        type: "longweekend",
        title: lw.dayCount + " Day Long Weekend",
        date: formatDate(lw.startDate) + " - " + formatDate(lw.endDate),
        detail: lw.needBridgeDay ? "Bridge day needed" : "No extra days needed"
    });
});


async function loadEvents() {
    var key = destKey();
    showLoading("Loading events...");
    try {
        var url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + TICKETMASTER_KEY +
            "&countryCode=" + destination.code + "&size=20";
        if (destination.city) {
            url += "&city=" + encodeURIComponent(destination.city);
        }
        var data = await getJSON(url);
        if (key !== destKey()) return;
        eventsData = data._embedded && data._embedded.events ? data._embedded.events : [];
        renderEvents();
    } catch (error) {
        loadedKey["events"] = "";
        showError(eventsContent, "Failed to load events. Please try again.");
        showToast("Failed to load events", "error");
    } finally {
        hideLoading();
    }
}

function eventDateText(ev) {
    var start = ev.dates && ev.dates.start ? ev.dates.start : null;
    if (!start || !start.localDate) return "Date to be announced";
    var text = formatDate(start.localDate);
    if (start.localTime) {
        text += " at " + start.localTime.slice(0, 5);
    }
    return text;
}

function eventVenueText(ev) {
    var venue = ev._embedded && ev._embedded.venues && ev._embedded.venues.length ? ev._embedded.venues[0] : null;
    if (!venue) return "Venue to be announced";
    var text = venue.name;
    if (venue.city && venue.city.name) {
        text += ", " + venue.city.name;
    }
    return text;
}

function renderEvents() {
    if (eventsData.length === 0) {
        eventsContent.innerHTML = emptyStateHTML("fa-ticket", "No Events Found", "No events found for this location", false);
        return;
    }
    var html = "";
    for (var i = 0; i < eventsData.length; i++) {
        var ev = eventsData[i];


        var image = "";
        if (ev.images && ev.images.length) {
            image = ev.images[0].url;
            for (var j = 0; j < ev.images.length; j++) {
                if (ev.images[j].width >= 500) {
                    image = ev.images[j].url;
                    break;
                }
            }
        }
        var category = ev.classifications && ev.classifications.length && ev.classifications[0].segment
            ? ev.classifications[0].segment.name : "Event";
        var saveId = escapeHtml("event|" + ev.id);

        html += `<div class="event-card">
            <div class="event-card-image">
                <img src="${image}" alt="${escapeHtml(ev.name)}">
                <span class="event-card-category">${escapeHtml(category)}</span>
                <button class="event-card-save" data-index="${i}" data-save-id="${saveId}"><i class="fa-regular fa-heart"></i></button>
            </div>
            <div class="event-card-body">
                <h3>${escapeHtml(ev.name)}</h3>
                <div class="event-card-info">
                    <div><i class="fa-regular fa-calendar"></i>${eventDateText(ev)}</div>
                    <div><i class="fa-solid fa-location-dot"></i>${escapeHtml(eventVenueText(ev))}</div>
                </div>
                <div class="event-card-footer">
                    <button class="btn-event" data-index="${i}" data-save-id="${saveId}"><i class="fa-regular fa-heart"></i> Save</button>
                    <a href="${ev.url}" target="_blank" class="btn-buy-ticket"><i class="fa-solid fa-ticket"></i> Buy Tickets</a>
                </div>
            </div>
        </div>`;
    }
    eventsContent.innerHTML = html;
    refreshSaveButtons();
}

eventsContent.addEventListener("click", function (e) {
    var btn = e.target.closest(".event-card-save, .btn-event");
    if (!btn) return;
    var ev = eventsData[btn.getAttribute("data-index")];
    toggleSave({
        id: "event|" + ev.id,
        type: "event",
        title: ev.name,
        date: eventDateText(ev),
        detail: eventVenueText(ev)
    });
});


async function getPlace() {
    if (destination.city && cityCoords[destination.city]) {
        return { lat: cityCoords[destination.city][0], lng: cityCoords[destination.city][1], name: destination.city };
    }
    var country = await getCountry(destination.code);
    var name = country.capital && country.capital.length ? country.capital[0] : country.name.common;
    var coords = country.capitalInfo && country.capitalInfo.latlng ? country.capitalInfo.latlng : country.latlng;
    return { lat: coords[0], lng: coords[1], name: name };
}

function getWeatherInfo(code) {
    return weatherCodes[code] || ["Unknown", "fa-cloud", "default"];
}

function getCompass(degrees) {
    var directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(degrees / 45) % 8];
}

function getUvLevel(uv) {
    if (uv < 3) return ["low", "Low"];
    if (uv < 6) return ["moderate", "Moderate"];
    if (uv < 8) return ["high", "High"];
    if (uv < 11) return ["very-high", "Very High"];
    return ["extreme", "Extreme"];
}

function toMinutes(text) {
    return parseInt(text.slice(11, 13)) * 60 + parseInt(text.slice(14, 16));
}

async function loadWeather() {
    var key = destKey();
    showLoading("Loading weather...");
    try {
        var place = await getPlace();
        var url = "https://api.open-meteo.com/v1/forecast?latitude=" + place.lat + "&longitude=" + place.lng +
            "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index" +
            "&hourly=temperature_2m,weather_code,precipitation_probability" +
            "&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant" +
            "&timezone=auto";
        var data = await getJSON(url);
        if (key !== destKey()) return;
        renderWeather(data, place.name);
    } catch (error) {
        loadedKey["weather"] = "";
        showError(weatherContent, "Failed to load weather. Please try again.");
        showToast("Failed to load weather", "error");
    } finally {
        hideLoading();
    }
}

function renderWeather(data, placeName) {
    var cur = data.current;
    var daily = data.daily;
    var hourly = data.hourly;
    var info = getWeatherInfo(cur.weather_code);

    var dateText = parseDate(cur.time.slice(0, 10)).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    var uv = Math.round(cur.uv_index);
    var uvLevel = getUvLevel(cur.uv_index);
    var humidity = Math.round(cur.relative_humidity_2m);
    var rain = daily.precipitation_probability_max[0] || 0;
    var rainMm = daily.precipitation_sum[0] || 0;


    var nowMin = toMinutes(cur.time);
    var riseMin = toMinutes(daily.sunrise[0]);
    var setMin = toMinutes(daily.sunset[0]);
    var progress = (nowMin - riseMin) / (setMin - riseMin);
    progress = Math.max(0, Math.min(1, progress));
    var sunLeft = "calc(" + (progress * 100) + "% - 6px)";
    var sunBottom = Math.round(Math.sin(progress * Math.PI) * 34) + "px";


    var hourlyHTML = `<div class="hourly-item now">
        <span class="hourly-time">Now</span>
        <div class="hourly-icon"><i class="fa-solid ${info[1]}"></i></div>
        <span class="hourly-temp">${Math.round(cur.temperature_2m)}°</span>
    </div>`;
    var startIndex = 0;
    for (var i = 0; i < hourly.time.length; i++) {
        if (hourly.time[i].slice(0, 13) === cur.time.slice(0, 13)) {
            startIndex = i;
        }
    }
    for (var j = startIndex + 1; j <= startIndex + 24 && j < hourly.time.length; j++) {
        var hourInfo = getWeatherInfo(hourly.weather_code[j]);
        hourlyHTML += `<div class="hourly-item">
            <span class="hourly-time">${formatHour(parseInt(hourly.time[j].slice(11, 13)))}</span>
            <div class="hourly-icon"><i class="fa-solid ${hourInfo[1]}"></i></div>
            <span class="hourly-temp">${Math.round(hourly.temperature_2m[j])}°</span>
        </div>`;
    }


    var forecastHTML = "";
    for (var k = 0; k < daily.time.length; k++) {
        var day = parseDate(daily.time[k]);
        var dayInfo = getWeatherInfo(daily.weather_code[k]);
        var label = k === 0 ? "Today" : dayNames[day.getDay()].slice(0, 3);
        var chance = daily.precipitation_probability_max[k] || 0;
        var chanceHTML = chance > 0 ? `<i class="fa-solid fa-droplet"></i> ${chance}%` : "";
        forecastHTML += `<div class="forecast-day${k === 0 ? " today" : ""}">
            <div class="forecast-day-name"><span class="day-label">${label}</span><span class="day-date">${day.getDate()} ${monthNames[day.getMonth()]}</span></div>
            <div class="forecast-icon"><i class="fa-solid ${dayInfo[1]}"></i></div>
            <div class="forecast-temps"><span class="temp-max">${Math.round(daily.temperature_2m_max[k])}°</span><span class="temp-min">${Math.round(daily.temperature_2m_min[k])}°</span></div>
            <div class="forecast-precip">${chanceHTML}</div>
        </div>`;
    }

    weatherContent.innerHTML = `
        <div class="weather-hero-card weather-${info[2]}">
            <div class="weather-location">
                <i class="fa-solid fa-location-dot"></i>
                <span>${escapeHtml(placeName)}</span>
                <span class="weather-time">${dateText}</span>
            </div>
            <div class="weather-hero-main">
                <div class="weather-hero-left">
                    <div class="weather-hero-icon"><i class="fa-solid ${info[1]}"></i></div>
                    <div class="weather-hero-temp">
                        <span class="temp-value">${Math.round(cur.temperature_2m)}</span>
                        <span class="temp-unit">°C</span>
                    </div>
                </div>
                <div class="weather-hero-right">
                    <div class="weather-condition">${info[0]}</div>
                    <div class="weather-feels">Feels like ${Math.round(cur.apparent_temperature)}°C</div>
                    <div class="weather-high-low">
                        <span class="high"><i class="fa-solid fa-arrow-up"></i> ${Math.round(daily.temperature_2m_max[0])}°</span>
                        <span class="low"><i class="fa-solid fa-arrow-down"></i> ${Math.round(daily.temperature_2m_min[0])}°</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="weather-details-grid">
            <div class="weather-detail-card">
                <div class="detail-icon humidity"><i class="fa-solid fa-droplet"></i></div>
                <div class="detail-info"><span class="detail-label">Humidity</span><span class="detail-value">${humidity}%</span></div>
                <div class="detail-bar"><div class="detail-bar-fill" style="width: ${humidity}%"></div></div>
            </div>
            <div class="weather-detail-card">
                <div class="detail-icon wind"><i class="fa-solid fa-wind"></i></div>
                <div class="detail-info"><span class="detail-label">Wind</span><span class="detail-value">${Math.round(cur.wind_speed_10m)} km/h</span></div>
                <span class="detail-extra">${getCompass(cur.wind_direction_10m)}</span>
            </div>
            <div class="weather-detail-card">
                <div class="detail-icon uv"><i class="fa-solid fa-sun"></i></div>
                <div class="detail-info"><span class="detail-label">UV Index</span><span class="detail-value">${uv}</span></div>
                <span class="uv-level ${uvLevel[0]}">${uvLevel[1]}</span>
            </div>
            <div class="weather-detail-card">
                <div class="detail-icon precip"><i class="fa-solid fa-cloud-rain"></i></div>
                <div class="detail-info"><span class="detail-label">Precipitation</span><span class="detail-value">${rain}%</span></div>
                <span class="detail-extra">${rainMm}mm expected</span>
            </div>
            <div class="weather-detail-card sunrise-sunset">
                <div class="sun-times-visual">
                    <div class="sun-time sunrise"><i class="fa-regular fa-sun"></i><span class="sun-label">Sunrise</span><span class="sun-value">${formatTimeString(daily.sunrise[0])}</span></div>
                    <div class="sun-arc">
                        <div class="sun-arc-path"></div>
                        <div class="sun-position" style="left: ${sunLeft}; bottom: ${sunBottom}"></div>
                    </div>
                    <div class="sun-time sunset"><i class="fa-regular fa-moon"></i><span class="sun-label">Sunset</span><span class="sun-value">${formatTimeString(daily.sunset[0])}</span></div>
                </div>
            </div>
        </div>

        <div class="weather-section">
            <h3 class="weather-section-title"><i class="fa-solid fa-clock"></i> Hourly Forecast</h3>
            <div class="hourly-scroll">${hourlyHTML}</div>
        </div>

        <div class="weather-section">
            <h3 class="weather-section-title"><i class="fa-solid fa-calendar-week"></i> 7-Day Forecast</h3>
            <div class="forecast-list">${forecastHTML}</div>
        </div>`;
}


async function getUtcOffset(lat, lng) {
    var data = await getJSON("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lng + "&daily=sunrise&forecast_days=1&timezone=auto");
    return data.utc_offset_seconds;
}

async function loadSunTimes() {
    var key = destKey();
    showLoading("Loading sun times...");
    try {
        var place = await getPlace();
        var offset = await getUtcOffset(place.lat, place.lng);


        var localNow = new Date(Date.now() + offset * 1000);
        var dateStr = localNow.getUTCFullYear() + "-" + pad(localNow.getUTCMonth() + 1) + "-" + pad(localNow.getUTCDate());

        var data = await getJSON("https://api.sunrise-sunset.org/json?lat=" + place.lat + "&lng=" + place.lng + "&date=" + dateStr + "&formatted=0");
        if (key !== destKey()) return;
        renderSunTimes(data.results, place.name, localNow, offset);
    } catch (error) {
        loadedKey["sun-times"] = "";
        showError(sunTimesContent, "Failed to load sun times. Please try again.");
        showToast("Failed to load sun times", "error");
    } finally {
        hideLoading();
    }
}

function renderSunTimes(r, placeName, localNow, offset) {
    function local(iso) {
        return formatTime(new Date(iso).getTime() + offset * 1000);
    }
    var dateText = localNow.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
    var dayText = localNow.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });

    var daySeconds = r.day_length;
    var percent = (daySeconds / 86400 * 100).toFixed(1);

    sunTimesContent.innerHTML = `
        <div class="sun-main-card">
            <div class="sun-main-header">
                <div class="sun-location">
                    <h2><i class="fa-solid fa-location-dot"></i> ${escapeHtml(placeName)}</h2>
                    <p>Sun times for your selected location</p>
                </div>
                <div class="sun-date-display">
                    <div class="date">${dateText}</div>
                    <div class="day">${dayText}</div>
                </div>
            </div>
            <div class="sun-times-grid">
                <div class="sun-time-card dawn"><div class="icon"><i class="fa-solid fa-moon"></i></div><div class="label">Dawn</div><div class="time">${local(r.civil_twilight_begin)}</div><div class="sub-label">Civil Twilight</div></div>
                <div class="sun-time-card sunrise"><div class="icon"><i class="fa-solid fa-sun"></i></div><div class="label">Sunrise</div><div class="time">${local(r.sunrise)}</div><div class="sub-label">Golden Hour Start</div></div>
                <div class="sun-time-card noon"><div class="icon"><i class="fa-solid fa-sun"></i></div><div class="label">Solar Noon</div><div class="time">${local(r.solar_noon)}</div><div class="sub-label">Sun at Highest</div></div>
                <div class="sun-time-card sunset"><div class="icon"><i class="fa-solid fa-sun"></i></div><div class="label">Sunset</div><div class="time">${local(r.sunset)}</div><div class="sub-label">Golden Hour End</div></div>
                <div class="sun-time-card dusk"><div class="icon"><i class="fa-solid fa-moon"></i></div><div class="label">Dusk</div><div class="time">${local(r.civil_twilight_end)}</div><div class="sub-label">Civil Twilight</div></div>
                <div class="sun-time-card daylight"><div class="icon"><i class="fa-solid fa-hourglass-half"></i></div><div class="label">Day Length</div><div class="time">${formatDuration(daySeconds)}</div><div class="sub-label">Total Daylight</div></div>
            </div>
        </div>

        <div class="day-length-card">
            <h3><i class="fa-solid fa-chart-pie"></i> Daylight Distribution</h3>
            <div class="day-progress">
                <div class="day-progress-bar"><div class="day-progress-fill" style="width: ${percent}%"></div></div>
            </div>
            <div class="day-length-stats">
                <div class="day-stat"><div class="value">${formatDuration(daySeconds)}</div><div class="label">Daylight</div></div>
                <div class="day-stat"><div class="value">${percent}%</div><div class="label">of 24 Hours</div></div>
                <div class="day-stat"><div class="value">${formatDuration(86400 - daySeconds)}</div><div class="label">Darkness</div></div>
            </div>
        </div>`;
}


async function loadCurrency() {
    if (rates) return;
    showLoading("Loading exchange rates...");
    try {
        var data = await getJSON("https://v6.exchangerate-api.com/v6/" + EXCHANGE_KEY + "/latest/USD");
        rates = data.conversion_rates;

        var items = [];
        for (var code in rates) {
            items.push({ value: code, text: code + " - " + (currencyNames[code] || code) });
        }
        currencyFromSelect.setItems(items);
        currencyToSelect.setItems(items);
        currencyFromSelect.setValue("USD", false);
        currencyToSelect.setValue("EGP", false);
        renderPopularCurrencies();
    } catch (error) {
        showToast("Failed to load exchange rates", "error");
    } finally {
        hideLoading();
    }
}

function renderPopularCurrencies() {
    var html = "";
    for (var i = 0; i < popularCodes.length; i++) {
        var code = popularCodes[i];
        html += `<div class="popular-currency-card" data-code="${code}">
            <img src="${flagUrl(popularFlags[code], 40)}" alt="${code}" class="flag">
            <div class="info"><div class="code">${code}</div><div class="name">${currencyNames[code]}</div></div>
            <div class="rate">${rates[code].toFixed(4)}</div>
        </div>`;
    }
    popularCurrencies.innerHTML = html;
}

async function convertCurrency() {
    var amount = parseFloat(currencyAmount.value);
    var from = currencyFromSelect.value;
    var to = currencyToSelect.value;

    if (!amount || amount <= 0) {
        showToast("Please enter a valid amount", "error");
        return;
    }
    if (!from || !to) {
        showToast("Please choose both currencies", "error");
        return;
    }

    showLoading("Converting...");
    try {
        var data = await getJSON("https://v6.exchangerate-api.com/v6/" + EXCHANGE_KEY + "/pair/" + from + "/" + to + "/" + amount);
        var options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
        var updated = new Date(data.time_last_update_utc).toLocaleDateString("en-US");

        currencyResult.innerHTML = `
            <div class="conversion-display">
                <div class="conversion-from">
                    <span class="amount">${amount.toLocaleString("en-US", options)}</span>
                    <span class="currency-code">${from}</span>
                </div>
                <div class="conversion-equals"><i class="fa-solid fa-equals"></i></div>
                <div class="conversion-to">
                    <span class="amount">${data.conversion_result.toLocaleString("en-US", options)}</span>
                    <span class="currency-code">${to}</span>
                </div>
            </div>
            <div class="exchange-rate-info">
                <p>1 ${from} = ${data.conversion_rate.toFixed(6)} ${to}</p>
                <small>Last updated: ${updated}</small>
            </div>`;
        currencyResult.classList.remove("hidden");
    } catch (error) {
        showToast("Conversion failed. Please try again.", "error");
    } finally {
        hideLoading();
    }
}

convertBtn.addEventListener("click", convertCurrency);

currencyAmount.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        convertCurrency();
    }
});

swapBtn.addEventListener("click", function () {
    var from = currencyFromSelect.value;
    var to = currencyToSelect.value;
    if (!from || !to) return;
    currencyFromSelect.setValue(to, false);
    currencyToSelect.setValue(from, false);
});

popularCurrencies.addEventListener("click", function (e) {
    var card = e.target.closest(".popular-currency-card");
    if (!card) return;
    currencyToSelect.setValue(card.getAttribute("data-code"), false);
    convertCurrency();
});


function savePlans() {
    localStorage.setItem("wanderlustPlans", JSON.stringify(plans));
}

function findPlan(id) {
    for (var i = 0; i < plans.length; i++) {
        if (plans[i].id === id) return i;
    }
    return -1;
}

function toggleSave(plan) {
    var index = findPlan(plan.id);
    if (index === -1) {
        plan.country = destination ? destination.name : "";
        plans.push(plan);
        showToast("Saved to My Plans!", "success");
    } else {
        plans.splice(index, 1);
        showToast("Removed from My Plans", "info");
    }
    savePlans();
    updateCounts();
    refreshSaveButtons();
}

function refreshSaveButtons() {
    var buttons = document.querySelectorAll("[data-save-id]");
    for (var i = 0; i < buttons.length; i++) {
        var btn = buttons[i];
        var saved = findPlan(btn.getAttribute("data-save-id")) !== -1;
        var icon = saved ? `<i class="fa-solid fa-heart"></i>` : `<i class="fa-regular fa-heart"></i>`;
        btn.classList.toggle("saved", saved);
        if (btn.classList.contains("btn-event")) {
            btn.innerHTML = icon + (saved ? " Saved" : " Save");
        } else {
            btn.innerHTML = icon;
        }
    }
}

function updateCounts() {
    var counts = { all: plans.length, holiday: 0, event: 0, longweekend: 0 };
    for (var i = 0; i < plans.length; i++) {
        counts[plans[i].type]++;
    }
    document.getElementById("filter-all-count").textContent = counts.all;
    document.getElementById("filter-holiday-count").textContent = counts.holiday;
    document.getElementById("filter-event-count").textContent = counts.event;
    document.getElementById("filter-lw-count").textContent = counts.longweekend;

    statSaved.textContent = plans.length;
    plansCount.textContent = plans.length;
    plansCount.classList.toggle("hidden", plans.length === 0);
}

function renderPlans() {
    updateCounts();
    var labels = { holiday: "Holiday", event: "Event", longweekend: "Long Weekend" };
    var html = "";
    for (var i = 0; i < plans.length; i++) {
        var p = plans[i];
        if (currentFilter !== "all" && p.type !== currentFilter) continue;
        html += `<div class="plan-card">
            <span class="plan-card-type ${p.type}">${labels[p.type]}</span>
            <div class="plan-card-content">
                <h4>${escapeHtml(p.title)}</h4>
                <div class="plan-card-details">
                    <div><i class="fa-regular fa-calendar"></i> ${escapeHtml(p.date)}</div>
                    <div><i class="fa-solid fa-circle-info"></i> ${escapeHtml(p.detail)}</div>
                </div>
            </div>
            <div class="plan-card-actions">
                <button class="btn-plan-remove" data-id="${escapeHtml(p.id)}"><i class="fa-solid fa-trash"></i> Remove</button>
            </div>
        </div>`;
    }
    if (html === "") {
        html = emptyStateHTML("fa-heart-crack", "No Saved Plans Yet", "Start exploring and save holidays, events, or long weekends you like!", true);
    }
    plansContent.innerHTML = html;
}

for (var f = 0; f < planFilters.length; f++) {
    planFilters[f].addEventListener("click", function () {
        currentFilter = this.getAttribute("data-filter");
        for (var i = 0; i < planFilters.length; i++) {
            planFilters[i].classList.toggle("active", planFilters[i] === this);
        }
        renderPlans();
    });
}

plansContent.addEventListener("click", function (e) {
    var btn = e.target.closest(".btn-plan-remove");
    if (!btn) return;
    var id = btn.getAttribute("data-id");
    Swal.fire({
        title: "Remove Plan?",
        text: "Are you sure you want to remove this plan?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Yes, remove it!"
    }).then(function (result) {
        if (result.isConfirmed) {
            var index = findPlan(id);
            if (index !== -1) {
                plans.splice(index, 1);
                savePlans();
                renderPlans();
                refreshSaveButtons();
                showToast("Plan removed", "info");
            }
        }
    });
});

clearAllPlansBtn.addEventListener("click", function () {
    if (plans.length === 0) {
        showToast("You have no saved plans", "info");
        return;
    }
    Swal.fire({
        title: "Clear All Plans?",
        text: "This will permanently delete all your saved plans. This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Yes, clear all!"
    }).then(function (result) {
        if (result.isConfirmed) {
            plans = [];
            savePlans();
            renderPlans();
            refreshSaveButtons();
            showToast("All plans cleared", "info");
        }
    });
});


async function loadCountries() {
    try {
        var list = await getJSON("https://date.nager.at/api/v3/AvailableCountries");
        var items = [];
        for (var i = 0; i < list.length; i++) {
            items.push({
                value: list[i].countryCode,
                text: list[i].name,
                code: list[i].countryCode,
                flag: flagUrl(list[i].countryCode, 40)
            });
        }
        items.sort(function (a, b) {
            return a.text.localeCompare(b.text);
        });
        countrySelect.setItems(items);
    } catch (error) {
        showToast("Failed to load countries list", "error");
    }
}

function init() {
    showCountryPlaceholder();
    selectedDestination.classList.add("hidden");
    for (var name in viewContainers) {
        showNoDestination(name);
    }
    currencyResult.classList.add("hidden");
    popularCurrencies.innerHTML = "";
    closeSidebar();


    document.querySelector("#holidays-view .view-header-content p").textContent = "Browse public holidays for any country and plan your trips around them";
    document.querySelector("#events-view .view-header-content p").textContent = "Discover concerts, sports, theatre and more in cities worldwide";
    document.querySelector("#weather-view .view-header-content p").textContent = "Check 7-day weather forecasts for cities around the world";

    citySelect.setItems([]);
    citySelect.setDisabled(true);
    yearSelect.setItems([
        { value: "2026", text: "2026" },
        { value: "2027", text: "2027" },
        { value: "2028", text: "2028" }
    ]);
    yearSelect.setValue("2026", false);

    updateBadges();
    updateCounts();
    updateClock();
    setInterval(updateClock, 1000);
    loadCountries();
    showView("dashboard");
}

init();
















