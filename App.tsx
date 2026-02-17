import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { calculatePayoff } from './lib/payoff'
import { strategies } from './lib/strategies'
import { generateSvg } from './lib/svg-generator'
import type { OptionLeg, SvgConfig } from './lib/types'

const DEFAULT_CONFIG: SvgConfig = {
  width: 1600,
  height: 900,
  atmPrice: 100,
  priceRange: [80, 120],
  margins: { top: 50, right: 50, bottom: 50, left: 50 },
  yRange: [-8, 8],
}

function generateStrategySvg(legs: OptionLeg[]): string {
  const data = calculatePayoff(legs, DEFAULT_CONFIG)
  return generateSvg(data, DEFAULT_CONFIG)
}

export function App() {
  const [jsonInput, setJsonInput] = useState(() =>
    JSON.stringify(strategies[0].legs)
  )
  const [debouncedInput, setDebouncedInput] = useState(jsonInput)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => { setDebouncedInput(jsonInput) }, 300)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [jsonInput])

  const { svgString, error } = useMemo(() => {
    try {
      const parsed: unknown = JSON.parse(debouncedInput)
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return { svgString: '', error: 'Input must be a non-empty array of legs' }
      }
      return { svgString: generateStrategySvg(parsed as OptionLeg[]), error: null }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error'
      return { svgString: '', error: message }
    }
  }, [debouncedInput])

  const strategySvgs = useMemo(
    () => strategies.map((s) => ({ ...s, svg: generateStrategySvg(s.legs) })),
    [],
  )

  const handleStrategyClick = useCallback((legs: OptionLeg[]) => {
    const json = JSON.stringify(legs)
    setJsonInput(json)
    setDebouncedInput(json)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Option Strategy Payoff Chart</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={jsonInput}
            onChange={(e) => { setJsonInput(e.target.value) }}
            spellCheck={false}
            className="font-mono text-sm"
            rows={3}
          />
          {error ? <p className="text-destructive text-sm">{error}</p> : null}
          {svgString ? (
            <>
              <div
                className="overflow-hidden rounded-md border"
                dangerouslySetInnerHTML={{ __html: svgString }}
              />
              <div className="grid grid-cols-[3fr_2fr_1fr] gap-3">
                {['3/3', '2/3', '1/3'].map((label) => (
                  <div key={label} className="overflow-hidden rounded-md border">
                    <div dangerouslySetInnerHTML={{ __html: svgString }} />
                  </div>
                ))}
              </div>
              <Textarea
                readOnly
                value={svgString}
                className="font-mono text-xs"
                rows={3}
                onFocus={(e) => { e.target.select() }}
              />
            </>
          ) : null}
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {strategySvgs.map((s) => (
          <Card
            key={s.name}
            className="cursor-pointer transition-shadow hover:ring-2 hover:ring-ring hover:shadow-md"
            onClick={() => { handleStrategyClick(s.legs) }}
          >
            <CardHeader>
              <CardTitle className="text-sm">{s.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="overflow-hidden rounded-md"
                dangerouslySetInnerHTML={{ __html: s.svg }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
