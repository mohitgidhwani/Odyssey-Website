gsap.from('.portfolio-section .portfolio-text', {
  x: -150,
  opacity: 0,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".portfolio-section .portfolio-text",
    start: "top 60%",
    toggleActions: "play none none none",
    markers: false,
    start: "top 50%",
    end: "bottom 80%",
    // markers : true
  }
})

gsap.from('.portfolio-section .portfolio-image', {
  x: 150,
  opacity: 0,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".portfolio-section .portfolio-image",
    start: "top 60%",
    toggleActions: "play none none none",
    markers: false,
    start: "top 50%",
    end: "bottom 80%",
    // markers : true
  }
})



// Banner Animation with GSAP
function initBannerAnimation() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Select elements
  const bannerContainer = document.querySelector('.banner-container');
  const slides = gsap.utils.toArray('.banner-slide');
  
  // Calculate total width needed
  const totalWidth = slides.length * window.innerWidth;
  
  // Set initial container width
  gsap.set(bannerContainer, {
    width: totalWidth
  });
  
  // Set each slide to viewport width
  gsap.set('.banner-slide', {
    width: window.innerWidth
  });
  
  // Create horizontal scroll animation
  const animation = gsap.to(bannerContainer, {
    x: () => -(totalWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: ".sticky-container",
      start: "top top",
      end: () => `+=${totalWidth}`,
      scrub: 1.2, // Smooth scrubbing effect (1 = normal, higher = smoother)
      pin: true,
      anticipatePin: 1,
      markers: false // Set to true to debug positions
    }
  });
  
  // Animate content in each slide
  slides.forEach((slide, index) => {
    const content = slide.querySelector('h1, .sub-title-banner, .banner-title-3');
    if (content) {
      gsap.from(content, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: slide,
          containerAnimation: animation.scrollTrigger,
          start: "left 75%",
          end: "left 25%",
          toggleActions: "play none none none"
        }
      });
    }
  });
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Recalculate widths and refresh ScrollTrigger
      const newTotalWidth = slides.length * window.innerWidth;
      gsap.set(bannerContainer, { width: newTotalWidth });
      gsap.set('.banner-slide', { width: window.innerWidth });
      ScrollTrigger.refresh();
    }, 250);
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initBannerAnimation();
  
  // Remove Swiper initialization for banners
  // var swiper = new Swiper(".mySwiper-banner", {
  //   autoplay: true,
  //   delay: 2000
  // });
});

// Banner Animation with GSAP









document.addEventListener('DOMContentLoaded', function() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Mobile menu toggle functionality
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMenu');
  
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
  });
  
  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });

  // Header shrink on scroll
//   const header = document.getElementById('main-header');
//   ScrollTrigger.create({
//     start: "top top",
//     onUpdate: (self) => {
//       if (self.direction === -1) {
//         header.classList.add('shrink');
//       } else if (self.direction === 1 && window.scrollY < 100) {
//         header.classList.remove('shrink');
//       }
//     }
//   });

  

  // Who We Are section animations
  


  let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".who-we-are",
    start: "top 80%",
    toggleActions: "play none none none",
  }
});

tl.from(".who-we-are h2", {
    opacity: 0,
    y: 50,
    duration: 1
})
.to({}, { duration: .3 }) // <- delay of 0.5s between animations
.from(".who-we-are p", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2
}, "-=0.5"); // overlap animations by 0.5s

  // Inspired section animations
  gsap.from(".inspired-text", {
    x: -100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".inspired-section",
      start: "top 80%",
      toggleActions: "play none none none",
    }
  });

  gsap.from(".inspired-image", {
    x: 100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".inspired-section",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  // Services section animations
  gsap.from(".services-section h2", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: ".services-section",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  gsap.from(".services-section p", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: ".services-section",
      start: "top 70%",
      toggleActions: "play none none none"
    }
  });

  // Service cards animation
  gsap.utils.toArray(".service-card-design").forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 100,
      duration: 0.8,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
  });

  // Portfolio section animations
  gsap.from(".portfolio-text h2", {
    opacity: 0,
    x: -100,
    duration: 1,
    scrollTrigger: {
      trigger: ".portfolio-section",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  gsap.utils.toArray(".portfolio-wrap .swiper-slide").forEach((slide, i) => {
    gsap.from(slide, {
      opacity: 0,
      y: 100,
      duration: 0.8,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: ".portfolio-wrap",
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
  });

  // Testimonial section animations
  gsap.from(".left-testimonal", {
    x: -100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".Testimonial-2-section",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  gsap.from(".right-testimonal", {
    x: 100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".Testimonial-2-section",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  // Clients section animation
  gsap.from(".clients-section h2", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: ".clients-section",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  // Current section animations
  gsap.utils.toArray(".current-section .col-md-4").forEach((col, i) => {
    gsap.from(col, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: i * 0.2,
      scrollTrigger: {
        trigger: ".current-section",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  });

  // Enquire section animations
  gsap.from(".enquire-section form", {
    opacity: 0,
    x: -100,
    duration: 1,
    scrollTrigger: {
      trigger: ".enquire-section",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  gsap.from(".form-image-placeholder", {
    opacity: 0,
    x: 100,
    duration: 1,
    scrollTrigger: {
      trigger: ".enquire-section",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  // Footer animations
  gsap.from(".footer-image", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: ".footer-section",
      start: "top 90%",
      toggleActions: "play none none none"
    }
  });

  gsap.from(".footer-details", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: ".footer-section",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  // Marquee hover effect
  const marquees = document.querySelectorAll('marquee');
  marquees.forEach(marquee => {
    marquee.addEventListener('mouseover', () => {
      gsap.to(marquee, { duration: 0.3, opacity: 0.7 });
    });
    marquee.addEventListener('mouseout', () => {
      gsap.to(marquee, { duration: 0.3, opacity: 1 });
    });
  });

  // Service card hover animations
  // const serviceCards = document.querySelectorAll('.service-card-design');
  // serviceCards.forEach(card => {
  //   card.addEventListener('mouseenter', () => {
  //     gsap.to(card.querySelector('.card-title'), { opacity: 0, duration: 0.3 });
  //   });
  //   card.addEventListener('mouseleave', () => {
  //     gsap.to(card.querySelector('.card-title'), { opacity: 1, duration: 0.3 });
  //   });
  // });

  

  // Client logo animations
  gsap.utils.toArray(".client-img").forEach((logo, i) => {
    ScrollTrigger.create({
      trigger: logo,
      start: "top 90%",
      onEnter: () => {
        gsap.fromTo(logo, 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.5, delay: i * 0.05 }
        );
      }
    });
  });
});


const jounreyTl = gsap.timeline()

// About section journey section
gsap.utils.toArray(".left-para-journey").forEach((el) => {
    gsap.from(el, {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: el,
            start: "top 80%", // start animation when paragraph is 80% into viewport
            toggleActions: "play none none reverse",
            markers : true,
        }
    });
});