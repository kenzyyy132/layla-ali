/**
 * The countdown clock, recreated from the reference: lace-scalloped gold rim,
 * royal-blue band with acanthus scrollwork and four gold cartouches, ivory dial
 * with Roman numerals, filigree centre medallion and ornate hands.
 *
 * The four cartouches hold Days / Hours / Minutes / Seconds, and the hands
 * themselves show the time remaining, ticking backwards toward the wedding.
 */

const NUMERALS = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

function scallopPath(base = 276, depth = 14, lobes = 48, steps = 960) {
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r = base + depth * Math.pow(Math.abs(Math.cos((lobes / 2) * t)), 0.55);
    d += `${i ? 'L' : 'M'}${(r * Math.sin(t)).toFixed(1)} ${(-r * Math.cos(t)).toFixed(1)}`;
  }
  return `${d}Z`;
}

const RIM = scallopPath();

function polar(r, deg) {
  const a = (deg * Math.PI) / 180;
  return [r * Math.sin(a), -r * Math.cos(a)];
}

/** Gold acanthus scroll for the blue band, drawn pointing "up" then rotated into place. */
function BandScroll({ angle }) {
  return (
    <g transform={`rotate(${angle}) translate(0 -226)`}>
      <path
        d="M0 -22c10 6 14 16 6 24-6 6-14 2-12-4M0 -22c-10 6-14 16-6 24 6 6 14 2 12-4M-30 6c10-10 22-10 30-2 8-8 20-8 30 2"
        fill="none"
        stroke="url(#g-gold)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M0-30c5 8 5 18 0 26-5-8-5-18 0-26z" fill="url(#g-gold)" />
      <path d="M-46 0c8-8 16-8 22-2-8 4-16 6-22 2zM46 0c-8-8-16-8-22-2 8 4 16 6 22 2z" fill="#fbf6ea" opacity="0.75" />
    </g>
  );
}

function Plaque({ angle, value, label }) {
  const [x, y] = polar(226, angle);
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
      <path
        d="M0-42C18-42 30-36 46-34 52-20 52 20 46 34 30 36 18 42 0 42-18 42-30 36-46 34-52 20-52-20-46-34-30-36-18-42 0-42z"
        fill="url(#g-gold)"
        stroke="#7d6018"
        strokeWidth="1.5"
      />
      <path
        d="M0-35C15-35 25-30 39-28 44-16 44 16 39 28 25 30 15 35 0 35-15 35-25 30-39 28-44 16-44-16-39-28-25-30-15-35 0-35z"
        fill="#fbf6ea"
      />
      <text y="8" textAnchor="middle" className="clock__value">
        {value}
      </text>
      <text y="26" textAnchor="middle" className="clock__label">
        {label}
      </text>
    </g>
  );
}

export default function RoyalClock({ countdown }) {
  const counting = countdown.status === 'counting';
  const { days = 0, hours = 0, minutes = 0, seconds = 0 } = countdown;
  const total = days * 86400 + hours * 3600 + minutes * 60 + seconds;
  const pad = (n) => (countdown.status === 'invalid' ? '—' : String(n).padStart(2, '0'));

  // Continuous angles: each tick moves only 6° (no full spin on wrap-around).
  const secondAngle = counting ? total * 6 : 0;
  const minuteAngle = counting ? (total / 60) * 6 : 0;
  const hourAngle = counting ? (total / 3600) * 30 : 0;

  return (
    <svg className="clock" viewBox="-300 -300 600 600" aria-hidden="true">
      <defs>
        <radialGradient id="clock-band" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.68" stopColor="#2c4a96" />
          <stop offset="0.8" stopColor="#1b2f69" />
          <stop offset="0.9" stopColor="#24408a" />
        </radialGradient>
        <radialGradient id="clock-medallion" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3d5fae" />
          <stop offset="1" stopColor="#12214f" />
        </radialGradient>
      </defs>

      {/* lace rim */}
      <path d={RIM} fill="url(#g-gold)" stroke="#7d6018" strokeWidth="1.5" className="clock__rim" />
      <circle r="272" fill="none" stroke="#7d6018" strokeWidth="2" />
      <circle r="266" fill="#fbf6ea" />
      {/* royal blue band */}
      <circle r="260" fill="url(#clock-band)" />
      <circle r="260" fill="none" stroke="url(#g-gold)" strokeWidth="3" />
      {[45, 135, 225, 315].map((a) => (
        <BandScroll key={a} angle={a} />
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((a) => {
        const [x, y] = polar(226, a);
        return <circle key={a} cx={x} cy={y} r="4" fill="#f3d98b" />;
      })}

      {/* ivory dial */}
      <circle r="190" fill="url(#g-gold)" />
      <circle r="184" fill="#fbf6ea" />
      {Array.from({ length: 60 }, (_, i) => {
        const [x1, y1] = polar(184, i * 6);
        const [x2, y2] = polar(i % 5 ? 176 : 170, i * 6);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0b1638" strokeWidth={i % 5 ? 1.2 : 2.6} />
        );
      })}
      <circle r="168" fill="none" stroke="#0b1638" strokeWidth="0.8" />
      {NUMERALS.map((n, i) => {
        const [x, y] = polar(146, i * 30);
        return (
          <text
            key={n}
            x={x}
            y={y + 10}
            textAnchor="middle"
            className="clock__numeral"
            transform={`rotate(${i * 30} ${x} ${y})`}
          >
            {n}
          </text>
        );
      })}

      {/* filigree medallion */}
      <circle r="120" fill="url(#g-gold)" />
      <circle r="113" fill="url(#clock-medallion)" />
      <circle r="106" fill="none" stroke="#f3d98b" strokeWidth="1" strokeDasharray="2 6" strokeLinecap="round" />
      <g className="clock__filigree">
        {[0, 90, 180, 270].map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <path d="M0-12c14-20 14-52 0-90-14 38-14 70 0 90z" fill="url(#g-gold)" opacity="0.95" />
            <path
              d="M0-30c18-6 34 4 30 20-3 10-14 10-15 2M0-30c-18-6-34 4-30 20 3 10 14 10 15 2"
              fill="none"
              stroke="url(#g-gold)"
              strokeWidth="3"
            />
          </g>
        ))}
        {[45, 135, 225, 315].map((a) => (
          <path key={a} transform={`rotate(${a})`} d="M0-20c8-12 8-34 0-58-8 24-8 46 0 58z" fill="#fbf6ea" opacity="0.6" />
        ))}
      </g>

      {/* countdown cartouches */}
      <Plaque angle={0} value={countdown.status === 'invalid' ? '—' : days} label="DAYS" />
      <Plaque angle={90} value={pad(hours)} label="HOURS" />
      <Plaque angle={180} value={pad(minutes)} label="MINUTES" />
      <Plaque angle={270} value={pad(seconds)} label="SECONDS" />

      {/* hands — each wraps an invisible r=180 circle so its fill-box is centred on the pivot */}
      <g className="clock__hand" style={{ transform: `rotate(${hourAngle}deg)` }}>
        <circle r="180" fill="none" className="clock__pivot-box" />
        <path
          d="M-5 22-4-56c-12-4-12-22 0-26 12 4 12 22 4 26l5 78zM0-82l-7 14 7 14 7-14z"
          fill="#0b1638"
          stroke="#d4af37"
          strokeWidth="1.2"
        />
        <path d="M0-104-8-88 0-74 8-88z" fill="#0b1638" stroke="#d4af37" strokeWidth="1.2" />
      </g>
      <g className="clock__hand" style={{ transform: `rotate(${minuteAngle}deg)` }}>
        <circle r="180" fill="none" className="clock__pivot-box" />
        <path
          d="M-3.5 24-3-118c-10-4-10-18 0-22 10 4 10 18 3 22l3.5 142z"
          fill="#0b1638"
          stroke="#d4af37"
          strokeWidth="1.2"
        />
        <path d="M0-140-6-152 0-166 6-152z" fill="#0b1638" stroke="#d4af37" strokeWidth="1.2" />
      </g>
      <g className="clock__hand clock__hand--second" style={{ transform: `rotate(${secondAngle}deg)` }}>
        <circle r="180" fill="none" className="clock__pivot-box" />
        <path d="M0 36V-172" stroke="#b08d2a" strokeWidth="2" />
        <circle cy="26" r="6" fill="#b08d2a" />
      </g>
      <circle r="11" fill="url(#g-gold)" stroke="#7d6018" />
      <circle r="4" fill="#0b1638" />
    </svg>
  );
}
