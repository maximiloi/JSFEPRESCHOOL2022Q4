import { showTime } from './module/date.js';
import {} from './module/slider.js';
import {} from './module/weather.js';
import { getQuotes } from './module/quote.js';
import { generationPlaylist } from './module/musicPlayer.js';
import { lng, languageForQuote } from './module/translation.js';
import {} from './module/image_api.js';

export function getRandomNum(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function init() {
    showTime();
    generationPlaylist();
    getQuotes(lng(languageForQuote));
}

init();
