function change() {
  let now = new Date();
  let currentDate = document.querySelector("#today");
  let date = now.getDate();
  let hours = now.getHours();
  let year = now.getFullYear();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
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
    "December"
  ];
  let month = months[now.getMonth()];
  let today = `${day} ${date} ${month} ${year}, ${hours}:${minutes}`;
  currentDate.innerHTML = today;
}
change();
// Bonus challenge
function changeToFahrenheit(event) {
  event.preventDefault();
  let newTempFahrenheit = document.querySelector("#currentTemp");
  newTempFahrenheit.innerHTML = `57`;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);
function changeToCelsius(event) {
  event.preventDefault();
  let newTempCelsius = document.querySelector("#currentTemp");
  newTempCelsius.innerHTML = `14`;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCelsius);

// Search city
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#Temp-today").innerHTML = Math.round(
    response.data.main.temp
  );
}

function get(city) {
  let apiKey = "329ed4c9b33de1b60e6d184aac65a30a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#exampleInputText").value;
  get(city);
}
let searchCityForm = document.querySelector("#enter-city");
searchCityForm.addEventListener("submit", citySearch);
let goBtn = document.querySelector("#research");
goBtn.addEventListener("click", citySearch);

// Current Location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation(position) {
  let apiKey = "329ed4c9b33de1b60e6d184aac65a30a";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
let currentLocationBtn = document.querySelector("#current");
currentLocationBtn.addEventListener("click", getCurrentLocation);
get("London");
