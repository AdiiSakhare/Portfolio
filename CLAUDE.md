# Portfolio: instructions for Claude

Personal portfolio for Adinath Sakhare (UI/UX designer). React + Vite + GSAP + Lenis, plain CSS.

## Project memory (read this first)

@context.md

`context.md` is this project's shared memory across sessions. It holds the snapshot, working rules, layout map and a dated decision log.

- At the start of a session, and any time you feel out of context or unsure about a past decision, read `context.md` before asking the user or guessing.
- Whenever an important decision is made (design choice, layout change, behaviour rule, tool or library choice, something the user explicitly asked for or rejected), add a one-line entry at the top of the Decision log: `YYYY-MM-DD - decision (why)`. Do this in the same turn, without being asked.
- Update "Snapshot", "Layout map", "Known quirks" or "Open items" when they change. Don't delete old decisions; mark them "superseded".
- Keep entries short. No code dumps, no chat transcripts.

## Commands

- `npm run dev -- --port 5173`: dev server
- `npm run build`: production build (run before finishing a change)
- `npm run deploy`: publish to GitHub Pages

## Code style

- Semantic HTML, human-readable class names (`canvas-item--sticky`, not `ci-3`).
- Match surrounding comment density; comments explain why, not what.
- Colours, fonts and spacing come from `src/styles/tokens.css`.
- Follow the Figma file measurements exactly; don't eyeball from screenshots.

## Content rules

- Never invent achievements, clients, metrics or testimonials. Ask for missing info.
- Contact details live in `src/data/profile.js`.
