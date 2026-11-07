# Project context log

Shared project memory for every Claude session. Read this first. Keep it short and current.
Newest entries go at the top of the Decision log. Never delete history; mark old decisions "superseded" instead.

## Snapshot

- **What:** personal portfolio for Adinath Sakhare ("Adiii"), UI/UX designer. Frontend only, deployed to GitHub Pages.
- **Stack:** Vite + React 19, GSAP (+ ScrollTrigger, Draggable), Lenis, plain CSS with design tokens (`src/styles/tokens.css`). No Tailwind.
- **Design source:** Figma file `nw2arKxj55OydizYLOavz5` (Desktop 26:54, Tablet 26:197, Phone 26:394). Match its measurements exactly; never approximate from screenshots.
- **Deploy:** `npm run deploy` (gh-pages), Vite `base: './'`. Dev server: `npm run dev -- --port 5173`.
- **Contact data:** `src/data/profile.js`. Projects: `src/data/projects.js`.

## Working rules

- Semantic HTML, human-readable class names, short comments that explain why.
- Don't invent achievements, clients or numbers. Ask when info is missing.
- Challenge weak ideas like a senior designer would; don't just agree.
- Hero is a "design canvas" (Simon-Thai-inspired): plain even grid, draggable pieces, personalised elements.

## Layout map

- Breakpoints: desktop >=1200 (absolute canvas), tablet 768-1199 (some items hidden), phone <768 (stacked column, no dragging).
- `src/components/Hero.jsx/.css`: canvas hero. `DRAGGABLE_SELECTORS` lists draggable items; the main frame is NOT draggable.
- `src/components/buddyBrain.js`: Claude-bot behaviour engine (two bots: on the photo and on the main frame). `ClaudeBuddy.jsx` renders the SVG.
- `src/components/SiteHeader.*`: glass navbar; the "Available for Work" row folds on scroll.
- Archived, unused: `src/archive-v1/`.

## Decision log

Format: `YYYY-MM-DD - decision (why)`.

- 2026-11-07 - Bio text size now equals the Ethos quote (48 / 28 / 22px desktop / tablet / phone), weight 500 for both; deliberately departs from the Figma 64/34/24 for the bio. (user request)
- 2026-11-07 - Bio (Introduction) text weight 600 -> 500 so it matches the Ethos quote (500). Sizes still differ (64 vs 48). (user request)
- 2026-11-08 - Hero cards no longer drift with the mouse (parallax removed from `Hero.jsx`; the `canvas-drift` wrappers and `data-depth` attributes are now unused but harmless). The orange "You" cursor still follows the pointer. Dragging unaffected. (user request)
- 2026-11-08 - Footer (Contact) background is solid again (`--color-contact-surface`), so the dot grid does not show there; removed the translucent `--color-contact-overlay` token. (user request)
- 2026-11-08 - Theme switch: default position moved to the header strip LEFT of the navbar (`left: calc(50% - 330px)`, top 38px below header top), ~15% smaller (76x40 track, 33px thumb), "lights?" caption removed. (user request, from a screenshot of where they wanted it)
- 2026-11-08 - Navbar theme button removed. Theme is now a draggable easter-egg pill switch on the hero canvas (`ThemeSwitch.jsx/.css`, in the strip right of the navbar; desktop >=1200 only, hidden on tablet and phone like the other easter eggs, per user), no caption. Look follows the reference: track + thumb, icon lives in the thumb (sun on dark thumb = light mode, moon on white thumb = dark mode, thumb left in dark/right in light), stars twinkle on the night track, springy slide, thumb stretches while pressed. Light is ALWAYS the default (no system/time detection); a switch is remembered for the visit only (`sessionStorage`, restored pre-paint in `index.html`). Draggable uses `dragClickables` for this one item so a click toggles and a drag moves. (user request; supersedes 2026-11-07 navbar toggle + system-setting default)
- 2026-11-08 - Bot eyes floating above the body after idle: cause was `think` tweening eyes `y:-4` while a blink was scaling the same group around `svgOrigin` (GSAP bakes ~34 units of pivot compensation into y; clash left it stuck). Fix: eyes now have an outer group (x/y only, `.buddy-eyes-normal`) and an inner group (scale only, `.buddy-eyes-scale`, `eyeScale` in `buddyBrain.js`). Rule: never tween position and scale-with-svgOrigin on the same SVG element.
- 2026-11-07 - Dark theme built. `:root[data-theme='dark']` in `tokens.css` overrides colour tokens (page #0e1117, surfaces #181d26, text #e8ebf1, blue accent lifted to #5573fa); components use semantic tokens only (`--color-surface`, `--color-heading`, `--color-on-sticker`, `--name-gradient`, `--nav-glass*`, etc.), no raw hex. Primary button inverts via `--color-button-charcoal` (fill) / `--color-paper` (text). Toggle button (`.theme-toggle` in `SiteHeader`) sits top-right, same height as the navbar link row (45px desktop, 39px tablet/phone; on phone the navbar narrows to make room). Theme = saved choice in localStorage `theme`, else system setting; set before first paint by a script in `index.html`; `useTheme` hook handles switching with a 350ms colour cross-fade. Keep new colours as tokens with a dark value. (user request)
- 2026-11-07 - Gap between projects in the Work section: 120px desktop, 96px tablet, 80px phone. (user request)
- 2026-11-07 - Dots were hidden by `body`'s own background; body background removed (html paints the white), dot alpha 0.12. Gotcha: never give `body` a background or the fixed dot layer disappears.
- 2026-11-07 - Dots lighter (0.1 alpha) and fixed: one `body::before` layer with `position: fixed` (iOS ignores `background-attachment: fixed`), Contact surface made translucent so dots show through. Work section gap under heading 64px (48 tablet). On touch devices (`hover: none`) a bento tile plays its hover effect while its centre is within ±10% of viewport height of screen centre (was 20%, tightened by user) (`useCenterActiveTiles`). Dev server now runs with `--host` (in `.claude/launch.json`) for phone testing on the LAN. (user request)
- 2026-11-07 - Sections below the hero get a light dot grid (24px cell, same as the hero's line grid, dots on the line crossings) on `body` and Contact; tokens `--dot-color/--dot-cell/--dot-pattern` in `tokens.css`. The black marquee stays solid. (user request)
- 2026-11-07 - Work section type matches the rest of the site: section heading 34/600 black, project titles 28/600 black (36/600 + 30/700 too big/bold, 500 too thin), 16px light descriptions (user said "slight" bigger; first try at 48/40 was too big). Tools show as bare logos (44px, no badge, no "Built with" label). (user request)
- 2026-11-07 - Work section rebuilt after aromaal.framer.website: per project a bento grid of separate tiles (3 layouts: tall-centre, wide-left, offset-four), then title + short description on the left and "Built with" tool logos (Figma, Claude Code, ChatGPT Codex) on the right. Each tile has its own hover (zoom / rotate / zoom-rotate, set per tile in `src/data/projects.js`). Dummy data and placeholder SVGs for now; no case-study/detail pages yet. Replaces the old 2-card layout and its Figma tablet/phone specs. (user request)
- 2026-11-07 - "Adinath S." cursor moved from the left of the frame to the empty space right of the bottom-right corner handle (desktop only). (user request)
- 2026-11-07 - Bots open with only 4 funny intro lines (frame/photo take turns, random gaps, `INTRO` in `buddyBrain.js`) while strolling about, then switch to random chatter. Both bots share a recent-lines list so they never repeat each other. (user: intro must be convo starters aimed at HR: greet, "hire him", "good designer", available; keep claims true to the site)
- 2026-11-07 - Created `context.md` and `CLAUDE.md` as project-level memory shared across sessions.
- 2026-11-01 - Bots: hover = being petted like a cat (calm eyes up, purr, lasts while hovering); tap/click = bot falls over and gets up; 3+ taps = grumpier lines. (user request)
- 2026-11-01 - Bots get tool/AI humour (Figma, MCP, plugins, prompts, Claude Code) as a `toolTalk` moment plus extra lines in existing pools.
- 2026-11-01 - Bots hovered/tapped mid-action answer in character instead of being interrupted, except while walking/running.
- 2026-11-01 - Main frame is non-draggable; photo is 13% smaller on desktop; Claude logo sits 34px further left; sticky->photo arrow is above the photo (z-index 5).
- 2026-11-01 - Favicon is a face crop of the photo (`public/favicon.jpg`).
- Earlier - Logos (Figma, Claude, Codex) are separate stickers, ~10-15% smaller on desktop; Figma bottom-right under the photo, Claude left of the prompt editor.
- Earlier - Drag area extends above the navbar (no locked zones); dropped items can sit over the navbar.
- Earlier - Prompt editor at bottom centre doubles as a contact form (opens mailto). It rests 2.5% bigger and returns to rest size on blur.
- Earlier - Nav: only the "Available for Work" row folds on any downward scroll (900ms, soft), glass blur background.
- Earlier - Light theme, white + charcoal. Dark mode not built (optional later). (superseded 2026-11-07: dark theme now built)
- Earlier - Case studies and resume not ready yet; use the supplied project screenshots as placeholders.

## Chat history digest (from sessions up to 2026-11-07)

Condensed from the full conversation so a fresh session doesn't need the transcript.

**Brief and positioning**
- Goal: premium, minimal, distinctive portfolio; main inspiration https://simon-thai.com. Light theme, white + charcoal; dark mode only if easy.
- Adinath wants a senior-designer partner: challenge ideas, keep code clean and human-readable, ask rather than guess.
- Original deadline was 9 days. Case studies and resume weren't ready; supplied screenshots are placeholders.

**How the build evolved**
1. First draft + polished draft, then a slider for work.
2. Switched to implementing Adinath's own Figma design with exact measurements (no screenshot approximation).
3. Navbar: sticky glass blur; only the "Available for Work" row folds on any downward scroll (slow, soft). Fold listens to wheel/touch/keys/scroll.
4. Hero redesigned as a Simon-Thai-style design canvas: plain even grid (faint, reaches the top), draggable pieces, personal photo stack ("hi, I'm Adiii"), sticky note, process card, palette chips, real logo SVGs (Figma, Claude, Codex from LobeHub icons, not hand-drawn), doodles/arrows, two cursors, and a prompt editor at the bottom centre ("Adiii 2.0").
5. Two animated Claude Code bots (one on the photo, one on the main frame): own SVG, walk on the surface line (feet planted, no floating), think, slip, fall, sneeze, dance, etc. Humour in their messages is a core feature.
6. Mobile: logos sit above the prompt, photo bigger and centred, frame bot visible with a gap under the navbar, bots larger in responsive layout only.

**Standing preferences from Adinath**
- Wants things exact and polished; reacts quickly to spacing ("move up more", "you moved a lot") so make small steps and verify.
- Dislikes removed elements without explanation (arrows/doodles were once dropped and had to be restored).
- No locked zones on the canvas; items may be dragged over the navbar area.
- Real logos downloaded from the internet, never recreated by hand.
- Bots should feel alive, funny and humorous; messages should be plentiful and varied (UI/UX, AI, MCP and plugin jokes included).

**Technical gotchas learned**
- Never tween x/y and scale (with `svgOrigin`) on the same SVG element: GSAP's pivot compensation gets baked into x/y and parts end up displaced (bot eyes bug, 2026-11-08).
- Create Draggables only after the entrance timeline finishes (otherwise cards stick at start values).
- Draggable `zIndexBoost` and cursors at z-index 100000 decide stacking; arrows need an explicit z-index to show above the photo.
- Bot hover/tap is detected by pointer position (bots use `pointer-events: none` so the parent stays draggable).
- Bots use skewX leans and corner-pivot falls so feet never leave the ground; legs are drawn inside the torso so they stay connected.
- Stale CSS from the dev server: add `?v=N`.

**Current bot behaviour (see `buddyBrain.js`)**
- Hover: cat-style petting, lasts as long as the pointer stays; ends with a goodbye line.
- Tap/click: bot topples and gets up; repeated taps escalate to grumbles.
- Idle moments: walk, run, think, look around, jump, dance, wave, stretch, nap, sneeze, edge scare, slip, trip, tumble, salute, pose, flip, moonwalk, push-ups, spin, phone call, shadow-box, sit, toolTalk (design/AI/MCP jokes).
- Mid-action pokes get an in-character reply instead of interrupting (walking/running can be interrupted).

## Known quirks

- Dev preview pane only advances animation frames while screenshots are taken; use `?v=N` to bust stale CSS.
- Draggable swallows focus changes; prompt blur is handled by a capture-phase `pointerdown` listener.
- Reveal-on-scroll uses `start: 'clamp(top 90%)'` so page-bottom items still appear.

## Open items

- Resume file and real case studies from Adinath.
- Placeholder bento images are light pastel and glare a little in dark; real images will decide if they need dimming.
