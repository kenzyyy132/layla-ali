import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Butterfly, Heart, HeartArrow, Petal } from '../ornaments/Ornaments.jsx';
import './RomanticSky.css';

const ART = '/images/art/';

// Each flyer crosses the screen on its own lane, speed and direction.
const ANGELS = [
  { img: 'cupid-aim.webp', dir: 'ltr', top: 18, size: 120, dur: 34, delay: 2 },
  { img: 'cupid-bow.webp', dir: 'rtl', top: 52, size: 104, dur: 40, delay: 15 },
  { img: 'cherub-heart.webp', dir: 'ltr', top: 74, size: 92, dur: 46, delay: 27 },
];
const BIRDS = [
  { img: 'bird-1.webp', top: 10, size: 78, dur: 26, delay: 6 },
  { img: 'bird-3.webp', top: 36, size: 66, dur: 30, delay: 19 },
  { img: 'bird.webp', top: 64, size: 84, dur: 36, delay: 33 },
  { img: 'bird-2.webp', top: 86, size: 60, dur: 28, delay: 11 },
];
const ARROWS = [
  { top: 28, dur: 9, delay: 8, tilt: -8 },
  { top: 60, dur: 11, delay: 21, tilt: 6 },
  { top: 82, dur: 10, delay: 35, tilt: -4 },
];
// A few hearts only, spread wide and slow so they stay a gentle accent.
const HEARTS = [
  { left: 8, size: 14, dur: 26, delay: -3 },
  { left: 38, size: 11, dur: 30, delay: -17 },
  { left: 71, size: 15, dur: 28, delay: -9 },
  { left: 92, size: 12, dur: 32, delay: -24 },
];
// Butterflies drift across on wavy paths, flapping as they go.
const BUTTERFLIES = [
  { dir: 'ltr', top: 24, size: 48, dur: 24, delay: 1 },
  { dir: 'rtl', top: 44, size: 40, dur: 28, delay: 9 },
  { dir: 'ltr', top: 68, size: 54, dur: 26, delay: 16 },
  { dir: 'rtl', top: 14, size: 38, dur: 30, delay: 22 },
  { dir: 'ltr', top: 88, size: 44, dur: 22, delay: 30 },
];
const PETALS = Array.from({ length: 12 }, (_, i) => ({
  left: (i * 29 + 4) % 100,
  size: 12 + ((i * 5) % 10),
  dur: 18 + ((i * 7) % 12),
  delay: -i * 1.9,
}));
const STARS = [
  [6, 14, 26],
  [90, 22, 20],
  [14, 48, 18],
  [84, 58, 28],
  [8, 82, 22],
  [94, 88, 18],
  [50, 6, 16],
];
const ORBS = [
  [18, 20, 46],
  [82, 46, 54],
  [30, 80, 50],
];

/**
 * A fixed, behind-the-content sky that keeps the whole invitation alive.
 * Everything animates with transform/opacity only; layers drift at different
 * speeds as the guest scrolls for a gentle parallax.
 */
export default function RomanticSky({ active }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const far = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '-6%']);
  const mid = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '-14%']);

  if (reduceMotion) return null;

  return (
    <div className={`sky${active ? ' is-active' : ''}`} aria-hidden="true">
      <motion.div className="sky__layer" style={{ y: far }}>
        {ORBS.map(([x, y, s], i) => (
          <span key={i} className="sky__orb" style={{ left: `${x}%`, top: `${y}%`, width: `${s}vmax`, '--i': i }} />
        ))}
        {STARS.map(([x, y, s], i) => (
          <img
            key={i}
            className="sky__star"
            src={`${ART}star.webp`}
            alt=""
            style={{ left: `${x}%`, top: `${y}%`, width: s, animationDelay: `${-i * 0.9}s` }}
          />
        ))}
      </motion.div>

      <motion.div className="sky__layer" style={{ y: mid }}>
        {HEARTS.map((h, i) => (
          <span
            key={i}
            className="sky__heart"
            style={{ left: `${h.left}%`, animationDuration: `${h.dur}s`, animationDelay: `${h.delay}s` }}
          >
            <Heart size={h.size} />
          </span>
        ))}
        {PETALS.map((p, i) => (
          <span
            key={i}
            className="sky__petal"
            style={{ left: `${p.left}%`, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}
          >
            <Petal size={p.size} />
          </span>
        ))}
      </motion.div>

      <div className="sky__layer">
        {BIRDS.map((b, i) => (
          <span
            key={i}
            className="sky__flyer sky__flyer--ltr sky__bird"
            style={{ top: `${b.top}%`, width: b.size, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
          >
            <img src={`${ART}${b.img}`} alt="" loading="lazy" />
          </span>
        ))}
        {ARROWS.map((a, i) => (
          <span
            key={i}
            className="sky__flyer sky__flyer--ltr sky__arrow"
            style={{ top: `${a.top}%`, animationDuration: `${a.dur}s`, animationDelay: `${a.delay}s`, '--tilt': `${a.tilt}deg` }}
          >
            <HeartArrow width={96} />
          </span>
        ))}
        {BUTTERFLIES.map((f, i) => (
          <span
            key={i}
            className={`sky__flyer sky__flyer--${f.dir} sky__butterfly${i >= 3 ? ' sky__butterfly--extra' : ''}`}
            style={{ top: `${f.top}%`, width: f.size, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s`, '--flap': `${0.22 + (i % 3) * 0.04}s` }}
          >
            <span className="sky__butterfly-path" style={f.dir === 'rtl' ? { transform: 'scaleX(-1)' } : undefined}>
              <Butterfly size={f.size} />
            </span>
          </span>
        ))}
        {ANGELS.map((a, i) => (
          <span
            key={i}
            className={`sky__flyer sky__flyer--${a.dir} sky__angel`}
            style={{ top: `${a.top}%`, width: a.size, animationDuration: `${a.dur}s`, animationDelay: `${a.delay}s` }}
          >
            <img src={`${ART}${a.img}`} alt="" loading="lazy" />
          </span>
        ))}
      </div>
    </div>
  );
}
