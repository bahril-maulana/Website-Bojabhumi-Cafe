// ===== BOJABHUMI CAFE - SCRIPT.JS =====

// Nomor WhatsApp Admin - GANTI NOMOR INI
const WA_NUMBER = "6281224199235";
const WA_MESSAGE = "Halo Bojabhumi!";

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== SMOOTH CLOSE MOBILE MENU ON LINK CLICK =====
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) bsCollapse.hide();
    }
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active-nav');
        }
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav);

// ===== WHATSAPP LINKS =====
function buildWALink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg || WA_MESSAGE)}`;
}

document.querySelectorAll('[data-wa]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const msg = el.getAttribute('data-wa-msg') || WA_MESSAGE;
    window.open(buildWALink(msg), '_blank');
  });
});

// ===== MENU FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter items with animation
    menuItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        item.classList.remove('hide-item');
        item.classList.add('show');
        item.style.animation = 'fadeInUp 0.4s ease both';
      } else {
        item.classList.remove('show');
        item.classList.add('hide-item');
        item.style.animation = '';
      }
    });
  });
});

// Show all items on load
menuItems.forEach(item => item.classList.add('show'));

// ===== SCROLL REVEAL =====
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Run on page load

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== HERO SCROLL INDICATOR =====
document.querySelector('.hero-scroll-indicator')?.addEventListener('click', () => {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
});

// ===== STAGGERED ANIMATION FOR MENU CARDS =====
function staggerMenuCards() {
  const cards = document.querySelectorAll('.menu-item.show .menu-card');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.07}s`;
  });
}
staggerMenuCards();

// ===== YEAR FOR FOOTER COPYRIGHT =====
document.getElementById('year').textContent = new Date().getFullYear();
