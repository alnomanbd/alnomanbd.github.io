/* ============================================================
   alnoman.infosec : renderer + animations
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

  /* ---------- icons ---------- */
  const I = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z"/></svg>',
    scholar: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm0-24L0 9.5l4.8 3.9C6.1 10.6 8.8 8.7 12 8.7s5.9 1.9 7.2 4.7L24 9.5 12 0Z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.3h7l4.8 6.4 5.5-6.4Zm-1.2 17.9h1.9L7.1 4.2H5.1l11.9 16Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
    medium: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 12a6.8 6.8 0 1 1-13.5 0 6.8 6.8 0 0 1 13.5 0Zm7.4 0c0 3.5-1.5 6.4-3.4 6.4s-3.4-2.9-3.4-6.4 1.5-6.4 3.4-6.4 3.4 2.9 3.4 6.4ZM24 12c0 3.2-.5 5.7-1.2 5.7s-1.2-2.6-1.2-5.7.5-5.7 1.2-5.7S24 8.8 24 12Z"/></svg>',
    tryhackme: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 17l6-6-6-6M12 19h8"/></svg>',
    hackthebox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"/><path d="M12 22V12M3 7l9 5 9-5"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>',
    folder: '<svg class="folder" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2Z"/><path d="m9 13 2 2-2 2M13 17h3"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>',
    skull: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 3 1.6 5 3 6v3h10v-3c1.4-1 3-3 3-6a8 8 0 0 0-8-8Z"/><circle cx="9" cy="11" r="1.5"/><circle cx="15" cy="11" r="1.5"/><path d="M10 19v3M14 19v3"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6M14 4l-4 16"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.8A6 6 0 0 0 4.3 12 3.5 3.5 0 0 0 6.5 19h11Z"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>'
  };
  const linkLabels = { github: "GitHub", linkedin: "LinkedIn", scholar: "Google Scholar", twitter: "X / Twitter", medium: "Medium", tryhackme: "TryHackMe", hackthebox: "Hack The Box" };

  function socialLinks() {
    const out = [];
    const L = P.links || {};
    Object.keys(L).forEach((k) => {
      if (L[k]) out.push(`<a class="icon-link" href="${esc(L[k])}" target="_blank" rel="noopener" aria-label="${esc(linkLabels[k] || k)}" title="${esc(linkLabels[k] || k)}">${I[k] || I.external}</a>`);
    });
    if (P.email) out.push(`<a class="icon-link" href="mailto:${esc(P.email)}" aria-label="Email" title="Email">${I.mail}</a>`);
    return out.join("");
  }

  /* ---------- render ---------- */
  function render() {
    document.title = `${P.name || "Portfolio"} | ${P.title || "Security Engineer"}`;
    const nameEl = $("#hero-name");
    nameEl.textContent = P.name || "";
    nameEl.dataset.text = P.name || "";
    $("#hero-tag").textContent = P.tagline || "";
    $("#hero-social").innerHTML = socialLinks();
    $("#contact-links").innerHTML = socialLinks();
    if (P.email) $("#mail-btn").href = `mailto:${P.email}`;
    $("#foot-name").textContent = P.handle || "";
    $("#version").textContent = S.version || "";
    $("#updated").textContent = S.updated || "";
    if (P.avatar) $("#avatar").src = P.avatar;

    $("#stats").innerHTML = (S.stats || []).map((s) =>
      `<div class="stat reveal"><b data-count="${Number(s.value) || 0}" data-suffix="${esc(s.suffix)}">0${esc(s.suffix)}</b><span>${esc(s.label)}</span></div>`).join("");

    const about = (P.about || []).map((p) => `<p>${esc(p)}</p>`).join("");
    const chips = [
      P.location && `<span class="chip"><b>loc:</b> ${esc(P.location)}</span>`,
      P.title && `<span class="chip"><b>role:</b> ${esc(P.title)}</span>`,
      `<span class="chip"><b>status:</b> learning_forever</span>`
    ].filter(Boolean).join("");
    $("#about-text").innerHTML = about + `<div class="about-meta">${chips}</div>` +
      (P.resume ? `<p style="margin-top:22px"><a class="btn btn-ghost" href="${esc(P.resume)}" target="_blank" rel="noopener"><span>download_resume.pdf</span></a></p>` : "");
    $("#now-list").innerHTML = (S.now || []).map((n) => `<li>${esc(n)}</li>`).join("");

    $("#skills-grid").innerHTML = (S.skills || []).map((g) => `
      <div class="skill-card reveal">
        <div class="skill-head"><div class="skill-icon">${I[g.icon] || I.shield}</div><h4>${esc(g.group)}</h4></div>
        <div class="bar"><i data-w="${Number(g.level) || 0}"></i></div>
        <div class="bar-label"><span>proficiency</span><span>${Number(g.level) || 0}%</span></div>
        <div class="tags">${(g.items || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </div>`).join("");

    const ars = (S.arsenal || []).map((t) => `<span>${esc(t)}</span>`).join("");
    $("#arsenal").innerHTML = ars + ars;

    $("#timeline").innerHTML = (S.experience || []).map((e, i) => `
      <div class="tl-item reveal ${i === 0 && /present|now|current/i.test(e.period) ? "current" : ""}">
        <div class="tl-card">
          <div class="tl-top"><h4>${esc(e.role)}</h4><span class="tl-period">${esc(e.period)}</span></div>
          <div class="tl-org">@ ${esc(e.org)}${e.location ? ` <span>| ${esc(e.location)}</span>` : ""}</div>
          <ul>${(e.points || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          <div class="tags">${(e.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </div>
      </div>`).join("");

    $("#certs").innerHTML = (S.certifications || []).map((c) => {
      const st = c.status === "in-progress" ? "in-progress" : "active";
      const inner = `<div class="cert-badge">${esc(c.short)}</div>
        <div><h5>${esc(c.name)}</h5><p>${esc(c.issuer)}${c.year ? " | " + esc(c.year) : ""}</p></div>
        <span class="status ${st}">${st === "active" ? "VERIFIED" : "IN PROGRESS"}</span>`;
      return c.url ? `<a class="cert ${st}" href="${esc(c.url)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="cert ${st}">${inner}</div>`;
    }).join("");

    $("#edu").innerHTML = (S.education || []).map((e) => `
      <div class="edu-item"><span class="tl-period">${esc(e.period)}</span><h5>${esc(e.degree)}${e.school ? ", " + esc(e.school) : ""}</h5>${e.note ? `<p>${esc(e.note)}</p>` : ""}</div>`).join("");

    renderProjects();

    const R = S.research || {};
    const papers = (R.papers || []).map((p) => `
      <div class="paper"><a href="${esc(p.url || "#")}" target="_blank" rel="noopener">${esc(p.title)}</a><p>${esc(p.venue)}${p.year ? " | " + esc(p.year) : ""}${p.cites ? ` | <span class="g">${Number(p.cites)} citations</span>` : ""}</p></div>`).join("");
    const interests = (R.interests || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
    $("#research-card").innerHTML = `
      <p class="mono g small">// research.profile</p>
      <h4>Security Research</h4>
      <p>${esc(R.summary)}</p>
      <div class="metric-row">
        <div class="metric"><b data-count="${Number(R.citations) || 0}">0</b><span>citations</span></div>
        <div class="metric"><b data-count="${Number(R.hIndex) || 0}">0</b><span>h-index</span></div>
        ${R.i10Index ? `<div class="metric"><b data-count="${Number(R.i10Index)}">0</b><span>i10-index</span></div>` : ""}
      </div>
      ${interests ? `<div class="tags" style="margin-bottom:16px">${interests}</div>` : ""}
      ${papers}
      ${R.scholarUrl ? `<a class="btn btn-ghost" href="${esc(R.scholarUrl)}" target="_blank" rel="noopener" style="margin-top:14px"><span>open_google_scholar</span></a>` : ""}`;

    $("#posts").innerHTML = (S.posts || []).map((p) => `
      <a class="post" href="${esc(p.url)}" target="_blank" rel="noopener">
        <time>${esc(p.date)} | ${esc(p.tag)}</time><span>${esc(p.title)}</span><span class="arrow">&gt;</span>
      </a>`).join("");
  }

  function renderProjects() {
    const projects = S.projects || [];
    const tags = ["all"].concat([...new Set(projects.map((p) => p.type))]);
    $("#filters").innerHTML = tags.map((t, i) => `<button class="${i === 0 ? "on" : ""}" data-f="${esc(t)}">${esc(t.toLowerCase())}</button>`).join("");
    $("#projects-grid").innerHTML = projects.map((p) => {
      const links = [
        p.repo && `<a href="${esc(p.repo)}" target="_blank" rel="noopener" aria-label="Source code">${I.github}</a>`,
        p.url && `<a href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="Live site">${I.external}</a>`
      ].filter(Boolean).join("");
      return `<article class="project reveal ${p.featured ? "featured" : ""}" data-type="${esc(p.type)}">
        ${p.featured ? '<span class="star">FEATURED</span>' : ""}
        <div class="project-top">${I.folder}<div class="project-links">${links}</div></div>
        <div class="project-type">${esc(p.type)}</div>
        <h4>${esc(p.name)}</h4>
        <p>${esc(p.desc)}</p>
        <div class="tags">${(p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </article>`;
    }).join("");
    $("#filters").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      $$("#filters button").forEach((x) => x.classList.toggle("on", x === b));
      const f = b.dataset.f;
      $$(".project").forEach((el) => el.classList.toggle("hide", f !== "all" && el.dataset.type !== f));
    });
  }

  /* ---------- boot sequence ---------- */
  function boot(done) {
    const el = $("#boot");
    let seen = false;
    try { seen = sessionStorage.getItem("booted") === "1"; } catch (e) { /* ignore */ }
    if (reduced || seen) { el.classList.add("done"); done(); return; }
    const lines = [
      ['<span class="dim">[    0.000000]</span> Initializing secure kernel...', 120],
      ['<span class="dim">[    0.041337]</span> Loading modules: <span class="ok">soc</span> <span class="ok">appsec</span> <span class="ok">pentest</span> <span class="ok">cti</span>', 160],
      ['<span class="dim">[    0.133700]</span> Mounting /dev/brain ............ <span class="ok">[ OK ]</span>', 140],
      ['<span class="dim">[    0.271828]</span> Starting firewall ............... <span class="ok">[ OK ]</span>', 120],
      ['<span class="dim">[    0.314159]</span> Checking caffeine levels ........ <span class="warn">[ LOW ]</span>', 160],
      ['<span class="dim">[    0.420000]</span> Establishing encrypted tunnel ... <span class="ok">[ OK ]</span>', 140],
      ['', 60],
      ['<span class="ok">ACCESS GRANTED.</span> Welcome to alnoman.infosec', 420]
    ];
    const log = $("#boot-log");
    let i = 0;
    const skip = () => { el.classList.add("done"); try { sessionStorage.setItem("booted", "1"); } catch (e) { /* ignore */ } done(); done = () => {}; };
    el.addEventListener("click", skip);
    (function next() {
      if (i >= lines.length) { setTimeout(skip, 350); return; }
      log.innerHTML += lines[i][0] + "\n";
      setTimeout(next, lines[i++][1]);
    })();
  }

  /* ---------- matrix rain ---------- */
  function matrix() {
    if (reduced) return;
    const c = $("#matrix"), ctx = c.getContext("2d");
    const chars = "01アイウエオカキクケコサシスセソ<>/{}[]$#@%&*ABCDEF0123456789";
    let w, h, cols, drops, fs = 15;
    const size = () => {
      w = c.width = innerWidth; h = c.height = innerHeight;
      cols = Math.floor(w / fs); drops = Array(cols).fill(0).map(() => Math.random() * -60);
    };
    size(); addEventListener("resize", size);
    let last = 0;
    (function draw(t) {
      requestAnimationFrame(draw);
      if (t - last < 55) return; last = t;
      ctx.fillStyle = "rgba(4,7,11,0.12)"; ctx.fillRect(0, 0, w, h);
      ctx.font = fs + "px JetBrains Mono, monospace";
      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.975 ? "#c8ffe9" : "#00ff9c";
        ctx.fillText(ch, i * fs, drops[i] * fs);
        if (drops[i] * fs > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    })(0);
  }

  /* ---------- typed roles ---------- */
  function typed() {
    const el = $("#typed"), roles = P.roles && P.roles.length ? P.roles : [P.title || ""];
    if (reduced) { el.textContent = roles[0]; return; }
    let r = 0, ch = 0, del = false;
    (function tick() {
      const word = roles[r];
      el.textContent = word.slice(0, ch);
      if (!del && ch < word.length) { ch++; setTimeout(tick, 55 + Math.random() * 50); }
      else if (!del) { del = true; setTimeout(tick, 1700); }
      else if (ch > 0) { ch--; setTimeout(tick, 28); }
      else { del = false; r = (r + 1) % roles.length; setTimeout(tick, 300); }
    })();
  }

  /* ---------- hero terminal ---------- */
  function heroTerm() {
    const el = $("#hero-term");
    const certs = (S.certifications || []).filter((c) => c.status !== "in-progress").map((c) => c.short).join(", ") || "n/a";
    const script = [
      ["cmd", "nmap -sV alnoman.infosec"],
      ["out", '<span class="d">Starting Nmap 7.95 ( https://nmap.org )</span>'],
      ["out", '<span class="c">PORT     STATE  SERVICE</span>'],
      ["out", '22/tcp   <span class="p">open</span>   blue-team-ops'],
      ["out", '443/tcp  <span class="p">open</span>   appsec-devsecops'],
      ["out", '1337/tcp <span class="p">open</span>   offensive-security'],
      ["out", '8443/tcp <span class="p">open</span>   threat-intel'],
      ["cmd", "cat profile.json | jq '.certs'"],
      ["out", `<span class="y">"${esc(certs)}"</span>`],
      ["cmd", "./status --now"],
      ["out", '<span class="p">[+]</span> Defending networks. Hunting threats.'],
      ["out", '<span class="p">[+]</span> Breaking apps (with permission).'],
      ["out", '<span class="m">[!]</span> Coffee level critical. Refilling...']
    ];
    if (reduced) {
      el.innerHTML = script.map(([t, s]) => (t === "cmd" ? `<span class="p">$</span> ${esc(s)}` : s)).join("\n");
      return;
    }
    let i = 0;
    (function next() {
      if (i >= script.length) {
        el.innerHTML += '<span class="p">$</span> <span class="caret">_</span>';
        setTimeout(() => { el.innerHTML = ""; i = 0; next(); }, 6000);
        return;
      }
      const [type, text] = script[i++];
      if (type === "cmd") {
        let k = 0;
        el.innerHTML += '<span class="p">$</span> ';
        const holder = document.createElement("span");
        el.appendChild(holder);
        (function t() {
          holder.textContent = text.slice(0, ++k);
          if (k < text.length) setTimeout(t, 35 + Math.random() * 40);
          else { el.appendChild(document.createTextNode("\n")); setTimeout(next, 350); }
        })();
      } else {
        el.innerHTML += text + "\n";
        setTimeout(next, 110);
      }
    })();
  }

  /* ---------- counters, bars, reveal ---------- */
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
  function observe() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add("in");
        $$("[data-count]", el).forEach(countUp);
        if (el.matches("[data-count]")) countUp(el);
        $$(".bar i", el).forEach((b) => (b.style.width = b.dataset.w + "%"));
        io.unobserve(el);
      });
    }, { threshold: 0.15 });
    $$(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 3) * 0.08 + "s"; io.observe(el); });
    $$(".metric b[data-count]").forEach((el) => io.observe(el));
  }

  /* ---------- nav, progress, cursor, tilt ---------- */
  function ui() {
    const nav = $("#nav"), prog = $("#progress"), links = $$("#menu a");
    const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    const onScroll = () => {
      const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
      nav.classList.toggle("scrolled", y > 30);
      prog.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
      let cur = null;
      sections.forEach((s) => { if (s.offsetTop - 140 <= y) cur = s.id; });
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
    };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();

    const btn = $("#menu-btn"), menu = $("#menu");
    btn.addEventListener("click", () => { btn.classList.toggle("open"); menu.classList.toggle("open"); });
    links.forEach((a) => a.addEventListener("click", () => { btn.classList.remove("open"); menu.classList.remove("open"); }));

    const glow = $("#cursor-glow");
    if (matchMedia("(pointer: fine)").matches && !reduced) {
      addEventListener("mousemove", (e) => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; });
      $$(".skill-card, .project").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
          card.style.setProperty("--mx", x + "px"); card.style.setProperty("--my", y + "px");
          if (card.classList.contains("skill-card")) {
            const rx = ((y / r.height) - 0.5) * -6, ry = ((x / r.width) - 0.5) * 6;
            card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
          }
        });
        card.addEventListener("mouseleave", () => { card.style.transform = ""; });
      });
    } else glow.style.display = "none";
  }

  /* ---------- interactive shell ---------- */
  function shell() {
    const out = $("#shell-out"), input = $("#shell-in");
    const hist = []; let hi = 0;
    const print = (html, cls) => { const d = document.createElement("div"); if (cls) d.className = cls; d.innerHTML = html; out.appendChild(d); out.scrollTop = out.scrollHeight; };
    const C = {
      help: () => [
        '<span class="c">Available commands:</span>',
        '  <span class="p">whoami</span>       who is this guy',
        '  <span class="p">about</span>        short bio',
        '  <span class="p">skills</span>       skill matrix',
        '  <span class="p">experience</span>   career history',
        '  <span class="p">projects</span>     things I built',
        '  <span class="p">certs</span>        certifications',
        '  <span class="p">contact</span>      how to reach me',
        '  <span class="p">social</span>       profile links',
        '  <span class="p">version</span>      site version',
        '  <span class="p">ls</span> / <span class="p">cat</span>     look around',
        '  <span class="p">goto</span> &lt;section&gt; jump to a section',
        '  <span class="p">matrix</span>       toggle the rain',
        '  <span class="p">clear</span>        clear screen'
      ].join("\n"),
      whoami: () => `<span class="p">${esc(P.fullName || P.name)}</span>\n${esc(P.title)} | ${esc(P.location)}\n<span class="d">${esc(P.tagline)}</span>`,
      about: () => (P.about || []).map(esc).join("\n\n"),
      skills: () => (S.skills || []).map((g) => {
        const n = Math.round((g.level || 0) / 5);
        return `<span class="c">${esc(g.group.padEnd(26))}</span> <span class="p">${"#".repeat(n)}</span><span class="d">${".".repeat(20 - n)}</span> ${g.level}%`;
      }).join("\n"),
      experience: () => (S.experience || []).map((e) => `<span class="y">${esc(e.period.padEnd(12))}</span> ${esc(e.role)} <span class="d">@ ${esc(e.org)}</span>`).join("\n"),
      projects: () => (S.projects || []).map((p) => `<span class="p">${esc(p.name)}</span> <span class="d">[${esc(p.type)}]</span>\n  ${esc(p.desc)}${p.url ? `\n  <a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.url)}</a>` : ""}`).join("\n\n"),
      certs: () => (S.certifications || []).map((c) => `${c.status === "in-progress" ? '<span class="y">[~]</span>' : '<span class="p">[+]</span>'} ${esc(c.short)} <span class="d">${esc(c.name)} | ${esc(c.issuer)}</span>`).join("\n"),
      contact: () => P.email ? `email: <a href="mailto:${esc(P.email)}">${esc(P.email)}</a>` : "No email configured.",
      social: () => Object.entries(P.links || {}).filter(([, v]) => v).map(([k, v]) => `${esc((linkLabels[k] || k).padEnd(15))} <a href="${esc(v)}" target="_blank" rel="noopener">${esc(v)}</a>`).join("\n"),
      version: () => `alnoman.infosec v${esc(S.version)} <span class="d">(updated ${esc(S.updated)})</span>`,
      ls: () => '<span class="c">about.md  skills/  experience.log  projects/  certs.txt  contact.sh  flag.txt</span>',
      cat: (a) => {
        if (!a) return "usage: cat &lt;file&gt;";
        if (a === "flag.txt") return '<span class="m">FLAG{y0u_f0und_th3_h4ck3r_in_m3}</span>\n<span class="d">Nice. Now go hire me.</span>';
        if (a === "about.md") return C.about();
        if (a === "certs.txt") return C.certs();
        if (a === "experience.log") return C.experience();
        if (a === "contact.sh") return C.contact();
        return `cat: ${esc(a)}: No such file or directory`;
      },
      goto: (a) => { const el = a && document.getElementById(a.replace("#", "")); if (el) { el.scrollIntoView({ behavior: "smooth" }); return `jumping to #${esc(a)}...`; } return "usage: goto about|skills|experience|projects|research|contact"; },
      sudo: () => '<span class="r">Permission denied.</span> This incident will be reported to the SOC. (Which is me.)',
      "rm": () => '<span class="r">Nice try.</span> Write access denied.',
      hack: () => '<span class="p">Initiating hack...</span>\n<span class="d">Just kidding. Ethical hackers ask for permission first.</span>',
      matrix: () => { const m = $("#matrix"); m.style.display = m.style.display === "none" ? "" : "none"; return "matrix rain toggled."; },
      clear: () => { out.innerHTML = ""; return null; },
      exit: () => "There is no escape. Try <span class=\"p\">contact</span> instead."
    };
    print('<span class="p">alnoman.infosec</span> interactive shell <span class="d">v' + esc(S.version) + '</span>\nType <span class="p">help</span> to see available commands.\n');
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
      else if (e.key === "Tab") {
        e.preventDefault();
        const m = Object.keys(C).filter((k) => k.startsWith(input.value));
        if (m.length === 1) input.value = m[0];
      }
    });
    $("#shell").addEventListener("click", () => input.focus());
  }

  /* ---------- console easter egg ---------- */
  function egg() {
    console.log("%c alnoman.infosec ", "background:#00ff9c;color:#000;font-weight:bold;font-size:14px;padding:4px 8px");
    console.log("%cLooking at the source? Respect. Try the interactive shell and run: cat flag.txt", "color:#00ff9c");
  }

  /* ---------- start ---------- */
  render();
  matrix();
  ui();
  shell();
  egg();
  boot(() => { typed(); heroTerm(); observe(); });
})();
