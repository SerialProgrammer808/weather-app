//fetch data from API
async function fetchWeatherData(location) {
    try {
        const weatherResponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=XVSVRP552T2H3869FECXPXVRK`);
        return weatherResponse;
    }
    catch (error) {
        console.log(error);
    }
}

//clean data
async function cleanWeatherData(weatherResponse) {
    try {
        const weatherJson = await weatherResponse.json();
        return weatherJson;
    }
    catch (error) {
        console.log(error);
    }
}

//log data
function displayData(json) {
    const display = document.querySelector(".display");
    
    let newDetails = document.createElement("div");
    newDetails.classList.add("details");

    newDetails.innerHTML = 
    `<p>${json.resolvedAddress}</p>
    <p>As of: ${json.currentConditions.datetime}</p>
    <p>Temperature: ${json.currentConditions.temp}</p>
    <p>Feels like: ${json.currentConditions.feelslike}</p>
    <p>${json.description}</p>
    <p>Humidity: ${json.currentConditions.humidity}%</p>
    <p>Wind Speed: ${json.currentConditions.windspeed} km/h</p>
    <p>Conditions: ${json.currentConditions.conditions}</p>
    <p>Sunrise: ${json.currentConditions.sunrise}</p>
    <p>Sunset: ${json.currentConditions.sunset}</p>
    `;

    display.appendChild(newDetails);
}

async function main() {
    const form = document.querySelector(".form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        clear();
        load();

        const location = document.querySelector("#location-input").value;
        const response = await fetchWeatherData(location);
        const json = await cleanWeatherData(response);
        clear();
        displayData(json);
    });
}

function clear() {
    let details = document.querySelector(".details");
    let loadingIcon = document.querySelector(".loading");

    if (details) {
        details.remove();
    }

    if (loadingIcon) {
        loadingIcon.remove();
    }
}

function load() {
    let loadingIcon = document.createElement("img");
    const display = document.querySelector(".display");
    loadingIcon.classList.add("loading");
    loadingIcon.src = "loading.gif";
    display.appendChild(loadingIcon);
}

main();