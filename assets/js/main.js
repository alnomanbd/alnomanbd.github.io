/* ============================================================
   alnoman.infosec : renderer + effects ("Intel Map" theme)
   Content lives in data/site.js. You normally never edit this file.
   ============================================================ */
(function () {
  "use strict";
  const S = window.SITE || {};
  const P = S.profile || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const COLORS = { amber: "var(--amber)", teal: "var(--teal)", coral: "var(--coral)", lilac: "var(--lilac)", sky: "var(--sky)" };
  const ROTATE = ["amber", "teal", "coral", "lilac", "sky"];
  const col = (name, i) => COLORS[name] || COLORS[ROTATE[(i || 0) % ROTATE.length]];

  /* ---------- icons ---------- */
  const sv = (p, fill) => `<svg viewBox="0 0 24 24" ${fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'}>${p}</svg>`;
  const I = {
    github: sv('<path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/>', 1),
    linkedin: sv('<path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z"/>', 1),
    scholar: sv('<path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm0-24L0 9.5l4.8 3.9C6.1 10.6 8.8 8.7 12 8.7s5.9 1.9 7.2 4.7L24 9.5 12 0Z"/>', 1),
    twitter: sv('<path d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.3h7l4.8 6.4 5.5-6.4Zm-1.2 17.9h1.9L7.1 4.2H5.1l11.9 16Z"/>', 1),
    medium: sv('<path d="M13.5 12a6.8 6.8 0 1 1-13.5 0 6.8 6.8 0 0 1 13.5 0Zm7.4 0c0 3.5-1.5 6.4-3.4 6.4s-3.4-2.9-3.4-6.4 1.5-6.4 3.4-6.4 3.4 2.9 3.4 6.4ZM24 12c0 3.2-.5 5.7-1.2 5.7s-1.2-2.6-1.2-5.7.5-5.7 1.2-5.7S24 8.8 24 12Z"/>', 1),
    mail: sv('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>'),
    tryhackme: sv('<path d="M4 17l6-6-6-6M12 19h8"/>'),
    hackthebox: sv('<path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"/><path d="M12 22V12M3 7l9 5 9-5"/>'),
    external: sv('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>'),
    shield: sv('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>'),
    skull: sv('<path d="M12 2a8 8 0 0 0-8 8c0 3 1.6 5 3 6v3h10v-3c1.4-1 3-3 3-6a8 8 0 0 0-8-8Z"/><circle cx="9" cy="11" r="1.5"/><circle cx="15" cy="11" r="1.5"/><path d="M10 19v3M14 19v3"/>'),
    code: sv('<path d="m16 18 6-6-6-6M8 6l-6 6 6 6M14 4l-4 16"/>'),
    bolt: sv('<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>'),
    cloud: sv('<path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.8A6 6 0 0 0 4.3 12 3.5 3.5 0 0 0 6.5 19h11Z"/>'),
    eye: sv('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>'),
    cpu: sv('<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>'),
    net: sv('<rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v5M5 17v-3h14v3"/>'),
    book: sv('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>'),
    layers: sv('<path d="m12 2 10 5-10 5L2 7l10-5Z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>'),
    radar: sv('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 12 19 5"/><circle cx="12" cy="12" r="1"/>'),
    pipe: sv('<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10M6 8l5 8M18 8l-5 8"/>'),
    box: sv('<path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="m3 8 9 5 9-5M12 13v8"/>'),
    bug: sv('<rect x="8" y="6" width="8" height="14" rx="4"/><path d="M19 7l-3 2M5 7l3 2M19 13h-3M5 13h3M19 19l-3-2M5 19l3-2M10 3l1 3M14 3l-1 3"/>'),
    users: sv('<circle cx="9" cy="8" r="4"/><path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1"/><path d="M16 4a4 4 0 0 1 0 8M22 21v-1a6 6 0 0 0-4-5.6"/>'),
    doc: sv('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>'),
    globe: sv('<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z"/>'),
    terminal: sv('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 9 4 3-4 3M12 15h6"/>'),
    lock: sv('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>')
  };
  const linkLabels = { github: "GitHub", linkedin: "LinkedIn", scholar: "Google Scholar", twitter: "X / Twitter", medium: "Medium", tryhackme: "TryHackMe", hackthebox: "Hack The Box" };

  function socialLinks() {
    const L = P.links || {};
    const out = Object.keys(L).filter((k) => L[k]).map((k) =>
      `<a class="icon-link" href="${esc(L[k])}" target="_blank" rel="noopener" aria-label="${esc(linkLabels[k] || k)}" title="${esc(linkLabels[k] || k)}">${I[k] || I.external}</a>`);
    if (P.email) out.push(`<a class="icon-link" href="mailto:${esc(P.email)}" aria-label="Email" title="Email">${I.mail}</a>`);
    return out.join("");
  }
  const tagList = (arr) => (arr || []).map((t) => `<span class="t">${esc(t)}</span>`).join("");

  /* ---------- render ---------- */
  function render() {
    document.title = `${P.name || "Portfolio"} | ${P.title || "Security Engineer"}`;
    renderHero();
    $("#hero-social").innerHTML = socialLinks();
    $("#contact-links").innerHTML = socialLinks();
    if (P.email) $("#mail-btn").href = `mailto:${P.email}`;
    $("#foot-name").textContent = `${P.name || ""}`;
    $("#version").textContent = S.version || "";
    $("#updated").textContent = S.updated || "";

    // hero photo scan + logo photo
    if (P.avatar) { $("#scan-img").src = P.avatar; const bm = $(".brand-mark img"); if (bm) bm.src = P.avatar; }
    renderScan();
    const tk = (S.ticker || []).map(([t, x]) => `<span><b>[${esc(t)}]</b> ${esc(x)}</span>`).join("");
    $("#ticker").innerHTML = tk + tk;

    $("#stats").innerHTML = (S.stats || []).map((s, i) =>
      `<div class="stat reveal" style="--c:${col(s.color, i)}"><b data-count="${Number(s.value) || 0}" data-suffix="${esc(s.suffix)}">0${esc(s.suffix)}</b><span>${esc(s.label)}</span></div>`).join("");

    // about
    const chips = [
      P.location && `<span class="chip" style="--c:${COLORS.teal}"><i></i>${esc(P.location)}</span>`,
      P.title && `<span class="chip" style="--c:${COLORS.amber}"><i></i>${esc(P.title)}</span>`,
      `<span class="chip" style="--c:${COLORS.lilac}"><i></i>Learning forever</span>`
    ].filter(Boolean).join("");
    $("#about-text").innerHTML = (P.about || []).map((p) => `<p>${esc(p)}</p>`).join("") + `<div class="about-meta">${chips}</div>` +
      (P.resume ? `<p style="margin-top:22px"><a class="btn btn-ghost" href="${esc(P.resume)}" target="_blank" rel="noopener">Download resume</a></p>` : "");
    $("#now-list").innerHTML = (S.now || []).map((n) => `<li>${esc(n)}</li>`).join("");

    // skills
    $("#skills-grid").innerHTML = (S.skills || []).map((g, i) => `
      <div class="skill-card reveal" style="--c:${col(g.color, i)}">
        <div class="node">${I[g.icon] || I.shield}</div>
        <h4>${esc(g.group)}</h4>
        <div class="meter"><div class="bar"><i data-w="${Number(g.level) || 0}"></i></div><span>${Number(g.level) || 0}%</span></div>
        <div class="tags">${tagList(g.items)}</div>
      </div>`).join("");
    renderRadar();
    const ars = (S.arsenal || []).map((t) => `<span>${esc(t)}</span>`).join("");
    $("#arsenal").innerHTML = ars + ars;

    // experience
    const exp = S.experience || [];
    $("#timeline").innerHTML = exp.map((e, i) => {
      const cur = /present|now|current/i.test(e.period);
      const c = col(e.color, i);
      return `<div class="tl-item reveal ${cur ? "current" : ""}" id="tl-${i}" style="--c:${c}">
        <div class="tl-dot">${String(exp.length - i).padStart(2, "0")}</div>
        <div class="tl-card">
          <div class="tl-top"><h4>${esc(e.role)}${cur ? '<span class="live">ACTIVE</span>' : ""}</h4><span class="tl-period">${esc(e.period)}</span></div>
          <div class="tl-org"><b>${esc(e.org)}</b>${e.location ? ` &nbsp;|&nbsp; ${esc(e.location)}` : ""}</div>
          <ul>${(e.points || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          <div class="tags">${tagList(e.tags)}</div>
        </div>
      </div>`;
    }).join("");
    renderGantt();
    $("#edu").innerHTML = (S.education || []).map((e) => `
      <div class="edu-item reveal"><span class="tl-period">${esc(e.period)}</span><h5>${esc(e.degree)}</h5>${e.school ? `<div class="school">${esc(e.school)}</div>` : ""}${e.note ? `<p>${esc(e.note)}</p>` : ""}</div>`).join("");

    renderCerts();
    renderProjects();
    renderResearch();

    $("#posts").innerHTML = (S.posts || []).map((p) => `
      <a class="post reveal" href="${esc(p.url)}" target="_blank" rel="noopener">
        <time>${esc(p.date)} &nbsp;|&nbsp; ${esc(p.tag)}</time><h5>${esc(p.title)}</h5><span class="go">Read note</span>
      </a>`).join("");
  }

  function filterBar(el, items, key, cards) {
    const counts = {};
    items.forEach((x) => { const k = x[key]; if (k) counts[k] = (counts[k] || 0) + 1; });
    const cats = ["All"].concat(Object.keys(counts));
    el.innerHTML = cats.map((t, i) => `<button class="${i === 0 ? "on" : ""}" data-f="${esc(t)}">${esc(t)}<b>${i === 0 ? items.length : counts[t]}</b></button>`).join("");
    el.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", el).forEach((x) => x.classList.toggle("on", x === b));
      const f = b.dataset.f;
      $$(cards).forEach((c) => { c.classList.toggle("hide", f !== "All" && c.dataset.f !== f); if (f === "All" || c.dataset.f === f) c.classList.add("in"); });
    });
  }

  function renderCerts() {
    const certs = S.certifications || [];
    const label = { active: "ACTIVE", earned: "EARNED", "in-progress": "IN PROGRESS" };
    const done = certs.filter((c) => c.status !== "in-progress");
    const issuers = new Set(done.map((c) => c.issuer)).size;
    $("#cert-lead").textContent = `${done.length} certifications from ${issuers} issuers, from Cisco and Microsoft roots to offensive security and threat intel today.`;
    $("#certs").innerHTML = certs.map((c) => {
      const st = label[c.status] ? c.status : "earned";
      const inner = `<div class="cert-top"><div class="cert-badge">${esc(c.short)}</div><span class="status">${label[st]}</span></div>
        <h5>${esc(c.name)}</h5><p>${esc(c.issuer)}${c.year ? " &nbsp;|&nbsp; " + esc(c.year) : ""}</p>`;
      const attrs = `class="cert ${st} reveal" data-f="${esc(c.category || "")}"`;
      return c.url ? `<a ${attrs} href="${esc(c.url)}" target="_blank" rel="noopener">${inner}</a>` : `<div ${attrs}>${inner}</div>`;
    }).join("");
    filterBar($("#cert-filters"), certs, "category", "#certs .cert");
    renderChrono(certs);
  }

  function renderProjects() {
    const projects = S.projects || [];
    const stLabel = { live: "LIVE", lab: "LAB", wip: "IN PROGRESS" };
    $("#projects-grid").innerHTML = projects.map((p, i) => {
      const c = col(p.color, i);
      const links = [
        p.url && `<a href="${esc(p.url)}" target="_blank" rel="noopener">${I.external} Live</a>`,
        p.repo && `<a href="${esc(p.repo)}" target="_blank" rel="noopener">${I.github} Code</a>`
      ].filter(Boolean).join("");
      return `<article class="project reveal ${p.featured ? "featured" : ""}" data-f="${esc(p.type)}" style="--c:${c}">
        <div class="project-top"><span class="op">OP-${String(i + 1).padStart(2, "0")}</span>${p.status ? `<span class="pstatus ${esc(p.status)}">${stLabel[p.status] || esc(p.status)}</span>` : ""}</div>
        <div class="node">${I[p.icon] || I.layers}</div>
        <h4>${esc(p.name)}</h4>
        <div class="ptype">${esc(p.type)}</div>
        <p>${esc(p.desc)}</p>
        <div class="tags">${tagList(p.tags)}</div>
        ${links ? `<div class="plinks">${links}</div>` : ""}
      </article>`;
    }).join("");
    filterBar($("#filters"), projects, "type", "#projects-grid .project");
  }

  function renderResearch() {
    const R = S.research || {};
    $("#research-lead").textContent = R.summary || "";
    const g = (val, max, label, c) => {
      const pct = Math.min(1, (Number(val) || 0) / max);
      return `<div class="gauge" style="--c:${c}"><svg viewBox="0 0 100 100"><circle class="track" cx="50" cy="50" r="40"/><circle class="val" cx="50" cy="50" r="40" data-pct="${pct}"/><text x="50" y="59" text-anchor="middle" data-count="${Number(val) || 0}">0</text></svg><span>${esc(label)}</span></div>`;
    };
    $("#metrics").innerHTML = `
      <p class="mono tiny muted">GOOGLE SCHOLAR PROFILE</p>
      <div class="gauges">${g(R.citations, 300, "CITATIONS", COLORS.amber)}${g(R.hIndex, 10, "H-INDEX", COLORS.teal)}${R.i10Index ? g(R.i10Index, 10, "I10-INDEX", COLORS.lilac) : ""}</div>
      <div class="interests">${tagList(R.interests)}</div>
      ${R.scholarUrl ? `<a class="btn btn-ghost" href="${esc(R.scholarUrl)}" target="_blank" rel="noopener">Open Google Scholar</a>` : ""}`;
    const maxC = Math.max(1, ...(R.papers || []).map((p) => Number(p.cites) || 0));
    $("#papers").innerHTML = (R.papers || []).slice().sort((a, b) => (b.cites || 0) - (a.cites || 0)).map((p) => `
      <a class="paper" href="${esc(p.url || "#")}" target="_blank" rel="noopener">
        <div class="cites"><b>${Number(p.cites) || 0}</b><span>CITES</span></div>
        <div><h5>${esc(p.title)}</h5><div class="pbar"><i data-w="${((Number(p.cites) || 0) / maxC) * 100}"></i></div><p>${esc(p.venue)}${p.year ? " &nbsp;|&nbsp; " + esc(p.year) : ""}</p></div>
      </a>`).join("");
  }



  /* ---------- hero: decrypt name, redacted tagline, CLI flags ---------- */
  const GLYPHS = "!<>-_\\/[]{}=+*^?#$%&@0123456789ABCDEFabcdef";
  function decrypt(el, text, dur, delay) {
    if (reduced) { el.textContent = text; return; }
    const start = performance.now() + (delay || 0);
    const order = text.split("").map((c, i) => ({ c, at: (i / text.length) * dur * 0.7 + Math.random() * dur * 0.3 }));
    (function frame(now) {
      const t = now - start;
      el.innerHTML = order.map(({ c, at }) => c === " " ? " " : t >= at ? esc(c) : `<span class="dc">${esc(GLYPHS[(Math.random() * GLYPHS.length) | 0])}</span>`).join("");
      if (t < dur) requestAnimationFrame(frame); else el.textContent = text;
    })(performance.now());
    setTimeout(() => { el.textContent = text; }, dur + (delay || 0) + 150); // safety net
  }
  function renderHero() {
    const parts = String(P.name || "").split(" "), last = parts.pop(), first = parts.join(" ");
    const fEl = $("#h-first"), lEl = $("#h-last");
    lEl.dataset.text = last;
    fEl.textContent = first; lEl.textContent = last;
    // tagline: {{secret}} parts start redacted and get declassified one by one
    let k = 0;
    $("#hero-tag").innerHTML = esc(P.tagline || "").replace(/\{\{(.+?)\}\}/g, (_, w) => `<span class="rd" data-k="${k++}">${w}</span>`);
    $$("#hero-tag .rd").forEach((r) => setTimeout(() => r.classList.add("open"), reduced ? 0 : 1500 + Number(r.dataset.k) * 600));
    // focus areas as command line flags
    $("#hero-chips").innerHTML = (P.chips || []).map((c, i) => {
      const label = c.label || c;
      const flag = "--" + label.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      return `<span style="--c:${col(c.color, i)}"><b>--</b>${esc(flag.slice(2))}</span>`;
    }).join(" ");
    // typed prompt, then decrypt the name
    const cmd = "./identify --target self", cEl = $("#h-cmd");
    if (reduced) { cEl.textContent = cmd; return; }
    let i = 0;
    (function type() { cEl.textContent = cmd.slice(0, ++i); if (i < cmd.length) setTimeout(type, 38 + Math.random() * 40); })();
    decrypt(fEl, first, 900, 500);
    decrypt(lEl, last, 1300, 700);
  }

  /* ---------- tooltip ---------- */
  const tip = $("#tip");
  function showTip(html, e) {
    tip.innerHTML = html; tip.classList.add("show");
    const x = Math.min(e.clientX + 14, innerWidth - tip.offsetWidth - 10);
    const y = e.clientY + 20 + tip.offsetHeight > innerHeight ? e.clientY - tip.offsetHeight - 12 : e.clientY + 20;
    tip.style.left = x + "px"; tip.style.top = y + "px";
  }
  const hideTip = () => tip.classList.remove("show");

  /* ---------- hero: face recognition overlay ---------- */
  function renderScan() {
    // landmark points (percent of the photo) roughly on eyes, brows, nose, mouth, jaw
    const pts = [[37, 25], [47, 25], [55, 25], [66, 25], [40, 29], [62, 29], [51, 36], [47, 40], [55, 40], [44, 44], [51, 46], [58, 44], [33, 33], [69, 33], [37, 45], [65, 45], [51, 53]];
    const links = [[0, 1], [2, 3], [0, 4], [1, 4], [2, 5], [3, 5], [4, 6], [5, 6], [6, 7], [6, 8], [7, 9], [8, 11], [9, 10], [10, 11], [12, 4], [13, 5], [12, 14], [13, 15], [14, 16], [15, 16], [9, 14], [11, 15], [10, 16]];
    let h = "";
    links.forEach(([a, b], i) => { h += `<line class="m" style="animation-delay:${0.9 + i * 0.04}s" x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}"/>`; });
    pts.forEach(([x, y], i) => { h += `<circle class="m" style="animation-delay:${0.7 + i * 0.05}s" cx="${x}" cy="${y}" r=".8"/>`; });
    $("#mesh").innerHTML = h;
    const certs = (S.certifications || []).filter((c) => c.status !== "in-progress").slice(0, 3).map((c) => c.short).join(" / ");
    const cur = (S.experience || [])[0] || {};
    const rows = [["SUBJECT", P.fullName || P.name], ["ROLE", P.title], ["SPECIALTY", P.specialty || ""], ["CLEARANCE", P.clearance || certs], ["BASE", P.location], ["STATUS", "ETHICAL HACKER, VERIFIED"]];
    $("#scan-read").innerHTML = rows.filter(([, v]) => v).map(([k, v], i) => `<div><span>${esc(k)}</span><b class="${i === 5 ? "ok" : ""}">${esc(v)}</b></div>`).join("") +
      `<span class="mbar"><i></i></span>`;
    const ts = $("#scan-ts");
    const tick = () => { const d = new Date(); ts.textContent = d.toISOString().slice(0, 10) + "  " + d.toISOString().slice(11, 19) + " UTC"; };
    tick(); setInterval(tick, 1000);
  }

  /* ---------- skills: radar chart + bars ---------- */
  function renderRadar() {
    const sk = S.skills || [];
    const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
    $("#skills-lead").textContent = `${words[sk.length] || sk.length} domains, one goal: find it before the attacker does.`;
    const svg = $("#radar"), cx = 280, cy = 260, R = 180, n = sk.length;
    const ang = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const pt = (i, v) => [cx + Math.cos(ang(i)) * R * v, cy + Math.sin(ang(i)) * R * v];
    let h = "";
    [0.2, 0.4, 0.6, 0.8, 1].forEach((k) => { h += `<polygon class="grid${k === 1 ? " outer" : ""}" points="${sk.map((_, i) => pt(i, k).join(",")).join(" ")}"/>`; });
    sk.forEach((_, i) => { const [x, y] = pt(i, 1); h += `<line class="spoke" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`; });
    [40, 60, 80, 100].forEach((t) => { h += `<text class="tick" x="${cx + 4}" y="${cy - R * t / 100 + 3}">${t}</text>`; });
    h += `<polygon class="area" points="${sk.map((s, i) => pt(i, (s.level || 0) / 100).join(",")).join(" ")}"/>`;
    sk.forEach((s, i) => {
      const [x, y] = pt(i, (s.level || 0) / 100);
      h += `<circle class="pt" data-i="${i}" cx="${x}" cy="${y}" r="5" style="fill:${col(s.color, i)}"/>`;
      const [lx, ly] = pt(i, 1.13);
      const anchor = Math.abs(lx - cx) < 12 ? "middle" : lx > cx ? "start" : "end";
      h += `<text class="lbl" data-i="${i}" x="${lx}" y="${ly + 4}" text-anchor="${anchor}">${esc(s.short || s.group)}</text>`;
    });
    svg.innerHTML = h;
    $("#skill-bars").innerHTML = sk.map((s, i) => `
      <div class="sb" data-i="${i}" style="--c:${col(s.color, i)}">
        <span><i></i>${esc(s.group)}${s.isNew ? "<em>NEW</em>" : ""}</span><b>${Number(s.level) || 0}%</b>
        <div class="track"><i data-w="${Number(s.level) || 0}"></i></div>
      </div>`).join("");
    const focus = (i, on) => $$(`#radar [data-i="${i}"], .sb[data-i="${i}"]`).forEach((el) => el.classList.toggle("on", on));
    $$(".sb").forEach((r) => { r.addEventListener("mouseenter", () => focus(r.dataset.i, true)); r.addEventListener("mouseleave", () => focus(r.dataset.i, false)); });
    $$("#radar .pt, #radar .lbl").forEach((el) => {
      const s = sk[el.dataset.i];
      el.addEventListener("mouseenter", () => focus(el.dataset.i, true));
      el.addEventListener("mouseleave", () => { focus(el.dataset.i, false); hideTip(); });
      el.addEventListener("mousemove", (e) => showTip(`<b>${esc(s.group)}</b> ${s.level}%<br>${(s.items || []).slice(0, 6).map(esc).join(", ")}`, e));
    });
  }

  /* ---------- experience: gantt chart ---------- */
  const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
  const NOWY = new Date().getFullYear() + new Date().getMonth() / 12;
  function span(period) {
    const parts = String(period).split(/\s+-\s+/);
    const one = (t, end) => {
      if (/present|now|current/i.test(t)) return NOWY;
      const m = t.match(/([A-Za-z]{3})?[a-z]*\s*(\d{4})/); if (!m) return NaN;
      const mo = m[1] ? MONTHS[m[1].toLowerCase()] : (end ? 11 : 0);
      return +m[2] + (mo + (end ? 1 : 0)) / 12;
    };
    return [one(parts[0], false), one(parts[1] || parts[0], true)];
  }
  function renderGantt() {
    const exp = (S.experience || []).map((e, i) => ({ ...e, i, r: span(e.period) }));
    const edu = (S.education || []).map((e) => ({ ...e, r: span(e.period) })).filter((e) => e.r[0] >= 2008);
    const all = exp.concat(edu).map((e) => e.r);
    const y0 = Math.floor(Math.min(...all.map((r) => r[0]))), y1 = Math.ceil(NOWY + 0.4);
    const pos = (y) => ((y - y0) / (y1 - y0)) * 100;
    const years = []; for (let y = y0; y <= y1; y++) years.push(y);
    const isRes = (e) => /research|university/i.test(e.role + " " + e.org);
    const lanes = [["WORK", exp.filter((e) => !isRes(e)), "work"], ["RESEARCH", exp.filter(isRes), "work"], ["STUDY", edu, "edu"]];
    const total = Math.floor(NOWY - Math.min(...exp.filter((e) => !isRes(e)).map((e) => e.r[0])));
    const bar = (e, kind, idx) => {
      const c = col(e.color || (kind === "edu" ? "sky" : null), idx);
      const label = kind === "edu" ? e.degree.split(/[,(]/)[0] : e.org.split("(")[0];
      const tipHtml = kind === "edu" ? `<b>${esc(e.degree)}</b><br>${esc(e.school)}<br>${esc(e.period)}` : `<b>${esc(e.role)}</b><br>${esc(e.org)}<br>${esc(e.period)}`;
      return `<a class="g-bar ${kind}" href="${kind === "edu" ? "#edu" : "#tl-" + e.i}" data-i="${e.i == null ? "" : e.i}" data-tip="${esc(tipHtml)}" style="--c:${c};left:${pos(e.r[0])}%;width:${Math.max(1.6, pos(e.r[1]) - pos(e.r[0]))}%">${esc(label.trim())}</a>`;
    };
    const g = $("#gantt");
    g.innerHTML = `<p class="g-head">CAREER TIMELINE &nbsp;|&nbsp; <b>${Math.round(total)}+ YEARS</b> IN INDUSTRY &nbsp;|&nbsp; ${exp.length} ROLES</p>` +
      `<div class="g-axis">${years.map((y) => `<span style="left:${pos(y)}%">${y}</span>`).join("")}</div>` +
      lanes.filter(([, it]) => it.length).map(([name, it, kind]) => `<div class="g-lane"><b>${name}</b><div class="g-track" style="--yr:${100 / (y1 - y0)}%">${it.map((e, k) => bar(e, kind, k)).join("")}</div></div>`).join("") +
      `<div class="g-now"><span>TODAY</span></div>`;
    const placeNow = () => {
      const tr = $(".g-track", g), now = $(".g-now", g); if (!tr) return;
      const gb = g.getBoundingClientRect(), tb = tr.getBoundingClientRect();
      now.style.left = (tb.left - gb.left + tb.width * pos(NOWY) / 100) + "px";
      now.style.top = (tb.top - gb.top) + "px";
    };
    placeNow(); addEventListener("resize", placeNow);
    $$(".g-bar", g).forEach((b) => {
      b.addEventListener("mousemove", (e) => showTip(b.dataset.tip, e));
      b.addEventListener("mouseenter", () => { const t = $("#tl-" + b.dataset.i); if (t) t.classList.add("hl"); });
      b.addEventListener("mouseleave", () => { hideTip(); $$(".tl-item.hl").forEach((t) => t.classList.remove("hl")); });
    });
  }

  /* ---------- certifications: chronology ---------- */
  function renderChrono(certs) {
    const catColor = S.certColors || { Offensive: "coral", "Threat Intel": "lilac", AppSec: "amber", Network: "sky", Infrastructure: "teal", Cloud: "teal" };
    const done = certs.filter((c) => c.status !== "in-progress");
    const years = done.map((c) => +c.year).filter(Boolean);
    const yMin = Math.min(...years), yMax = Math.max(...years);
    const cols = []; for (let y = yMin; y <= yMax; y++) cols.push(String(y));
    if (certs.some((c) => c.status === "in-progress")) cols.push("NEXT");
    const grid = `grid-template-columns: repeat(${cols.length}, minmax(0, 1fr))`;
    const inCol = (c, y) => y === "NEXT" ? c.status === "in-progress" : c.status !== "in-progress" && c.year === y;
    $("#chrono").innerHTML = `<p class="g-head">CERTIFICATION CHRONOLOGY &nbsp;|&nbsp; <b>${yMin} TO ${yMax}</b> &nbsp;|&nbsp; HOVER A BLOCK, OR FILTER BELOW</p>` +
      `<div class="c-cols" style="${grid}">${cols.map((y) => `<div class="c-col">${certs.filter((c) => inCol(c, y)).map((c) => `<span class="c-dot${c.status === "in-progress" ? " wip" : ""}" data-cat="${esc(c.category)}" data-tip="${esc(`<b>${c.name}</b><br>${c.issuer}${c.year ? ", " + c.year : ""}`)}" style="--c:${col(catColor[c.category])}">${esc(c.short)}</span>`).join("")}</div>`).join("")}</div>` +
      `<div class="c-years" style="${grid}">${cols.map((y) => `<span>${y === "NEXT" ? "next" : "'" + y.slice(2)}</span>`).join("")}</div>`;
    $$(".c-dot").forEach((d) => { d.addEventListener("mousemove", (e) => showTip(d.dataset.tip, e)); d.addEventListener("mouseleave", hideTip); });
    $("#cert-filters").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      $$(".c-dot").forEach((d) => d.classList.toggle("dim", b.dataset.f !== "All" && d.dataset.cat !== b.dataset.f));
    });
  }

  /* ---------- boot ---------- */
  function boot(done) {
    const el = $("#boot");
    let seen = false;
    try { seen = sessionStorage.getItem("booted") === "1"; } catch (e) { /* ignore */ }
    if (reduced || seen) { el.remove(); done(); return; }
    const lines = [
      ['<span class="dim">[ 0.000 ]</span> establishing secure session ...', 140],
      ['<span class="dim">[ 0.118 ]</span> loading modules: <span class="ok">offsec</span> <span class="ok">darkweb</span> <span class="ok">cti</span> <span class="ok">soc</span> <span class="ok">appsec</span> <span class="ok">ai</span>', 160],
      ['<span class="dim">[ 0.271 ]</span> verifying credentials ......... <span class="ok">CPENT CEH CCNP-S</span>', 160],
      ['<span class="dim">[ 0.340 ]</span> routing through tor ........... <span class="ok">3 hops, circuit built</span>', 160],
      ['<span class="dim">[ 0.402 ]</span> caffeine level ................ <span class="warn">LOW</span>', 150],
      ['', 60],
      ['<span class="hi">ACCESS GRANTED</span>  welcome to alnoman.infosec', 450]
    ];
    const log = $("#boot-log");
    let i = 0, finished = false;
    const finish = () => { if (finished) return; finished = true; el.classList.add("done"); setTimeout(() => el.remove(), 800); try { sessionStorage.setItem("booted", "1"); } catch (e) { /* ignore */ } done(); };
    el.addEventListener("click", finish);
    (function next() {
      if (finished) return;
      if (i >= lines.length) { setTimeout(finish, 300); return; }
      log.innerHTML += lines[i][0] + "\n";
      setTimeout(next, lines[i++][1]);
    })();
  }

  /* ---------- constellation network ---------- */
  function network() {
    const c = $("#net");
    if (reduced) { c.style.display = "none"; return; }
    const ctx = c.getContext("2d");
    let w, h, nodes, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -999, y: -999 };
    const palette = ["52,227,196", "255,59,79", "125,211,252"];
    const make = () => {
      w = innerWidth; h = innerHeight;
      c.width = w * dpr; c.height = h * dpr; c.style.width = w + "px"; c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, (w * h) / 16000));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
        r: Math.random() * 1.6 + .8, c: palette[Math.random() < .7 ? 0 : Math.random() < .6 ? 1 : 2]
      }));
    };
    make(); addEventListener("resize", make);
    addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    addEventListener("mouseout", () => { mouse.x = mouse.y = -999; });
    const LINK = 130;
    (function tick() {
      requestAnimationFrame(tick);
      if (document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of nodes) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
        if (d < 160) { p.x -= dx * .004; p.y -= dy * .004; }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) { ctx.strokeStyle = `rgba(${a.c},${(1 - d / LINK) * .22})`; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 180) { ctx.strokeStyle = `rgba(255,59,79,${(1 - md / 180) * .35})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
        ctx.fillStyle = `rgba(${a.c},.75)`; ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
    })();
  }

  /* ---------- topographic contours ---------- */
  function contours() {
    const g = $("#contours"); if (!g) return;
    let html = "";
    for (let k = 1; k <= 14; k++) {
      const r = k * 34, pts = [];
      for (let a = 0; a <= 360; a += 6) {
        const t = a * Math.PI / 180;
        const wob = 1 + .07 * Math.sin(t * 3 + k) + .045 * Math.sin(t * 5 + k * 2);
        pts.push(`${(500 + r * wob * Math.cos(t)).toFixed(1)},${(470 + r * .74 * wob * Math.sin(t)).toFixed(1)}`);
      }
      html += `<path d="M${pts.join("L")}Z"/>`;
    }
    g.innerHTML = html;
  }

  /* ---------- typed roles ---------- */
  function typed() {
    const el = $("#typed"), roles = P.roles && P.roles.length ? P.roles : [P.title || ""];
    if (reduced) { el.textContent = roles[0]; return; }
    let r = 0, ch = 0, del = false;
    (function tick() {
      const word = roles[r];
      el.textContent = word.slice(0, ch);
      if (!del && ch < word.length) { ch++; setTimeout(tick, 50 + Math.random() * 45); }
      else if (!del) { del = true; setTimeout(tick, 1800); }
      else if (ch > 0) { ch--; setTimeout(tick, 24); }
      else { del = false; r = (r + 1) % roles.length; setTimeout(tick, 280); }
    })();
  }

  /* ---------- counters, bars, gauges, reveal ---------- */
  function countUp(el) {
    const target = Number(el.dataset.count) || 0, suf = el.dataset.suffix || "";
    if (reduced) { el.textContent = target + suf; return; }
    const t0 = performance.now(), dur = 1600;
    (function f(t) {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e) + suf;
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }
  function activate(el) {
    el.classList.add("in");
    $$("[data-count]", el).forEach(countUp);
    if (el.matches("[data-count]")) countUp(el);
    $$(".bar i, .sb .track i, .pbar i", el).forEach((b) => (b.style.width = b.dataset.w + "%"));
    $$(".gauge .val", el).forEach((v) => (v.style.strokeDashoffset = 251.3 * (1 - Number(v.dataset.pct))));
  }
  function observe() {
    if (!("IntersectionObserver" in window)) { $$(".reveal, .metrics").forEach(activate); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { activate(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 0.07 + "s"; io.observe(el); });
  }

  /* ---------- nav, progress, clock, hover glow ---------- */
  function ui() {
    const nav = $("#nav"), prog = $("#progress"), links = $$("#menu a");
    const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    const onScroll = () => {
      const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
      nav.classList.toggle("scrolled", y > 30);
      document.body.classList.toggle("past-hero", y > innerHeight * 0.35);
      prog.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
      let cur = null;
      sections.forEach((s) => { if (s.offsetTop - 160 <= y) cur = s.id; });
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
    };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();

    const btn = $("#menu-btn"), menu = $("#menu");
    btn.addEventListener("click", () => { btn.classList.toggle("open"); menu.classList.toggle("open"); });
    links.forEach((a) => a.addEventListener("click", () => { btn.classList.remove("open"); menu.classList.remove("open"); }));

    const root = document.documentElement;
    $("#theme-btn").addEventListener("click", () => {
      const light = root.dataset.theme !== "light";
      if (light) root.dataset.theme = "light"; else delete root.dataset.theme;
      try { localStorage.setItem("theme", light ? "light" : "dark"); } catch (e) { /* storage blocked */ }
    });
    const toTop = $("#to-top"), ring = $("#ring-val");
    const onTop = () => {
      const max = document.documentElement.scrollHeight - innerHeight, p = max > 0 ? scrollY / max : 0;
      toTop.classList.toggle("show", scrollY > innerHeight * 0.8);
      ring.style.strokeDashoffset = 131.95 * (1 - p);
    };
    addEventListener("scroll", onTop, { passive: true }); onTop();
    toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));

    const clock = $("#hud-clock");
    const tickClock = () => { const d = new Date(); clock.textContent = d.toISOString().slice(11, 19) + " UTC"; };
    tickClock(); setInterval(tickClock, 1000);

    if (matchMedia("(pointer: fine)").matches && !reduced) {
      document.addEventListener("mousemove", (e) => {
        const card = e.target.closest && e.target.closest(".skill-card");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      });
    }
  }

  /* ---------- interactive shell ---------- */
  function shell() {
    const out = $("#shell-out"), input = $("#shell-in");
    const hist = []; let hi = 0;
    const print = (html) => { const d = document.createElement("div"); d.innerHTML = html; out.appendChild(d); out.scrollTop = out.scrollHeight; };
    const C = {
      help: () => [
        '<span class="c">Available commands:</span>',
        '  <span class="p">whoami</span>       who is this person',
        '  <span class="p">about</span>        short bio',
        '  <span class="p">skills</span>       skill matrix',
        '  <span class="p">experience</span>   career history',
        '  <span class="p">education</span>    degrees',
        '  <span class="p">certs</span>        certifications',
        '  <span class="p">projects</span>     things I built',
        '  <span class="p">papers</span>       research papers',
        '  <span class="p">contact</span>      how to reach me',
        '  <span class="p">social</span>       profile links',
        '  <span class="p">version</span>      site version',
        '  <span class="p">ls</span> / <span class="p">cat</span>     look around',
        '  <span class="p">goto</span> &lt;section&gt; jump to a section',
        '  <span class="p">clear</span>        clear screen'
      ].join("\n"),
      whoami: () => `<span class="y">${esc(P.fullName || P.name)}</span>\n${esc(P.title)} | ${esc(P.location)}\n<span class="d">${esc(P.tagline)}</span>`,
      about: () => (P.about || []).map(esc).join("\n\n"),
      skills: () => (S.skills || []).map((g) => {
        const n = Math.round((g.level || 0) / 5);
        return `<span class="c">${esc(g.group.padEnd(26))}</span> <span class="p">${"#".repeat(n)}</span><span class="d">${".".repeat(20 - n)}</span> ${g.level}%`;
      }).join("\n"),
      experience: () => (S.experience || []).map((e) => `<span class="y">${esc(e.period.padEnd(20))}</span> ${esc(e.role)} <span class="d">@ ${esc(e.org)}</span>`).join("\n"),
      education: () => (S.education || []).map((e) => `<span class="y">${esc(e.period.padEnd(20))}</span> ${esc(e.degree)} <span class="d">@ ${esc(e.school)}</span>`).join("\n"),
      certs: () => (S.certifications || []).map((c) => `${c.status === "in-progress" ? '<span class="m">[~]</span>' : '<span class="p">[+]</span>'} ${esc(c.short.padEnd(7))} <span class="d">${esc(c.name)} | ${esc(c.issuer)}${c.year ? " | " + esc(c.year) : ""}</span>`).join("\n"),
      projects: () => (S.projects || []).map((p, i) => `<span class="y">OP-${String(i + 1).padStart(2, "0")}</span> <span class="p">${esc(p.name)}</span> <span class="d">[${esc(p.type)}]</span>\n      ${esc(p.desc)}${p.url ? `\n      <a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.url)}</a>` : ""}`).join("\n\n"),
      papers: () => ((S.research || {}).papers || []).map((p) => `<span class="y">[${esc(p.year)}]</span> ${esc(p.title)} <span class="d">(${Number(p.cites) || 0} cites)</span>`).join("\n"),
      contact: () => P.email ? `email: <a href="mailto:${esc(P.email)}">${esc(P.email)}</a>` : "No email configured.",
      social: () => Object.entries(P.links || {}).filter(([, v]) => v).map(([k, v]) => `${esc((linkLabels[k] || k).padEnd(15))} <a href="${esc(v)}" target="_blank" rel="noopener">${esc(v)}</a>`).join("\n"),
      version: () => `alnoman.infosec v${esc(S.version)} <span class="d">(updated ${esc(S.updated)})</span>`,
      ls: () => '<span class="c">about.md  skills/  experience.log  certs.txt  projects/  papers.bib  contact.sh  flag.txt</span>',
      cat: (a) => {
        const files = { "about.md": "about", "certs.txt": "certs", "experience.log": "experience", "contact.sh": "contact", "papers.bib": "papers" };
        if (!a) return "usage: cat &lt;file&gt;";
        if (a === "flag.txt") return '<span class="m">FLAG{y0u_f0und_th3_h4ck3r_in_m3}</span>\n<span class="d">Nice recon. Now say hi through the contact form.</span>';
        return files[a] ? C[files[a]]() : `cat: ${esc(a)}: No such file or directory`;
      },
      goto: (a) => { const el = a && document.getElementById(a.replace("#", "")); if (el) { el.scrollIntoView({ behavior: "smooth" }); return `jumping to #${esc(a)} ...`; } return "usage: goto about|skills|experience|certifications|projects|research|contact"; },
      sudo: () => '<span class="r">Permission denied.</span> This incident will be reported to the SOC. (Which is me.)',
      rm: () => '<span class="r">Nice try.</span> Write access denied.',
      hack: () => '<span class="p">Initiating hack ...</span>\n<span class="d">Just kidding. Ethical hackers get written permission first.</span>',
      theme: () => { $("#theme-btn").click(); return "theme switched"; },
      clear: () => { out.innerHTML = ""; return null; },
      exit: () => 'There is no escape. Try <span class="p">contact</span> instead.'
    };
    print('<span class="y">alnoman.infosec</span> interactive shell <span class="d">v' + esc(S.version) + '</span>\nType <span class="p">help</span> to see available commands.\n');
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const raw = input.value.trim(); input.value = "";
        print(`<span class="p">guest@alnoman:~$</span> ${esc(raw)}`);
        if (!raw) return;
        hist.push(raw); hi = hist.length;
        const [cmd, ...args] = raw.split(/\s+/);
        const fn = C[cmd.toLowerCase()];
        const res = fn ? fn(args.join(" ")) : `<span class="r">command not found:</span> ${esc(cmd)}. Type <span class="p">help</span>.`;
        if (res != null) print(res);
      } else if (e.key === "ArrowUp") { if (hi > 0) input.value = hist[--hi]; e.preventDefault(); }
      else if (e.key === "ArrowDown") { if (hi < hist.length - 1) input.value = hist[++hi]; else { hi = hist.length; input.value = ""; } e.preventDefault(); }
      else if (e.key === "Tab") { e.preventDefault(); const m = Object.keys(C).filter((k) => k.startsWith(input.value)); if (m.length === 1) input.value = m[0]; }
    });
    $("#shell").addEventListener("click", () => input.focus());
  }

  function egg() {
    console.log("%c alnoman.infosec ", "background:#ff3b4f;color:#ffffff;font-weight:bold;font-size:14px;padding:4px 8px;border-radius:4px");
    console.log("%cReading the source? Respect. Open the terminal section and run: cat flag.txt", "color:#34e3c4");
  }

  /* ---------- start ---------- */
  render();
  contours();
  network();
  ui();
  shell();
  egg();
  boot(() => { typed(); observe(); });
})();
