import { showGreeting } from './greeting.js';
import { lng, languageForDate } from './translation.js';

const timeOut = document.querySelector('.time');
const dateOut = document.querySelector('.date');

export default function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    timeOut.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}

function showDate() {
    const date = new Date();
    const options = { month: 'long', day: 'numeric', weekday: 'long' };
    const currentDate = date.toLocaleDateString(lng(languageForDate), options);
    dateOut.textContent = currentDate;
}
