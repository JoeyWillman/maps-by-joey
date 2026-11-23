/* =========================================================================
   main.js — rendering + routing. You shouldn't need to edit this file for
   ordinary content changes; edit js/content.js instead.
   ========================================================================= */

(function () {
  "use strict";

  const root = document.getElementById("screen-root");

  /* ---------- Frame shapes (Maps gallery + About headshot) ----------
     Aspect ratios come from the actual hand-drawn frame artwork so the
     mask lines up with the frame outline. */
  const FRAME_RATIOS = {
    oval: 652 / 945,
    hex: 972 / 948,
    square: 992 / 983,
    wide: 1239 / 754,
    tall: 784 / 981,
  };

  function framedPhoto(photo, shape, extraClass) {
    const ratio = FRAME_RATIOS[shape] || 1;
    const maskUrl = `assets/frames/mask_${shape}.png`;
    const artUrl = `assets/frames/clean_${shape}.png`;
    return `
      <div class="framed-photo ${extraClass || ""}" style="aspect-ratio:${ratio};">
        <img class="frame-photo-img" src="${photo}" alt=""
             style="-webkit-mask-image:url('${maskUrl}'); mask-image:url('${maskUrl}');">
        <img class="frame-art-img" src="${artUrl}" alt="" aria-hidden="true">
      </div>`;
  }

  /* ---------- Nav (desktop / mobile menu / icon screen all read NAV_ITEMS) ---------- */
  function buildChrome() {
    document.getElementById("wordmark-btn").textContent = SITE.wordmark;
    document.getElementById("wordmark-btn").addEventListener("click", () => go(""));

    const desktopNav = document.getElementById("desktop-nav");
    desktopNav.innerHTML = NAV_ITEMS.map(
      (item) => `<button data-nav="${item.screen}">${item.label}</button>`
    ).join("");
    desktopNav.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => go(btn.dataset.nav));
    });

    const mobileItems = document.getElementById("mobile-menu-items");
    mobileItems.innerHTML = NAV_ITEMS.map(
      (item) => `<button data-nav="${item.screen}">${item.label}</button>`
    ).join("");
    mobileItems.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        closeMobileMenu();
        go(btn.dataset.nav);
      });
    });

    document.getElementById("mobile-menu-open-btn").addEventListener("click", openMobileMenu);
    document.getElementById("mobile-menu-close-btn").addEventListener("click", closeMobileMenu);

    document.getElementById("lightbox-close-btn").addEventListener("click", closeLightbox);
  }

  function openMobileMenu() { document.getElementById("mobile-menu").classList.add("open"); }
  function closeMobileMenu() { document.getElementById("mobile-menu").classList.remove("open"); }

  /* ---------- Router ----------
     #/            -> hero
     #/iconnav     -> icon screen
     #/maps        -> maps gallery
     #/maps/<id>   -> map detail
     #/timeline    -> timeline
     #/journal     -> journal
     #/about       -> about                                            */
  function go(path) {
    window.location.hash = "#/" + (path || "");
  }

  function parseRoute() {
    const hash = window.location.hash.replace(/^#\/?/, "");
    const parts = hash.split("/").filter(Boolean);
    return { screen: parts[0] || "hero", param: parts[1] || null };
  }

  function render() {
    const { screen, param } = parseRoute();
    window.scrollTo(0, 0);
    switch (screen) {
      case "maps":
        root.innerHTML = param ? renderMapDetail(param) : renderMaps();
        wireMaps(!!param);
        break;
      case "timeline":
        root.innerHTML = renderTimeline();
        break;
      case "journal":
        root.innerHTML = renderJournal();
        wireJournal();
        break;
      case "about":
        root.innerHTML = renderAbout();
        break;
      case "iconnav":
        root.innerHTML = renderIconNav();
        wireIconNav();
        break;
      case "hero":
      default:
        root.innerHTML = renderHero();
        wireHero();
        break;
    }
  }

  window.addEventListener("hashchange", render);

  /* ---------- Hero ---------- */
  function renderHero() {
    return `
      <div class="screen screen-hero">
        <img class="banner" src="assets/photos/banner.png" alt="${SITE.wordmark}">
        <p class="tagline">${SITE.heroTagline}</p>
        <button class="down-btn" id="hero-down-btn" aria-label="Explore the site">
          <img src="assets/icons/arrow-up.png" alt="" aria-hidden="true">
        </button>
      </div>`;
  }
  function wireHero() {
    document.getElementById("hero-down-btn").addEventListener("click", () => go("iconnav"));
  }

  /* ---------- Icon nav ---------- */
  function renderIconNav() {
    const buttons = NAV_ITEMS.map(
      (item) => `
      <button data-nav="${item.screen}">
        <img src="${item.icon}" alt="" aria-hidden="true">
        <span class="hand">${item.label}</span>
      </button>`
    ).join("");
    return `
      <div class="screen screen-iconnav">
        <div class="icon-grid">${buttons}</div>
      </div>`;
  }
  function wireIconNav() {
    document.querySelectorAll(".icon-grid button").forEach((btn) => {
      btn.addEventListener("click", () => go(btn.dataset.nav));
    });
  }

  /* ---------- Maps gallery ---------- */
  function backButton() {
    return `
      <button class="back-btn" data-nav="iconnav">
        <img src="assets/icons/back-arrow.png" alt="" aria-hidden="true">
        Back
      </button>`;
  }

  function renderMaps() {
    const cards = MAPS.map(
      (m) => `
      <button class="map-card" data-map="${m.id}">
        ${framedPhoto(m.photo, m.frameShape)}
        <div class="map-card-label">
          <span class="cat">${m.cat}</span>
          <span class="title">${m.title}</span>
        </div>
      </button>`
    ).join("");
    return `
      <div class="screen screen-inner">
        <div class="screen-wrap">
          ${backButton()}
          <div class="maps-head">
            <h2 class="screen-heading">Cartography Projects</h2>
          </div>
          <div class="maps-gallery">${cards}</div>
        </div>
      </div>`;
  }

  function renderMapDetail(id) {
    const m = MAPS.find((x) => x.id === id);
    if (!m) {
      return `
        <div class="screen screen-inner">
          <div class="screen-wrap">
            ${backButton()}
            <p>Map not found.</p>
          </div>
        </div>`;
    }
    const linkBtn = m.link
      ? `<a class="map-link-btn hand" href="${m.link}" target="_blank" rel="noopener">View Live Map</a>`
      : "";
    // `embed` is forgiving about what you paste: a bare URL gets wrapped in
    // an iframe automatically; a full <iframe ...></iframe> snippet (what
    // Google My Maps / ArcGIS "embed code" dialogs actually hand you) is
    // used as-is so you don't have to go dig the URL out of it.
    const embed = m.embed
      ? `<div class="map-embed-wrap">${
          /<iframe[\s>]/i.test(m.embed)
            ? m.embed
            : `<iframe src="${m.embed}" loading="lazy" title="${m.title}"></iframe>`
        }</div>`
      : "";
    return `
      <div class="screen screen-inner">
        <div class="screen-wrap">
          <button class="back-btn" data-nav="maps">
            <img src="assets/icons/back-arrow.png" alt="" aria-hidden="true">
            Back
          </button>
          <div class="map-detail-cat">${m.cat}</div>
          <h2 class="screen-heading">${m.title}</h2>
          <img class="map-detail-photo" src="${m.photo}" alt="${m.title}">
          <p class="map-detail-desc">${m.description || ""}</p>
          ${embed}
          <div class="map-detail-actions">${linkBtn}</div>
        </div>
      </div>`;
  }

  function wireMaps(isDetail) {
    if (!isDetail) {
      document.querySelectorAll(".map-card").forEach((btn) => {
        btn.addEventListener("click", () => go("maps/" + btn.dataset.map));
      });
    }
    document.querySelectorAll(".back-btn").forEach((btn) => {
      btn.addEventListener("click", () => go(btn.dataset.nav));
    });
  }

  /* ---------- Timeline ---------- */
  function timelineGroup(items) {
    const rows = items
      .map(
        (it) => `
      <div class="timeline-item">
        <div class="timeline-icon"><img src="${it.icon}" alt=""></div>
        <div class="timeline-body">
          <div class="timeline-meta">${it.dates}${it.location ? " · " + it.location : ""}</div>
          <div class="timeline-org hand">${it.org}</div>
          <div class="timeline-role">${it.role}</div>
          <div class="timeline-blurb">${it.blurb}</div>
        </div>
      </div>`
      )
      .join("");
    return `
      <div class="timeline-group">
        <div class="timeline-trail"></div>
        ${rows}
      </div>`;
  }

  function renderTimeline() {
    return `
      <div class="screen screen-inner">
        <div class="screen-wrap narrow">
          ${backButton()}
          <h2 class="screen-heading" style="margin-bottom:48px;">Where I've Worked</h2>
          ${timelineGroup(JOBS)}
          <h3 class="timeline-subheading hand">Volunteering</h3>
          ${timelineGroup(VOLUNTEER)}
        </div>
      </div>`;
  }

  /* ---------- Journal ---------- */
  // Each preset places two tape pieces using the card's own box (0%-100%),
  // centered exactly on the edge/corner so roughly half sits on the photo
  // and half hangs off — see css .journal-tape.
    const TAPE_PRESETS = [
    // top + bottom, straight
    [
      { top: "0%", left: "30%", rot: -2 },
      { top: "100%", left: "68%", rot: 3 },
    ],
    // both top corners, "normal taping" diagonal
    [
      { top: "0%", left: "0%", rot: -45 },
      { top: "0%", left: "100%", rot: 45 },
    ],
    // vertical, both sides
    [
      { top: "50%", left: "0%", rot: 90 },
      { top: "50%", left: "100%", rot: 90 },
    ],
    // diagonal opposite corners: top-left & bottom-right
    [
      { top: "0%", left: "0%", rot: -45 },
      { top: "100%", left: "100%", rot: -45 },
    ],
    // diagonal opposite corners: top-right & bottom-left
    [
      { top: "0%", left: "100%", rot: 45 },
      { top: "100%", left: "0%", rot: 45 },
    ],
  ];
  const CARD_ROTATIONS = [-3, 2, -2, 4, -5, 3, -4, 2.5, -2.5, 3.5];

  function tapePieceHtml(p) {
    return `<img class="journal-tape" src="assets/journal/tape.png" alt="" aria-hidden="true"
                 style="top:${p.top}; left:${p.left}; transform: translate(-50%,-50%) rotate(${p.rot}deg);">`;
  }

  function renderJournal() {
    const cards = JOURNAL.map((j, i) => {
      const rot = CARD_ROTATIONS[i % CARD_ROTATIONS.length];
      const preset = TAPE_PRESETS[i % TAPE_PRESETS.length];
      const tape = preset.map(tapePieceHtml).join("");
      return `
        <div class="journal-card" data-index="${i}" style="transform: rotate(${rot}deg);">
          <div class="journal-photo-wrap">
            <img class="journal-photo" src="${j.img}" alt="">
            ${tape}
          </div>
          <div class="journal-caption">${j.caption}</div>
        </div>`;
    }).join("");
    return `
      <div class="screen screen-inner">
        <div class="screen-wrap">
          ${backButton()}
          <h2 class="screen-heading">From the Field</h2>
          <p class="screen-sub">Film photos, trail notes, and adventures.</p>
          <div class="journal-gallery">${cards}</div>
        </div>
      </div>`;
  }

  function wireJournal() {
    document.querySelectorAll(".journal-card").forEach((card) => {
      card.addEventListener("click", () => {
        const i = Number(card.dataset.index);
        openLightbox(JOURNAL[i]);
      });
    });
    document.querySelectorAll(".back-btn").forEach((btn) => {
      btn.addEventListener("click", () => go(btn.dataset.nav));
    });
  }

  function openLightbox(item) {
    document.getElementById("lightbox-img").src = item.img;
    document.getElementById("lightbox-caption").textContent = item.caption;
    document.getElementById("lightbox").classList.remove("hidden");
  }
  function closeLightbox() {
    document.getElementById("lightbox").classList.add("hidden");
  }

  /* ---------- About ---------- */
  function renderAbout() {
    const doodlePositions = [
      { top: "-10px", left: "94%", rot: 16, size: 46 },
      { top: "32px", left: "90%", rot: -12, size: 40 },
      { top: "74px", left: "96%", rot: -14, size: 40 },
      { top: "116px", left: "91%", rot: 10, size: 46 },
      { top: "158px", left: "95%", rot: 8, size: 44 },
      { top: "200px", left: "92%", rot: 14, size: 46 },
      { top: "242px", left: "97%", rot: -10, size: 46 },
      { top: "284px", left: "90%", rot: -9, size: 44 },
    ];
    const doodles = (ABOUT.doodles || [])
      .map((src, i) => {
        const p = doodlePositions[i % doodlePositions.length];
        return `<img class="about-doodle" src="${src}" alt="" aria-hidden="true"
                  style="top:${p.top}; left:${p.left}; width:${p.size}px; height:auto; transform:rotate(${p.rot}deg); opacity:0.5;">`;
      })
      .join("");
    const links = ABOUT.links
      .map(
        (l) => `<a href="${l.href}" aria-label="${l.label}"><img src="${l.icon}" alt=""></a>`
      )
      .join("");
    return `
      <div class="screen screen-about">
        <div class="screen-wrap main screen-inner" style="padding-bottom:0;">
          ${backButton()}
          <div class="about-top">
            ${doodles}
            <div class="about-photo-col">
              ${framedPhoto(ABOUT.photo, ABOUT.photoFrameShape)}
            </div>
            <div class="about-text-col">
              <h2 class="screen-heading">${ABOUT.heading}</h2>
              <p class="about-bio">${ABOUT.bio}</p>
              <p class="about-contact-note">${ABOUT.contactNote}</p>
              <div class="about-links">${links}</div>
            </div>
          </div>
        </div>
        <div class="about-footer">
          <span class="foot-mark hand">${SITE.wordmark}</span>
          <span class="foot-copy">${SITE.footerCopyright}</span>
        </div>
      </div>`;
  }

  /* ---------- Boot ---------- */
  buildChrome();
  render();
})();
