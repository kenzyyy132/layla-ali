import './Angel.css';

const SOURCES = {
  'cupid-bow': '/images/art/cupid-bow.webp',
  'cupid-aim': '/images/art/cupid-aim.webp',
  'cherub-heart': '/images/art/cherub-heart.webp',
};

/**
 * Gilded cherub illustration that hovers on a gentle loop.
 * `flip` mirrors it; `delay` offsets the float so pairs don't move in sync.
 */
export default function Angel({ type, className = '', flip = false, delay = 0, eager = false }) {
  return (
    <span className={`angel angel--${type} ${className}`} style={{ '--delay': `${delay}s` }} aria-hidden="true">
      <img
        src={SOURCES[type]}
        alt=""
        draggable="false"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={flip ? { transform: 'scaleX(-1)' } : undefined}
      />
    </span>
  );
}

/** Gilded candle (from the candle reference) with a live flickering glow. */
export function Candle({ className = '', flip = false, delay = 0 }) {
  return (
    <span className={`candle ${className}`} style={{ '--delay': `${delay}s` }} aria-hidden="true">
      <span className="candle__glow" />
      <img src="/images/art/candle.webp" alt="" draggable="false" loading="lazy" style={flip ? { transform: 'scaleX(-1)' } : undefined} />
    </span>
  );
}
