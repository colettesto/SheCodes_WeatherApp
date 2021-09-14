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
  return `Currently ${hour}:${minutes}<br /> ${day}, ${month} ${date}, ${year}`;
}

// Weather API function

function displayWeatherCondition(response) {
  console.log(response);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector(
    "#current-city"
  ).innerHTML = `Today's weather in ${response.data.name}`;
  document.querySelector("#temperature-main").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;
  document.querySelector("#wind-speed").innerHTML = `Wind speed is ${Math.round(
    response.data.wind.speed
  )} km/h`;
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
  console.log(city);
}

// Date and time JS

let currentDate = document.querySelector("#current-date");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

// Search field JS

let searchForm = document.querySelector("#change-city");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Vancouver");
