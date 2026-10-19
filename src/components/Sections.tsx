import { about, certifications, experience, profile, projects, services, skills } from '../data/content'
import { useCallback, useState } from 'react'
import photo from '../assets/jayanth.jpg'
import { ContactModal } from './ContactModal'
import { Rich } from './Rich'
import { Section } from './Section'

const card =
  'rounded-lg border border-line bg-surface p-4 transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/10'

// One muted tone per specialty card: sky, emerald, amber, violet. Full class names so Tailwind picks them up.
const specialtyTones = [
  { card: 'border-t-sky-400/70 from-sky-400/10 hover:shadow-sky-400/10', chip: 'bg-sky-400/15' },
  { card: 'border-t-emerald-400/70 from-emerald-400/10 hover:shadow-emerald-400/10', chip: 'bg-emerald-400/15' },
  { card: 'border-t-amber-300/70 from-amber-300/10 hover:shadow-amber-300/10', chip: 'bg-amber-300/15' },
  { card: 'border-t-violet-400/70 from-violet-400/10 hover:shadow-violet-400/10', chip: 'bg-violet-400/15' },
]

export function About() {
  return (
    <Section id="about" title="👨‍💻 About me">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <img
            src={photo}
            alt={`Photo of ${profile.name}`}
            width={490}
            height={490}
            className="h-28 w-28 shrink-0 rounded-2xl border border-thread/40 object-cover shadow-lg shadow-thread/20 ring-4 ring-thread/10"
          />
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-muted">
              <Rich text={about.intro} />
            </p>
            <p className="leading-relaxed text-muted">
              <Rich text={about.body} />
            </p>
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {about.stats.map((s) => (
            <li
              key={s.value}
              className="flex items-center gap-3 rounded-lg border border-thread/25 bg-gradient-to-br from-thread-deep/40 via-surface to-surface px-4 py-3 shadow-md shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-thread/50"
            >
              <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-thread/30 bg-thread/15 text-lg"
              >
                {s.icon}
              </span>
              <span className="min-w-0">
                <span className="block text-xl font-semibold leading-tight bg-gradient-to-r from-sky-300 to-violet-300 bg-clip-text text-transparent">
                  {s.value}
                </span>
                <span className="text-sm text-muted">{s.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">What I specialize in</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {about.specialties.map((s, i) => {
            const tone = specialtyTones[i % specialtyTones.length]
            return (
              <div
                key={s.title}
                className={`rounded-lg border border-line border-t-2 bg-gradient-to-br via-surface to-surface p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${tone.card}`}
              >
                <div className="mb-1.5 flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-lg ${tone.chip}`}
                  >
                    {s.icon}
                  </span>
                  <h4 className="font-medium">{s.title}</h4>
                </div>
                <p className="text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* AI highlight */}
      <div className="relative mt-8 overflow-hidden rounded-xl border border-thread/50 bg-gradient-to-br from-thread-deep/50 via-surface to-surface p-5 shadow-lg shadow-thread/10 sm:p-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-thread/25 blur-3xl"
        />
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-thread/50 bg-bg/50 px-3 py-1 text-sm font-medium">
            <span aria-hidden="true">🤖</span> {about.ai.title}
          </p>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted">
            <Rich text={about.ai.text} />
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {about.ai.points.map((p) => (
              <li
                key={p.text}
                className="flex items-center gap-2 rounded-lg border border-line bg-bg/40 px-3 py-2 text-sm"
              >
                <span aria-hidden="true">{p.icon}</span>
                {p.text}
              </li>
            ))}
          </ul>
          <p className="mt-4 flex gap-2 text-sm leading-relaxed text-muted">
            <span aria-hidden="true">🛡️</span>
            <span>
              <Rich text={about.ai.note} />
            </span>
          </p>
          <a href="#ai" className="mt-3 inline-block text-sm text-accent hover:underline">
            See my AI toolkit →
          </a>
        </div>
      </div>

      <p className="mt-8 border-l-2 border-accent/60 pl-4 text-lg leading-relaxed text-muted">
        <Rich text={about.goal} />
      </p>
    </Section>
  )
}

export function Skills() {
  return (
    <Section id="skills" title="🧰 Skills">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(skills).map(([group, items], i, all) => (
          // an odd last card spans both columns so the grid has no gap
          <div key={group} className={`${card} ${all.length % 2 === 1 && i === all.length - 1 ? 'sm:col-span-2' : ''}`}>
            <h3 className="mb-3 font-medium">{group}</h3>
            <ul className="flex flex-wrap gap-2">
              {items.map((s) => (
                <li key={s} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Services() {
  return (
    <Section id="services" title="🛎️ Services" subtitle="What I can build for you.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((s) => (
          <div key={s.title} className={card}>
            <div className="mb-1.5 flex items-center gap-2.5">
              <span className="text-xl" aria-hidden="true">{s.icon}</span>
              <h3 className="font-medium">{s.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted">{s.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Projects() {
  return (
    <Section
      id="projects"
      title="🚀 Project experience"
      subtitle="Products I have worked on: the problem, what it does, my contribution and the outcome."
    >
      <div className="space-y-6">
        {projects.map((p) => (
          <article key={p.title} className={card}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xl font-semibold">
                  {p.title}
                  {p.kind && (
                    <span className="rounded-full border border-line px-2.5 py-0.5 text-xs font-normal text-muted">
                      👥 {p.kind}
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-muted">
                  <Rich text={p.summary} />
                </p>
              </div>
              <div className="flex gap-3 text-sm">
                {p.liveUrl && (
                  <a className="text-accent hover:underline" href={p.liveUrl} target="_blank" rel="noreferrer">
                    🔗 Live demo
                  </a>
                )}
                {p.repoUrl && (
                  <a className="text-accent hover:underline" href={p.repoUrl} target="_blank" rel="noreferrer">
                    🐙 GitHub
                  </a>
                )}
              </div>
            </div>
            <dl className="mt-5 grid gap-4 text-sm leading-relaxed md:grid-cols-3">
              {(
                [
                  ['🧩 Problem', p.problem],
                  ['💡 Solution', p.solution],
                  ['🏆 Result', p.result],
                ] as const
              ).map(([label, text]) => (
                <div key={label}>
                  <dt className="mb-1 text-xs font-medium uppercase tracking-wider text-accent">{label}</dt>
                  <dd className="text-muted">
                    <Rich text={text} />
                  </dd>
                </div>
              ))}
            </dl>
            {p.contributions && p.contributions.length > 0 && (
              <div className="mt-5 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3 text-sm leading-relaxed text-muted">
                <p className="font-medium text-ink">🙋 My contribution</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {p.contributions.map((c) => (
                    <li key={c}>
                      <Rich text={c} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {p.features && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="rounded-md border border-thread/30 bg-thread/10 px-2.5 py-1 text-xs text-ink"
                  >
                    ✨ {f}
                  </li>
                ))}
              </ul>
            )}
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}

export function Experience() {
  return (
    <Section id="experience" title="💼 Experience">
      <div className="space-y-6">
        {experience.map((e) => (
          <div key={`${e.role}-${e.org}`} className="border-l-2 border-accent/40 pl-5">
            <h3 className="font-medium">
              {e.role} <span className="text-muted">· {e.org}</span>
            </h3>
            <p className="text-sm text-muted">📅 {e.period}</p>
            {e.points.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            )}
            {e.awards && e.awards.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {e.awards.map((a) => (
                  <li
                    key={a}
                    className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs text-amber-100"
                  >
                    🏆 {a}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {certifications.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-3 font-medium">🎓 Certifications</h3>
          <ul className="grid gap-3 sm:grid-cols-2 sm:grid-flow-dense">
            {certifications.map((c) => (
              <li
                key={c.title}
                className={`flex items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3 ${
                  c.wide ? 'sm:col-span-2' : ''
                }`}
              >
                <span aria-hidden="true" className="mt-0.5 text-lg">🎓</span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium leading-snug">{c.title}</span>
                  <span className="text-xs text-muted">
                    {c.issuer} · {c.issued}
                  </span>
                  {c.details && (
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {c.details.map((d) => (
                        <span key={d} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                          {d}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  )
}

export function Contact() {
  const [open, setOpen] = useState(false)
  const closeModal = useCallback(() => setOpen(false), [])

  // Full class names per tone so Tailwind picks them up.
  const links = [
    {
      icon: '✉️',
      label: 'Email',
      // shown with a capital first letter; the mailto link keeps the real address
      text: profile.email.charAt(0).toUpperCase() + profile.email.slice(1),
      href: `mailto:${profile.email}`,
      chip: 'bg-sky-400/15 border-sky-400/30',
      hover: 'hover:border-sky-400/60 hover:shadow-sky-400/10',
    },
    {
      icon: '🐙',
      label: 'GitHub',
      text: 'GitHub profile',
      href: profile.github,
      chip: 'bg-violet-400/15 border-violet-400/30',
      hover: 'hover:border-violet-400/60 hover:shadow-violet-400/10',
    },
    {
      icon: '🔗',
      label: 'LinkedIn',
      text: 'LinkedIn profile',
      href: profile.linkedin,
      chip: 'bg-blue-400/15 border-blue-400/30',
      hover: 'hover:border-blue-400/60 hover:shadow-blue-400/10',
    },
    {
      icon: '💚',
      label: 'Upwork',
      text: 'Upwork profile',
      href: profile.upwork,
      chip: 'bg-emerald-400/15 border-emerald-400/30',
      hover: 'hover:border-emerald-400/60 hover:shadow-emerald-400/10',
    },
  ]

  return (
    <Section id="contact" title="📬 Let's work together">
      <div className="relative overflow-hidden rounded-2xl border border-thread/30 bg-gradient-to-br from-thread-deep/40 via-surface to-surface p-4 shadow-xl shadow-black/20 sm:p-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-thread/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"
        />
        <div className="relative">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-2xl leading-relaxed text-muted">
              Have a project in mind? Send me a short description and I will reply within one working day.
            </p>
            <button type="button" onClick={() => setOpen(true)} className="btn-primary px-5 py-2.5">
              💬 Contact now
            </button>
            <ContactModal open={open} onClose={closeModal} />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className={`group flex items-center gap-3 rounded-xl border border-line bg-bg/50 px-3.5 py-2.5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${l.hover}`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg border text-lg ${l.chip}`}
                  >
                    {l.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium uppercase tracking-wider text-accent">{l.label}</span>
                    <span className="mt-0.5 block break-all">{l.text}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto text-lg text-muted transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
