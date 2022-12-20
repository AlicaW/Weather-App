function formateDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10 ) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

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
    return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");


    let forecastHTML = `<div class="row">`;
    let days = ["Wed", "Thur", "Frid"]; 
    days.forEach(function (day) {

        forecastHTML = forecastHTML + `
        <div class="col-2 card">
        <div class="weather-forecast-date">
        ${day}
        <div class="emoji">🌤</div> 
        <div class="weather-forecast-temperature">18°C</div>
        </div>
        </div> 
        `;
    })

    forecastHTML = forecastHTML + `</div>`;

    forecastElement.innerHTML = forecastHTML; 
}

function showTemperature(response) {
    let temperatureElement = document.querySelector("#currentTemperature");
    let cityElement = document.querySelector("#city-name");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let weatherElement = document.querySelector("#weather");
    let dateElement = document.querySelector("#current-time");
    let iconElement = response.data.weather[0].icon;

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    weatherElement.innerHTML = response.data.weather[0].description;
    dateElement.innerHTML = formateDate(response.data.dt * 1000);
    document.querySelector("#weatherIcon").innerHTML = `<img src="http://openweathermap.org/img/wn/${iconElement}@2x.png">`;
}

    function search(city) { 
        let apiKey = "597c40c39084687093b091cd48b366f8";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
        axios.get(apiUrl).then(showTemperature);
    }

    function handleSubmit(event){
        event.preventDefault();
        let cityInput = document.querySelector("#search-input");
        search(cityInput.value);
    } 

    function showFahrenheit(event) {
        event.preventDefault();
        let temperatureElement = document.querySelector("#currentTemperature");
        celsiusLink.classList.remove("active");
        fahrenheitLink.classList.add("active");
        let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
        temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    }

    function showCelsius(event) {
        event.preventDefault();
        celsiusLink.classList.add("active");
        fahrenheitLink.classList.remove("active");
        let temperatureElement = document.querySelector("#currentTemperature");
        temperatureElement.innerHTML = Math.round(celsiusTemperature);
    }

    let celsiusTemperature = null;
    
    let form = document.querySelector("#search-form"); 
    form.addEventListener("submit", handleSubmit); 
    
    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", showFahrenheit);

    let celsiusLink = document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click", showCelsius);
    
    search("Hamburg");

    displayForecast();