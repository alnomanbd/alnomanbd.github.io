# alnoman.infosec

Personal website of **Abdullah Al-Noman**, Senior Security Engineer (SOC, DevSecOps, Penetration Testing, Threat Intelligence, Security Research).

Pure HTML, CSS and JavaScript. No build step, no framework, no dependencies. Hosted free on GitHub Pages.

## Features

- "Intel Map" theme: deep navy, amber / teal / coral / lilac / sky accents, HUD corner brackets, dot grid, topographic contours
- Interactive constellation network background that reacts to the mouse
- Hero with typed roles, radar and a "CASE FILE" dossier card with photo scan and stamp
- Animated stats, colour coded skill cards, tool marquee, numbered career timeline
- Filterable certifications and projects (OP-01, OP-02 ... with LIVE / LAB / IN PROGRESS status)
- Research gauges (citations, h-index, i10) and paper cards
- Interactive shell (`help`, `whoami`, `skills`, `projects`, `cat flag.txt` ...)
- Mobile friendly dropdown menu, respects reduced motion
- Cache busting: the release script stamps `?v=<version>` on CSS/JS so visitors always get the new build

## Folder layout

```
index.html            page shell (rarely needs editing)
404.html              custom not found page
data/site.js          ALL CONTENT LIVES HERE
assets/css/style.css  theme and animations
assets/js/main.js     renderer and effects
assets/img/           favicon, avatar (replace avatar.svg with your photo)
scripts/release.ps1   version bump + commit + tag + push
VERSION               current version
CHANGELOG.md          history of changes
```

## How to update the site

1. Open `data/site.js` and edit what you need:
   - new project: add an item to `projects`
   - new certificate: add to `certifications`
   - new blog/note: add to the top of `posts`
   - new paper: add to `research.papers`
   - new job: add to the top of `experience`
2. Preview locally: just double click `index.html` (works without a server).
3. Release it:

```powershell
.\scripts\release.ps1 -Bump patch -Message "Added new project"
```

This bumps `VERSION`, updates the version and date shown in the footer, adds a CHANGELOG entry, commits, tags (`v1.0.1`) and pushes. GitHub Pages redeploys in about a minute.

Use `-Bump minor` for a new section or feature and `-Bump major` for a redesign. Add `-NoPush` to commit locally only.

### Use your photo

Put a square photo at `assets/img/avatar.jpg` and set `avatar: "assets/img/avatar.jpg"` in `data/site.js`.

### Add a resume

Put the file at `assets/resume.pdf` and set `resume: "assets/resume.pdf"`.

## Deploy on GitHub Pages (one time)

1. Repo Settings > Pages
2. Source: **Deploy from a branch**, Branch: **main**, folder **/ (root)**
3. Save. Site goes live at `https://alnomanbd.github.io/<repo-name>/`

### Custom domain (optional, later)

Add a `CNAME` file containing your domain (for example `alnoman.info`), then point DNS to GitHub Pages and enable "Enforce HTTPS" in Settings > Pages.

## License

Code: MIT. Content and personal information: all rights reserved.
