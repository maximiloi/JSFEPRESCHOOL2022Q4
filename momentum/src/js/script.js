import { } from './module/slider.js';
import { } from './module/musicPlayer.js';
import { } from './module/todo.js';
import { } from './module/pomodoro.js';
import { getLocalStorageCheckboxSetting } from './module/setting.js';
import showTime from './module/date.js';
import { cityInput, getWeather } from './module/weather.js';
import { getQuotes } from './module/quote.js';
import { lng, languageForQuote, showTranslationApi } from './module/translation.js';

let defaultCity = 'Minsk';

export function getRandomNum(min, max) {
    return Math.floor(Math.random() * max) + min;
}

export function init() {
    showTime();
    getWeather(defaultCity);
    getQuotes(lng(languageForQuote));
    showTranslationApi();
    getLocalStorageCheckboxSetting();

    cityInput.value = defaultCity;
}

init();

console.log(
    'self-check: https://rolling-scopes-school.github.io/maximiloi-JSFEPRESCHOOL2022Q4/momentum/momentum/README.md'
);
