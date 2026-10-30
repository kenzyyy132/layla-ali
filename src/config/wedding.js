/**
 * Single source of truth for every piece of wedding content.
 * Update values here — components read from this file only.
 */
export const wedding = {
  couple: {
    groom: 'Ali',
    bride: 'Layla',
  },

  event: {
    // 20 November 2026, 5:00 PM at the venue (Cairo, UTC+02:00).
    start: '2026-11-20T17:00:00+02:00',
    durationHours: 5,
    timeZone: 'Africa/Cairo',
    timeZoneLabel: 'Cairo time',
  },

  venue: {
    // From the Google Maps link shared by the couple.
    name: 'La Plume Hall',
    nameLocal: 'قاعة La Plume',
    address: 'Ankara, Sheraton Al Matar, El Nozha, Cairo',
    mapUrl: 'https://maps.app.goo.gl/2AAHBipu45JmqkFZ9',
    mapQuery: '496G+8XH El Nozha, Cairo, Egypt',
  },

  invitation: {
    families: 'Together with their families',
    invite: 'Joyfully invite you to celebrate their wedding',
    body: 'An evening of love, happiness, and unforgettable memories.',
    message:
      'With hearts full of joy, we would be honoured to have you with us as we celebrate the beginning of our forever.',
    closing: "We can't wait to celebrate with you",
  },

  // Romantic Arabic lines, each shown in a different part of the invitation.
  arabic: {
    gate: 'وبوجودكم تكتمل فرحتنا',
    stage: 'ليلة من العمر، تجمع قلبين على الحب',
    blessing: 'اللهم بارك لهما وبارك عليهما واجمع بينهما في خير',
    closing: 'فرحتنا تكتمل بوجود أحبابنا',
  },

  gate: {
    // Your door artwork: put the file in /public/images and set e.g. '/images/door.webp'.
    // The image is split down the middle into two panels that swing open.
    // While null, the illustrated royal arch door is used.
    doorImage: null,
  },

  performance: {
    performer: 'Elvis Presley',
    // The supplied 2D character, cut into separately animated layers.
    layers: {
      base: '/images/art/elvis2-base.webp',
      head: '/images/art/elvis2-head.webp',
      arm: '/images/art/elvis2-arm.webp',
    },
  },

  music: {
    title: "Can't Help Falling in Love",
    artist: 'Elvis Presley',
    // Base name of the song inside the project's /assets folder. It exists as .mp3, .ogg and .m4a
    // (made from the supplied video) and each browser plays the first format it supports.
    // If none match, the first audio file found in /assets is used.
    file: 'cant-help-falling-in-love',
  },

  rsvp: {
    // WhatsApp number in international format without "+" (e.g. '201234567890').
    // While empty, replies open WhatsApp so the guest can choose the contact.
    whatsapp: '',
    deadline: '',
  },
};

const startDate = new Date(wedding.event.start);

/** Wedding start as epoch ms, or null if the configured date is invalid. */
export const weddingStartMs = Number.isNaN(startDate.getTime()) ? null : startDate.getTime();

export function formatEventDate(options, timeZone = wedding.event.timeZone) {
  if (weddingStartMs == null) return '';
  return new Intl.DateTimeFormat('en-US', { timeZone, ...options }).format(weddingStartMs);
}

export const eventParts = {
  weekday: formatEventDate({ weekday: 'long' }),
  month: formatEventDate({ month: 'long' }),
  day: formatEventDate({ day: '2-digit' }),
  year: formatEventDate({ year: 'numeric' }),
  time: formatEventDate({ hour: 'numeric', minute: '2-digit' }),
  numeric: [formatEventDate({ day: '2-digit' }), formatEventDate({ month: '2-digit' }), formatEventDate({ year: 'numeric' })].join(' · '),
};

export const eventDateLong = formatEventDate({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
