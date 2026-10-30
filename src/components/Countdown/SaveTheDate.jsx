import Icon from '../common/Icon.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { downloadIcs, googleCalendarUrl } from '../../lib/calendar.js';
import './SaveTheDate.css';

/**
 * "Save the Date" downloads an .ics event (Apple Calendar, Outlook, and most
 * phone calendars open it); "Add to Google Calendar" opens a pre-filled event.
 * Both are generated from the wedding config.
 */
export default function SaveTheDate() {
  const notify = useToast();
  const gcal = googleCalendarUrl();
  if (!gcal) return null;

  return (
    <div className="save-date">
      <button
        type="button"
        className="pill pill--gold"
        onClick={() => {
          downloadIcs();
          notify('Event saved — open it to add to your calendar');
        }}
      >
        <Icon name="calendar" /> Save the Date
      </button>
      <a className="pill pill--outline" href={gcal} target="_blank" rel="noopener noreferrer">
        <Icon name="calendar" /> Add to Google Calendar
      </a>
    </div>
  );
}
