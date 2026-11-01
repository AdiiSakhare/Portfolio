import './CanvasWidgets.css'
import figmaLogo from '../assets/hero/logos/figma-color.svg'
import claudeLogo from '../assets/hero/logos/claude-color.svg'
import codexLogo from '../assets/hero/logos/codex-color.svg'

// Colour marks from the open-source LobeHub icon set (served by jsDelivr).
// Each one is its own draggable sticker, placed separately on the canvas.
const stickers = [
  { id: 'figma', name: 'Figma', logo: figmaLogo, depth: 0.8 },
  { id: 'claude', name: 'Claude', logo: claudeLogo, depth: 0.6 },
  { id: 'codex', name: 'Codex', logo: codexLogo, depth: 0.9 },
]

export default function LogoStickers() {
  return (
    <div className="canvas-logos">
      {stickers.map((sticker) => (
        <div className={`canvas-item canvas-item--logo canvas-item--${sticker.id}`} key={sticker.id}>
          <div className="canvas-drift" data-depth={sticker.depth}>
            <span className={`canvas-card logo-sticker logo-sticker--${sticker.id}`}>
              <img src={sticker.logo} alt={sticker.name} title={sticker.name} width="64" height="64" loading="lazy" decoding="async" draggable="false" />
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
