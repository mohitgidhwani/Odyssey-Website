/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Fix: Flexbox min-height bug on IE.
	if (browser.name == 'ie') {

		var flexboxFixTimeoutId;

		$window.on('resize.flexbox-fix', function () {

			clearTimeout(flexboxFixTimeoutId);

			flexboxFixTimeoutId = setTimeout(function () {

				if ($wrapper.prop('scrollHeight') > $window.height())
					$wrapper.css('height', 'auto');
				else
					$wrapper.css('height', '100vh');

			}, 250);

		}).triggerHandler('resize.flexbox-fix');

	}

	// Nav.
	var $nav = $header.children('nav'),
		$nav_li = $nav.find('li');

	// Add "middle" alignment classes if we're dealing with an even number of items.
	if ($nav_li.length % 2 == 0) {

		$nav.addClass('use-middle');
		$nav_li.eq(($nav_li.length / 2)).addClass('is-middle');

	}

	// Main.
	var delay = 325,
		locked = false;

	// Methods.
	$main._show = function (id, initial) {

		var $article = $main_articles.filter('#' + id);

		// No such article? Bail.
		if ($article.length == 0)
			return;

		// Handle lock.

		// Already locked? Speed through "show" steps w/o delays.
		if (locked || (typeof initial != 'undefined' && initial === true)) {

			// Mark as switching.
			$body.addClass('is-switching');

			// Mark as visible.
			$body.addClass('is-article-visible');

			// Deactivate all articles (just in case one's already active).
			$main_articles.removeClass('active');

			// Hide header, footer.
			$header.hide();
			$footer.hide();

			// Show main, article.
			$main.show();
			$article.show();

			// Activate article.
			$article.addClass('active');

			// Unlock.
			locked = false;

			// Unmark as switching.
			setTimeout(function () {
				$body.removeClass('is-switching');
			}, (initial ? 1000 : 0));

			return;

		}

		// Lock.
		locked = true;

		// Article already visible? Just swap articles.
		if ($body.hasClass('is-article-visible')) {

			// Deactivate current article.
			var $currentArticle = $main_articles.filter('.active');

			$currentArticle.removeClass('active');

			// Show article.
			setTimeout(function () {

				// Hide current article.
				$currentArticle.hide();

				// Show article.
				$article.show();

				// Activate article.
				setTimeout(function () {

					$article.addClass('active');

					// Window stuff.
					$window
						.scrollTop(0)
						.triggerHandler('resize.flexbox-fix');

					// Unlock.
					setTimeout(function () {
						locked = false;
					}, delay);

				}, 25);

			}, delay);

		}

		// Otherwise, handle as normal.
		else {

			// Mark as visible.
			$body
				.addClass('is-article-visible');

			// Show article.
			setTimeout(function () {

				// Hide header, footer.
				$header.hide();
				$footer.hide();

				// Show main, article.
				$main.show();
				$article.show();

				// Activate article.
				setTimeout(function () {

					$article.addClass('active');

					// Window stuff.
					$window
						.scrollTop(0)
						.triggerHandler('resize.flexbox-fix');

					// Unlock.
					setTimeout(function () {
						locked = false;
					}, delay);

				}, 25);

			}, delay);

		}

	};

	$main._hide = function (addState) {

		var $article = $main_articles.filter('.active');

		// Article not visible? Bail.
		if (!$body.hasClass('is-article-visible'))
			return;

		// Add state?
		if (typeof addState != 'undefined'
			&& addState === true)
			history.pushState(null, null, '#');

		// Handle lock.

		// Already locked? Speed through "hide" steps w/o delays.
		if (locked) {

			// Mark as switching.
			$body.addClass('is-switching');

			// Deactivate article.
			$article.removeClass('active');

			// Hide article, main.
			$article.hide();
			$main.hide();

			// Show footer, header.
			$footer.show();
			$header.show();

			// Unmark as visible.
			$body.removeClass('is-article-visible');

			// Unlock.
			locked = false;

			// Unmark as switching.
			$body.removeClass('is-switching');

			// Window stuff.
			$window
				.scrollTop(0)
				.triggerHandler('resize.flexbox-fix');

			return;

		}

		// Lock.
		locked = true;

		// Deactivate article.
		$article.removeClass('active');

		// Hide article.
		setTimeout(function () {

			// Hide article, main.
			$article.hide();
			$main.hide();

			// Show footer, header.
			$footer.show();
			$header.show();

			// Unmark as visible.
			setTimeout(function () {

				$body.removeClass('is-article-visible');

				// Window stuff.
				$window
					.scrollTop(0)
					.triggerHandler('resize.flexbox-fix');

				// Unlock.
				setTimeout(function () {
					locked = false;
				}, delay);

			}, 25);

		}, delay);


	};

	// Articles.
	$main_articles.each(function () {

		var $this = $(this);

		// Close.
		$('<div class="close">Close</div>')
			.appendTo($this)
			.on('click', function () {
				location.hash = '';
			});

		// Prevent clicks from inside article from bubbling.
		$this.on('click', function (event) {
			event.stopPropagation();
		});

	});

	// Events.
	$body.on('click', function (event) {

		// Article visible? Hide.
		if ($body.hasClass('is-article-visible'))
			$main._hide(true);

	});

	$window.on('keyup', function (event) {

		switch (event.keyCode) {

			case 27:

				// Article visible? Hide.
				if ($body.hasClass('is-article-visible'))
					$main._hide(true);

				break;

			default:
				break;

		}

	});

	$window.on('hashchange', function (event) {

		// Empty hash?
		if (location.hash == ''
			|| location.hash == '#') {

			// Prevent default.
			event.preventDefault();
			event.stopPropagation();

			// Hide.
			$main._hide();

		}

		// Otherwise, check for a matching article.
		else if ($main_articles.filter(location.hash).length > 0) {

			// Prevent default.
			event.preventDefault();
			event.stopPropagation();

			// Show article.
			$main._show(location.hash.substr(1));

		}

	});

	// Scroll restoration.
	// This prevents the page from scrolling back to the top on a hashchange.
	if ('scrollRestoration' in history)
		history.scrollRestoration = 'manual';
	else {

		var oldScrollPos = 0,
			scrollPos = 0,
			$htmlbody = $('html,body');

		$window
			.on('scroll', function () {

				oldScrollPos = scrollPos;
				scrollPos = $htmlbody.scrollTop();

			})
			.on('hashchange', function () {
				$window.scrollTop(oldScrollPos);
			});

	}

	// Initialize.

	// Hide main, articles.
	$main.hide();
	$main_articles.hide();

	// Initial article.
	if (location.hash != ''
		&& location.hash != '#')
		$window.on('load', function () {
			$main._show(location.hash.substr(1), true);
		});

})(jQuery);


gsap.utils.toArray(".left-para-journey").forEach((el) => {
	gsap.from(el, {
		x: -200,
		opacity: 0,
		duration: 1.7,
		ease: "power3.out",
		scrollTrigger: {
			trigger: el,
			start: "top 80%", // start animation when paragraph is 80% into viewport
			toggleActions: "play none none reverse",

		}
	});
});


gsap.utils.toArray(".right-para-journey").forEach((el) => {
	gsap.from(el, {
		x: 200,
		opacity: 0,
		duration: 1.7,
		ease: "power3.out",
		scrollTrigger: {
			trigger: el,
			start: "top 80%", // start animation when paragraph is 80% into viewport
			toggleActions: "play none none reverse",

		}
	});
});



const cursor = document.getElementById('customCursor');
const body = document.querySelector('body');

// Smooth X/Y animation
const moveX = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power2.out" });
const moveY = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power2.out" });

let isInSection = false;

body.addEventListener('mouseenter', () => {
	isInSection = true;
	gsap.to(cursor, {
		opacity: 1,
		scale: 1,
		duration: 0.3,
		ease: "power2.out"
	});
});
window.addEventListener('pointermove', (e) => {
	if (!isInSection) return;
	moveX(e.clientX);
	moveY(e.clientY);
});

// Scale on click
window.addEventListener('pointerdown', (e) => {
	if (!isInSection) return;
	gsap.to(cursor, {
		duration: 0.15,
		ease: "power1.out"
	});
});

// Scale back on release
window.addEventListener('pointerup', (e) => {
	if (!isInSection) return;
	gsap.to(cursor, {
		scale: 1,
		duration: 0.15,
		ease: "power1.out"
	});
});


// ------------------Rope pulling animation

// gsap.registerPlugin(ScrollTrigger);
// document.querySelectorAll(".flame-container").forEach((container, i) => {
//     let content = container.querySelector(".main-content");
//     let rope = container.querySelector(".rope");
//     // Alternate direction: 0 -> right, 1 -> left, 2 -> right, etc.
//     let fromRight = i % 2 === 0;
//     // Set initial state
//     gsap.set(content, {
//         opacity: 0,
//         x: fromRight ? 200 : -200
//     });
//     gsap.set(rope, {
//         scaleX: 0,
//         transformOrigin: fromRight ? "right center" : "left center"
//     });
//     let tl = gsap.timeline({
//         scrollTrigger: {
//             trigger: container,
//             start: "top 80%",
//             end: "top 50%",
//             toggleActions: "play none none none"
//         }
//     });
//     // Rope animation
//     tl.to(rope, {
//         scaleX: 1,
//         duration: 1.2,
//         ease: "power2.out"
//     });

//     // Content slides in
//     tl.to(content, {
//         x: 0,
//         opacity: 1,
//         duration: 1.8,
//         ease: "elastic.out(1, 0.5)"
//     }, "-=0.5");
// });



window.addEventListener("scroll", function () {
	const header = document.getElementById("main-header");
	if (window.scrollY > 50) {
		header.classList.add("shrink"); // Add shrink on scroll
	} else {
		header.classList.remove("shrink"); // Reset when near top
	}
});

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


// Flame mobile slider
  var swiper = new Swiper(".flame-section-mySwiper", {
            slidesPerView: 1,
            loop: false,
            autoplay: true,
            delay: 3000,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });