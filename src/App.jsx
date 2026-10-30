import { useCallback, useEffect, useState } from 'react';
import Gate from './components/Gate/Gate.jsx';
import Stage from './components/Stage/Stage.jsx';
import InvitationCard from './components/Invitation/InvitationCard.jsx';
import MessageArch from './components/Message/MessageArch.jsx';
import WhenWhere from './components/Details/WhenWhere.jsx';
import Closing from './components/Closing/Closing.jsx';
import MusicButton from './components/common/MusicButton.jsx';
import GoldParticles from './components/common/GoldParticles.jsx';
import RomanticSky from './components/Background/RomanticSky.jsx';
import SongPlayer from './components/Song/SongPlayer.jsx';
import Reveal from './components/common/Reveal.jsx';
import { Flourish, GoldDefs } from './components/ornaments/Ornaments.jsx';
import { MusicProvider } from './context/MusicContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { usePreloadImages } from './hooks/usePreloadImages.js';
import { wedding } from './config/wedding.js';
import './App.css';

const { base, head, arm } = wedding.performance.layers;
const PRELOAD = [base, head, arm, '/images/art/staircase.webp', '/images/art/cherub-heart.webp', '/images/art/candle.webp', '/images/art/padlock.webp'];

function Divider() {
  return (
    <Reveal className="divider" aria-hidden="true">
      <Flourish width={300} />
    </Reveal>
  );
}

export default function App() {
  // gate → doors closed · opening → doors swinging · open → invitation revealed
  const [phase, setPhase] = useState('gate');
  const ready = usePreloadImages(PRELOAD);
  const handleOpenStart = useCallback(() => setPhase('opening'), []);
  const handleOpened = useCallback(() => setPhase('open'), []);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <MusicProvider>
      <ToastProvider>
        <GoldDefs />
        <Gate ready={ready} onOpenStart={handleOpenStart} onOpened={handleOpened} />
        <RomanticSky active={phase !== 'gate'} />

        <main className={`invitation invitation--${phase}`} inert={phase === 'gate'}>
          <Stage opened={phase !== 'gate'} />
          <InvitationCard />
          <SongPlayer />
          <Divider />
          <MessageArch />
          <Divider />
          <WhenWhere />
          <Divider />
          <Closing />
        </main>

        {phase === 'open' && <MusicButton />}
        <GoldParticles />
      </ToastProvider>
    </MusicProvider>
  );
}
