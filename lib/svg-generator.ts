import type { PayoffData, SvgConfig } from './types'

let svgIdCounter = 0

export function generateSvg(data: PayoffData, config: SvgConfig): string {
  const uid = `s${svgIdCounter++}`
  const { width, height, atmPrice, margins } = config
  const plotW = width - margins.left - margins.right
  const plotH = height - margins.top - margins.bottom

  const [minPrice, maxPrice] = config.priceRange

  // Y range: fixed if configured, otherwise auto-scale from data
  let minY: number, maxY: number
  if (config.yRange) {
    ;[minY, maxY] = config.yRange
  } else {
    const ys = data.points.map((p) => p.y)
    const rawMinY = Math.min(...ys)
    const rawMaxY = Math.max(...ys)
    const yPad = Math.max((rawMaxY - rawMinY) * 0.15, 1)
    minY = rawMinY - yPad
    maxY = rawMaxY + yPad
  }

  // Coordinate transforms (round to 2 decimal places to keep SVG compact)
  const r = (n: number) => Math.round(n * 100) / 100
  const scaleX = (price: number) =>
    r(margins.left + ((price - minPrice) / (maxPrice - minPrice)) * plotW)
  const scaleY = (pnl: number) =>
    r(margins.top + ((maxY - pnl) / (maxY - minY)) * plotH)

  const zeroY = scaleY(0)

  // Build polyline points string
  const linePoints = data.points.map((p) => `${scaleX(p.x)},${scaleY(p.y)}`).join(' ')

  // Find zero crossings and build fill segments
  const fills = buildFillPaths(data, scaleX, scaleY, zeroY, uid)

  // Gradient definitions
  const gradientDefs = buildGradientDefs(fills, zeroY, height)

  // Strike tick marks
  const strikeTicks = data.strikes
    .map((s) => {
      const x = scaleX(s)
      return `<line x1="${x}" y1="${zeroY - 18}" x2="${x}" y2="${zeroY + 18}" stroke="CanvasText" stroke-opacity="0.4" stroke-width="9"/>`
    })
    .join('\n    ')

  // Payoff line gradient: green above zero, red below, smooth transition
  const transitionPx = 20
  const greenStop = r(((zeroY - transitionPx) / height) * 100)
  const redStop = r(((zeroY + transitionPx) / height) * 100)
  const lineGradient = `<linearGradient id="${uid}-payoff" x1="0" y1="0" x2="0" y2="${height}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#22c55e"/>
      <stop offset="${greenStop}%" stop-color="#22c55e"/>
      <stop offset="${r((zeroY / height) * 100)}%" stop-color="#eab308"/>
      <stop offset="${redStop}%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#ef4444"/>
    </linearGradient>`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="background:Canvas">
  <defs>
    ${gradientDefs}
    ${lineGradient}
    <clipPath id="${uid}-clip"><rect x="${margins.left}" y="${margins.top}" width="${plotW}" height="${plotH}"/></clipPath>
  </defs>
  <!-- Zero line -->
  <line x1="${margins.left}" y1="${zeroY}" x2="${width - margins.right}" y2="${zeroY}" stroke="CanvasText" stroke-opacity="0.5" stroke-width="18"/>
  <!-- ATM line -->
  <line x1="${scaleX(atmPrice)}" y1="${margins.top}" x2="${scaleX(atmPrice)}" y2="${height - margins.bottom}" stroke="CanvasText" stroke-opacity="0.5" stroke-width="14" stroke-dasharray="18 24"/>
  <!-- Strike ticks -->
  ${strikeTicks}
  <g clip-path="url(#${uid}-clip)">
  <!-- Fill regions -->
  ${fills.map((f) => `<path d="${f.path}" fill="url(#${f.id})" />`).join('\n  ')}
  <!-- Payoff line -->
  <polyline points="${linePoints}" fill="none" stroke="url(#${uid}-payoff)" stroke-width="18" stroke-linejoin="round" stroke-linecap="round"/>
  </g>
</svg>`
}

interface FillSegment {
  id: string
  path: string
  isProfit: boolean
  minSegY: number
  maxSegY: number
}

function buildFillPaths(
  data: PayoffData,
  scaleX: (p: number) => number,
  scaleY: (p: number) => number,
  zeroY: number,
  uid: string,
): FillSegment[] {
  const { points } = data
  if (points.length < 2) return []

  const segments: FillSegment[] = []
  let segId = 0

  // Walk through points, split at zero crossings
  let segPoints: { sx: number; sy: number }[] = []
  const flushSegment = () => {
    if (segPoints.length < 2) {
      segPoints = []
      return
    }
    const isProfit = segPoints.some((p) => p.sy < zeroY) // above zero line = profit (y is inverted)
    const id = `${uid}-f${segId++}`

    // Build closed path: line along payoff, then back along zero
    let d = `M${segPoints[0].sx},${segPoints[0].sy}`
    for (let i = 1; i < segPoints.length; i++) {
      d += ` L${segPoints[i].sx},${segPoints[i].sy}`
    }
    // Close back along zero line
    d += ` L${segPoints[segPoints.length - 1].sx},${zeroY}`
    d += ` L${segPoints[0].sx},${zeroY} Z`

    const segYs = segPoints.map((p) => p.sy)
    segments.push({
      id,
      path: d,
      isProfit,
      minSegY: Math.min(...segYs, zeroY),
      maxSegY: Math.max(...segYs, zeroY),
    })
    segPoints = []
  }

  segPoints.push({ sx: scaleX(points[0].x), sy: scaleY(points[0].y) })

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const prevSign = Math.sign(prev.y)
    const currSign = Math.sign(curr.y)

    if (prevSign !== 0 && currSign !== 0 && prevSign !== currSign) {
      // Zero crossing — interpolate
      const t = prev.y / (prev.y - curr.y)
      const crossX = prev.x + t * (curr.x - prev.x)
      const sx = scaleX(crossX)

      segPoints.push({ sx, sy: zeroY })
      flushSegment()
      segPoints.push({ sx, sy: zeroY })
    }

    segPoints.push({ sx: scaleX(curr.x), sy: scaleY(curr.y) })
  }

  flushSegment()
  return segments
}

function buildGradientDefs(fills: FillSegment[], zeroY: number, height: number): string {
  return fills
    .map((f) => {
      const color = f.isProfit ? '#22c55e' : '#ef4444'
      // Gradient goes from the payoff line edge toward the zero line
      // For profit (above zero): gradient from top of segment to zeroY
      // For loss (below zero): gradient from bottom of segment to zeroY
      const edgeY = f.isProfit ? f.minSegY : f.maxSegY

      const y1Pct = ((edgeY / height) * 100).toFixed(1)
      const y2Pct = ((zeroY / height) * 100).toFixed(1)

      return `<linearGradient id="${f.id}" x1="0" y1="${y1Pct}%" x2="0" y2="${y2Pct}%" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </linearGradient>`
    })
    .join('\n    ')
}
