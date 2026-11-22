import placeholder1 from '../assets/projects/placeholders/placeholder-1.svg'
import placeholder2 from '../assets/projects/placeholders/placeholder-2.svg'
import placeholder3 from '../assets/projects/placeholders/placeholder-3.svg'
import placeholder4 from '../assets/projects/placeholders/placeholder-4.svg'
import placeholder5 from '../assets/projects/placeholders/placeholder-5.svg'
import placeholder6 from '../assets/projects/placeholders/placeholder-6.svg'

/*
 * Case-study content, keyed by the project `id` in projects.js. ALL TEXT HERE IS PLACEHOLDER:
 * no real client, number or result is claimed until Adinath supplies it.
 *
 * Projects don't share one process, so a case study is a plain list of `sections`, each with a
 * `type` that picks a layout. Use only the sections a project needs, in any order, and name the
 * process steps after what really happened:
 *
 * Top level: `category` (small label above the headline), `headline` (a short, punchy line),
 * `summary`, `stats` (0-4 numbers; leave empty until there are true ones), `notes` (the four sticky
 * notes: role, who with, goal, constraint) and `sections`.
 *
 *   text     { eyebrow, title, paragraphs[], highlight? }          a reading block, optional pull-quote
 *   finding  { label, title, happened, why, mattered, quote?{ text, source }, image?, alt? }   one problem and what changed
 *   process  { title, intro?, steps[{ label, title, body, image?, alt? }] }   any number of steps, any names
 *   gallery  { title, caption?, images[{ image, alt, size: 'full' | 'half' }] }
 *   ai-log   { title, intro?, entries[{ toolId, task, prompt?, outcome, myCall }] }   how AI was used and judged
 *   outcome  { title, body?, results[{ value, label }], learnings[] }
 *
 * `nav` is the short label for the section list; `id` becomes the in-page anchor.
 */

const placeholderNotes = [
  { label: 'My role', value: 'Placeholder role' },
  { label: 'Worked with', value: 'Placeholder team' },
  { label: 'Goal', value: 'Placeholder goal' },
  { label: 'Constraint', value: 'Placeholder constraint' },
]

// Clearly fake on purpose: real numbers go here only when Adinath supplies them.
const placeholderStats = [
  { value: '00', label: 'placeholder metric' },
  { value: '00', label: 'placeholder metric' },
  { value: '00', label: 'placeholder metric' },
]

/** Used for any project that has no write-up of its own yet. */
const genericStudy = (projectTitle) => ({
  category: 'Placeholder category',
  headline: 'Placeholder headline, one punchy line',
  summary: `Placeholder summary for ${projectTitle}: one or two sentences on what it is, who it is for and what changed.`,
  stats: placeholderStats,
  notes: placeholderNotes,
  sections: [
    {
      type: 'text',
      id: 'overview',
      nav: 'Overview',
      eyebrow: 'Overview',
      title: 'What this project is',
      paragraphs: [
        'Placeholder paragraph. Describe the product, the audience and the context in plain words.',
        'Placeholder paragraph. State what you were responsible for and what the brief asked for.',
      ],
    },
    {
      type: 'text',
      id: 'problem',
      nav: 'Problem',
      eyebrow: 'The problem',
      title: 'What was getting in the way',
      paragraphs: ['Placeholder paragraph. The problem, who felt it, and how it showed up.'],
      highlight: 'Placeholder pull-quote: the one-line version of the problem.',
    },
    {
      type: 'process',
      id: 'process',
      nav: 'Process',
      title: 'How it came together',
      intro: 'Placeholder intro. Say why this project followed this path.',
      steps: [
        { label: 'Step', title: 'Placeholder step one', body: 'Placeholder text about what you did and decided.', image: placeholder1, alt: 'Placeholder process image' },
        { label: 'Step', title: 'Placeholder step two', body: 'Placeholder text about what you did and decided.' },
        { label: 'Step', title: 'Placeholder step three', body: 'Placeholder text about what you did and decided.', image: placeholder2, alt: 'Placeholder process image' },
      ],
    },
    {
      type: 'gallery',
      id: 'final-design',
      nav: 'Final design',
      title: 'The result',
      caption: 'Placeholder caption for the final screens.',
      images: [
        { image: placeholder3, alt: 'Placeholder final screen', size: 'full' },
        { image: placeholder4, alt: 'Placeholder final screen', size: 'half' },
        { image: placeholder5, alt: 'Placeholder final screen', size: 'half' },
      ],
    },
    {
      type: 'outcome',
      id: 'outcome',
      nav: 'Outcome',
      title: 'Outcome and learnings',
      body: 'Placeholder paragraph. What happened after launch, only with facts that can be stated honestly.',
      results: [],
      learnings: ['Placeholder learning one.', 'Placeholder learning two.'],
    },
  ],
})

export const caseStudies = {
  // A design-led project: the process is the classic research -> design flow.
  'project-one': {
    ...genericStudy('Project One'),
    headline: 'Placeholder headline for a design-led project',
    summary:
      'Placeholder summary: a design-led project, organised around the problems found and what changed for each.',
    sections: [
      genericStudy('Project One').sections[0],
      genericStudy('Project One').sections[1],
      {
        type: 'finding',
        id: 'problem-1',
        nav: 'Problem 1',
        label: 'Problem 1',
        title: 'Placeholder: the first thing that got in people’s way',
        happened: 'Placeholder text: what you saw people do, and who it affected most.',
        why: 'Placeholder text: the cause behind it.',
        mattered: 'Placeholder text: what it cost the user and the product.',
        quote: { text: 'Placeholder user quote, in their own words.', source: 'User interview' },
        image: placeholder1,
        alt: 'Placeholder before and after screens',
      },
      {
        type: 'finding',
        id: 'problem-2',
        nav: 'Problem 2',
        label: 'Problem 2',
        title: 'Placeholder: the second problem',
        happened: 'Placeholder text: what you saw people do.',
        why: 'Placeholder text: the cause behind it.',
        mattered: 'Placeholder text: what it cost the user and the product.',
        image: placeholder2,
        alt: 'Placeholder screens',
      },
      genericStudy('Project One').sections[3],
      genericStudy('Project One').sections[4],
    ],
  },

  // An AI-assisted project: a different process, so it shows a different flow plus an AI log.
  'project-two': {
    ...genericStudy('Project Two'),
    headline: 'Placeholder headline for an AI-assisted project',
    summary:
      'Placeholder summary: a project built with agentic AI, covering the brief, the prompting, my review and the result.',
    sections: [
      genericStudy('Project Two').sections[0],
      genericStudy('Project Two').sections[1],
      {
        type: 'process',
        id: 'process',
        nav: 'Process',
        title: 'How it came together',
        intro: 'Placeholder intro. An AI-assisted path: the process followed the tool, not a template.',
        steps: [
          { label: 'Brief', title: 'Placeholder brief step', body: 'Placeholder text: what you asked for and the constraints you set.' },
          { label: 'Prompt', title: 'Placeholder prompting step', body: 'Placeholder text: how you broke the work into prompts.', image: placeholder3, alt: 'Placeholder prompting image' },
          { label: 'Review', title: 'Placeholder review step', body: 'Placeholder text: what the AI got wrong and how you corrected it.' },
          { label: 'Ship', title: 'Placeholder shipping step', body: 'Placeholder text: polish, testing and release.', image: placeholder4, alt: 'Placeholder shipping image' },
        ],
      },
      {
        type: 'ai-log',
        id: 'ai-log',
        nav: 'Working with AI',
        title: 'Working with AI',
        intro: 'Placeholder intro. AI did the typing; the design judgement stayed with me. Here is where each showed up.',
        entries: [
          {
            toolId: 'claude',
            task: 'Placeholder task, e.g. what you asked the tool to build',
            prompt: 'Placeholder prompt. Paste a real prompt here when the case study is written.',
            outcome: 'Placeholder: what the tool produced.',
            myCall: 'Placeholder: what you kept, changed or rejected, and why.',
          },
        ],
      },
      genericStudy('Project Two').sections[3],
      genericStudy('Project Two').sections[4],
    ],
  },
}

/** Returns the write-up for a project, or a generic placeholder one while the real one is not written. */
export const getCaseStudy = (project) => caseStudies[project.id] ?? genericStudy(project.title)
