// The before/after pair shown in the "How I work" section.
// Add two screenshots of the SAME screen: the first AI-generated draft, and your refined version.
//
//   import draftImage from '../assets/refinement/draft.png'
//   import refinedImage from '../assets/refinement/refined.png'
//
// Until both images are set, the slider is hidden on the live site
// (a labelled placeholder appears only while developing locally).
export const refinement = {
  projectName: '',
  draftImage: null,
  draftImageDescription: '',
  refinedImage: null,
  refinedImageDescription: '',
  // What you changed, in your own words. Example: { label: 'Changed', text: 'Rebuilt the spacing scale' }
  notes: [],
}
