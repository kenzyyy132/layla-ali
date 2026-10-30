import { motion, useReducedMotion } from 'framer-motion';
import Reveal from '../common/Reveal.jsx';
import Icon from '../common/Icon.jsx';
import { Flourish } from '../ornaments/Ornaments.jsx';
import WeddingCalendar from '../Countdown/WeddingCalendar.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { directionsUrl, downloadIcs, googleCalendarUrl } from '../../lib/calendar.js';
import { wedding, eventParts, weddingStartMs, formatEventDate } from '../../config/wedding.js';
import './WhenWhere.css';

function localTimeNote() {
  if (weddingStartMs == null) return null;
  const visitorZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const local = formatEventDate({ hour: 'numeric', minute: '2-digit', weekday: 'short' }, visitorZone);
  const venue = formatEventDate({ hour: 'numeric', minute: '2-digit', weekday: 'short' });
  return local === venue ? null : `That’s ${local} where you are.`;
}

/** Save-the-date card with the venue, map links and calendar buttons. */
export default function WhenWhere() {
  const reduceMotion = useReducedMotion();
  const notify = useToast();
  const gcal = googleCalendarUrl();
  const tzNote = localTimeNote();
  const { venue } = wedding;

  return (
    <section className="details" id="details" aria-labelledby="details-title">
      <Reveal as="h2" className="script-title" id="details-title">
        When &amp; Where
      </Reveal>

      <Reveal className="venue-card">
        <img className="venue-card__chandelier" src="/images/art/chandelier.webp" alt="" aria-hidden="true" loading="lazy" />
        <div className="venue-card__inner">
          <Reveal as="p" className="venue-card__eyebrow caps" delay={0.1}>
            Save the date
          </Reveal>
          <h3 className="visually-hidden">{`${eventParts.weekday}, ${eventParts.day} ${eventParts.month} ${eventParts.year}`}</h3>
          <div className="venue-card__calendar-page">
            <WeddingCalendar />
          </div>

          <Reveal as="p" className="venue-card__time caps" delay={0.6}>
            <Icon name="clock" /> Starts at {eventParts.time}
          </Reveal>
          {tzNote && (
            <p className="venue-card__note">
              {eventParts.time} {wedding.event.timeZoneLabel} · {tzNote}
            </p>
          )}

          <Flourish className="venue-card__divider" width={220} />

          <Reveal className="venue-card__place" delay={0.2}>
            <Icon name="pin" className="venue-card__pin" />
            <h3 className="venue-card__venue caps">{venue.name}</h3>
            <p className="venue-card__local" lang="ar" dir="rtl">
              {venue.nameLocal}
            </p>
            <p className="venue-card__address">{venue.address}</p>
            <div className="venue-card__actions">
              <a className="pill pill--navy" href={venue.mapUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="pin" /> Location &amp; directions
              </a>
              <a className="pill pill--outline" href={directionsUrl()} target="_blank" rel="noopener noreferrer">
                Get directions
              </a>
            </div>
          </Reveal>

          {gcal && (
            <Reveal className="venue-card__calendar" delay={0.3}>
              <a className="pill pill--outline pill--small" href={gcal} target="_blank" rel="noopener noreferrer">
                <Icon name="calendar" /> Google Calendar
              </a>
              <button
                type="button"
                className="pill pill--outline pill--small"
                onClick={() => {
                  downloadIcs();
                  notify('Calendar invite downloaded');
                }}
              >
                <Icon name="calendar" /> Apple / Outlook
              </button>
            </Reveal>
          )}
        </div>
      </Reveal>

      <motion.figure
        className="carriage"
        initial={{ opacity: 0, x: reduceMotion ? 0 : '-60vw' }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 2.4, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <img className="carriage__img" src="/images/art/carriage.webp" alt="" loading="lazy" decoding="async" />
        <figcaption className="carriage__caption script">Your royal carriage awaits</figcaption>
      </motion.figure>
    </section>
  );
}
