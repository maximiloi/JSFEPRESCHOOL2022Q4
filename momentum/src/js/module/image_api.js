import { getRandomNum } from '../script.js';
import { getTimeOfDay } from './greeting.js';
import { showBackgroud, body } from './slider.js';

const API_UNSPLASH_KEY = 'zdEkaNyxosOqQdRciqyzDDOY_u202OUB0FyIfaTFkcY';
const API_FLICKR_KEY = 'd61240548aa4eadfdc660e27e7e5f4b4';

const toggleButtonCover = document.querySelector('.footer__api');
const radioImageApis = document.querySelectorAll('.radio-image-api');
const radioImageTagInput = document.querySelector('.radio-image-tag');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

let tag = '';
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

async function showBackgroudUnsplash(tag = getTimeOfDay()) {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=${API_UNSPLASH_KEY}`;
    console.log('url Unsplash: ', url);
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

async function showBackgroudFlickr(tag = `${getTimeOfDay()},nature`) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_FLICKR_KEY}&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
    console.log('url Flickr: ', url);
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
        radioImageTagInput.classList.remove('active');
        showBackgroud(numberWallpaper);
    } else if (targetElement.value === 'unsplash') {
        radioImageTagInput.classList.add('active');
        showBackgroudUnsplash(radioImageTagInput.value ? radioImageTagInput.value : getTimeOfDay());
    } else if (targetElement.value === 'flickr') {
        radioImageTagInput.classList.add('active');
        showBackgroudFlickr(radioImageTagInput.value ? radioImageTagInput.value : `${getTimeOfDay()},nature`);
    }
});

slidePrev.addEventListener('click', () => {
    if (radioValue() === 'unsplash') {
        showBackgroudUnsplash(radioImageTagInput.value ? radioImageTagInput.value : getTimeOfDay());
    }
    if (radioValue() === 'flickr') {
        showBackgroudFlickr(radioImageTagInput.value ? radioImageTagInput.value : `${getTimeOfDay()},nature`);
    }
});

slideNext.addEventListener('click', () => {
    if (radioValue() === 'unsplash') {
        showBackgroudUnsplash(radioImageTagInput.value ? radioImageTagInput.value : getTimeOfDay());
    }
    if (radioValue() === 'flickr') {
        showBackgroudFlickr(radioImageTagInput.value ? radioImageTagInput.value : `${getTimeOfDay()},nature`);
    }
});

radioImageTagInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        tag = event.target.value.split(' ').join('');

        if (radioValue() === 'unsplash') {
            radioImageTagInput.classList.add('active');
            showBackgroudUnsplash(tag);
        } else if (radioValue() === 'flickr') {
            radioImageTagInput.classList.add('active');
            showBackgroudFlickr(tag);
        }
        return false;
    }
});
