import { useLayoutEffect, useRef } from 'react'
import './Hero.css'
import adinathPhoto from '../assets/hero/adinath-photo.jpg'
import arrowIcon from '../assets/figma/icon-arrow-right.svg'
import resumeIcon from '../assets/figma/icon-resume.svg'
import PromptEditor from './PromptEditor'
import ProcessCard from './ProcessCard'
import LogoStickers from './LogoStickers'
import ClaudeBuddy from './ClaudeBuddy'
import { gsap, Draggable, defaultEase } from '../hooks/gsapSetup'
import { scrollToSection } from '../hooks/useSmoothScroll'

const palette = [
  { name: 'charcoal', hex: '#343D4B' },
  { name: 'cobalt', hex: '#2F54EB' },
  { name: 'ember', hex: '#FF481D' },
  { name: 'sun', hex: '#FFB551' },
]

const POINTER_DRIFT_PX = 18

// Everything on the canvas that can be picked up and moved.
const DRAGGABLE_SELECTORS = [
  '.canvas-item--process',
  '.canvas-item--logo',
  '.palette-chip',
  '.canvas-item--sticky',
  '.canvas-stack-item--photo',
  '.canvas-item--cursor-adinath',
  '.canvas-item--prompt',
]

/** A wide, rounded arrowhead with a notched back edge, like the collaborator cursors in design tools. */
function CursorArrow() {
  return (
    <svg className="cursor-arrow" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3L5 20L12 16.2L19 20Z"
        transform="rotate(-45 12 12)"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const stageRef = useRef(null)
  const dragBoundsRef = useRef(null)
  const entranceTimelineRef = useRef(null)

  useLayoutEffect(() => {
    const motionPreference = gsap.matchMedia()

    // Entrance: the frame appears first, then the cards settle in and the ink is drawn.
    motionPreference.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({ defaults: { ease: defaultEase } })
      entranceTimelineRef.current = timeline
      timeline
        .from('.selection-frame', { opacity: 0, scale: 0.96, duration: 0.9 })
        .from('.hero-entrance', { y: 18, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.6')
        .from('.canvas-item, .canvas-stack-item', { opacity: 0, scale: 0.88, y: 28, duration: 0.9, stagger: 0.08 }, '-=0.5')
        .from('.draw-path', { strokeDashoffset: 1, duration: 0.9, stagger: 0.06, ease: 'power2.inOut' }, '-=0.4')

      return () => {
        entranceTimelineRef.current = null
      }
    }, heroRef)

    // Pointer motion: cards drift slightly at different depths and the "You" cursor follows the mouse.
    motionPreference.add(
      '(prefers-reduced-motion: no-preference) and (hover: hover) and (min-width: 1200px)',
      () => {
        const hero = heroRef.current
        const stage = stageRef.current
        const you = stage.querySelector('.cursor-you')

        const drifters = gsap.utils.toArray('[data-depth]', stage).map((element) => ({
          depth: Number(element.dataset.depth),
          moveX: gsap.quickTo(element, 'x', { duration: 1.2, ease: 'power3.out' }),
          moveY: gsap.quickTo(element, 'y', { duration: 1.2, ease: 'power3.out' }),
        }))
        const youX = gsap.quickTo(you, 'x', { duration: 0.6, ease: 'power3.out' })
        const youY = gsap.quickTo(you, 'y', { duration: 0.6, ease: 'power3.out' })

        const handlePointerMove = (event) => {
          const box = stage.getBoundingClientRect()
          const normalizedX = (event.clientX - (box.left + box.width / 2)) / (box.width / 2)
          const normalizedY = (event.clientY - (box.top + box.height / 2)) / (box.height / 2)
          drifters.forEach(({ depth, moveX, moveY }) => {
            moveX(-normalizedX * depth * POINTER_DRIFT_PX)
            moveY(-normalizedY * depth * POINTER_DRIFT_PX)
          })
          youX(event.clientX - box.left - you.offsetLeft)
          youY(event.clientY - box.top - you.offsetTop)
          // Over the prompt box the label would cover the text, so it steps aside.
          const isOverPrompt = Boolean(event.target.closest('.prompt-editor'))
          gsap.to(you, { opacity: isOverPrompt ? 0 : 1, duration: 0.2, overwrite: 'auto' })
        }

        const handlePointerLeave = () => {
          drifters.forEach(({ moveX, moveY }) => {
            moveX(0)
            moveY(0)
          })
          youX(0)
          youY(0)
        }

        hero.addEventListener('pointermove', handlePointerMove)
        hero.addEventListener('pointerleave', handlePointerLeave)
        return () => {
          hero.removeEventListener('pointermove', handlePointerMove)
          hero.removeEventListener('pointerleave', handlePointerLeave)
        }
      },
      heroRef,
    )

    // Drag and drop: every card can be moved anywhere inside the canvas.
    // Dragging is switched off on phones, where the cards stack and the page must scroll freely.
    motionPreference.add('(min-width: 768px)', () => {
      const stage = stageRef.current
      let draggables = []

      const enableDragging = () => {
        draggables = DRAGGABLE_SELECTORS.flatMap((selector) =>
          Draggable.create(gsap.utils.toArray(selector, stage), {
            type: 'x,y',
            // Cards stop short of the canvas edge so nothing ever touches the marquee below.
            bounds: dragBoundsRef.current,
            cursor: 'grab',
            activeCursor: 'grabbing',
            zIndexBoost: true,
            minimumMovement: 4,
            // A card lifts slightly while it is actually being dragged, and settles back afterwards.
            // (Clicking into the prompt box is not a drag, so it never triggers this.)
            onDragStart() {
              gsap.to(this.target, { scale: 1.03, duration: 0.25, ease: defaultEase, overwrite: 'auto' })
            },
            onDragEnd() {
              gsap.to(this.target, { scale: 1, duration: 0.35, ease: defaultEase, overwrite: 'auto' })
            },
            onRelease() {
              gsap.to(this.target, { scale: 1, duration: 0.35, ease: defaultEase, overwrite: 'auto' })
            },
          }),
        )
      }

      // The entrance animation and dragging both move the cards, so dragging starts once it has finished.
      const entrance = entranceTimelineRef.current
      if (entrance && entrance.progress() < 1) {
        entrance.eventCallback('onComplete', enableDragging)
      } else {
        enableDragging()
      }

      return () => draggables.forEach((draggable) => draggable.kill())
    }, heroRef)

    return () => motionPreference.revert()
  }, [])

  const goToWork = (event) => {
    event.preventDefault()
    scrollToSection('work')
  }

  return (
    <section className="hero-canvas" ref={heroRef} aria-labelledby="hero-name">
      <div className="canvas-stage" ref={stageRef}>
        <div className="canvas-drag-bounds" ref={dragBoundsRef} aria-hidden="true" />

        {/* Hand-drawn arrows and doodles: ink on the canvas, drawn in as the page loads */}
        <svg className="canvas-doodle canvas-doodle--arrow-frame" width="170" height="120" viewBox="0 0 170 120" aria-hidden="true">
          <path className="draw-path" pathLength="1" d="M6 10C18 88 92 112 150 76" />
          <path className="draw-path" pathLength="1" d="M126 66L152 75L136 98" />
        </svg>
        <svg className="canvas-doodle canvas-doodle--arrow-photo" width="140" height="110" viewBox="0 0 140 110" aria-hidden="true">
          <path className="draw-path" pathLength="1" d="M132 6C112 70 56 96 14 82" />
          <path className="draw-path" pathLength="1" d="M34 66L12 82L38 94" />
        </svg>
        <div className="canvas-doodle canvas-doodle--say-hi" aria-hidden="true">
          <svg width="120" height="70" viewBox="0 0 120 70">
            <path className="draw-path" pathLength="1" d="M112 14C92 56 44 66 10 30" />
            <path className="draw-path" pathLength="1" d="M8 52L10 30L30 38" />
          </svg>
          <span className="doodle-note">say hi!</span>
        </div>
        <svg className="canvas-doodle canvas-doodle--sparkle" width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
          <path className="draw-path" pathLength="1" d="M30 4V16" />
          <path className="draw-path" pathLength="1" d="M30 44V56" />
          <path className="draw-path" pathLength="1" d="M4 30H16" />
          <path className="draw-path" pathLength="1" d="M44 30H56" />
          <path className="draw-path" pathLength="1" d="M12 12L20 20" />
          <path className="draw-path" pathLength="1" d="M40 40L48 48" />
          <path className="draw-path" pathLength="1" d="M48 12L40 20" />
          <path className="draw-path" pathLength="1" d="M20 40L12 48" />
        </svg>
        <svg className="canvas-doodle canvas-doodle--squiggle" width="100" height="40" viewBox="0 0 100 40" aria-hidden="true">
          <path className="draw-path" pathLength="1" d="M4 20C14 4 22 36 34 20S54 4 64 20S84 36 96 20" />
        </svg>


        {/* How I work, plus the tools I use as three separate logo stickers */}
        <ProcessCard />
        <LogoStickers />

        {/* Personal colour palette, shown as design-token chips */}
        <ul className="canvas-item canvas-item--palette" aria-hidden="true">
          {palette.map((color, index) => (
            <li className="palette-chip-drift" data-depth={0.4 + index * 0.1} key={color.hex}>
              <span className={`canvas-card palette-chip palette-chip--${index + 1}`}>
                <span className="palette-swatch" style={{ background: color.hex }} />
                <span className="palette-name">{color.name}</span>
                <span className="palette-hex">{color.hex}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* Sticky note: its own piece, at the top right beside the navbar */}
        <div className="canvas-item canvas-item--sticky" aria-hidden="true">
          <div className="canvas-drift" data-depth="0.9">
            <p className="sticky-note">clean · intuitive · human ✦</p>
          </div>
        </div>

        {/* The photo, with the bot walking along its bottom edge */}
        <div className="canvas-stack">
        <div className="canvas-stack-item canvas-stack-item--photo">
          <div className="canvas-drift" data-depth="0.6">
            <figure className="canvas-card photo-card">
              {/* The bot lives inside this wrapper, so the bottom edge of the photo is exactly its floor. */}
              <div className="photo-image-wrap">
                <img src={adinathPhoto} alt="Adinath Sakhare standing on a hilltop, looking into the distance" width="720" height="900" fetchPriority="high" />
                <ClaudeBuddy placement="photo" />
              </div>
              <figcaption className="photo-caption">hi, I’m Adiii 👋</figcaption>
            </figure>
          </div>
        </div>
        </div>

        {/* The selection frame holds the introduction */}
        <div className="selection-frame">
          <span className="frame-handle frame-handle--top-left" aria-hidden="true" />
          <span className="frame-handle frame-handle--top-right" aria-hidden="true" />
          <span className="frame-handle frame-handle--bottom-left" aria-hidden="true" />
          <span className="frame-handle frame-handle--bottom-right" aria-hidden="true" />

          {/* A second Claude Code bot, walking along the top border of the frame */}
          <ClaudeBuddy placement="frame" />

          <p className="hero-greeting hero-entrance">HEY THERE!!!</p>

          <h1 className="hero-name hero-entrance" id="hero-name">
            <span className="hero-name-line">I’m Adinath</span>
            <span className="hero-name-line">Sakhare</span>
          </h1>

          <p className="hero-role hero-entrance">
            <span className="hero-role-line">Ui/Ux Designer &amp;</span>{' '}
            <span className="hero-role-line">Frontend Developer</span>
          </p>

          <div className="hero-actions hero-entrance">
            <a className="hero-button hero-button--primary" href="#work" onClick={goToWork}>
              <span>View My Work</span>
              <img className="hero-button-icon hero-button-icon--rotated" src={arrowIcon} alt="" width="18" height="18" />
            </a>

            {/* The resume file is not ready yet, so this button is inactive for now. */}
            <a className="hero-button hero-button--secondary" role="link" aria-disabled="true" title="Coming soon">
              <span>Get Resume</span>
              <img className="hero-button-icon" src={resumeIcon} alt="" width="18" height="18" />
            </a>
          </div>

          <span className="frame-size-tag" aria-hidden="true">Hug × Hug</span>
        </div>

        {/* Cursors, like collaborators in a design file */}
        <div className="canvas-item canvas-item--cursor-adinath" aria-hidden="true">
          <span className="canvas-cursor canvas-cursor--adinath">
            <CursorArrow />
            <span className="cursor-label">Adinath S.</span>
          </span>
        </div>
        <span className="canvas-cursor canvas-cursor--you cursor-you" aria-hidden="true">
          <CursorArrow />
          <span className="cursor-label">You</span>
        </span>

        <div className="canvas-item canvas-item--prompt">
          <PromptEditor />
        </div>
      </div>
    </section>
  )
}
