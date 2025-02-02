import Swiper, { Autoplay, Pagination, Navigation } from 'swiper';

import 'scss/slider.scss'

const options = {
    modules: [Autoplay, Pagination, Navigation],
    loop: false,
}

const pagination = {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
}

const itemsSlider = new Swiper('.items-slider', {
    ...options,
    speed: 2500,
    pagination,
    centerInsufficientSlides: true,
    breakpoints: {
        spaceBetween: 20,
        slidesPerView: 1,
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 70,
        },
    },
})

const heroSlider = new Swiper('.hero-slider', {
    ...options,
    speed: 100,
    pagination,
    loop: true,
    centerInsufficientSlides: true,
    breakpoints: {
        spaceBetween: 0,
        slidesPerView: 1,
    },
    navigation: {
        nextEl: '.swiper-hero-button-next',
        prevEl: '.swiper-hero-button-prev',
    },
    autoplay: {
        delay: 5000,
    },
})

// Add keyboard functionality to hero navigation buttons
const prevButton = document.querySelector('.swiper-hero-button-prev');
const nextButton = document.querySelector('.swiper-hero-button-next');

function handleKeydown(event, callback) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); // Prevent default scrolling behavior for spacebar
        callback();
    }
}

// Handle "Previous" button
prevButton.addEventListener('keydown', (event) => {
    handleKeydown(event, () => heroSlider.slidePrev());
});

// Handle "Next" button
nextButton.addEventListener('keydown', (event) => {
    handleKeydown(event, () => heroSlider.slideNext());
});