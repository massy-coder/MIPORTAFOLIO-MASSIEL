/* Video (autoplay muted + loop, sound button) and internship "read more" */
(function () {
  function t(k) { return (window.siteI18n && window.siteI18n.t) ? window.siteI18n.t(k) : k; }

  /* ---- about-me video ---- */
  var v = document.getElementById('meet-video');
  var btn = document.getElementById('meet-sound');
  var frame = v ? v.closest('.meet-video-frame') : null;
  if (v && btn && frame) {
    v.muted = true; v.loop = true; v.playsInline = true;
    var tryPlay = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
    tryPlay();
    document.addEventListener('visibilitychange', function () { if (!document.hidden && v.paused) tryPlay(); });
    var label = function () {
      var on = !v.muted;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.setAttribute('aria-label', t(on ? 'Turn sound off' : 'Turn sound on'));
      frame.classList.toggle('sound-on', on);
    };
    btn.addEventListener('click', function () {
      v.muted = !v.muted;
      if (!v.muted) { v.volume = 1; }
      if (v.paused) tryPlay();
      label();
    });
    document.addEventListener('langchange', label);
    label();
  }

  /* ---- internship read more ---- */
  var tg = document.getElementById('intern-toggle');
  var more = document.getElementById('intern-more');
  if (tg && more) {
    tg.addEventListener('click', function () {
      var open = more.classList.toggle('open');
      tg.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();
