const apiKey = "bd5e378503939ddaee76f12ad7a97608";  // Replace with your OpenWeather API key

function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                document.getElementById("weatherInfo").innerHTML = `<p>${data.message}</p>`;
                return;
            }

            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            document.getElementById("weatherInfo").innerHTML = `
                <h2>${data.name}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>${weatherDescription}</p>
                <img src="${icon}" class="icon">
            `;
        })
        .catch(error => {
            document.getElementById("weatherInfo").innerHTML = `<p>Error fetching data. Try again!</p>`;
        });
}