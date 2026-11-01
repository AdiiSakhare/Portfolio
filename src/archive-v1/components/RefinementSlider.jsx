import { useLayoutEffect, useRef } from 'react'
import './RefinementSlider.css'
import { gsap, ScrollTrigger, defaultEase } from '../hooks/gsapSetup'
import { refinement } from '../data/refinement'

const hasRealImages = Boolean(refinement.draftImage && refinement.refinedImage)
const showPlaceholder = !hasRealImages && import.meta.env.DEV

/** Stand-in screens, shown only during local development. */
function PlaceholderScreen({ isRefined }) {
  return (
    <div className={`placeholder-screen${isRefined ? ' placeholder-screen--refined' : ''}`}>
      <span className="placeholder-block placeholder-block--title" />
      <span className="placeholder-block placeholder-block--line" />
      <span className="placeholder-block placeholder-block--line placeholder-block--short" />
      <span className="placeholder-block placeholder-block--button" />
      <span className="placeholder-caption">Placeholder: add a real pair in data/refinement.js</span>
    </div>
  )
}

export default function RefinementSlider() {
  const sliderRef = useRef(null)
  const rangeRef = useRef(null)

  const moveDivider = (percent) => {
    sliderRef.current?.style.setProperty('--split', percent)
  }

  // A gentle intro: the divider glides from the edge to the middle once, when scrolled into view.
  useLayoutEffect(() => {
    if (!sliderRef.current) return

    const motionPreference = gsap.matchMedia()
    motionPreference.add('(prefers-reduced-motion: no-preference)', () => {
      const position = { percent: 94 }
      moveDivider(position.percent)

      ScrollTrigger.create({
        trigger: sliderRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () =>
          gsap.to(position, {
            percent: 50,
            duration: 1.4,
            ease: defaultEase,
            onUpdate: () => {
              moveDivider(position.percent)
              if (rangeRef.current) rangeRef.current.value = position.percent
            },
          }),
      })
    })

    return () => motionPreference.revert()
  }, [])

  if (!hasRealImages && !showPlaceholder) return null

  return (
    <section className="refinement" aria-labelledby="refinement-heading" data-reveal>
      <header className="refinement-header">
        <h3 className="refinement-heading" id="refinement-heading">
          From first draft to final
        </h3>
        <p className="refinement-subheading">
          {refinement.projectName || 'Drag the divider to compare the AI draft with my refined version.'}
        </p>
      </header>

      <div className="refinement-slider" ref={sliderRef} style={{ '--split': 50 }}>
        <div className="refinement-layer refinement-layer--draft">
          {hasRealImages ? (
            <img src={refinement.draftImage} alt={refinement.draftImageDescription} loading="lazy" decoding="async" />
          ) : (
            <PlaceholderScreen isRefined={false} />
          )}
        </div>

        <div className="refinement-layer refinement-layer--refined">
          {hasRealImages ? (
            <img src={refinement.refinedImage} alt={refinement.refinedImageDescription} loading="lazy" decoding="async" />
          ) : (
            <PlaceholderScreen isRefined />
          )}
        </div>

        <span className="refinement-label refinement-label--draft">AI draft</span>
        <span className="refinement-label refinement-label--refined">Refined by me</span>

        <span className="refinement-divider" aria-hidden="true">
          <span className="refinement-handle">‹ ›</span>
        </span>

        {/* The native range input handles mouse, touch and keyboard, so it stays accessible. */}
        <input
          className="refinement-range"
          ref={rangeRef}
          type="range"
          min="0"
          max="100"
          step="1"
          defaultValue="50"
          aria-label="Compare the AI draft with the refined design"
          onInput={(event) => moveDivider(event.target.value)}
        />
      </div>

      {refinement.notes.length > 0 && (
        <ul className="refinement-notes">
          {refinement.notes.map((note) => (
            <li className="refinement-note" key={note.text}>
              <span className="refinement-note-label">{note.label}</span>
              {note.text}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
