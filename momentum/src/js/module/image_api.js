import { getRandomNum } from '../script.js';
import { getTimeOfDay } from './greeting.js';
import { showBackgroud, body } from './slider.js';

const API_UNSPLASH_KEY = 'zdEkaNyxosOqQdRciqyzDDOY_u202OUB0FyIfaTFkcY';
const API_FLICKR_KEY = 'd61240548aa4eadfdc660e27e7e5f4b4';

const toggleButtonCover = document.querySelector('.footer__api');
const radioImageApis = document.querySelectorAll('.radio-image-api');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

let imageUnsplashURL = '';
let imageFlickrURL = '';

export function radioValue() {
    let value = '';
    radioImageApis.forEach((item) => {
        if (item.checked) {
            value = item.value;
        }
    });
    return value;
}

async function showBackgroudUnsplash() {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${getTimeOfDay()}&client_id=${API_UNSPLASH_KEY}`;
    imageUnsplashURL = await fetch(url)
        .then((res) => res.json())
        .then((data) => {
            return data.urls.regular;
        });

    const img = new Image();
    img.src = `${imageUnsplashURL}`;
    img.onload = () => {
        body.style.backgroundImage = `url('${imageUnsplashURL}')`;
    };
}

async function showBackgroudFlickr() {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_FLICKR_KEY}&tags=${getTimeOfDay()},nature&extras=url_l&format=json&nojsoncallback=1`;
    imageFlickrURL = await fetch(url)
        .then((res) => res.json())
        .then((data) => {
            return data.photos.photo[getRandomNum(0, 100)].url_l;
        });

    const img = new Image();
    img.src = `${imageFlickrURL}`;
    img.onload = () => {
        body.style.backgroundImage = `url('${imageFlickrURL}')`;
    };
}

toggleButtonCover.addEventListener('click', (event) => {
    const targetElement = event.target;

    let numberWallpaper = getRandomNum(1, 20);

    if (targetElement.value === 'github') {
        showBackgroud(numberWallpaper);
    } else if (targetElement.value === 'unsplash') {
        showBackgroudUnsplash();
    } else if (targetElement.value === 'flickr') {
        showBackgroudFlickr();
    }
});

slidePrev.addEventListener('click', () => {
    if (radioValue() === 'unsplash') {
        showBackgroudUnsplash();
    }
    if (radioValue() === 'flickr') {
        showBackgroudFlickr();
    }
});

slideNext.addEventListener('click', () => {
    if (radioValue() === 'unsplash') {
        showBackgroudUnsplash();
    }
    if (radioValue() === 'flickr') {
        showBackgroudFlickr();
    }
});
