import { motion, useReducedMotion } from 'framer-motion';
import { Heart } from '../ornaments/Ornaments.jsx';
import { wedding, weddingStartMs, eventParts } from '../../config/wedding.js';
import './WeddingCalendar.css';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/** Year, month and day of the wedding in the venue's time zone. */
function weddingDay() {
  if (weddingStartMs == null) return null;
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone: wedding.event.timeZone, year: 'numeric', month: 'numeric', day: 'numeric' })
      .formatToParts(weddingStartMs)
      .map((p) => [p.type, Number(p.value)]),
  );
  return { year: parts.year, month: parts.month - 1, day: parts.day };
}

function monthCells({ year, month }) {
  const lead = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
}

/** Illustrated calendar page that flips down and circles the wedding day in gold. */
export default function WeddingCalendar() {
  const reduceMotion = useReducedMotion();
  const day = weddingDay();

  if (!day) return <p className="calendar__tba">The date will be announced soon</p>;

  return (
    <div className="wedding-calendar">
      <motion.div
        className="calendar"
        initial="closed"
        whileInView="open"
        viewport={{ once: true, amount: 0.4 }}
        aria-label={`Calendar: ${eventParts.month} ${eventParts.year}, the ${day.day}th highlighted`}
        role="img"
      >
        <span className="calendar__rings" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <i key={i} />
          ))}
        </span>
        <motion.div
          className="calendar__page"
          variants={{
            closed: reduceMotion ? { opacity: 0 } : { rotateX: -100, opacity: 0 },
            open: {
              rotateX: 0,
              opacity: 1,
              transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.018, delayChildren: 0.6 },
            },
          }}
        >
          <p className="calendar__month">
            <span className="script">{eventParts.month}</span>
            <span className="caps">{eventParts.year}</span>
          </p>
          <div className="calendar__grid">
            {WEEKDAYS.map((w, i) => (
              <span key={`w${i}`} className="calendar__weekday caps">
                {w}
              </span>
            ))}
            {monthCells(day).map((d, i) =>
              d === null ? (
                <span key={`e${i}`} />
              ) : (
                <motion.span
                  key={d}
                  className={`calendar__day${d === day.day ? ' is-wedding' : ''}`}
                  variants={{ closed: { opacity: 0, scale: 0.6 }, open: { opacity: 1, scale: 1 } }}
                >
                  {d === day.day && (
                    <svg className="calendar__ring" viewBox="0 0 40 40" aria-hidden="true">
                      <motion.circle
                        cx="20"
                        cy="20"
                        r="17"
                        variants={{
                          closed: { pathLength: 0 },
                          open: { pathLength: 1, transition: { duration: 1.2, delay: 1.4, ease: 'easeInOut' } },
                        }}
                      />
                    </svg>
                  )}
                  {d}
                  {d === day.day && <Heart className="calendar__heart" size={14} />}
                </motion.span>
              ),
            )}
          </div>
          <p className="calendar__note caps">
            {eventParts.weekday} · {eventParts.time}
          </p>
        </motion.div>
      </motion.div>

    </div>
  );
}
