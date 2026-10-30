import RoyalClock from './RoyalClock.jsx';
import { useCountdown } from '../../hooks/useCountdown.js';
import { wedding, weddingStartMs } from '../../config/wedding.js';
import './CountdownClock.css';

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** The clock-reference countdown: days / hours / minutes / seconds in the four gold cartouches. */
export default function CountdownClock() {
  const countdown = useCountdown(weddingStartMs);
  const { groom, bride } = wedding.couple;

  let caption;
  if (countdown.status === 'invalid') caption = 'The date will be announced soon';
  else if (countdown.status === 'done') caption = `The celebration has begun — long live ${groom} & ${bride}!`;
  else caption = 'until we say “I do”';

  // Screen readers get a per-minute summary instead of a per-second announcement.
  const summary =
    countdown.status === 'counting'
      ? `${plural(countdown.days, 'day')}, ${plural(countdown.hours, 'hour')} and ${plural(countdown.minutes, 'minute')} until the wedding`
      : caption;

  return (
    <div className="countdown" role="timer" aria-label={summary}>
      <RoyalClock countdown={countdown} />
      <p className={`countdown__caption${countdown.status === 'done' ? ' is-done' : ''}`}>{caption}</p>
    </div>
  );
}
