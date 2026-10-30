import { wedding, eventParts } from '../config/wedding.js';

const W = 1200;
const H = 1700;
const NAVY = '#070d24';
const IVORY = '#fbf6ea';

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function goldFill(ctx, y0, y1) {
  const g = ctx.createLinearGradient(0, y0, 0, y1);
  g.addColorStop(0, '#fff1c1');
  g.addColorStop(0.45, '#e4c065');
  g.addColorStop(1, '#a8851f');
  return g;
}

function text(ctx, str, y, { font, color = IVORY, spacing = 0 }) {
  ctx.font = font;
  ctx.fillStyle = color;
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${spacing}px`;
  ctx.fillText(str, W / 2, y);
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
}

function wrap(ctx, str, y, maxWidth, lineHeight, style) {
  ctx.font = style.font;
  const words = str.split(' ');
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      text(ctx, line, y, style);
      line = word;
      y += lineHeight;
    } else line = test;
  }
  text(ctx, line, y, style);
  return y + lineHeight;
}

/** Paints the keepsake invitation card (1200×1700) and resolves to a PNG blob. */
export async function renderInvitationCard() {
  await Promise.all(
    ['170px "Pinyon Script"', '600 34px Cinzel', 'italic 46px "Cormorant Garamond"', '40px "Cormorant Garamond"', '700 40px "Aref Ruqaa"'].map((f) =>
      document.fonts?.load(f).catch(() => null),
    ),
  );
  const cherub = await loadImage('/images/art/cherub-heart.webp');

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  // velvet background with gold dust
  const bg = ctx.createRadialGradient(W / 2, H * 0.4, 100, W / 2, H * 0.4, H * 0.8);
  bg.addColorStop(0, '#12214f');
  bg.addColorStop(1, NAVY);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(243,217,139,0.18)';
  for (let i = 0; i < 260; i++) {
    ctx.beginPath();
    ctx.arc((i * 397) % W, (i * 613) % H, (i % 3) + 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  // double gold frame
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 4;
  ctx.strokeRect(36, 36, W - 72, H - 72);
  ctx.lineWidth = 1.5;
  ctx.strokeRect(52, 52, W - 104, H - 104);

  // the arch
  const archTop = 330;
  const r = 420;
  const cx = W / 2;
  ctx.beginPath();
  ctx.moveTo(cx - r, H - 140);
  ctx.lineTo(cx - r, archTop + r);
  ctx.arc(cx, archTop + r, r, Math.PI, 0);
  ctx.lineTo(cx + r, H - 140);
  ctx.closePath();
  ctx.fillStyle = 'rgba(11,22,56,0.92)';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = goldFill(ctx, archTop, H);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - r + 18, H - 158);
  ctx.lineTo(cx - r + 18, archTop + r);
  ctx.arc(cx, archTop + r, r - 18, Math.PI, 0);
  ctx.lineTo(cx + r - 18, H - 158);
  ctx.closePath();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(243,217,139,0.6)';
  ctx.stroke();

  if (cherub) {
    const cw = 280;
    const ch = (cherub.height / cherub.width) * cw;
    ctx.drawImage(cherub, cx - cw / 2, archTop - ch * 0.62, cw, ch);
  }

  const { groom, bride } = wedding.couple;
  const inv = wedding.invitation;
  const gold = goldFill(ctx, 600, 1000);
  ctx.direction = 'rtl';
  text(ctx, wedding.arabic.blessing, 540, { font: '700 38px "Aref Ruqaa"', color: '#e4c065' });
  ctx.direction = 'ltr';
  text(ctx, inv.families, 610, { font: 'italic 44px "Cormorant Garamond"' });
  text(ctx, groom, 770, { font: '170px "Pinyon Script"', color: gold });
  text(ctx, '&', 860, { font: '600 54px Cinzel', color: IVORY });
  text(ctx, bride, 1000, { font: '170px "Pinyon Script"', color: gold });

  ctx.fillStyle = '#d4af37';
  ctx.fillRect(cx - 220, 1050, 180, 2);
  ctx.fillRect(cx + 40, 1050, 180, 2);
  ctx.save();
  ctx.translate(cx, 1051);
  ctx.rotate(Math.PI / 4);
  ctx.fillRect(-9, -9, 18, 18);
  ctx.restore();

  const y0 = wrap(ctx, inv.invite.toUpperCase(), 1110, 680, 46, { font: '600 28px Cinzel', color: '#e4c065', spacing: 3 });
  let y = wrap(ctx, inv.body, y0 + 6, 680, 50, { font: 'italic 38px "Cormorant Garamond"' });
  y += 30;
  text(ctx, `${eventParts.weekday} · ${eventParts.day} ${eventParts.month} ${eventParts.year}`.toUpperCase(), y, {
    font: '600 34px Cinzel',
    color: '#e4c065',
    spacing: 4,
  });
  text(ctx, `${eventParts.time} · ${wedding.venue.name}`, y + 64, { font: '42px "Cormorant Garamond"' });
  text(ctx, wedding.venue.address, y + 116, { font: 'italic 32px "Cormorant Garamond"', color: 'rgba(251,246,234,0.75)' });

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}
