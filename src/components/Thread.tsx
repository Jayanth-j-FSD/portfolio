import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

interface ThreadNode {
  id: string
  y: number
}

interface Swirl {
  a: string // path of the rope
  height: number
  width: number
}

const WAVELENGTH = 290 // px of page height for one full loop of the rope
const STEP = 3 // px between points when drawing the strand

// Horizontal offset of the rope at page height y. Between two stops the rope winds around the
// straight thread, with loops that grow and then shrink to nothing, so it is tied at every
// stop (section dot), like a rope wound around a tree between two knots.
function strandX(y: number, stops: number[], amplitude: number) {
  for (let i = 0; i < stops.length - 1; i++) {
    const y0 = stops[i]
    const y1 = stops[i + 1]
    if (y <= y1 || i === stops.length - 2) {
      const length = Math.max(y1 - y0, 1)
      const t = Math.min(Math.max((y - y0) / length, 0), 1)
      const loops = Math.max(1, Math.round(length / WAVELENGTH))
      return amplitude * Math.sin(Math.PI * t) * Math.sin(2 * Math.PI * loops * t)
    }
  }
  return 0
}

function buildPath(stops: number[], height: number, amplitude: number) {
  let d = ''
  for (let y = 0; y <= height; y += STEP) {
    d += `${y === 0 ? 'M' : 'L'}${strandX(y, stops, amplitude).toFixed(1)} ${y} `
  }
  return d
}

// Decorative vertical "thread" running through the page, with a rope that winds around it.
// One dot rides the rope as you scroll, sending out small ripples, and settles in the centre
// of each section node. The node of the section you are in pulses. Everything inside is
// aria-hidden and ignores the pointer.
export function Thread({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const clipRef = useRef<SVGRectElement>(null)
  const nodesRef = useRef<ThreadNode[]>([])
  const stopsRef = useRef<number[]>([0])
  const amplitudeRef = useRef(10)
  const [nodes, setNodes] = useState<ThreadNode[]>([])
  const [swirl, setSwirl] = useState<Swirl | null>(null)
  const [active, setActive] = useState('')

  // Move the dot to ~40% down the viewport (along the rope) and light the thread up to it.
  const update = useCallback(() => {
    const wrap = wrapRef.current
    const dot = dotRef.current
    const fill = fillRef.current
    if (!wrap || !dot || !fill) return

    // The dot follows a point about 40% down the screen. Over the last screenful of scrolling that
    // point slides down to where the thread ends, so the dot reaches the end exactly at page bottom.
    const vh = window.innerHeight
    const rect = wrap.getBoundingClientRect()
    const pageHeight = document.documentElement.scrollHeight
    const remaining = Math.max(pageHeight - vh - window.scrollY, 0)
    const belowThread = Math.max(pageHeight - (rect.bottom + window.scrollY), 0) // the footer
    const endFraction = Math.max((vh - belowThread) / vh, 0.4)
    const nearEnd = Math.min(Math.max(1 - remaining / vh, 0), 1)
    const fraction = 0.4 + (endFraction - 0.4) * nearEnd

    const y = Math.min(Math.max(vh * fraction - rect.top, 0), wrap.offsetHeight)
    const x = strandX(y, stopsRef.current, amplitudeRef.current)
    dot.style.transform = `translate(${x}px, ${y}px)`
    fill.style.height = `${y}px`
    clipRef.current?.setAttribute('height', String(y))

    let current = ''
    for (const n of nodesRef.current) if (n.y <= y + 8) current = n.id
    setActive(current)
  }, [])

  // Find where each section's heading sits so nodes line up with them, and redraw the rope.
  const measure = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const list = Array.from(wrap.querySelectorAll<HTMLElement>('section[id]')).map((s) => {
      const pad = parseFloat(getComputedStyle(s).paddingTop)
      return { id: s.id, y: s.offsetTop + (pad > 0 ? pad + 16 : 110) }
    })
    const height = wrap.offsetHeight
    const amplitude = window.innerWidth < 640 ? 6 : 13
    const stops = [0, ...list.map((n) => n.y), height]

    nodesRef.current = list
    stopsRef.current = stops
    amplitudeRef.current = amplitude
    setNodes(list)
    setSwirl({
      a: buildPath(stops, height, amplitude),
      height,
      width: (amplitude + 4) * 2,
    })
    update()
  }, [update])

  useEffect(() => {
    let frame = 0
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    const first = requestAnimationFrame(measure)
    const resizeObserver = new ResizeObserver(() => requestAnimationFrame(measure))
    if (wrapRef.current) resizeObserver.observe(wrapRef.current)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(first)
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [measure, update])

  return (
    <div ref={wrapRef} className="relative">
      <div
        aria-hidden="true"
        className="thread-rail pointer-events-none absolute inset-y-0 z-0 w-0"
      >
        {/* the straight thread */}
        <div className="absolute inset-y-0 -left-px w-0.5 bg-line" />
        <div
          ref={fillRef}
          className="absolute -left-px top-0 w-0.5 bg-gradient-to-b from-thread-deep/20 to-thread-deep"
          style={{ height: 0 }}
        />

        {/* the rope winding around the thread, shown only where you have already scrolled */}
        {swirl && (
          <svg
            width={swirl.width}
            height={swirl.height}
            viewBox={`${-swirl.width / 2} 0 ${swirl.width} ${swirl.height}`}
            className="absolute left-0 top-0 -translate-x-1/2 overflow-visible"
          >
            <defs>
              <clipPath id="thread-lit-clip">
                <rect ref={clipRef} x={-swirl.width} y="0" width={swirl.width * 2} height="0" />
              </clipPath>
            </defs>
            <g
              clipPath="url(#thread-lit-clip)"
              className="fill-none stroke-accent/40"
              strokeWidth="0.9"
              strokeLinecap="round"
            >
              <path d={swirl.a} />
            </g>
          </svg>
        )}

        {/* section nodes */}
        {nodes.map((n) => {
          const on = n.id === active
          return (
            <span
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: n.y }}
            >
              {on && <span className="absolute inset-0 animate-ping rounded-full bg-thread opacity-75" />}
              <span
                className={`relative block h-2.5 w-2.5 rounded-full border-2 transition-colors duration-500 ${
                  on ? 'border-thread bg-thread' : 'border-line bg-bg'
                }`}
              />
            </span>
          )
        })}

        {/* the dot riding the rope, with small ripples */}
        <div ref={dotRef} className="absolute left-0 top-0 will-change-transform">
          <div className="absolute -translate-x-1/2 -translate-y-1/2">
            {/* soft blue glow behind the dot */}
            <span className="absolute -inset-3 rounded-full bg-thread/15 blur-md" />
            {/* same ping as the green availability badge, in blue */}
            <span className="absolute inset-0 animate-ping rounded-full bg-thread opacity-50" />
            <span className="relative block h-3 w-3 rounded-full bg-thread shadow-[0_0_6px_1px] shadow-thread/35" />
          </div>
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
