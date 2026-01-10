/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}
/*=============== REMOVE MENU MOBILE ===============*/

const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav_link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SWIPER HOME ===============*/
const swiperHome = new Swiper('.home__swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    grabCursor: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

/*=============== CHANGE BACKGROUND HEADER ===============*/
const bgHeader = () => {
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('bg-header')
        : header.classList.remove('bg-header')
}
window.addEventListener('scroll', bgHeader)

/*=============== SWIPER TESTIMONIAL ===============*/
const swiperTestimonial = new Swiper('.testimonial__swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 48,
    grabCursor: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

/*=============== SHOW SCROLL UP ===============*/

const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')

}
window.addEventListener('scroll', scrollUp)
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;
    const scrollPosition = scrollDown + 200; // Adding offset for better UX

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 100, // Adjusted offset for better detection
            sectionBottom = sectionTop + sectionHeight,
            sectionId = current.getAttribute('id'),
            navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

        if (navLink) {
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                // Remove active class from all links first
                document.querySelectorAll('.nav__menu a').forEach(link => {
                    link.classList.remove('active-link');
                });
                // Add active class to current section's link
                navLink.classList.add('active-link');
            }
        }
    });
};

window.addEventListener('scroll', scrollActive);
/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-contrast-2-fill' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-contrast-2-fill' ? 'add' : 'remove'](iconTheme)
}
// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
/*=============== CONTACT FORM ===============*/
// Contact Form Submission
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const buttonText = submitButton?.querySelector('.button__text');
    const buttonLoader = submitButton?.querySelector('.button__loader');
    const formMessage = document.getElementById('form-message');
    const recaptchaSiteKey = 'YOUR_RECAPTCHA_SITE_KEY'; // Replace with your reCAPTCHA site key

    // Initialize copy buttons
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const textToCopy = this.getAttribute('data-text');
            const originalText = this.innerHTML;

            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show success feedback
                this.innerHTML = '<i class="ri-check-line"></i> Copied!';
                this.classList.add('copied');

                // Reset button after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                this.innerHTML = '<i class="ri-close-line"></i> Failed';

                // Reset button after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Show loading state
            submitButton.disabled = true;
            buttonText.style.display = 'none';
            buttonLoader.style.display = 'block';

            // Clear previous messages
            formMessage.style.display = 'none';

            try {
                // Validate form
                const formData = new FormData(contactForm);
                const formValues = Object.fromEntries(formData.entries());

                // Basic validation
                if (!formValues.name || !formValues.email || !formValues.subject || !formValues.message) {
                    throw new Error('Please fill in all required fields');
                }

                if (!isValidEmail(formValues.email)) {
                    throw new Error('Please enter a valid email address');
                }

                // Simulate form submission (replace with actual fetch/axios call)
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success message
                showFormMessage('Your message has been sent successfully! We\'ll get back to you soon.', 'success');

                // Reset form
                contactForm.reset();

                // Reset reCAPTCHA if used
                if (typeof grecaptcha !== 'undefined') {
                    grecaptcha.reset();
                }

            } catch (error) {
                // Show error message
                showFormMessage(error.message || 'An error occurred. Please try again.', 'error');
                console.error('Form submission error:', error);

            } finally {
                // Reset button state
                submitButton.disabled = false;
                buttonText.style.display = 'block';
                buttonLoader.style.display = 'none';
            }
        });
    }

    // Helper function to show form messages
    function showFormMessage(message, type) {
        if (!formMessage) return;

        formMessage.textContent = message;
        formMessage.className = 'form__message';
        formMessage.classList.add(`form__message--${type}`);
        formMessage.style.display = 'block';

        // Auto-hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.opacity = '0';
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.style.opacity = '1';
            }, 300);
        }, 5000);
    }

    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});

// Load reCAPTCHA script dynamically
function loadReCaptcha() {
    if (document.querySelector('.g-recaptcha')) {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
}

// Initialize when document is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadReCaptcha);
} else {
    loadReCaptcha();
}
/*=============== SCROLL REVEAL ANIMATION ===============*/
// const sr = ScrollReveal({
//     origin: 'top',
//     distance: '60px',
//     duration: 2000,
//     delay: 300,
//     //     // reset: true, // Animations repeat
// });
// sr.reveal('.home__container, .testimonial__container, .footer__container,.contact__container ')
// sr.reveal('.home__title', { delay: 600 })
// sr.reveal('.home__description', { delay: 900 })
// sr.reveal('.home__data .button', { delay: 1200 })
// sr.reveal('.destination__card, .gallery__card, .support__card,.blog__card', { interval: 100 })
// sr.reveal('.join__data', { origin: 'left' })
// sr.reveal('.join__img', { origin: 'right' })
// sr.reveal('.section__title', { origin: 'top' })
// sr.reveal('.about__title', { origin: 'bottom' })
/* =============== YOUR FINAL SLOW & SMOOTH SCROLL REVEAL =============== */
document.addEventListener("DOMContentLoaded", function () {

    const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 3000,                    // Extremely slow & elegant (3 seconds)
        delay: 400,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',  // The smoothest easing curve
        reset: false,
        opacity: 0,
        scale: 0.95,                       // Subtle grow-in effect
        viewFactor: 0.2
    });

    // === Your original reveals (kept exactly as you wrote) ===
    sr.reveal('.home__container, .testimonial__container, .footer__container, .contact__container');

    sr.reveal('.home__title', { delay: 700 });
    sr.reveal('.home__description', { delay: 1000 });
    sr.reveal('.home__data .button', { delay: 1400 });

    sr.reveal('.join__data', { origin: 'left' });
    sr.reveal('.join__img', { origin: 'right' });

    sr.reveal('.section__title', { origin: 'top' });
    sr.reveal('.about__title', { origin: 'top' });

    // === Special treatment for cards (your favorites) ===
    sr.reveal('.support__card, .blog__card, .gallery__card, .faq__item', {
        origin: 'bottom',
        distance: '100px',
        duration: 3200,           // Even slower for these cards
        interval: 250,            // Beautiful staggered timing (was 100 → now 250ms gap)
        scale: 0.92,              // Gentle pop-in + grow effect
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
    });

    // Optional: Extra polish for other sections (still smooth & slow)
    sr.reveal('.video__container, .map__container', { origin: 'bottom', delay: 500, scale: 0.94 });
    sr.reveal('.testimonial__img', { origin: 'left', distance: '120px' });
    sr.reveal('.testimonial__swiper', { origin: 'right', distance: '120px' });
    sr.reveal('.about__description, .about__vision, .about__daycare, .about__mission', { origin: 'bottom', delay: 600 });

});
/* =============== FINAL SMOOTH SCROLL REVEAL + CUSTOM CONTACT ANIMATIONS =============== */
document.addEventListener("DOMContentLoaded", function () {

    const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 3000,
        delay: 400,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        reset: false,
        opacity: 0,
        scale: 0.95,
        viewFactor: 0.2
    });

    // Your original reveals (unchanged)
    sr.reveal('.home__container, .testimonial__container, .footer__container, .contact__container');
    sr.reveal('.home__title', { delay: 700 });
    sr.reveal('.home__description', { delay: 1000 });
    sr.reveal('.home__data .button', { delay: 1400 });
    sr.reveal('.join__data', { origin: 'left' });
    sr.reveal('.join__img', { origin: 'right' });
    sr.reveal('.section__title', { origin: 'top' });
    sr.reveal('.about__title', { origin: 'top' });

    // Cards (slow & staggered)
    sr.reveal('.support__card, .blog__card, .gallery__card, .faq__item', {
        origin: 'bottom',
        interval: 250,
        distance: '100px',
        scale: 0.92
    });

    // === CONTACT SECTION - YOUR CUSTOM DIRECTIONS ===
    // 1. Contact info items (address, phone, email) → from TOP ↓
    sr.reveal('.contact__items-container', { origin: 'top', distance: '80px', delay: 300 });
    sr.reveal('.contact__item', {
        origin: 'top',
        distance: '70px',
        interval: 200,       // Each item drops in one after another
        delay: 500
    });

    // 2. Bank details → from RIGHT ←
    sr.reveal('.bank-details', {
        origin: 'right',
        distance: '120px',
        delay: 600,
        scale: 0.96
    });

    // 3. Visa / Credit card payment section → from BOTTOM ↑
    sr.reveal('.visa-payment', {
        origin: 'bottom',
        distance: '100px',
        delay: 800,
        scale: 0.94
    });

    // Form side (right side) - gentle entrance
    sr.reveal('.contact__form-container', { origin: 'right', distance: '100px', delay: 500 });

    // Rest of the site (smooth as before)
    sr.reveal('.video__container, .map__container', { origin: 'bottom', delay: 500, scale: 0.95 });
    sr.reveal('.testimonial__img', { origin: 'left', distance: '120px' });
    sr.reveal('.testimonial__swiper', { origin: 'right', distance: '120px' });

});
/* =============== FINAL SMOOTH SCROLL REVEAL + PERFECT CONTACT ANIMATIONS =============== */
document.addEventListener("DOMContentLoaded", function () {

    const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 3000,
        delay: 400,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        reset: false,
        opacity: 0,
        scale: 0.95,
        viewFactor: 0.2
    });

    // Your original reveals
    sr.reveal('.home__container, .testimonial__container, .footer__container, .contact__container');
    sr.reveal('.home__title', { delay: 700 });
    sr.reveal('.home__description', { delay: 1000 });
    sr.reveal('.home__data .button', { delay: 1400 });
    sr.reveal('.join__data', { origin: 'left' });
    sr.reveal('.join__img', { origin: 'right' });
    sr.reveal('.section__title', { origin: 'top' });
    sr.reveal('.about__title', { origin: 'top' });

    // Cards - slow & beautiful
    sr.reveal('.support__card, .blog__card, .gallery__card, .faq__item', {
        origin: 'bottom',
        interval: 250,
        distance: '100px',
        scale: 0.92
    });

    // === CONTACT SECTION - YOUR FINAL REQUEST ===
    // 1. Contact info (address, phone, email) → from top
    sr.reveal('.contact__items-container', { origin: 'top', distance: '80px', delay: 300 });
    sr.reveal('.contact__item', { origin: 'top', interval: 200, delay: 500 });

    // 2. Bank details → from right
    sr.reveal('.bank-details', { origin: 'right', distance: '120px', delay: 600 });

    // 3. Visa payment box → from bottom
    sr.reveal('.visa-payment', { origin: 'bottom', distance: '100px', delay: 800, scale: 0.94 });

    // 4. Contact Form → from left to right (as you asked)
    sr.reveal('.contact__form', { 
        origin: 'left', 
        distance: '140px', 
        delay: 600,
        scale: 0.96 
    });

    // 5. Contact Image (SVG illustration) → from right to left (as you asked)
    sr.reveal('.contact__image', { 
        origin: 'right', 
        distance: '140px', 
        delay: 700,
        scale: 0.96 
    });

    // Rest of the site
    sr.reveal('.video__container, .map__container', { origin: 'bottom', delay: 500, scale: 0.95 });
    sr.reveal('.testimonial__img', { origin: 'left', distance: '120px' });
    sr.reveal('.testimonial__swiper', { origin: 'right', distance: '120px' });

});
/* =============== FINAL SMOOTH SCROLL REVEAL + EPIC BLOG SECTION =============== */
document.addEventListener("DOMContentLoaded", function () {

    const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 3000,
        delay: 400,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        reset: false,
        opacity: 0,
        scale: 0.95,
        viewFactor: 0.2
    });

    // Your original reveals
    sr.reveal('.home__container, .testimonial__container, .footer__container, .contact__container');
    sr.reveal('.home__title', { delay: 700 });
    sr.reveal('.home__description', { delay: 1000 });
    sr.reveal('.home__data .button', { delay: 1400 });
    sr.reveal('.join__data', { origin: 'left' });
    sr.reveal('.join__img', { origin: 'right' });
    sr.reveal('.section__title', { origin: 'top' });
    sr.reveal('.about__title', { origin: 'top' });

    // Regular cards (support, gallery, faq)
    sr.reveal('.support__card, .gallery__card, .faq__item', {
        origin: 'bottom',
        interval: 250,
        distance: '100px',
        scale: 0.92
    });

    // ==================================================================
    // === BLOG SECTION → SPECIAL CINEMATIC TREATMENT (your request) ===
    // ==================================================================
    sr.reveal('.blog__container', { origin: 'top', delay: 300 }); // Title + subtitle first

    sr.reveal('.blog__card', {
        origin: 'bottom',
        distance: '120px',
        duration: 3200,        // Slightly longer than others
        interval: 300,         // Beautiful 300ms gap between each card → feels intentional
        scale: 0.90,           // Starts smaller, grows elegantly
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        delay: 600             // Starts after the section title
    });

    // Optional: "View All Posts" button appears last
    sr.reveal('.blog__cta', { origin: 'bottom', delay: 1600, scale: 0.9 });

    // ==================================================================
    // === CONTACT SECTION (your previous perfect setup) ===
    // ==================================================================
    sr.reveal('.contact__items-container', { origin: 'top', distance: '80px', delay: 300 });
    sr.reveal('.contact__item', { origin: 'top', interval: 200, delay: 500 });
    sr.reveal('.bank-details', { origin: 'right', distance: '120px', delay: 600 });
    sr.reveal('.visa-payment', { origin: 'bottom', distance: '100px', delay: 800, scale: 0.94 });

    // Form (left → right) + Image (right → left) → as you wanted
    sr.reveal('.contact__form', { origin: 'left', distance: '140px', delay: 600, scale: 0.96 });
    sr.reveal('.contact__image', { origin: 'right', distance: '140px', delay: 700, scale: 0.96 });

    // Rest of site
    sr.reveal('.video__container, .map__container', { origin: 'bottom', delay: 500, scale: 0.95 });
    sr.reveal('.testimonial__img', { origin: 'left', distance: '120px' });
    sr.reveal('.testimonial__swiper', { origin: 'right', distance: '120px' });

});
/* =============== FINAL SMOOTH SCROLL REVEAL + EPIC FAQ SECTION =============== */
document.addEventListener("DOMContentLoaded", function () {

    const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 3000,
        delay: 400,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        reset: false,
        opacity: 0,
        scale: 0.95,
        viewFactor: 0.2
    });

    // Your original reveals
    sr.reveal('.home__container, .testimonial__container, .footer__container, .contact__container');
    sr.reveal('.home__title', { delay: 700 });
    sr.reveal('.home__description', { delay: 1000 });
    sr.reveal('.home__data .button', { delay: 1400 });
    sr.reveal('.join__data', { origin: 'left' });
    sr.reveal('.join__img', { origin: 'right' });
    sr.reveal('.section__title', { origin: 'top' });
    sr.reveal('.about__title', { origin: 'top' });

    // Cards (support, gallery, blog)
    sr.reveal('.support__card, .gallery__card, .blog__card', {
        origin: 'bottom',
        interval: 250,
        distance: '100px',
        scale: 0.92
    });

    // ==================================================================
    // === FAQ SECTION → SPECIAL DROP-DOWN CINEMATIC EFFECT ===
    // ==================================================================
    sr.reveal('.faq__container', { origin: 'top', delay: 300 }); // Title first

    sr.reveal('.faq__item', {
        origin: 'top',            // From top ↓ (exactly like a dropdown menu opening)
        distance: '90px',
        duration: 3200,           // Extra slow for elegance
        interval: 180,            // Perfect 180ms gap → feels intentional and satisfying
        scale: 0.94,              // Subtle grow-in as they drop
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        delay: 600                // Starts after the section title appears
    });

    // ==================================================================
    // === BLOG SECTION (your previous epic version) ===
    // ==================================================================
    sr.reveal('.blog__container', { origin: 'top', delay: 300 });
    sr.reveal('.blog__card', {
        origin: 'bottom',
        distance: '120px',
        duration: 3200,
        interval: 300,
        scale: 0.90,
        delay: 600
    });
    sr.reveal('.blog__cta', { origin: 'bottom', delay: 1600, scale: 0.9 });

    // ==================================================================
    // === CONTACT SECTION (your perfect setup) ===
    // ==================================================================
    sr.reveal('.contact__items-container', { origin: 'top', distance: '80px', delay: 300 });
    sr.reveal('.contact__item', { origin: 'top', interval: 200, delay: 500 });
    sr.reveal('.bank-details', { origin: 'right', distance: '120px', delay: 600 });
    sr.reveal('.visa-payment', { origin: 'bottom', distance: '100px', delay: 800, scale: 0.94 });
    sr.reveal('.contact__form', { origin: 'left', distance: '140px', delay: 600, scale: 0.96 });
    sr.reveal('.contact__image', { origin: 'right', distance: '140px', delay: 700, scale: 0.96 });

    // Rest
    sr.reveal('.video__container, .map__container', { origin: 'bottom', delay: 500, scale: 0.95 });
    sr.reveal('.testimonial__img', { origin: 'left', distance: '120px' });
    sr.reveal('.testimonial__swiper', { origin: 'right', distance: '120px' });

});
/* =============== FINAL & ULTIMATE SCROLL REVEAL (Support Cards = STAR OF THE SHOW) =============== */
document.addEventListener("DOMContentLoaded", function () {

    const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 3000,
        delay: 400,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        reset: false,
        opacity: 0,
        scale: 0.95,
        viewFactor: 0.2
    });

    // Your original reveals (kept perfect)
    sr.reveal('.home__container, .testimonial__container, .footer__container, .contact__container');
    sr.reveal('.home__title', { delay: 700 });
    sr.reveal('.home__description', { delay: 1000 });
    sr.reveal('.home__data .button', { delay: 1400 });
    sr.reveal('.join__data', { origin: 'left' });
    sr.reveal('.join__img', { origin: 'right' });
    sr.reveal('.section__title', { origin: 'top' });
    sr.reveal('.about__title', { origin: 'top' });

    // ==================================================================
    // === SUPPORT SECTION → ABSOLUTE HERO TREATMENT (your request) ===
    // ==================================================================
    sr.reveal('.support__container', { origin: 'top', delay: 300 }); // Title first

    sr.reveal('.support__card', {
        origin: 'bottom',
        distance: '140px',
        duration: 3400,           // Longest & slowest on the site
        interval: 350,            // Perfect dramatic pause between each card
        scale: 0.88,              // Starts smaller → grows with impact
        rotate: { z: 6 },         // Subtle 3D tilt for premium feel
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        delay: 600
    });

    // ==================================================================
    // === BLOG SECTION (still epic) ===
    // ==================================================================
    sr.reveal('.blog__container', { origin: 'top', delay: 300 });
    sr.reveal('.blog__card', { origin: 'bottom', distance: '120px', duration: 3200, interval: 300, scale: 0.90, delay: 600 });
    sr.reveal('.blog__cta', { origin: 'bottom', delay: 1600, scale: 0.9 });

    // ==================================================================
    // === FAQ SECTION (elegant drop-down) ===
    // ==================================================================
    sr.reveal('.faq__container', { origin: 'top', delay: 300 });
    sr.reveal('.faq__item', { origin: 'top', distance: '90px', duration: 3200, interval: 180, scale: 0.94, delay: 600 });

    // ==================================================================
    // === CONTACT SECTION (your perfect left/right setup) ===
    // ==================================================================
    sr.reveal('.contact__items-container', { origin: 'top', distance: '80px', delay: 300 });
    sr.reveal('.contact__item', { origin: 'top', interval: 200, delay: 500 });
    sr.reveal('.bank-details', { origin: 'right', distance: '120px', delay: 600 });
    sr.reveal('.visa-payment', { origin: 'bottom', distance: '100px', delay: 800, scale: 0.94 });
    sr.reveal('.contact__form', { origin: 'left', distance: '140px', delay: 600, scale: 0.96 });
    sr.reveal('.contact__image', { origin: 'right', distance: '140px', delay: 700, scale: 0.96 });

    // Rest of site
    sr.reveal('.video__container, .map__container', { origin: 'bottom', delay: 500, scale: 0.95 });
    sr.reveal('.testimonial__img', { origin: 'left', distance: '120px' });
    sr.reveal('.testimonial__swiper', { origin: 'right', distance: '120px' });

});
/*=============== FAQ ACCORDION ===============*/
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const btn = item.querySelector('.faq__question');
    btn.addEventListener('click', () => {
        // toggle current
        item.classList.toggle('active');
        // close others
        faqItems.forEach(other => {
            if (other !== item) other.classList.remove('active');
        });
    });
});
