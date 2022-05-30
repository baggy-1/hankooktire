const img = document.querySelector('.move-img-wrap');
const btnLeft = document.querySelector('.btn-arrow-left');
const btnRight = document.querySelector('.btn-arrow-right');
const svName = document.querySelector('.service-name');
const shopImg = document.querySelector('.img-shop-wrap');
const btnShopLeft = document.querySelector('#shop-btn-left');
const btnShopRight = document.querySelector('#shop-btn-right');
const svImgBox = document.querySelectorAll('.sv-img');
const spImgBox = document.querySelectorAll('.sp-img');

const serviceNameArr = ['타이어', '얼라이먼트', '엔진오일', '자동차 정비', '대형차 정비']
const IMG_NUM = 5;
let slideNum = 1;
let slideNumShop = 1;

function imgSlide(cmd='right', num=-1) {
    document.querySelector(`#btn-service${slideNum}`).classList.replace('btn-click', 'btn-unclick');
    if (cmd == 'left') {
        slideNum -= 1;
    } else if (cmd == 'right' && num == -1) {
        slideNum += 1;
    } else if (num != -1) {
        slideNum = num;
    }
    img.style.transform = `translateX(-${slideNum * 100 - 100}vw)`;
    svName.textContent = `${serviceNameArr[slideNum - 1]}`;
    document.querySelector(`#btn-service${slideNum}`).classList.replace('btn-unclick', 'btn-click');
}

function imgSlideShop(cmd='right', num=-1) {
    document.querySelector(`#btn-shop${slideNumShop}`).classList.replace('btn-click', 'btn-unclick');
    if (cmd == 'left') {
        slideNumShop -= 1;
    } else if (cmd == 'right' && num == -1) {
        slideNumShop += 1;
    } else if (num != -1) {
        slideNumShop = num;
    }
    shopImg.style.transform = `translateX(-${slideNumShop * 100 - 100}vw)`;
    document.querySelector(`#btn-shop${slideNumShop}`).classList.replace('btn-unclick', 'btn-click');
}

function imgSlideLeft(e) {
    if (slideNum > 1) {
        imgSlide('left');
    }
}

function imgSlideShopLeft(e) {
    if (slideNumShop > 1) {
        imgSlideShop('left');
    }
}

function imgSlideRight(e) {
    if (slideNum < IMG_NUM) {
        imgSlide();
    }
}

function imgSlideShopRight(e) {
    if (slideNumShop < IMG_NUM) {
        imgSlideShop();
    }
}

function imgSlideBtnClick(e) {
    const btn = e.target.id.toString();
    const btnNum = Number(btn[btn.length - 1]);

    imgSlide('right', btnNum);
}

function imgSlideShopBtnClick(e) {
    const btn = e.target.id.toString();
    const btnNum = Number(btn[btn.length - 1]);

    imgSlideShop('right', btnNum);
}

function imgSlideTimer() {
    if (slideNum < IMG_NUM) {
        imgSlide();
    } else if(slideNum == IMG_NUM) {
        imgSlide('right', 1);
    }
}

function imgSlideShopTimer() {
    if (slideNumShop < IMG_NUM) {
        imgSlideShop();
    } else if(slideNumShop == IMG_NUM) {
        imgSlideShop('right', 1);
    }
}

function touchSlide(targ) {
    targ.addEventListener('touchstart', function(e) {
        touchSP = e.touches[0].clientX;
    });
    targ.addEventListener('touchend', function(e) {
        const isSV = e.path[1].classList[1].includes('sv');

        touchEP = e.changedTouches[0].clientX;
        isLeft = (touchSP - touchEP) < -30 ? true : false;
        isRight = (touchSP - touchEP) > 30 ? true : false;
        if (isLeft) {
            if (isSV) {
                imgSlideLeft();
            } else {
                imgSlideShopLeft();
            }
        }
        else if (isRight) {
            if (isSV){
                imgSlideRight();
            } else {
                imgSlideShopRight();
            }
        }
    });
}

btnLeft.addEventListener('click', imgSlideLeft);
btnRight.addEventListener('click', imgSlideRight)
btnShopLeft.addEventListener('click', imgSlideShopLeft);
btnShopRight.addEventListener('click', imgSlideShopRight);
for(let i = 1; i <= IMG_NUM; i++) {
    document.querySelector(`#btn-service${i}`).addEventListener('click', imgSlideBtnClick);
    document.querySelector(`#btn-shop${i}`).addEventListener('click', imgSlideShopBtnClick);
};

let touchSP, touchEP;
let isLeft, isRight;
svImgBox.forEach(touchSlide);
spImgBox.forEach(touchSlide);

setInterval(imgSlideTimer, 3000);
setInterval(imgSlideShopTimer, 3000);