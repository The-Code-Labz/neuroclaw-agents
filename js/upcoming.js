/* ========================================
   NeuroClaw Agent Registry — Upcoming Agents Logic
   ======================================== */

(function() {
  'use strict';

  if (typeof UPCOMING_AGENTS === 'undefined') return;

  let currentStatus = 'all';
  let searchQuery = '';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const els = {
    grid: $('#upcomingGrid'),
    emptyState: $('#upcomingEmptyState'),
    searchInput: $('#upcomingSearchInput'),
    filters: $('#upcomingFilters'),
    total: $('#upcomingTotal'),
    available: $('#upcomingAvailable'),
    reserved: $('#upcomingReserved')
  };

  if (!els.grid) return;

  function animateNumber(el, target) {
    if (!el) return;
    const duration = 800;
    const start = performance.now();
    const from = parseInt(el.textContent) || 0;

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(from + (target - from) * ease);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function renderStats() {
    const availableCount = UPCOMING_AGENTS.filter(a => a.status === 'available').length;
    const reservedCount = UPCOMING_AGENTS.filter(a => a.status === 'reserved').length;
    animateNumber(els.total, UPCOMING_AGENTS.length);
    animateNumber(els.available, availableCount);
    animateNumber(els.reserved, reservedCount);
  }

  function slugifyName(name) {
    return name
      .normalize('NFKD')
      .replace(/[^\x00-\x7F]/g, '')
      .replace(/[^\w\s-]/g, '')
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, '-');
  }

  function initialsFor(name) {
    return name
      .split(/\s+/)
      .slice(0, 2)
      .map(w => w[0])
      .join('')
      .toUpperCase();
  }

  function monogramDataUri(entry) {
    const initials = initialsFor(entry.name);
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
        <rect width="80" height="80" rx="40" fill="#17151b"/>
        <circle cx="40" cy="40" r="37" fill="none" stroke="#C9A45C" stroke-opacity=".34" stroke-width="2"/>
        <text x="40" y="43" text-anchor="middle" dominant-baseline="middle"
              fill="#C9A45C" font-family="DM Sans,Arial,sans-serif"
              font-size="${initials.length > 1 ? 25 : 30}" font-weight="700">${initials}</text>
      </svg>
    `.trim();
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  function avatarMarkup(entry) {
    const portrait = `images/upcoming/${slugifyName(entry.name)}.webp`;
    const fallback = monogramDataUri(entry);
    return `
      <span class="pill-avatar">
        <img src="${portrait}" alt="" loading="lazy" decoding="async"
             data-fallback="${fallback}"
             onerror="this.onerror=null; this.dataset.fallbackActive='true'; this.closest('.pill-avatar').classList.add('is-fallback'); this.src=this.dataset.fallback;">
      </span>
    `;
  }

  function createPill(entry) {
    const pill = document.createElement('div');
    pill.className = `upcoming-pill upcoming-pill--${entry.status} has-avatar`;

    const avatar = avatarMarkup(entry);

    if (entry.status === 'reserved') {
      pill.innerHTML = `
        ${avatar}
        <span class="pill-body">
          <span class="pill-name">${entry.name}</span>
          <span class="pill-caption">Reserved — ${entry.matched}${entry.note ? ` <em>(${entry.note})</em>` : ''}</span>
        </span>
      `;
    } else {
      const watchTag = entry.note ? '<span class="pill-watch-dot" title="Partial name overlap — see note"></span>' : '';
      pill.innerHTML = `
        ${avatar}
        <span class="pill-body">
          <span class="pill-name">${entry.name}${watchTag}</span>
          ${entry.note ? `<span class="pill-caption pill-caption--note">${entry.note}</span>` : '<span class="pill-caption pill-caption--available">Available</span>'}
        </span>
      `;
    }
    return pill;
  }

  function render() {
    const q = searchQuery.toLowerCase().trim();
    const filtered = UPCOMING_AGENTS.filter(a => {
      const matchesStatus = currentStatus === 'all' || a.status === currentStatus;
      const matchesSearch = !q || a.name.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });

    if (filtered.length === 0) {
      els.grid.style.display = 'none';
      els.emptyState.style.display = 'block';
      return;
    }

    els.emptyState.style.display = 'none';
    els.grid.style.display = 'flex';
    els.grid.innerHTML = '';

    filtered.forEach(entry => {
      els.grid.appendChild(createPill(entry));
    });
  }

  function setStatus(status) {
    currentStatus = status;
    $$('.filter-tab', els.filters).forEach(btn => {
      btn.classList.toggle('active', btn.dataset.status === status);
    });
    render();
  }

  els.filters.addEventListener('click', e => {
    const btn = e.target.closest('.filter-tab');
    if (!btn) return;
    setStatus(btn.dataset.status);
  });

  els.searchInput.addEventListener('input', e => {
    searchQuery = e.target.value;
    render();
  });

  // Click a candidate's portrait to see it enlarged.
  els.grid.addEventListener('click', e => {
    const img = e.target.closest('.pill-avatar img');
    if (!img || img.dataset.fallbackActive === 'true') return;
    if (window.NeuroClawLightbox) {
      const pill = img.closest('.upcoming-pill');
      const name = pill ? pill.querySelector('.pill-name')?.textContent?.trim() : '';
      window.NeuroClawLightbox.open(img.src, name || img.alt);
    }
  });

  renderStats();
  render();

})();
