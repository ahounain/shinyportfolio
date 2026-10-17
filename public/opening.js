(() => {
  const overlay = document.querySelector('[data-opening]');
  if (!overlay) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer, previousFocus;
  const dismiss = () => {
    clearTimeout(timer);
    const focusedInside = overlay.contains(document.activeElement);
    overlay.hidden = true;
    if (focusedInside && previousFocus) previousFocus.focus();
  };
  const play = () => {
    if (reduced.matches) return;
    clearTimeout(timer);
    previousFocus = document.activeElement;
    overlay.classList.add('restarting');
    overlay.hidden = false;
    void overlay.offsetWidth;
    overlay.classList.remove('restarting');
    timer = setTimeout(dismiss, 2350);
  };
  overlay.querySelector('button').addEventListener('click', dismiss);
  document.querySelector('.replay-intro')?.addEventListener('click', play);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') dismiss(); });
  reduced.addEventListener('change', () => { if (reduced.matches) dismiss(); });
  try {
    if (!sessionStorage.getItem('hounain-opening-seen') && !location.hash) {
      sessionStorage.setItem('hounain-opening-seen', '1');
      play();
    }
  } catch { if (!location.hash) play(); }
})();

(() => { const tabs = [...document.querySelectorAll('.systems-tabs [role="tab"]')]; if (!tabs.length) return; function select(tab) { for (const t of tabs) { const active=t===tab; t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;const panel=document.getElementById(t.getAttribute('aria-controls'));if(panel) panel.hidden=!active; } } for(const tab of tabs){tab.addEventListener('click',()=>select(tab));tab.addEventListener('keydown',e=>{let i=tabs.indexOf(tab);if(e.key==='ArrowRight')i=(i+1)%tabs.length;else if(e.key==='ArrowLeft')i=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')i=0;else if(e.key==='End')i=tabs.length-1;else return;e.preventDefault();select(tabs[i]);tabs[i].focus();});}})();
