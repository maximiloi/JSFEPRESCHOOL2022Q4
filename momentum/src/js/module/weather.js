const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const cityInput = document.querySelector('.city');

let defaultCity = 'Минск';

// cityInput.value = defaultCity;

function rounding(num) {
    return Math.round(num, 1);
}

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=003857592feb5ff0def8aa4fade433b5&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    console.log('data: ', data);

    if (data.cod === 200) {
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${rounding(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${rounding(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${rounding(data.main.humidity)} %`;
    }
    if (data.cod != 200) {
        weatherError.textContent = `${data.message}: ${data.cod}`;
    }
}

cityInput.addEventListener('focus', function () {
    cityInput.placeholder = '';
});

cityInput.addEventListener('change', function () {
    setLocalStorage();
});

function setLocalStorage() {
    localStorage.setItem('city', cityInput.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('city')) {
        cityInput.value = localStorage.getItem('city');
        getWeather(cityInput.value);
    }
}
window.addEventListener('load', getLocalStorage);

function setCity(event) {
    if (event.code === 'Enter') {
        getWeather(cityInput.value);
        cityInput.blur();
    }
}

document.addEventListener('DOMContentLoaded', getWeather(defaultCity));
cityInput.addEventListener('keypress', setCity);
