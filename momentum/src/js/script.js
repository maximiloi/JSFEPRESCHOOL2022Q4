import { showTime } from './module/date.js';
import {} from './module/slider.js';
import {} from './module/weather.js';
import {} from './module/quote.js';

function init() {
    showTime();
}

init();

export function getRandomNum(min, max) {
    return Math.floor(Math.random() * max) + min;
}
