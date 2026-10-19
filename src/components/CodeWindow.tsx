import { useEffect, useState } from 'react'
import { availability, heroStack, profile } from '../data/content'

// [text, colour class]. Colours reuse the site palette so the window blends in.
type Token = readonly [string, string]

const kw = 'text-violet-400'
const prop = 'text-accent'
const str = 'text-emerald-300'
const bool = 'text-amber-300'
const dim = 'text-muted'

const firstName = profile.name.split(' ')[0]

const lines: Token[][] = [
  [['const ', kw], ['developer ', 'text-ink'], ['= {', dim]],
  [['  name', prop], [': ', dim], [`'${firstName}'`, str], [',', dim]],
  [['  role', prop], [': ', dim], [`'${profile.title}'`, str], [',', dim]],
  [['  stack', prop], [': [', dim]],
  ...heroStack.map((s): Token[] => [[`    '${s}'`, str], [',', dim]]),
  [['  ],', dim]],
  [['  available', prop], [': ', dim], ['true', bool], [',', dim]],
  [['  ai', prop], [': ', dim], ["'agentic coding'", str], [',', dim]],
  [['  replies', prop], [': ', dim], [`'${availability.responseTime.replace('Replies ', '')}'`, str], [',', dim]],
  [['}', dim]],
  [],
  [['// ready when you are 🚀', `${dim} italic`]],
  [['developer', 'text-ink'], ['.', dim], ['hire', 'text-sky-300'], ['()', dim]],
]

const lineLength = (line: Token[]) => line.reduce((n, [text]) => n + text.length, 0)
const total = lines.reduce((n, l) => n + lineLength(l) + 1, 0)
// Character offset at which each line starts typing (each line costs its length + 1 for the newline).
const starts = lines.map((_, i) => lines.slice(0, i).reduce((n, l) => n + lineLength(l) + 1, 0))

const TYPE_MS = 38
const HOLD_MS = 4500

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Mock editor window that types a short "developer" object, holds, then loops.
export function CodeWindow() {
  const [reduced] = useState(prefersReducedMotion)
  const [count, setCount] = useState(reduced ? total : 0)

  useEffect(() => {
    if (reduced) return
    const done = count >= total
    const timer = setTimeout(() => setCount(done ? 0 : count + 1), done ? HOLD_MS : TYPE_MS)
    return () => clearTimeout(timer)
  }, [count, reduced])

  const cursorLine = starts.findLastIndex((s) => s <= count)

  const rows = lines.map((line, i) => {
    const shown = Math.max(0, Math.min(count - starts[i], lineLength(line)))

    let left = shown
    const spans = line.map(([text, color], j) => {
      const part = text.slice(0, Math.max(0, left))
      left -= text.length
      return part ? (
        <span key={j} className={color}>
          {part}
        </span>
      ) : null
    })
    return { spans, key: i }
  })

  return (
    <div
      role="img"
      aria-label={`Animated code window: a developer object describing ${firstName}, a ${profile.title}`}
      className="w-full overflow-hidden rounded-xl border border-line bg-surface/90 shadow-2xl shadow-thread/20 backdrop-blur"
    >
      <div className="flex items-center gap-2 border-b border-line bg-bg/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-300/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-3 rounded-md bg-surface px-3 py-0.5 text-xs text-muted">developer.ts</span>
      </div>
      <pre aria-hidden="true" className="overflow-hidden p-5 font-mono text-[13px] leading-6 sm:text-sm">
        {rows.map((row, i) => (
          <div key={row.key} className="min-h-6 whitespace-pre-wrap break-words">
            {row.spans}
            {i === cursorLine && (
              <span className="ml-px inline-block h-4 w-[7px] translate-y-0.5 animate-pulse bg-thread" />
            )}
          </div>
        ))}
      </pre>
    </div>
  )
}
