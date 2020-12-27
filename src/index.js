function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

formatDate ();

// Bonus challenge
function changeToFahrenheit(event) {
  event.preventDefault();
  let newTempFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement= document.querySelector ("#currentTemp");
  celsius.classList.remove ("active"); 
  fahrenheit.classList.add ("active");
  temperatureElement.innerHTML=Math.round(newTempFahrenheit);
}

let celsiusTemperature = null;
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

function changeToCelsius(event) {
  event.preventDefault();
  let newTempCelsius = document.querySelector("#currentTemp");
  celsius.classList.add ("active"); 
  fahrenheit.classList.remove ("active");
  newTempCelsius.innerHTML = Math.round (celsiusTemperature);
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCelsius);

// Search city
function displayWeatherCondition (response) {
  let iconElement = document.querySelector ("#icon");
  document.querySelector ("#city").innerHTML= response.data.name; 
  document.querySelector ("#currentTemp").innerHTML= Math.round(response.data.main.temp);

  celsiusTemperature= response.data.main.temp;
   document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

}


function displayForecast (response){
let forecastElement= document.querySelector("#forecast");
forecastElement.innerHTML=null;
let forecast= null;

for (let index=0; index<6; index ++ ) {
  let forecast= response.data.list[index];
  forecastElement.innerHTML += `<div class="col-2">
    <h3>
     ${formatHours(forecast.dt * 1000)}
    </h3> 
   
   <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" />
  
   <div class="weather-forecast-temperature">
     <strong> ${Math.round(forecast.main.temp_max)}°</strong> | ${Math.round(forecast.main.temp_min)}° 
   </div>
   </div>
   `
   ;}

}




function searchCity (city) {
  let apiKey= "329ed4c9b33de1b60e6d184aac65a30a"; 
  let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`; 
  axios.get(apiUrl).then(displayForecast);
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationBtn = document.querySelector("#current");
currentLocationBtn.addEventListener("click", getCurrentLocation);

searchCity("Rome");
