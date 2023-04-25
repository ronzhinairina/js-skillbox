const input = document.querySelector('input');
const button = document.querySelector('button');
const ol = document.querySelector('ol');
const form = document.querySelector('form');

form.addEventListener('click', (e) => {
    e.preventDefault();
});

button.addEventListener('click', () => {
    const className = input.value;
    if (!className || !window[className]) {
        input.style = "border-color:red";
        return;
    }
    ol.innerHTML = arrayToHtml(getPrototypeChain(className));
});

function getPrototypeChain(className) {
    let obj = window[className];
    const result = [getNameOf(obj)];
    while (obj.__proto__) {
        result.push(getNameOf(obj.__proto__));
        obj = obj.__proto__;
    }

    return result;
}

function getNameOf(obj) {
    return obj.name || obj.constructor.name;
}

function arrayToHtml(array) {
    return array.map(item => {
        return `<li>${item}</li>`;
    }).join('');
}