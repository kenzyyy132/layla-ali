import { useMusic } from '../../context/MusicContext.jsx';
import './ListenButton.css';

/** Handwritten "Tap to listen" on a golden music staff — toggles the music. */
export default function ListenButton({ className = '' }) {
  const { playing, toggle } = useMusic();
  return (
    <button
      type="button"
      className={`listen${playing ? ' is-playing' : ''} ${className}`}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'Pause the music' : 'Play the music'}
    >
      <svg viewBox="0 0 220 150" aria-hidden="true">
        <g className="listen__staff" fill="none" stroke="currentColor" strokeWidth="1.15">
          {[0, 5, 10, 15, 20].map((dy) => (
            <path key={dy} d="M6 98C38 72 70 122 110 94C140 74 160 86 178 76" transform={`translate(0 ${dy})`} />
          ))}
        </g>
        <g className="listen__notes" fill="currentColor" stroke="currentColor" strokeWidth="1.2">
          <g className="listen__note">
            <ellipse cx="34" cy="96" rx="4.2" ry="3" transform="rotate(-20 34 96)" />
            <path d="M37.6 94.5V76" />
          </g>
          <g className="listen__note">
            <ellipse cx="60" cy="104" rx="4.2" ry="3" transform="rotate(-20 60 104)" />
            <path d="M63.6 102.5V84l8 3" fill="none" />
          </g>
          <g className="listen__note">
            <ellipse cx="88" cy="106" rx="4.2" ry="3" transform="rotate(-20 88 106)" />
            <path d="M91.6 104.5V86" />
          </g>
          <g className="listen__note">
            <ellipse cx="128" cy="92" rx="4.2" ry="3" transform="rotate(-20 128 92)" />
            <ellipse cx="146" cy="88" rx="4.2" ry="3" transform="rotate(-20 146 88)" />
            <path d="M131.6 90.5V72L149.6 68v18.5" fill="none" />
          </g>
        </g>
        <path
          className="listen__clef"
          d="M188 128c-6 0-9-5-6-9 3-3 8-1 7 3M187 132l7-96c1-9 10-8 9 1-1 10-18 22-20 36-2 13 8 22 18 20 10-3 11-16 2-18-8-2-13 5-10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text className="listen__text" x="18" y="44" transform="rotate(-10 18 44)">
          Tap to
        </text>
        <text className="listen__text" x="66" y="70" transform="rotate(-8 66 70)">
          {playing ? 'Pause' : 'Listen'}
        </text>
      </svg>
    </button>
  );
}
