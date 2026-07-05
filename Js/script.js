// ===== BOJABHUMI CAFE - SCRIPT.JS =====

// Nomor WhatsApp Admin - GANTI NOMOR INI
const WA_NUMBER = "6281224199235";
const PAKAR_FAQ_WA_NUMBER = "62895365525934";
const WA_MESSAGE = "Halo Bojabhumi!";

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
let scrollTicking = false;

function onScrollFrame() {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }

  updateActiveNav();
  revealOnScroll();

  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }

  scrollTicking = false;
}

function requestScrollFrame() {
  if (!scrollTicking) {
    window.requestAnimationFrame(onScrollFrame);
    scrollTicking = true;
  }
}

window.addEventListener('scroll', requestScrollFrame, { passive: true });

// ===== SMOOTH CLOSE MOBILE MENU ON LINK CLICK =====
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse?.classList.contains('show')) {
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

// ===== WHATSAPP LINKS =====
function buildWALink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg || WA_MESSAGE)}`;
}

document.querySelectorAll('[data-wa]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const msg = el.getAttribute('data-wa-msg') || WA_MESSAGE;
    window.open(buildWALink(msg), '_blank', 'noopener,noreferrer');
  });
});

// ===== MENU FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterBtns.forEach(btn => {
  btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    // Update active button
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

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

revealOnScroll(); // Run on page load

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== WHATSAPP FLOAT BUBBLE =====
const waFloat = document.querySelector('.wa-float');
let waBubbleTimer = null;

if (waFloat) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30 && !waBubbleTimer && !waFloat.classList.contains('show-bubble')) {
      waBubbleTimer = setTimeout(() => {
        waFloat.classList.add('show-bubble');
      }, 2000);
    }
  }, { passive: true });
}

// ===== HERO SCROLL INDICATOR =====
document.querySelector('.hero-scroll-indicator')?.addEventListener('click', () => {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
});

// ===== LAZY YOUTUBE TESTIMONIAL MODAL =====
const testimonialVideoModal = document.getElementById('testimonialVideoModal');
const testimonialVideoFrame = document.getElementById('testimonialVideoFrame');
const testimonialVideoTitle = document.getElementById('testimonialVideoModalLabel');

if (testimonialVideoModal && testimonialVideoFrame) {
  const bsTestimonialModal = new bootstrap.Modal(testimonialVideoModal);

  document.querySelectorAll('[data-youtube-id]').forEach(card => {
    card.addEventListener('click', () => {
      const videoId = card.getAttribute('data-youtube-id');
      const videoTitle = card.getAttribute('data-video-title') || 'Cerita Peserta';

      if (!videoId) return;

      testimonialVideoTitle.textContent = videoTitle;
      testimonialVideoFrame.innerHTML = `
        <iframe
          src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1"
          title="${videoTitle}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          loading="lazy"></iframe>
      `;
      bsTestimonialModal.show();
    });
  });

  testimonialVideoModal.addEventListener('hidden.bs.modal', () => {
    testimonialVideoFrame.innerHTML = '';
  });
}

// ===== PAKAR JAMU FAQ ACCORDION + WHATSAPP FORM =====
const pakarFaqItems = document.querySelectorAll('.pakar-faq-item');

function setFaqAnswerHeight(item) {
  const answer = item.querySelector('.pakar-faq-answer');
  if (!answer) return;
  answer.style.maxHeight = item.classList.contains('active') ? `${answer.scrollHeight}px` : '0px';
}

pakarFaqItems.forEach((item, itemIndex) => {
  const question = item.querySelector('.pakar-faq-question');
  const answer = item.querySelector('.pakar-faq-answer');
  const answerId = answer?.id || `pakar-faq-answer-${itemIndex + 1}`;

  if (answer) {
    answer.id = answerId;
    answer.setAttribute('role', 'region');
  }

  question?.setAttribute('aria-controls', answerId);
  setFaqAnswerHeight(item);

  question?.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    pakarFaqItems.forEach(otherItem => {
      otherItem.classList.remove('active');
      otherItem.querySelector('.pakar-faq-question')?.setAttribute('aria-expanded', 'false');
      setFaqAnswerHeight(otherItem);
    });

    if (!isActive) {
      item.classList.add('active');
      question.setAttribute('aria-expanded', 'true');
      setFaqAnswerHeight(item);
    }
  });
});

window.addEventListener('resize', () => {
  pakarFaqItems.forEach(setFaqAnswerHeight);
}, { passive: true });

const pakarFaqForm = document.getElementById('pakarFaqForm');

if (pakarFaqForm) {
  pakarFaqForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('faqName')?.value.trim();
    const whatsapp = document.getElementById('faqWhatsapp')?.value.trim();
    const question = document.getElementById('faqQuestion')?.value.trim();

    if (!name || !question) return;

    const message = [
      'Halo Pakar Jamu, saya ingin bertanya tentang program pelatihan Jamu Journey Experience.',
      '',
      `Nama: ${name}`,
      whatsapp ? `WhatsApp: ${whatsapp}` : null,
      `Pertanyaan: ${question}`
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${PAKAR_FAQ_WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });
}

// ===== STAGGERED ANIMATION FOR MENU CARDS =====
function staggerMenuCards() {
  const cards = document.querySelectorAll('.menu-item.show .menu-card');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.07}s`;
  });
}
staggerMenuCards();

// ===== YEAR FOR FOOTER COPYRIGHT =====
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}



