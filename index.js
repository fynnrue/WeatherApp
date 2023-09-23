// input openweathermap api key
const apiKey = 'APKEY';

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById("search-bar");
    input.value = 'Germany';

    getWeather('Germany');
}, false);

// fetch weather data from openweathermap
search.addEventListener('click', () => {
    const location = document.querySelector('.search-container input').value;
    if (location) {
        getWeather(location);
    }
});

function getWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(json => {
        const temp = document.getElementById('temp-span');
        const humidity = document.getElementById('humid-span');
        const wind = document.getElementById('wind-span');
        const locationNotFound = document.querySelector('.location-not-found');

        if (json.cod === '404') {
            temp.innerHTML = '--';
            humidity.innerHTML = '--';
            wind.innerHTML = '--';

            locationNotFound.style.display = 'block';
            return;
        }

        switch (json.weather[0].main) {
            case 'Thunderstorm':
                document.body.style.backgroundImage = 'url(images/storm.jpg)';
                break;
            case 'Drizzle':
                document.body.style.backgroundImage = 'url(images/drizzle.jpg)';
                break;
            case 'Rain':
                document.body.style.backgroundImage = 'url(images/rain.jpg)';
                break;
            case 'Snow':
                document.body.style.backgroundImage = 'url(images/snow.jpg)';
                break;
            case 'Clear':
                document.body.style.backgroundImage = 'url(images/clear.jpg)';
                break;
            case 'Clouds':
                document.body.style.backgroundImage = 'url(images/clouds.jpg)';
                break;
            default:
                document.body.style.backgroundImage = 'url(images/atmosphere.jpg)';
                break;
        }


        temp.innerHTML = `${Math.round(json.main.temp * 10) / 10}°C`;
        humidity.innerHTML = `${json.main.humidity} %`;
        wind.innerHTML = `${json.wind.speed} kph`;
    })
}


// press enter to search
const input = document.getElementById("search-bar");

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search-button").click();
    }
});