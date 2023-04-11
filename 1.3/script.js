document.addEventListener('DOMContentLoaded', () => {
    const scrollButton = document.querySelector('#scroll-button');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset >= 300) {
            scrollButton.style.display = 'block';
            scrollButton.style.behavior = 'smooth';
        } else {
            scrollButton.style.display = 'none';
        }
    }, { passive: true })

    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    })
})