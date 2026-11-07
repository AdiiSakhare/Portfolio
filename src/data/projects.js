import figmaLogo from '../assets/hero/logos/figma-color.svg'
import claudeLogo from '../assets/hero/logos/claude-color.svg'
import codexLogo from '../assets/hero/logos/codex-color.svg'

import placeholder1 from '../assets/projects/placeholders/placeholder-1.svg'
import placeholder2 from '../assets/projects/placeholders/placeholder-2.svg'
import placeholder3 from '../assets/projects/placeholders/placeholder-3.svg'
import placeholder4 from '../assets/projects/placeholders/placeholder-4.svg'
import placeholder5 from '../assets/projects/placeholders/placeholder-5.svg'
import placeholder6 from '../assets/projects/placeholders/placeholder-6.svg'

/** Tools a project can list. `logo` is shown beside the project description. */
export const tools = {
  figma: { label: 'Figma', logo: figmaLogo },
  claude: { label: 'Claude Code', logo: claudeLogo },
  codex: { label: 'ChatGPT Codex', logo: codexLogo },
}

/**
 * Dummy content until the real screenshots, titles and copy arrive.
 * `layout` is 'tall-centre' (5 tiles), 'wide-left' (5) or 'offset-four' (4); see `.bento--*` in
 * SelectedWork.css. Swap `image` for the real file and fill in `alt`;
 * `hover` is one of 'zoom' | 'zoom-rotate' | 'rotate'.
 */
export const projects = [
  {
    id: 'project-one',
    title: 'Project One',
    description:
      'Placeholder description. A short summary of the problem, the audience and what was designed will go here.',
    toolIds: ['figma'],
    layout: 'tall-centre',
    tiles: [
      { image: placeholder1, alt: 'Placeholder screen 1', hover: 'zoom' },
      { image: placeholder2, alt: 'Placeholder screen 2', hover: 'rotate' },
      { image: placeholder3, alt: 'Placeholder screen 3', hover: 'zoom-rotate' },
      { image: placeholder4, alt: 'Placeholder screen 4', hover: 'zoom' },
      { image: placeholder5, alt: 'Placeholder screen 5', hover: 'zoom-rotate' },
    ],
  },
  {
    id: 'project-two',
    title: 'Project Two',
    description:
      'Placeholder description. A short summary of the problem, the audience and what was built with agentic AI will go here.',
    toolIds: ['claude'],
    layout: 'wide-left',
    tiles: [
      { image: placeholder6, alt: 'Placeholder screen 1', hover: 'zoom-rotate' },
      { image: placeholder1, alt: 'Placeholder screen 2', hover: 'zoom' },
      { image: placeholder2, alt: 'Placeholder screen 3', hover: 'rotate' },
      { image: placeholder3, alt: 'Placeholder screen 4', hover: 'zoom' },
      { image: placeholder4, alt: 'Placeholder screen 5', hover: 'zoom-rotate' },
    ],
  },
  {
    id: 'project-three',
    title: 'Project Three',
    description:
      'Placeholder description. Designed in Figma, then built with Claude Code; the write-up will cover both halves.',
    toolIds: ['figma', 'claude'],
    layout: 'offset-four',
    tiles: [
      { image: placeholder5, alt: 'Placeholder screen 1', hover: 'zoom' },
      { image: placeholder6, alt: 'Placeholder screen 2', hover: 'rotate' },
      { image: placeholder1, alt: 'Placeholder screen 3', hover: 'zoom-rotate' },
      { image: placeholder2, alt: 'Placeholder screen 4', hover: 'zoom' },
    ],
  },
  {
    id: 'project-four',
    title: 'Project Four',
    description:
      'Placeholder description. Built with ChatGPT Codex; the write-up will cover the prompts, the review and the result.',
    toolIds: ['codex'],
    layout: 'tall-centre',
    tiles: [
      { image: placeholder3, alt: 'Placeholder screen 1', hover: 'rotate' },
      { image: placeholder4, alt: 'Placeholder screen 2', hover: 'zoom' },
      { image: placeholder5, alt: 'Placeholder screen 3', hover: 'zoom' },
      { image: placeholder6, alt: 'Placeholder screen 4', hover: 'zoom-rotate' },
      { image: placeholder1, alt: 'Placeholder screen 5', hover: 'rotate' },
    ],
  },
]
