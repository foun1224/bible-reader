// Generate PWA icons from SVG using sharp
import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '../public')

// Icon design: sage green bg + open book + cross spine
// All geometry, no text — works without CJK fonts
function makeSvg(size) {
  const s = size
  const r = Math.round(size * 0.2225)

  // Book geometry — relative to unit square, scaled by s
  // Open book: two pages splayed open, spine in center
  const cx = s / 2
  const cy = s * 0.5

  // Left page
  const lx1 = s * 0.1, ly1 = s * 0.22
  const lx2 = cx - s * 0.025, ly2 = s * 0.26
  const lx3 = cx - s * 0.025, ly3 = s * 0.76
  const lx4 = s * 0.1, ly4 = s * 0.78

  // Right page
  const rx1 = cx + s * 0.025, ry1 = s * 0.26
  const rx2 = s * 0.9, ry2 = s * 0.22
  const rx3 = s * 0.9, ry3 = s * 0.78
  const rx4 = cx + s * 0.025, ry4 = s * 0.76

  // Spine width
  const sw = s * 0.025

  // Cross on right page (small, tasteful)
  const ccx = cx + s * 0.23, ccy = s * 0.5
  const cw = s * 0.028, ch = s * 0.18
  const chw = s * 0.11, chh = s * 0.028

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0%" stop-color="#4A6E54"/>
      <stop offset="100%" stop-color="#2C4234"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${s}" height="${s}" rx="${r}" ry="${r}" fill="url(#bg)"/>

  <!-- Left page -->
  <polygon points="${lx1},${ly1} ${lx2},${ly2} ${lx3},${ly3} ${lx4},${ly4}"
           fill="white" opacity="0.92"/>

  <!-- Right page -->
  <polygon points="${rx1},${ry1} ${rx2},${ry2} ${rx3},${ry3} ${rx4},${ry4}"
           fill="white" opacity="0.82"/>

  <!-- Spine shadow -->
  <rect x="${cx - sw}" y="${s * 0.22}" width="${sw * 2}" height="${s * 0.56}"
        fill="#2C4234" opacity="0.25" rx="${sw * 0.4}"/>

  <!-- Lines on left page (text lines) -->
  ${[0.36, 0.43, 0.5, 0.57, 0.64, 0.7].map(yFrac => `
  <rect x="${lx1 + s*0.04}" y="${s*yFrac}" width="${(lx2 - lx1)*0.72}" height="${s*0.018}"
        fill="#3D5E46" opacity="0.18" rx="${s*0.005}"/>`).join('')}

  <!-- Cross on right page -->
  <rect x="${ccx - cw/2}" y="${ccy - ch/2}"
        width="${cw}" height="${ch}"
        fill="#4F7358" opacity="0.55" rx="${cw*0.3}"/>
  <rect x="${ccx - chw/2}" y="${ccy - chh*0.8}"
        width="${chw}" height="${chh}"
        fill="#4F7358" opacity="0.55" rx="${chh*0.3}"/>

  <!-- Bottom accent line -->
  <rect x="${s*0.38}" y="${s*0.845}" width="${s*0.24}" height="${s*0.007}"
        fill="white" opacity="0.3" rx="${s*0.004}"/>
</svg>`
}

const sizes = [
  { name: 'favicon-32.png',      size: 32  },
  { name: 'icon-192.png',        size: 192 },
  { name: 'icon-512.png',        size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
]

for (const { name, size } of sizes) {
  const svg = Buffer.from(makeSvg(size))
  const outPath = join(publicDir, name)
  await sharp(svg).png().toFile(outPath)
  console.log(`✓ ${name} (${size}x${size})`)
}

// favicon.ico — use the 32px PNG
const favicon32 = join(publicDir, 'favicon-32.png')
console.log('\nDone. Add to index.html:')
console.log(`  <link rel="icon" type="image/png" href="/bible-reader/favicon-32.png">`)
console.log(`  <link rel="apple-touch-icon" href="/bible-reader/apple-touch-icon.png">`)
