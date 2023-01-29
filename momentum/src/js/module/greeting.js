const greetingOut = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');

export function showGreeting() {
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay},`;
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
