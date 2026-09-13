/** Shared navigation; all page content also works without JavaScript. */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const setMenuOpen = (open) => {
    navMenu?.classList.toggle('open', open);
    navToggle?.classList.toggle('open', open);
    navToggle?.setAttribute('aria-expanded', String(open));
    navToggle?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
};
navToggle?.addEventListener('click', () => setMenuOpen(!navMenu?.classList.contains('open')));
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navMenu?.classList.contains('open')) {
        setMenuOpen(false);
        navToggle?.focus();
    }
});
document.addEventListener('click', event => {
    if (!event.target.closest('.navbar')) setMenuOpen(false);
});
window.matchMedia('(min-width: 681px)').addEventListener('change', event => {
    if (event.matches) setMenuOpen(false);
});
const navbar = document.getElementById('navbar');
const onScroll = () => navbar?.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });
