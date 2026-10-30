import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { wedding } from '../config/wedding.js';

const MusicContext = createContext(null);

// Every audio file in the project's /assets folder, bundled by Vite as URLs.
const files = import.meta.glob('/assets/*.{mp3,ogg,oga,opus,m4a,aac,wav,flac}', {
  eager: true,
  query: '?url',
  import: 'default',
});

// MP3 plays in every browser (including VS Code's preview, which has no AAC support);
// Opus/Ogg and AAC/M4A are fallbacks.
const MIME = {
  mp3: 'audio/mpeg',
  ogg: 'audio/ogg; codecs="opus"',
  oga: 'audio/ogg',
  opus: 'audio/ogg; codecs="opus"',
  m4a: 'audio/mp4; codecs="mp4a.40.2"',
  aac: 'audio/aac',
  wav: 'audio/wav',
  flac: 'audio/flac',
};
const FORMAT_ORDER = Object.keys(MIME);
const ALL_SOURCES = Object.entries(files)
  .map(([path, url]) => {
    const name = path.split('/').pop();
    const ext = name.split('.').pop().toLowerCase();
    return { name, ext, url, mime: MIME[ext] };
  })
  .sort((a, b) => {
    const preferred = (s) => (s.name.startsWith(wedding.music.file) ? 0 : 1);
    return preferred(a) - preferred(b) || FORMAT_ORDER.indexOf(a.ext) - FORMAT_ORDER.indexOf(b.ext);
  });

const FADE_MS = 1200;
const VOLUME = 0.8;
const RETRY_EVENTS = ['pointerdown', 'keydown', 'touchend'];

/** iOS Safari ignores `volume` (it's always 1), so fades must be skipped there. */
function volumeIsSettable(el) {
  const before = el.volume;
  el.volume = 0.5;
  const ok = el.volume === 0.5;
  el.volume = before;
  return ok;
}

/**
 * One shared HTML5 <audio> player for the soundtrack.
 * status: 'idle' | 'loading' | 'playing' | 'paused' | 'blocked' | 'error' | 'missing'
 * Browsers only allow sound after a tap, so "Tap to open" starts it; if the browser
 * still refuses, the next tap or key press anywhere on the page starts it instead.
 */
export function MusicProvider({ children }) {
  const [status, setStatus] = useState(ALL_SOURCES.length ? 'idle' : 'missing');
  const audio = useRef(null);
  const fade = useRef(null);
  const canFade = useRef(true);
  const sourceIndex = useRef(0);
  const wantsPlay = useRef(false);
  const playRef = useRef(null);

  // One stable listener that re-attempts playback on the guest's next interaction.
  const retryHandler = useRef(null);
  if (!retryHandler.current) {
    retryHandler.current = () => {
      RETRY_EVENTS.forEach((t) => document.removeEventListener(t, retryHandler.current, true));
      playRef.current?.();
    };
  }
  const removeRetry = useCallback(() => {
    RETRY_EVENTS.forEach((t) => document.removeEventListener(t, retryHandler.current, true));
  }, []);

  useEffect(() => {
    if (!ALL_SOURCES.length) return undefined;
    const el = new Audio();
    // Only formats this browser says it can decode, best first.
    const playable = ALL_SOURCES.filter((s) => el.canPlayType(s.mime) !== '');
    const sources = (playable.length ? playable : ALL_SOURCES).map((s) => s.url);
    el.loop = true;
    el.muted = false;
    el.preload = 'auto';
    el.src = sources[0];
    canFade.current = volumeIsSettable(el);
    const ctrl = new AbortController();
    const on = (type, fn) => el.addEventListener(type, fn, { signal: ctrl.signal });
    on('playing', () => setStatus('playing'));
    on('pause', () => setStatus((s) => (s === 'error' || s === 'blocked' ? s : 'paused')));
    on('waiting', () => setStatus((s) => (s === 'playing' ? 'loading' : s)));
    on('error', () => {
      // This browser can't play this file — fall back to the next one in /assets.
      if (sourceIndex.current < sources.length - 1) {
        sourceIndex.current += 1;
        el.src = sources[sourceIndex.current];
        if (wantsPlay.current) el.play().catch(() => setStatus('blocked'));
      } else setStatus('error');
    });
    audio.current = el;
    return () => {
      ctrl.abort();
      clearInterval(fade.current);
      removeRetry();
      el.pause();
      el.removeAttribute('src');
      el.load();
    };
  }, [removeRetry]);

  /** Ramp the volume so the song eases in and out instead of cutting. */
  const rampTo = useCallback((target, done) => {
    const el = audio.current;
    clearInterval(fade.current);
    if (!canFade.current) {
      done?.();
      return;
    }
    const step = (target - el.volume) / (FADE_MS / 50);
    fade.current = setInterval(() => {
      const next = el.volume + step;
      if ((step >= 0 && next >= target) || (step < 0 && next <= target)) {
        el.volume = target;
        clearInterval(fade.current);
        done?.();
      } else el.volume = Math.min(1, Math.max(0, next));
    }, 50);
  }, []);

  const play = useCallback(async () => {
    const el = audio.current;
    if (!el) return;
    wantsPlay.current = true;
    removeRetry();
    el.muted = false;
    // Fade in from a quiet-but-audible level, so the song is never silent even if a fade stalls.
    if (canFade.current && el.paused) el.volume = 0.3;
    // el.play() must run synchronously inside the tap handler, so nothing is awaited before it.
    const attempt = el.play();
    setStatus('loading');
    try {
      await attempt;
      rampTo(VOLUME);
    } catch (err) {
      if (err?.name === 'NotAllowedError') {
        setStatus('blocked');
        RETRY_EVENTS.forEach((t) => document.addEventListener(t, retryHandler.current, true));
      } else if (err?.name !== 'AbortError') {
        setStatus('error');
      }
    }
  }, [rampTo, removeRetry]);
  playRef.current = play;

  const pause = useCallback(() => {
    const el = audio.current;
    wantsPlay.current = false;
    removeRetry();
    if (!el || el.paused) {
      setStatus((s) => (s === 'blocked' ? 'paused' : s));
      return;
    }
    rampTo(0, () => el.pause());
  }, [rampTo, removeRetry]);

  const playing = status === 'playing' || status === 'loading';
  const toggle = useCallback(() => (playing ? pause() : play()), [playing, play, pause]);

  const value = useMemo(
    () => ({ status, playing, available: ALL_SOURCES.length > 0, play, pause, toggle }),
    [status, playing, play, pause, toggle],
  );
  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used inside <MusicProvider>');
  return ctx;
}
