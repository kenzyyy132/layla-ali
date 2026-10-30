import { useEffect, useState } from 'react';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * Live countdown to an absolute moment (epoch ms), measured against the
 * visitor's own clock. Ticks on each whole second and stops once reached.
 */
export function useCountdown(targetMs) {
  const [now, setNow] = useState(() => Date.now());
  const valid = Number.isFinite(targetMs);
  const done = valid && now >= targetMs;

  useEffect(() => {
    if (!valid || done) return undefined;
    let timer;
    const tick = () => {
      setNow(Date.now());
      timer = setTimeout(tick, SECOND - (Date.now() % SECOND));
    };
    timer = setTimeout(tick, SECOND - (Date.now() % SECOND));
    return () => clearTimeout(timer);
  }, [valid, done]);

  if (!valid) return { status: 'invalid' };
  if (done) return { status: 'done', days: 0, hours: 0, minutes: 0, seconds: 0 };

  const remaining = targetMs - now;
  return {
    status: 'counting',
    days: Math.floor(remaining / DAY),
    hours: Math.floor((remaining % DAY) / HOUR),
    minutes: Math.floor((remaining % HOUR) / MINUTE),
    seconds: Math.floor((remaining % MINUTE) / SECOND),
  };
}
