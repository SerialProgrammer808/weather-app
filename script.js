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
function logData (json) {
    console.log(json.resolvedAddress);
    console.log("Time: " + json.currentConditions.datetime);
    console.log("Temperature: " + json.currentConditions.temp);
    console.log("Feels like: " + json.currentConditions.feelslike);
    console.log(json.description);
    console.log("Humidity: " + json.currentConditions.humidity + "%");
    console.log("Wind Speed: " + json.currentConditions.windspeed + " km/h");
    console.log("Conditions: " + json.currentConditions.conditions);
    console.log("Sunrise: " + json.currentConditions.sunrise);
    console.log("Sunset: " + json.currentConditions.sunset);
}

async function main () {
    let response = await fetchWeatherData("Bohol");
    let json = await cleanWeatherData(response)
    logData(json);
}

main()