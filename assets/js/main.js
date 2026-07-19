/**
 * NARDI XHEPI — Portfolio Scripts
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Mobile nav toggle ────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle?.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
});

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('open');
        navToggle?.classList.remove('open');
    });
});

// ── Navbar border/shadow on scroll ───────────────────
const navbar = document.getElementById('navbar');

const onScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 8);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ── Fade-up scroll animation ─────────────────────────
const fadeEls = document.querySelectorAll('.fade-up');

if (fadeEls.length) {
    if (prefersReducedMotion) {
        fadeEls.forEach(el => el.classList.add('visible'));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        fadeEls.forEach(el => observer.observe(el));
    }
}
