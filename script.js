/* =============================================
   CLASSIC PORTFOLIO — script.js
   ============================================= */

// ---- Navbar scroll shadow ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ---- Mobile menu toggle ----
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ---- Animate skill bars when visible ----
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const finalWidth = target.style.width;
      target.style.width = '0%';
      // Force reflow then animate
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          target.style.width = finalWidth;
        });
      });
      skillObserver.unobserve(target);
    }
  });
}, { threshold: 0.1 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ---- Fade-in cards on scroll ----
const fadeEls = document.querySelectorAll(
  '.project-card, .blog-card, .stat-card, .cert-card, .edu-card, .achievement-card, .contact-card, .skill-category, .timeline-item'
);

const style = document.createElement('style');
style.textContent = `
  .fade-hidden { opacity: 0; transform: translateY(16px); transition: opacity 0.5s ease, transform 0.5s ease; }
  .fade-visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);

fadeEls.forEach(el => el.classList.add('fade-hidden'));

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('fade-visible');
      }, 60);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach(fill => fadeObserver.observe(fill));
