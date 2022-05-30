const navBtn = document.querySelectorAll('.nav-content');
const navToggle = document.querySelector('#nav-toggle');
const navWrap = document.querySelector('.nav-content-wrapper');
const navContent = document.querySelectorAll('.nav-content');
const navCircle = document.querySelector('.nav-circle');

function closeNavTap(e) {
    navToggle.checked = false;
    closeToggle();
}

function closeToggle(e) {
    if (navToggle.checked == false) {
        navCircle.classList.add('noactiveCC');
        navCircle.classList.remove('activeCC');
        navContent.forEach(content => {
            content.classList.add('noactiveC');
            content.classList.remove('activeC');
        });
    }
    else {
        navCircle.classList.add('activeCC');
        navCircle.classList.remove('noactiveCC');
        navContent.forEach(content => {
            content.classList.add('activeC');
            content.classList.remove('noactiveC');
        });
    }
}


if(matchMedia("(max-width: 768px)").matches) {
    navBtn.forEach(btn => {
        btn.addEventListener('click', closeNavTap);
    });
    navToggle.addEventListener('click', closeToggle);
}