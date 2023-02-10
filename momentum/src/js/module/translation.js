import { getWeather, cityInput } from './weather.js';
import { getQuotes } from './quote.js';

const translationCheckbox = document.querySelector('#translation-checkbox');
const apiTextOut = document.querySelector('.footer__text');

export const translationGreeting = {
    eng: ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
    rus: ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'],
};
export const languageForWeather = { eng: 'en', rus: 'ru' };
export const translationWind = { eng: 'Wind speed', rus: 'Скорость ветра' };
export const translationHumidity = { eng: 'Humidity', rus: 'Влажность' };
export const translationWindSpeedUnits = { eng: 'm/s', rus: 'м/с' };
export const languageForDate = { eng: 'en-EN', rus: 'ru-RU' };
export const languageForQuote = { eng: 'https://type.fit/api/quotes', rus: 'assets/json/data-quote.json' };
export const translationApi = { eng: 'API images', rus: 'API изображений' };

export function lng(text) {
    if (translationCheckbox.checked) {
        return text.rus;
    }
    return text.eng;
}

export function showTranslationApi() {
    const apiText = lng(translationApi);
    apiTextOut.textContent = apiText;
}

translationCheckbox.addEventListener('click', () => {
    getWeather(cityInput.value);
    getQuotes(lng(languageForQuote));
    showTranslationApi();
});
