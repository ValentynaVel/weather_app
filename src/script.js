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

function showTempr(response) {
  document.querySelector("#city1").innerHTML = response.data.name;
  document.querySelector("strong").innerHTML = Math.round(
    response.data.main.temp
  );
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
