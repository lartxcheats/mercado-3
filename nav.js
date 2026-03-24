(() => {
  // ── Skeleton shimmer CSS ──────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    .nav-skeleton {
      position: fixed; inset: 0; z-index: 99999;
      background: #fff; display: flex; flex-direction: column;
      gap: 16px; padding: 24px 20px;
      animation: nav-fadein 80ms ease;
    }
    .nav-skeleton .sk { border-radius: 10px; background: #e8e8e8;
      background: linear-gradient(90deg,#ececec 25%,#f5f5f5 50%,#ececec 75%);
      background-size: 200% 100%;
      animation: shimmer 1.2s infinite; }
    .nav-skeleton .sk-h  { height: 48px; width: 60%; }
    .nav-skeleton .sk-p  { height: 18px; width: 90%; }
    .nav-skeleton .sk-p2 { height: 18px; width: 70%; }
    .nav-skeleton .sk-card { height: 120px; width: 100%; border-radius: 16px; }
    @keyframes shimmer { to { background-position: -200% 0; } }
    @keyframes nav-fadein { from { opacity:0 } to { opacity:1 } }

    /* Page slide */
    .nav-page { position: fixed; inset: 0; will-change: transform, opacity; }
    .nav-slide-in  { animation: slideIn  300ms ease-in-out forwards; }
    .nav-slide-out { animation: slideOut 300ms ease-in-out forwards; }
    .nav-slide-back-in  { animation: slideBackIn  300ms ease-in-out forwards; }
    .nav-slide-back-out { animation: slideBackOut 300ms ease-in-out forwards; }
    @keyframes slideIn      { from { transform: translateX(100%) } to { transform: translateX(0) } }
    @keyframes slideOut     { from { transform: translateX(0) }    to { transform: translateX(-30%) } }
    @keyframes slideBackIn  { from { transform: translateX(-30%) } to { transform: translateX(0) } }
    @keyframes slideBackOut { from { transform: translateX(0) }    to { transform: translateX(100%) } }

    /* Button press */
    .nav-press { transform: scale(0.96) !important; transition: transform 100ms ease !important; }
  `;
  document.head.appendChild(style);

  // ── Button press feedback ─────────────────────────────────────────────
  document.addEventListener('pointerdown', e => {
    const btn = e.target.closest('button, a, [role="button"], .search-input-wrap');
    if (!btn) return;
    btn.classList.add('nav-press');
    const up = () => { btn.classList.remove('nav-press'); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointerup', up);
  }, { passive: true });

  // ── Skeleton builder ─────────────────────────────────────────────────
  function showSkeleton() {
    const sk = document.createElement('div');
    sk.className = 'nav-skeleton';
    sk.innerHTML = `
      <div class="sk sk-h"></div>
      <div class="sk sk-card"></div>
      <div class="sk sk-p"></div>
      <div class="sk sk-p2"></div>
      <div class="sk sk-p"></div>`;
    document.body.appendChild(sk);
    return sk;
  }

  // ── Navigate forward ─────────────────────────────────────────────────
  function navigateTo(url) {
    const prevUrl = location.href;
    const sk = showSkeleton();
    const start = Date.now();

    // Wrap current page
    const current = document.createElement('div');
    current.className = 'nav-page nav-slide-out';
    while (document.body.firstChild) current.appendChild(document.body.firstChild);
    document.body.appendChild(current);

    const minWait = 400;
    fetch(url)
      .then(r => r.text())
      .then(html => {
        const elapsed = Date.now() - start;
        const delay = Math.max(0, minWait - elapsed);
        setTimeout(() => {
          // Parse new page
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');

          // Swap styles
          doc.querySelectorAll('link[rel="stylesheet"], style').forEach(el => {
            if (!document.head.querySelector(`[href="${el.href}"]`)) {
              document.head.appendChild(el.cloneNode(true));
            }
          });

          // Build incoming page wrapper
          const incoming = document.createElement('div');
          incoming.className = 'nav-page nav-slide-in';
          doc.body.childNodes.forEach(n => incoming.appendChild(document.importNode(n, true)));

          // Remove skeleton, add pages
          sk.remove();
          current.classList.add('nav-slide-out');
          document.body.appendChild(incoming);

          // After animation, replace DOM fully
          incoming.addEventListener('animationend', () => {
            document.body.innerHTML = '';
            incoming.childNodes.forEach(n => document.body.appendChild(n));
            // Run new page scripts
            doc.querySelectorAll('script').forEach(s => {
              const ns = document.createElement('script');
              if (s.src) ns.src = s.src; else ns.textContent = s.textContent;
              document.body.appendChild(ns);
            });
            history.pushState({ url, prev: prevUrl }, '', url);
            initNav();
          }, { once: true });
        }, delay);
      })
      .catch(() => { sk.remove(); window.location.href = url; });
  }

  // ── Navigate back ────────────────────────────────────────────────────
  function navigateBack(url) {
    const sk = showSkeleton();
    const start = Date.now();

    const current = document.createElement('div');
    current.className = 'nav-page';
    while (document.body.firstChild) current.appendChild(document.body.firstChild);
    document.body.appendChild(current);

    fetch(url)
      .then(r => r.text())
      .then(html => {
        const elapsed = Date.now() - start;
        setTimeout(() => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');

          doc.querySelectorAll('link[rel="stylesheet"], style').forEach(el => {
            if (!document.head.querySelector(`[href="${el.href}"]`)) {
              document.head.appendChild(el.cloneNode(true));
            }
          });

          const incoming = document.createElement('div');
          incoming.className = 'nav-page nav-slide-back-in';
          doc.body.childNodes.forEach(n => incoming.appendChild(document.importNode(n, true)));

          sk.remove();
          current.classList.add('nav-slide-back-out');
          document.body.insertBefore(incoming, current);

          incoming.addEventListener('animationend', () => {
            document.body.innerHTML = '';
            incoming.childNodes.forEach(n => document.body.appendChild(n));
            doc.querySelectorAll('script').forEach(s => {
              const ns = document.createElement('script');
              if (s.src) ns.src = s.src; else ns.textContent = s.textContent;
              document.body.appendChild(ns);
            });
            history.replaceState({ url }, '', url);
            initNav();
          }, { once: true });
        }, Math.max(0, 400 - (Date.now() - start)));
      })
      .catch(() => { sk.remove(); window.location.href = url; });
  }

  // ── Intercept links ──────────────────────────────────────────────────
  function initNav() {
    document.addEventListener('click', e => {
      // Links normais
      const a = e.target.closest('a[href]');
      if (a) {
        const href = a.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        navigateTo(href);
        return;
      }

      // Botões com onclick="history.back()"
      const btn = e.target.closest('button, [role="button"]');
      if (btn) {
        const oc = btn.getAttribute('onclick') || '';
        if (oc.includes('history.back')) {
          e.preventDefault();
          e.stopImmediatePropagation();
          btn.removeAttribute('onclick');
          const prev = history.state?.prev || document.referrer;
          if (prev) navigateBack(prev);
          else window.history.back();
        }
      }
    }, { capture: true });
  }

  // ── Browser back/forward ─────────────────────────────────────────────
  window.addEventListener('popstate', e => {
    if (e.state?.url) navigateBack(e.state.url);
  });

  // Init
  history.replaceState({ url: location.href }, '', location.href);
  initNav();
})();
