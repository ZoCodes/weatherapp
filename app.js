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

//Main City Search Function

function enterCity(event) {
  event.preventDefault();

  let mainCity = document.querySelector("#main-city");
  let searchInput = document.querySelector("#enter-city-input");
  mainCity.trim;

  if (searchInput.value) {
    mainCity.innerHTML = `${searchInput.value}`;
  } else {
    mainCity.innerHTML = null;
    alert("Please enter a City");
  }
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", enterCity);

//API information

let apiKey = //secret 
let units = "metric";
let city = "Paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

//API functions and calls
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
}

axios.get(`${apiUrl}`).then(showTemperature);
