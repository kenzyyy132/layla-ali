import { motion, useReducedMotion } from 'framer-motion';
import Angel, { Candle } from '../common/Angel.jsx';
import ArabicLine from '../common/ArabicLine.jsx';
import { Monogram } from '../ornaments/Ornaments.jsx';
import CountdownClock from '../Countdown/CountdownClock.jsx';
import SaveTheDate from '../Countdown/SaveTheDate.jsx';
import { wedding } from '../../config/wedding.js';
import './InvitationCard.css';

/** The invitation card: an arched navy & gold card whose lines appear one by one. */
export default function InvitationCard() {
  const reduceMotion = useReducedMotion();
  const { groom, bride } = wedding.couple;
  const inv = wedding.invitation;

  const step = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16, filter: reduceMotion ? 'none' : 'blur(5px)' },
    shown: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="invite" id="invitation" aria-labelledby="invite-title">
      <Candle className="invite__candle invite__candle--left" delay={-1} />
      <Candle className="invite__candle invite__candle--right" flip delay={-4} />

      <motion.article
        className="invite__card"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: { opacity: 0, y: reduceMotion ? 0 : 60, rotateX: reduceMotion ? 0 : 14 },
          shown: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.2, delayChildren: 0.5 },
          },
        }}
      >
        <Angel type="cherub-heart" className="invite__cherub" />
        <span className="invite__border" aria-hidden="true" />
        <img className="invite__ribbon" src="/images/art/ribbon.webp" alt="" aria-hidden="true" loading="lazy" />

        <motion.div variants={step}>
          <ArabicLine className="invite__blessing">{wedding.arabic.blessing}</ArabicLine>
        </motion.div>
        <motion.div className="invite__seal" variants={step}>
          <Monogram size={150} first={groom[0]} second={bride[0]} />
        </motion.div>
        <motion.p className="invite__families" variants={step}>
          {inv.families}
        </motion.p>
        <motion.h2 className="invite__names" id="invite-title" variants={step}>
          {groom} <span className="invite__amp">&amp;</span> {bride}
        </motion.h2>
        <motion.p className="invite__invite caps" variants={step}>
          {inv.invite}
        </motion.p>
        <motion.p className="invite__body" variants={step}>
          {inv.body}
        </motion.p>
        <motion.div className="invite__clock" variants={step}>
          <CountdownClock />
        </motion.div>
        <motion.div variants={step}>
          <SaveTheDate />
        </motion.div>
      </motion.article>
    </section>
  );
}
