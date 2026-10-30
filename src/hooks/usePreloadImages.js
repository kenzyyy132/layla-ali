import { useEffect, useState } from 'react';

/**
 * Resolves true once every image has loaded (or failed), or after `timeoutMs`
 * at the latest — so a slow network can never trap guests on the loading screen.
 */
export function usePreloadImages(sources, timeoutMs = 4000) {
  const [ready, setReady] = useState(false);
  const key = sources.join('|');

  useEffect(() => {
    let cancelled = false;
    const finish = () => !cancelled && setReady(true);
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const images = key.split('|').filter(Boolean).map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = img.onerror = resolve;
          img.src = src;
        }),
    );
    const safety = setTimeout(finish, timeoutMs);
    Promise.all([fonts, ...images]).then(finish);
    return () => {
      cancelled = true;
      clearTimeout(safety);
    };
  }, [key, timeoutMs]);

  return ready;
}
