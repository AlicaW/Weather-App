function showTemperature(response) {
    console.log(response.data.main.temp);
    let temperatureElement = document.querySelector("#currentTemperature");
    temperatureElement.innerHTML = response.data.main.temp;
}


    let apiKey = "597c40c39084687093b091cd48b366f8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(showTemperature);


