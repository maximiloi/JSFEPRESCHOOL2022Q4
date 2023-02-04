import { showTime } from './module/date.js';
import {} from './module/slider.js';
import {} from './module/weather.js';
import {} from './module/quote.js';
import { generationPlaylist } from './module/musicPlayer.js';
import {} from './module/translation.js';

function init() {
    showTime();
    generationPlaylist();
}

init();

export function getRandomNum(min, max) {
    return Math.floor(Math.random() * max) + min;
}
