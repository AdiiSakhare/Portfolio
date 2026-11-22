/**
 * "Venom" theme switch: ink floods out from the switch and the new theme is revealed behind it.
 *
 * How it works (browser View Transitions API):
 *  1. The browser snapshots the old page, we apply the new theme, and it snapshots the new page.
 *  2. The new snapshot is revealed through a clip-path blob that grows from the switch. The blob's
 *     edge is shaped by layered sine "noise" that keeps writhing, so it reads as liquid, not a circle.
 *  3. A second layer of dark ink (a thin ragged rim and flung droplets) rides on the
 *     blob's edge and drains away as the front leaves the screen.
 * Every keyframe is a path with the same number of points, so the browser interpolates between them.
 * Browsers without View Transitions (or with reduced motion) get the old quick colour crossfade.
 */

const DURATION_MS = 2000
const KEYFRAMES = 44
const FRONT_POINTS = 200
const RIM_POINTS = 140
const DROP_COUNT = 22
const HOLE_COUNT = 18
const DROP_POINTS = 8
const LUMP_SIZE = 0.24 // how far (as a share of the radius) the front may bulge in or out
const TAU = Math.PI * 2

let isRunning = false

// ---------- small helpers ----------
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
// Seeps out of the switch gently, picks up speed as it floods the page, then slows as it finishes.
const easeSpread = (u) => 0.5 - 0.5 * Math.cos(Math.PI * u ** 0.85)
const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

function makeRandom(seed) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** A closed, smooth 1D noise over an angle: a sum of sines with whole-number frequencies. */
function makeNoise(random, frequencies, falloff) {
  const terms = frequencies.map((frequency) => ({
    frequency,
    amplitude: frequency ** -falloff,
    phase: random() * TAU,
    drift: (random() - 0.5) * 6,
  }))
  const total = terms.reduce((sum, term) => sum + term.amplitude, 0)
  return (angle, u) =>
    terms.reduce((sum, term) => sum + term.amplitude * Math.sin(term.frequency * angle + term.phase + term.drift * u), 0) / total
}

function signedArea(points) {
  let area = 0
  for (let i = 0; i < points.length; i += 1) {
    const [x1, y1] = points[i]
    const [x2, y2] = points[(i + 1) % points.length]
    area += x1 * y2 - x2 * y1
  }
  return area / 2
}

/** Winding matters: with the default (nonzero) fill, shapes drawn the same way merge and the opposite way cut a hole. */
const withWinding = (points, positive) => ((signedArea(points) >= 0) === positive ? points : [...points].reverse())

const round = (n) => Math.round(n * 10) / 10
const subpath = (points) => `M${points.map(([x, y]) => `${round(x)} ${round(y)}`).join('L')}Z`

// ---------- the animation ----------
function buildFrames(originX, originY, viewportWidth, viewportHeight) {
  const random = makeRandom((Math.random() * 1e9) | 0)

  const farthestCorner = Math.max(
    Math.hypot(originX, originY),
    Math.hypot(viewportWidth - originX, originY),
    Math.hypot(originX, viewportHeight - originY),
    Math.hypot(viewportWidth - originX, viewportHeight - originY),
  )
  const maxRadius = (farthestCorner + 160) / (1 - LUMP_SIZE * 0.6)
  const startRadius = 16

  const lumps = makeNoise(random, [2, 3, 4, 6, 9, 14], 0.45)
  const crinkles = makeNoise(random, [21, 34, 55], 0.2)
  const fingers = makeNoise(random, [7, 11, 17, 26], 0.25) // outward-only lobes: ink creeping in fingers
  const rimOuter = makeNoise(random, [3, 5, 8, 13, 21], 0.3)
  const rimInner = makeNoise(random, [4, 7, 11, 19, 29], 0.3)

  const pointOn = (angle, radius) => [originX + Math.cos(angle) * radius, originY + Math.sin(angle) * radius]

  // The edge of the new theme.
  const frontRadius = (angle, u) => {
    const base = startRadius + (maxRadius - startRadius) * easeSpread(u)
    // The bulges calm down at the very end, so the front is a clean circle by the time it leaves the screen.
    const gain = (0.6 + 0.4 * u) * (1 - smoothstep(0.7, 1, u))
    const crinkleSize = (3 + base * 0.008) * (1 - smoothstep(0.7, 1, u))
    const fingerLength = base * 0.11 * (1 - smoothstep(0.7, 1, u)) * Math.max(0, fingers(angle, u) + 0.15) ** 1.4
    return Math.max(1, base * (1 + LUMP_SIZE * gain * lumps(angle, u)) + fingerLength + crinkleSize * crinkles(angle, u))
  }

  // Veins and drops only make sense where the front will actually cross the screen.
  const crossesScreen = (angle) =>
    [0.2, 0.45, 0.7].some((share) => {
      const [x, y] = pointOn(angle, farthestCorner * share)
      return x > -40 && x < viewportWidth + 40 && y > -40 && y < viewportHeight + 40
    })
  const visibleAngle = () => {
    for (let attempt = 0; attempt < 40; attempt += 1) {
      const angle = random() * TAU
      if (crossesScreen(angle)) return angle
    }
    return random() * TAU
  }

  const holes = Array.from({ length: HOLE_COUNT }, () => ({
    angle: visibleAngle(),
    start: 0.05 + random() * 0.5,
    span: 0.3 + random() * 0.25,
    behind: 8 + random() * 200,
    size: 1.5 + random() * 8,
    shape: Array.from({ length: DROP_POINTS }, () => 0.7 + random() * 0.6),
  }))

  const drops = Array.from({ length: DROP_COUNT }, () => ({
    angle: visibleAngle(),
    start: random() * 0.5,
    span: 0.3 + random() * 0.2,
    distance: 30 + random() * 170,
    size: 1.8 + random() * 8,
    shape: Array.from({ length: DROP_POINTS }, () => 0.7 + random() * 0.6),
  }))

  const lifeCycle = (u, start, span) => Math.sin(Math.PI * clamp((u - start) / span, 0, 1)) ** 0.9

  const revealPath = (u) => {
    const points = Array.from({ length: FRONT_POINTS }, (_, i) => {
      const angle = (i / FRONT_POINTS) * TAU
      return pointOn(angle, frontRadius(angle, u))
    })
    // Little islands of the old theme left behind inside the flood, like specks the ink did not reach.
    const specks = holes.map((hole) => {
      const life = lifeCycle(u, hole.start, hole.span)
      const [centerX, centerY] = pointOn(hole.angle, Math.max(0, frontRadius(hole.angle, u) - hole.behind * (0.3 + 0.7 * life)))
      return withWinding(
        hole.shape.map((wobble, i) => {
          const angle = (i / DROP_POINTS) * TAU
          return [centerX + Math.cos(angle) * hole.size * life * wobble, centerY + Math.sin(angle) * hole.size * life * wobble]
        }),
        false,
      )
    })
    return `path('${[withWinding(points, true), ...specks].map(subpath).join('')}')`
  }

  const inkPath = (u) => {
    const rimWidth = 1.2 + 4.5 * Math.sin(Math.PI * clamp(u * 1.05, 0, 1))

    const outer = []
    const inner = []
    for (let i = 0; i < RIM_POINTS; i += 1) {
      const angle = (i / RIM_POINTS) * TAU
      const radius = frontRadius(angle, u)
      outer.push(pointOn(angle, radius + rimWidth * (0.35 + 0.65 * (0.5 + 0.5 * rimOuter(angle, u)))))
      inner.push(pointOn(angle, radius - rimWidth * (0.35 + 0.65 * (0.5 + 0.5 * rimInner(angle, u)))))
    }
    const parts = [withWinding(outer, true), withWinding(inner, false)]

    drops.forEach((drop) => {
      const life = lifeCycle(u, drop.start, drop.span)
      const [centerX, centerY] = pointOn(drop.angle, frontRadius(drop.angle, u) + drop.distance * (0.4 + 0.6 * life))
      const points = drop.shape.map((wobble, i) => {
        const angle = (i / DROP_POINTS) * TAU
        return [centerX + Math.cos(angle) * drop.size * life * wobble, centerY + Math.sin(angle) * drop.size * life * wobble]
      })
      parts.push(withWinding(points, true))
    })

    return `path('${parts.map(subpath).join('')}')`
  }

  const reveal = []
  const ink = []
  for (let i = 0; i <= KEYFRAMES; i += 1) {
    const u = i / KEYFRAMES
    reveal.push({ clipPath: revealPath(u), offset: u })
    ink.push({ clipPath: inkPath(u), offset: u })
  }
  return { reveal, ink }
}

// ---------- public ----------
function crossfade(applyTheme) {
  const root = document.documentElement
  root.classList.add('theme-transition')
  applyTheme()
  window.setTimeout(() => root.classList.remove('theme-transition'), 400)
}

/**
 * Switches theme with the ink effect, starting from `origin` (viewport pixels, usually the switch).
 * `applyTheme` must update the DOM synchronously.
 */
export function playVenomTransition(origin, applyTheme) {
  if (isRunning) return
  const wantsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || wantsReducedMotion) {
    crossfade(applyTheme)
    return
  }

  isRunning = true
  const root = document.documentElement
  const originX = clamp(origin.x, 0, window.innerWidth)
  const originY = clamp(origin.y, 0, window.innerHeight)
  const frames = buildFrames(originX, originY, window.innerWidth, window.innerHeight)

  // The ink layer only exists for the new state, so it gets its own transition group above the page.
  const ink = document.createElement('div')
  ink.className = 'venom-ink'
  ink.setAttribute('aria-hidden', 'true')

  const transition = document.startViewTransition(() => {
    applyTheme()
    document.body.append(ink)
  })

  const options = { duration: DURATION_MS, easing: 'linear', fill: 'forwards' }
  transition.ready
    .then(() => {
      root.animate(frames.reveal, { ...options, pseudoElement: '::view-transition-new(root)' })
      root.animate(frames.ink, { ...options, pseudoElement: '::view-transition-new(venom-ink)' })
    })
    .catch(() => {})

  transition.finished.catch(() => {}).finally(() => {
    ink.remove()
    isRunning = false
    // Lets pointer-driven pieces (the "You" cursor) re-sync, since the browser sends no mouse event of its own.
    window.dispatchEvent(new Event('venom-transition-end'))
  })
}
