// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const list = document.querySelector('.nav-list');
if (toggle) {
  toggle.addEventListener('click', () => {
    const isOpen = list.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Simple contact form using mailto (replace with Formspree/EmailJS for production)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = encodeURIComponent(data.get('name'));
    const email = encodeURIComponent(data.get('email'));
    const message = encodeURIComponent(data.get('message'));
    const subject = `Portfolio Contact — ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
    window.location.href = `mailto:kotanarender2580@gmail.com?subject=${subject}&body=${body}`;
    if (status) status.textContent = "Opening your email client...";
    form.reset();
  });
}

/* =========================
   Modal Gallery (All Projects)
   ========================= */

let lastFocused = null;

// Open modal by id suffix (e.g., 'bookstore' -> #gallery-bookstore)
function openGallery(id) {
  const modal = document.getElementById(`gallery-${id}`);
  if (!modal) return;
  lastFocused = document.activeElement;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');

  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) closeBtn.focus();
}

// Close modal by id suffix
function closeGallery(id) {
  const modal = document.getElementById(`gallery-${id}`);
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');

  if (lastFocused && typeof lastFocused.focus === 'function') {
    lastFocused.focus();
  }
}

// Wire up all overlay buttons
document.querySelectorAll('[data-gallery-target]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-gallery-target');
    openGallery(id);
  });
});

// Close buttons inside modals
document.querySelectorAll('.modal').forEach(modal => {
  const close = modal.querySelector('.modal-close');
  if (close) {
    close.addEventListener('click', () => {
      const id = modal.id.replace('gallery-', '');
      closeGallery(id);
    });
  }

  // Click outside panel to close (only when clicking the backdrop area)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      const id = modal.id.replace('gallery-', '');
      closeGallery(id);
    }
  });
});

// ESC to close active modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.modal.open');
    if (openModal) {
      const id = openModal.id.replace('gallery-', '');
      closeGallery(id);
    }
  }
});
