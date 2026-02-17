export type OptionType = 'put' | 'call'

export interface OptionLeg {
  type: OptionType
  position: number
  strike: number
  expiry: number
}

export interface Point {
  x: number
  y: number
}

export interface PayoffData {
  points: Point[]
  strikes: number[]
}

export interface SvgConfig {
  width: number
  height: number
  atmPrice: number
  priceRange: [number, number]
  margins: { top: number; right: number; bottom: number; left: number }
  yRange?: [number, number]
}
