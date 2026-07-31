import fs from 'node:fs'
import path from 'node:path'
import { PNG } from 'pngjs'

const inPath = path.resolve('public/gold-frame-key.png')
const outPath = path.resolve('public/gold-frame.png')

const png = PNG.sync.read(fs.readFileSync(inPath))
const { data } = png

// Chroma-key: magenta (#FF00FF) => high R, high B, low G.
// "magentaness" grows as min(R,B) exceeds G.
const T0 = 24 // fully opaque below this
const T1 = 90 // fully transparent above this

for (let i = 0; i < data.length; i += 4) {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]

  const key = Math.min(r, b) - g
  let a = (key - T0) / (T1 - T0)
  a = a < 0 ? 0 : a > 1 ? 1 : a // 0 = keep, 1 = drop

  if (a > 0) {
    // De-spill: pull magenta tint out of semi-transparent edge pixels.
    const cap = g + 30
    if (data[i] > cap) data[i] = cap
    if (data[i + 2] > cap) data[i + 2] = cap
  }
  data[i + 3] = Math.round(255 * (1 - a))
}

fs.writeFileSync(outPath, PNG.sync.write(png))
console.log('[v0] keyed frame written to', outPath)
