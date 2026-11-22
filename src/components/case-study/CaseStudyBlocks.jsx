import { tools } from '../../data/projects'

/** A section shell: heading on top, content below. The sticky rail does the navigating. */
export function CaseStudySection({ id, eyebrow, title, children }) {
  return (
    <section className="cs-section" id={id} aria-labelledby={`${id}-heading`}>
      <header className="cs-section-head" data-reveal>
        {eyebrow && <p className="cs-eyebrow">{eyebrow}</p>}
        <h2 className="cs-section-title" id={`${id}-heading`}>{title}</h2>
      </header>
      <div className="cs-section-body">{children}</div>
    </section>
  )
}

export function TextBlock({ section }) {
  return (
    <CaseStudySection id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <div className="cs-prose" data-reveal>
        {section.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
      {section.highlight && (
        <blockquote className="cs-highlight" data-reveal>{section.highlight}</blockquote>
      )}
    </CaseStudySection>
  )
}

/** Any number of steps with any names, because projects don't share one process. */
export function ProcessBlock({ section }) {
  return (
    <CaseStudySection id={section.id} eyebrow="Process" title={section.title}>
      {section.intro && <p className="cs-prose cs-intro" data-reveal>{section.intro}</p>}
      <ol className="cs-steps">
        {section.steps.map((step, index) => (
          <li className="cs-step" key={`${step.label}-${index}`} data-reveal>
            <div className="cs-step-head">
              <span className="cs-step-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="cs-step-label">{step.label}</span>
            </div>
            <h3 className="cs-step-title">{step.title}</h3>
            <p className="cs-step-body">{step.body}</p>
            {step.image && (
              <figure className="cs-figure">
                <img src={step.image} alt={step.alt ?? ''} loading="lazy" decoding="async" />
              </figure>
            )}
          </li>
        ))}
      </ol>
    </CaseStudySection>
  )
}

/** One problem: what happened, why, why it mattered, an optional user quote and the fix shown in an image. */
export function FindingBlock({ section }) {
  const rows = [
    { label: 'What happened', text: section.happened },
    { label: 'Why', text: section.why },
    { label: 'Why it mattered', text: section.mattered },
  ]
  return (
    <CaseStudySection id={section.id} eyebrow={section.label} title={section.title}>
      <dl className="cs-finding" data-reveal>
        {rows.map((row) => (
          <div className="cs-finding-row" key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.text}</dd>
          </div>
        ))}
      </dl>
      {section.quote && (
        <figure className="cs-quote" data-reveal>
          <blockquote>“{section.quote.text}”</blockquote>
          <figcaption>{section.quote.source}</figcaption>
        </figure>
      )}
      {section.image && (
        <figure className="cs-figure" data-reveal>
          <img src={section.image} alt={section.alt ?? ''} loading="lazy" decoding="async" />
        </figure>
      )}
    </CaseStudySection>
  )
}

export function GalleryBlock({ section }) {
  return (
    <CaseStudySection id={section.id} eyebrow="Final design" title={section.title}>
      <ul className="cs-gallery">
        {section.images.map((item, index) => (
          <li className={`cs-gallery-item cs-gallery-item--${item.size}`} key={index} data-reveal>
            <figure className="cs-figure">
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
            </figure>
          </li>
        ))}
      </ul>
      {section.caption && <p className="cs-caption" data-reveal>{section.caption}</p>}
    </CaseStudySection>
  )
}

/** Shows where AI did the work and where the designer's judgement took over. */
export function AiLogBlock({ section }) {
  return (
    <CaseStudySection id={section.id} eyebrow="AI" title={section.title}>
      {section.intro && <p className="cs-prose cs-intro" data-reveal>{section.intro}</p>}
      <ul className="cs-ai-list">
        {section.entries.map((entry, index) => {
          const tool = tools[entry.toolId]
          return (
            <li className="cs-ai-entry" key={index} data-reveal>
              <div className="cs-ai-head">
                {tool && <img className="cs-ai-logo" src={tool.logo} alt="" />}
                <div>
                  <p className="cs-ai-tool">{tool?.label}</p>
                  <h3 className="cs-ai-task">{entry.task}</h3>
                </div>
              </div>
              {entry.prompt && <pre className="cs-ai-prompt"><code>{entry.prompt}</code></pre>}
              <dl className="cs-ai-notes">
                <div>
                  <dt>What it produced</dt>
                  <dd>{entry.outcome}</dd>
                </div>
                <div>
                  <dt>My call</dt>
                  <dd>{entry.myCall}</dd>
                </div>
              </dl>
            </li>
          )
        })}
      </ul>
    </CaseStudySection>
  )
}

export function OutcomeBlock({ section }) {
  return (
    <CaseStudySection id={section.id} eyebrow="Outcome" title={section.title}>
      {section.body && <p className="cs-prose" data-reveal>{section.body}</p>}
      {section.results.length > 0 && (
        <ul className="cs-results" data-reveal>
          {section.results.map((result) => (
            <li key={result.label}>
              <p className="cs-result-value">{result.value}</p>
              <p className="cs-result-label">{result.label}</p>
            </li>
          ))}
        </ul>
      )}
      {section.learnings.length > 0 && (
        <div className="cs-learnings" data-reveal>
          <h3 className="cs-learnings-title">What I learned</h3>
          <ul>
            {section.learnings.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
      )}
    </CaseStudySection>
  )
}

export const blocksByType = {
  text: TextBlock,
  process: ProcessBlock,
  finding: FindingBlock,
  gallery: GalleryBlock,
  'ai-log': AiLogBlock,
  outcome: OutcomeBlock,
}
