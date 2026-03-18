(function ($) {
    "use strict";
    jQuery(document).ready(function ($) {

        var sliderTimer = 5000; // autoplaySpeed in ms
        var $imageSlider = $('.hero-slider');
        var $progressBar = $('.slider-progress').find('span');

        // Only initialize slider if element exists
        if ($imageSlider.length && $('.hero-prev-arrow').length && $('.hero-next-arrow').length) {
            $imageSlider.slick({
                dots: false,
                arrows: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false,
                autoplay: true,
                autoplaySpeed: sliderTimer,
                fade: true,
                pauseOnHover: false,
                prevArrow: $('.hero-prev-arrow'),
                nextArrow: $('.hero-next-arrow'),
            });

            // Start the progress bar animation if exists
            function startProgressBar() {
                if ($progressBar.length) {
                    $progressBar.removeClass('active').removeAttr('style');
                    void $progressBar[0].offsetWidth; // force reflow
                    $progressBar.css('transition-duration', (sliderTimer / 1000) + 's');
                    $progressBar.addClass('active');
                }
            }

            // Start on load
            startProgressBar();

            // Restart on every slide change
            $imageSlider.on('beforeChange', function () {
                startProgressBar();
            });
        }


        var secondSliderTimer = 5000; // autoplaySpeed in ms
        var $secondSlider = $('.product-slider');
        var $secondProgressBar = $('.pr-slider-progress-holder').find('span');

        // Only initialize second slider if element exists
        if (
            $secondSlider.length &&
            $('.pr-slider-prev-arrow').length &&
            $('.pr-slider-next-arrow').length
        ) {
            $secondSlider.slick({
                dots: false,
                arrows: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false,
                autoplay: true,
                autoplaySpeed: secondSliderTimer,
                fade: true,
                pauseOnHover: false,
                prevArrow: $('.pr-slider-prev-arrow'),
                nextArrow: $('.pr-slider-next-arrow'),
            });

            // Start the progress bar animation
            function startSecondProgressBar() {
                if ($secondProgressBar.length) {
                    $secondProgressBar.removeClass('active').removeAttr('style');
                    void $secondProgressBar[0].offsetWidth; // force reflow
                    $secondProgressBar.css('transition-duration', (secondSliderTimer / 1000) + 's');
                    $secondProgressBar.addClass('active');
                }
            }

            // Start on load
            startSecondProgressBar();

            // Restart on every slide change
            $secondSlider.on('beforeChange', function () {
                startSecondProgressBar();
            });
        }

        const $slider = $('.product-single-slider');
        if ($slider.length) {
            // Slick Init
            $slider.slick({
                dots: false,
                arrows: false,
                infinite: true,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 1
            });

            // Custom Cursor with Dynamic SVG Arrow
            const $cursor = $(`
        <div class="custom-cursor">
            <svg width="70" height="70" class="cursor-svg" viewBox="0 0 70 70">
                <circle r="32" cx="35" cy="35" stroke="#1C2120" stroke-width="2" fill="none"/>
            </svg>
            <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path class="arrow-left" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                <path class="arrow-right" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
            </svg>
        </div>
    `);

            $('body').append($cursor);

            const $circle = $cursor.find('circle');
            const radius = 32;
            const circumference = 2 * Math.PI * radius;
            $circle.css({
                strokeDasharray: circumference,
                strokeDashoffset: circumference
            });

            let progress = 0;
            let interval;
            const duration = 5000;
            const fps = 60;
            let direction = 'right';

            function setProgress(p) {
                const offset = circumference - (p / 100) * circumference;
                $circle.css('strokeDashoffset', offset);
            }

            function resetProgress() {
                clearInterval(interval);
                progress = 0;
                setProgress(0);
            }

            function startProgress() {
                resetProgress();
                interval = setInterval(() => {
                    progress += 100 / (duration / (1000 / fps));
                    setProgress(progress);
                    if (progress >= 100) {
                        clearInterval(interval);
                        progress = 0;
                        direction === 'right' ? $slider.slick('slickNext') : $slider.slick('slickPrev');
                        setTimeout(startProgress, 10);
                    }
                }, 1000 / fps);
            }

            function updateDirection(e) {
                const offset = $slider.offset();
                const x = e.pageX - offset.left;
                const sliderWidth = $slider.width();
                const newDirection = x < sliderWidth / 2 ? 'left' : 'right';

                if (newDirection !== direction) {
                    direction = newDirection;

                    $cursor.find('.arrow-left').removeClass('active');
                    $cursor.find('.arrow-right').removeClass('active');

                    if (direction === 'left') {
                        $cursor.find('.arrow-left').addClass('active');
                    } else {
                        $cursor.find('.arrow-right').addClass('active');
                    }
                }

                $cursor.css({
                    left: e.pageX - 35 + 'px',
                    top: e.pageY - 35 + 'px'
                });
            }

            $slider.on('mouseenter', function (e) {
                $cursor.show();
                updateDirection(e);
                startProgress();
            });

            $slider.on('mousemove', function (e) {
                updateDirection(e);
            });

            $slider.on('mouseleave', function () {
                $cursor.hide();
                resetProgress();
            });

            $slider.on('click', function () {
                resetProgress();
                direction === 'right' ? $slider.slick('slickNext') : $slider.slick('slickPrev');
                startProgress();
            });
        }

        $('.three-column-slider').slick({
            dots: false,
            arrows: false,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: false,
            autoplay: false,
            responsive: [

                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 2,
                        autoplay: true,
                        infinite: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        autoplay: true,
                        infinite: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        autoplay: true,
                        infinite: true
                    }
                }

              ]
        });



        $(".et-js-tilt").tilt({
            scale: 1.01,
            glare: true,
            maxGlare: 0.8,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            speed: 900,
            perspective: 1200
        });



        $('.tabs').on('click', function () {
            var tab = $(this);

            tab.addClass('is-active');

            if (tab.siblings().hasClass('is-active')) {
                tab.siblings().removeClass('is-active');
            }
        });



        $(".search-toggle").click(function () {
            $(".header-search").addClass("active");
        });
        $(".close-search").click(function () {
            $(".header-search").removeClass("active");
        });

        AOS.init({
            duration: 1000,
            once: true
        });

        $("#menu-toggle").click(function () {
            $(this).toggleClass("active");
            $(".mobile-menu").toggleClass("active");
            $(".header-area").toggleClass("active");
        });
        
        $('.photo-credit').on('click', function() {
        $(this).toggleClass('open');
        $('.photo-credit .pc-wrapper').slideToggle();
    });

    });
}(jQuery));

// Menu navigation handler
document.querySelectorAll('[data-target]').forEach(link => {
    link.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');

        // Hide all panels
        document.querySelectorAll('.menu-panel').forEach(panel => {
            panel.classList.remove('active');
        });

        // Show target panel
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle('open');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const tooltips = document.querySelectorAll(".trigger-tooltip");

    tooltips.forEach((tooltip) => {
        const trigger = tooltip.querySelector(".trigger-pin");
        const content = tooltip.querySelector(".trigger-content");

        trigger.addEventListener("click", () => {
            content.classList.toggle("open");
            tooltip.classList.toggle("active");
        });
    });
});


gsap.registerPlugin(ScrollTrigger);

if (document.querySelector(".scroll-pin-image-area.desktop > .inner")) {
    gsap.fromTo(".scroll-pin-image-area.desktop > .inner", {
        scale: 0.3,
        clipPath: 'inset(30% 30% 30% 30%)',
    }, {
        scale: 1,
        clipPath: 'inset(0% 0% 0% 0%)', 
        scrollTrigger: {
            scrub: true,
            trigger: ".scroll-pin-image-area.desktop",
            pin: ".scroll-pin-image-area.desktop",
            start: "top top",
            end: "bottom top",
        },
        ease: "power1.out",
    });
}

if (document.querySelector(".explore-collection-area.desktop .inner")) {
    gsap.fromTo(".explore-collection-area.desktop .inner", {
        scale: 0.3,
        clipPath: 'inset(30% 30% 30% 30%)', 
    }, {
        scale: 1,
        clipPath: 'inset(0% 0% 0% 0%)', 
        scrollTrigger: {
            scrub: true,
            trigger: ".explore-collection-area.desktop",
            pin: ".explore-collection-area.desktop",
            start: "top top",
            end: "bottom top",
        },
        ease: "power1.out",
    });
}
