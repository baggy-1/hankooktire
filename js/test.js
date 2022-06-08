const intro = document.querySelector('.intro-shop');
const btn = document.querySelector('.btn-book');

function changeIntro(e) {
    intro.textContent = 'test!!';
};

btn.addEventListener('click', changeIntro);