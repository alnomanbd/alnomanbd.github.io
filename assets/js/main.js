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
    renderGitLog();
    renderGantt();
    renderEdu();

    renderCerts();
    renderProjects();
    renderResearch();

    $("#posts").innerHTML = (S.posts || []).map((p) => `
      <a class="post reveal" href="${esc(p.url)}" target="_blank" rel="noopener">
        <time>${esc(p.date)} &nbsp;|&nbsp; ${esc(p.tag)}</time><h5>${esc(p.title)}</h5><span class="go">Read note</span>
      </a>`).join("");
  }

  function filterBar(el, items, key, cards, fmt) {
    const counts = {};
    items.forEach((x) => { const k = x[key]; if (k) counts[k] = (counts[k] || 0) + 1; });
    const cats = ["All"].concat(Object.keys(counts));
    el.innerHTML = cats.map((t, i) => `<button class="${i === 0 ? "on" : ""}" data-f="${esc(t)}">${esc(fmt ? fmt(t) : t)}<b>${i === 0 ? items.length : counts[t]}</b></button>`).join("");
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
      const foot = st === "active" ? "[ok] VERIFIED" : st === "in-progress" ? "[..] STUDYING" : "[ok] EARNED";
      const inner = `<span class="cert-wm" aria-hidden="true">${esc(c.year || "NEXT")}</span>
        <div class="cert-top"><div class="cert-badge">${esc(c.short)}</div><span class="status">${label[st]}</span></div>
        <h5>${esc(c.name)}</h5>
        <p class="cert-iss">${esc(c.issuer)}${c.year ? " &nbsp;|&nbsp; " + esc(c.year) : ""}</p>
        <div class="cert-foot"><span>${esc(c.category || "")}</span><span class="cert-ok">${foot}</span></div>`;
      const attrs = `class="cert ${st} reveal" data-f="${esc(c.category || "")}"`;
      return c.url ? `<a ${attrs} href="${esc(c.url)}" target="_blank" rel="noopener">${inner}</a>` : `<div ${attrs}>${inner}</div>`;
    }).join("");
    filterBar($("#cert-filters"), certs, "category", "#certs .cert");
    renderChrono(certs);
  }

  function renderProjects() {
    const projects = S.projects || [];
    const slug = (t) => String(t).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const pid = (t) => { let x = 7; for (const ch of t) x = (x * 31 + ch.charCodeAt(0)) % 9000; return 1000 + x; };
    const st = { live: ["active (running)", "s-live"], lab: ["active (lab)", "s-lab"], wip: ["activating", "s-wip"] };
    const links = (p) => [
      p.url && `<a href="${esc(p.url)}" target="_blank" rel="noopener">${I.external} live</a>`,
      p.repo && `<a href="${esc(p.repo)}" target="_blank" rel="noopener">${I.github} code</a>`
    ].filter(Boolean).join("");
    const feat = projects.find((p) => p.featured);
    const html = projects.map((p, i) => {
      const c = col(p.color, i), s = st[p.status] || ["loaded", "s-live"];
      if (p === feat) {
        return `<article class="svc-feature reveal" data-f="${esc(p.type)}" style="--c:${c}">
          <div class="term-bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><span class="term-title mono">alnoman@ops:~/${esc(slug(p.name))}</span></div>
          <div class="sf-body">
            <div class="sf-main mono">
              <p class="sf-cmd"><span class="p">$</span> cat README.md</p>
              <h4># ${esc(p.name)}</h4>
              <p class="sf-desc">${esc(p.desc)}</p>
              <p class="sf-cmd"><span class="p">$</span> ls ./topics</p>
              <p class="sf-ls">${(p.tags || []).map((t) => `<span>${esc(slug(t))}/</span>`).join("")}</p>
              <div class="sf-links">${links(p)}</div>
            </div>
            <div class="sf-side mono">
              <p class="sf-status"><span class="led ${s[1]}"></span> ${esc(s[0])}</p>
              ${(p.stats || []).map(([v, l]) => `<div class="sf-stat"><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join("")}
              <p class="sf-meta">type: ${esc(p.type)}<br>pid: ${pid(p.name)}</p>
            </div>
          </div>
        </article>`;
      }
      return `<article class="svc reveal" data-f="${esc(p.type)}" style="--c:${c}">
        <div class="svc-bar mono"><span class="led ${s[1]}"></span><b>${esc(slug(p.name))}.service</b><span class="svc-pid">PID ${pid(p.name)}</span></div>
        <div class="svc-body">
          <div class="svc-head"><div class="node">${I[p.icon] || I.layers}</div><div><h4>${esc(p.name)}</h4><p class="ptype">${esc(p.type)}</p></div></div>
          <p class="svc-desc">${esc(p.desc)}</p>
          <p class="svc-stack mono"><span>stack:</span> ${(p.tags || []).map(esc).join(", ")}</p>
        </div>
        <div class="svc-foot mono"><span class="svc-st ${s[1]}">${esc(s[0])}</span><span class="svc-links">${links(p)}</span></div>
      </article>`;
    }).join("");
    $("#projects-grid").innerHTML = html;
    filterBar($("#filters"), projects, "type", "#projects-grid > article", (t) => t === "All" ? "--all" : "--type=" + slug(t));
  }

  /* ---------- research: active quantum / PQC work with a lattice visual ---------- */
  function renderQuantum() {
    const Q = (S.research || {}).current;
    const box = $("#q-research");
    if (!Q || !box) { if (box) box.remove(); return; }
    // 2D lattice from basis b1, b2; one short vector and an LWE style noisy point
    const b1 = [46, 12], b2 = [16, 40], pts = [];
    for (let i = -6; i <= 6; i++) for (let k = -6; k <= 6; k++) {
      const x = 160 + i * b1[0] + k * b2[0], y = 150 + i * b1[1] + k * b2[1];
      if (x > 6 && x < 314 && y > 6 && y < 294) pts.push([x, y]);
    }
    const svg = `<svg class="lattice" viewBox="0 0 320 300" aria-hidden="true">
      ${pts.map(([x, y], n) => `<circle cx="${x}" cy="${y}" r="2.2" style="--n:${n % 9}"/>`).join("")}
      <line class="bv v1" x1="160" y1="150" x2="${160 + b1[0]}" y2="${150 + b1[1]}"/>
      <line class="bv v2" x1="160" y1="150" x2="${160 + b2[0]}" y2="${150 + b2[1]}"/>
      <circle class="origin" cx="160" cy="150" r="4.5"/>
      <circle class="target" cx="${160 + b1[0] + b2[0] + 9}" cy="${150 + b1[1] + b2[1] - 7}" r="4"/>
      <circle class="target-ring" cx="${160 + b1[0] + b2[0] + 9}" cy="${150 + b1[1] + b2[1] - 7}" r="4"/>
      <line class="err" x1="${160 + b1[0] + b2[0]}" y1="${150 + b1[1] + b2[1]}" x2="${160 + b1[0] + b2[0] + 9}" y2="${150 + b1[1] + b2[1] - 7}"/>
      <text x="12" y="20">LATTICE  L(B)</text><text x="12" y="290">b + e : find the closest point</text>
    </svg>`;
    box.innerHTML = `
      <div class="q-text">
        <div class="q-top mono"><span class="q-tag"><i></i> ACTIVE RESEARCH</span><span class="q-status">${esc(Q.status || "IN PROGRESS")}</span></div>
        <h3>${esc(Q.title)}</h3>
        <p class="q-sum">${esc(Q.summary)}</p>
        <div class="q-topics mono">${(Q.topics || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        ${(Q.working || []).length ? `<p class="q-wt mono">// currently working on</p><ul class="q-work">${Q.working.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>` : ""}
      </div>
      <div class="q-vis">${svg}<p class="q-cap mono">Lattice problems (LWE, SVP, CVP) are the hard maths behind ML-KEM and ML-DSA.</p></div>`;
  }

  function renderResearch() {
    const R = S.research || {};
    renderQuantum();
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
    // loadout: skill meters built from the skills list
    const pick = (P.loadout && P.loadout.length ? P.loadout : (S.skills || []).slice(0, 6).map((x) => x.short || x.group));
    $("#hero-chips").innerHTML = pick.map((name) => (S.skills || []).find((x) => (x.short || x.group) === name)).filter(Boolean).map((x, i) => {
      const lvl = Number(x.level) || 0, on = Math.round(lvl / 10);
      return `<div class="lo" style="--c:${col(x.color, i)}" title="${esc(x.group)}"><span class="lo-n">${esc(x.short || x.group)}</span><span class="lo-bar">${Array.from({ length: 10 }, (_, k) => `<i class="${k < on ? "on" : ""}" style="--k:${k}"></i>`).join("")}</span><span class="lo-v">${lvl}</span></div>`;
    }).join("");
    if (reduced) return;
    decrypt(fEl, first, 900, 500);
    decrypt(lEl, last, 1300, 700);
  }



  /* ---------- education: level-up staircase ---------- */
  function renderEdu() {
    const list = (S.education || []).slice().reverse(); // oldest first, so the stairs climb
    const n = list.length;
    const meta = (d) => {
      if (/master/i.test(d)) return ["M.SC.", "RESEARCHER", "sky"];
      if (/bachelor/i.test(d)) return ["B.SC.", "ENGINEER", "teal"];
      if (/diploma/i.test(d)) return ["DIPLOMA", "NETWORK OPS", "lilac"];
      if (/higher secondary|hsc/i.test(d)) return ["HSC", "SCIENCE", "coral"];
      if (/secondary|ssc/i.test(d)) return ["SSC", "FOUNDATION", "coral"];
      return [d.split(/[,(]/)[0].toUpperCase(), "LEVEL", "amber"];
    };
    const sig = (str) => { let x = 5381; for (const ch of str) x = ((x << 5) + x + ch.charCodeAt(0)) >>> 0; return x.toString(16).padStart(8, "0"); };
    const yearOf = (p) => (String(p).match(/(\d{4})\s*$/) || [, ""])[1];
    const path = `<div class="et-path" aria-hidden="true">${list.map((e, i) => `<span class="et-node${i === n - 1 ? " max" : ""}" style="left:${((i + 0.5) / n) * 100}%"></span><span class="et-year" style="left:${((i + 0.5) / n) * 100}%">${esc(yearOf(e.period))}</span>`).join("")}<i class="et-fill"></i></div>`;
    const cards = list.map((e, i) => {
      const [short, rank, color] = meta(e.degree);
      const field = e.degree.includes(",") ? e.degree.split(",").slice(1).join(",").trim() : "";
      const top = i === n - 1;
      return `<article class="et-card${top ? " max" : ""}" style="--c:${col(color, i)};--lift:${i}">
        <div class="et-top mono"><span class="et-lvl">LVL ${String(i + 1).padStart(2, "0")}</span>${top ? '<span class="et-max">MAX LEVEL</span>' : `<span class="et-ok">UNLOCKED</span>`}</div>
        <h5 class="et-deg">${esc(short)}</h5>
        <p class="et-rank mono">// ${esc(rank)}</p>
        ${field ? `<p class="et-field">${esc(field)}</p>` : ""}
        <p class="et-school">${esc(e.school || "")}</p>
        ${e.note ? `<p class="et-note">${esc(e.note)}</p>` : ""}
        <div class="et-foot mono"><span>${esc(e.period)}</span><span class="et-sig" title="verification signature">sig ${sig(e.degree + e.school)}</span></div>
      </article>`;
    }).join("");
    $("#edu").innerHTML = path + `<div class="et-stairs" style="--n:${n}">${cards}</div>`;
  }

  /* ---------- experience: git log --graph ---------- */
  function renderGitLog() {
    const exp = S.experience || [];
    const hash = (str) => { let x = 2166136261; for (const ch of str) { x ^= ch.charCodeAt(0); x = Math.imul(x, 16777619) >>> 0; } return x.toString(16).padStart(8, "0").slice(0, 7); };
    const isRes = (e) => /research|university/i.test(e.role + " " + e.org);
    $("#timeline").innerHTML = `<div class="gl-head mono"><span class="gl-ps">alnoman@career:~$</span> git log --graph --decorate career <span class="gl-hint">click a commit to view the diff</span></div>` +
      exp.map((e, i) => {
        const cur = /present|now|current/i.test(e.period);
        const r = span(e.period), dur = Math.max(1, Math.round((r[1] - r[0]) * 12));
        const durTxt = [Math.floor(dur / 12) ? Math.floor(dur / 12) + " yr" : "", dur % 12 ? (dur % 12) + " mo" : ""].filter(Boolean).join(" ");
        const ref = cur ? '<span class="gl-ref head">HEAD -&gt; current</span>' : i === exp.length - 1 ? '<span class="gl-ref">tag: first-commit</span>' : "";
        return `<div class="gl-item reveal${i === 0 ? " open" : ""}${isRes(e) ? " branch" : ""}${cur ? " current" : ""}" id="tl-${i}" style="--c:${col(e.color, i)}">
          <div class="gl-graph" aria-hidden="true"><span class="gl-node"></span></div>
          <div class="gl-body">
            <button class="gl-commit mono" aria-expanded="${i === 0}"><span class="gl-star">*</span> <span class="gl-hash">${hash(e.org + e.period)}</span> ${ref} <span class="gl-date">${esc(e.period)}</span><span class="gl-dur">${esc(durTxt)}</span></button>
            <h4>${esc(e.role)}</h4>
            <p class="gl-org"><b>${esc(e.org)}</b>${e.location ? `, ${esc(e.location)}` : ""}${isRes(e) ? ' <span class="gl-branch mono">branch: research</span>' : ""}</p>
            <div class="gl-diff"><div class="gl-diff-in mono">
              <p class="gl-stat">${(e.points || []).length} additions, 0 deletions</p>
              ${(e.points || []).map((p) => `<p class="add"><b>+</b> ${esc(p)}</p>`).join("")}
              <p class="gl-tags">${(e.tags || []).map((t) => `<span>#${esc(t.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}</span>`).join(" ")}</p>
            </div></div>
          </div>
        </div>`;
      }).join("");
    $$("#timeline .gl-commit").forEach((btn) => btn.addEventListener("click", () => {
      const item = btn.closest(".gl-item"), open = !item.classList.contains("open");
      item.classList.toggle("open", open); btn.setAttribute("aria-expanded", open);
    }));
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
    // running total per column for the growth line
    let run = 0;
    const counts = cols.map((y) => certs.filter((c) => inCol(c, y)).length);
    const cum = cols.map((y, i) => (y === "NEXT" ? run : (run += counts[i])));
    const total = done.length, nC = cols.length;
    const ptsXY = cum.map((v, i) => [((i + 0.5) / nC) * 100, 100 - (v / total) * 92]);
    const line = ptsXY.map((p) => p.join(",")).join(" ");
    const area = `0,100 ${line} 100,100`;
    const growth = `<svg class="c-growth" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polygon class="cg-area" points="${area}"/><polyline class="cg-line" points="${line}"/></svg>
      <div class="cg-dots" aria-hidden="true">${ptsXY.map(([x, y], i) => counts[i] && cols[i] !== "NEXT" ? `<span style="left:${x}%;top:${y}%" title="${cum[i]} total"></span>` : "").join("")}
        <b class="cg-total" style="left:${ptsXY[ptsXY.length - (cols[nC - 1] === "NEXT" ? 2 : 1)][0]}%;top:${ptsXY[ptsXY.length - (cols[nC - 1] === "NEXT" ? 2 : 1)][1]}%">${total} TOTAL</b></div>`;
    $("#chrono").innerHTML = `<p class="g-head">CERTIFICATION CHRONOLOGY &nbsp;|&nbsp; <b>${yMin} TO ${yMax}</b> &nbsp;|&nbsp; <span class="cg-key"><i></i> cumulative growth</span> &nbsp;|&nbsp; HOVER A BLOCK, OR FILTER BELOW</p>` +
      `<div class="c-wrap">${growth}<div class="c-cols" style="${grid}">${cols.map((y, ci) => `<div class="c-col">${counts[ci] ? `<em class="c-count">+${counts[ci]}</em>` : ""}${certs.filter((c) => inCol(c, y)).map((c) => `<span class="c-dot${c.status === "in-progress" ? " wip" : ""}" data-cat="${esc(c.category)}" data-tip="${esc(`<b>${c.name}</b><br>${c.issuer}${c.year ? ", " + c.year : ""}`)}" style="--c:${col(catColor[c.category])}">${esc(c.short)}</span>`).join("")}</div>`).join("")}</div></div>` +
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

  /* ---------- live threat map (simulated) ---------- */
  function network() {
    const c = $("#net");
    if (reduced) { c.style.display = "none"; return; }
    const ctx = c.getContext("2d");
    const root = document.documentElement;
    // land as longitude ranges per 5 degree latitude band (rough equirectangular world)
    const LAND = {
      75: [[-120, -75], [-70, -20], [55, 140]],
      70: [[-165, -140], [-140, -60], [-55, -20], [15, 30], [30, 180]],
      65: [[-165, -140], [-140, -62], [-50, -25], [-22, -14], [5, 30], [30, 180]],
      60: [[-160, -140], [-135, -65], [-48, -40], [5, 30], [30, 170]],
      55: [[-130, -60], [-8, 0], [5, 40], [40, 162]],
      50: [[-125, -56], [-5, 1], [-2, 40], [40, 140]],
      45: [[-124, -65], [-1, 40], [40, 135], [140, 145]],
      40: [[-124, -75], [-9, 3], [12, 28], [27, 45], [45, 122], [126, 129], [135, 141]],
      35: [[-120, -77], [-6, 10], [35, 60], [60, 120], [132, 140]],
      30: [[-115, -81], [-10, 32], [35, 60], [65, 122]],
      25: [[-110, -97], [-82, -80], [-15, 35], [37, 57], [68, 92], [100, 120]],
      20: [[-105, -87], [-80, -75], [-17, 38], [40, 55], [72, 86], [95, 110]],
      15: [[-92, -84], [-17, 42], [44, 50], [74, 80], [98, 109], [120, 125]],
      10: [[-85, -77], [-75, -62], [-15, 45], [48, 51], [77, 79], [98, 106], [122, 126]],
      5: [[-78, -50], [-10, 48], [100, 104], [110, 118]],
      0: [[-80, -48], [9, 42], [98, 105], [110, 118], [120, 125]],
      "-5": [[-80, -35], [12, 40], [105, 140], [140, 150]],
      "-10": [[-77, -37], [13, 40], [130, 142], [142, 150]],
      "-15": [[-75, -39], [13, 40], [45, 50], [124, 145]],
      "-20": [[-70, -40], [13, 35], [44, 49], [114, 150]],
      "-25": [[-70, -45], [15, 33], [113, 153]],
      "-30": [[-72, -50], [17, 31], [115, 153]],
      "-35": [[-72, -57], [18, 25], [117, 150], [173, 178]],
      "-40": [[-73, -62], [145, 148], [172, 176]],
      "-45": [[-75, -65], [168, 171]],
      "-50": [[-75, -68]],
      "-55": [[-71, -67]]
    };
    const isLand = (lon, lat) => {
      const band = LAND[Math.round(lat / 5) * 5];
      return !!band && band.some(([a, b]) => lon >= a && lon <= b);
    };
    const HOME = { name: "DHAKA", lon: 90.4, lat: 23.8 };
    const SOURCES = [
      ["RU", 37.6, 55.7], ["CN", 116.4, 39.9], ["BR", -46.6, -23.5], ["US", -74, 40.7], ["NL", 4.9, 52.4],
      ["NG", 3.4, 6.5], ["IR", 51.4, 35.7], ["KP", 125.7, 39], ["DE", 8.7, 50.1], ["US", -77.5, 39],
      ["SG", 103.8, 1.4], ["UA", 30.5, 50.4], ["HK", 114.2, 22.3], ["VN", 105.8, 21], ["TR", 29, 41],
      ["RO", 26.1, 44.4], ["IN", 72.9, 19.1], ["PK", 67, 24.9], ["ZA", 28, -26.2], ["AU", 151.2, -33.9]
    ];
    const OTHER_TARGETS = [["GB", -0.1, 51.5], ["JP", 139.7, 35.7], ["US", -122.4, 37.8], ["AE", 55.3, 25.2], ["AU", 151.2, -33.9]];
    const TYPES = [["DDoS", "--coral"], ["SSH brute force", "--amber"], ["Malware C2", "--lilac"], ["Phishing kit", "--sky"], ["Exploit attempt", "--amber"], ["Credential stuffing", "--coral"], ["Port scan", "--teal"]];
    let w, h, s, ox, oy, dots = [], dpr = Math.min(window.devicePixelRatio || 1, 2);
    const proj = (lon, lat) => [ox + (lon + 180) * s, oy + (80 - lat) * s];
    const make = () => {
      w = innerWidth; h = innerHeight;
      c.width = w * dpr; c.height = h * dpr; c.style.width = w + "px"; c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s = w >= h ? w / 360 : Math.max(w / 360, h / 260); // full world on desktop, zoomed toward Dhaka on phones
      const mapW = 360 * s;
      // keep Dhaka in view on narrow screens
      ox = mapW > w ? Math.min(0, Math.max(w - mapW, w * 0.62 - (HOME.lon + 180) * s)) : (w - mapW) / 2;
      oy = (h - 145 * s) / 2;
      dots = [];
      const step = s > 5 ? 2 : 2.5;
      for (let lat = 78; lat > -58; lat -= step) for (let lon = -178; lon < 180; lon += step) if (isLand(lon, lat)) dots.push(proj(lon, lat));
    };
    make(); addEventListener("resize", make);
    const cssVar = (n) => getComputedStyle(root).getPropertyValue(n).trim() || "#ff3b4f";
    const hexA = (hex, a) => { const m = hex.replace("#", ""); const n = parseInt(m.length === 3 ? m.replace(/./g, "$&$&") : m, 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; };
    const arcs = [], hits = [];
    const log = $("#tm-log"), count = $("#tm-count");
    const t0 = new Date(); let blocked = Math.floor((t0.getHours() * 3600 + t0.getMinutes() * 60 + t0.getSeconds()) * 0.37) + 1200;
    if (count) count.textContent = blocked.toLocaleString("en-US");
    function spawn() {
      const src = SOURCES[(Math.random() * SOURCES.length) | 0];
      const home = Math.random() < 0.72;
      const dst = home ? ["BD", HOME.lon, HOME.lat] : OTHER_TARGETS[(Math.random() * OTHER_TARGETS.length) | 0];
      if (src[1] === dst[1]) return;
      const type = TYPES[(Math.random() * TYPES.length) | 0];
      arcs.push({ a: [src[1], src[2]], b: [dst[1], dst[2]], t: 0, v: 0.006 + Math.random() * 0.006, col: cssVar(type[1]), home, src: src[0], dst: dst[0], type: type[0] });
    }
    function addLog(a) {
      if (!log) return;
      const d = new Date().toISOString().slice(11, 19);
      const row = document.createElement("div");
      row.innerHTML = `<span class="d">${d}</span> <b style="color:${a.col}">${a.home ? "BLOCKED" : "OBSERVED"}</b> ${esc(a.type)} <span class="d">${a.src} &gt; ${a.dst}</span>`;
      log.prepend(row);
      while (log.children.length > 4) log.lastChild.remove();
    }
    let last = 0, nextSpawn = 0;
    (function tick(now) {
      requestAnimationFrame(tick);
      if (document.hidden || now - last < 33) return;
      last = now;
      const light = root.dataset.theme === "light";
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = light ? "rgba(20,30,60,.22)" : "rgba(154,166,196,.26)";
      const r = Math.max(1.3, s * 0.55);
      for (const [x, y] of dots) ctx.fillRect(x - r / 2, y - r / 2, r, r);
      if (now > nextSpawn && arcs.length < 9) { spawn(); nextSpawn = now + 350 + Math.random() * 900; }
      // home shield
      const [hx, hy] = proj(HOME.lon, HOME.lat), teal = cssVar("--teal");
      const pulse = (now / 1600) % 1;
      ctx.strokeStyle = hexA(teal, 0.6 * (1 - pulse)); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(hx, hy, 6 + pulse * 26, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = teal; ctx.beginPath(); ctx.arc(hx, hy, 3.2, 0, Math.PI * 2); ctx.fill();
      ctx.font = "600 10px 'JetBrains Mono', monospace"; ctx.fillStyle = hexA(teal, 0.85);
      ctx.fillText(HOME.name + " // DEFENDED", hx + 10, hy - 8);
      for (let i = arcs.length - 1; i >= 0; i--) {
        const a = arcs[i];
        a.t += a.v;
        const [x1, y1] = proj(a.a[0], a.a[1]), [x2, y2] = proj(a.b[0], a.b[1]);
        const dist = Math.hypot(x2 - x1, y2 - y1);
        const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2 - dist * 0.32;
        const at = (t) => [(1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2, (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2];
        const head = Math.min(a.t, 1), tail = Math.max(0, a.t - 0.35);
        const N = 18;
        for (let k = 0; k < N; k++) {
          const ta = tail + (head - tail) * (k / N), tb = tail + (head - tail) * ((k + 1) / N);
          const [ax, ay] = at(ta), [bx, by] = at(tb);
          ctx.strokeStyle = hexA(a.col, (k / N) * 0.9); ctx.lineWidth = 2.2;
          ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
        }
        if (a.t < 1) {
          const [px, py] = at(head);
          ctx.fillStyle = a.col; ctx.beginPath(); ctx.arc(px, py, 3.2, 0, Math.PI * 2); ctx.fill();
        }
        // source blip
        ctx.fillStyle = hexA(a.col, 0.7); ctx.beginPath(); ctx.arc(x1, y1, 2, 0, Math.PI * 2); ctx.fill();
        if (a.t >= 1 && !a.done) {
          a.done = true; hits.push({ x: x2, y: y2, t: 0, col: a.home ? teal : a.col });
          addLog(a);
          if (a.home && count) count.textContent = (++blocked).toLocaleString("en-US");
        }
        if (a.t > 1.35) arcs.splice(i, 1);
      }
      for (let i = hits.length - 1; i >= 0; i--) {
        const p = hits[i]; p.t += 0.04;
        ctx.strokeStyle = hexA(p.col, 1 - p.t); ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(p.x, p.y, 4 + p.t * 18, 0, Math.PI * 2); ctx.stroke();
        if (p.t >= 1) hits.splice(i, 1);
      }
    })(0);
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



  /* ---------- programming: languages + contest submissions ---------- */
  function renderProgramming() {
    const G = S.programming;
    const sec = $("#programming");
    if (!G || !sec) { if (sec) sec.remove(); return; }
    $("#prog-lead").textContent = G.summary || "";
    $("#lang-grid").innerHTML = (G.languages || []).map((l, i) => `
      <div class="lang-tile reveal" style="--c:${col(l.color, i)}">
        <div class="lt-bar mono"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><b>${esc(l.file)}</b></div>
        <div class="lt-body">
          <code class="lt-code mono">${esc(l.code)}</code>
          <h4>${esc(l.name)}</h4>
          <p>${esc(l.use)}</p>
        </div>
      </div>`).join("");
    const cs = G.contests || [], years = cs.map((c) => +c.year).filter(Boolean);
    const span = years.length ? `${Math.min(...years)} to ${Math.max(...years)}` : "";
    $("#cp-strip").innerHTML =
      `<div class="cp-stats"><span><b>${cs.length}</b> contests</span><span><b>${esc(span)}</b> undergrad</span><span><b>${(G.judges || []).length}</b> online judges</span><span><b>${(G.languages || []).length}</b> languages</span></div>` +
      `<div class="cp-judges"><span class="cp-l">practiced on</span>${(G.judges || []).map((x) => `<span class="cp-j">${esc(x)}</span>`).join("")}</div>`;
    $("#cp-board").innerHTML = `
      <div class="cpb-head mono"><span class="p">alnoman@judge:~$</span> status --contests --user alnoman</div>
      <div class="cpb-table mono" role="table" aria-label="Programming contests">
        <div class="cpb-row cpb-th" role="row"><span>#</span><span>WHEN</span><span>CONTEST</span><span>VENUE</span><span>VERDICT</span></div>
        ${cs.map((c, i) => `<div class="cpb-row" role="row"><span class="cpb-n">${String(cs.length - i).padStart(2, "0")}</span><span class="cpb-y">${esc(c.year)}</span><span class="cpb-c">${esc(c.name)}</span><span class="cpb-v">${esc(c.venue || "-")}</span><span><b class="cpb-ok">ATTENDED</b></span></div>`).join("")}
      </div>`;
  }

  /* ---------- running light border on every box ---------- */
  function borders() {
    const sel = ".glass, .skill-card, .cert, .svc, .svc-feature, .et-card, .paper, .post, .qres, .scan-read, .brief, .term, .gitlog, .scan-view, .ticker, .tm-panel, .project, .lang-tile, .cp-board, .cp-strip";
    const boxes = $$(sel).filter((el) => !el.querySelector(":scope > .bx-ring"));
    boxes.forEach((el) => {
      el.classList.add("bx");
      const r = document.createElement("span");
      r.className = "bx-ring"; r.setAttribute("aria-hidden", "true");
      r.style.animationDelay = (-Math.random() * 6).toFixed(2) + "s";
      el.appendChild(r);
    });
    if (reduced || !("IntersectionObserver" in window)) { boxes.forEach((el) => el.classList.add("bx-run")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("bx-run", e.isIntersecting)), { rootMargin: "80px 0px" });
    boxes.forEach((el) => io.observe(el));
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
  renderProgramming();
  egg();
  borders();
  boot(() => { typed(); observe(); });
})();
