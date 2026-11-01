import afrihustleImage from '../assets/figma/project-afrihustle-marketplace.png'
import designSystemImage from '../assets/figma/project-design-system.png'

// Tag colours follow the Figma chips: pink, green, yellow.
export const projects = [
  {
    id: 'afrihustle-marketplace',
    title: 'AfriHustle Marketplace App',
    accentColor: 'var(--color-project-orange)',
    description:
      'A marketplace app connecting African immigrants in the UK with traditional goods and services. It empowers small businesses through visibility, logistics, and community-driven financial tools.',
    image: afrihustleImage,
    imageDescription: 'Product page and home screen of the AfriHustle marketplace mobile app',
    tags: [
      { label: 'Ui/Ux', color: 'pink' },
      { label: 'Figma', color: 'green' },
      { label: 'Mobile App', color: 'yellow' },
    ],
  },
  {
    id: 'afrihustle-design-system',
    title: 'AfriHustle Marketplace App',
    accentColor: 'var(--color-project-blue)',
    description:
      'A marketplace app connecting African immigrants in the UK with traditional goods and services. It empowers small businesses through visibility, logistics, and community-driven financial tools.',
    image: designSystemImage,
    imageDescription: 'Design system components laid out on a dark canvas',
    tags: [
      { label: 'Ui/Ux', color: 'pink' },
      { label: 'Figma', color: 'green' },
      { label: 'Design System', color: 'yellow' },
    ],
  },
]
