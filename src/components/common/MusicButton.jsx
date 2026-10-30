import Icon from './Icon.jsx';
import { useMusic } from '../../context/MusicContext.jsx';
import './MusicButton.css';

/** Floating music control, always within reach; asks for a tap if the browser held the music back. */
export default function MusicButton() {
  const { playing, status, toggle } = useMusic();
  return (
    <>
      {status === 'blocked' && (
        <button type="button" className="music-hint" onClick={toggle}>
          Tap for music
        </button>
      )}
      <button
        type="button"
        className={`music-btn${playing ? ' is-playing' : ''}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        <Icon name="note" />
        <span className="music-btn__bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>
    </>
  );
}
