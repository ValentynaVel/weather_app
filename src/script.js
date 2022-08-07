let now = new Date();
let h4 = document.querySelector("#currentDate");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

h4.innerHTML = `${day} ${date} ${month}, ${hours}:${minutes}`;

function searchWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let cityHeader = document.querySelector("#city1");
  cityHeader.innerHTML = searchInput.value;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchWeather);

function formatDate(timestamp) {
  let date1 = new Date(timestamp);
  let hours1 = date1.getHours();
  let minutes1 = date1.getMinutes();
  if (minutes1 < 10) {
    minutes1 = `0${minutes1}`;
  }
  if (hours1 < 10) {
    hours1 = `0${hours1}`;
  }
  let days1 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day1 = days1[date1.getDay()];
  return `${day1} ${hours1}:${minutes1}`;
}

function showTempr(response) {
  document.querySelector("#city1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  conditionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function city(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  let apiKey = "077a496efcf5d4e780bd63a60c835410";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTempr);
}

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", city);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
