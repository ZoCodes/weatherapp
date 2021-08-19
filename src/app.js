// Date Function
let theDate = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  let currentWeekDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDay = date.getDate();
  let currentYear = date.getFullYear();
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let currentDate = document.querySelector("h2");
  currentDate.innerHTML = `${currentWeekDay}, ${currentMonth} ${currentDay} ${currentYear} | ${currentHour}:${currentMinutes}`;

  return currentDate;
}

formatDate(theDate);

//Timestamp function for forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

//Open Weather API App Functions

//Handle searched city
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "e744bfafcb3c1411c3f393198d753e28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

//Update weather display

function getForecast(coordinates) {
  let apiKey = "e744bfafcb3c1411c3f393198d753e28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherForecast);
}

function showWeather(response) {
  celsiusTemperature = Math.round(response.data.main.temp);

  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = celsiusTemperature;

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let mainIcon = response.data.weather[0].icon;
  document
    .querySelector("#main-icon")
    .setAttribute("src", `media/${mainIcon}.png`);
  document
    .querySelector("#main-icon")
    .setAttribute("alt", `${response.data.weather[0].description}`);

  getForecast(response.data.coord);
}

function showWeatherForecast(response) {
  let forecast = response.data.daily;
  weatherForecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5)
      forecastHTML =
        forecastHTML +
        `<div class="col">
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" width="60" class="image-fluid" id="forecast-icon />
              <br />
              ${forecastDay.dt} <br />
              <span class="forecast-temperature">${Math.round(
                forecastDay.temp.day
              )}°C</span>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  weatherForecastElement.innerHTML = forecastHTML;
}

//Current location
function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "e744bfafcb3c1411c3f393198d753e28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

//Unit conversion
function displayFahrenheit(event) {
  event.preventDefault;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsius(event) {
  event.preventDefault;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

//Event listeners
let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

searchCity("Leeds");
