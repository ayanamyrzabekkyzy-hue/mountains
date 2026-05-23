const header = document.querySelector('.header')
window.addEventListener('scroll', () => {
    if (window.scrollY > 300 ) {
        header.classList.add('active_header')
    } else {
        header.classList.remove('active_header')
    }
})

const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const sliderBlock = document.querySelector('.slider_block');
let index = 0;
let autoSliderInterval; 

const hideSlide = () => {
    slides.forEach((slide) => {
        slide.classList.remove('active_slide');
    });
};

const showSlide = (i = 0) => {
    hideSlide();
    slides[i].classList.add('active_slide');
    
    const bgUrl = slides[i].getAttribute('data-bg');
    
    if (bgUrl && sliderBlock) {
        sliderBlock.style.setProperty('--current-bg', `url('${bgUrl}')`);
    }
};

const nextSlide = () => {
    index < slides.length - 1 ? index++ : index = 0;
    showSlide(index);
};

const prevSlide = () => {
    index > 0 ? index-- : index = slides.length - 1;
    showSlide(index);
};

next.onclick = () => {
    nextSlide();
    resetTimer(); 
};

prev.onclick = () => {
    prevSlide();
    resetTimer();
};

const startAutoSlider = () => {
    autoSliderInterval = setInterval(() => {
        nextSlide();
    }, 8000);
};
const resetTimer = () => {
    clearInterval(autoSliderInterval);
    startAutoSlider();
};
showSlide(index);
startAutoSlider();