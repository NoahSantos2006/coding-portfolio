(() => {
  const { host, code } = document.currentScript.dataset;
  if (location.protocol !== 'https:' || location.hostname !== host || navigator.webdriver) return;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(code)) return;

  const referrer = document.referrer ? new URL(document.referrer) : null;
  const query = new URLSearchParams({
    p: location.pathname.replace(/index\.html$/, '') || '/',
    r: referrer?.origin === location.origin ? '' : (referrer?.href ?? ''),
    t: document.title,
    s: window.screen.width,
    rnd: Math.random().toString(36).slice(2, 7)
  });

  const counter = new Image();
  counter.src = `https://${code}.goatcounter.com/count?${query}`;
})();
