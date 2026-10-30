import { useEffect, useState } from 'react';
import Reveal from '../common/Reveal.jsx';
import Icon from '../common/Icon.jsx';
import Angel from '../common/Angel.jsx';
import RsvpDialog from './RsvpDialog.jsx';
import { wedding } from '../../config/wedding.js';
import './MessageArch.css';

const STORAGE_KEY = 'ali-layla-rsvp';

function readStoredReply() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

/** The couple's message under a gilded arch, with chandeliers, cupids and the RSVP. */
export default function MessageArch() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reply, setReply] = useState(null);

  useEffect(() => setReply(readStoredReply()), []);

  const handleSent = (r) => {
    setReply(r);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
    } catch {
      /* private mode — the thank-you just won't persist */
    }
  };

  return (
    <section className="message" id="message" aria-labelledby="message-title">
      <Reveal className="message__scene">
        <img className="message__chandelier message__chandelier--left" src="/images/art/chandelier.webp" alt="" aria-hidden="true" loading="lazy" />
        <img className="message__chandelier message__chandelier--right" src="/images/art/chandelier.webp" alt="" aria-hidden="true" loading="lazy" />

        <div className="message__arch">
          <Icon name="sprig" className="message__sprig" />
          <h2 className="visually-hidden" id="message-title">
            A message from the couple
          </h2>
          <Reveal as="p" className="message__text" delay={0.2}>
            {wedding.invitation.message}
          </Reveal>
          <Reveal className="message__actions" delay={0.4}>
            {reply ? (
              <p className="message__thanks">
                <span className="script">Thank you, {reply.name}!</span>
                {reply.attending ? 'We can’t wait to see you there.' : 'You will be with us in spirit.'}
              </p>
            ) : null}
            <button type="button" className="pill pill--gold" onClick={() => setDialogOpen(true)}>
              <Icon name="heart" /> {reply ? 'Update your RSVP' : 'Kindly RSVP here'}
            </button>
            {wedding.rsvp.deadline && <p className="message__deadline">Kindly reply by {wedding.rsvp.deadline}</p>}
          </Reveal>
        </div>

        <Angel type="cupid-aim" className="message__cupid message__cupid--left" delay={-1} />
        <Angel type="cupid-bow" className="message__cupid message__cupid--right" delay={-3.5} />
      </Reveal>

      <RsvpDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSent={handleSent} />
    </section>
  );
}
