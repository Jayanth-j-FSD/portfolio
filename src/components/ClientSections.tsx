import { availability, engagements, faq, process, processLoop, testimonials, whyHire } from '../data/content'
import { Section } from './Section'

const card =
  'rounded-lg border border-line bg-surface p-4 transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/10'

export function WhyHire() {
  return (
    <Section id="why" title="Why work with me" subtitle="What you can expect when you hire me for your project.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {whyHire.map((w) => (
          <div key={w.title} className={card}>
            <div className="mb-1.5 flex items-center gap-2.5">
              <span className="text-xl" aria-hidden="true">{w.icon}</span>
              <h3 className="font-medium">{w.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted">{w.text}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

// Column widths for the desktop flowchart: Discovery is small, Support is featured.
const flowCols = 'lg:grid-cols-[0.75fr_1fr_1fr_1fr_1fr_1.25fr]'

export function Process() {
  return (
    <Section
      id="process"
      title="How I work"
      subtitle="From first message to long-term support: a clear flow, with a feedback loop to fix issues before launch."
    >
      <ol className={`flex flex-col gap-6 lg:grid ${flowCols} lg:gap-x-6`}>
        {process.map((s, i) => {
          const small = s.size === 'small'
          const highlight = s.size === 'highlight'
          const last = i === process.length - 1
          const look = highlight
            ? 'overflow-hidden border-thread/60 bg-gradient-to-br from-thread-deep/60 via-surface to-surface p-4 shadow-lg shadow-thread/20'
            : small
              ? 'border-line bg-surface/70 p-3'
              : 'border-line bg-surface p-4 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/10'

          return (
            <li key={s.title} className={`relative ${small ? 'lg:self-center' : ''}`}>
              <div className={`relative h-full rounded-lg border transition duration-300 hover:-translate-y-1 ${look}`}>
                {highlight && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-thread/30 blur-2xl"
                  />
                )}
                <div className="relative">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className={small ? 'text-lg' : 'text-xl'} aria-hidden="true">{s.icon}</span>
                    <h3 className={`font-medium ${small ? 'text-sm' : ''} ${highlight ? 'font-semibold' : ''}`}>
                      {s.title}
                    </h3>
                  </div>
                  <p className={`leading-relaxed text-muted ${small ? 'text-xs' : 'text-sm'}`}>{s.text}</p>
                  {s.chips && (
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {s.chips.map((c) => (
                        <li
                          key={c}
                          className="rounded-md border border-thread/40 bg-thread/15 px-2.5 py-1 text-xs text-ink"
                        >
                          ✨ {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* step number: small badge on the card's top-left corner */}
              <span
                aria-hidden="true"
                className="absolute -left-2 -top-2 z-10 grid h-[18px] w-[18px] place-items-center rounded-full border border-thread/60 bg-bg text-[10px] font-semibold leading-none text-accent"
              >
                {i + 1}
              </span>

              {/* arrow to the next step: down on phones, right on desktop */}
              {!last && (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-full flex h-6 w-6 -translate-x-1/2 items-center justify-center text-lg text-thread lg:left-full lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0"
                >
                  <span className="lg:hidden">↓</span>
                  <span className="hidden lg:inline">→</span>
                </span>
              )}
            </li>
          )
        })}
      </ol>

      {/* feedback loop under Build and Test & launch (desktop) */}
      <div className={`hidden lg:grid ${flowCols} mb-4 gap-x-6`}>
        <div className="relative col-span-2 col-start-4 mx-[calc(25%-6px)] h-9 rounded-b-2xl border-x-2 border-b-2 border-dashed border-thread/70">
          <span aria-hidden="true" className="absolute -left-[7px] -top-2 text-xs leading-none text-thread">▲</span>
          <span aria-hidden="true" className="absolute -right-[5px] -top-1 h-2 w-2 rounded-full bg-thread" />
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-thread/40 bg-bg px-3 py-0.5 text-xs text-muted">
            ↺ {processLoop}
          </span>
        </div>
      </div>
      <p className="mt-6 text-center text-sm text-muted lg:hidden">↺ {processLoop}</p>
    </Section>
  )
}

export function Engagement() {
  return (
    <Section id="hire" title="Ways to work together" subtitle="Pick the model that fits your project and budget.">
      <div className="grid gap-3 sm:grid-cols-3">
        {engagements.map((e) => (
          <div key={e.title} className={card}>
            <div className="mb-1.5 flex items-center gap-2.5">
              <span className="text-xl" aria-hidden="true">{e.icon}</span>
              <h3 className="font-medium">{e.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted">{e.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-accent/40 bg-accent/10 p-4">
        <div>
          <p className="font-medium">🟢 {availability.status}</p>
          <p className="text-sm text-muted">{availability.responseTime}</p>
        </div>
        <a
          href="#contact"
          className="btn-primary px-5 py-2.5"
        >
          Start a project →
        </a>
      </div>
    </Section>
  )
}

// Renders nothing until real testimonials are added in content.ts.
export function Testimonials() {
  if (testimonials.length === 0) return null
  return (
    <Section id="testimonials" title="What clients say">
      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.name} className={card}>
            <blockquote className="leading-relaxed">“{t.quote}”</blockquote>
            <figcaption className="mt-3 text-sm text-muted">
              ⭐ {t.name}, {t.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}

export function Faq() {
  return (
    <Section id="faq" title="FAQ" subtitle="Quick answers to what clients usually ask first.">
      <div className="space-y-3">
        {faq.map((f) => (
          <details key={f.q} className="group rounded-lg border border-line bg-surface p-4 open:border-accent/60">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium">
              {f.q}
              <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
