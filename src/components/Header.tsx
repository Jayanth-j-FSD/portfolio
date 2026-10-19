import { useState } from 'react'
import { profile } from '../data/content'

const links = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['ai', 'AI'],
  ['services', 'Services'],
  ['projects', 'Projects'],
  ['process', 'Process'],
  ['experience', 'Experience'],
  ['faq', 'FAQ'],
  ['contact', 'Contact'],
] as const

const [firstName, ...rest] = profile.name.split(' ')
const lastName = rest.join(' ')
const initials = profile.name
  .split(' ')
  .map((word) => word[0])
  .join('')
  .slice(0, 2)

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <nav
        aria-label="Primary"
        className="page-container flex items-center justify-between gap-4 py-3"
      >
        <a href="#home" aria-label={`${profile.name}, back to top`} className="group flex shrink-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-gradient-to-b from-surface to-bg text-xs font-bold tracking-wide text-accent transition-colors duration-300 group-hover:border-thread"
          >
            {initials}
          </span>
          <span className="font-semibold tracking-tight">
            {firstName}
            {lastName && (
              <span className="ml-1 font-normal text-muted transition-colors duration-300 group-hover:text-ink">
                {lastName}
              </span>
            )}
          </span>
        </a>
        <ul className="hidden gap-5 text-sm text-muted xl:flex">
          {links.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="relative block py-1 transition-colors hover:text-ink focus-visible:text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="btn-primary px-3.5 py-1.5 text-sm"
          >
            Hire me
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="rounded-md border border-line px-2.5 py-1.5 text-sm xl:hidden"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-line xl:hidden">
          <ul className="page-container py-3 text-sm text-muted">
            {links.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="relative inline-block py-2 transition-colors hover:text-ink focus-visible:text-ink after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-center after:scale-x-0 after:rounded-full after:bg-emerald-400 after:shadow-[0_0_8px_1px] after:shadow-emerald-400/60 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
