function formatDay(day) {
  let dayIndex = day.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[dayIndex]}`;
}

function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function searchTheCity(event) {
  event.preventDefault();

  let apiKey = "aabfdb0545b67c16952e49b1d1f98aea";
  let city = document.querySelector("#new-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(retrieveTemp);
}

function retrieveTemp(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".actual-degrees");
  currentTemp.innerHTML = `${temperature}°C`;
  document.querySelector(
    "#humid"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#windy").innerHTML = `${Math.round(
    response.data.wind.speed
  )} Km/h`;
}

function getLocalTemperature() {
  navigator.geolocation.getCurrentPosition(showLocalTemperature);
}

function showLocalTemperature(response) {
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;

  let apiKey = "aabfdb0545b67c16952e49b1d1f98aea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(retrieveTemp);
}

function changeToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector(".actual-degrees");
  temperature.innerHTML = "5°C";
}
function changeToFaren(event) {
  event.preventDefault();
  let temperature = document.querySelector(".actual-degrees");
  temperature.innerHTML = "41°F";
}

let date = document.querySelector("#current-day");
let time = document.querySelector("#current-time");
let currentTime = new Date();

date.innerHTML = formatDay(currentTime);
time.innerHTML = formatTime(currentTime);

let city = document.querySelector("#search-city");
city.addEventListener("submit", searchTheCity);

let celsiusDegrees = document.querySelector("#celsius");
let farenDegrees = document.querySelector("#fahrenheit");
let localTemperature = document.querySelector("#local-temperature");

celsiusDegrees.addEventListener("click", changeToCelsius);
farenDegrees.addEventListener("click", changeToFaren);
localTemperature.addEventListener("click", getLocalTemperature);
