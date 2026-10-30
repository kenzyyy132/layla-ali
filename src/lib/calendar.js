import { wedding, weddingStartMs } from '../config/wedding.js';

const toUtcStamp = (ms) => new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const escapeIcs = (s) => s.replace(/([,;\\])/g, '\\$1');

function eventInfo() {
  const { groom, bride } = wedding.couple;
  return {
    title: `${groom} & ${bride} Wedding`,
    location: `${wedding.venue.name}, ${wedding.venue.address}`,
    details: `${wedding.invitation.families}, ${groom} & ${bride} ${wedding.invitation.invite.toLowerCase()}. Map: ${wedding.venue.mapUrl}`,
    start: weddingStartMs,
    end: weddingStartMs + wedding.event.durationHours * 3600000,
  };
}

export function googleCalendarUrl() {
  if (weddingStartMs == null) return null;
  const e = eventInfo();
  return (
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    `&text=${encodeURIComponent(e.title)}` +
    `&dates=${toUtcStamp(e.start)}/${toUtcStamp(e.end)}` +
    `&location=${encodeURIComponent(e.location)}` +
    `&details=${encodeURIComponent(e.details)}`
  );
}

/** Downloads an .ics file — opens in Apple Calendar / Outlook. */
export function downloadIcs() {
  if (weddingStartMs == null) return;
  const e = eventInfo();
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ali & Layla//Royal Wedding//EN',
    'BEGIN:VEVENT',
    `UID:${toUtcStamp(e.start)}-ali-layla@wedding`,
    `DTSTAMP:${toUtcStamp(Date.now())}`,
    `DTSTART:${toUtcStamp(e.start)}`,
    `DTEND:${toUtcStamp(e.end)}`,
    `SUMMARY:${escapeIcs(e.title)}`,
    `LOCATION:${escapeIcs(e.location)}`,
    `DESCRIPTION:${escapeIcs(e.details)}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcs(e.title)} is tomorrow`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  downloadBlob(new Blob([ics], { type: 'text/calendar;charset=utf-8' }), 'ali-layla-wedding.ics');
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function directionsUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(wedding.venue.mapQuery)}`;
}
