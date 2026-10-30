import Reveal from '../common/Reveal.jsx';
import Icon from '../common/Icon.jsx';
import { useMusic } from '../../context/MusicContext.jsx';
import { wedding } from '../../config/wedding.js';
import './SongPlayer.css';

const STATUS_TEXT = {
  loading: 'Loading the song…',
  blocked: 'Your browser held the music back — tap anywhere to start it.',
  error: 'The song could not be played on this device.',
  missing: 'The song will be added soon.',
};

/** "Our Song": a gold-labelled vinyl record that spins only while the song plays. */
export default function SongPlayer() {
  const { status, playing, available, toggle } = useMusic();
  const { title, artist } = wedding.music;
  const spinning = status === 'playing';

  return (
    <section className="song" id="song" aria-labelledby="song-title">
      <Reveal className="song__card">
        <div className={`song__record${spinning ? ' is-spinning' : ''}`} aria-hidden="true">
          <span className="song__label">
            <Icon name="heart" />
          </span>
        </div>
        <div className="song__text">
          <p className="song__eyebrow caps">Our song</p>
          <h2 className="song__title script" id="song-title">
            {title}
          </h2>
          <p className="song__artist caps">{artist}</p>
          <button
            type="button"
            className="pill pill--gold song__toggle"
            onClick={toggle}
            aria-pressed={playing}
            disabled={!available || status === 'error'}
          >
            <Icon name={playing ? 'pause' : 'play'} /> {playing ? 'Pause the song' : 'Play our song'}
          </button>
          {STATUS_TEXT[status] && (
            <p className={`song__status song__status--${status}`} role="status">
              {STATUS_TEXT[status]}
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
