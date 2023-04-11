const regExp = /[А-Яа-яЁё\-\s]/;

document.addEventListener('DOMContentLoaded', event => {
    const inputSecondName = document.querySelector('#second-name');
    const inputName = document.querySelector('#name');
    const inputSurname = document.querySelector('#surname');
    const form = document.querySelector('#form');
    const result = document.querySelector('#result');

    inputSecondName.addEventListener('keypress', onKeyPress);
    inputSecondName.addEventListener('blur', onBlur);
    inputName.addEventListener('keypress', onKeyPress);
    inputName.addEventListener('blur', onBlur);
    inputSurname.addEventListener('keypress', onKeyPress);
    inputSurname.addEventListener('blur', onBlur);
    form.addEventListener('submit', onSubmit);

    function onKeyPress(event) {
        if (!regExp.test(event.key)) {
            event.preventDefault();
        }
    }

    function onBlur(event) {
        const inputTarget = event.target;
        inputTarget.value = inputTarget.value.replace(/\s+/g, ' ');
        inputTarget.value = inputTarget.value.replace(/\-+/g, '-');
        inputTarget.value = inputTarget.value.replace(/[^А-Яа-яЁё\-\s]/g, '');
        inputTarget.value = inputTarget.value.replace(/(^\s+)|(^\-+)|(\s+$)|(\-+$)/g, '');
        if (inputTarget.value) {
            inputTarget.value = inputTarget.value[0].toUpperCase() + inputTarget.value.slice(1).toLowerCase();
        }
    }

    function onSubmit(event) {
        event.preventDefault();
        const createdElement = document.createElement('p');
        createdElement.innerText = inputSecondName.value + ' ' + inputName.value + ' ' + inputSurname.value;
        result.appendChild(createdElement);
    }
})

