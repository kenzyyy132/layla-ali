# Ali & Layla — Royal Wedding Invitation (React + Vite)

```bash
npm install
npm run dev      # local development
npm run build    # production build → dist/
```

## Where to edit
All content lives in **`src/config/wedding.js`**: names, date/time, venue, wording,
door image, music file, RSVP WhatsApp number.

## Experience
Gate (padlocked arch door, "Tap to open") → Stage (animated 2D Elvis on the grand staircase) →
Our Song (Can't Help Falling in Love) → Invitation card with monogram, calendar & live countdown →
Message arch + RSVP → When & Where → Keepsake card, Share & Save.
A fixed animated sky (cherubs, birds, heart-tipped arrows, hearts, petals, stars) runs behind it all.

## Music
The song lives in the project's `assets/` folder and plays through an HTML5 `<audio>` element.
`assets/cant-help-falling-in-love.m4a` is a lossless audio-only copy of the supplied
`Elvis Presley - Can't Help Falling in Love (Lyrics).mp4`. To swap songs, drop a new audio file
(m4a/mp3/ogg/wav) into `assets/` and set `music.file` in the config.

## Structure
- `components/Gate` — opening doors (uses `gate.doorImage` when set)
- `components/Stage` — Elvis (`ElvisSinger`), Listen button
- `components/Invitation`, `components/Countdown` — card, calendar, royal clock countdown, Save the Date
- `components/Song` — Our Song vinyl card
- `components/Background` — RomanticSky (animated background)
- `components/Message` — message arch, `RsvpDialog`
- `components/Details` — When & Where
- `components/Closing` — keepsake, share, save card
- `context/` — `MusicProvider` (HTML5 audio from /assets), `ToastProvider`
- `lib/` — `calendar`, `renderCard` (canvas keepsake)

## Art
`public/images/art/` — couple-supplied references, background-removed; cherubs and candle
gilded to the navy/gold/ivory palette; Elvis cartoon split into base/head/fist layers.
