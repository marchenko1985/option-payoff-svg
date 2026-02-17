import type { OptionLeg } from './types'

export interface Strategy {
  name: string
  legs: OptionLeg[]
}

export const strategies: Strategy[] = [
  // === Basic ===
  {
    name: 'Long Call',
    legs: [{ type: 'call', position: 1, strike: 0, expiry: 30 }],
  },
  {
    name: 'Long Put',
    legs: [{ type: 'put', position: 1, strike: 0, expiry: 30 }],
  },
  {
    name: 'Short Call',
    legs: [{ type: 'call', position: -1, strike: 0, expiry: 30 }],
  },
  {
    name: 'Short Put',
    legs: [{ type: 'put', position: -1, strike: 0, expiry: 30 }],
  },

  // === Vertical Spreads ===
  {
    name: 'Bull Call Spread',
    legs: [
      { type: 'call', position: 1, strike: 0, expiry: 30 },
      { type: 'call', position: -1, strike: 5, expiry: 30 },
    ],
  },
  {
    name: 'Bull Put Spread',
    legs: [
      { type: 'put', position: -1, strike: 0, expiry: 30 },
      { type: 'put', position: 1, strike: -5, expiry: 30 },
    ],
  },
  {
    name: 'Bear Call Spread',
    legs: [
      { type: 'call', position: -1, strike: -5, expiry: 30 },
      { type: 'call', position: 1, strike: 0, expiry: 30 },
    ],
  },
  {
    name: 'Bear Put Spread',
    legs: [
      { type: 'put', position: 1, strike: 5, expiry: 30 },
      { type: 'put', position: -1, strike: 0, expiry: 30 },
    ],
  },

  // === Straddles & Strangles ===
  {
    name: 'Long Straddle',
    legs: [
      { type: 'call', position: 1, strike: 0, expiry: 30 },
      { type: 'put', position: 1, strike: 0, expiry: 30 },
    ],
  },
  {
    name: 'Short Straddle',
    legs: [
      { type: 'call', position: -1, strike: 0, expiry: 30 },
      { type: 'put', position: -1, strike: 0, expiry: 30 },
    ],
  },
  {
    name: 'Long Strangle',
    legs: [
      { type: 'call', position: 1, strike: 5, expiry: 30 },
      { type: 'put', position: 1, strike: -5, expiry: 30 },
    ],
  },
  {
    name: 'Short Strangle',
    legs: [
      { type: 'call', position: -1, strike: 5, expiry: 30 },
      { type: 'put', position: -1, strike: -5, expiry: 30 },
    ],
  },

  // === Butterflies ===
  {
    name: 'Long Call Butterfly',
    legs: [
      { type: 'call', position: 1, strike: -5, expiry: 30 },
      { type: 'call', position: -2, strike: 0, expiry: 30 },
      { type: 'call', position: 1, strike: 5, expiry: 30 },
    ],
  },
  {
    name: 'Long Put Butterfly',
    legs: [
      { type: 'put', position: 1, strike: 5, expiry: 30 },
      { type: 'put', position: -2, strike: 0, expiry: 30 },
      { type: 'put', position: 1, strike: -5, expiry: 30 },
    ],
  },
  {
    name: 'Short Call Butterfly',
    legs: [
      { type: 'call', position: -1, strike: 5, expiry: 30 },
      { type: 'call', position: 2, strike: 0, expiry: 30 },
      { type: 'call', position: -1, strike: -5, expiry: 30 },
    ],
  },
  {
    name: 'Short Put Butterfly',
    legs: [
      { type: 'put', position: -1, strike: 5, expiry: 30 },
      { type: 'put', position: 2, strike: 0, expiry: 30 },
      { type: 'put', position: -1, strike: -5, expiry: 30 },
    ],
  },
  {
    name: 'Long Iron Butterfly',
    legs: [
      { type: 'call', position: 1, strike: 5, expiry: 30 },
      { type: 'call', position: -1, strike: 0, expiry: 30 },
      { type: 'put', position: -1, strike: 0, expiry: 30 },
      { type: 'put', position: 1, strike: -5, expiry: 30 },
    ],
  },
  {
    name: 'Short Iron Butterfly',
    legs: [
      { type: 'call', position: -1, strike: 5, expiry: 30 },
      { type: 'call', position: 1, strike: 0, expiry: 30 },
      { type: 'put', position: 1, strike: 0, expiry: 30 },
      { type: 'put', position: -1, strike: -5, expiry: 30 },
    ],
  },

  // === Condors ===
  {
    name: 'Long Call Condor',
    legs: [
      { type: 'call', position: 1, strike: -10, expiry: 30 },
      { type: 'call', position: -1, strike: -5, expiry: 30 },
      { type: 'call', position: -1, strike: 5, expiry: 30 },
      { type: 'call', position: 1, strike: 10, expiry: 30 },
    ],
  },
  {
    name: 'Long Put Condor',
    legs: [
      { type: 'put', position: 1, strike: -10, expiry: 30 },
      { type: 'put', position: -1, strike: -5, expiry: 30 },
      { type: 'put', position: -1, strike: 5, expiry: 30 },
      { type: 'put', position: 1, strike: 10, expiry: 30 },
    ],
  },
  {
    name: 'Long Iron Condor',
    legs: [
      { type: 'put', position: 1, strike: -10, expiry: 30 },
      { type: 'put', position: -1, strike: -5, expiry: 30 },
      { type: 'call', position: -1, strike: 5, expiry: 30 },
      { type: 'call', position: 1, strike: 10, expiry: 30 },
    ],
  },
  {
    name: 'Short Iron Condor',
    legs: [
      { type: 'call', position: -1, strike: 10, expiry: 30 },
      { type: 'call', position: 1, strike: 5, expiry: 30 },
      { type: 'put', position: 1, strike: -5, expiry: 30 },
      { type: 'put', position: -1, strike: -10, expiry: 30 },
    ],
  },

  // === Calendar Spreads ===
  {
    name: 'Long Call Calendar Spread',
    legs: [
      { type: 'call', position: -1, strike: 0, expiry: 30 },
      { type: 'call', position: 1, strike: 0, expiry: 60 },
    ],
  },
  {
    name: 'Long Put Calendar Spread',
    legs: [
      { type: 'put', position: -1, strike: 0, expiry: 30 },
      { type: 'put', position: 1, strike: 0, expiry: 60 },
    ],
  },
  {
    name: 'Short Call Calendar Spread',
    legs: [
      { type: 'call', position: 1, strike: 0, expiry: 30 },
      { type: 'call', position: -1, strike: 0, expiry: 60 },
    ],
  },
  {
    name: 'Short Put Calendar Spread',
    legs: [
      { type: 'put', position: 1, strike: 0, expiry: 30 },
      { type: 'put', position: -1, strike: 0, expiry: 60 },
    ],
  },

  // === Ratio Spreads ===
  {
    name: 'Long Call Ratio Spread',
    legs: [
      { type: 'call', position: 1, strike: 0, expiry: 30 },
      { type: 'call', position: -2, strike: 5, expiry: 30 },
    ],
  },
  {
    name: 'Long Put Ratio Spread',
    legs: [
      { type: 'put', position: 1, strike: 0, expiry: 30 },
      { type: 'put', position: -2, strike: -5, expiry: 30 },
    ],
  },
  {
    name: 'Short Call Ratio Spread',
    legs: [
      { type: 'call', position: -1, strike: 0, expiry: 30 },
      { type: 'call', position: 2, strike: 5, expiry: 30 },
    ],
  },
  {
    name: 'Short Put Ratio Spread',
    legs: [
      { type: 'put', position: -1, strike: 0, expiry: 30 },
      { type: 'put', position: 2, strike: -5, expiry: 30 },
    ],
  },

  // === Ladders ===
  {
    name: 'Bull Call Ladder',
    legs: [
      { type: 'call', position: 1, strike: -5, expiry: 30 },
      { type: 'call', position: -1, strike: 0, expiry: 30 },
      { type: 'call', position: -1, strike: 5, expiry: 30 },
    ],
  },
  {
    name: 'Bear Call Ladder',
    legs: [
      { type: 'call', position: -1, strike: -5, expiry: 30 },
      { type: 'call', position: 1, strike: 0, expiry: 30 },
      { type: 'call', position: 1, strike: 5, expiry: 30 },
    ],
  },
  {
    name: 'Bull Put Ladder',
    legs: [
      { type: 'put', position: 1, strike: -5, expiry: 30 },
      { type: 'put', position: 1, strike: 0, expiry: 30 },
      { type: 'put', position: -1, strike: 5, expiry: 30 },
    ],
  },
  {
    name: 'Bear Put Ladder',
    legs: [
      { type: 'put', position: -1, strike: 0, expiry: 30 },
      { type: 'put', position: -1, strike: -5, expiry: 30 },
      { type: 'put', position: 1, strike: 5, expiry: 30 },
    ],
  },

  // === Broken Wings ===
  {
    name: 'Call Broken Wing',
    legs: [
      { type: 'call', position: 1, strike: -10, expiry: 30 },
      { type: 'call', position: -2, strike: -5, expiry: 30 },
      { type: 'call', position: 1, strike: 5, expiry: 30 },
    ],
  },
  {
    name: 'Put Broken Wing',
    legs: [
      { type: 'put', position: 1, strike: 10, expiry: 30 },
      { type: 'put', position: -2, strike: 5, expiry: 30 },
      { type: 'put', position: 1, strike: -5, expiry: 30 },
    ],
  },
  {
    name: 'Reverse Call Broken Wing',
    legs: [
      { type: 'call', position: -1, strike: -10, expiry: 30 },
      { type: 'call', position: 2, strike: -5, expiry: 30 },
      { type: 'call', position: -1, strike: 5, expiry: 30 },
    ],
  },
  {
    name: 'Reverse Put Broken Wing',
    legs: [
      { type: 'put', position: -1, strike: 10, expiry: 30 },
      { type: 'put', position: 2, strike: 5, expiry: 30 },
      { type: 'put', position: -1, strike: -5, expiry: 30 },
    ],
  },

  // === Jade Lizards ===
  {
    name: 'Jade Lizard',
    legs: [
      { type: 'put', position: -1, strike: -5, expiry: 30 },
      { type: 'call', position: -1, strike: 5, expiry: 30 },
      { type: 'call', position: 1, strike: 10, expiry: 30 },
    ],
  },
  {
    name: 'Reverse Jade Lizard',
    legs: [
      { type: 'call', position: -1, strike: 5, expiry: 30 },
      { type: 'put', position: -1, strike: -5, expiry: 30 },
      { type: 'put', position: 1, strike: -10, expiry: 30 },
    ],
  },

  // === Diagonal Spreads ===
  {
    name: 'Diagonal Call Spread',
    legs: [
      { type: 'call', position: 1, strike: -5, expiry: 60 },
      { type: 'call', position: -1, strike: 5, expiry: 30 },
    ],
  },
  {
    name: 'Diagonal Put Spread',
    legs: [
      { type: 'put', position: -1, strike: -5, expiry: 30 },
      { type: 'put', position: 1, strike: 5, expiry: 60 },
    ],
  },

  // === Short Condors ===
  {
    name: 'Short Call Condor',
    legs: [
      { type: 'call', position: -1, strike: -10, expiry: 30 },
      { type: 'call', position: 1, strike: -5, expiry: 30 },
      { type: 'call', position: 1, strike: 5, expiry: 30 },
      { type: 'call', position: -1, strike: 10, expiry: 30 },
    ],
  },
  {
    name: 'Short Put Condor',
    legs: [
      { type: 'put', position: -1, strike: -10, expiry: 30 },
      { type: 'put', position: 1, strike: -5, expiry: 30 },
      { type: 'put', position: 1, strike: 5, expiry: 30 },
      { type: 'put', position: -1, strike: 10, expiry: 30 },
    ],
  },

  // === Volatility Strategies ===
  {
    name: 'Strip',
    legs: [
      { type: 'call', position: 1, strike: 0, expiry: 30 },
      { type: 'put', position: 2, strike: 0, expiry: 30 },
    ],
  },
  {
    name: 'Strap',
    legs: [
      { type: 'call', position: 2, strike: 0, expiry: 30 },
      { type: 'put', position: 1, strike: 0, expiry: 30 },
    ],
  },
  {
    name: 'Long Guts',
    legs: [
      { type: 'call', position: 1, strike: -5, expiry: 30 },
      { type: 'put', position: 1, strike: 5, expiry: 30 },
    ],
  },
  {
    name: 'Short Guts',
    legs: [
      { type: 'call', position: -1, strike: -5, expiry: 30 },
      { type: 'put', position: -1, strike: 5, expiry: 30 },
    ],
  },
  {
    name: 'Double Calendar Diagonal',
    legs: [
      { type: 'put', position: -1, strike: -5, expiry: 30 },
      { type: 'put', position: 1, strike: -10, expiry: 60 },
      { type: 'call', position: -1, strike: 5, expiry: 30 },
      { type: 'call', position: 1, strike: 10, expiry: 60 },
    ],
  },

  // === Risk Reversals ===
  {
    name: 'Long Risk Reversal',
    legs: [
      { type: 'call', position: 1, strike: 5, expiry: 30 },
      { type: 'put', position: -1, strike: -5, expiry: 30 },
    ],
  },
  {
    name: 'Short Risk Reversal',
    legs: [
      { type: 'call', position: -1, strike: 5, expiry: 30 },
      { type: 'put', position: 1, strike: -5, expiry: 30 },
    ],
  },

  // === Synthetics ===
  {
    name: 'Synthetic Long Stock',
    legs: [
      { type: 'call', position: 1, strike: 0, expiry: 30 },
      { type: 'put', position: -1, strike: 0, expiry: 30 },
    ],
  },
  {
    name: 'Synthetic Short Stock',
    legs: [
      { type: 'call', position: -1, strike: 0, expiry: 30 },
      { type: 'put', position: 1, strike: 0, expiry: 30 },
    ],
  },
]
