// API base – same origin when served by Express
const API_BASE = '/api';

// ---------- Mobile Menu ----------
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });
}

// ---------- Theme Toggle ----------
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  if (themeToggle) themeToggle.textContent = '☀️';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });
}

// ---------- Load Resources from API ----------
async function loadResources(category = '') {
  const grid = document.getElementById('resourcesGrid');
  if (!grid) return;

  grid.innerHTML = '<p class="loading">Loading resources...</p>';

  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`${API_BASE}/resources${query}`);
    const json = await res.json();

    if (!json.success || !json.data || json.data.length === 0) {
      grid.innerHTML = '<p class="empty-state">No resources found. Be the first to share one!</p>';
      return;
    }

    grid.innerHTML = json.data
      .map(r => {
        const typeLabel = (r.type || 'document').toUpperCase();
        const date = r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '';
        return `
          <div class="resource-card">
            <span class="resource-type">${typeLabel}</span>
            <h3>${escapeHtml(r.title)}</h3>
            <p>${escapeHtml(r.description)}</p>
            <div class="resource-meta">
              ${r.author ? `By ${escapeHtml(r.author)} · ` : ''}${date}
              ${r.category ? ` · ${r.category}` : ''}
            </div>
          </div>`;
      })
      .join('');
  } catch (err) {
    console.error(err);
    grid.innerHTML = '<p class="empty-state">Could not load resources. Make sure the server is running.</p>';
  }
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Filter & refresh
const categoryFilter = document.getElementById('categoryFilter');
const refreshBtn = document.getElementById('refreshResources');

if (categoryFilter) {
  categoryFilter.addEventListener('change', () => loadResources(categoryFilter.value));
}
if (refreshBtn) {
  refreshBtn.addEventListener('click', () => loadResources(categoryFilter ? categoryFilter.value : ''));
}

// Initial load
loadResources();

// ---------- Upload / Create Resource ----------
const uploadForm = document.getElementById('uploadForm');
if (uploadForm) {
  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageEl = document.getElementById('uploadMessage');
    const btn = uploadForm.querySelector('button[type="submit"]');

    const payload = {
      title: uploadForm.title.value.trim(),
      description: uploadForm.description.value.trim(),
      category: uploadForm.category.value,
      type: uploadForm.type.value || 'document',
      author: uploadForm.author.value.trim() || 'Anonymous'
    };

    btn.disabled = true;
    btn.textContent = 'Submitting...';

    try {
      const res = await fetch(`${API_BASE}/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();

      if (json.success) {
        messageEl.textContent = '✓ Resource shared successfully!';
        messageEl.className = 'form-message success';
        uploadForm.reset();
        loadResources(categoryFilter ? categoryFilter.value : '');
      } else {
        throw new Error(json.message || 'Failed to submit');
      }
    } catch (err) {
      messageEl.textContent = '✗ ' + (err.message || 'Something went wrong');
      messageEl.className = 'form-message error';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Submit Resource';
      setTimeout(() => {
        messageEl.className = 'form-message';
      }, 4000);
    }
  });
}

// ---------- Contact Form ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageEl = document.getElementById('formMessage');
    const btn = contactForm.querySelector('button[type="submit"]');

    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();

      if (json.success) {
        messageEl.textContent = '✓ ' + (json.message || 'Message sent successfully!');
        messageEl.className = 'form-message success';
        contactForm.reset();
      } else {
        throw new Error(json.message || 'Failed to send');
      }
    } catch (err) {
      messageEl.textContent = '✗ ' + (err.message || 'Something went wrong');
      messageEl.className = 'form-message error';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      setTimeout(() => {
        messageEl.className = 'form-message';
      }, 4000);
    }
  });
}

// ---------- Smooth Scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
