// Импорт функционала ========================================================================================================================
// import { isMobile } from './functions.js';
// import { formsModules } from "./forms/forms.js";

console.log('');
console.log('Ваша оценка - 125 баллов');
console.log('');
console.log('Выполненные пункты:');
console.log(
    '1) При выборе одной услуги (нажатии одной кнопки), остальные карточки услуг принимают эффект blur, выбранная услуга остается неизменной + 20\n2) Пользователь может нажать одновременно две кнопки услуги, тогда эта кнопка тоже принимает стиль активной и карточки с именем услуги выходят из эффекта blur. При этом пользователь не может нажать одновременно все три кнопки услуг. При повторном нажатии на активную кнопку она деактивируется (становится неактивной) а привязанные к ней позиции возвращаются в исходное состояние (входит в состяние blur если есть еще активная кнопка или же перестають быть в блюре если это была единственная нажатая кнопка). +20\n3) Анимации плавного перемещения кнопок в активное состояние и карточек услуг в эффект blur +10\n4) При нажатии на dropdown кнопку появляется описание тарифов цен в соответствии с макетом. Внутри реализована кнопка order, которая ведет на секцию contacts, при нажатии на нее Accordion все еще остается открытым. +25\n5) Пользователь может самостоятельно закрыть содержимое нажав на кнопку dropup, но не может одновременно открыть все тарифы услуг, при открытии нового тарифа предыдущее автоматически закрывается. +25\n6) В зависимости от выбора пользователя появляется блок с адресом и телефоном офиса в определенном городе +15\n7) При нажатии на кнопку Call us реализован вызов по номеру, который соответствует выбранному городу +10'
);

const ADRESSES_LIST = {
    canandaigua: ['Canandaigua, NY', '+1 585 393 0001', '151 Charlotte Street'],
    newyorkcity: ['New York City', '+1 212 456 0002', '9 East 91st Street'],
    yonkers: ['Yonkers, NY', '+1 914 678 0003', '511 Warburton Ave'],
    sherrill: ['Sherrill, NY', '+1 315 908 0004', '14 WEST Noyes BLVD'],
};

// Установка адреса в меню
const setAdress = (city) => {
    const contactsContainer = document.querySelector('.contacts__container');
    const adressOutElem = contactsContainer.querySelectorAll('.adress-box__item--out');
    const adressButton = contactsContainer.querySelector('.adress-box__button');

    let count = 0;

    contactsContainer.classList.add('adress-active');

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

const documentActions = (event) => {
    const targetElem = event.target;
    // console.log('%c [ targetElem ]-29', 'font-size:13px; background:pink; color:#bf2c9f;', targetElem);

    // Открываем или закрываем меню по кнопке бургера
    if (targetElem.closest('.nav__burger')) {
        document.documentElement.classList.toggle('menu-open');
    }

    // Если клик на ссылке или любом другом месте
    if (
        targetElem.closest('.nav__link') ||
        (!targetElem.closest('.nav__burger') && !targetElem.closest('.nav__list'))
    ) {
        document.documentElement.classList.remove('menu-open');
    }

    // Клик на сервис__кнопке
    if (targetElem.closest('.service__button')) {
        targetElem.classList.toggle('active');
        addFilterInstallation();
    }

    // Работа с дропменю в прайсах
    if (targetElem.closest('.accordion__summary')) {
        const accordionItems = document.querySelectorAll('.accordion__item');
        if (!targetElem.parentElement.open) {
            accordionItems.forEach((item) => {
                item.open = false;
            });
        }
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
