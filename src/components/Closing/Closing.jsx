import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import Reveal from '../common/Reveal.jsx';
import Icon from '../common/Icon.jsx';
import Angel from '../common/Angel.jsx';
import ArabicLine from '../common/ArabicLine.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { renderInvitationCard } from '../../lib/renderCard.js';
import { downloadBlob } from '../../lib/calendar.js';
import { wedding, eventParts } from '../../config/wedding.js';
import './Closing.css';

const FILE_NAME = 'Ali-and-Layla-Wedding-Invitation.png';

/** Keepsake card (painted live from the config), share and save. */
export default function Closing() {
  const ref = useRef(null);
  const nearby = useInView(ref, { once: true, margin: '400px 0px' });
  const notify = useToast();
  const [card, setCard] = useState(null); // { blob, url }
  const { groom, bride } = wedding.couple;

  // Paint the card only when the guest gets close to this section.
  useEffect(() => {
    if (!nearby) return undefined;
    let url;
    renderInvitationCard().then((blob) => {
      if (!blob) return;
      url = URL.createObjectURL(blob);
      setCard({ blob, url });
    });
    return () => url && URL.revokeObjectURL(url);
  }, [nearby]);

  const share = async () => {
    const data = {
      title: `${groom} & ${bride} — Royal Wedding`,
      text: `${wedding.invitation.families}, ${groom} & ${bride} ${wedding.invitation.invite.toLowerCase()} — ${eventParts.weekday}, ${eventParts.day} ${eventParts.month} ${eventParts.year}.`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(`${data.text} ${data.url}`);
      notify('Invitation link copied');
    } catch (err) {
      if (err?.name !== 'AbortError') notify('Could not share — please copy the page link');
    }
  };

  const save = () => {
    if (!card) return;
    downloadBlob(card.blob, FILE_NAME);
    notify('Invitation card saved');
  };

  return (
    <section className="closing" id="closing" ref={ref} aria-labelledby="closing-title">
      <div className="closing__keepsake-wrap">
        <Angel type="cupid-bow" className="closing__cupid closing__cupid--left" flip delay={-2} />
        <Reveal as="figure" className="keepsake">
          {card ? (
            <img src={card.url} alt={`Invitation card: ${groom} & ${bride}, ${eventParts.weekday} ${eventParts.day} ${eventParts.month} ${eventParts.year} at ${eventParts.time}`} />
          ) : (
            <span className="keepsake__placeholder" aria-hidden="true" />
          )}
        </Reveal>
        <Angel type="cupid-aim" className="closing__cupid closing__cupid--right" flip delay={-4} />
      </div>

      <Reveal as="h2" className="script-title closing__title" id="closing-title">
        {wedding.invitation.closing}
      </Reveal>
      <Reveal as="p" className="closing__names caps" delay={0.15}>
        {groom} &amp; {bride}
      </Reveal>
      <Reveal delay={0.25}>
        <ArabicLine className="closing__arabic">{wedding.arabic.closing}</ArabicLine>
      </Reveal>
      <Reveal className="closing__actions" delay={0.3}>
        <button type="button" className="pill pill--gold" onClick={share}>
          <Icon name="share" /> Share invitation
        </button>
        <button type="button" className="pill pill--outline" onClick={save} disabled={!card}>
          <Icon name="download" /> Save the card
        </button>
      </Reveal>
      <p className="closing__foot caps" aria-hidden="true">
        {eventParts.numeric}
      </p>
    </section>
  );
}
