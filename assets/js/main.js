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

// ===================================
// 1.5 THEME TOGGLE
// ===================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Navbar scroll effect - integrated in main scroll handler (section 10)
function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

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
// Show all cards if 3 or less, otherwise enable scroll with navigation
// ===================================
function initSmartCarousels() {
    const carousels = [
        { grid: '.projects-grid', section: '.projects', container: '.projects .container' },
        { grid: '.achievements-grid', section: '.achievements', container: '.achievements .container' },
        { grid: '.skills-grid', section: '.skills', container: '.skills .container' },
        { grid: '.education-grid', section: '.education', container: '.education .container' }
    ];

    carousels.forEach(({ grid, section, container }) => {
        const gridEl = document.querySelector(grid);
        const sectionEl = document.querySelector(section);
        const containerEl = document.querySelector(container);

        if (gridEl && sectionEl && containerEl) {
            const cardCount = gridEl.children.length;

            if (cardCount <= 3) {
                // Few items - center them, no scroll
                gridEl.classList.add('few-items');
                sectionEl.classList.add('no-scroll-fade');
            } else {
                // Many items - enable scroll with navigation
                gridEl.classList.remove('few-items');
                sectionEl.classList.remove('no-scroll-fade');

                // Wrap grid in carousel wrapper if not already wrapped
                if (!gridEl.parentElement.classList.contains('carousel-wrapper')) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'carousel-wrapper';
                    gridEl.parentNode.insertBefore(wrapper, gridEl);
                    wrapper.appendChild(gridEl);

                    // Create navigation arrows
                    const prevBtn = document.createElement('button');
                    prevBtn.className = 'carousel-nav prev';
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
                    prevBtn.setAttribute('aria-label', 'Previous');

                    const nextBtn = document.createElement('button');
                    nextBtn.className = 'carousel-nav next';
                    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
                    nextBtn.setAttribute('aria-label', 'Next');

                    wrapper.appendChild(prevBtn);
                    wrapper.appendChild(nextBtn);

                    // Create scroll indicators
                    const indicators = document.createElement('div');
                    indicators.className = 'carousel-indicators';

                    // Calculate number of dots based on visible cards
                    const cardWidth = gridEl.children[0]?.offsetWidth || 350;
                    const gap = 24; // var(--spacing-xl) approximately
                    const visibleWidth = gridEl.offsetWidth;
                    const scrollStep = cardWidth + gap;
                    const totalScrollWidth = gridEl.scrollWidth - visibleWidth;
                    const dotCount = Math.max(1, Math.ceil(totalScrollWidth / scrollStep) + 1);

                    for (let i = 0; i < Math.min(dotCount, 8); i++) {
                        const dot = document.createElement('button');
                        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                        dot.dataset.index = i;
                        indicators.appendChild(dot);
                    }

                    wrapper.appendChild(indicators);

                    // Add scroll hint (shows on first view)
                    const hint = document.createElement('div');
                    hint.className = 'scroll-hint';
                    hint.innerHTML = '<span>Scroll for more</span><i class="fas fa-arrow-right"></i>';
                    wrapper.appendChild(hint);

                    // Event handlers
                    const updateNavState = () => {
                        const scrollLeft = gridEl.scrollLeft;
                        const maxScroll = gridEl.scrollWidth - gridEl.offsetWidth;

                        // Update arrows visibility
                        prevBtn.classList.toggle('hidden', scrollLeft <= 10);
                        nextBtn.classList.toggle('hidden', scrollLeft >= maxScroll - 10);

                        // Update wrapper edge classes for fade effect
                        wrapper.classList.toggle('at-start', scrollLeft <= 10);
                        wrapper.classList.toggle('at-end', scrollLeft >= maxScroll - 10);

                        // Update active dot
                        const dots = indicators.querySelectorAll('.carousel-dot');
                        const currentIndex = Math.round(scrollLeft / scrollStep);
                        dots.forEach((dot, i) => {
                            dot.classList.toggle('active', i === currentIndex);
                        });

                        // Hide hint after first scroll
                        if (scrollLeft > 50) {
                            hint.classList.add('hidden');
                        }
                    };

                    // Initial state
                    updateNavState();

                    // Scroll event
                    gridEl.addEventListener('scroll', updateNavState, { passive: true });

                    // Arrow click handlers
                    prevBtn.addEventListener('click', () => {
                        gridEl.scrollBy({ left: -scrollStep, behavior: 'smooth' });
                    });

                    nextBtn.addEventListener('click', () => {
                        gridEl.scrollBy({ left: scrollStep, behavior: 'smooth' });
                    });

                    // Dot click handlers
                    indicators.querySelectorAll('.carousel-dot').forEach(dot => {
                        dot.addEventListener('click', () => {
                            const index = parseInt(dot.dataset.index);
                            gridEl.scrollTo({ left: index * scrollStep, behavior: 'smooth' });
                        });
                    });

                    // Hide hint on any interaction
                    wrapper.addEventListener('mouseenter', () => {
                        setTimeout(() => hint.classList.add('hidden'), 2000);
                    }, { once: true });
                }
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

// highlightNavOnScroll is called from main onScroll handler

// ===================================
// 7. PARALLAX EFFECT FOR HERO
// ===================================
const heroContent = document.querySelector('.hero-content');

// Hero parallax function
const cloudWrapper = document.querySelector('.cloud-wrapper');
let mouseX = 0;
let mouseY = 0;
let windowMidX = window.innerWidth / 2;
let windowMidY = window.innerHeight / 2;

// Update dimensions on resize
window.addEventListener('resize', () => {
    windowMidX = window.innerWidth / 2;
    windowMidY = window.innerHeight / 2;
}, { passive: true });

// Mouse tracking with throttled update
document.addEventListener('mousemove', (e) => {
    // Calculate mouse position relative to center (-1 to 1)
    mouseX = (e.clientX - windowMidX) / windowMidX;
    mouseY = (e.clientY - windowMidY) / windowMidY;

    // Trigger update (throttled via requestAnimationFrame pattern if needed, 
    // but here we just call it directly for responsiveness, relying on CSS for smoothing)
    requestAnimationFrame(updateHeroParallax);
}, { passive: true });


// Hero parallax function - ACTIVE
function updateHeroParallax() {
    const scrollY = window.scrollY;

    // Low-power optimization: Stop calculating if hero is well out of view
    // (Buffer of 100px)
    if (scrollY > window.innerHeight + 100) return;

    // 1. Scroll Parallax (Vertical depth)
    const cloudScrollY = scrollY * 0.4;

    // Content moves slightly faster/different rate
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
    }

    // 2. Cinematic Mouse Parallax (3D Tilt)
    // Using direct values, relying on CSS transition for smoothness
    const rotateX = -mouseY * 4; // Max 4deg tilt
    const rotateY = mouseX * 4;  // Max 4deg pan

    if (cloudWrapper) {
        // Combined transform
        cloudWrapper.style.transform = `translate3d(0, ${cloudScrollY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}

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

// checkStatsInView is called from main onScroll handler
checkStatsInView(); // Initial call



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

// Flowing orbs now use pure CSS animation (see hero.css)
// No JS scroll tracking needed

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
let lastSlowUpdate = 0;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // 1. Fast Visual Updates (Run every frame for smoothness)
            updateNavbar();
            updateScrollProgress();
            updateHeroParallax();



            // 2. Heavy Logic Updates (Throttle to every 100ms)
            // Improves performance by avoiding frequent layout thrashing (offsetTop/getBoundingClientRect)
            const now = Date.now();
            if (now - lastSlowUpdate > 100) {
                highlightNavOnScroll();
                checkStatsInView();
                updateFloatingNav();
                lastSlowUpdate = now;
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

// updateFloatingNav is called from main onScroll handler
updateFloatingNav(); // Initial call

// ===================================
// 11.5 EXPERIENCE CAROUSEL
// Professional single-view slider
// ===================================
function initExperienceCarousel() {
    const track = document.getElementById('experience-track');
    const slides = Array.from(document.getElementsByClassName('xp-slide'));
    const prevBtn = document.querySelector('.xp-prev');
    const nextBtn = document.querySelector('.xp-next');
    const progressFill = document.getElementById('xp-progress-fill');
    const countLabel = document.getElementById('xp-count');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Update UI function
    function updateCarousel(index) {
        // Enforce Bounds (Infinite Loop)
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        currentIndex = index;

        // Move Track
        // Since we are using flex, we translate percentage = index * -100%
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update Active Class (for scaling/opacity effects)
        slides.forEach((slide, i) => {
            if (i === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update Progress Bar
        const progress = ((currentIndex + 1) / totalSlides) * 100;
        if (progressFill) progressFill.style.width = `${progress}%`;

        // Update Counter
        if (countLabel) countLabel.textContent = `${currentIndex + 1} / ${totalSlides}`;
    }

    // Controls
    prevBtn?.addEventListener('click', () => updateCarousel(currentIndex - 1));
    nextBtn?.addEventListener('click', () => updateCarousel(currentIndex + 1));

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            updateCarousel(currentIndex + 1); // Swipe Left -> Next
        }
        if (touchEndX > touchStartX + threshold) {
            updateCarousel(currentIndex - 1); // Swipe Right -> Prev
        }
    }

    // Initialize 1st slide
    updateCarousel(0);
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', initExperienceCarousel);


// ===================================
// 12. END OF SCRIPTS
// ===================================
