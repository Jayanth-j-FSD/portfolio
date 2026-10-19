import { aiSection } from '../data/content'
import { Rich } from './Rich'
import { Section } from './Section'

export function AiSection() {
  return (
    <Section id="ai" title="🤖 AI & agentic development">
      <p className="max-w-3xl text-lg leading-relaxed text-muted">
        <Rich text={aiSection.intro} />
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {aiSection.capabilities.map((c) => (
          <div
            key={c.title}
            className="rounded-lg border border-thread/30 bg-gradient-to-br from-thread-deep/30 via-surface to-surface p-4 transition duration-300 hover:-translate-y-1 hover:border-thread/60 hover:shadow-lg hover:shadow-thread/10"
          >
            <div className="mb-1.5 flex items-center gap-2.5">
              <span className="text-xl" aria-hidden="true">{c.icon}</span>
              <h3 className="font-medium">{c.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">Tools I work with</h3>
        <ul className="flex flex-wrap gap-2">
          {aiSection.tools.map((t) => (
            <li key={t} className="rounded-full border border-thread/40 bg-thread/10 px-3.5 py-1.5 text-sm">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-xl border border-violet-400/30 bg-gradient-to-br from-violet-500/10 via-surface to-surface p-4">
        <div className="mb-1.5 flex items-center gap-2.5">
          <span className="text-xl" aria-hidden="true">🧭</span>
          <h3 className="font-medium">{aiSection.forwardDeployed.title}</h3>
        </div>
        <p className="leading-relaxed text-muted">
          <Rich text={aiSection.forwardDeployed.text} />
        </p>
      </div>
    </Section>
  )
}
