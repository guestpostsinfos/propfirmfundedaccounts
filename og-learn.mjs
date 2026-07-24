// Generates public/og-learn.png (1200×630) — the share image for /learn/.
// Run: node og-learn.mjs
import sharp from 'sharp';

const pill = (x, w, label) => `
  <rect x="${x}" y="446" width="${w}" height="56" rx="28" fill="#e7f2ef"/>
  <text x="${x + w / 2}" y="482" font-family="Arial, sans-serif" font-size="25"
        font-weight="700" fill="#0a5449" text-anchor="middle">${label}</text>`;

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0d6b5c"/>
  <rect x="36" y="36" width="1128" height="558" rx="26" fill="#fdfdfc"/>
  <rect x="88" y="96" width="70" height="8" rx="4" fill="#c8871a"/>
  <text x="88" y="150" font-family="Arial, sans-serif" font-size="26" font-weight="700"
        fill="#0d6b5c" letter-spacing="4">PROP FIRM FUNDED ACCOUNTS</text>
  <text x="84" y="268" font-family="Arial, sans-serif" font-size="92" font-weight="800" fill="#17211f">Learn Prop Firm</text>
  <text x="84" y="366" font-family="Arial, sans-serif" font-size="92" font-weight="800" fill="#0d6b5c">Trading</text>
  <text x="90" y="426" font-family="Arial, sans-serif" font-size="34" font-weight="600" fill="#4a5551">Free interactive course &#183; Beginner to Advanced</text>
  ${pill(88, 176, '7 MODULES')}
  ${pill(280, 176, '7 QUIZZES')}
  ${pill(472, 182, 'DIAGRAMS')}
  ${pill(670, 250, 'PERSONALIZED')}
  <text x="90" y="558" font-family="Arial, sans-serif" font-size="27" font-weight="700"
        fill="#0d6b5c">propfirmfundedaccounts.com/learn</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og-learn.png');
console.log('wrote public/og-learn.png');
