(function () {
  'use strict';

  const body = document.body;
  const path = window.location.pathname;
  const inSubdir = /\/(morning|toolbox)\/?$/.test(path);
  const root = inSubdir ? '../' : './';
  const page = path.includes('/morning') ? 'morning' : path.includes('/toolbox') ? 'toolbox' : 'pitch';
  const assetVersion = '20260905-graph-v2';

  if (!document.querySelector('link[href*="briefing.css"]')) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = `${root}assets/briefing.css?v=${assetVersion}`;
    document.head.appendChild(style);
  }

  function setNavigation() {
    const header = document.querySelector('header');
    if (!header) return;

    let nav = header.querySelector('.nav, .workspace-nav');
    if (!nav) {
      nav = document.createElement('nav');
      nav.className = 'workspace-nav';
      header.appendChild(nav);
    }

    const items = [
      ['pitch', root, '오늘의 발제'],
      ['graph', root + '#briefing-graph', '작업 그래프'],
      ['morning', root + 'morning/', '모닝 브리핑'],
      ['toolbox', root + 'toolbox/', '취재 도구 20선']
    ];

    nav.innerHTML = items.map(([key, href, label]) =>
      `<a${key === page ? ' class="active" aria-current="page"' : ''} href="${href}">${label}</a>`
    ).join('');
  }

  function sourceStrip() {
    if (page === 'toolbox') return;
    const links = [
      ['DART', 'https://dart.fss.or.kr/'],
      ['KIND', 'https://kind.krx.co.kr/'],
      ['중기부', 'https://www.mss.go.kr/site/smba/ex/bbs/List.do?cbIdx=86'],
      ['중기연구원', 'https://www.kosi.re.kr/'],
      ['KOSIS', 'https://kosis.kr/'],
      ['국회 의안', 'https://likms.assembly.go.kr/bill/main.do'],
      ['공정위', 'https://www.ftc.go.kr/']
    ];
    const strip = document.createElement('div');
    strip.className = 'source-strip';
    strip.innerHTML = '<strong>원문 바로가기</strong>' + links.map(([name, href]) =>
      `<a href="${href}" target="_blank" rel="noopener">${name}</a>`
    ).join('');

    const anchor = document.querySelector('.disclosures, .section-title, ol.readlist, .grid');
    if (anchor) anchor.before(strip);
  }

  function getTitle(item) {
    return (item.querySelector('h2, h3, a')?.textContent || '').trim();
  }

  function itemType(item) {
    const label = (item.querySelector('.num, .flag')?.textContent || '').trim();
    const text = item.textContent || '';
    if (/^관|기관|정책/.test(label) || /중기부|공정위|국회|위원회|진흥원|공단|기금/.test(text.slice(0, 180))) return 'gov';
    if (/^기업/.test(label)) return 'company';
    return 'pitch';
  }

  function storageKey(item) {
    return 'daily-briefing-status:' + getTitle(item).slice(0, 100);
  }

  function copyText(item, button) {
    const title = getTitle(item);
    const parts = Array.from(item.querySelectorAll('.sub, .row, .verify, .factcheck, .src'))
      .map(node => node.textContent.trim())
      .filter(Boolean);
    const text = [title, ...parts].join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
      const old = button.textContent;
      button.textContent = '복사됨';
      window.setTimeout(() => { button.textContent = old; }, 1200);
    }).catch(() => {
      button.textContent = '복사 실패';
    });
  }

  function addCardActions(items) {
    const states = ['검토 전', '취재중', '기사화', '보류'];
    items.forEach(item => {
      if (item.querySelector('.card-actions')) return;
      const actions = document.createElement('div');
      actions.className = 'card-actions';

      const status = document.createElement('button');
      status.type = 'button';
      status.className = 'card-action status';
      status.dataset.state = localStorage.getItem(storageKey(item)) || states[0];
      status.textContent = status.dataset.state;
      status.setAttribute('aria-label', `${getTitle(item)} 취재 상태 변경`);
      status.addEventListener('click', () => {
        const next = states[(states.indexOf(status.dataset.state) + 1) % states.length];
        status.dataset.state = next;
        status.textContent = next;
        localStorage.setItem(storageKey(item), next);
      });

      const copy = document.createElement('button');
      copy.type = 'button';
      copy.className = 'card-action';
      copy.textContent = '발제 복사';
      copy.setAttribute('aria-label', `${getTitle(item)} 내용 복사`);
      copy.addEventListener('click', () => copyText(item, copy));

      actions.append(status, copy);
      item.appendChild(actions);
    });
  }

  function buildToolbar() {
    if (page === 'toolbox') return;
    const cards = Array.from(document.querySelectorAll('.card'));
    const reads = Array.from(document.querySelectorAll('ol.readlist li'));
    const items = [...cards, ...reads];
    if (!items.length) return;

    cards.forEach(card => { card.dataset.kind = itemType(card); });
    reads.forEach(read => { read.dataset.kind = itemType(read); });
    addCardActions(cards);

    const toolbar = document.createElement('section');
    toolbar.className = 'desk-toolbar';
    toolbar.setAttribute('aria-label', '브리핑 검색과 필터');
    toolbar.innerHTML = `
      <input class="desk-search" type="search" placeholder="회사·기관·숫자·쟁점 검색" aria-label="브리핑 검색">
      <div class="filter-group" role="group" aria-label="발제 분류">
        <button class="filter-chip active" type="button" data-filter="all">전체</button>
        <button class="filter-chip" type="button" data-filter="gov">정책·기관</button>
        <button class="filter-chip" type="button" data-filter="company">담당 기업</button>
        <button class="filter-chip" type="button" data-filter="pitch">기타·발제</button>
      </div>
      <div class="filter-group">
        <span class="desk-count" aria-live="polite"></span>
        <button class="view-toggle" type="button">요약 보기</button>
      </div>`;

    const anchor = document.querySelector('.disclosures, .section-title, ol.readlist, .grid');
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
      count.textContent = `${visible}/${items.length}건 표시`;
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

    applyFilters();
  }

  function buildGraphBoard() {
    if (page !== 'pitch') return;
    const board = document.querySelector('#briefing-graph');
    if (!board) return;

    const cards = Array.from(document.querySelectorAll('.card'));
    const sourceLinks = Array.from(document.querySelectorAll('.card .sources a'));
    const govCards = cards.filter(card => card.dataset.kind === 'gov');
    const companyCards = cards.filter(card => card.dataset.kind === 'company');
    const verificationCards = cards.filter(card => /남은 검증|남은 검증사항/.test(card.textContent || ''));
    const domains = new Set(sourceLinks.map(link => {
      try { return new URL(link.href).hostname.replace(/^www\./, ''); }
      catch { return ''; }
    }).filter(Boolean));

    function setValue(name, value) {
      const node = board.querySelector(`[data-graph-value="${name}"]`);
      if (node) node.textContent = String(value);
    }

    setValue('cards', cards.length);
    setValue('gov', govCards.length);
    setValue('company', companyCards.length);
    setValue('sources', sourceLinks.length);
    setValue('domains', domains.size);
    setValue('verify', verificationCards.length);
    setValue('verdict', cards.length && sourceLinks.length ? '검증 통과' : '확인 필요');

    const nodes = Array.from(board.querySelectorAll('[data-graph-filter]'));
    function matches(card, filter) {
      if (filter === 'all') return true;
      if (filter === 'verify') return verificationCards.includes(card);
      return card.dataset.kind === filter;
    }

    nodes.forEach(node => node.addEventListener('click', () => {
      const filter = node.dataset.graphFilter || 'all';
      nodes.forEach(other => other.classList.toggle('active', other === node));
      cards.forEach(card => card.classList.toggle('graph-focus', filter !== 'all' && matches(card, filter)));
      if (filter !== 'all') {
        const first = cards.find(card => matches(card, filter));
        first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }));
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
      if (count) count.textContent = `${visible}/${cards.length}개 표시`;
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
  buildGraphBoard();
  sourceStrip();
})();
