/**
 * Shared royal ornament primitives. Gradients are declared once in <GoldDefs />
 * and referenced by id from every ornament on the page.
 */

const GOLD = '#d4af37';
const GOLD_LIGHT = '#f3d98b';

export function GoldDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="g-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a6b1c" />
          <stop offset="0.3" stopColor="#f3d98b" />
          <stop offset="0.5" stopColor="#d4af37" />
          <stop offset="0.72" stopColor="#fff1c1" />
          <stop offset="1" stopColor="#a8851f" />
        </linearGradient>
        <linearGradient id="g-gold-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff1c1" />
          <stop offset="0.45" stopColor="#d4af37" />
          <stop offset="1" stopColor="#7d6018" />
        </linearGradient>
        <linearGradient id="g-letter" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#fff6d6" />
          <stop offset="0.35" stopColor="#f3d98b" />
          <stop offset="0.65" stopColor="#d4af37" />
          <stop offset="1" stopColor="#9c7a22" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Horizontal divider: scrolled gold rule with a central heart. */
export function Flourish({ className = '', width = 320 }) {
  return (
    <svg className={className} width={width} viewBox="0 0 400 40" fill="none" aria-hidden="true">
      <path d="M8 20H150M250 20H392" stroke={GOLD} strokeWidth="1" />
      <path d="M40 20H150M250 20H360" stroke={GOLD_LIGHT} strokeWidth="0.5" transform="translate(0 4)" opacity="0.6" />
      <path
        d="M150 20c8-12 22-12 24-2 1 6-6 9-10 5M250 20c-8-12-22-12-24-2-1 6 6 9 10 5M150 20c8 12 22 12 24 2M250 20c-8 12-22 12-24 2"
        stroke={GOLD}
        strokeWidth="1.2"
      />
      <path d="M200 31c-9-6-14-10-14-15a6 6 0 0 1 14-3 6 6 0 0 1 14 3c0 5-5 9-14 15z" fill="url(#g-gold)" />
      <circle cx="8" cy="20" r="2.5" fill={GOLD} />
      <circle cx="392" cy="20" r="2.5" fill={GOLD} />
    </svg>
  );
}

/** Corner scrollwork. Rotate via the `position` prop: tl | tr | bl | br. */
export function Corner({ position = 'tl', className = '' }) {
  const rotate = { tl: 0, tr: 90, br: 180, bl: 270 }[position];
  return (
    <svg
      className={`corner corner--${position} ${className}`}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path d="M4 116V34C4 17 17 4 34 4h82" stroke="url(#g-gold)" strokeWidth="2.5" />
      <path d="M14 116V44c0-17 13-30 30-30h72" stroke={GOLD} strokeWidth="0.8" opacity="0.7" />
      <path
        d="M24 92V52c0-16 12-28 28-28h40M30 30c18 2 28 12 30 30-10-4-14-12-12-20M30 30c2 18 12 28 30 30"
        stroke={GOLD}
        strokeWidth="1.2"
      />
      <path d="M36 36c10-14 26-14 32-4-10 2-22 0-32 4zM36 36c-14 10-14 26-4 32 2-10 0-22 4-32z" fill="url(#g-gold)" />
      <circle cx="34" cy="34" r="4" fill="url(#g-gold)" />
      <circle cx="116" cy="4" r="2.5" fill={GOLD} />
      <circle cx="4" cy="116" r="2.5" fill={GOLD} />
    </svg>
  );
}

/** Crest for the top of frames: a heart cradled by floral scrolls (no crown). */
export function HeartCrest({ className = '', width = 140 }) {
  return (
    <svg className={className} width={width} viewBox="0 0 200 70" fill="none" aria-hidden="true">
      <g stroke="url(#g-gold)" strokeWidth="2" strokeLinecap="round">
        <path d="M84 40C70 22 46 20 34 32c-9 9-2 22 8 18 6-3 4-11-2-10" />
        <path d="M116 40c14-18 38-20 50-8 9 9 2 22-8 18-6-3-4-11 2-10" />
        <path d="M86 50C64 58 34 58 10 48M114 50c22 8 52 8 76-2" />
      </g>
      <g fill="url(#g-gold)">
        <path d="M54 30c-6-8-2-16 6-14-1 7-3 11-6 14zM146 30c6-8 2-16-6-14 1 7 3 11 6 14z" />
        <path d="M24 50c-6-4-6-10 0-12 2 5 2 8 0 12zM176 50c6-4 6-10 0-12-2 5-2 8 0 12z" />
        <path d="M100 62C82 50 74 42 74 32a13 13 0 0 1 26-6 13 13 0 0 1 26 6c0 10-8 18-26 30z" />
      </g>
      <path d="M100 54c-12-8-18-14-18-21a8 8 0 0 1 18-4" stroke="#fff6d6" strokeWidth="1.5" opacity="0.6" />
      <circle cx="100" cy="6" r="3" fill={GOLD_LIGHT} />
      <circle cx="10" cy="48" r="2.5" fill={GOLD} />
      <circle cx="190" cy="48" r="2.5" fill={GOLD} />
    </svg>
  );
}

/** Laurel leaves placed along an arc (angles in degrees, 0 = top, clockwise). */
function Wreath({ from, to, r = 92, count = 9, flip = false }) {
  return Array.from({ length: count }, (_, i) => {
    const a = from + ((to - from) * i) / (count - 1);
    const rad = (a * Math.PI) / 180;
    const x = 120 + r * Math.sin(rad);
    const y = 120 - r * Math.cos(rad);
    const s = 1 - (i / count) * 0.45;
    return (
      <g key={a} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a + (flip ? -90 : 90)}) scale(${s})`}>
        <path d="M0 0c4-8 12-10 16-6-4 6-10 8-16 6z" fill="url(#g-gold)" transform="rotate(-28)" />
        <path d="M0 0c4 8 12 10 16 6-4-6-10-8-16-6z" fill="url(#g-gold)" transform="rotate(28)" />
      </g>
    );
  });
}

/**
 * The couple's monogram: a calligraphic A and L interlaced inside a beaded
 * gold ring with a laurel wreath and a heart at its crown.
 */
export function Monogram({ className = '', size = 140, first = 'A', second = 'L' }) {
  const letter = {
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontStyle: 'italic',
    fontWeight: 600,
    fontSize: 132,
    fill: 'url(#g-letter)',
    stroke: '#070d24',
    strokeWidth: 5,
    paintOrder: 'stroke',
    strokeLinejoin: 'round',
  };
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 240 240" aria-hidden="true">
      <defs>
        {/* where the A passes back over the L, to read as interlaced */}
        <clipPath id="mono-over">
          <rect x="112" y="128" width="40" height="40" />
        </clipPath>
      </defs>
      <circle cx="120" cy="120" r="116" fill="#070d24" />
      <circle cx="120" cy="120" r="112" fill="none" stroke="url(#g-gold)" strokeWidth="3.5" />
      <circle cx="120" cy="120" r="105" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.8" />
      <circle cx="120" cy="120" r="100" fill="none" stroke={GOLD_LIGHT} strokeWidth="2.6" strokeDasharray="0 7.2" strokeLinecap="round" />
      <circle cx="120" cy="120" r="80" fill="#0b1638" />
      <Wreath from={196} to={300} />
      <Wreath from={164} to={60} flip />
      <path d="M120 30c-7-5-10-8-10-12a5 5 0 0 1 10-2 5 5 0 0 1 10 2c0 4-3 7-10 12z" fill="url(#g-gold)" />
      <text x="104" y="158" textAnchor="middle" style={letter}>
        {first}
      </text>
      <text x="142" y="168" textAnchor="middle" style={letter}>
        {second}
      </text>
      <text x="104" y="158" textAnchor="middle" style={letter} clipPath="url(#mono-over)">
        {first}
      </text>
      <circle cx="120" cy="212" r="3" fill={GOLD_LIGHT} />
    </svg>
  );
}

/** A small golden arrow with a heart-shaped tip, pointing right. */
export function HeartArrow({ className = '', width = 110 }) {
  return (
    <svg className={className} width={width} viewBox="0 0 120 26" fill="none" aria-hidden="true">
      <path d="M8 13h88" stroke="url(#g-gold)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M4 5l12 8-12 8M12 5l12 8-12 8" stroke={GOLD_LIGHT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M118 13c-8 7-14 10-18 10a5 5 0 0 1-2-10 5 5 0 0 1 2-10c4 0 10 3 18 10z" fill="url(#g-gold)" />
    </svg>
  );
}

export function Heart({ className = '', size = 24 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21C5 16 2 12.5 2 8.5A5 5 0 0 1 12 6a5 5 0 0 1 10 2.5C22 12.5 19 16 12 21z" fill="url(#g-gold)" />
    </svg>
  );
}

export function Petal({ className = '', size = 18 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 1c5 4 7 9 4 14-2 3-6 3-8 0C3 10 5 5 10 1z" fill="#fbf6ea" opacity="0.85" />
      <path d="M10 3c1 4 1 8-1 12" stroke="#e4c065" strokeWidth="0.8" fill="none" />
    </svg>
  );
}
