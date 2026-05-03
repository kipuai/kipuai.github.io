// One-off script: generates PNG icons and OG image from the Pendant mark.
// Run: node scripts/generate-icons.mjs
import sharp from 'sharp';
import { writeFileSync } from 'fs';

const INK     = '#1A1A1A';
const INVERSE = '#F7F5F0';
const ACCENT  = '#2E4F3E';

const WEIGHTS = {
  light:   { cord: 0.032, pendant: 0.028, dot: 0.042 },
  regular: { cord: 0.042, pendant: 0.035, dot: 0.050 },
  medium:  { cord: 0.055, pendant: 0.045, dot: 0.060 },
};

// Returns the inner SVG elements (no outer <svg>) for the pendant mark
// drawn on the fixed 64×64 grid.
function pendantInner(fg, weight) {
  const w  = WEIGHTS[weight];
  const S  = 64;
  const cW = S * w.cord;
  const pW = S * w.pendant;
  const dR = S * w.dot;
  const tY = S * 0.20;
  const l  = S * 0.12;
  const r  = S * 0.88;
  const ps = [
    { x: S * 0.28, ey: S * 0.58 },
    { x: S * 0.50, ey: S * 0.76 },
    { x: S * 0.72, ey: S * 0.48 },
  ];
  const segs = ps.map(p => `
    <line x1="${p.x}" y1="${tY}" x2="${p.x}" y2="${p.ey}" stroke="${fg}" stroke-width="${pW}" stroke-linecap="round"/>
    <circle cx="${p.x}" cy="${p.ey}" r="${dR}" fill="${fg}"/>`).join('');
  return `<line x1="${l}" y1="${tY}" x2="${r}" y2="${tY}" stroke="${fg}" stroke-width="${cW}" stroke-linecap="round"/>${segs}`;
}

// Square icon SVG — pendant centered with padding on a solid background
function iconSvg({ size, fg, weight, bg, pad = 8 }) {
  const vb = `${-pad} ${-pad} ${64 + pad * 2} ${64 + pad * 2}`;
  const bgEl = bg
    ? `<rect x="${-pad}" y="${-pad}" width="${64 + pad * 2}" height="${64 + pad * 2}" fill="${bg}"/>`
    : '';
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${size}" height="${size}" fill="none">${bgEl}${pendantInner(fg, weight)}</svg>`
  );
}

// OG image — 1200×630, stacked lockup centred on dark background
function ogSvg() {
  const W = 1200, H = 630;
  const symSize = 128;
  const symX = (W - symSize) / 2;
  const symY = 172;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" fill="none">
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <svg x="${symX}" y="${symY}" width="${symSize}" height="${symSize}" viewBox="-4 -4 72 72" fill="none">
    ${pendantInner(INVERSE, 'medium')}
  </svg>
  <text x="${W / 2}" y="358"
    font-family="'Helvetica Neue', 'Arial', sans-serif"
    font-size="64" font-weight="500" letter-spacing="-1.4"
    fill="${INVERSE}" text-anchor="middle"
  >kipu</text>
  <text x="${W / 2}" y="420"
    font-family="'Helvetica Neue', 'Arial', sans-serif"
    font-size="22" font-weight="400"
    fill="${INVERSE}" opacity="0.45" text-anchor="middle"
  >AI strategy &amp; implementation · Latin America</text>
</svg>`
  );
}

await Promise.all([
  sharp(iconSvg({ size: 180, fg: INVERSE, weight: 'regular', bg: ACCENT, pad: 8 }))
    .png().toFile('public/apple-touch-icon.png'),
  sharp(iconSvg({ size: 192, fg: INVERSE, weight: 'medium',  bg: ACCENT, pad: 8 }))
    .png().toFile('public/icon-192.png'),
  sharp(iconSvg({ size: 512, fg: INVERSE, weight: 'medium',  bg: ACCENT, pad: 8 }))
    .png().toFile('public/icon-512.png'),
  sharp(ogSvg())
    .png().toFile('public/og.png'),
]);

// SVG favicon — written directly (no sharp needed)
const favSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <style>line,circle{color:${INK}} @media(prefers-color-scheme:dark){line,circle{color:${INVERSE}}}</style>
  ${pendantInner('currentColor', 'regular')}
</svg>`;
writeFileSync('public/favicon.svg', favSvg);

console.log('Done: favicon.svg, apple-touch-icon.png, icon-192.png, icon-512.png, og.png');
