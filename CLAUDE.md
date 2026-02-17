# Option Payoff SVG

Static single-page React app that renders option strategy payoff charts as SVGs.

## Stack

- React 19 + TypeScript (strict)
- Vite dev server
- Tailwind CSS v4 + shadcn/ui (base-nova style, neutral base color)
- ESLint with strict type-checked rules

## Commands

- `npm start` - Start dev server (port 5173)
- `npm run build` - Production build
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier

## Project Structure

- `App.tsx` - Main page component (editor + strategy grid)
- `lib/types.ts` - Core TypeScript interfaces (OptionLeg, Point, PayoffData, SvgConfig)
- `lib/pricing.ts` - Black-Scholes option pricing (IV=0.30, r=0.05)
- `lib/payoff.ts` - Payoff calculation engine
- `lib/svg-generator.ts` - SVG chart generation (gradient fills, zero crossings)
- `lib/strategies.ts` - All strategy definitions (53 strategies with canonical names)
- `components/ui/` - shadcn/ui components (Card, Textarea, etc.)

## Key Architecture Decisions

- SVG config is hardcoded (ATM=100, range=[70,130], yRange=[-8,8]) so all strategies are visually comparable against each other
- SVGs generated at render time using useMemo
- Strategy cards pre-compute SVGs once on mount
- SVG colors work in both light and dark modes without modification
- Strategies are deduplicated by payoff shape; stock-dependent strategies are excluded

## Adding a New Strategy

Add an entry to the `strategies` array in `lib/strategies.ts`:

```ts
{ name: 'Strategy Name', legs: [
  { type: 'call', position: 1, strike: 0, expiry: 30 },
] }
```

- `type`: 'call' or 'put'
- `position`: positive = long, negative = short (e.g., -2 = short 2 contracts)
- `strike`: relative to ATM (0 = ATM, 5 = ATM+5, -5 = ATM-5)
- `expiry`: days to expiration (use 30 for near, 60 for far in calendar spreads)

## ESLint

Uses strict type-checked rules (`strictTypeChecked` + `stylisticTypeChecked`). Avoid:
- `any` types
- Unsafe assignments/returns
- `@ts-ignore` comments
- `&&` for conditional rendering (use ternary with null)
- Arrow functions without braces when calling void functions like setState

`@typescript-eslint/no-confusing-void-expression` and `@typescript-eslint/restrict-template-expressions` are disabled.
