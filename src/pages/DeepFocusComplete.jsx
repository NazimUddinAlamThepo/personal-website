import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowLeft } from 'lucide-react'

const COMPLETED_KEY = 'deep-focus-completed-session'

function readSession() {
  if (typeof window === 'undefined') return null

  try {
    const raw = localStorage.getItem(COMPLETED_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export default function DeepFocusCompletePage() {
  const session = readSession()

  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-4 py-10 flex items-center justify-center">
      <section className="w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-500/10 text-forest-700 dark:text-forest-300">
          <CheckCircle2 size={26} />
        </div>
        <h1 className="mt-5 text-3xl sm:text-4xl font-serif font-semibold text-[var(--color-text)]">
          Session complete
        </h1>
        <p className="mt-3 text-[var(--color-muted)]">
          {session?.completedBy === 'timer'
            ? 'Your focus block reached zero and was completed automatically.'
            : 'You ended the session manually.'}
        </p>

        {session ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 text-left">
            <div className="rounded-2xl border border-white/70 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-2">Goals</div>
              <ul className="space-y-2 text-sm text-[var(--color-text)]">
                {(session.session?.goals || []).map(goal => <li key={goal}>• {goal}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/70 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-2">Duration</div>
              <div className="text-sm text-[var(--color-text)]">{session.session?.duration} minutes</div>
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/deep-focus"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
          >
            <ArrowLeft size={16} /> New Session
          </Link>
        </div>
      </section>
    </main>
  )
}