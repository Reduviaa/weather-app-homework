let now = new Date();
console.log(now);

function timeNow(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let nowDate = date.getDate();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let formattedDate = `Today | ${day} ${nowDate}/${month}`;
  return formattedDate;
}
console.log(timeNow(now));

let formatTime = document.querySelector("#time");
formatTime.innerHTML = timeNow(now);

function currentTime(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let formattedCurentTime = `${hour}:${minute}`;
  return formattedCurentTime;
}

let whatTime = document.querySelector("#current-time");
whatTime.innerHTML = currentTime(now);

function weatherConditions(response) {
  console.log(response);
  document.querySelector(".cities").innerHTML = response.data.name;
  document.querySelector("#temp-change").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#sky").innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "19523438540e9822a6b5458e16242094";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherConditions);
}

function whatCity(event) {
  event.preventDefault();
  let city = document.querySelector("#text").value;
  searchCity(city);
}

let form = document.querySelector("#change-city");
form.addEventListener("submit", whatCity);

searchCity("London");

function searchLocation(position) {
  let apiKey = "19523438540e9822a6b5458e16242094";
  let locationKey = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(locationKey).then(weatherConditions);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-weather");
currentButton.addEventListener("click", currentLocation);

function celsiusTemp(event) {
  event.preventDefault();
  let temperatureC = document.querySelector("#temp-change");
  temperatureC.innerHTML = 18;
}

function fahrenheitTemp(event) {
  event.preventDefault();
  let temperatureF = document.querySelector("#temp-change");
  temperatureF.innerHTML = 66;
}

let changeToCelsius = document.querySelector("#link-celsius");
changeToCelsius.addEventListener("click", celsiusTemp);

let changeToFahrenheit = document.querySelector("#link-fahrenheit");
changeToFahrenheit.addEventListener("click", fahrenheitTemp);
