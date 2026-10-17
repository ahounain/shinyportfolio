(() => {
  const overlay = document.querySelector('[data-opening]');
  const replay = document.querySelector('.replay-intro');
  const target = document.querySelector('[data-opening-target]');
  if (!overlay || !target) {
    replay?.setAttribute('hidden', '');
    return;
  }
  const root = document.documentElement;
  const mark = overlay.querySelector('svg');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let generation = 0;
  let animations = [];
  let previousFocus;
  let replayCount = 0;
  let raining = false;
  const dismiss = () => {
    generation += 1;
    const focusedInside = overlay.contains(document.activeElement);
    animations.forEach((animation) => animation.cancel());
    animations = [];
    overlay.hidden = true;
    overlay.classList.remove('is-docking');
    root.classList.remove('intro-running', 'intro-docking');
    if (focusedInside && previousFocus) previousFocus.focus();
  };
  // Match the letter's ink bounds, rather than the surrounding line box.
  const targetBounds = () => {
    const box = target.getBoundingClientRect();
    const style = getComputedStyle(target);
    const size = parseFloat(style.fontSize);
    const context = document.createElement('canvas').getContext('2d');
    context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const metrics = context.measureText('A');
    const ascent = metrics.fontBoundingBoxAscent ?? size * 0.772;
    const descent = metrics.fontBoundingBoxDescent ?? size * 0.215;
    const baseline = box.top + (box.height - ascent - descent) / 2 + ascent;
    return {
      left: box.left - metrics.actualBoundingBoxLeft,
      top: baseline - metrics.actualBoundingBoxAscent,
      width: metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight,
      height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
    };
  };
  const animate = (keyframes, options) => {
    const animation = mark.animate(keyframes, options);
    animations.push(animation);
    return animation.finished;
  };
  const play = async () => {
    dismiss();
    if (reduced.matches) return;
    const current = generation;
    previousFocus = document.activeElement;
    window.scrollTo({ top: 0, behavior: 'instant' });
    root.classList.add('intro-running');
    overlay.hidden = false;
    try {
      await Promise.race([
        document.fonts.load('100px VelvetOmen'),
        new Promise((resolve) => setTimeout(resolve, 1200)),
      ]);
      if (generation !== current) return;
      await animate(
        [
          { opacity: 0, transform: 'translateY(24px) scale(0.96)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 550, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
      );
      if (generation !== current) return;
      await animate([{ opacity: 1 }, { opacity: 1 }], { duration: 450 });
      if (generation !== current) return;
      const from = mark.getBoundingClientRect();
      const to = targetBounds();
      root.classList.add('intro-docking');
      overlay.classList.add('is-docking');
      await animate(
        [
          { transform: 'none' },
          {
            transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width}, ${to.height / from.height})`,
          },
        ],
        { duration: 1050, easing: 'cubic-bezier(0.65, 0, 0.2, 1)', fill: 'forwards' },
      );
      if (generation === current) dismiss();
    } catch {
      if (generation === current) dismiss();
    }
  };
  overlay.querySelector('button').addEventListener('click', dismiss);
  const startRain = () => {
    if (raining) return;
    raining = true;
    dismiss();
    const rain = document.createElement('div');
    rain.className = 'letter-rain';
    rain.setAttribute('aria-hidden', 'true');
    // Reuse a fixed set of letters forever without accumulating DOM nodes.
    for (let index = 0; index < 36; index += 1) {
      const letter = mark.cloneNode(true);
      letter.style.setProperty('--rain-x', `${Math.random() * 100}%`);
      letter.style.setProperty('--rain-size', `${24 + Math.random() * 64}px`);
      letter.style.setProperty('--rain-duration', `${5 + Math.random() * 6}s`);
      letter.style.setProperty('--rain-delay', `${-Math.random() * 11}s`);
      letter.style.setProperty('--rain-turn', `${Math.random() * 100 - 50}deg`);
      letter.style.setProperty('--rain-drift', `${Math.random() * 120 - 60}px`);
      letter.style.removeProperty('transform');
      letter.style.removeProperty('opacity');
      rain.append(letter);
    }
    document.body.append(rain);
  };
  replay?.addEventListener('click', () => {
    replayCount += 1;
    if (replayCount >= 5) startRain();
    else play();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') dismiss();
  });
  window.addEventListener('resize', () => {
    if (!overlay.hidden) dismiss();
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
