//fetch data from API
async function fetchWeatherData (location) {
    try {
        const weatherResponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=XVSVRP552T2H3869FECXPXVRK`);
        return weatherResponse;
    }
    catch (error) {
        console.log(error);
    }
}

//clean data
async function cleanWeatherData (weatherResponse) {
    try {
        const weatherJson = await weatherResponse.json();
        return weatherJson;
    }
    catch (error) {
        console.log(error);
    }
}

//log data
function displayData (json) {
    const display = document.querySelector(".display")

    let details = document.querySelector(".details")

    if (details) {
        details.remove()
    }
    
    let newDetails = document.createElement("div")
    newDetails.classList.add("details")

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
    `
    display.appendChild(newDetails)
}

async function main () {
    const form = document.querySelector(".form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const location = document.querySelector("#location-input").value
        const response = await fetchWeatherData(location);
        let json = await cleanWeatherData(response);
        displayData(json);
    })
}

main()