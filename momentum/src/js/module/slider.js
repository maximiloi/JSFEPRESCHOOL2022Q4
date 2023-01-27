import { getTimeOfDay } from './greeting.js';
import { getRandomNum } from '../script.js';

// const URL_IMAGES = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/'; // old link
const URL_IMAGES = 'https://raw.githubusercontent.com/maximiloi/stage1-tasks/assets/images/';

const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const numMin = 1; // Минимальный номер в массивве фотографий
const numMax = 20; // Максимальный номер в массивве фотографий

let numberWallpaper = getRandomNum(numMin, numMax);

showBackgroud(numberWallpaper);

function addZero(num) {
    return num.toString().padStart(2, '0');
}

function setBg(num) {
    return `${getTimeOfDay()}/${addZero(num)}`;
}

function showBackgroud(num) {
    const img = new Image();
    img.src = `${URL_IMAGES}${setBg(num)}.webp`;
    img.onload = () => {
        body.style.backgroundImage = `url('${URL_IMAGES}${setBg(num)}.webp')`;
    };
}

slidePrev.addEventListener('click', () => {
    if (numberWallpaper > numMin) {
        numberWallpaper -= numMin;
        showBackgroud(numberWallpaper);
    } else {
        numberWallpaper = numMax;
        showBackgroud(numberWallpaper);
    }
});

slideNext.addEventListener('click', () => {
    if (numberWallpaper < numMax) {
        numberWallpaper += numMin;
        showBackgroud(numberWallpaper);
    } else {
        numberWallpaper = numMin;
        showBackgroud(numberWallpaper);
    }
});
