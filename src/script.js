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

function getCurrentPosition(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(retrievePosition)
}

let button = document.querySelector("button")
button.addEventListener ("click", getCurrentPosition)


function submitButton(event) {
  event.preventDefault()
  let city = document.querySelector("#search-city")

  let h1 = document.querySelector("h1")
  h1.innerHTML = `${city.value}`
  
  let apiKey = "77cb0df8b340d241d54524527e9a1295";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`
  
  axios.get(apiUrl).then(currentPosition)
}

let searchForm = document.querySelector("#text-input")
searchForm.addEventListener("submit", submitButton)





