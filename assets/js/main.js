/**
 * NARDI XHEPI - PORTFOLIO SCRIPTS
 * Modern Data Science Portfolio
 */

// ===================================
// 1. NAVIGATION
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// 2. TYPING ANIMATION
// ===================================
const typedTextElement = document.querySelector('.typed-text');
const titles = [
    'Data Scientist',
    'ML Engineer',
    'LLM Specialist',
    'Time Series Expert'
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        // Pause at end of word
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
        typingSpeed = 100;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
    }

    setTimeout(typeText, isDeleting ? 50 : typingSpeed);
}

// Start typing animation
if (typedTextElement) {
    setTimeout(typeText, 1000);
}

// ===================================
// 3. PROJECT FILTERS
// ===================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            const categories = card.dataset.category?.split(' ') || [];

            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===================================
// 4. SCROLL ANIMATIONS
// ===================================
const animateElements = document.querySelectorAll(
    '.project-card, .achievement-card, .skill-category, .education-card, .blog-card, .timeline-item'
);

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay based on element position
            setTimeout(() => {
                entry.target.classList.add('animate');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// 5. CONTACT FORM
// ===================================
const contactForm = document.getElementById('contact-form');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Create mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:nardi.xhepi@polytechnique.edu?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Reset form
    contactForm.reset();

    // Show success message (optional - could add a toast notification)
    alert('Opening email client...');
});

// ===================================
// 6. ACTIVE NAV LINK ON SCROLL
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// ===================================
// 7. PARALLAX EFFECT FOR HERO
// ===================================
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    if (heroContent && scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroContent.style.opacity = 1 - scrollY / (window.innerHeight * 0.8);
    }
});

// ===================================
// 8. PRELOADER (Optional)
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Initialize animations after page load
    setTimeout(() => {
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.classList.add('aos-animate');
        });
    }, 300);
});

// ===================================
// 9. CONSOLE EASTER EGG
// ===================================
console.log('%c👋 Hello there, fellow developer!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in my work? Let\'s connect!', 'font-size: 14px; color: #94a3b8;');
console.log('%c📧 nardi.xhepi@polytechnique.edu', 'font-size: 12px; color: #06b6d4;');

// ===================================
// 10. VISUAL CONTINUITY EFFECTS
// ===================================

// Scroll progress bar
const scrollProgressBar = document.getElementById('scroll-progress');

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (scrollProgressBar) {
        scrollProgressBar.style.width = `${scrollPercent}%`;
    }
}

// Flowing orbs movement based on scroll - optimized for GPU
const orb1 = document.getElementById('orb1');
const orb2 = document.getElementById('orb2');
const orb3 = document.getElementById('orb3');

function updateFlowingOrbs() {
    const scrollY = window.scrollY;
    const scrollPercent = scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    if (orb1) {
        orb1.style.transform = `translate3d(${scrollPercent * 200}px, ${scrollPercent * 300}px, 0)`;
    }
    if (orb2) {
        orb2.style.transform = `translate3d(${-scrollPercent * 150}px, ${scrollPercent * 400}px, 0)`;
    }
    if (orb3) {
        orb3.style.transform = `translate3d(${scrollPercent * 100}px, ${-scrollPercent * 200}px, 0)`;
    }
}

// Section reveal on scroll
const allSections = document.querySelectorAll('.section, .hero');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

allSections.forEach(section => {
    sectionObserver.observe(section);
});

// Optimized scroll handler - reduced updates
let ticking = false;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateScrollProgress();
            updateFlowingOrbs();
            // Integrate hero morph transition (if available)
            if (window.updateHeroMorph) {
                window.updateHeroMorph();
            }
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

// Initial call
onScroll();

// Mark hero as in-view immediately
document.querySelector('.hero')?.classList.add('in-view');

// ===================================
// 11. FLOATING NAVIGATION
// ===================================

const floatingNavDots = document.querySelectorAll('.floating-nav-dot');

// Click to navigate
floatingNavDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const sectionId = dot.dataset.section;
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Update active dot on scroll
function updateFloatingNav() {
    const scrollY = window.scrollY + window.innerHeight / 3;

    floatingNavDots.forEach(dot => {
        const sectionId = dot.dataset.section;
        const section = document.getElementById(sectionId);

        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                floatingNavDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateFloatingNav, { passive: true });
updateFloatingNav();

// ===================================
// 12. HERO PHOTO MORPH TRANSITION
// Circle → Square (CPU-based, no GPU transforms)
// ===================================

const heroPhoto = document.getElementById('hero-photo');
const aboutTarget = document.getElementById('about-photo-target');

if (heroPhoto && aboutTarget) {
    const heroFrame = heroPhoto.querySelector('.hero-photo-frame');
    const heroImg = heroPhoto.querySelector('img');
    const aboutFrame = aboutTarget.querySelector('.image-frame');

    // Create ghost element
    const ghost = document.createElement('div');
    const ghostImg = document.createElement('img');

    // Simple CSS - no GPU hints
    ghost.style.cssText = `
        position: fixed;
        z-index: 9999;
        pointer-events: none;
        box-shadow: 0 0 40px rgba(99, 102, 241, 0.4);
        overflow: hidden;
        display: none;
        border: 2px solid rgba(99, 102, 241, 0.5);
    `;

    ghostImg.src = heroImg.src;
    ghostImg.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';

    ghost.appendChild(ghostImg);
    document.body.appendChild(ghost);

    // Cache layout
    let cache = null;
    let dirty = true;

    function recalc() {
        const h = heroFrame.getBoundingClientRect();
        const a = aboutFrame.getBoundingClientRect();
        const scrollY = window.scrollY;
        cache = {
            hTop: h.top + scrollY, hLeft: h.left, hW: h.width, hH: h.height,
            aTop: a.top + scrollY, aLeft: a.left, aW: a.width, aH: a.height,
            start: 10, end: window.innerHeight * 0.8
        };
        dirty = false;
    }

    let state = -1;

    heroPhoto.style.animation = 'none';
    aboutTarget.style.opacity = '0';
    aboutTarget.style.visibility = 'hidden';

    function update() {
        if (dirty || !cache) recalc();

        const scrollY = window.scrollY;
        let p = (scrollY - cache.start) / (cache.end - cache.start);
        p = p < 0 ? 0 : p > 1 ? 1 : p;

        if (p <= 0) {
            if (state !== 0) {
                ghost.style.display = 'none';
                heroPhoto.style.opacity = '1';
                heroPhoto.style.visibility = 'visible';
                aboutTarget.style.opacity = '0';
                aboutTarget.style.visibility = 'hidden';
                state = 0;
            }
        } else if (p >= 1) {
            if (state !== 2) {
                ghost.style.display = 'none';
                heroPhoto.style.opacity = '0';
                heroPhoto.style.visibility = 'hidden';
                aboutTarget.style.opacity = '1';
                aboutTarget.style.visibility = 'visible';
                state = 2;
            }
        } else {
            const t = p * p * (3 - 2 * p);

            if (state !== 1) {
                ghost.style.display = 'block';
                heroPhoto.style.opacity = '0';
                heroPhoto.style.visibility = 'hidden';
                aboutTarget.style.opacity = '0';
                aboutTarget.style.visibility = 'hidden';
                state = 1;
            }

            // Use top/left/width/height instead of transforms
            const top = (cache.hTop - scrollY) + ((cache.aTop - scrollY) - (cache.hTop - scrollY)) * t;
            const left = cache.hLeft + (cache.aLeft - cache.hLeft) * t;
            const width = cache.hW + (cache.aW - cache.hW) * t;
            const height = cache.hH + (cache.aH - cache.hH) * t;
            const radius = 50 - 48 * t;

            ghost.style.top = top + 'px';
            ghost.style.left = left + 'px';
            ghost.style.width = width + 'px';
            ghost.style.height = height + 'px';
            ghost.style.borderRadius = radius + '%';
        }
    }

    window.updateHeroMorph = update;

    let rto;
    window.addEventListener('resize', () => {
        clearTimeout(rto);
        rto = setTimeout(() => { dirty = true; update(); }, 100);
    }, { passive: true });

    requestAnimationFrame(() => { recalc(); update(); });
}

