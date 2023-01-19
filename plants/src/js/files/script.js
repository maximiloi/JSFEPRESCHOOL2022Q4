// Импорт функционала ========================================================================================================================
// import { isMobile } from './functions.js';
// import { formsModules } from "./forms/forms.js";

// console.log('');
// console.log('Ваша оценка - 81 баллов');
// console.log('');
// console.log('Частично выполненные пункты:');
// console.log(
//     'Вёрстка соответствует макету. Ширина экрана 768px +4\n1) Секция prices\nОтзыв: слово прайс уезжает\n2) Секция contacts\nОтзыв: Слово city уезжает'
// );
// console.log('');
// console.log('Выполненные пункты:');
// console.log(
//     'Вёрстка соответствует макету. Ширина экрана 768px +16\n1) Блок header\n2) Секция welcome\n3) Секция about\n4) Секция service\n5) Блок footer\n\nВёрстка соответствует макету. Ширина экрана 380px +24\n6) Блок header\n7) Секция welcome\n8) Секция about\n9) Секция service\n10) Секция prices\n11) Секция contacts\n12) Блок footer\n\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n13) нет полосы прокрутки при ширине страницы от 1440рх до 380px\n14) нет полосы прокрутки при ширине страницы от 380px до 320рх\n\nНа ширине экрана 380рх и меньше реализовано адаптивное меню +22\n15) при ширине страницы 380рх панель навигации скрывается, появляется бургер-иконка\n16) при нажатии на бургер-иконку плавно появляется адаптивное меню\n17) адаптивное меню соответствует цветовой схеме макета\n18) при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран\n19) ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям\n20) при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна'
// );

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

const addFilterInstallation = () => {
    const serviceButton = document.querySelectorAll('.service__button');
    const serviceItem = document.querySelectorAll('.service__item');

    let filterArray = []; // вспомогательный класс

    // проверяем кнопки, есть ли у них класс актив, если нет, добавляем их в массив
    serviceButton.forEach((button) => {
        if (!button.closest('.active')) {
            filterArray.push(button.innerHTML);
        }
    });

    // Отключаем кнопки если выбрано два выбора
    if (filterArray.length <= 1) {
        serviceButton.forEach((button) => {
            if (!button.closest('.active')) {
                button.disabled = true;
            }
        });
    } else {
        serviceButton.forEach((button) => {
            button.disabled = false;
        });
    }

    // удаляем (обнуляем) фильтр со всех карточек
    serviceItem.forEach((item) => {
        item.classList.remove('filter');
    });

    // проверяем массив и добавляем карточкам класс фильтр
    filterArray.forEach((filterValue) => {
        serviceItem.forEach((item) => {
            if (filterValue === item.dataset.filter) {
                item.classList.add('filter');
            }
        });
    });

    // если в массиве значений столько же сколько кнопок, убираем фильтр со всех карточек
    if (filterArray.length === 3) {
        serviceItem.forEach((item) => {
            item.classList.remove('filter');
        });
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

    // Клик на сервис__кнопке
    if (targetElem.closest('.service__button')) {
        targetElem.classList.toggle('active');
        addFilterInstallation();
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
