// Импорт функционала ========================================================================================================================
// import { isMobile } from './functions.js';
// import { formsModules } from "./forms/forms.js";
console.log('');
console.log('Ваша оценка - 81 баллов');
console.log('');
console.log('Частично выполненные пункты:');
console.log(
    'Вёрстка соответствует макету. Ширина экрана 768px +4\n1) Секция prices\nОтзыв: слово прайс уезжает\n2) Секция contacts\nОтзыв: Слово city уезжает'
);
console.log('');
console.log('Выполненные пункты:');
console.log(
    'Вёрстка соответствует макету. Ширина экрана 768px +16\n1) Блок header\n2) Секция welcome\n3) Секция about\n4) Секция service\n5) Блок footer\n\nВёрстка соответствует макету. Ширина экрана 380px +24\n6) Блок header\n7) Секция welcome\n8) Секция about\n9) Секция service\n10) Секция prices\n11) Секция contacts\n12) Блок footer\n\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n13) нет полосы прокрутки при ширине страницы от 1440рх до 380px\n14) нет полосы прокрутки при ширине страницы от 380px до 320рх\n\nНа ширине экрана 380рх и меньше реализовано адаптивное меню +22\n15) при ширине страницы 380рх панель навигации скрывается, появляется бургер-иконка\n16) при нажатии на бургер-иконку плавно появляется адаптивное меню\n17) адаптивное меню соответствует цветовой схеме макета\n18) при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран\n19) ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям\n20) при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна'
);

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
