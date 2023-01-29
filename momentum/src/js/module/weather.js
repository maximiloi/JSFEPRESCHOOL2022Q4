const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const cityInput = document.querySelector('.city');

let defaultCity = 'Minsk';

function rounding(num) {
    return Math.round(num, 1);
}

function setLocalStorage() {
    localStorage.setItem('city', cityInput.value);
}

function setCity(event) {
    if (event.code === 'Enter') {
        getWeather(cityInput.value);
        cityInput.blur();
    }
}

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=003857592feb5ff0def8aa4fade433b5&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === 200) {
        weatherIcon.className = `weather-icon owf owf-${data.weather[0].id}`;
        temperature.textContent = `${rounding(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${rounding(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${rounding(data.main.humidity)} %`;
        weatherError.textContent = ``;
    }
    if (data.cod != 200) {
        weatherIcon.classList = ``;
        temperature.textContent = ``;
        weatherDescription.textContent = ``;
        wind.textContent = ``;
        humidity.textContent = ``;
        weatherError.textContent = `${data.message}: ${data.cod}`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('city')) {
        cityInput.value = localStorage.getItem('city');
        getWeather(cityInput.value);
    } else {
        cityInput.value = defaultCity;
        getWeather(defaultCity);
    }
});

cityInput.addEventListener('keypress', setCity);
cityInput.addEventListener('change', setLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

cityInput.addEventListener('click', function () {
    cityInput.value = '';
});
