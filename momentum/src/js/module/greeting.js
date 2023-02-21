import { lng, translationGreeting } from './translation.js';

const greetingOut = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');

let index = 0;

export function getTimeOfDay() {
    const partDay = ['night', 'morning', 'day', 'evening'];
    const date = new Date();
    const hours = date.getHours();
    index = Math.floor(hours / 6);

    return partDay[index];
}

export function showGreeting() {
    // const timeOfDay = getTimeOfDay();
    const greetingText = `${lng(translationGreeting)[index]}, `;
    greetingOut.textContent = greetingText;
}

nameInput.addEventListener('focus', function () {
    nameInput.value = '';
});

nameInput.addEventListener('change', function () {
    setLocalStorage();
});

function setLocalStorage() {
    localStorage.setItem('name', nameInput.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    }
}

window.addEventListener('load', getLocalStorage);
