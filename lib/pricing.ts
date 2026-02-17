import type { OptionLeg } from './types'

export const IV = 0.30
export const RISK_FREE_RATE = 0.05

/** Standard normal CDF using Abramowitz & Stegun rational approximation */
function normCdf(x: number): number {
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911

  const sign = x < 0 ? -1 : 1
  const t = 1 / (1 + p * Math.abs(x) / Math.SQRT2)
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x / 2)

  return 0.5 * (1 + sign * y)
}

/** Black-Scholes option pricing */
export function blackScholes(
  type: 'call' | 'put',
  S: number,
  K: number,
  T: number,
  r: number,
  sigma: number,
): number {
  if (T <= 0) {
    // At expiry, return intrinsic value
    return type === 'call' ? Math.max(0, S - K) : Math.max(0, K - S)
  }

  const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T))
  const d2 = d1 - sigma * Math.sqrt(T)

  if (type === 'call') {
    return S * normCdf(d1) - K * Math.exp(-r * T) * normCdf(d2)
  } else {
    return K * Math.exp(-r * T) * normCdf(-d2) - S * normCdf(-d1)
  }
}

/** Calculate net premium for a set of option legs. Positive = net credit, negative = net debit. */
export function calculateNetPremium(legs: OptionLeg[], atmPrice: number): number {
  let netPremium = 0

  for (const leg of legs) {
    const K = atmPrice + leg.strike
    const T = leg.expiry / 365
    const legPrice = blackScholes(leg.type, atmPrice, K, T, RISK_FREE_RATE, IV)
    netPremium += -leg.position * legPrice
  }

  return netPremium
}
