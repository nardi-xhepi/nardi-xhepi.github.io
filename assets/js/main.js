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
        typingSpeed = 100;
    }

    setTimeout(typeText, isDeleting ? 30 : typingSpeed);
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


// ===================================
// 5.5 SMART CAROUSEL DISPLAY
// Show all cards if 3 or less, otherwise enable scroll with blur
// ===================================
function initSmartCarousels() {
    const carousels = [
        { grid: '.projects-grid', section: '.projects' },
        { grid: '.achievements-grid', section: '.achievements' },
        { grid: '.skills-grid', section: '.skills' },
        { grid: '.education-grid', section: '.education' }
    ];

    carousels.forEach(({ grid, section }) => {
        const gridEl = document.querySelector(grid);
        const sectionEl = document.querySelector(section);

        if (gridEl && sectionEl) {
            const cardCount = gridEl.children.length;

            if (cardCount <= 3) {
                // Few items - center them, no scroll
                gridEl.classList.add('few-items');
                sectionEl.classList.add('no-scroll-fade');
            } else {
                // Many items - enable scroll with blur
                gridEl.classList.remove('few-items');
                sectionEl.classList.remove('no-scroll-fade');
            }
        }
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initSmartCarousels);


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
// 8.5 ANIMATED STAT COUNTERS
// ===================================
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const target = parseInt(text.replace(/\D/g, ''));

    if (isNaN(target)) return;

    let current = 0;
    const duration = 1500;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
    }, 16);
}

function checkStatsInView() {
    if (statsAnimated) return;

    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const rect = aboutSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

    if (inView) {
        statsAnimated = true;
        statNumbers.forEach((stat, index) => {
            setTimeout(() => animateCounter(stat), index * 200);
        });
    }
}

window.addEventListener('scroll', checkStatsInView, { passive: true });
checkStatsInView();

// ===================================
// 8.6 CARD TILT EFFECT
// ===================================
const tiltCards = document.querySelectorAll('.glass-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
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
// Circle → Square (GPU Accelerated)
// ===================================

const heroPhoto = document.getElementById('hero-photo');
const aboutTarget = document.getElementById('about-photo-target');

if (heroPhoto && aboutTarget) {
    const heroFrame = heroPhoto.querySelector('.hero-photo-frame');
    const heroImg = heroPhoto.querySelector('img');

    // Create ghost element
    const ghost = document.createElement('div');
    const ghostImg = document.createElement('img');

    // GPU-optimized styles
    ghost.style.cssText = `
        position: fixed;
        z-index: 9999;
        pointer-events: none;
        box-shadow: 0 0 40px rgba(99, 102, 241, 0.4);
        overflow: hidden;
        display: none;
        border: 2px solid rgba(99, 102, 241, 0.5);
        transform-origin: top left;
        will-change: transform, border-radius;
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
        const a = aboutTarget.querySelector('.image-frame').getBoundingClientRect();
        const scrollY = window.scrollY; // Use current scrollY for absolute positioning calculation if needed, but primarily we want initial positions relative to viewport? 
        // Actually, getBoundingClientRect is relative to viewport. 
        // We want to animate from Hero (fixed/sticky behavior effectively) to About (scrolling up).
        // Wait, the original implementation added scrollY to top. Let's stick to that logic but use transforms.

        // Initial state (Hero)
        const startTop = h.top + scrollY;
        const startLeft = h.left;
        const startW = h.width;
        const startH = h.height;

        // Target state (About)
        const endTop = a.top + scrollY;
        const endLeft = a.left;
        const endW = a.width;
        const endH = a.height;

        cache = {
            startTop, startLeft, startW, startH,
            endTop, endLeft, endW, endH,
            scrollStart: 10,
            scrollEnd: window.innerHeight * 0.8
        };

        // Set initial position once
        ghost.style.top = '0px';
        ghost.style.left = '0px';
        ghost.style.width = startW + 'px';
        ghost.style.height = startH + 'px';

        dirty = false;
    }

    let state = -1;

    heroPhoto.style.animation = 'none';
    aboutTarget.style.opacity = '0';
    aboutTarget.style.visibility = 'hidden';

    function update() {
        if (dirty || !cache) recalc();

        const scrollY = window.scrollY;
        let p = (scrollY - cache.scrollStart) / (cache.scrollEnd - cache.scrollStart);
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
            const t = p * p * (3 - 2 * p); // Smoothstep

            if (state !== 1) {
                ghost.style.display = 'block';
                heroPhoto.style.opacity = '0';
                heroPhoto.style.visibility = 'hidden';
                aboutTarget.style.opacity = '0';
                aboutTarget.style.visibility = 'hidden';
                state = 1;
            }

            // Calculate Interpolation
            // Current Target Position (where it should be visually)
            // Hero is effectively static in the flow, but we are scrolling.
            // Wait, the ghost is fixed position. 
            // So we need to calculate where the visual elements are relative to the VIEWPORT.

            // Hero position relative to viewport:
            // The original used (hTop + scrollY) - scrollY = hTop (constant relative to viewport if it wasn't scrolling? No, hTop is rect.top).
            // Original: const top = (cache.hTop - scrollY) + ...
            // cache.hTop was (rect.top + scrollY). So cache.hTop - scrollY is indeed the current viewport-relative Top of the element position in flow.

            const currentHeroTop = cache.startTop - scrollY;
            const currentAboutTop = cache.endTop - scrollY;

            const targetY = currentHeroTop + (currentAboutTop - currentHeroTop) * t;
            const targetX = cache.startLeft + (cache.endLeft - cache.startLeft) * t;
            const targetW = cache.startW + (cache.endW - cache.startW) * t;
            const targetH = cache.startH + (cache.endH - cache.startH) * t;

            // GPU Transform Calculations
            // Base is set to Cache Start values (startW, startH) at 0,0 (top/left set to 0,0, but we use transform for position)
            // Wait, I set ghost.style.width = startW.

            const scaleX = targetW / cache.startW;
            const scaleY = targetH / cache.startH;

            // Translate
            // Since we set top:0, left:0, the transform is just x,y
            // BUT we need to account for the fact that we sized it to startW/startH
            // The transform-origin is top-left, so scaling extends right/down. This matches our needs.

            ghost.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(${scaleX}, ${scaleY})`;

            // BorderRadius triggers paint but not layout
            const radius = 50 - 48 * t;
            ghost.style.borderRadius = radius + '%';

            // Adjust border width inversely to scale to keep it looking consistent? 
            // Or just let it scale. The previous one didn't scale border.
            // Let's keep it simple for now.
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


