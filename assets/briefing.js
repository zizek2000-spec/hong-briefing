(function () {
  'use strict';

  const body = document.body;
  const path = window.location.pathname;
  const inSubdir = /\/(morning|toolbox)\/?$/.test(path);
  const root = inSubdir ? '../' : './';
  const page = path.includes('/morning') ? 'morning' : path.includes('/toolbox') ? 'toolbox' : 'pitch';
  const assetVersion = '20260905-polish-v1';

  if (!document.querySelector('link[href*="briefing.css"]')) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = `${root}assets/briefing.css?v=${assetVersion}`;
    document.head.appendChild(style);
  }

  function setNavigation() {
    const header = document.querySelector('header');
    if (!header) return;

    let nav = header.querySelector('.workspace-nav, .nav');
    if (!nav) {
      nav = document.createElement('nav');
      nav.className = 'workspace-nav';
      header.appendChild(nav);
    }

    const items = [
      ['pitch', root, '오늘의 발제'],
      ['morning', root + 'morning/', '모닝 브리핑'],
      ['toolbox', root + 'toolbox/', '취재 도구']
    ];

    nav.innerHTML = items.map(([key, href, label]) =>
      `<a${key === page ? ' class="active" aria-current="page"' : ''} href="${href}">${label}</a>`
    ).join('');
  }

  function itemType(item) {
    if (item.dataset.kind) return item.dataset.kind;
    const label = (item.querySelector('.tag, .num, .flag')?.textContent || '').trim();
    const text = item.textContent || '';
    if (/공시|DART|기업|수주|계약|매출|삼성|배터리/.test(label + text.slice(0, 220))) return 'company';
    if (/정책|기관|중기부|정부|국회|위원회|진흥원|공단|기금|통계|소상공인/.test(label + text.slice(0, 220))) return 'gov';
    return 'pitch';
  }

  function buildToolbar() {
    if (page === 'toolbox') return;
    const items = Array.from(document.querySelectorAll('.pitch-card, .card, .item, ol.readlist li, .reading-grid li'));
    const cards = items.filter(item => item.matches('.pitch-card, .card, .item'));
    if (!items.length || document.querySelector('.desk-toolbar')) return;

    items.forEach(item => { item.dataset.kind = itemType(item); });

    const toolbar = document.createElement('section');
    toolbar.className = 'desk-toolbar';
    toolbar.setAttribute('aria-label', '브리핑 검색과 필터');
    toolbar.innerHTML = `
      <input class="desk-search" type="search" placeholder="회사·기관·숫자·쟁점 검색" aria-label="브리핑 검색">
      <div class="filter-group" role="group" aria-label="발제 분류">
        <button class="filter-chip active" type="button" data-filter="all">전체</button>
        <button class="filter-chip" type="button" data-filter="gov">정책·기관</button>
        <button class="filter-chip" type="button" data-filter="company">기업·공시</button>
      </div>
      <div class="filter-group">
        <span class="desk-count" aria-live="polite"></span>
        <button class="view-toggle" type="button">요약 보기</button>
      </div>`;

    const anchor = document.querySelector('.section-block, .section-heading, .section-title, .card-grid, .grid');
    if (anchor) anchor.before(toolbar);

    const search = toolbar.querySelector('.desk-search');
    const count = toolbar.querySelector('.desk-count');
    const chips = Array.from(toolbar.querySelectorAll('.filter-chip'));
    const view = toolbar.querySelector('.view-toggle');
    let filter = 'all';

    function applyFilters() {
      const query = search.value.trim().toLocaleLowerCase('ko');
      let visible = 0;
      items.forEach(item => {
        const matchesText = !query || item.textContent.toLocaleLowerCase('ko').includes(query);
        const matchesKind = filter === 'all' || item.dataset.kind === filter;
        item.classList.toggle('is-hidden', !(matchesText && matchesKind));
        if (matchesText && matchesKind) visible += 1;
      });
      count.textContent = `${visible}/${items.length}건`;
    }

    search.addEventListener('input', applyFilters);
    chips.forEach(chip => chip.addEventListener('click', () => {
      chips.forEach(other => other.classList.remove('active'));
      chip.classList.add('active');
      filter = chip.dataset.filter;
      applyFilters();
    }));

    const compact = localStorage.getItem('daily-briefing-compact') === 'true';
    body.classList.toggle('compact-mode', compact);
    view.textContent = compact ? '상세 보기' : '요약 보기';
    view.addEventListener('click', () => {
      body.classList.toggle('compact-mode');
      const enabled = body.classList.contains('compact-mode');
      localStorage.setItem('daily-briefing-compact', String(enabled));
      view.textContent = enabled ? '상세 보기' : '요약 보기';
    });

    cards.forEach(card => {
      card.setAttribute('tabindex', '0');
    });

    applyFilters();
  }

  function buildToolboxSearch() {
    if (page !== 'toolbox') return;
    const search = document.querySelector('#repo-search');
    const count = document.querySelector('#repo-count');
    const chips = Array.from(document.querySelectorAll('[data-repo-filter]'));
    const cards = Array.from(document.querySelectorAll('.repo-card'));
    let filter = 'all';

    function apply() {
      const query = (search?.value || '').trim().toLocaleLowerCase('ko');
      let visible = 0;
      cards.forEach(card => {
        const matchesText = !query || card.textContent.toLocaleLowerCase('ko').includes(query);
        const matchesKind = filter === 'all' || card.dataset.repoKind === filter;
        card.classList.toggle('is-hidden', !(matchesText && matchesKind));
        if (matchesText && matchesKind) visible += 1;
      });
      if (count) count.textContent = `${visible}/${cards.length}개`;
    }

    search?.addEventListener('input', apply);
    chips.forEach(chip => chip.addEventListener('click', () => {
      chips.forEach(other => other.classList.remove('active'));
      chip.classList.add('active');
      filter = chip.dataset.repoFilter;
      apply();
    }));
    apply();
  }

  setNavigation();
  buildToolbar();
  buildToolboxSearch();
})();
