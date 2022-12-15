function showTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#currentTemperature");
    let cityElement = document.querySelector("#city-name");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let weatherElement = document.querySelector("#weather");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    weatherElement.innerHTML = response.data.weather[0].description;
}


    let apiKey = "597c40c39084687093b091cd48b366f8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(showTemperature);


