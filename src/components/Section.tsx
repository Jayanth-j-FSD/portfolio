import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
}

export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="page-container py-10 sm:py-14">
      <Reveal>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          <span className="text-accent">/</span> {title}
        </h2>
        {subtitle && <p className="mt-1.5 max-w-2xl text-muted">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </Reveal>
    </section>
  )
}
