(function ($) {
    "use strict";
    jQuery(document).ready(function ($) {

        $(document).ready(function($) {
            $('a[href$=".pdf"]').attr({
                target: "_blank",
                rel: "noopener noreferrer"
            });

            $('a[href^="http"]').each(function() {
                var linkHost = this.hostname;
                var currentHost = window.location.hostname;

                if (linkHost && linkHost !== currentHost) {
                $(this).attr({
                    target: '_blank',
                    rel: 'noopener noreferrer'
                });
                }
            });

        });

        $(document).ready(function($) {
        $('.mainmenu ul li a').on('click', function(e) {
            e.preventDefault(); 
            window.location.href = $(this).attr('href');
        });
        });        

        var sliderTimer = 6000; // autoplaySpeed in ms
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

        }


var $secondSlider = $('.product-slider');

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
    fade: true,
    pauseOnHover: false,
    prevArrow: $('.pr-slider-prev-arrow'),
    nextArrow: $('.pr-slider-next-arrow')
  });

  const $cursor = $(`
    <div class="custom-cursor">
       <svg class="arrow-icon" viewBox="0 0 320 512">
        <path class="arrow-left" d="M41.4 233.4l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256l137.3-137.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        <path class="arrow-right" d="M278.6 233.4l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
      </svg>
    </div>
  `);

  $('body').append($cursor);

  let direction = 'right';
  let navDisabled = false;

  function updateDirection(e) {
    const offset = $secondSlider.offset();
    const x = e.pageX - offset.left;
    direction = x < $secondSlider.width() / 2 ? 'left' : 'right';

    $cursor.find('.arrow-left, .arrow-right').removeClass('active');
    $cursor.find(direction === 'left' ? '.arrow-left' : '.arrow-right').addClass('active');

    $cursor.css({
      left: e.pageX - 35,
      top: e.pageY - 35
    });
  }

  $secondSlider.on('mouseenter', function (e) {
    if (navDisabled) return;
    $cursor.show();
    updateDirection(e);
  });

  $secondSlider.on('mousemove', function (e) {
    if (navDisabled) return;
    updateDirection(e);
  });

  $secondSlider.on('mouseleave', function () {
    $cursor.hide();
  });

  $secondSlider.on('mouseenter', '.photo-credit, .trigger-tooltip', function () {
    navDisabled = true;
    $cursor.hide();
  });

  $secondSlider.on('mouseleave', '.photo-credit, .trigger-tooltip', function (e) {
  navDisabled = false;
  $cursor.show();
  updateDirection(e);
});

  $secondSlider.on('mousedown mouseup click', '.photo-credit, .photo-credit *, .trigger-tooltip, .trigger-tooltip *', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
  });

  $secondSlider.on('click', function () {
    if (navDisabled) return;
    direction === 'right'
      ? $secondSlider.slick('slickNext')
      : $secondSlider.slick('slickPrev');
  });
}


/*
const $slider = $('.product-single-slider');
if ($slider.length) {
  // Slick Init
  $slider.slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  });

  // Custom Cursor (arrows only)
  const $cursor = $(`
    <div class="custom-cursor">
      <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path class="arrow-left" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        <path class="arrow-right" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
      </svg>
    </div>
  `);

  $('body').append($cursor);

  let direction = 'right';

  function updateDirection(e) {
    const offset = $slider.offset();
    const x = e.pageX - offset.left;
    const sliderWidth = $slider.width();
    const newDirection = x < sliderWidth / 2 ? 'left' : 'right';

    if (newDirection !== direction) {
      direction = newDirection;
      $cursor.find('.arrow-left, .arrow-right').removeClass('active');
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
  });

  $slider.on('mousemove', function (e) {
    updateDirection(e);
  });

  $slider.on('mouseleave', function () {
    $cursor.hide();
  });

  $slider.on('click', function () {
    if (direction === 'right') {
      $slider.slick('slickNext');
    } else {
      $slider.slick('slickPrev');
    }
  });
}
*/
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

$('.sample-box-slider').each(function (index, el) {
    const $slider = $(el);
    let direction = 'right';

    // Build cursor
    const $cursor = $(`
        <div class="custom-cursor cursor-${index}">
            <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path class="arrow-left" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                <path class="arrow-right" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
            </svg>
        </div>
    `).appendTo('body');

    // Circle setup (just static ring, no progress)
    const $circle = $cursor.find('circle');
    const radius = 32;
    const circumference = 2 * Math.PI * radius;
    $circle.css({
        strokeDasharray: circumference,
        strokeDashoffset: 0 // always visible, no animation
    });

    function updateDirection(e) {
    const offset = $slider.offset();
    const x = e.pageX - offset.left;
    const sliderWidth = $slider.width();
    const newDirection = x < sliderWidth / 2 ? 'left' : 'right';

    $cursor.find('.arrow-left').removeClass('active');
    $cursor.find('.arrow-right').removeClass('active');

    if (newDirection === 'left') {
        $cursor.find('.arrow-left').addClass('active');
    } else {
        $cursor.find('.arrow-right').addClass('active');
    }

    direction = newDirection;

    $cursor.css({
        left: e.pageX - 35 + 'px',
        top: e.pageY - 35 + 'px'
    });
    }

    // Init slick
    $slider.slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    // Events per slider
    $slider.on('mouseenter', function (e) {
        $cursor.show();
        updateDirection(e);
    });
    $slider.on('mousemove', function (e) {
        updateDirection(e);
    });
    $slider.on('mouseleave', function () {
        $cursor.hide();
    });
    $slider.on('click', function () {
        direction === 'right'
            ? $slider.slick('slickNext')
            : $slider.slick('slickPrev');
    });
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
            $(".menu-panel").removeClass("active");
            $(".menu-panel:first-child").addClass("active");
        });

        $('.photo-credit').on('click', function () {
            $(this).toggleClass('open');
            $('.photo-credit .pc-wrapper').slideToggle();
        });
        
                
         function customPopup() {

            let $btnShowPopup = $('.js-open-popup');
            let $btnClosePopup = $('.js-close-popup');
            let $popup = $('.js-custom-popup');

            $btnShowPopup.on('click', function () {

                let targetPopup = $(this).attr('data-target');
                $("[data-popup=" + targetPopup + "]").addClass('active');
                $("body").addClass('fix');

            });

            $btnClosePopup.on('click', function () {
                $(this).parents('.active').removeClass('active');
                $("body").removeClass('fix');
            });


        }
        customPopup();

        $('.commercial-page-banner').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.commercial-page-banner-nav'
        });
        $('.commercial-page-banner-nav').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.commercial-page-banner',
            dots: true,
            focusOnSelect: true,
            arrows:false,
            dots:false
        });

    });
    
     window.onload = function () {

        var $container = $(".masonry");
        $container.masonry({
            percentPosition: true
        });
    };
}(jQuery));


document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".toggle-password");
    const input = document.querySelector("#password-field");

    if (!toggle || !input) return;

    const icon = toggle.querySelector("i");
    if (!icon) return;

    toggle.addEventListener("click", function () {
        const type = input.getAttribute("type") === "password" ? "text" : "password";
        input.setAttribute("type", type);

        // swap icon
        if (type === "password") {
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    });
});
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

  gsap.fromTo(".scroll-pin-image-area.desktop > .inner",
    {
      scale: 0.8,
      clipPath: "inset(5% 5% 5% 5%)"
    },
    {
      scale: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".scroll-pin-image-area.desktop",
        start: "top bottom",     
        end: "top top",          
        scrub: true,
      }
    }
  );

  ScrollTrigger.create({
    trigger: ".scroll-pin-image-area.desktop",
    start: "top top",            
    end: "+=250%",               
    pin: ".scroll-pin-image-area.desktop",
    pinSpacing: false,           
    anticipatePin: 1,

    onEnter: () =>
      document.querySelector(".scroll-pin-image-area.desktop").classList.add("is-sticky"),

    onLeave: () =>
      document.querySelector(".scroll-pin-image-area.desktop").classList.remove("is-sticky"),

    onEnterBack: () =>
      document.querySelector(".scroll-pin-image-area.desktop").classList.add("is-sticky"),

    onLeaveBack: () =>
      document.querySelector(".scroll-pin-image-area.desktop").classList.remove("is-sticky"),
  });
}

if (document.querySelector(".explore-collection-area.desktop .inner")) {

  gsap.fromTo(".explore-collection-area.desktop .inner",
    {
      scale: 0.8,
      clipPath: "inset(5% 5% 5% 5%)",
    },
    {
      scale: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".explore-collection-area.desktop",
        start: "top bottom",     
        end: "top top",          
        scrub: true,
      },
    }
  );

  ScrollTrigger.create({
    trigger: ".explore-collection-area.desktop",
    start: "top top",            
    end: "+=250%",               
    pin: ".explore-collection-area.desktop",
    pinSpacing: false,           
    anticipatePin: 1,

    onEnter: () =>
      document.querySelector(".explore-collection-area.desktop").classList.add("is-sticky"),

    onLeave: () =>
      document.querySelector(".explore-collection-area.desktop").classList.remove("is-sticky"),

    onEnterBack: () =>
      document.querySelector(".explore-collection-area.desktop").classList.add("is-sticky"),

    onLeaveBack: () =>
      document.querySelector(".explore-collection-area.desktop").classList.remove("is-sticky"),
  });
}

document.querySelectorAll('.clone').forEach(cloneBtn => {
    cloneBtn.addEventListener('click', function () {
        // Find the closest parent <ul> and get the email text
        const email = this.closest('ul').querySelector('.emailCopy').textContent;

        navigator.clipboard.writeText(email)
            .then(() => {
                // Optional: show feedback
                cloneBtn.style.opacity = '0.5';
                setTimeout(() => {
                    cloneBtn.style.opacity = '1';
                }, 500);
            })
            .catch(err => {
                console.error('Failed to copy email: ', err);
            });
    });
});