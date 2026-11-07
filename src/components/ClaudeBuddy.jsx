import { useEffect, useRef } from 'react'
import './CanvasWidgets.css'
import { startBuddy } from './buddyBrain'

/**
 * The Claude Code bot, drawn as SVG from separate parts (body, ears, eyes with pupils, four legs).
 * Its behaviour lives in buddyBrain.js. It can live on the photo ("photo") or walk along
 * the top edge of the main frame ("frame").
 */
export default function ClaudeBuddy({ placement = 'photo' }) {
  const rootRef = useRef(null)

  useEffect(() => startBuddy(rootRef.current, { placement }), [placement])

  return (
    <div className={`claude-buddy claude-buddy--${placement}`} ref={rootRef} aria-hidden="true">
      <div className="buddy-walker">
        <div className="buddy-bubble-anchor" data-side="right">
          <p className="buddy-bubble">
            <span className="buddy-bubble-text">hmm…</span>
            <span className="buddy-dots"><i /><i /><i /></span>
          </p>
        </div>

        <svg className="buddy-svg" viewBox="0 0 112 88" role="presentation">
          <ellipse className="buddy-ground-shadow" cx="56" cy="88.2" rx="30" ry="2.4" />

          <g className="buddy-whole">
            <g className="buddy-torso">
              {/* The legs belong to the body and start 8px up inside it, so they stay attached however it tilts or bobs. */}
              <g className="buddy-legs">
                <rect className="buddy-leg buddy-leg-a buddy-fill" x="21" y="66" width="7" height="22" />
                <rect className="buddy-leg buddy-leg-b buddy-fill" x="35" y="66" width="7" height="22" />
                <rect className="buddy-leg buddy-leg-b buddy-fill" x="70" y="66" width="7" height="22" />
                <rect className="buddy-leg buddy-leg-a buddy-fill" x="84" y="66" width="7" height="22" />
              </g>
              <rect className="buddy-ear-left buddy-fill" x="0" y="40" width="14" height="14" />
              <rect className="buddy-ear-right buddy-fill" x="98" y="40" width="14" height="14" />
              <rect className="buddy-body buddy-fill" x="14" y="18" width="84" height="56" />

              {/* The outer group only moves (look up, nudge); the inner one only scales (blink, squash).
                  GSAP bakes pivot compensation into x/y when scaling, so sharing one element let a blink
                  and a nudge fight and leave the eyes floating above the body. */}
              <g className="buddy-eyes-normal">
                <g className="buddy-eyes-scale">
                  <rect x="28" y="30" width="7" height="14" fill="#ffffff" />
                  <rect x="77" y="30" width="7" height="14" fill="#ffffff" />
                  <rect className="buddy-pupil" x="29.7" y="33.8" width="3.6" height="6.4" />
                  <rect className="buddy-pupil" x="78.7" y="33.8" width="3.6" height="6.4" />
                </g>
              </g>
              <g className="buddy-eyes-happy" opacity="0" visibility="hidden">
                <path d="M28 31L38 38L28 45" />
                <path d="M84 31L74 38L84 45" />
              </g>
              <g className="buddy-eyes-dizzy" opacity="0" visibility="hidden">
                <path d="M27 32L36 42M36 32L27 42" />
                <path d="M76 32L85 42M85 32L76 42" />
              </g>
              <g className="buddy-eyes-closed" opacity="0" visibility="hidden">
                <path d="M26 38H37" />
                <path d="M75 38H86" />
              </g>
            </g>

            <path className="buddy-sweat" d="M95 10C91 16 91 20 95 20C99 20 99 16 95 10Z" opacity="0" />

            <g className="buddy-stars-group">
              <path className="buddy-star" d="M0-5L1.4-1.4L5 0L1.4 1.4L0 5L-1.4 1.4L-5 0L-1.4-1.4Z" transform="translate(30 10)" />
              <path className="buddy-star" d="M0-5L1.4-1.4L5 0L1.4 1.4L0 5L-1.4 1.4L-5 0L-1.4-1.4Z" transform="translate(56 4)" />
              <path className="buddy-star" d="M0-5L1.4-1.4L5 0L1.4 1.4L0 5L-1.4 1.4L-5 0L-1.4-1.4Z" transform="translate(82 10)" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}
