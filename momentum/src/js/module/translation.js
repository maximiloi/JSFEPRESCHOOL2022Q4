const translationCheckbox = document.querySelector('.toggle-button-cover input');

export const greetingTranslation = { eng: 'Good', rus: 'Доброго' };
// console.log('greetingTranslation: ', greetingTranslation.eng);

export function lng() {
    if (translationCheckbox.checked) {
        return 'rus';
    }
    return 'eng';
}

translationCheckbox.addEventListener('click', () => {
    lng();
    console.log('lng(): ', lng());
});
