import { gsap } from '../hooks/gsapSetup'

const WALK_SPEED_PX_PER_SECOND = 46
const random = (min, max) => gsap.utils.random(min, max)
// Lines both bots have said recently. A line is skipped while it is still in here,
// so the two bots never repeat each other (or themselves) back to back.
const recentLines = []
const lineKey = (item) => (Array.isArray(item) ? item[0] : item)
const rememberLine = (text) => {
  recentLines.push(text)
  if (recentLines.length > 40) recentLines.shift()
}
const pick = (list) => {
  const fresh = list.filter((item) => !recentLines.includes(lineKey(item)))
  const options = fresh.length ? fresh : list
  return options[Math.floor(Math.random() * options.length)]
}

// The opening conversation: four short, funny lines, so a visitor (usually a recruiter) is greeted
// before the bots go back to random chatter. Gaps between lines are random; the bots keep moving meanwhile.
let introOrigin = null
let introTimes = null
const INTRO = [
  { who: 'frame', text: 'hey HR! 👋', wave: true },
  { who: 'photo', text: 'hire him, he’s good' },
  { who: 'frame', text: 'designs and codes!' },
  { who: 'photo', text: 'and he’s available 👀' },
]
const planIntro = () => {
  if (introTimes) return
  let t = random(1, 2)
  introTimes = INTRO.map(() => {
    const at = t
    t += random(2.8, 5)
    return at
  })
}

// What the bot says. Each pool is picked from at random, so the same moment rarely sounds the same twice.
const LINES = {
  walk: ['just browsing…', 'left, right, left', 'nice grid you have', 'hire Adinath ♥', 'any snacks around?', 'pixel-perfect stroll', 'is this a good portfolio? yes.'],
  run: ['late for standup!', 'sprint deadline!', 'brb, coffee', 'zoom zoom', 'cache me if you can', 'the build is on fire!'],
  thoughts: [
    ['hmm…', 'is this 12px or 13px?'],
    ['what if it were blue?', 'no… more rounded'],
    ['one more revision…', 'final_v7_REAL.fig'],
    ['serif or sans?', 'ask Claude… ask Codex…'],
    ['padding or margin?', 'the eternal question'],
    ['is this centered?', 'it was centered yesterday…'],
    ['what would Adinath do?', 'add 4px, probably'],
  ],
  look: ['?', 'is it lunch yet?', 'nobody’s watching…', 'psst… hire him', 'who moved my layer?'],
  jump: ['pixel perfect!', 'shipped it!', 'no merge conflicts!', 'yay!', 'ta-da!', 'it works on my screen!'],
  dance: ['♪ 8px grid ♫', '♪ auto layout ♫', '♪ kerning, kerning ♫', '♪ ctrl+z, ctrl+z ♫'],
  wave: ['hi! hire him?', 'hello, recruiter 👋', 'psst, he’s available', 'hey you!', 'welcome to the canvas'],
  stretch: ['long design day…', 'unfreezing layers', 'ahhh', 'my back hurts in 2x'],
  dreams: ['dreaming of dark mode', 'zzz… auto layout…', 'zzz… 100% contrast…', 'zzz… no more feedback…'],
  wake: ['!', 'who touched my layers?!', 'five more minutes', 'I wasn’t sleeping!'],
  sneezeBuild: ['ah…', 'ahhh…'],
  sneezeBoom: ['ACHOO!', 'ACHOO!!'],
  sneezeAfter: ['dust in the kerning', 'bless my pixels', 'excuse me', 'allergic to Comic Sans'],
  edge: ['whoa…', 'that’s a long way down', 'not on the grid!', 'is that 1px off?'],
  edgeAfter: ['phew', 'I’m fine!', 'never again'],
  slip: ['whoa!', 'who left a banana?!', 'wait—'],
  slipLie: ['ow!', 'I meant to do that', 'floor looks great, though'],
  slipAfter: ['all good', 'nobody saw that', 'that was intentional'],
  trip: ['eep!', 'rounded corners?!', 'my own feet!'],
  tripLie: ['oof', 'ouch', 'gravity: 1, me: 0'],
  tripAfter: ['ouch', 'my pixels…', 'I’m okay!'],
  tumble: ['wheee!', 'weeeee!', 'rolling out the design!'],
  tumbleLie: ['dizzy…', 'the room is spinning', 'which way is up?'],
  tumbleAfter: ['ok ok', 'again?', 'worth it'],
  hover: ['oh hi!', 'psst, over here', 'you looking at me?', 'nice cursor', 'I see you hovering', 'yes? can I help you?'],
  startle: ['AAH! oh… it’s you', 'don’t sneak up on me', 'my pixels just jumped', 'boo! …wait, that was me'],
  salute: ['yes, boss!', 'at your service', 'reporting for duty', 'hire me? I mean, him?'],
  giggle: ['hehe, that tickles', 'stop it, I’m ticklish', 'tee-hee', 'do that again'],
  flipStart: ['watch this!', 'hold my coffee', 'you asked for it'],
  flipEnd: ['10/10 landing', 'nailed it', 'judges give me a 9.8'],
  pose: ['strike a pose', 'model material', 'Vogue called', 'my good side'],
  // After three quick taps it gets annoyed, and the lines escalate the longer you keep going.
  annoyed: ['hey, that’s enough!', 'stop that!', 'I will tell Adinath', 'five pokes. impressive persistence!', 'ok ok, you’re hired', 'seriously, just hire Adinath', 'I’m calling HR', 'you are very committed ♥'],
  // Replies when it is in the middle of something, so the current animation is never interrupted.
  busy: {
    nap: ['shhh… I’m dreaming', 'five more minutes…', 'zzz… no feedback today…'],
    think: ['shh, thinking!', 'you broke my concentration', 'I almost had it!'],
    dance: ['not now, I’m in the zone', 'bet you can’t do this', 'join me!'],
    slip: ['ow, I’m already down!', 'help… lol no', 'don’t laugh'],
    trip: ['ow, I’m already down!', 'don’t laugh', 'I’m fine, really'],
    tumble: ['whee— can’t talk!', 'the room is spinning…', 'later!'],
    sneeze: ['wait… ah… DON’T…', 'bad timing!', 'hold on, ahh…'],
    edgeScare: ['don’t push me!!', 'careful!!', 'not now, not now!'],
    stretch: ['mid-stretch, hold on', 'ahh… one sec', 'my back says hi'],
    jump: ['wheee, again!', 'hehe, watch me', 'I can go higher!'],
    wave: ['hello again!', 'hi hi hi!', 'still waving!'],
    lookAround: ['who’s there?', 'oh! it’s you', 'I’m just looking…'],
    run: ['can’t talk, late!', 'zoom zoom', 'catch me if you can'],
    walk: ['just walking here', 'hello!', 'I’m on my way somewhere'],
    default: ['hey!', 'yes?', 'hi there'],
    salute: ['yes, boss!', 'at ease?', 'hold on, saluting'],
    pose: ['hold the pose!', 'I’m modeling here', 'no photos, please'],
    flip: ['mid-flip, can’t talk!', 'later, I’m airborne', 'watch this!'],
    moonwalk: ['can’t talk, gliding', 'smooth, right?', 'I’m in character'],
    pushups: ['can’t talk, counting!', 'don’t make me lose count', 'forty-two…'],
    spin: ['whee, can’t stop!', 'the world is spinning', 'talk later!'],
    phoneCall: ['shh, I’m on the phone', 'one sec, it’s the client', 'can you hold?'],
    shadowBox: ['not now, fighting bugs!', 'wait for round two', 'one-two, one-two'],
    toolTalk: ['shh, I’m prompting', 'one sec, the agent is replying', 'context window is full!'],
    sit: ['hello from down here', 'I’m resting!', 'pull up a pixel'],
  },
}

// More lines for the existing pools, so it takes a long time to hear the same joke twice.
LINES.walk.push('this is my commute', 'be right back, maybe', 'walking meeting?', 'step count: 7', 'just passing through', 'nice weather for pixels')
LINES.run.push('I’m not running, I’m speed-walking!', 'git push before the deadline!', 'coffee break is over!', 'the sprint is a lie')
LINES.thoughts.push(
  ['should the CTA be orange?', 'everything should be orange'],
  ['hmm… 8px or 10px?', 'the grid says 8'],
  ['what would a recruiter click?', 'probably the big button'],
  ['is dark mode ready?', 'it was a dream…'],
  ['a design system would fix this', 'everything needs a design system'],
)
LINES.look.push('I smell a bug…', 'did something move?', 'who’s there? …oh, the cursor', 'looking for pixels to push')
LINES.jump.push('deploy success!', '0 bugs in production!', 'it compiled first try!', 'all tests green!')
LINES.dance.push('♪ ship it, ship it ♫', '♪ commit, push, repeat ♫', '♪ drag me, drop me ♫')
LINES.wave.push('hi! he’s a great hire', 'welcome, fellow pixel', 'you look like someone who likes clean UI')
LINES.stretch.push('time to un-hunch from Figma', 'my pixels are stiff', 'standing desk? never heard of it')
LINES.dreams.push('zzz… pixel-perfect sheep…', 'zzz… ship it…', 'zzz… just 4 more px…')
LINES.wake.push('is it Monday?!', 'I heard “feedback”!', 'where am I?')
LINES.sneezeAfter.push('too much whitespace dust', 'that was a loud pixel', 'bless you, me')
LINES.edge.push('I can see the footer from here', 'edge case!', 'overflow: hidden, please')
LINES.edgeAfter.push('edge case handled', 'phew, still inside the viewport')
LINES.slip.push('floor is lava! no, oil!', 'my grip is 1px short!')
LINES.slipLie.push('this floor has no friction', 'I blame the cursor')
LINES.slipAfter.push('walked it off', 'let’s never speak of this')
LINES.trip.push('mind the gap!', 'no stairs here?!')
LINES.tripLie.push('trip, fall, repeat', 'floor: 1, bot: 0')
LINES.tumble.push('barrel roll!', 'do a flip! (accidentally)')

// Tool and AI jokes: Figma, MCP, plugins, prompts, design-to-code.
LINES.thoughts.push(
  ['should I connect another MCP?', 'my tool list is longer than my legs'],
  ['Figma says 3 frames, code says 4', 'someone is lying, and it is a plugin'],
  ['one more plugin won’t hurt…', 'narrator: it hurt'],
  ['what if the AI designs the AI?', 'then who reviews the pixels?'],
  ['prompt: “make it pop”', 'result: it popped. wrong way'],
  ['auto layout or absolute?', 'auto layout, always. mostly.'],
  ['detach instance?', 'no. never. well… maybe'],
  ['tokens are not just for AI', 'design tokens count too'],
  ['Figma to code in one click?', 'sure, and my legs grew back'],
  ['is “vibe coding” a design brief?', 'asking for a friend'],
)
LINES.walk.push('MCP server connected. I think.', 'running an agent. it’s me.', 'loading plugin… loading…', 'context window: almost full', 'fetching design context…', 'tool call: walk()')
LINES.jump.push('plugin installed without errors!', 'MCP connected on the first try!', 'the AI got it right!', 'handoff approved!')
LINES.dance.push('♪ prompt, iterate, repeat ♫', '♪ auto-layout, auto-layout ♫', '♪ ctrl+z is my best friend ♫')
LINES.look.push('hmm, which plugin did that?', 'is that a hallucination?', 'checking the layers panel…', 'someone renamed “Frame 482”')
LINES.dreams.push('zzz… Frame 1, Frame 2, Frame 3…', 'zzz… 200 tabs open…', 'zzz… MCP… connected…')
LINES.wake.push('did the AI ship it?!', 'who pushed to main?', 'my context window reset!')
LINES.stretch.push('stretching my context window', 'ctrl+s, ctrl+s, ctrl+s')
LINES.slip.push('whoa, a misaligned layer!', 'who moved my constraint?')
LINES.tumble.push('rolling back to the last version!', 'undo! undo!')
LINES.sneezeAfter.push('too many plugins in the air', 'that was a hallucination')
LINES.pose.push('rendering at 2x!', 'export as SVG, please')
LINES.hover = LINES.hover || []

Object.assign(LINES, {
  // Hover: being petted like a cat.
  purr: ['purrrr…', 'that’s the spot', 'ahhh, yes', 'don’t stop', 'mmmmm', 'I could get used to this', 'best part of my day', 'purr.exe is running'],
  petEnd: ['hm? come back', 'aww, why stop?', 'ok, back to work', 'same time tomorrow?', 'that was nice…'],
  // Tap or click: knocked over.
  boop: ['boop!', 'hey—', 'whoa, easy!', 'who touched me?!', 'nooo—', 'tickle attack!'],
  boopLie: ['ow… rude', 'I fell for it', 'that was uncalled for', 'gravity wins again', 'I regret nothing', 'ok, that was kind of fun'],
  boopAfter: ['do that again', 'I’m okay!', 'dust off, pixel up', 'brb, reassembling', 'the floor is fine, thanks'],
  // New fun moments.
  moonwalk: ['smooth operator', 'hee-hee!', 'is this the moonwalk?', 'walking backwards, forwards'],
  pushupsEnd: ['gains!', 'leg day is tomorrow', 'I should skip the gym… I have no legs', 'four is a lot for a pixel'],
  spin: ['pirouette!', 'ta-da, twirl!', 'whee, round and round'],
  spinAfter: ['too fast… dizzy', 'why is the grid moving?', 'ok… ok… stable'],
  phone: [
    ['hello?', 'uh-huh…', 'yes, the blue one', 'no, the OTHER blue', 'will do. bye!'],
    ['hi, this is the portfolio', 'yes, he is available', 'no, he does not work for exposure', 'bye!'],
    ['standup? now?', 'I’ll be there in five', 'I’m always five minutes away'],
  ],
  toolTalk: [
    ['Figma: “detached from main component”', 'me: “I felt that”'],
    ['MCP server: “tool call failed”', 'me: “try turning it off and on”', 'MCP server: “connected!”', 'me: “I knew it”'],
    ['plugin: “update available”', 'me: “not now”', 'plugin: “update available”', 'me: “…fine”'],
    ['designer: “make it pop”', 'AI: “added 14 shadows”', 'designer: “less pop”'],
    ['AI: “here’s your design!”', 'me: “why is the logo a cat?”', 'AI: “you said minimal”'],
    ['dev: “is this in Figma?”', 'me: “it’s in Figma”', 'dev: “which frame?”', 'me: “…”'],
    ['Claude Code: “I fixed the CSS”', 'me: “now it is centered?”', 'Claude Code: “now it is a div soup”'],
    ['prompt v1: a button', 'prompt v7: a button with feelings', 'prompt v12: a button. just a button.'],
  ],
  box: ['rocky time!', 'fighting the blank canvas', 'one-two, one-two', 'shadow-boxing the bugs'],
  sit: ['sitting for a bit', 'break time', 'my legs are shorter now', 'just resting my pixels'],
})

// Fixed pivots inside the 112 x 92 drawing. Using the same one for each part keeps GSAP from shifting it.
const FEET = '56 88'
// The torso pivots about its feet, so planted feet never lift off the floor when it leans or breathes.
const TORSO_PIVOT = '56 88'
const EYES = '56 37'
const EAR_LEFT = '14 47'
const EAR_RIGHT = '98 47'
const GROUND = '56 90'

// How far the pupils can travel inside the 7 x 14 white eyes.
const PUPIL_RANGE_X = 1.7
const PUPIL_RANGE_Y = 3.6

/**
 * Brings the drawn Claude Code bot to life.
 * It blinks, breathes and watches the mouse all the time, and keeps choosing something to do:
 * walk, run, think, jump, dance, wave, stretch, nap, sneeze, peek over the edge, slip, trip or tumble.
 * Returns a function that stops everything.
 */
export function startBuddy(root, { placement = 'photo' } = {}) {
  const one = (selector) => root.querySelector(selector)
  const all = (selector) => [...root.querySelectorAll(selector)]

  const walker = one('.buddy-walker')
  const anchor = one('.buddy-bubble-anchor')
  const bubble = one('.buddy-bubble')
  const bubbleText = one('.buddy-bubble-text')
  const bubbleDots = one('.buddy-dots')
  const whole = one('.buddy-whole')
  const torso = one('.buddy-torso')
  const earLeft = one('.buddy-ear-left')
  const earRight = one('.buddy-ear-right')
  const shadow = one('.buddy-ground-shadow')
  const sweat = one('.buddy-sweat')
  const stars = all('.buddy-star')
  const legs = all('.buddy-leg')
  const legsA = all('.buddy-leg-a')
  const legsB = all('.buddy-leg-b')
  const pupils = all('.buddy-pupil')
  const eyes = {
    normal: one('.buddy-eyes-normal'),
    happy: one('.buddy-eyes-happy'),
    dizzy: one('.buddy-eyes-dizzy'),
    closed: one('.buddy-eyes-closed'),
  }
  // Scale-only twin of eyes.normal (see ClaudeBuddy.jsx): blinks and squashes go here, never x/y.
  const eyeScale = one('.buddy-eyes-scale')

  const maxX = () => Math.max(0, root.clientWidth - walker.offsetWidth)

  // With reduced motion, or when this bot is hidden at the current screen size, it just stands still.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion || root.clientWidth === 0) {
    gsap.set(walker, { x: maxX() * 0.6 })
    return () => {}
  }

  // ---------- State ----------
  let alive = true
  let eyeKind = 'normal'
  let trackingMouse = true
  let earsFree = true
  let reacting = false
  let currentName = ''
  const pending = []

  // Remembers timers so they can be cancelled later, forgetting old ones so the list never grows without limit.
  const track = (call) => {
    pending.push(call)
    if (pending.length > 120) pending.splice(0, pending.length - 60)
    return call
  }

  const sleep = (seconds) =>
    new Promise((resolve) => {
      track(gsap.delayedCall(seconds, resolve))
    })

  const currentX = () => Number(gsap.getProperty(walker, 'x')) || 0

  // ---------- Expression ----------
  const setEyes = (kind) => {
    eyeKind = kind
    Object.entries(eyes).forEach(([name, element]) => gsap.set(element, { autoAlpha: name === kind ? 1 : 0 }))
  }

  /** How long a message needs on screen to be read comfortably: a short beat to notice it, then about 12 characters a second. */
  const readTime = (text) => 1.6 + text.length * 0.08

  let speakingUntil = 0
  let waitingMessage = null

  const showBubble = (text, hold, dots) => {
    bubbleText.textContent = text
    bubbleDots.style.display = dots ? '' : 'none'
    anchor.dataset.side = currentX() > maxX() / 2 ? 'left' : 'right'
    gsap.fromTo(
      bubble,
      { autoAlpha: 0, scale: 0.6, y: 6 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.25, ease: 'back.out(2)', overwrite: true },
    )
    const visibleFor = Math.max(hold, readTime(text))
    speakingUntil = Date.now() + visibleFor * 1000
    track(gsap.delayedCall(visibleFor, () => {
      if (Date.now() >= speakingUntil - 50) gsap.to(bubble, { autoAlpha: 0, scale: 0.85, duration: 0.2, overwrite: true })
    }))
  }

  /**
   * A speech bubble. Over the frame it sits beside the bot, on whichever side has more room.
   * A message stays long enough to be read, and the next one waits its turn (briefly) instead of replacing it.
   */
  const say = (text, hold = 1.4, { dots = true, intro = false } = {}) => {
    // While the opening conversation is still going, the bot's own actions stay silent so the lines aren't talked over.
    if (introTalking && inAction && !intro) return
    rememberLine(text)
    const waitMs = speakingUntil - Date.now()
    waitingMessage?.kill()
    waitingMessage = null
    if (waitMs <= 0 || waitMs > 3500) {
      showBubble(text, hold, dots)
      return
    }
    waitingMessage = track(gsap.delayedCall(waitMs / 1000, () => {
      waitingMessage = null
      showBubble(text, hold, dots)
    }))
  }

  // ---------- Always-on life: breathing, blinking, ear twitches, eyes that follow the mouse ----------
  const breathing = gsap.to(torso, {
    scaleY: 1.03,
    scaleX: 0.99,
    duration: 1.5,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
    svgOrigin: TORSO_PIVOT,
  })

  const pupilX = pupils.map((pupil) => gsap.quickTo(pupil, 'x', { duration: 0.25, ease: 'power3.out' }))
  const pupilY = pupils.map((pupil) => gsap.quickTo(pupil, 'y', { duration: 0.25, ease: 'power3.out' }))
  const lookAt = (x, y) => {
    pupilX.forEach((move) => move(x))
    pupilY.forEach((move) => move(y))
  }

  let lastPointerAt = 0
  let tapCount = 0
  let lastTapAt = 0
  let lastHoverAt = 0
  let wasOverBot = false
  let petting = false
  let introTalking = true
  let inAction = false
  let queuedTap = false
  let lastPointerX = 0
  let pressedAt = null

  const isOverBot = (x, y) => {
    const box = walker.getBoundingClientRect()
    const margin = 6
    return x > box.left - margin && x < box.right + margin && y > box.top - margin && y < box.bottom + margin
  }

  const handlePointerMove = (event) => {
    lastPointerAt = Date.now()

    // Hover: the first moment the pointer arrives over the bot (not while dragging something, not on touch screens).
    lastPointerX = event.clientX
    const isOver = event.pointerType !== 'touch' && event.buttons === 0 && isOverBot(event.clientX, event.clientY)
    if (isOver && !wasOverBot && Date.now() - lastHoverAt > 600) {
      lastHoverAt = Date.now()
      poke('hover')
    }
    // The petting lasts exactly as long as the pointer stays on the bot.
    if (!isOver && wasOverBot) petting = false
    wasOverBot = isOver

    if (!trackingMouse || eyeKind !== 'normal') return
    const box = walker.getBoundingClientRect()
    const dx = event.clientX - (box.left + box.width / 2)
    const dy = event.clientY - (box.top + box.height * 0.4)
    const distance = Math.hypot(dx, dy) || 1
    const strength = Math.min(1, distance / 240)
    lookAt((dx / distance) * PUPIL_RANGE_X * strength, (dy / distance) * PUPIL_RANGE_Y * strength)
  }

  // Tap or click: pressed and released on the bot without dragging anywhere.
  const handlePointerDown = (event) => {
    pressedAt = { x: event.clientX, y: event.clientY }
  }
  const handlePointerUp = (event) => {
    if (!pressedAt) return
    const moved = Math.hypot(event.clientX - pressedAt.x, event.clientY - pressedAt.y)
    pressedAt = null
    if (moved < 8 && isOverBot(event.clientX, event.clientY)) poke('tap')
  }

  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  window.addEventListener('pointerdown', handlePointerDown, { passive: true })
  window.addEventListener('pointerup', handlePointerUp, { passive: true })

  const blinkLoop = async () => {
    while (alive) {
      await sleep(random(1.8, 4.6))
      if (!alive) break
      if (eyeKind !== 'normal' || petting) continue
      const blinks = Math.random() < 0.25 ? 2 : 1
      for (let blink = 0; blink < blinks; blink += 1) {
        await gsap.to(eyeScale, { scaleY: 0.08, duration: 0.07, svgOrigin: EYES })
        await gsap.to(eyeScale, { scaleY: 1, duration: 0.1, svgOrigin: EYES })
      }
    }
  }

  // When nobody is moving the mouse, the eyes wander on their own instead of staring.
  const glanceLoop = async () => {
    while (alive) {
      await sleep(random(2.5, 5.5))
      if (!alive) break
      if (eyeKind !== 'normal' || !trackingMouse || Date.now() - lastPointerAt < 2500) continue
      lookAt(random(-PUPIL_RANGE_X, PUPIL_RANGE_X), random(-2.5, 2.5))
      await sleep(random(0.6, 1.4))
      if (eyeKind === 'normal' && trackingMouse) lookAt(0, 0)
    }
  }

  const twitchLoop = async () => {
    while (alive) {
      await sleep(random(3, 7))
      if (!alive) break
      if (!earsFree) continue
      const ear = Math.random() < 0.5 ? earLeft : earRight
      const origin = ear === earLeft ? EAR_LEFT : EAR_RIGHT
      const lift = (ear === earLeft ? 1 : -1) * random(12, 22)
      await gsap.to(ear, { rotation: lift, duration: 0.09, svgOrigin: origin })
      await gsap.to(ear, { rotation: 0, duration: 0.25, ease: 'back.out(3)', svgOrigin: origin })
    }
  }

  /** Moves both ears at once, each around its own hinge. */
  const earsTo = (left, right, duration = 0.3, vars = {}) => {
    gsap.to(earLeft, { rotation: left, duration, svgOrigin: EAR_LEFT, ...vars })
    gsap.to(earRight, { rotation: right, duration, svgOrigin: EAR_RIGHT, ...vars })
  }

  // ---------- Walking ----------
  const legCycle = gsap.timeline({ repeat: -1, paused: true })
  legCycle
    .to(legsA, { y: -5, duration: 0.14, ease: 'power1.out' }, 0)
    .to(legsA, { y: 0, duration: 0.14, ease: 'power1.in' }, 0.14)
    .to(legsB, { y: -5, duration: 0.14, ease: 'power1.out' }, 0.28)
    .to(legsB, { y: 0, duration: 0.14, ease: 'power1.in' }, 0.42)
    // A gentle sway from side to side: only the top leans, the feet stay on the floor.
    .to(torso, { skewX: -2, duration: 0.14, ease: 'sine.inOut' }, 0)
    .to(torso, { skewX: 2, duration: 0.28, ease: 'sine.inOut' }, 0.14)
    .to(torso, { skewX: 0, duration: 0.14, ease: 'sine.inOut' }, 0.42)

  const startWalking = (speed = WALK_SPEED_PX_PER_SECOND) => {
    legCycle.timeScale(speed / WALK_SPEED_PX_PER_SECOND).play()
  }
  const stopWalking = () => legCycle.pause(0)

  // Puts every part back to standing still.
  const rest = () => {
    stopWalking()
    trackingMouse = true
    earsFree = true
    gsap.set(legs, { x: 0, y: 0, rotation: 0, scaleY: 1 })
    gsap.set(whole, { rotation: 0, x: 0, y: 0, scaleX: 1, scaleY: 1, svgOrigin: FEET })
    gsap.set(torso, { rotation: 0, skewX: 0, x: 0, y: 0, svgOrigin: TORSO_PIVOT })
    gsap.set(earLeft, { rotation: 0, svgOrigin: EAR_LEFT })
    gsap.set(earRight, { rotation: 0, svgOrigin: EAR_RIGHT })
    gsap.set(eyes.normal, { x: 0, y: 0 })
    gsap.set(eyeScale, { scaleX: 1, scaleY: 1, svgOrigin: EYES })
    gsap.set(shadow, { scaleX: 1, autoAlpha: 1, svgOrigin: GROUND })
    gsap.set([...stars, sweat], { autoAlpha: 0 })
    setEyes('normal')
  }

  /** Walks (or runs) to a spot on the strip. */
  const travel = async (to, speed = WALK_SPEED_PX_PER_SECOND) => {
    const from = currentX()
    const direction = to > from ? 1 : -1
    startWalking(speed)
    gsap.to(torso, { skewX: -direction * (speed > 90 ? 8 : 3), duration: 0.3, svgOrigin: TORSO_PIVOT })
    await gsap.to(walker, { x: to, duration: Math.abs(to - from) / speed, ease: 'none' })
    stopWalking()
    gsap.to(torso, { skewX: 0, duration: 0.25, svgOrigin: TORSO_PIVOT })
  }

  const somewhereNew = () => {
    const limit = maxX()
    const from = Math.min(currentX(), limit)
    gsap.set(walker, { x: from })
    let to = random(0, limit)
    if (Math.abs(to - from) < 50) to = from < limit / 2 ? limit : 0
    return to
  }

  // ---------- Behaviours ----------
  const walk = async () => {
    // Often mutters something as it strolls.
    if (Math.random() < 0.5) say(pick(LINES.walk), 3, { dots: false })
    await travel(somewhereNew())
  }

  const run = async () => {
    say(pick(LINES.run), 2, { dots: false })
    await travel(somewhereNew(), 135)
  }

  /** Stops, tilts its head and scratches it with one ear, thinking out loud in two steps. */
  const think = async () => {
    earsFree = false
    const [first, second] = pick(LINES.thoughts)
    say(first, 2.4)
    gsap.to(eyes.normal, { x: 3, y: -4, duration: 0.3 })
    lookAt(1.7, -3.6)
    trackingMouse = false
    gsap.to(torso, { skewX: -7, duration: 0.4, svgOrigin: TORSO_PIVOT })
    await gsap.to(earRight, { rotation: -42, duration: 0.35, ease: 'back.out(2)', svgOrigin: EAR_RIGHT })
    await gsap.to(earRight, { rotation: -28, duration: 0.2, yoyo: true, repeat: 5, ease: 'sine.inOut', svgOrigin: EAR_RIGHT })
    say(second, 2.6)
    await gsap.to(earRight, { rotation: -28, duration: 0.2, yoyo: true, repeat: 7, ease: 'sine.inOut', svgOrigin: EAR_RIGHT })
    await sleep(0.4)
    gsap.to(eyes.normal, { x: 0, y: 0, duration: 0.3 })
    gsap.to(torso, { skewX: 0, duration: 0.4, svgOrigin: TORSO_PIVOT })
    await gsap.to(earRight, { rotation: 0, duration: 0.3, svgOrigin: EAR_RIGHT })
  }

  /** Glances left, right and up, as if checking nobody is watching. */
  const lookAround = async () => {
    trackingMouse = false
    say(pick(LINES.look), 2.4, { dots: false })
    for (const [x, y, tilt] of [[-PUPIL_RANGE_X, 0, -5], [PUPIL_RANGE_X, 0, 5], [0, -PUPIL_RANGE_Y, 0], [-PUPIL_RANGE_X, 1, -4], [0, 0, 0]]) {
      lookAt(x, y)
      await gsap.to(torso, { skewX: -tilt, duration: 0.3, ease: 'sine.inOut', svgOrigin: TORSO_PIVOT })
      await sleep(0.35)
    }
  }

  /** Jumps around, flapping its ears and laughing. */
  const jump = async () => {
    earsFree = false
    setEyes('happy')
    say(pick(LINES.jump), 2.4, { dots: false })
    gsap.to(earLeft, { rotation: 30, duration: 0.12, yoyo: true, repeat: 11, svgOrigin: EAR_LEFT })
    gsap.to(earRight, { rotation: -30, duration: 0.12, yoyo: true, repeat: 11, svgOrigin: EAR_RIGHT })

    for (let hop = 0; hop < 3; hop += 1) {
      gsap.to(shadow, { scaleX: 0.65, autoAlpha: 0.5, duration: 0.2, yoyo: true, repeat: 1, svgOrigin: GROUND })
      await gsap.to(whole, { y: -16, scaleX: 0.96, scaleY: 1.07, duration: 0.2, ease: 'power2.out', svgOrigin: FEET })
      await gsap.to(whole, { y: 0, scaleX: 1.07, scaleY: 0.9, duration: 0.18, ease: 'power2.in', svgOrigin: FEET })
      await gsap.to(whole, { scaleX: 1, scaleY: 1, duration: 0.14, ease: 'back.out(3)', svgOrigin: FEET })
    }
    await sleep(0.3)
  }

  /** Sways and taps its feet to music. */
  const dance = async () => {
    earsFree = false
    setEyes('happy')
    say(pick(LINES.dance), 3.6, { dots: false })
    for (let beat = 0; beat < 8; beat += 1) {
      const side = beat % 2 === 0 ? 1 : -1
      gsap.to(torso, { skewX: -side * 8, duration: 0.24, ease: 'sine.inOut', svgOrigin: TORSO_PIVOT })
      gsap.to(whole, { y: -4, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.out', svgOrigin: FEET })
      gsap.to(side === 1 ? earLeft : earRight, { rotation: side * 26, duration: 0.12, yoyo: true, repeat: 1, svgOrigin: side === 1 ? EAR_LEFT : EAR_RIGHT })
      gsap.to(side === 1 ? legsA : legsB, { y: -4, duration: 0.12, yoyo: true, repeat: 1 })
      await sleep(0.26)
    }
    gsap.to(torso, { skewX: 0, duration: 0.3, svgOrigin: TORSO_PIVOT })
    await sleep(0.3)
  }

  /** Raises an ear and waves hello. */
  const wave = async () => {
    earsFree = false
    say(pick(LINES.wave), 2.6, { dots: false })
    lookAt(0, 0)
    setEyes('happy')
    await gsap.to(earRight, { rotation: -95, duration: 0.3, ease: 'back.out(2)', svgOrigin: EAR_RIGHT })
    await gsap.to(earRight, { rotation: -70, duration: 0.18, yoyo: true, repeat: 7, ease: 'sine.inOut', svgOrigin: EAR_RIGHT })
    await gsap.to(earRight, { rotation: 0, duration: 0.3, svgOrigin: EAR_RIGHT })
  }

  /** A big, slow stretch with eyes shut. */
  const stretch = async () => {
    earsFree = false
    setEyes('closed')
    say(pick(LINES.stretch), 2.4, { dots: false })
    earsTo(40, -40, 0.5)
    gsap.to([legs[0], legs[1]], { x: -3, duration: 0.5 })
    gsap.to([legs[2], legs[3]], { x: 3, duration: 0.5 })
    await gsap.to(whole, { scaleY: 1.14, scaleX: 0.94, duration: 0.6, ease: 'sine.out', svgOrigin: FEET })
    await sleep(0.7)
    earsTo(0, 0, 0.3)
    gsap.to(legs, { x: 0, duration: 0.3 })
    setEyes('normal')
    await gsap.to(whole, { scaleY: 1, scaleX: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)', svgOrigin: FEET })
  }

  /** Dozes off, snoring, then gets a fright and wakes with a jump. */
  const nap = async () => {
    earsFree = false
    trackingMouse = false
    setEyes('closed')
    gsap.to(whole, { scaleY: 0.94, scaleX: 1.03, duration: 0.8, ease: 'sine.inOut', svgOrigin: FEET })
    gsap.to(torso, { skewX: -4, duration: 0.8, svgOrigin: TORSO_PIVOT })
    for (const snore of ['z', 'zz', pick(LINES.dreams), 'zzz', 'zz']) {
      say(snore, 1.5, { dots: false })
      await sleep(1.55)
    }
    // Startled awake.
    setEyes('normal')
    gsap.to(eyeScale, { scaleX: 1.2, scaleY: 1.25, duration: 0.1, svgOrigin: EYES })
    say(pick(LINES.wake), 1.8, { dots: false })
    gsap.to(torso, { skewX: 0, duration: 0.2, svgOrigin: TORSO_PIVOT })
    earsTo(25, -25, 0.1)
    await gsap.to(whole, { y: -14, scaleY: 1.08, scaleX: 0.95, duration: 0.18, ease: 'power2.out', svgOrigin: FEET })
    await gsap.to(whole, { y: 0, scaleY: 1, scaleX: 1, duration: 0.5, ease: 'bounce.out', svgOrigin: FEET })
    gsap.to(eyeScale, { scaleX: 1, scaleY: 1, duration: 0.3, svgOrigin: EYES })
    trackingMouse = true
    await sleep(0.3)
  }

  /** A slow build-up and a huge sneeze. */
  const sneeze = async () => {
    earsFree = false
    trackingMouse = false
    for (const [text, tilt] of [[LINES.sneezeBuild[0], -9], [LINES.sneezeBuild[1], -13]]) {
      say(text, 1, { dots: false })
      gsap.to(eyeScale, { scaleY: 0.5, duration: 0.3, svgOrigin: EYES })
      await gsap.to(torso, { skewX: -tilt, duration: 0.5, ease: 'sine.inOut', svgOrigin: TORSO_PIVOT })
      await sleep(0.3)
    }
    setEyes('closed')
    say(pick(LINES.sneezeBoom), 1.6, { dots: false })
    earsTo(35, -35, 0.08)
    gsap.to(walker, { x: Math.max(0, Math.min(maxX(), currentX() + (Math.random() < 0.5 ? -10 : 10))), duration: 0.2, ease: 'power3.out' })
    await gsap.to(torso, { skewX: -16, duration: 0.09, ease: 'power4.out', svgOrigin: TORSO_PIVOT })
    await gsap.to(whole, { scaleX: 1.12, scaleY: 0.92, duration: 0.08, svgOrigin: FEET })
    await gsap.to(whole, { scaleX: 1, scaleY: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)', svgOrigin: FEET })
    await gsap.to(torso, { x: 2, duration: 0.05, yoyo: true, repeat: 7, svgOrigin: TORSO_PIVOT })
    earsTo(0, 0, 0.3)
    gsap.to(eyeScale, { scaleY: 1, duration: 0.2, svgOrigin: EYES })
    setEyes('normal')
    say(pick(LINES.sneezeAfter), 2, { dots: false })
    await sleep(1.4)
  }

  /** Walks to the very edge, looks down and wobbles nervously, then steps back. */
  const edgeScare = async () => {
    const limit = maxX()
    const leftEnd = currentX() < limit / 2
    const direction = leftEnd ? -1 : 1
    await travel(leftEnd ? 0 : limit)

    earsFree = false
    trackingMouse = false
    lookAt(0, PUPIL_RANGE_Y)
    gsap.to(eyeScale, { scaleX: 1.15, scaleY: 1.2, duration: 0.2, svgOrigin: EYES })
    say(pick(LINES.edge), 2.6)
    gsap.to(sweat, { autoAlpha: 1, y: 4, duration: 0.5 })
    gsap.to(earLeft, { rotation: 20, duration: 0.08, yoyo: true, repeat: 15, svgOrigin: EAR_LEFT })
    gsap.to(earRight, { rotation: -20, duration: 0.08, yoyo: true, repeat: 15, svgOrigin: EAR_RIGHT })
    await gsap.to(torso, { skewX: -direction * 13, duration: 0.5, ease: 'sine.inOut', svgOrigin: TORSO_PIVOT })
    await gsap.to(torso, { skewX: -direction * 7, duration: 0.12, yoyo: true, repeat: 7, ease: 'sine.inOut', svgOrigin: TORSO_PIVOT })
    await gsap.to(torso, { skewX: direction * 4, duration: 0.25, ease: 'power2.out', svgOrigin: TORSO_PIVOT })
    gsap.to(sweat, { autoAlpha: 0, duration: 0.3 })
    gsap.to(eyeScale, { scaleX: 1, scaleY: 1, duration: 0.3, svgOrigin: EYES })
    await gsap.to(torso, { skewX: 0, duration: 0.3, svgOrigin: TORSO_PIVOT })
    say(pick(LINES.edgeAfter), 1.6, { dots: false })
    trackingMouse = true
    await travel(Math.max(0, Math.min(limit, currentX() - direction * 55)))
  }

  /** Eyes dizzy, stars spinning, legs kicking, bubble saying `label`, until it is time to get up. */
  const lieDazed = async (label, seconds = 1.7) => {
    setEyes('dizzy')
    say(label, Math.max(1.6, seconds), { dots: false })
    gsap.set(stars, { autoAlpha: 1 })
    stars.forEach((star, index) => {
      gsap.to(star, { rotation: 360, duration: 1.1, ease: 'none', repeat: 1, svgOrigin: `${[30, 56, 82][index]} ${[10, 4, 10][index]}` })
    })
    gsap.to(legs, { rotation: 14, transformOrigin: '50% 25%', duration: 0.1, yoyo: true, repeat: 7, ease: 'sine.inOut' })
    await sleep(seconds)
  }

  /** Up again with a bounce, then a little shake. */
  const getUp = async (line, pivot = FEET) => {
    gsap.to(stars, { autoAlpha: 0, duration: 0.2 })
    gsap.to(legs, { x: 0, y: 0, rotation: 0, duration: 0.2 })
    setEyes('normal')
    gsap.to(shadow, { autoAlpha: 1, duration: 0.3 })
    await gsap.to(whole, { rotation: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)', svgOrigin: pivot })
    gsap.set(whole, { svgOrigin: FEET })
    await gsap.to(torso, { x: 2, duration: 0.06, yoyo: true, repeat: 5, ease: 'sine.inOut', svgOrigin: TORSO_PIVOT })
    gsap.set(torso, { x: 0 })
    say(line, 1.3, { dots: false })
    await sleep(0.8)
  }

  /** Walks a little way along the strip so a fall has room to happen. Returns the direction, or 0 if cramped. */
  const walkTowardsRoom = async (roomAhead = 26) => {
    const limit = maxX()
    const from = Math.min(currentX(), limit)
    gsap.set(walker, { x: from })
    const direction = from < limit / 2 ? 1 : -1
    const stride = Math.min(random(70, 120), direction === 1 ? limit - from - roomAhead : from - roomAhead)
    if (stride < 20) return 0
    await travel(from + direction * stride)
    return direction
  }

  /** Steps on something slippery: feet fly forward and it topples backwards onto the surface, over its back foot. */
  const slip = async () => {
    const direction = await walkTowardsRoom()
    if (direction === 0) return walk()
    earsFree = false
    const pivot = direction === 1 ? '18 88' : '94 88'
    say(pick(LINES.slip), 1.2, { dots: false })
    gsap.to(legs, { x: direction * 10, y: -3, duration: 0.18, ease: 'power2.out' })
    gsap.to(walker, { x: currentX() - direction * 16, duration: 0.6, ease: 'power2.out' })
    gsap.to(shadow, { autoAlpha: 0.35, duration: 0.3 })
    await gsap.to(whole, { rotation: -direction * 80, duration: 0.5, ease: 'power2.in', svgOrigin: pivot })
    await gsap.to(whole, { y: -3, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.out', svgOrigin: pivot })
    await lieDazed(pick(LINES.slipLie), 2.1)
    await getUp(pick(LINES.slipAfter), pivot)
  }

  /** Trips over its own feet and lands face-first, pivoting over its front foot. */
  const trip = async () => {
    const direction = await walkTowardsRoom(75)
    if (direction === 0) return walk()
    earsFree = false
    stopWalking()
    const pivot = direction === 1 ? '94 88' : '18 88'
    say(pick(LINES.trip), 1.1, { dots: false })
    earsTo(50, -50, 0.15)
    await gsap.to(torso, { skewX: direction * 8, duration: 0.12, svgOrigin: TORSO_PIVOT })
    gsap.to(torso, { skewX: 0, duration: 0.2, svgOrigin: TORSO_PIVOT })
    gsap.to(walker, { x: currentX() + direction * 10, duration: 0.45, ease: 'power2.out' })
    await gsap.to(whole, { rotation: direction * 82, duration: 0.45, ease: 'power2.in', svgOrigin: pivot })
    await gsap.to(whole, { y: -3, duration: 0.1, yoyo: true, repeat: 1, svgOrigin: pivot })
    await lieDazed(pick(LINES.tripLie), 1.8)
    await getUp(pick(LINES.tripAfter), pivot)
  }

  /** Cartwheels along the edge: it springs up and spins once, landing back on its feet. */
  const tumble = async () => {
    const direction = await walkTowardsRoom(70)
    if (direction === 0) return walk()
    earsFree = false
    say(pick(LINES.tumble), 2, { dots: false })
    setEyes('dizzy')
    const roll = Math.min(70, direction === 1 ? maxX() - currentX() : currentX())
    gsap.to(walker, { x: currentX() + direction * roll, duration: 1.1, ease: 'power1.inOut' })
    // Spinning about its middle, lifted high enough that the sideways pose never dips below the surface.
    gsap.to(whole, { y: -38, duration: 0.55, ease: 'sine.out', svgOrigin: '56 53' })
    gsap.to(whole, { y: 0, duration: 0.55, delay: 0.55, ease: 'sine.in', svgOrigin: '56 53' })
    await gsap.to(whole, { rotation: direction * 360, duration: 1.1, ease: 'power1.inOut', svgOrigin: '56 53' })
    gsap.set(whole, { rotation: 0, y: 0, svgOrigin: FEET })
    await lieDazed(pick(LINES.tumbleLie), 1.6)
    await getUp(pick(LINES.tumbleAfter))
  }

  // ---------- Poking: petted when hovered, knocked over when tapped ----------
  const resetFace = () => {
    setEyes('normal')
    gsap.to(eyes.normal, { x: 0, y: 0, duration: 0.25 })
    gsap.to(eyeScale, { scaleX: 1, scaleY: 1, duration: 0.25, svgOrigin: EYES })
    gsap.to(sweat, { autoAlpha: 0, duration: 0.3 })
    gsap.set(stars, { autoAlpha: 0 })
    earsTo(0, 0, 0.25)
    gsap.to(torso, { skewX: 0, x: 0, duration: 0.25, svgOrigin: TORSO_PIVOT })
    gsap.set(whole, { rotation: 0, y: 0, scaleX: 1, scaleY: 1, svgOrigin: FEET })
  }

  /** Pauses whatever it is doing (mostly walking) and returns a function that carries on from the same spot. */
  const freezeMotion = () => {
    const paused = gsap.getTweensOf(walker).filter((tween) => tween.isActive() && !tween.paused())
    paused.forEach((tween) => tween.pause())
    const wasWalking = !legCycle.paused()
    legCycle.pause()
    gsap.to(legs, { y: 0, duration: 0.15 })
    return () => {
      paused.forEach((tween) => tween.resume())
      if (wasWalking) legCycle.play()
    }
  }

  const reactions = {
    /**
     * Hover: it is being petted like a cat. Calm half-closed eyes looking up, a purring lean towards the pointer,
     * then eyes shut in bliss. It lasts exactly as long as the pointer stays on it.
     */
    pet: async () => {
      petting = true
      const carryOn = freezeMotion()
      const leanTowardsPointer = lastPointerX >= walker.getBoundingClientRect().left + walker.offsetWidth / 2 ? -5 : 5

      say(pick(LINES.purr), 2.6, { dots: false })
      lookAt(0, -PUPIL_RANGE_Y)
      gsap.to(eyeScale, { scaleY: 0.55, duration: 0.5, svgOrigin: EYES })
      earsTo(-14, 14, 0.6)
      gsap.to(torso, { skewX: leanTowardsPointer, duration: 0.6, ease: 'sine.out', svgOrigin: TORSO_PIVOT })
      gsap.to(whole, { scaleY: 0.95, scaleX: 1.03, duration: 1, ease: 'sine.inOut', svgOrigin: FEET })
      const purr = gsap.to(torso, { x: 0.7, duration: 0.05, yoyo: true, repeat: -1, svgOrigin: TORSO_PIVOT })

      let heldFor = 0
      let lastLineAt = 0
      while (petting && alive && heldFor < 25) {
        await sleep(0.2)
        heldFor += 0.2
        if (heldFor > 1.4 && eyeKind === 'normal') {
          // After a moment of being stroked, the eyes close completely.
          setEyes('closed')
          gsap.to(whole, { scaleY: 0.93, scaleX: 1.04, duration: 1.2, ease: 'sine.inOut', svgOrigin: FEET })
        }
        if (heldFor - lastLineAt > 2.8) {
          lastLineAt = heldFor
          say(pick(LINES.purr), 2.6, { dots: false })
        }
      }

      purr.kill()
      gsap.set(torso, { x: 0 })
      petting = false
      setEyes('normal')
      gsap.to(eyes.normal, { x: 0, y: 0, duration: 0.3 })
      gsap.to(eyeScale, { scaleY: 1, duration: 0.3, svgOrigin: EYES })
      lookAt(0, 0)
      earsTo(0, 0, 0.3)
      gsap.to(torso, { skewX: 0, duration: 0.4, svgOrigin: TORSO_PIVOT })
      gsap.to(whole, { scaleY: 1, scaleX: 1, duration: 0.4, ease: 'back.out(2)', svgOrigin: FEET })
      say(pick(LINES.petEnd), 1.8, { dots: false })
      carryOn()
    },

    /** Tap or click: it is knocked over backwards, sees stars, and gets back up. */
    topple: async (lieLine, afterLine) => {
      const carryOn = freezeMotion()
      // It falls towards whichever side has more room.
      const direction = currentX() >= maxX() / 2 ? 1 : -1
      const pivot = direction === 1 ? '18 88' : '94 88'
      say(pick(LINES.boop), 1.2, { dots: false })
      gsap.to(legs, { x: direction * 10, y: -3, duration: 0.18, ease: 'power2.out' })
      gsap.to(shadow, { autoAlpha: 0.35, duration: 0.3 })
      await gsap.to(whole, { rotation: -direction * 80, duration: 0.5, ease: 'power2.in', svgOrigin: pivot })
      await gsap.to(whole, { y: -3, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.out', svgOrigin: pivot })
      await lieDazed(lieLine, 2)
      await getUp(afterLine, pivot)
      carryOn()
    },

    /** A crisp salute with one ear. */
    salute: async () => {
      say(pick(LINES.salute), 2.4, { dots: false })
      setEyes('happy')
      gsap.to(torso, { skewX: -3, duration: 0.2, svgOrigin: TORSO_PIVOT })
      await gsap.to(earRight, { rotation: -105, duration: 0.25, ease: 'back.out(2)', svgOrigin: EAR_RIGHT })
      await sleep(1.3)
    },

    /** A show-off backflip, with a landing score. */
    flip: async () => {
      say(pick(LINES.flipStart), 1.4, { dots: false })
      await sleep(0.4)
      const direction = Math.random() < 0.5 ? 1 : -1
      gsap.to(shadow, { scaleX: 0.55, autoAlpha: 0.4, duration: 0.4, yoyo: true, repeat: 1, svgOrigin: GROUND })
      gsap.to(whole, { y: -40, duration: 0.4, ease: 'sine.out', svgOrigin: '56 53' })
      gsap.to(whole, { y: 0, duration: 0.4, delay: 0.4, ease: 'sine.in', svgOrigin: '56 53' })
      await gsap.to(whole, { rotation: direction * 360, duration: 0.8, ease: 'power1.inOut', svgOrigin: '56 53' })
      gsap.set(whole, { rotation: 0, y: 0, svgOrigin: FEET })
      await gsap.to(whole, { scaleX: 1.1, scaleY: 0.88, duration: 0.1, svgOrigin: FEET })
      setEyes('happy')
      say(pick(LINES.flipEnd), 2.2, { dots: false })
      await gsap.to(whole, { scaleX: 1, scaleY: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)', svgOrigin: FEET })
      await sleep(1)
    },

    /** Strikes a model pose, with sparkles. */
    pose: async () => {
      setEyes('happy')
      say(pick(LINES.pose), 2.6, { dots: false })
      gsap.to(torso, { skewX: -7, duration: 0.3, svgOrigin: TORSO_PIVOT })
      earsTo(-25, -62, 0.3)
      gsap.set(stars, { autoAlpha: 1 })
      stars.forEach((star, index) => {
        gsap.to(star, { rotation: 360, duration: 1.4, ease: 'none', svgOrigin: `${[30, 56, 82][index]} ${[10, 4, 10][index]}` })
        gsap.to(star, { autoAlpha: 0, duration: 0.4, delay: 1.2 })
      })
      await sleep(1.8)
    },
  }

  let lastBusyReplyAt = 0

  /** Hover (it gets petted) or tap (it gets knocked over). If the bot is mid-action it answers in character without being interrupted. */
  const poke = async (kind) => {
    if (!alive) return
    const now = Date.now()
    // Every tap is counted, even while it is still busy reacting to the last one.
    if (kind === 'tap') {
      tapCount = now - lastTapAt > 6000 ? 1 : tapCount + 1
      lastTapAt = now
    }
    const grumble = () => LINES.annoyed[Math.min(tapCount - 3, LINES.annoyed.length - 1)]

    if (reacting) {
      if (kind === 'tap') {
        if (petting) {
          // Tapped in the middle of being petted: the petting ends, and it falls over right after.
          petting = false
          queuedTap = true
        } else if (tapCount >= 3 && now - lastBusyReplyAt > 700) {
          // Keep poking mid-reaction and it grumbles louder, without restarting the animation.
          lastBusyReplyAt = now
          say(grumble(), 2.4, { dots: false })
        }
      }
      return
    }

    // Calm actions (walking and running) can be interrupted; the busier ones answer in character.
    const calm = ['', 'walk', 'run'].includes(currentName)
    const isFree = (earsFree || calm) && eyeKind === 'normal'
    if (!isFree) {
      if (now - lastBusyReplyAt > 900) {
        lastBusyReplyAt = now
        say(pick(LINES.busy[currentName] || LINES.busy.default), 2.2, { dots: false })
      }
      return
    }

    reacting = true
    earsFree = false
    trackingMouse = false
    try {
      if (kind === 'hover') await reactions.pet()
      else await reactions.topple(tapCount >= 3 ? grumble() : pick(LINES.boopLie), pick(LINES.boopAfter))
    } finally {
      resetFace()
      earsFree = true
      trackingMouse = true
      reacting = false
      if (queuedTap) {
        queuedTap = false
        poke('tap')
      }
    }
  }

  // ---------- More fun moments ----------
  // The show-off reactions also happen on their own from time to time.
  const salute = async () => {
    earsFree = false
    trackingMouse = false
    await reactions.salute()
    resetFace()
  }
  const pose = async () => {
    earsFree = false
    trackingMouse = false
    await reactions.pose()
    resetFace()
  }
  const flip = async () => {
    earsFree = false
    trackingMouse = false
    await reactions.flip()
    resetFace()
  }

  /** Glides backwards with its legs working overtime, then strikes a pose with both ears up. */
  const moonwalk = async () => {
    earsFree = false
    setEyes('happy')
    say(pick(LINES.moonwalk), 3, { dots: false })
    const limit = maxX()
    const from = Math.min(currentX(), limit)
    const direction = from < limit / 2 ? 1 : -1
    const to = Math.max(0, Math.min(limit, from + direction * random(80, 130)))
    legCycle.timeScale(1.8).play()
    // It leans away from the way it is gliding.
    gsap.to(torso, { skewX: direction * 7, duration: 0.3, svgOrigin: TORSO_PIVOT })
    await gsap.to(walker, { x: to, duration: Math.abs(to - from) / 55, ease: 'sine.inOut' })
    stopWalking()
    earsTo(40, -40, 0.15)
    await sleep(1)
  }

  /** Counts out push-ups, squashing down and springing back, and gets a little sweaty. */
  const pushups = async () => {
    earsFree = false
    trackingMouse = false
    lookAt(0, PUPIL_RANGE_Y)
    for (const count of ['one!', 'two!', 'three!', 'four…']) {
      say(count, 0.8, { dots: false })
      await gsap.to(whole, { scaleY: 0.82, scaleX: 1.08, duration: 0.24, ease: 'power2.in', svgOrigin: FEET })
      await gsap.to(whole, { scaleY: 1, scaleX: 1, duration: 0.24, ease: 'power2.out', svgOrigin: FEET })
    }
    gsap.to(sweat, { autoAlpha: 1, y: 3, duration: 0.3 })
    say(pick(LINES.pushupsEnd), 2.4, { dots: false })
    await sleep(2)
  }

  /** Spins on the spot three times (flipping about its middle), then wobbles, dizzy. */
  const spin = async () => {
    earsFree = false
    setEyes('happy')
    say(pick(LINES.spin), 2, { dots: false })
    for (let turn = 0; turn < 3; turn += 1) {
      await gsap.to(whole, { scaleX: -1, duration: 0.2, ease: 'sine.inOut', svgOrigin: FEET })
      await gsap.to(whole, { scaleX: 1, duration: 0.2, ease: 'sine.inOut', svgOrigin: FEET })
    }
    setEyes('dizzy')
    gsap.set(stars, { autoAlpha: 1 })
    stars.forEach((star, index) => {
      gsap.to(star, { rotation: 360, duration: 1.1, ease: 'none', svgOrigin: `${[30, 56, 82][index]} ${[10, 4, 10][index]}` })
    })
    say(pick(LINES.spinAfter), 2, { dots: false })
    await gsap.to(torso, { skewX: 4, duration: 0.25, yoyo: true, repeat: 5, ease: 'sine.inOut', svgOrigin: TORSO_PIVOT })
    await sleep(0.4)
  }

  /** Takes a phone call with an ear to its head and a very designer conversation. */
  const phoneCall = async () => {
    earsFree = false
    trackingMouse = false
    lookAt(-PUPIL_RANGE_X, 0)
    gsap.to(torso, { skewX: 3, duration: 0.3, svgOrigin: TORSO_PIVOT })
    await gsap.to(earRight, { rotation: -62, duration: 0.3, ease: 'back.out(2)', svgOrigin: EAR_RIGHT })
    for (const line of pick(LINES.phone)) {
      say(line, 1.7, { dots: false })
      await sleep(readTime(line) + 0.5)
    }
  }

  /** Shadow-boxes with both ears, swaying side to side. */
  const shadowBox = async () => {
    earsFree = false
    trackingMouse = false
    say(pick(LINES.box), 3, { dots: false })
    for (let round = 0; round < 8; round += 1) {
      const leftPunch = round % 2 === 0
      gsap.to(torso, { skewX: leftPunch ? 6 : -6, duration: 0.12, svgOrigin: TORSO_PIVOT })
      await gsap.to(leftPunch ? earLeft : earRight, {
        rotation: leftPunch ? -35 : 35,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        svgOrigin: leftPunch ? EAR_LEFT : EAR_RIGHT,
      })
    }
    gsap.to(torso, { skewX: 0, duration: 0.2, svgOrigin: TORSO_PIVOT })
    await sleep(0.4)
  }

  /** Sits down (its legs shorten) and glances around for a while, then stands back up. */
  const sit = async () => {
    earsFree = false
    trackingMouse = false
    say(pick(LINES.sit), 3, { dots: false })
    gsap.to(legs, { scaleY: 0.35, transformOrigin: '50% 0%', duration: 0.5, ease: 'power2.out' })
    await gsap.to(whole, { y: 14, duration: 0.5, ease: 'power2.out', svgOrigin: FEET })
    for (const [x, y] of [[-PUPIL_RANGE_X, 0], [PUPIL_RANGE_X, 0], [0, -PUPIL_RANGE_Y]]) {
      lookAt(x, y)
      await sleep(0.7)
    }
    gsap.to(legs, { scaleY: 1, duration: 0.4, ease: 'power2.out' })
    await gsap.to(whole, { y: 0, duration: 0.4, ease: 'back.out(2)', svgOrigin: FEET })
  }

  /** Brags about its toolbox: a short, nerdy design-and-AI conversation with itself. */
  const toolTalk = async () => {
    earsFree = false
    trackingMouse = false
    gsap.to(torso, { skewX: -3, duration: 0.3, svgOrigin: TORSO_PIVOT })
    for (const line of pick(LINES.toolTalk)) {
      setEyes('normal')
      lookAt(random(-PUPIL_RANGE_X, PUPIL_RANGE_X), random(-PUPIL_RANGE_Y, 0))
      say(line, 2.2, { dots: false })
      await sleep(readTime(line) + 0.5)
    }
  }

  const actions = [
    { run: walk, weight: 4 },
    { run: run, weight: 1.5 },
    { run: think, weight: 2 },
    { run: lookAround, weight: 2 },
    { run: jump, weight: 2 },
    { run: dance, weight: 1.5 },
    { run: wave, weight: 1.5 },
    { run: stretch, weight: 1 },
    { run: nap, weight: 1 },
    { run: sneeze, weight: 1 },
    { run: edgeScare, weight: 1.5 },
    { run: slip, weight: 1.5 },
    { run: trip, weight: 1 },
    { run: tumble, weight: 1 },
    { run: salute, weight: 1 },
    { run: pose, weight: 1 },
    { run: flip, weight: 1 },
    { run: moonwalk, weight: 1.2 },
    { run: pushups, weight: 1 },
    { run: spin, weight: 1.2 },
    { run: phoneCall, weight: 1 },
    { run: shadowBox, weight: 1 },
    { run: sit, weight: 1.2 },
    { run: toolTalk, weight: 2 },
  ]

  const recent = []
  const pickAction = () => {
    // Never repeat anything from the last three actions, so there is always something new to watch.
    const options = actions.filter((action) => !recent.includes(action.run))
    const total = options.reduce((sum, action) => sum + action.weight, 0)
    let roll = Math.random() * total
    return options.find((action) => (roll -= action.weight) < 0) || options[0]
  }

  /** Says this bot's share of the opening conversation while it carries on moving about. */
  const introduce = async () => {
    planIntro()
    introOrigin = introOrigin ?? Date.now()
    for (const [index, line] of INTRO.entries()) {
      if (line.who !== placement) continue
      const wait = introTimes[index] - (Date.now() - introOrigin) / 1000
      if (wait > 0) await sleep(wait)
      if (!alive) return
      // If a visitor is already poking it, wait for the reaction to finish rather than talking over it.
      while (reacting && alive) await sleep(0.2)
      say(line.text, 3, { dots: false, intro: true })
      if (line.wave && earsFree) {
        earsTo(0, -70, 0.25)
        await sleep(1)
        if (earsFree) earsTo(0, 0, 0.3)
      }
    }
    await sleep(3.2)
    introTalking = false
  }

  const pickWalking = () => {
    const strolls = actions.filter((action) => [walk, run, lookAround, jump, dance].includes(action.run) && !recent.includes(action.run))
    return pick(strolls.length ? strolls : [actions[0]])
  }

  const live = async () => {
    rest()
    introduce()
    gsap.set(walker, { x: maxX() * random(0.1, 0.5) })
    await sleep(random(0.8, 1.6))
    while (alive) {
      while (reacting && alive) await sleep(0.15)
      // While the bots are introducing themselves they stroll about, so they are never just standing there talking.
      const action = introTalking ? pickWalking() : pickAction()
      recent.push(action.run)
      if (recent.length > 3) recent.shift()
      currentName = action.run.name
      inAction = true
      await action.run()
      inAction = false
      if (!alive) break
      currentName = ''
      while (reacting && alive) await sleep(0.15)
      rest()
      await sleep(random(0.3, 1.4))
    }
  }

  blinkLoop()
  twitchLoop()
  glanceLoop()
  live()

  return () => {
    alive = false
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerdown', handlePointerDown)
    window.removeEventListener('pointerup', handlePointerUp)
    breathing.kill()
    legCycle.kill()
    pending.forEach((call) => call.kill())
    gsap.killTweensOf([walker, whole, torso, earLeft, earRight, shadow, sweat, bubble, eyes.normal, eyeScale, ...legs, ...stars, ...pupils])
  }
}
