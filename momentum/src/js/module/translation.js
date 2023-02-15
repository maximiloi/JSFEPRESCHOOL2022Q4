import { getWeather, cityInput } from './weather.js';
import { getQuotes } from './quote.js';

const translationCheckbox = document.querySelector('#translation-checkbox');
const apiTextOut = document.querySelector('.footer__text');
const cityPlaceholderOut = document.querySelector('.city');
const namePlaceholderOut = document.querySelector('.name');
const radioImageTagPlaceholderOut = document.querySelector('.radio-image-tag');
const todoTextPlaceholderOut = document.querySelector('.todo__text');
const todoFilterAllOut = document.querySelector('.todo__filter--all');
const todoFilterPendingOut = document.querySelector('.todo__filter--pending');
const todoFilterCompletedOut = document.querySelector('.todo__filter--completed');
const todoClearOut = document.querySelector('.clear');

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
const translationCityPlaceholder = { eng: '[Enter city]', rus: '[Введите город]' };
const translationNamePlaceholder = { eng: '[Enter name]', rus: '[Введите имя]' };
const translationRadioImageTagPlaceholder = { eng: '[Enter tag image]', rus: '[Ключевое слово для изображения]' };
const translationTodoTextPlaceholder = { eng: '[Enter new task]', rus: '[Введите новую задачу]' };
const translationTodoFilterAll = { eng: 'All', rus: 'Все' };
const translationTodoFilterPending = { eng: 'Pending', rus: 'В ожидании' };
const translationTodoFilterCompleted = { eng: 'Completed', rus: 'Завершено' };
const translationTodoClearCompleted = { eng: 'Clear All', rus: 'Очистить' };
export const translationNoTask = { eng: 'You don&apos;t have any task here', rus: 'Нет задач' };
export const translationEdit = { eng: 'edit', rus: 'изменить' };
export const translationDelete = { eng: 'delete', rus: 'удалить' };

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

export function translationTodo() {
    const taskNoItemOut = document.querySelector('.task__no-item');
    const taskEditOut = document.querySelector('.task--edit');
    const taskDeleteOut = document.querySelector('.task--delete');

    todoFilterAllOut.innerText = lng(translationTodoFilterAll);
    todoFilterPendingOut.innerText = lng(translationTodoFilterPending);
    todoFilterCompletedOut.innerText = lng(translationTodoFilterCompleted);
    todoClearOut.innerText = lng(translationTodoClearCompleted);
    taskNoItemOut.innerText = lng(translationNoTask);
    // taskEditOut.innerText = lng(translationEdit);
    // taskDeleteOut.innerText = lng(translationDelete);
}

function translationPlaceholder() {
    cityPlaceholderOut.placeholder = lng(translationCityPlaceholder);
    namePlaceholderOut.placeholder = lng(translationNamePlaceholder);
    radioImageTagPlaceholderOut.placeholder = lng(translationRadioImageTagPlaceholder);
    todoTextPlaceholderOut.placeholder = lng(translationTodoTextPlaceholder);
}

translationCheckbox.addEventListener('click', () => {
    getWeather(cityInput.value);
    getQuotes(lng(languageForQuote));
    showTranslationApi();
    translationPlaceholder();
    translationTodo();
});
