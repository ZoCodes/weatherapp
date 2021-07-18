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

  let currentDate = document.querySelector("h3");
  currentDate.innerHTML = `${currentWeekDay}, ${currentMonth} ${currentDay} ${currentYear} | ${currentHour}:${currentMinutes}`;

  return currentDate;
}

formatDate(theDate);

//Main City Search Function

function enterCity(event) {
  event.preventDefault();

  let mainCity = document.querySelector("#main-city");
  let searchInput = document.querySelector("#enter-city-input");

  if (searchInput.value) {
    mainCity.innerHTML = `${searchInput.value}`;
  } else {
    mainCity.innerHTML = null;
    alert("Please enter a City");
  }
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", enterCity);

// Celsius to Fahrenheit Function

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitElement = document.querySelector("#temperature");
  let fahrenheit = fahrenheitElement.innerHTML;
  fahrenheitElement.innerHTML = Math.round((fahrenheit * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

//Fahrenheit back to Celsius Function

function convertToCelsius(event) {
  event.preventDefault;
  let celsiusElement = document.querySelector("#temperature");
  let celsius = celsiusElement.innerHTML;
  celsiusElement.innerHTML = Math.round(((celsius - 32) * 5) / 9);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//Note - linsk have a bug as allow you to keep clicking and the temperature goes up and also should only be allowed to click on C after F
