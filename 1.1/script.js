document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.querySelector('.js-dropdown');
    const menu = document.querySelector(openButton.dataset.target);
    const menuCont = document.querySelector('.menu-dropdown');

    openButton.addEventListener('click', () => {
        menu.style.display = 'block';
    })

    menuCont.querySelector('.dropdown').addEventListener('click', event => {
        event._isClickWithinMenu = true;
    })

    menuCont.addEventListener('click', event => {
        if (event._isClickWithinMenu) return;
        menu.style.display = 'none';
    })
})