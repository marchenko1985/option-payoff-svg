import type { OptionLeg } from './types'

export interface Strategy {
  name: string
  legs: OptionLeg[]
}

export const strategies: Strategy[] = [
  // === Basic ===
  { name: 'Long Call', legs: [{ type: 'call', position: 1, strike: 0, expiry: 30 }] },
  { name: 'Long Put', legs: [{ type: 'put', position: 1, strike: 0, expiry: 30 }] },
  { name: 'Naked Call', legs: [{ type: 'call', position: -1, strike: 0, expiry: 30 }] },
  { name: 'Naked Put', legs: [{ type: 'put', position: -1, strike: 0, expiry: 30 }] },

  // === Vertical Spreads ===
  {
    name: 'Bull Call Spread',
    legs: [
      { type: 'call', position: 1, strike: -5, expiry: 30 },
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
      { type: 'call', position: -1, strike: 0, expiry: 30 },
      { type: 'call', position: 1, strike: 5, expiry: 30 },
    ],
  },
  {
    name: 'Bear Put Spread',
    legs: [
      { type: 'put', position: 1, strike: 0, expiry: 30 },
      { type: 'put', position: -1, strike: -5, expiry: 30 },
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
      { type: 'call', position: -1, strike: 5, expiry: 30 },
      { type: 'call', position: 1, strike: 0, expiry: 30 },
      { type: 'put', position: 1, strike: 0, expiry: 30 },
      { type: 'put', position: -1, strike: -5, expiry: 30 },
    ],
  },
  {
    name: 'Short Iron Butterfly',
    legs: [
      { type: 'call', position: 1, strike: 5, expiry: 30 },
      { type: 'call', position: -1, strike: 0, expiry: 30 },
      { type: 'put', position: -1, strike: 0, expiry: 30 },
      { type: 'put', position: 1, strike: -5, expiry: 30 },
    ],
  },

  // === Condors ===
  {
    name: 'Long Call Condor',
    legs: [
      { type: 'call', position: 1, strike: -5, expiry: 30 },
      { type: 'call', position: -1, strike: 0, expiry: 30 },
      { type: 'call', position: -1, strike: 5, expiry: 30 },
      { type: 'call', position: 1, strike: 10, expiry: 30 },
    ],
  },
  {
    name: 'Long Put Condor',
    legs: [
      { type: 'put', position: 1, strike: -5, expiry: 30 },
      { type: 'put', position: -1, strike: 0, expiry: 30 },
      { type: 'put', position: -1, strike: 5, expiry: 30 },
      { type: 'put', position: 1, strike: 10, expiry: 30 },
    ],
  },
  {
    name: 'Long Iron Condor',
    legs: [
      { type: 'put', position: 1, strike: -15, expiry: 30 },
      { type: 'put', position: -1, strike: -5, expiry: 30 },
      { type: 'call', position: -1, strike: 5, expiry: 30 },
      { type: 'call', position: 1, strike: 15, expiry: 30 },
    ],
  },
  {
    name: 'Short Condor',
    legs: [
      { type: 'call', position: 1, strike: 10, expiry: 30 },
      { type: 'call', position: -1, strike: 5, expiry: 30 },
      { type: 'put', position: -1, strike: -5, expiry: 30 },
      { type: 'put', position: 1, strike: -10, expiry: 30 },
    ],
  },

  // === Calendar Spreads ===
  {
    name: 'Long Call Calendar',
    legs: [
      { type: 'call', position: -1, strike: 0, expiry: 30 },
      { type: 'call', position: 1, strike: 0, expiry: 60 },
    ],
  },
  {
    name: 'Long Put Calendar',
    legs: [
      { type: 'put', position: -1, strike: 0, expiry: 30 },
      { type: 'put', position: 1, strike: 0, expiry: 60 },
    ],
  },
  {
    name: 'Short Call Calendar',
    legs: [
      { type: 'call', position: 1, strike: 0, expiry: 30 },
      { type: 'call', position: -1, strike: 0, expiry: 60 },
    ],
  },
  {
    name: 'Short Put Calendar',
    legs: [
      { type: 'put', position: 1, strike: 0, expiry: 30 },
      { type: 'put', position: -1, strike: 0, expiry: 60 },
    ],
  },

  // === Ratio Spreads ===
  {
    name: 'Long Ratio Call Spread',
    legs: [
      { type: 'call', position: -1, strike: 0, expiry: 30 },
      { type: 'call', position: 2, strike: 5, expiry: 30 },
    ],
  },
  {
    name: 'Long Ratio Put Spread',
    legs: [
      { type: 'put', position: -1, strike: 0, expiry: 30 },
      { type: 'put', position: 2, strike: -5, expiry: 30 },
    ],
  },
  {
    name: 'Short Ratio Call Spread',
    legs: [
      { type: 'call', position: 1, strike: 0, expiry: 30 },
      { type: 'call', position: -2, strike: 5, expiry: 30 },
    ],
  },
  {
    name: 'Short Ratio Put Spread',
    legs: [
      { type: 'put', position: 1, strike: 0, expiry: 30 },
      { type: 'put', position: -2, strike: -5, expiry: 30 },
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
