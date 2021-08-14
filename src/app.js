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

  let mainIcon = response.data.weather[0].icon
  document.querySelector("#main-icon").setAttribute("src", `media/${mainIcon}.png`)
  document.querySelector("#main-icon").setAttribute("alt", `${response.data.weather[0].description}`)

}

function showWeatherForecast() {
weatherForecastElement = document.querySelector("#weather-forecast");

let weekDays = ["Thursday", "Friday", "Saturday", "Sunday","Monday"];

let forecastHTML = `<div class="row">`;
weekDays.forEach(function(day) {
  forecastHTML = forecastHTML + `<div class="col">
              <img src="media/01d.png" width="60" class="image-fluid" />
              <br />
              Thursday <br />
              <span class="forecast-temperature">17°C</span>
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
event.preventDefault
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTemp = (celsiusTemperature * 9/5) + 32;
document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemp); 
}

function displayCelsius(event){
event.preventDefault
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature); 
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
showWeatherForecast();
