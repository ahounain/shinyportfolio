(() => {
  const overlay = document.querySelector('[data-opening]');
  if (!overlay) {
    document.querySelector('.replay-intro')?.setAttribute('hidden', '');
    return;
  }
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
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') dismiss();
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches) dismiss();
  });
  try {
    if (!sessionStorage.getItem('hounain-opening-seen') && !location.hash) {
      sessionStorage.setItem('hounain-opening-seen', '1');
      play();
    }
  } catch {
    if (!location.hash) play();
  }
})();
