import { greetingTranslation, lng } from './translation.js';
console.log('greetingTranslation: ', greetingTranslation.eng);

const greetingOut = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');

let lng1 = lng();

export function showGreeting() {
    const timeOfDay = getTimeOfDay();
    const greetingText = `${greetingTranslation.lng1} ${timeOfDay},`;
    console.log('greetingTranslation.lng1: ', greetingTranslation.lng1);
    greetingOut.textContent = greetingText;
}

export function getTimeOfDay() {
    // const partDay = ['ночи', 'утра', 'день', 'вечер'];
    const partDay = ['night', 'morning', 'day', 'evening'];
    const date = new Date();
    const hours = date.getHours();
    let index = Math.floor(hours / 6);

    return partDay[index];
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
