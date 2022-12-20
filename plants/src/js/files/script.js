// Импорт функционала
// import { isMobile } from './functions.js';
// import { formsModules } from "./forms/forms.js";

// console.log('Ваша оценка - 110 баллов');
// console.log('');
// console.log('Отзыв по пунктам ТЗ:');
// console.log('');
// console.log('Выполненные пункты:');

console.info('Ваша оценка - 107 баллов');
console.log(
    'Вёрстка валидная +10\nдля проверки валидности вёрстки используйте сервис https://validator.w3.org/\nвалидной вёрстке соответствует надпись "Document checking completed. No errors or warnings to show." В таком случае баллы за пункт требований выставляем полностью.\nесли есть предупреждения - warnings, но нет ошибок - errors, выставляем половину баллов за пункт требований\n\nВёрстка семантическая:\n<header>, <main>, <footer> +3\nпять элементов <section> (по количеству секций) +3\nтолько один заголовок <h1> +3\nчетыре заголовка <h2> (количество секций минус одна, у которой заголовок <h1>) +3\nодин элемент <nav> (панель навигации) +3\nдва списка ul > li > a (панель навигации, ссылки на соцсети) +3\nпять кнопок <button> +2\n\nВёрстка соответствует макету:\nблок <header> +6\nсекция welcome +7\nсекция about +7\nсекция service +7\nсекция prices +7\nсекция contacts +4\nблок <footer> +7\n\nТребования к css\nдля построения сетки используются флексы или гриды +2\nпри уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2\nфоновый цвет тянется на всю ширину страницы +2\nиконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления +2\nизображения добавлены в формате .jpg или .png +2\nесть favicon +2\n\nИнтерактивность, реализуемая через css\nплавная прокрутка по якорям +5\nиконки соцсетей в футере при нажатии на них ведут на гитхаб автора проекта и на страницу курса (допускается добавление своих вариантов иконок github или RSSchool) https://rs.school/js-stage0/ +5\nинтерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты, например, изменение цвета фона или цвета шрифта. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета +5\nобязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +5\n\n'
);

let selectors = [
    'article',
    'aside',
    'figure',
    'figcaption',
    'footer',
    'header',
    'main',
    'nav',
    'section',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'nav',
    'button',
    'ul > li > a',
    'input[type=radio]',
    'input[type=number]',
    'input[type=range]',
    'img:not([alt])',
];

selectors.forEach((selector) => {
    const count = Array.from(document.querySelectorAll(selector)).length;
    console.log(`${selector} : ${count}`);
});

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
