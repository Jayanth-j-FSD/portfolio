import { availability, profile } from '../data/content'
import { CodeWindow } from './CodeWindow'
import { Rich } from './Rich'

const firstName = profile.name.split(' ')[0]

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* soft glow behind the intro, drifting slowly side to side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 animate-drift rounded-full bg-accent/20 blur-3xl will-change-transform"
      />
      <div className="page-container relative grid items-center gap-12 pb-16 pt-20 sm:pt-28 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            {availability.status}
          </p>
          <h1 className="mt-6 pb-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-5xl xl:text-6xl">
            Hi, I'm{' '}
            <span className="whitespace-nowrap">
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-accent to-violet-400 bg-clip-text text-transparent">
                  {firstName}
                </span>
                {/* how to say the name, under it and ending exactly where the name ends */}
                <span className="absolute right-0 top-full -mt-1.5 flex">
                  <span className="text-sm font-normal italic tracking-wide text-muted/80">
                    “{profile.pronunciation}”
                  </span>
                </span>
              </span>{' '}
              <span aria-hidden="true">🧑‍💻</span>
            </span>
          </h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-medium sm:text-xl">
            <span className="text-accent">{profile.title}</span>
            <span aria-hidden="true" className="text-muted">·</span>
            <span className="text-violet-300">{profile.secondaryTitle}</span>
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted"><Rich text={profile.tagline} /></p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="btn-primary px-5 py-3"
            >
              ✉️ Hire me
            </a>
            <a
              href="#projects"
              className="rounded-md border border-line px-5 py-3 font-medium transition hover:-translate-y-0.5 hover:border-accent"
            >
              💼 View projects
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <li>⚡ {availability.responseTime}</li>
            <li>🌍 {availability.timezone}</li>
          </ul>
        </div>
        <CodeWindow />
      </div>
    </section>
  )
}
