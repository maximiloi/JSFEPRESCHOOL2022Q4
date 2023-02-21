const settingWrapper = document.querySelector('.setting__wrapper');
const checkboxSetting = document.querySelectorAll('.checkbox__setting');

document.addEventListener('click', function (event) {
    const targetElement = event.target;

    if (targetElement.closest('.setting-icon')) {
        settingWrapper.classList.toggle('active');
    }

    if (targetElement.closest('.checkbox__setting')) {
        if (targetElement.checked === true) {
            let elementWrapper = `.${targetElement.id}__wrapper`;
            document.querySelector(elementWrapper).classList.add('hidden');
            setLocalStorageCheckboxSetting();
        }
        if (targetElement.checked === false) {
            let elementWrapper = `.${targetElement.id}__wrapper`;
            document.querySelector(elementWrapper).classList.remove('hidden');
            setLocalStorageCheckboxSetting();
        }
    }
});

function setLocalStorageCheckboxSetting() {
    let settingArray = [];
    checkboxSetting.forEach((item) => {
        let itemId = item.id;
        let itemStarus = item.checked;
        if (itemStarus === true) {
            settingArray.push(itemId);
        }
    });
    localStorage.setItem('setting', JSON.stringify(settingArray));
}

function getLocalStorageCheckboxSetting() {
    let settingArray = JSON.parse(localStorage.getItem('setting'));
    checkboxSetting.forEach((item) => {
        let itemId = item.id;
        settingArray.forEach((checkbox) => {
            if (itemId === checkbox) {
                item.checked = true;
                let elementWrapper = `.${itemId}__wrapper`;
                document.querySelector(elementWrapper).classList.add('hidden');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    getLocalStorageCheckboxSetting();
});
