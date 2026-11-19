/* ============================================================
   alnoman.infosec : renderer, charts and interactions
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
  const NS = "http://www.w3.org/2000/svg";
  /* colour names in data/site.js map to theme variables, so charts follow light / dark mode */
  const CV = { amber: "var(--gold)", teal: "var(--sea)", coral: "var(--signal)", lilac: "var(--plum)", sky: "var(--sky)", ink: "var(--ink-2)" };
  const cv = (n) => CV[n] || CV.coral;
  const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
  const NOW = new Date();
  const nowY = NOW.getFullYear() + NOW.getMonth() / 12;

  /* "Mar 2026 - Present" -> [2026.17, now] */
  function span(period) {
    const parts = String(period).split(/\s+-\s+/);
    const one = (s, end) => {
      if (/present|now|current/i.test(s)) return nowY;
      const m = s.match(/([A-Za-z]{3})?[a-z]*\s*(\d{4})/);
      if (!m) return NaN;
      const y = +m[2];
      const mo = m[1] ? MONTHS[m[1].toLowerCase()] : (end ? 11 : 0);
      return y + (mo + (end ? 1 : 0)) / 12;
    };
    return [one(parts[0], false), one(parts[1] || parts[0], true)];
  }
  function duration(a, b) {
    const m = Math.max(1, Math.round((b - a) * 12));
    const y = Math.floor(m / 12), r = m % 12;
    return [y ? `${y} yr${y > 1 ? "s" : ""}` : "", r ? `${r} mo${r > 1 ? "s" : ""}` : ""].filter(Boolean).join(" ");
  }

  /* ---------- icons ---------- */
  const sv = (p) => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${p}</svg>`;
  const I = {
    github: sv('<path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/>'),
    linkedin: sv('<path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z"/>'),
    scholar: sv('<path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm0-24L0 9.5l4.8 3.9C6.1 10.6 8.8 8.7 12 8.7s5.9 1.9 7.2 4.7L24 9.5 12 0Z"/>'),
    twitter: sv('<path d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.3h7l4.8 6.4 5.5-6.4Zm-1.2 17.9h1.9L7.1 4.2H5.1l11.9 16Z"/>'),
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6 9 7 9-7"/></svg>'
  };
  const linkLabels = { github: "GitHub", linkedin: "LinkedIn", scholar: "Google Scholar", twitter: "X", medium: "Medium", tryhackme: "TryHackMe", hackthebox: "Hack The Box" };
  const links = () => Object.entries(P.links || {}).filter(([, v]) => v);

  /* ---------- tooltip ---------- */
  const tip = $("#tip");
  function showTip(html, e) {
    tip.innerHTML = html; tip.classList.add("show");
    const x = Math.min(e.clientX + 14, innerWidth - tip.offsetWidth - 10);
    const y = e.clientY + 18 + tip.offsetHeight > innerHeight ? e.clientY - tip.offsetHeight - 12 : e.clientY + 18;
    tip.style.left = x + "px"; tip.style.top = y + "px";
  }
  const hideTip = () => tip.classList.remove("show");
  function tipOn(el, html) {
    el.addEventListener("mousemove", (e) => showTip(html, e));
    el.addEventListener("mouseleave", hideTip);
  }

  /* ---------- hero, about ---------- */
  function renderTop() {
    document.title = `${P.name} | ${P.title}`;
    const cur = (S.experience || [])[0] || {};
    $("#hero-kicker").textContent = `${P.title}${cur.org ? ", " + cur.org : ""}`;
    const parts = String(P.name).split(" "), last = parts.pop();
    $("#hero-name").innerHTML = `<span class="line"><span>${esc(parts.join(" "))}</span></span><span class="line"><span><em>${esc(last)}</em></span></span>`;
    $("#hero-lead").innerHTML = esc(P.lead || P.tagline).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
    $("#hero-social").innerHTML = links().filter(([k]) => I[k]).map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener" aria-label="${esc(linkLabels[k])}" title="${esc(linkLabels[k])}">${I[k]}</a>`).join("") +
      (P.email ? `<a href="mailto:${esc(P.email)}" aria-label="Email" title="Email">${I.mail}</a>` : "");
    if (P.avatar) { $("#portrait-img").src = P.avatar; $(".brand-pic").src = P.avatar; }
    $("#portrait-cap").innerHTML = `<span>${esc(P.location)}</span><span>23.81 N, 90.41 E</span>`;
    $("#stats").innerHTML = (S.stats || []).map((s) => `<div><dt><span data-count="${Number(s.value) || 0}">0</span>${s.suffix ? `<sup>${esc(s.suffix)}</sup>` : ""}</dt><dd>${esc(s.label)}</dd></div>`).join("");

    $("#about-text").innerHTML = (P.about || []).map((p) => `<p>${esc(p)}</p>`).join("");
    $("#now-list").innerHTML = (S.now || []).map((n) => `<li>${esc(n)}</li>`).join("");
    $("#focus").innerHTML = (P.chips || []).map((c) => esc(c.label || c)).join(' <span>/</span> ');

    $("#mail-big").href = P.email ? `mailto:${P.email}` : "#";
    $("#contact-links").innerHTML = (P.email ? [`<a href="mailto:${esc(P.email)}">${esc(P.email)}</a>`] : [])
      .concat(links().map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener">${esc(linkLabels[k] || k)}</a>`)).join("");
    $("#foot-name").textContent = P.fullName || P.name;
    $("#version").textContent = S.version || "";
    $("#updated").textContent = S.updated || "";
  }

  /* ---------- skills: radar chart + list ---------- */
  function renderSkills() {
    const sk = S.skills || [];
    const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
    $("#skills-title").innerHTML = `${words[sk.length] || sk.length} domains, one job: <em>find it before the attacker does.</em>`;
    const svg = $("#radar"), cx = 260, cy = 260, R = 178, n = sk.length;
    const ang = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const pt = (i, v) => [cx + Math.cos(ang(i)) * R * v, cy + Math.sin(ang(i)) * R * v];
    let h = "";
    [0.2, 0.4, 0.6, 0.8, 1].forEach((k) => {
      h += `<polygon class="grid" points="${sk.map((_, i) => pt(i, k).join(",")).join(" ")}"/>`;
    });
    sk.forEach((_, i) => { const [x, y] = pt(i, 1); h += `<line class="spoke" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`; });
    [40, 60, 80, 100].forEach((t) => { h += `<text class="tick" x="${cx + 4}" y="${cy - R * t / 100 + 3}">${t}</text>`; });
    const poly = sk.map((s, i) => pt(i, (s.level || 0) / 100).join(",")).join(" ");
    h += `<polygon class="area draw" points="${poly}"/>`;
    sk.forEach((s, i) => {
      const [x, y] = pt(i, (s.level || 0) / 100);
      h += `<circle class="pt" data-i="${i}" cx="${x}" cy="${y}" r="4.5"/>`;
      const [lx, ly] = pt(i, 1.14);
      const anchor = Math.abs(lx - cx) < 12 ? "middle" : lx > cx ? "start" : "end";
      const words = s.short || s.group;
      h += `<text class="lbl" data-i="${i}" x="${lx}" y="${ly + 4}" text-anchor="${anchor}">${esc(words)}</text>`;
    });
    svg.innerHTML = h;

    $("#skill-list").innerHTML = sk.map((s, i) => `
      <div class="skill-row${s.isNew ? " new" : ""}" data-i="${i}">
        <h4><i></i>${esc(s.group)}</h4><span class="lvl">${Number(s.level) || 0}</span>
        <div class="tools">${(s.items || []).map(esc).join(", ")}</div>
      </div>`).join("");

    const focus = (i, on) => {
      $$(`#radar [data-i="${i}"]`).forEach((el) => el.classList.toggle("on", on));
      const row = $(`.skill-row[data-i="${i}"]`); if (row) row.classList.toggle("on", on);
    };
    $$(".skill-row").forEach((row) => {
      row.addEventListener("mouseenter", () => focus(row.dataset.i, true));
      row.addEventListener("mouseleave", () => focus(row.dataset.i, false));
    });
    $$("#radar .pt, #radar .lbl").forEach((el) => {
      const s = sk[el.dataset.i];
      el.addEventListener("mouseenter", () => focus(el.dataset.i, true));
      el.addEventListener("mouseleave", () => { focus(el.dataset.i, false); hideTip(); });
      el.addEventListener("mousemove", (e) => showTip(`<b>${esc(s.group)}</b> ${s.level}<br>${(s.items || []).slice(0, 5).map(esc).join(", ")}`, e));
    });
  }

  /* ---------- experience: gantt + role list ---------- */
  function renderExperience() {
    const exp = (S.experience || []).map((e, i) => ({ ...e, i, r: span(e.period) }));
    const edu = (S.education || []).map((e) => ({ ...e, r: span(e.period) })).filter((e) => e.r[0] >= 2008);
    const all = exp.map((e) => e.r).concat(edu.map((e) => e.r));
    const y0 = Math.floor(Math.min(...all.map((r) => r[0]))), y1 = Math.ceil(nowY + 0.4);
    const pos = (y) => ((y - y0) / (y1 - y0)) * 100;
    const years = []; for (let y = y0; y <= y1; y++) years.push(y);
    const research = (e) => /research|university|m\.sc/i.test(e.role + " " + e.org);
    const lanes = [
      ["Work", exp.filter((e) => !research(e))],
      ["Research", exp.filter(research)],
      ["Study", edu]
    ];
    const bar = (e, kind) => {
      const c = cv(e.color || (kind === "edu" ? "sky" : "coral"));
      const label = kind === "edu" ? (e.degree.split(/[,(]/)[0]) : (e.org.split("(")[0]);
      return `<a class="g-bar ${kind}" href="#${kind === "edu" ? "experience" : "role-" + e.i}" data-k="${kind}" data-i="${e.i == null ? "" : e.i}" data-tip="${esc(kind === "edu" ? `<b>${e.degree}</b><br>${e.school}<br>${e.period}` : `<b>${e.role}</b><br>${e.org}<br>${e.period}`)}" style="--c:${c};left:${pos(e.r[0])}%;width:${Math.max(1.5, pos(e.r[1]) - pos(e.r[0]))}%">${esc(label.trim())}</a>`;
    };
    $("#gantt").innerHTML =
      `<div class="g-axis">${years.map((y) => `<span style="left:${pos(y)}%">${y}</span>`).join("")}</div>` +
      lanes.filter(([, items]) => items.length).map(([name, items]) =>
        `<div class="g-lane"><b>${name}</b><div class="g-track" style="--yr:${100 / (y1 - y0)}%">${items.map((e) => bar(e, name === "Study" ? "edu" : "work")).join("")}</div></div>`).join("") +
      `<div class="g-now" style="left:calc(120px + (100% - 120px) * ${pos(nowY) / 100})"><span>today</span></div>`;
    if (innerWidth <= 600) $(".g-now").style.left = `calc(64px + (100% - 64px) * ${pos(nowY) / 100})`;
    $$(".g-bar").forEach((b) => {
      b.addEventListener("mousemove", (e) => showTip(b.dataset.tip.replace(/&lt;(\/?)(b|br)&gt;/g, "<$1$2>"), e));
      b.addEventListener("mouseleave", () => { hideTip(); $$(".role.on").forEach((r) => r.classList.remove("on")); });
      b.addEventListener("mouseenter", () => { const r = $("#role-" + b.dataset.i); if (r) r.classList.add("on"); });
    });

    $("#roles").innerHTML = exp.map((e) => {
      const cur = /present|now|current/i.test(e.period);
      return `<article class="role reveal" id="role-${e.i}">
        <div class="role-when"><b>${esc(e.period)}</b>${esc(duration(e.r[0], e.r[1]))}${cur ? '<br><span class="now-tag">Current role</span>' : ""}</div>
        <div>
          <h4>${esc(e.role)}</h4>
          <div class="org"><b>${esc(e.org)}</b>${e.location ? `, ${esc(e.location)}` : ""}</div>
          <ul>${(e.points || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          ${e.tags && e.tags.length ? `<div class="stack">${e.tags.map(esc).join("  /  ")}</div>` : ""}
        </div>
      </article>`;
    }).join("");
    $("#edu").innerHTML = (S.education || []).map((e) => `
      <div class="edu-item reveal"><span class="yr">${esc(e.period)}</span><h5>${esc(e.degree)}</h5>${e.school ? `<p>${esc(e.school)}</p>` : ""}${e.note ? `<small>${esc(e.note)}</small>` : ""}</div>`).join("");
  }

  /* ---------- certifications: chronology + table ---------- */
  function renderCerts() {
    const certs = (S.certifications || []).map((c, i) => ({ ...c, i }));
    const catColor = S.certColors || { Offensive: "coral", "Threat Intel": "lilac", AppSec: "amber", Network: "sky", Infrastructure: "ink", Cloud: "teal" };
    const done = certs.filter((c) => c.status !== "in-progress");
    const issuers = new Set(done.map((c) => c.issuer)).size;
    const years = done.map((c) => +c.year).filter(Boolean);
    const yMin = Math.min(...years), yMax = Math.max(...years);
    $("#cert-title").innerHTML = `${done.length} certifications from ${issuers} issuers, <em>${yMin} to ${yMax}, from routers to red teams.</em>`;
    const cols = []; for (let y = yMin; y <= yMax; y++) cols.push(String(y));
    const wip = certs.filter((c) => c.status === "in-progress");
    if (wip.length) cols.push("Next");
    const grid = `grid-template-columns: repeat(${cols.length}, minmax(0, 1fr))`;
    const dot = (c) => `<span class="c-dot${c.status === "in-progress" ? " wip" : ""}" data-i="${c.i}" data-cat="${esc(c.category)}" style="--c:${cv(catColor[c.category])}">${esc(c.short)}</span>`;
    $("#chrono").innerHTML =
      `<div class="c-cols" style="${grid}">${cols.map((y) => `<div class="c-col">${certs.filter((c) => (y === "Next" ? c.status === "in-progress" : c.year === y && c.status !== "in-progress")).map(dot).join("")}</div>`).join("")}</div>` +
      `<div class="c-years" style="${grid}">${cols.map((y) => `<span>${y === "Next" ? "next" : "'" + y.slice(2)}</span>`).join("")}</div>`;
    const cats = [...new Set(certs.map((c) => c.category))];
    $("#cert-legend").innerHTML = cats.map((k) => `<button data-cat="${esc(k)}" style="--c:${cv(catColor[k])}"><i></i>${esc(k)} (${certs.filter((c) => c.category === k).length})</button>`).join("");
    const sorted = certs.slice().sort((a, b) => (b.status === "in-progress") - (a.status === "in-progress") || (+b.year || 0) - (+a.year || 0));
    $("#cert-table").innerHTML = sorted.map((c) => `
      <div class="cert-row" data-i="${c.i}" data-cat="${esc(c.category)}"><span class="y">${esc(c.year || "next")}</span>
        <span class="n">${c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.name)}</a>` : esc(c.name)}<small>${esc(c.issuer)}</small></span>
        <span class="s ${esc(c.status)}">${esc(c.status === "in-progress" ? "studying" : c.status)}</span></div>`).join("");

    const link = (i, on) => { $$(`[data-i="${i}"].c-dot, [data-i="${i}"].cert-row`).forEach((el) => el.classList.toggle("on", on)); };
    $$(".c-dot").forEach((d) => {
      const c = certs[d.dataset.i];
      d.addEventListener("mouseenter", () => link(d.dataset.i, true));
      d.addEventListener("mouseleave", () => { link(d.dataset.i, false); hideTip(); });
      d.addEventListener("mousemove", (e) => showTip(`<b>${esc(c.name)}</b><br>${esc(c.issuer)}${c.year ? ", " + esc(c.year) : ""}`, e));
    });
    $$(".cert-row").forEach((r) => { r.addEventListener("mouseenter", () => link(r.dataset.i, true)); r.addEventListener("mouseleave", () => link(r.dataset.i, false)); });
    const off = new Set();
    $$("#cert-legend button").forEach((b) => b.addEventListener("click", () => {
      const k = b.dataset.cat; off.has(k) ? off.delete(k) : off.add(k); b.classList.toggle("off", off.has(k));
      $$(".c-dot").forEach((d) => (d.style.display = off.has(d.dataset.cat) ? "none" : ""));
      $$(".cert-row").forEach((r) => r.classList.toggle("dim", off.has(r.dataset.cat)));
    }));
  }

  /* ---------- projects: expandable index ---------- */
  function renderProjects() {
    const pr = S.projects || [];
    const counts = {}; pr.forEach((p) => (counts[p.type] = (counts[p.type] || 0) + 1));
    $("#filters").innerHTML = [["All", pr.length]].concat(Object.entries(counts)).map(([k, n], i) => `<button class="${i ? "" : "on"}" data-f="${esc(k)}">${esc(k)}<sup>${n}</sup></button>`).join("");
    const label = { live: "Live", lab: "Lab", wip: "In progress" };
    $("#projects-index").innerHTML = pr.map((p, i) => `
      <div class="p-row${i === 0 ? " open" : ""}${p.featured ? " feat" : ""}" data-f="${esc(p.type)}">
        <button class="p-head" aria-expanded="${i === 0}">
          <span class="p-no">${String(i + 1).padStart(2, "0")}</span>
          <span class="p-name">${esc(p.name)}</span>
          <span class="p-type">${esc(p.type)}</span>
          <span class="p-status ${esc(p.status)}"><i></i>${esc(label[p.status] || p.status || "")}</span>
          <span class="p-plus" aria-hidden="true"></span>
        </button>
        <div class="p-body"><div><div class="p-inner">
          <p>${esc(p.desc)}</p>
          <div class="p-meta"><span>${(p.tags || []).map(esc).join("  /  ")}</span>
            ${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">Visit live site</a>` : ""}
            ${p.repo ? `<a href="${esc(p.repo)}" target="_blank" rel="noopener">Source on GitHub</a>` : ""}</div>
        </div></div></div>
      </div>`).join("");
    $$(".p-head").forEach((h) => h.addEventListener("click", () => {
      const row = h.parentElement, open = !row.classList.contains("open");
      row.classList.toggle("open", open); h.setAttribute("aria-expanded", open);
    }));
    $("#filters").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      $$("#filters button").forEach((x) => x.classList.toggle("on", x === b));
      $$(".p-row").forEach((r) => r.classList.toggle("hide", b.dataset.f !== "All" && r.dataset.f !== b.dataset.f));
    });
  }

  /* ---------- research ---------- */
  function renderResearch() {
    const R = S.research || {};
    const papers = (R.papers || []).slice().sort((a, b) => (b.cites || 0) - (a.cites || 0));
    $("#research-title").innerHTML = `${esc(R.headline || "Peer-reviewed work on fog, cloud and IoT security,")} <em>${esc(R.headlineTail || "cited " + (R.citations || 0) + " times.")}</em>`;
    $("#r-figures").innerHTML = [[R.citations, "Citations"], [R.hIndex, "h-index"], [R.i10Index, "i10-index"]].filter(([v]) => v != null)
      .map(([v, l]) => `<div class="r-fig"><b data-count="${v}">0</b><span>${l}</span></div>`).join("") +
      `<p class="r-interests">${(R.interests || []).map(esc).join(" / ")}</p>` +
      (R.scholarUrl ? `<a class="r-link" href="${esc(R.scholarUrl)}" target="_blank" rel="noopener">Google Scholar profile</a>` : "");
    const max = Math.max(1, ...papers.map((p) => p.cites || 0));
    $("#paper-bars").innerHTML = papers.map((p) => `
      <a class="bar-row" href="${esc(p.url || "#")}" target="_blank" rel="noopener">
        <span class="t">${esc(p.title)}</span>
        <span class="bar-track"><span class="bar-fill"><i data-w="${((p.cites || 0) / max) * 100}"></i></span><b>${Number(p.cites) || 0}</b></span>
        <span class="v">${esc(p.venue)}${p.year ? ", " + esc(p.year) : ""}</span>
      </a>`).join("");
    $("#posts").innerHTML = (S.posts || []).map((p) => `
      <a class="note reveal" href="${esc(p.url)}" target="_blank" rel="noopener"><span class="d">${esc(p.date)} / ${esc(p.tag)}</span><h5>${esc(p.title)}</h5></a>`).join("");
  }

  /* ---------- counters + reveal ---------- */
  function countUp(el) {
    const t = Number(el.dataset.count) || 0;
    if (reduced) { el.textContent = t; return; }
    const t0 = performance.now(), d = 1400;
    (function f(now) { const p = Math.min(1, (now - t0) / d); el.textContent = Math.round(t * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
  }
  function activate(el) {
    el.classList.add("in");
    $$("[data-count]", el).forEach(countUp);
    $$(".bar-fill i", el).forEach((b) => (b.style.width = b.dataset.w + "%"));
  }
  function observe() {
    const targets = $$(".reveal, .figures");
    if (!("IntersectionObserver" in window)) { targets.forEach(activate); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { activate(e.target); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    targets.forEach((el) => io.observe(el));
  }

  /* ---------- theme, nav, progress, back to top ---------- */
  function ui() {
    const root = document.documentElement;
    const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    $("#theme-btn").addEventListener("click", () => {
      const next = isDark() ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked */ }
    });

    const nav = $("#nav"), prog = $("#progress"), top = $("#to-top"), ring = $("#ring-val"), menuLinks = $$("#menu a");
    const sections = menuLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    const C = 131.95;
    const onScroll = () => {
      const y = scrollY, max = document.documentElement.scrollHeight - innerHeight, p = max > 0 ? y / max : 0;
      nav.classList.toggle("scrolled", y > 20);
      prog.style.width = p * 100 + "%";
      top.classList.toggle("show", y > innerHeight * 0.8);
      ring.style.strokeDashoffset = C * (1 - p);
      let cur = null; sections.forEach((s) => { if (s.offsetTop - 140 <= y) cur = s.id; });
      menuLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
    };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    top.addEventListener("click", () => scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));

    const btn = $("#menu-btn"), menu = $("#menu");
    btn.addEventListener("click", () => { btn.classList.toggle("open"); menu.classList.toggle("open"); });
    menuLinks.forEach((a) => a.addEventListener("click", () => { btn.classList.remove("open"); menu.classList.remove("open"); }));
  }

  /* ---------- shell ---------- */
  function shell() {
    const out = $("#shell-out"), input = $("#shell-in"), hist = []; let hi = 0;
    const print = (h) => { const d = document.createElement("div"); d.innerHTML = h; out.appendChild(d); out.scrollTop = out.scrollHeight; };
    const C = {
      help: () => 'commands: <span class="p">whoami about skills experience education certs projects papers contact social ls cat goto theme clear</span>',
      whoami: () => `<span class="y">${esc(P.fullName)}</span>\n${esc(P.title)}, ${esc(P.location)}`,
      about: () => (P.about || []).map(esc).join("\n\n"),
      skills: () => (S.skills || []).map((g) => { const n = Math.round((g.level || 0) / 5); return `${esc(g.group.padEnd(30))} <span class="p">${"#".repeat(n)}</span><span class="d">${".".repeat(20 - n)}</span> ${g.level}`; }).join("\n"),
      experience: () => (S.experience || []).map((e) => `<span class="y">${esc(e.period.padEnd(20))}</span> ${esc(e.role)} <span class="d">@ ${esc(e.org)}</span>`).join("\n"),
      education: () => (S.education || []).map((e) => `<span class="y">${esc(e.period.padEnd(20))}</span> ${esc(e.degree)} <span class="d">@ ${esc(e.school)}</span>`).join("\n"),
      certs: () => (S.certifications || []).map((c) => `${c.status === "in-progress" ? '<span class="m">[~]</span>' : '<span class="p">[+]</span>'} ${esc(c.short.padEnd(7))} <span class="d">${esc(c.name)}, ${esc(c.issuer)} ${esc(c.year)}</span>`).join("\n"),
      projects: () => (S.projects || []).map((p, i) => `<span class="y">${String(i + 1).padStart(2, "0")}</span> <span class="p">${esc(p.name)}</span> <span class="d">${esc(p.type)}</span>`).join("\n"),
      papers: () => ((S.research || {}).papers || []).map((p) => `<span class="y">[${esc(p.year)}]</span> ${esc(p.title)} <span class="d">(${p.cites} cites)</span>`).join("\n"),
      contact: () => P.email ? `<a href="mailto:${esc(P.email)}">${esc(P.email)}</a>` : "",
      social: () => links().map(([k, v]) => `${esc((linkLabels[k] || k).padEnd(15))} <a href="${esc(v)}" target="_blank" rel="noopener">${esc(v)}</a>`).join("\n"),
      ls: () => '<span class="c">about.md  skills/  experience.log  certs.txt  projects/  papers.bib  flag.txt</span>',
      cat: (a) => ({ "flag.txt": '<span class="m">FLAG{r3c0n_15_h4lf_th3_j0b}</span>\n<span class="d">Nice. Now say hi.</span>', "about.md": C.about(), "certs.txt": C.certs(), "experience.log": C.experience(), "papers.bib": C.papers() }[a] || `cat: ${esc(a || "")}: No such file or directory`),
      goto: (a) => { const el = a && document.getElementById(a); if (el) { el.scrollIntoView({ behavior: "smooth" }); return `-> #${esc(a)}`; } return "usage: goto about|skills|experience|certifications|projects|research|contact"; },
      theme: () => { $("#theme-btn").click(); return "theme toggled"; },
      sudo: () => '<span class="r">Permission denied.</span> This incident will be reported to the SOC. (That is me.)',
      clear: () => { out.innerHTML = ""; return null; }
    };
    print('Type <span class="p">help</span> to list commands.');
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const raw = input.value.trim(); input.value = "";
        print(`<span class="p">guest@alnoman:~$</span> ${esc(raw)}`);
        if (!raw) return; hist.push(raw); hi = hist.length;
        const [cmd, ...args] = raw.split(/\s+/), fn = C[cmd.toLowerCase()];
        const res = fn ? fn(args.join(" ")) : `<span class="r">command not found:</span> ${esc(cmd)}`;
        if (res != null) print(res);
      } else if (e.key === "ArrowUp") { if (hi > 0) input.value = hist[--hi]; e.preventDefault(); }
      else if (e.key === "ArrowDown") { input.value = hi < hist.length - 1 ? hist[++hi] : ((hi = hist.length), ""); e.preventDefault(); }
      else if (e.key === "Tab") { e.preventDefault(); const m = Object.keys(C).filter((k) => k.startsWith(input.value)); if (m.length === 1) input.value = m[0]; }
    });
    $("#shell").addEventListener("click", () => input.focus());
  }

  /* ---------- start ---------- */
  renderTop();
  renderSkills();
  renderExperience();
  renderCerts();
  renderProjects();
  renderResearch();
  ui();
  shell();
  observe();
  console.log("%cHello, fellow source reader. Try the shell: cat flag.txt", "font-family:monospace;color:#d9441f");
})();
