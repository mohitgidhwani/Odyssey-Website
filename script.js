  window.addEventListener("scroll", function () {
    const header = document.getElementById("main-header");
    if (window.scrollY > 50) {
      header.classList.add("shrink"); // Add shrink on scroll
    } else {
      header.classList.remove("shrink"); // Reset when near top
    }
  });

  
 var swiper = new Swiper(".mySwiper-banner", {
  autoplay : true,
  delay : 2000
 });

  var swiper = new Swiper(".portfolio-wrapper", {
  slidesPerView: 3, // default desktop
  spaceBetween: 30,
  freeMode: false, // ❌ disable freeMode so it snaps properly,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1, // full width on mobile
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1, // optional: 2 slides on tablet
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3, // 3 slides on desktop
      spaceBetween: 30,
    },
  },
});
var swiper = new Swiper(".mySwiper-portfolio", {
  loop: true,                 // Infinite loop
  autoplay: {
    delay: 4000,              // 4s auto slide
    disableOnInteraction: false,
  },
  speed: 800,                 // Smooth transition speed
  slidesPerView: 1,           // Only 1 testimonial at a time
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,          // Enable clickable dots
  },
});



// Hero section solder

$('.owl-carousel').owlCarousel({
  loop: true,
  margin: 10,
  nav: true,          // Arrows
  dots: true,         // Enable dots
  autoplay: true,
  autoplayTimeout: 5000,
  autoplaySpeed: 3000,
  smartSpeed: 800,    // Smooth swipe/transition
  autoplayHoverPause: true, // Pause when mouse hover
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 1
    },
    1000: {
      items: 1
    }
  }
})


// Service card swiper

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: false,
    },
    769: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
  },
});



// Service card swiper







// mobile menu 

const menuToggle = document.getElementById("menuToggle");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const form = document.querySelector("form");



menuToggle.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

// mobile menu 




// const section = document.querySelector('.section-with-cursor');
// const portfolio = document.querySelector('.portfolio-wrapper');
const cursor = document.getElementById('customCursor');
const body = document.querySelector('body');

// Smooth X/Y animation
const moveX = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power2.out" });
const moveY = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power2.out" });

let isInSection = false;

// Show on enter
// section.addEventListener('mouseenter', () => {
//   isInSection = true;
//   gsap.to(cursor, {
//     opacity: 1,
//     scale: 1,
//     duration: 0.3,
//     ease: "power2.out"
//   });
// });

body.addEventListener('mouseenter', () => {
  isInSection = true;
  gsap.to(cursor, {
    opacity: 1,
    scale: 1,
    duration: .1,
    ease: "power2.out"
  });
});

// form.addEventListener('mouseenter', () => {
//   isInSection = true;
//   gsap.to(cursor, {
//     opacity: 1,
//     scale: 1,
//     duration: 0.3,
//     ease: "power2.out"
//   });
// });

// Hide on leave
// section.addEventListener('mouseleave', () => {
//   isInSection = false;
//   gsap.to(cursor, {
//     opacity: 0,
//     scale: 1,
//     duration: 0.3,
//     ease: "power2.out"
//   });
// });

// portfolio.addEventListener('mouseleave', () => {
//   isInSection = false;
//   gsap.to(cursor, {
//     opacity: 0,
//     scale: 1,
//     duration: 0.3,
//     ease: "power2.out"
//   });
// });

// form.addEventListener('mouseleave', () => {
//   isInSection = false;
//   gsap.to(cursor, {
//     opacity: 0,
//     scale: 1,
//     duration: 0.3,
//     ease: "power2.out"
//   });
// });

// Use pointermove instead of mousemove
window.addEventListener('pointermove', (e) => {
  if (!isInSection) return;
  moveX(e.clientX);
  moveY(e.clientY);
});

// Scale on click
window.addEventListener('pointerdown', (e) => {
  if (!isInSection) return;
  gsap.to(cursor, {
    duration: 0.1,
    ease: "power1.out"
  });
});

// Scale back on release
window.addEventListener('pointerup', (e) => {
  if (!isInSection) return;
  gsap.to(cursor, {
    scale: 1,
    duration: 0.1,
    ease: "power1.out"
  });
});


