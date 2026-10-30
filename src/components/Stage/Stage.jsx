import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ElvisSinger from './ElvisSinger.jsx';
import ListenButton from './ListenButton.jsx';
import Angel, { Candle } from '../common/Angel.jsx';
import { Corner, HeartCrest } from '../ornaments/Ornaments.jsx';
import ArabicLine from '../common/ArabicLine.jsx';
import { wedding, eventParts } from '../../config/wedding.js';
import './Stage.css';

const RAYS = Array.from({ length: 36 }, (_, i) => i * 10);

const intro = (step, opened) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(6px)' },
  animate: opened ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined,
  transition: { duration: 1.2, delay: 0.3 + step * 0.35, ease: [0.22, 1, 0.36, 1] },
});

/**
 * Scene one, visible the moment the doors open: Elvis kneels at the top of the
 * grand staircase inside a radiant halo, singing for the couple, while two
 * cupids take aim at the names above.
 */
export default function Stage({ opened }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const raysY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '22%']);
  const cupidsY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '-30%']);
  const { groom, bride } = wedding.couple;

  return (
    <section className={`stage${opened ? ' is-open' : ''}`} id="stage" ref={ref} aria-labelledby="stage-title">
      <div className="stage__frame" aria-hidden="true">
        {['tl', 'tr', 'bl', 'br'].map((p) => (
          <Corner key={p} position={p} className="stage__corner" />
        ))}
        <HeartCrest className="stage__crest" width={130} />
      </div>

      <img className="stage__vine stage__vine--left" src="/images/art/vine.webp" alt="" aria-hidden="true" />
      <img className="stage__vine stage__vine--right" src="/images/art/vine.webp" alt="" aria-hidden="true" />

      <div className="stage__sides" aria-hidden="true">
        <Candle className="stage__candle stage__candle--left" />
        <Candle className="stage__candle stage__candle--right" flip delay={-3} />
      </div>

      <header className="stage__title">
        <motion.p className="stage__eyebrow caps" {...intro(0, opened)}>
          {wedding.invitation.families}
        </motion.p>
        <motion.h1 className="stage__names" id="stage-title" {...intro(1, opened)}>
          <span className="stage__name">{groom}</span>
          <span className="stage__amp" aria-hidden="true">
            &amp;
          </span>
          <span className="visually-hidden"> and </span>
          <span className="stage__name">{bride}</span>
        </motion.h1>
        <motion.p className="stage__sub caps" {...intro(2, opened)}>
          {wedding.invitation.invite}
          <span className="stage__date">{eventParts.numeric}</span>
        </motion.p>
        <motion.div {...intro(3, opened)}>
          <ArabicLine className="stage__arabic">{wedding.arabic.stage}</ArabicLine>
        </motion.div>
      </header>

      <div className="stage__scene">
        <motion.div className="stage__light" style={{ y: raysY }} aria-hidden="true">
          <svg className="stage__rays" viewBox="-300 -300 600 600">
            {RAYS.map((a) => (
              <line key={a} x1="0" y1="-70" x2="0" y2={a % 20 ? -230 : -290} transform={`rotate(${a})`} />
            ))}
          </svg>
          <span className="stage__halo" />
        </motion.div>

        <img className="stage__stairs" src="/images/art/staircase.webp" alt="" aria-hidden="true" draggable="false" />

        <motion.div
          className="stage__singer"
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={opened ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <ElvisSinger singing={opened} />
        </motion.div>

        <motion.div className="stage__cupids" style={{ y: cupidsY }} aria-hidden="true">
          <motion.div
            className="stage__cupid stage__cupid--left"
            initial={{ opacity: 0, x: -60 }}
            animate={opened ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 1.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Angel type="cupid-aim" eager />
          </motion.div>
          <motion.div
            className="stage__cupid stage__cupid--right"
            initial={{ opacity: 0, x: 60 }}
            animate={opened ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 1.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Angel type="cupid-bow" delay={-2.5} eager />
          </motion.div>
        </motion.div>

        <motion.div
          className="stage__listen"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={opened ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <ListenButton />
        </motion.div>
      </div>

      <a className="scroll-cue caps" href="#invitation">
        Scroll
        <span className="scroll-cue__line" aria-hidden="true" />
      </a>
    </section>
  );
}
