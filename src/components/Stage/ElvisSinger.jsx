import { wedding } from '../../config/wedding.js';
import './ElvisSinger.css';

// Rising music notes, drawn as gold line-art (text glyphs can render as emoji on phones).
const NOTE_PATHS = [
  'M9 3v13.5a3.5 3.5 0 1 1-2-3.2V3z',
  'M7 4l10-2v12.5a3 3 0 1 1-2-2.8V5.6L9 6.8v9.7a3 3 0 1 1-2-2.8z',
];
const NOTES = [0, 1, 0, 1, 0, 1];

/**
 * 2D Elvis built from the supplied character art (gold lamé jacket), cut into
 * three aligned layers:
 *   base → body, legs & microphone stand (sways from the feet, rocking the mic)
 *   arm  → the pointing arm, swinging to the beat from the shoulder
 *   head → nods and tilts toward the microphone from the neck
 * Pivot points live in ElvisSinger.css; the beat is 0.714 s (84 bpm).
 */
export default function ElvisSinger({ singing = true }) {
  const { base, head, arm } = wedding.performance.layers;
  return (
    <div
      className={`singer${singing ? ' is-singing' : ''}`}
      role="img"
      aria-label={`Illustration: ${wedding.performance.performer} in a gold jacket, singing into a microphone for ${wedding.couple.groom} and ${wedding.couple.bride}`}
    >
      <div className="singer__body" aria-hidden="true">
        <img className="singer__layer" src={base} alt="" draggable="false" fetchPriority="high" />
        <img className="singer__layer singer__layer--arm" src={arm} alt="" draggable="false" />
        <img className="singer__layer singer__layer--head" src={head} alt="" draggable="false" />
        <img className="singer__sparkle singer__sparkle--mic" src="/images/art/star.webp" alt="" />
        <img className="singer__sparkle singer__sparkle--hand" src="/images/art/star.webp" alt="" />
      </div>
      <div className="singer__notes" aria-hidden="true">
        {NOTES.map((n, i) => (
          <span key={i} style={{ '--i': i }}>
            <svg viewBox="0 0 20 20">
              <path d={NOTE_PATHS[n]} fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
