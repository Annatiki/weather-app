function formatDate() {
    let hours = now.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let dayIndex = now.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
    let formattedDate = `${day} ${hours}:${minutes}`;
    return formattedDate;
  }
  let now = new Date();
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(now);
  
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[day];
  }
  
  //console.log(formatDate(now));

  function search(city){
    let apiKey = "2718952144ed077c12e7c160fb6fc351";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeatherCondition, function () {
      alert("Enter a valid city name! 🌍");
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let city= document.querySelector("#search-input").value;
    search(city);
  }
  function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "2718952144ed077c12e7c160fb6fc351";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  //forEach loop 

  function displayForecast(response) {
   let forecast =response.data.daily;
   let forecastElement = document.querySelector("#forecast");
   let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
   let forecastHTML = `<div class="row">`;
      forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
      forecastHTML = forecastHTML +
              `<div class="col-2">
            <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
            <div class="forecast-icon">
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
              alt="" width="50"/>
            </div>
            <div class="forecast-temperature">
              <span class="weather-forecast-temp-max"><b>${Math.round(forecastDay.temp.max)}°</b> </span>
              <span class="weather-forecast-temp-min"> ${Math.round(forecastDay.temp.min)}°</span>
            </div>
          </div>`;}
          });
        
          forecastHTML = forecastHTML + `</div>`;
          forecastElement.innerHTML = forecastHTML;
          console.log(forecastHTML);
        }
              
  function displayWeatherCondition(response){
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#humidity").innerHTML = `${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector("#description").innerHTML=response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  
  
//show units
  
let celsiusTemp = null;
  function showFahrenheit(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#temperature");
    celsius.classList.remove("active");
    fahrenheit.classList.add("active");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    currentTemp.innerHTML = Math.round(fahrenheitTemp);
  }
  
  
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", showFahrenheit);
  
  function showCelsius(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#temperature");
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
    
    currentTemp.innerHTML= Math.round(celsiusTemp);
  }
  
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", showCelsius);
  
  
  // Current location
 let currentLocationButton= document.querySelector("#current-location");
 currentLocationButton.addEventListener("click", getCurrentLocation)
   
 function searchLocation(position) {
  let apiKey = "2718952144ed077c12e7c160fb6fc351";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }

  search("Cape Town");
  
