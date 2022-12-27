// Импорт функционала ========================================================================================================================
// import { isMobile } from './functions.js';
// import { formsModules } from "./forms/forms.js";

console.log('Ваша оценка - 79.5 баллов');
// console.log('');
// console.log('Отзыв по пунктам ТЗ:');
// console.log('');
// console.log('Выполненные пункты:');

const selected = document.querySelector('.selected');
const optionsContainer = document.querySelector('.options-container');

const optionsList = document.querySelectorAll('.option');

selected.addEventListener('click', () => {
    optionsContainer.classList.toggle('active');
});

optionsList.forEach((o) => {
    o.addEventListener('click', () => {
        selected.innerHTML = o.querySelector('label').innerHTML;
        optionsContainer.classList.remove('active');
    });
});

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
};

document.addEventListener('click', documentActions);
