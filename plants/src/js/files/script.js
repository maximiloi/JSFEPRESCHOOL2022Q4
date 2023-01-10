// Импорт функционала ========================================================================================================================
// import { isMobile } from './functions.js';
// import { formsModules } from "./forms/forms.js";

// console.log('Ваша оценка - 79.5 баллов');

const ADRESSES_LIST = {
    canandaigua: ['Canandaigua, NY', '+1 585 393 0001', '151 Charlotte Street'],
    newyorkcity: ['New York City', '+1 212 456 0002', '9 East 91st Street'],
    yonkers: ['Yonkers, NY', '+1 914 678 0003', '511 Warburton Ave'],
    sherrill: ['Sherrill, NY', '+1 315 908 0004', '14 WEST Noyes BLVD'],
};

// Установка адреса в меню
const setAdress = (city) => {
    const adressBoxWrapper = document.querySelector('.adress-box');
    const adressOutElem = adressBoxWrapper.querySelectorAll('.adress-box__item--out');
    const adressButton = adressBoxWrapper.querySelector('.adress-box__button');

    let count = 0;

    if (adressBoxWrapper.closest('.none')) {
        adressBoxWrapper.classList.remove('none');
        adressBoxWrapper.classList.add('active');
    }

    for (const key in ADRESSES_LIST) {
        if (key === city) {
            adressOutElem.forEach((value) => {
                value.innerHTML = ADRESSES_LIST[key][count];
                count++;
            });
            adressButton.href = `tel:${ADRESSES_LIST[key][1].split(' ').join('')}`;
        }
    }
};

const documentActions = (e) => {
    const targetElem = e.target;
    // console.log('%c [ targetElem ]-29', 'font-size:13px; background:pink; color:#bf2c9f;', targetElem);

    // Работа с меню
    // открываем меню и закрываем меню
    if (targetElem.closest('.nav__burger')) {
        document.documentElement.classList.toggle('menu-open');
    }

    // Клик по выбранной ссылке
    if (targetElem.closest('.nav__link')) {
        document.documentElement.classList.remove('menu-open');
    }

    // Если клик на любом другом поле
    if (!targetElem.closest('.nav__burger') && !targetElem.closest('.nav__list')) {
        document.documentElement.classList.remove('menu-open');
    }

    // Работа с дропменю в контактах
    if (targetElem.closest('.selected')) {
        document.querySelector('.options-container').classList.toggle('active');
    }

    if (targetElem.closest('.options-container label')) {
        document.querySelector('.selected').innerHTML = targetElem.innerHTML;
        document.querySelector('.options-container').classList.remove('active');
        setAdress(targetElem.dataset.city);
    }
};

document.addEventListener('click', documentActions);

// const selected = document.querySelector('.selected');
// const optionsContainer = document.querySelector('.options-container');

// selected.addEventListener('click', () => {
//     optionsContainer.classList.toggle('active');
// });

// const optionsList = document.querySelectorAll('.option');

// optionsList.forEach((o) => {
//     o.addEventListener('click', () => {
//         document.querySelector('.selected').innerHTML = o.querySelector('label').innerHTML;
//         document.querySelector('.options-container').classList.remove('active');
//         setAdress(o.querySelector('label').dataset.city);
//     });
// });
