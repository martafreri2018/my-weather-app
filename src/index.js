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
function displayWeatherCondition (response) {
  document.querySelector ("#city").innerHTML= response.data.name; 
  document.querySelector ("#currentTemp").innerHTML= Math.round(response.data.main.temp);

   document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}


fuction searchCity (city) {
  let apiKey= "329ed4c9b33de1b60e6d184aac65a30a"; 
  let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit (event) {
  event.preventDefault();
  let city= document.querySelector ("#city-input").value; 
  searchCity (city);
}

// Current Location
function searchLocation(position) {
  let apiKey = "329ed4c9b33de1b60e6d184aac65a30a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationBtn = document.querySelector("#current");
currentLocationBtn.addEventListener("click", getCurrentLocation);
searchCity("Rome");
