import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { contactForm, profile } from '../data/content'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const field =
  'w-full rounded-lg border border-line bg-bg/60 px-3 py-2 text-sm text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-accent'

// Quick-contact pop-up: who they are, what they need and, if they like, a budget.
// Rendered in a portal so it always sits above the sticky header.
export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>('idle')
  const firstField = useRef<HTMLInputElement>(null)

  const close = useCallback(() => {
    setStatus('idle')
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstField.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  if (!open) return null

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('_gotcha')) return // hidden spam trap: real visitors never fill it in

    if (contactForm.endpoint) {
      setStatus('sending')
      try {
        const res = await fetch(contactForm.endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        })
        if (!res.ok) throw new Error('Request failed')
        form.reset()
        setStatus('sent')
      } catch {
        setStatus('error')
      }
      return
    }

    // No form service set up yet: open the visitor's email app with the message ready to send.
    const body = [
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      data.get('budget') ? `Budget: ${data.get('budget')}` : '',
      '',
      String(data.get('message')),
    ]
      .filter((line, i) => line !== '' || i === 4)
      .join('\n')
    const subject = `Portfolio enquiry from ${data.get('name')}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('sent')
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-thread/30 bg-gradient-to-br from-thread-deep/50 via-surface to-surface p-5 shadow-2xl shadow-black/40"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-thread/20 blur-3xl"
        />
        <div className="relative">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2 id="contact-title" className="text-lg font-semibold">
                💬 Contact now
              </h2>
              <p className="mt-0.5 text-sm text-muted">Tell me who you are and what you need. I reply within one working day.</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="rounded-md border border-line px-2 py-1 text-sm text-muted transition-colors hover:text-ink"
            >
              ✕
            </button>
          </div>

          {status === 'sent' ? (
            <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm leading-relaxed">
              <p className="font-medium">✅ {contactForm.endpoint ? 'Thanks, your message is sent.' : 'Almost done.'}</p>
              <p className="mt-1 text-muted">
                {contactForm.endpoint
                  ? 'I will get back to you within one working day.'
                  : 'Your email app should open with your message ready. Just press send.'}
              </p>
              <button type="button" onClick={close} className="btn-primary mt-3 px-4 py-2 text-sm">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3">
              <label className="block text-sm">
                <span className="mb-1 block text-muted">Your name</span>
                <input ref={firstField} name="name" type="text" required autoComplete="name" className={field} />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-muted">Your email</span>
                <input name="email" type="email" required autoComplete="email" className={field} />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-muted">What do you need?</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="A project, a role, or a quick question"
                  className={`${field} resize-y`}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-muted">
                  Budget or quote <span className="text-muted/70">(optional)</span>
                </span>
                <input name="budget" type="text" placeholder="e.g. $500, or a rough range" className={field} />
              </label>
              {/* hidden spam trap */}
              <input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" className="hidden" />

              {status === 'error' && (
                <p className="text-sm text-red-300">
                  Something went wrong. Please try again, or email me directly at {profile.email}.
                </p>
              )}

              <button type="submit" disabled={status === 'sending'} className="btn-primary w-full px-5 py-2.5 disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : 'Send message →'}
              </button>
            </form>
          )}

          <div className="mt-4 border-t border-line pt-3 text-xs text-muted">
            Prefer to talk directly?{' '}
            <a className="text-accent hover:underline" href={`mailto:${profile.email}`}>
              Email
            </a>
            {' · '}
            <a className="text-accent hover:underline" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            {' · '}
            <a className="text-accent hover:underline" href={profile.upwork} target="_blank" rel="noreferrer">
              Upwork
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
