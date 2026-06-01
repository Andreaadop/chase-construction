/* ─────────────────────────────────────────────────────────────────────────
   Chase Construction — Free Home Inspection popup
   ─────────────────────────────────────────────────────────────────────────
   Drop-in module. Inject one script tag on a page and the popup is wired up.

   Behavior:
     - Desktop: triggered by exit intent (mouse leaves toward browser chrome)
     - Mobile (≤768px): triggered when the visitor passes 60% of page scroll
     - Once dismissed, suppressed for 14 days via localStorage
     - Skipped on /contact.html so we don't interrupt an active conversion

   The popup offers two paths — new build or existing-home maintenance —
   each linking to /contact.html with an ?inspection= query string so the
   form (or downstream tooling) can branch on which path was chosen.
   ───────────────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  // Skip the popup on the contact page (already converting)
  if (/\/contact\.html$/i.test(window.location.pathname)) return;

  var STORAGE_KEY        = 'chase_inspection_popup_dismissed_at';
  var SUPPRESS_DAYS      = 14;
  var SCROLL_TRIGGER_PCT = 0.6;
  var MOBILE_BREAKPOINT  = '(max-width: 768px)';

  /* ── CSS ────────────────────────────────────────────────────────────── */
  var css = '' +
    '.ip-backdrop {' +
    '  position:fixed; inset:0; z-index:1000;' +
    '  background:rgba(28,48,40,.62);' +
    '  backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);' +
    '  display:flex; align-items:center; justify-content:center;' +
    '  opacity:0; pointer-events:none;' +
    '  transition:opacity .45s cubic-bezier(0.16,1,0.3,1);' +
    '  padding:20px;' +
    '}' +
    '.ip-backdrop.ip-open { opacity:1; pointer-events:auto; }' +
    '.ip-modal {' +
    '  position:relative; max-width:680px; width:100%;' +
    '  background:#faf8f5; padding:56px 56px 48px;' +
    '  color:#1a1614; font-family:Montserrat, sans-serif; font-weight:300;' +
    '  box-shadow:0 40px 100px -20px rgba(0,0,0,.55);' +
    '  transform:translateY(20px) scale(.98);' +
    '  transition:transform .55s cubic-bezier(0.16,1,0.3,1);' +
    '  overflow:hidden;' +
    '}' +
    '.ip-backdrop.ip-open .ip-modal { transform:translateY(0) scale(1); }' +
    '.ip-ring {' +
    '  position:absolute; top:-40px; right:-40px;' +
    '  width:180px; height:180px; opacity:.14;' +
    '  pointer-events:none;' +
    '}' +
    '.ip-close {' +
    '  position:absolute; top:18px; right:20px; z-index:2;' +
    '  width:34px; height:34px; border-radius:50%;' +
    '  background:transparent; border:1px solid rgba(26,22,20,.12);' +
    '  display:flex; align-items:center; justify-content:center;' +
    '  cursor:pointer; transition:all .3s cubic-bezier(0.16,1,0.3,1);' +
    '  font-size:14px; color:#4a3f38; line-height:1; font-family:inherit;' +
    '}' +
    '.ip-close:hover { background:#1a1614; color:#fff; border-color:#1a1614; }' +
    '.ip-eyebrow {' +
    '  font-size:10px; letter-spacing:.32em; text-transform:uppercase;' +
    '  color:#2c573d; font-weight:500; margin-bottom:18px; display:block;' +
    '}' +
    '.ip-h2 {' +
    '  font-family:"Hoefler Text", Georgia, serif; font-weight:normal;' +
    '  font-size:clamp(28px, 3.4vw, 38px); line-height:1.1; font-style:italic;' +
    '  color:#1a1614; margin-bottom:14px;' +
    '}' +
    '.ip-sub {' +
    '  font-size:14px; line-height:1.7; color:#4a3f38; margin-bottom:32px;' +
    '  max-width:520px;' +
    '}' +
    '.ip-rule { width:38px; height:1px; background:#c3b49d; margin-bottom:28px; }' +
    '.ip-options {' +
    '  display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:28px;' +
    '}' +
    '.ip-card {' +
    '  padding:24px 22px; background:#fff; border:1px solid rgba(26,22,20,.12);' +
    '  display:flex; flex-direction:column; gap:10px;' +
    '  transition:all .35s cubic-bezier(0.16,1,0.3,1);' +
    '  cursor:pointer; text-decoration:none; color:inherit;' +
    '}' +
    '.ip-card:hover {' +
    '  border-color:#2c573d; background:#f0ece4;' +
    '  transform:translateY(-2px);' +
    '}' +
    '.ip-card-tag {' +
    '  font-size:9px; letter-spacing:.28em; text-transform:uppercase;' +
    '  color:#2c573d; font-weight:500;' +
    '}' +
    '.ip-card-title {' +
    '  font-family:"Hoefler Text", Georgia, serif; font-weight:normal;' +
    '  font-size:19px; line-height:1.2;' +
    '  color:#1a1614; font-style:italic; margin-bottom:4px;' +
    '}' +
    '.ip-card-desc {' +
    '  font-size:12px; line-height:1.6; color:#7a6e66;' +
    '}' +
    '.ip-card-cta {' +
    '  margin-top:auto; padding-top:14px;' +
    '  font-size:10px; letter-spacing:.26em; text-transform:uppercase;' +
    '  color:#1a1614; font-weight:500;' +
    '  display:inline-flex; align-items:center; gap:8px;' +
    '}' +
    '.ip-card:hover .ip-card-cta { color:#2c573d; gap:14px; }' +
    '.ip-card-cta .ip-arr { display:inline-block; transition:transform .3s cubic-bezier(0.16,1,0.3,1); }' +
    '.ip-card:hover .ip-card-cta .ip-arr { transform:translateX(3px); }' +
    '.ip-footnote {' +
    '  font-size:11px; letter-spacing:.04em; color:#7a6e66; text-align:center;' +
    '  border-top:1px solid rgba(26,22,20,.12); margin-top:4px; padding-top:18px;' +
    '}' +
    '.ip-footnote strong { color:#1a1614; font-weight:500; }' +
    '@media (max-width: 640px) {' +
    '  .ip-modal { padding:42px 24px 32px; }' +
    '  .ip-options { grid-template-columns:1fr; }' +
    '  .ip-ring { width:120px; height:120px; top:-30px; right:-30px; }' +
    '}';

  /* ── HTML ──────────────────────────────────────────────────────────── */
  var html = '' +
    '<div class="ip-backdrop" id="ip-backdrop" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="ip-h2">' +
    '  <div class="ip-modal">' +
    '    <img src="/graphic-elements-other-images/wood-ring-2.svg" class="ip-ring" alt="" aria-hidden="true">' +
    '    <button class="ip-close" id="ip-close" aria-label="Close">&#x2715;</button>' +
    '    <span class="ip-eyebrow">A Chase Construction Offer</span>' +
    '    <h2 class="ip-h2" id="ip-h2">Schedule a free home inspection.</h2>' +
    '    <div class="ip-rule"></div>' +
    '    <p class="ip-sub">No pitch, no obligation. We&rsquo;ll come to your lot or your existing log home and walk you through what we see &mdash; buildability, condition, opportunities.</p>' +
    '    <div class="ip-options">' +
    '      <a href="/contact.html?inspection=new-build" class="ip-card" data-path="new-build">' +
    '        <span class="ip-card-tag">For Future Builds</span>' +
    '        <h3 class="ip-card-title">Building a new home</h3>' +
    '        <p class="ip-card-desc">Free on-site or video walk-through of your lot. Buildability, scope, rough timeline.</p>' +
    '        <span class="ip-card-cta">Request Visit <span class="ip-arr">&rarr;</span></span>' +
    '      </a>' +
    '      <a href="/contact.html?inspection=existing-home" class="ip-card" data-path="existing-home">' +
    '        <span class="ip-card-tag">For Current Owners</span>' +
    '        <h3 class="ip-card-title">Maintaining an existing log home</h3>' +
    '        <p class="ip-card-desc">Free structural check and chinking review by our team. Catch issues early.</p>' +
    '        <span class="ip-card-cta">Schedule Check <span class="ip-arr">&rarr;</span></span>' +
    '      </a>' +
    '    </div>' +
    '    <p class="ip-footnote"><strong>No spam, no obligation.</strong> &nbsp;&middot;&nbsp; 208-897-8100 &nbsp;&middot;&nbsp; Sun Valley, ID</p>' +
    '  </div>' +
    '</div>';

  /* ── Inject style + DOM ───────────────────────────────────────────── */
  function inject() {
    var styleEl = document.createElement('style');
    styleEl.setAttribute('data-inspection-popup', '');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper.firstElementChild);
  }

  /* ── Suppression via localStorage ─────────────────────────────────── */
  function isSuppressed() {
    try {
      var ts = window.localStorage.getItem(STORAGE_KEY);
      if (!ts) return false;
      var age = Date.now() - parseInt(ts, 10);
      return age < SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
    } catch (e) { return false; }
  }

  function suppress() {
    try { window.localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch (e) {}
  }

  /* ── Main ─────────────────────────────────────────────────────────── */
  function init() {
    if (isSuppressed()) return;

    inject();

    var backdrop = document.getElementById('ip-backdrop');
    var closeBtn = document.getElementById('ip-close');
    var mobileMQ = window.matchMedia(MOBILE_BREAKPOINT);
    var shown = false;

    function show() {
      if (shown) return;
      shown = true;
      backdrop.classList.add('ip-open');
      backdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function hide() {
      backdrop.classList.remove('ip-open');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      suppress();
    }

    // Dismissal
    closeBtn.addEventListener('click', hide);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && backdrop.classList.contains('ip-open')) hide();
    });
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) hide();
    });

    // Desktop trigger: exit intent
    document.addEventListener('mouseleave', function (e) {
      if (mobileMQ.matches) return;
      if (e.clientY <= 5) show();
    });

    // Mobile trigger: 60% scroll
    window.addEventListener('scroll', function () {
      if (!mobileMQ.matches) return;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      if (window.scrollY / docHeight >= SCROLL_TRIGGER_PCT) show();
    }, { passive: true });

    // Allow downstream analytics hooks if dataLayer (GTM) is present
    document.querySelectorAll('.ip-card').forEach(function (card) {
      card.addEventListener('click', function () {
        try {
          if (window.dataLayer && typeof window.dataLayer.push === 'function') {
            window.dataLayer.push({
              event: 'inspection_popup_click',
              path: card.getAttribute('data-path')
            });
          }
        } catch (e) {}
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
