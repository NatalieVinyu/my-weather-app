/*let weather = {
    paris: {
      temp: 19.7,
      humidity: 80
    },
    tokyo: {
      temp: 17.3,
      humidity: 50
    },
    lisbon: {
      temp: 30.2,
      humidity: 20
    },
    "san francisco": {
      temp: 20.9,
      humidity: 100
    },
    oslo: {
      temp: -5,
      humidity: 20
    }
  };
  

let askCity = prompt("Enter a city?");
if (weather[askCity] !== undefined) {
  let tempCelsius = weather[askCity].temp;
  let tempFahrenheit = Math.round(tempCelsius * 1.8 + 32);
  let humidity = weather[askCity].humidity;
  alert("It is currently " + tempCelsius + "°C " + "(" + tempFahrenheit + " °F) in " + askCity + " with a humidity of " + humidity + "%");
} else {
  alert("Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" + askCity);
}

*/

let now = new Date();
let h2 = document.querySelector("h2");

let date = now.getDate();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
let month = months[now.getMonth()];

h2.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`

function currentPosition(response) {
  let city = response.data.name
  let temperature = Math.round(response.data.main.temp)
  let sky = response.data.weather[0].description
  let wind = response.data.wind.speed

  let h1 = document.querySelector("h1")
  let h3 = document.querySelector("h3")
  let h5 = document.querySelector("h5")
  let h6 = document.querySelector("h6")

  h1.innerHTML = `${city}`
  h3.innerHTML = `${temperature}º`
  h5.innerHTML = `${sky}`
  h6.innerHTML = `${wind} km/h`
}

function retrievePosition(position) {
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  let apiKey = "77cb0df8b340d241d54524527e9a1295" 
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  
  axios.get(apiUrl).then(currentPosition)
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition)
}

let button = document.querySelector("button")
button.addEventListener ("click", getCurrentPosition)


function inputWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name
  document.querySelector("h2").innerHTML = response.data.main.temperature
}

function searchCity(city) {
  let apiKey = "77cb0df8b340d241d54524527e9a1295"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

  axios.get(apiUrl).then(inputWeather)
}





