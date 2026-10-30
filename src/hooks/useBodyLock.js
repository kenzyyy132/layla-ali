import { useEffect } from 'react';

/** Prevents page scroll while `locked` is true (e.g. behind the palace doors). */
export function useBodyLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    document.body.classList.add('is-locked');
    return () => document.body.classList.remove('is-locked');
  }, [locked]);
}
