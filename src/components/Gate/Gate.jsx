import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Candle } from '../common/Angel.jsx';
import Angel from '../common/Angel.jsx';
import ArabicLine from '../common/ArabicLine.jsx';
import { useBodyLock } from '../../hooks/useBodyLock.js';
import { useMusic } from '../../context/MusicContext.jsx';
import { wedding } from '../../config/wedding.js';
import './Gate.css';

// Must match the door + fade timings in Gate.css.
const OPEN_MS = 3300;

function DoorPanel({ side, image }) {
  const letter = side === 'left' ? wedding.couple.groom[0] : wedding.couple.bride[0];
  return (
    <div className={`gate__door gate__door--${side}${image ? ' gate__door--image' : ''}`}>
      {image ? (
        <span className="gate__door-art" style={{ backgroundImage: `url(${image})` }} />
      ) : (
        <span className="gate__door-face">
          <span className="gate__door-frame" />
          <span className="gate__door-letter script">{letter}</span>
          <span className="gate__door-knob" />
        </span>
      )}
      <span className="gate__door-shade" />
    </div>
  );
}

/**
 * Opening experience: an arched double door with "Tap to open".
 * Tapping swings the panels apart in 3D, starts the music and reveals the invitation.
 */
export default function Gate({ ready, onOpenStart, onOpened }) {
  const [phase, setPhase] = useState('closed'); // closed → opening → open
  const [doorRatio, setDoorRatio] = useState(null);
  const reduceMotion = useReducedMotion();
  const { play } = useMusic();
  const buttonRef = useRef(null);
  const { doorImage } = wedding.gate;
  useBodyLock(phase !== 'open');

  // Size the arch to the supplied door artwork so it is never distorted.
  useEffect(() => {
    if (!doorImage) return;
    const img = new Image();
    img.onload = () => setDoorRatio(img.naturalWidth / img.naturalHeight);
    img.src = doorImage;
  }, [doorImage]);

  useEffect(() => {
    if (ready) buttonRef.current?.focus({ preventScroll: true });
  }, [ready]);

  useEffect(() => {
    if (phase !== 'opening') return undefined;
    const t = setTimeout(() => {
      setPhase('open');
      onOpened();
    }, reduceMotion ? 300 : OPEN_MS);
    return () => clearTimeout(t);
  }, [phase, reduceMotion, onOpened]);

  const open = () => {
    if (phase !== 'closed' || !ready) return;
    setPhase('opening');
    play();
    onOpenStart();
  };

  if (phase === 'open') return null;

  return (
    <div className={`gate gate--${phase}`} role="dialog" aria-modal="true" aria-label="Invitation entrance">
      <div className="gate__inner">
        <motion.p
          className="gate__eyebrow caps"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          You are invited
        </motion.p>

        <motion.div
          className="gate__stage"
          style={doorRatio ? { '--door-ratio': doorRatio } : undefined}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Candle className="gate__candle gate__candle--left" />
          <Candle className="gate__candle gate__candle--right" flip delay={-2} />
          <Angel type="cherub-heart" className="gate__cherub" eager />
          <img className="gate__tassel gate__tassel--left" src="/images/art/tassels.webp" alt="" aria-hidden="true" />
          <img className="gate__tassel gate__tassel--right" src="/images/art/tassels.webp" alt="" aria-hidden="true" />
          <img className="gate__lock" src="/images/art/padlock.webp" alt="" aria-hidden="true" onClick={open} />
          <div className={`gate__arch${doorImage ? ' gate__arch--image' : ''}`} onClick={open}>
            <span className="gate__glow" />
            <DoorPanel side="left" image={doorImage} />
            <DoorPanel side="right" image={doorImage} />
          </div>
        </motion.div>

        <motion.button
          ref={buttonRef}
          type="button"
          className="gate__button"
          onClick={open}
          disabled={!ready}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <span className="gate__pulse" aria-hidden="true" />
          {ready ? 'Tap to open' : 'Preparing…'}
        </motion.button>
        <motion.div className="gate__arabic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 1 }}>
          <ArabicLine>{wedding.arabic.gate}</ArabicLine>
        </motion.div>
        <motion.p className="gate__sound" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
          Best enjoyed with sound on
        </motion.p>
      </div>
    </div>
  );
}
