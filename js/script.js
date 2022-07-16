// var key = "9ddfb3c35ca65abd890c3fee7cffe3a2"
// // weather API, acquiring local information based on an inputted city's coordinates

// function searchWeather(data) {
//     var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.latitude}&lon=${data.longitude}$units=imperial&appid=${key}`;
//     fetch(requestUrl).then(function(response) {
//         return response.json();
//     });
// };

// function locateCity(city) {
//     var geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`;
//     fetch(geoUrl).then(function(response) {
//         return response.json();
//     });
//     var cityStats = response[0];
//     var results = { latitude: cityStats.lat, longitude: cityStats.lon, name: cityStats.name, state: cityStats.state, country: cityStats.country };
//     return results;
// };

// function showCityNow(cityName, thisWeather) {
//     const currentDay = new Date ();
    
// }

// async function searchCity() {
//     var searchInput = document.getElementById('searchbtn').value;
//     var cityLocation = await locateCity(searchInput);
//     var thisWeather = await searchWeather(cityLocation.latitude, cityLocation.longitude);
//     showCityNow(cityLocation.name, thisWeather);
//     showFiveDay(thisWeather);
// }

// Set global variables, including Open Weather Maps API Key


var key = "9ddfb3c35ca65abd890c3fee7cffe3a2"
// Weather API 
async function getWeatherInfo(longitude, latitude) {
    const apiweatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}$units=imperial&appid=${key}`;
    const result = await fetch(apiweatherUrl).then(response => response.json())
    return result
}

async function getCityLocation(city) {
    const apiGeoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`
    const response = await fetch(apiGeoURL).then(response => response.json())
    const cityData = response[0] 
    const result = { longitude: cityData.lon, latitude: cityData.lat, name: cityData.name, state: cityData.state, country: cityData.country }
    return result
}
// Search Button
async function handleSearch() {
    const textInput = document.getElementById("searchInput").value
    const cityLocation = await getCityLocation(textInput)
    const weather = await getWeatherInfo(cityLocation.longitude, cityLocation.latitude)
    displayCityOverview(cityLocation.name, weather)
    displayFiveDayForecast(weather)
}

// Display city location and weather info 
function displayCityOverview(cityName, weather) {
    const currentDay = new Date ()

    const currentCityEl = document.getElementById("currentcity-name")
    currentCityEl.innerHTML = `${cityName} (${currentDay.toDateString()})`; 

    const tempEl = document.getElementById("temp")
    tempEl.innerHTML = `Temp: ${weather.current.temp} &degF`

    const windEl = document.getElementById("wind")
    windEl.innerHTML = `Wind: ${weather.current.wind_speed} MPH`

    const humidityEl = document.getElementById("humidity")
    humidityEl.innerHTML = `Humidity: ${weather.current.humidity} %`

    const uvEl = document.getElementById('uv')
    uvEl.innerHTML = `UV-Index: ${weather.current.uvi}`
}

// Five Day Forecast 
function displayFiveDayForecast(weather){
const forecastCards = document.getElementById("forecast").children

for (let i = 0; i < 5; i ++){

const forecast = weather.daily[i + 1]
const date = new Date(forecast.dt * 1000) // dt is a UNIX timestamp. Multiply it by 1000 so that to make the date from milliseconds, and not seconds

const firstCardItems = forecastCards.item(i).children
firstCardItems.item(0).innerHTML = date.toDateString()
firstCardItems.item(1).src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`
firstCardItems.item(2).innerHTML = `Temp: ${forecast.temp.day} &degF`
firstCardItems.item(3).innerHTML = `Wind: ${forecast.wind_speed} MPH`
firstCardItems.item(4).innerHTML = `Humidity: ${forecast.humidity} %`
}}

// Declaring Variables 
const searchBtn = document.getElementById('searchbtn')
searchBtn.addEventListener("click", handleSearch)

// City Buttons
const cityBtns = document.getElementsByClassName('city')

for (var i = 0; i < cityBtns.length; i++){
    let btn = cityBtns.item(i)
    btn.addEventListener("click", function(){
        document.getElementById("searchInput").value = btn.innerHTML
        handleSearch();
    
    })
}
cityBtns.addEventListener("click")
displayCityOverview();