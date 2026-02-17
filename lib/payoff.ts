import type { OptionLeg, PayoffData, SvgConfig } from './types'
import { blackScholes, calculateNetPremium, IV, RISK_FREE_RATE } from './pricing'

export function calculatePayoff(legs: OptionLeg[], config: SvgConfig): PayoffData {
  const [minPrice, maxPrice] = config.priceRange
  const points: { x: number; y: number }[] = []
  const strikes = new Set<number>()

  for (const leg of legs) {
    strikes.add(config.atmPrice + leg.strike)
  }

  // Evaluate at the nearest expiry
  const minExpiry = Math.min(...legs.map((l) => l.expiry))

  for (let price = minPrice; price <= maxPrice; price += 0.5) {
    let totalPayoff = 0
    for (const leg of legs) {
      const absoluteStrike = config.atmPrice + leg.strike
      const remainingDays = leg.expiry - minExpiry
      let legValue: number
      if (remainingDays <= 0) {
        // Expiring now — intrinsic value
        legValue =
          leg.type === 'call'
            ? Math.max(0, price - absoluteStrike)
            : Math.max(0, absoluteStrike - price)
      } else {
        // Still has time — price with BS at this underlying price
        legValue = blackScholes(leg.type, price, absoluteStrike, remainingDays / 365, RISK_FREE_RATE, IV)
      }
      totalPayoff += legValue * leg.position
    }
    points.push({ x: price, y: totalPayoff })
  }

  const netPremium = calculateNetPremium(legs, config.atmPrice)
  for (const point of points) {
    point.y += netPremium
  }

  return { points, strikes: [...strikes].sort((a, b) => a - b) }
}
