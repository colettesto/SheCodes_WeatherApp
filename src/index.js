// Date and Time function

function formatDate(liveDate) {
  let now = new Date();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  return `Last updated at ${hour}:${minutes}<br /> ${day}, ${month} ${date}, ${year}`;
}

// weather API forecaste format day function

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Weather API function

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
        <div class="weatherForecastDay">
          ${formatDay(forecastDay.dt)}
        </div>
        <div class="weatherForecastIcon">
          <img src="icons/${forecastDay.weather[0].icon}.svg">
        </div>
        <div class="weatherForecastTemp">
          <span class="weatherForecastTempMax"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weatherForecastTempMin"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
        
      </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "010d8cb5801bfb8326097d9cc4ca0bf7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayWeatherCondition(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `icons/${response.data.weather[0].icon}.svg`);
  document.querySelector(
    "#current-city"
  ).innerHTML = `in ${response.data.name}`;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature-main").innerHTML = `${Math.round(
    celsiusTemperature
  )}°C`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}°`;
  document.querySelector("#wind-speed").innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#max-temp").innerHTML = `High today: ${Math.round(
    response.data.main.temp_max
  )}°`;
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "010d8cb5801bfb8326097d9cc4ca0bf7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-new-city").value;
  searchCity(city);
}
// Degree converter function - NOT IN USE

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature-main");
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-main");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

// Date and time global variables

let currentDate = document.querySelector("#current-date");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

// Search field global variables

let searchForm = document.querySelector("#change-city");
searchForm.addEventListener("submit", handleSubmit);

// Degree converter global variables - FUNCTION REMOVED

// let farenheitLink = document.querySelector("#fahrenheit-link");
// farenheitLink.addEventListener("click", displayFarenheitTemperature);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", displayCelsiusTemperature);

// let celsiusTemperature = null;

// Universal start variable

searchCity("Cambridge,UK");
