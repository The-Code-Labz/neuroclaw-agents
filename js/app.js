/* ========================================
   NeuroClaw Agent Registry — App Logic
   ======================================== */

(function() {
  'use strict';

  // ── State ──────────────────────────────
  let currentCategory = 'all';
  let currentView = 'grid';
  let searchQuery = '';
  let filteredAgents = [...AGENTS];

  // ── DOM refs ───────────────────────────
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const els = {
    totalAgents: $('#totalAgents'),
    activeAgents: $('#activeAgents'),
    totalCategories: $('#totalCategories'),
    searchInput: $('#searchInput'),
    categoryFilters: $('#categoryFilters'),
    agentsGrid: $('#agentsGrid'),
    emptyState: $('#emptyState'),
    viewBtns: $$('.view-btn'),
    agentModal: $('#agentModal'),
    modalClose: $('#modalClose'),
    modalContent: $('#modalContent'),
    footerDate: $('#footerDate'),
    footerLastUpdated: $('#footerLastUpdated')
  };

  // ── Helpers ────────────────────────────
  function getInitials(name) {
    return name
      .split(/\s+/)
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  function formatModelName(model) {
    const map = {
      'claude-opus-4-8': 'Claude Opus 4.8',
      'claude-opus-4-7': 'Claude Opus 4.7',
      'claude-opus-4-6': 'Claude Opus 4.6',
      'claude-sonnet-4-6': 'Claude Sonnet 4.6',
      'gpt-5.5': 'GPT-5.5',
      'gpt-5.4-mini': 'GPT-5.4 Mini',
      'gpt-5.1': 'GPT-5.1',
      'grok-4.3': 'Grok 4.3',
      'kimi-for-coding': 'Kimi K2.6',
      'gemini-2.5-flash': 'Gemini 2.5 Flash',
      'mcp': 'MCP Tool'
    };
    return map[model] || model;
  }

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  // ── Render stats ───────────────────────
  function renderStats() {
    animateNumber(els.totalAgents, AGENTS.length);
    animateNumber(els.activeAgents, AGENTS.filter(a => a.status === 'active').length);
    animateNumber(els.totalCategories, CATEGORIES.length - 1);
  }

  function animateNumber(el, target) {
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

  // ── Render category filters ────────────
  function renderCategoryFilters() {
    els.categoryFilters.innerHTML = '';

    // All button
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-tab active';
    allBtn.dataset.category = 'all';
    allBtn.textContent = 'All Agents';
    allBtn.addEventListener('click', () => setCategory('all'));
    els.categoryFilters.appendChild(allBtn);

    // Grouped categories
    const groups = [
      { key: 'core', label: null },
      { key: 'studios', label: null },
      { key: 'system', label: null }
    ];

    let prevGroup = null;
    CATEGORIES.forEach(cat => {
      if (cat.name === 'All Agents') return;

      // Insert divider when group changes
      if (prevGroup && cat.group && cat.group !== prevGroup) {
        const divider = document.createElement('span');
        divider.className = 'tab-divider';
        els.categoryFilters.appendChild(divider);
      }
      prevGroup = cat.group || null;

      const btn = document.createElement('button');
      btn.className = 'filter-tab';
      btn.dataset.category = cat.name;
      btn.innerHTML = `${cat.name} <span style="opacity:0.5;margin-left:4px;">${cat.count}</span>`;
      btn.addEventListener('click', () => setCategory(cat.name));
      els.categoryFilters.appendChild(btn);
    });
  }

  // ── Filter & render agents ─────────────
  function filterAgents() {
    const q = searchQuery.toLowerCase().trim();
    filteredAgents = AGENTS.filter(agent => {
      const matchesCategory = currentCategory === 'all' || agent.category === currentCategory;
      const matchesSearch = !q ||
        agent.name.toLowerCase().includes(q) ||
        agent.role.toLowerCase().includes(q) ||
        agent.description.toLowerCase().includes(q) ||
        agent.category.toLowerCase().includes(q) ||
        agent.model.toLowerCase().includes(q) ||
        (agent.bestFor && agent.bestFor.toLowerCase().includes(q)) ||
        (agent.narrative && agent.narrative.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
    renderAgents();
  }

  function renderAgents() {
    if (filteredAgents.length === 0) {
      els.agentsGrid.style.display = 'none';
      els.emptyState.style.display = 'block';
      return;
    }

    els.agentsGrid.style.display = 'grid';
    els.emptyState.style.display = 'none';
    els.agentsGrid.innerHTML = '';

    filteredAgents.forEach((agent, i) => {
      const card = document.createElement('div');
      card.className = 'agent-card';
      card.style.setProperty('--card-accent', agent.accent);
      card.style.animationDelay = `${i * 0.03}s`;
      card.innerHTML = `
        <div class="agent-card-header">
          <img class="agent-avatar-img" src="${agent.image}" alt="${agent.name}" loading="lazy">
          <div class="agent-meta">
            <div class="agent-name" title="${agent.name}">${agent.name}</div>
            <div class="agent-role">${agent.role}</div>
            <div class="agent-badges">
              <span class="badge badge-status ${agent.status}">${agent.status}</span>
              <span class="badge badge-model">${formatModelName(agent.model)}</span>
              ${agent.temporary ? '<span class="badge badge-temp">on-demand</span>' : ''}
            </div>
          </div>
        </div>
        <div class="agent-description">${agent.description}</div>
        ${agent.bestFor ? `<div class="agent-bestfor">${agent.bestFor}</div>` : ''}
        <div class="agent-footer">
          <span class="agent-category">${agent.category}</span>
          ${agent.lastUpdated ? `<span class="agent-updated">${formatDate(agent.lastUpdated)}</span>` : ''}
        </div>
      `;
      card.addEventListener('click', () => openModal(agent));
      els.agentsGrid.appendChild(card);
    });
  }

  // ── Category switch ────────────────────
  function setCategory(cat) {
    currentCategory = cat;
    $$('.filter-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === cat);
    });
    filterAgents();
  }

  // ── View toggle ────────────────────────
  function setView(view) {
    currentView = view;
    els.viewBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
    els.agentsGrid.classList.toggle('list-view', view === 'list');
  }

  els.viewBtns.forEach(btn => {
    btn.addEventListener('click', () => setView(btn.dataset.view));
  });

  // ── Search ─────────────────────────────
  els.searchInput.addEventListener('input', e => {
    searchQuery = e.target.value;
    filterAgents();
  });

  // Keyboard shortcut: Ctrl/Cmd + K
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      els.searchInput.focus();
    }
    if (e.key === 'Escape') {
      closeModal();
      if (document.activeElement === els.searchInput) {
        els.searchInput.blur();
      }
    }
  });

  // ── Modal ──────────────────────────────
  function openModal(agent) {
    const tempBadge = agent.temporary
      ? '<span class="badge badge-temp">on-demand</span>'
      : '<span class="badge badge-status">permanent</span>';

    els.modalContent.innerHTML = `
      <div class="modal-header">
        <img class="modal-avatar-img" src="${agent.image}" alt="${agent.name}">
        <div class="modal-title-group">
          <div class="modal-name">${agent.name}</div>
          <div class="modal-role">${agent.role}</div>
          <div class="modal-badges">
            <span class="badge badge-status ${agent.status}">${agent.status}</span>
            <span class="badge badge-model">${formatModelName(agent.model)}</span>
            ${tempBadge}
          </div>
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">About</div>
        <div class="modal-description">${agent.description}</div>
      </div>
      ${agent.narrative ? `
      <div class="modal-section">
        <div class="modal-section-title">How I work</div>
        <div class="modal-narrative">${agent.narrative}</div>
      </div>
      ` : ''}
      <div class="modal-section">
        <div class="modal-section-title">Details</div>
        <div class="modal-meta-grid">
          <div class="modal-meta-item">
            <div class="meta-label">Category</div>
            <div class="meta-value">${agent.category}</div>
          </div>
          <div class="modal-meta-item">
            <div class="meta-label">Status</div>
            <div class="meta-value" style="color:${agent.status==='active'?'var(--accent-emerald)':'var(--text-muted)'};">${agent.status}</div>
          </div>
          <div class="modal-meta-item">
            <div class="meta-label">Model</div>
            <div class="meta-value mono">${formatModelName(agent.model)}</div>
          </div>
          <div class="modal-meta-item">
            <div class="meta-label">Agent ID</div>
            <div class="meta-value mono" style="font-size:0.75rem;">${agent.id.slice(0, 8)}…</div>
          </div>
          ${agent.lastUpdated ? `
          <div class="modal-meta-item">
            <div class="meta-label">Last Updated</div>
            <div class="meta-value">${formatDate(agent.lastUpdated)}</div>
          </div>
          ` : ''}
          ${agent.bestFor ? `
          <div class="modal-meta-item" style="grid-column: 1 / -1;">
            <div class="meta-label">Best For</div>
            <div class="meta-value">${agent.bestFor}</div>
          </div>
          ` : ''}
        </div>
      </div>
    `;
    els.modalContent.style.setProperty('--modal-accent', agent.accent);
    els.agentModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    els.agentModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  els.modalClose.addEventListener('click', closeModal);
  els.agentModal.addEventListener('click', e => {
    if (e.target === els.agentModal) closeModal();
  });

  // ── Footer dates ───────────────────────
  const today = new Date();
  els.footerDate.textContent = today.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  if (els.footerLastUpdated) {
    els.footerLastUpdated.textContent += today.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  // ── Init ───────────────────────────────
  renderStats();
  renderCategoryFilters();
  filterAgents();

  // Search focus on load with small delay
  setTimeout(() => els.searchInput.focus(), 300);

})();
