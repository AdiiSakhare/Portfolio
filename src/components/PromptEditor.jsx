import { useEffect, useRef, useState } from 'react'
import './PromptEditor.css'
import { profile } from '../data/profile'

const topics = ['Hello', 'Project', 'Hiring']

/**
 * A prompt-style box that doubles as a contact form.
 * Sending opens the visitor's email app with the message already written.
 */
export default function PromptEditor() {
  const [message, setMessage] = useState('')
  const [topic, setTopic] = useState(topics[0])
  const formRef = useRef(null)

  // Pressing anywhere outside the prompt lets go of the text box, so it returns to its resting size.
  // Draggable cards swallow the browser's own focus change, so this is done by hand.
  useEffect(() => {
    const handlePointerDown = (event) => {
      const form = formRef.current
      if (form && !form.contains(event.target) && form.contains(document.activeElement)) {
        document.activeElement.blur()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown, true)
    return () => document.removeEventListener('pointerdown', handlePointerDown, true)
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`[${topic}] Hi Adinath`)
    const body = encodeURIComponent(message)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.currentTarget.form.requestSubmit()
    }
  }

  return (
    <form className="prompt-editor canvas-card" ref={formRef} onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="prompt-message">Message to Adinath</label>
      <textarea
        className="prompt-input"
        id="prompt-message"
        rows="2"
        placeholder="What can we design together today?"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div className="prompt-toolbar">
        <span className="prompt-plus" aria-hidden="true">+</span>

        <div className="prompt-topics" role="radiogroup" aria-label="What is this about?">
          {topics.map((name) => (
            <button
              className={`prompt-topic${topic === name ? ' prompt-topic--active' : ''}`}
              type="button"
              role="radio"
              aria-checked={topic === name}
              onClick={() => setTopic(name)}
              key={name}
            >
              {name}
            </button>
          ))}
        </div>

        <span className="prompt-model">
          <strong>Adiii 2.0</strong>
          <span>Full focus</span>
        </span>

        <button className="prompt-send" type="submit" aria-label="Send by email">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </form>
  )
}
