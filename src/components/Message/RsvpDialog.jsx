import { useEffect, useId, useRef, useState } from 'react';
import Icon from '../common/Icon.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { wedding } from '../../config/wedding.js';
import './RsvpDialog.css';

function buildMessage({ name, attending, guests, note }) {
  const { groom, bride } = wedding.couple;
  const lines = [
    `RSVP — Wedding of ${groom} & ${bride}`,
    `Name: ${name}`,
    attending ? `Joyfully accepts (${guests} ${guests === 1 ? 'guest' : 'guests'})` : 'Regretfully declines',
  ];
  if (note.trim()) lines.push(`Message: ${note.trim()}`);
  return lines.join('\n');
}

/** RSVP form in a native <dialog>; the reply is sent as a pre-written WhatsApp message. */
export default function RsvpDialog({ open, onClose, onSent }) {
  const ref = useRef(null);
  const id = useId();
  const notify = useToast();
  const [name, setName] = useState('');
  const [attending, setAttending] = useState(true);
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState('');

  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const text = buildMessage({ name: name.trim(), attending, guests, note });
    const number = wedding.rsvp.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    notify('Opening WhatsApp to send your reply…');
    onSent({ name: name.trim(), attending });
    onClose();
  };

  return (
    <dialog
      ref={ref}
      className="rsvp"
      aria-labelledby={`${id}-title`}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <form className="rsvp__form" onSubmit={submit}>
        <button type="button" className="rsvp__close" onClick={onClose} aria-label="Close">
          <Icon name="close" />
        </button>
        <p className="rsvp__eyebrow caps">Kindly reply</p>
        <h2 className="rsvp__title script" id={`${id}-title`}>
          Will you join us?
        </h2>

        <label className="rsvp__field">
          <span className="caps">Your name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" maxLength={80} />
        </label>

        <fieldset className="rsvp__choice">
          <legend className="visually-hidden">Attendance</legend>
          <label className={attending ? 'is-on' : ''}>
            <input type="radio" name="attending" checked={attending} onChange={() => setAttending(true)} />
            Joyfully accepts
          </label>
          <label className={!attending ? 'is-on' : ''}>
            <input type="radio" name="attending" checked={!attending} onChange={() => setAttending(false)} />
            Regretfully declines
          </label>
        </fieldset>

        {attending && (
          <label className="rsvp__field rsvp__field--inline">
            <span className="caps">Number of guests</span>
            <span className="rsvp__stepper">
              <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} aria-label="Fewer guests">
                −
              </button>
              <output aria-live="polite">{guests}</output>
              <button type="button" onClick={() => setGuests((g) => Math.min(10, g + 1))} aria-label="More guests">
                +
              </button>
            </span>
          </label>
        )}

        <label className="rsvp__field">
          <span className="caps">A message for the couple (optional)</span>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} maxLength={400} />
        </label>

        <button type="submit" className="pill pill--gold rsvp__send">
          <Icon name="heart" /> Send my reply
        </button>
        <p className="rsvp__hint">Your reply opens in WhatsApp, ready to send.</p>
      </form>
    </dialog>
  );
}
