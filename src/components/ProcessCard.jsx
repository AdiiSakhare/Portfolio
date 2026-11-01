import './CanvasWidgets.css'

// The four steps from "How I work". The first two are done, the third is in progress.
const steps = [
  { name: 'Frame the problem', detail: 'users · goals · constraints', status: 'done' },
  { name: 'Explore with AI', detail: 'Claude Code · Codex', status: 'done' },
  { name: 'Judge and refine', detail: 'taste decides', status: 'current' },
  { name: 'Hand off in code', detail: 'HTML · CSS · React', status: 'pending' },
]

function StepMarker({ status, number }) {
  if (status === 'done') {
    return (
      <span className="step-marker step-marker--done" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path className="step-check" pathLength="1" d="M2.5 6.4L5 8.8L9.5 3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )
  }
  return <span className={`step-marker step-marker--${status}`} aria-hidden="true">{number}</span>
}

/** A small progress card in the style of a lesson tracker, showing how I work. */
export default function ProcessCard() {
  return (
    <div className="canvas-item canvas-item--process">
      <div className="canvas-drift" data-depth="0.7">
        <section className="canvas-card process-card" aria-label="How I work">
          <h2 className="widget-title">How I work</h2>

          <ol className="process-list">
            {steps.map((step, index) => (
              <li className={`process-row process-row--${step.status}`} key={step.name}>
                <StepMarker status={step.status} number={index + 1} />
                <span className="process-row-text">
                  <span className="process-row-name">{step.name}</span>
                  <span className="process-row-detail">{step.detail}</span>
                  {step.status === 'current' && (
                    <span className="process-row-badge">
                      <span className="process-badge-dot" />
                      In progress
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}
