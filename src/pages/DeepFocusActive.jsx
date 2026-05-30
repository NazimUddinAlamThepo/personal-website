import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock3, Pause, Play, Square, ListTodo, AlertTriangle } from 'lucide-react'

const SETUP_KEY = 'deep-focus-session'
const ACTIVE_KEY = 'deep-focus-active-session'
const COMPLETED_KEY = 'deep-focus-completed-session'

function readJson(key) {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeJson(key, value) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

function createRuntimeSession(setupSession) {
  const totalSeconds = Math.max(1, Number(setupSession?.duration || 0)) * 60
  const timestamp = new Date().toISOString()

  return {
    session: {
      id: setupSession.id,
      goals: Array.isArray(setupSession.goals) ? setupSession.goals : [],
      notToDo: Array.isArray(setupSession.notToDo) ? setupSession.notToDo : [],
      duration: Number(setupSession.duration) || 0,
      createdAt: setupSession.createdAt || timestamp,
    },
    status: 'running',
    remainingSeconds: totalSeconds,
    totalSeconds,
    startedAt: timestamp,
    updatedAt: timestamp,
    endsAt: Date.now() + totalSeconds * 1000,
  }
}

function formatTime(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(safe / 3600)
  const minutes = Math.floor((safe % 3600) / 60)
  const seconds = safe % 60

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function getProgressPercent(totalSeconds, remainingSeconds) {
  if (!totalSeconds) return 0
  return Math.min(100, Math.max(0, ((totalSeconds - remainingSeconds) / totalSeconds) * 100))
}

function getRingStyle(progressPercent) {
  const filled = Math.max(8, progressPercent)
  return {
    background: `conic-gradient(from 180deg, #1a3a6b 0%, #3d6fbf 35%, #0d6b3a ${filled}%, rgba(255,255,255,0.08) ${filled}% 100%)`,
  }
}

function AmbientOrb({ className, duration = 10, delay = 0 }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      animate={{ y: [0, -22, 0], x: [0, 12, 0], scale: [1, 1.06, 1] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="space-y-3 text-center xl:text-left">
      <span className="tag inline-flex items-center gap-2 shadow-sm">
        <Clock3 size={14} /> {eyebrow}
      </span>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight text-[var(--color-text)]">
        {title}
      </h1>
      <p className="mx-auto xl:mx-0 max-w-2xl text-[var(--color-muted)] text-base sm:text-lg leading-relaxed">
        {description}
      </p>
    </div>
  )
}

function SessionList({ title, icon: Icon, items, toneClass, dotClass }) {
  return (
    <section className="rounded-[1.75rem] border border-white/70 dark:border-white/10 bg-white/75 dark:bg-white/5 p-5 sm:p-6 shadow-[0_18px_60px_rgba(26,58,107,0.08)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
          <span className={`flex h-9 w-9 items-center justify-center rounded-2xl ${toneClass}`}>
            <Icon size={16} />
          </span>
          <span>{title}</span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
          {items.length} items
        </span>
      </div>

      <ul className="space-y-3">
        {items.length > 0 ? (
          items.map(item => (
            <li
              key={item}
              className="group flex items-start gap-3 rounded-2xl border border-transparent bg-white/50 dark:bg-white/5 px-4 py-3 text-sm text-[var(--color-muted)] transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-200/70 dark:hover:border-white/10 hover:shadow-sm"
            >
              <span className={`mt-1 h-2.5 w-2.5 rounded-full ${dotClass}`} />
              <span className="break-words leading-relaxed text-[var(--color-text)]/90 group-hover:text-[var(--color-text)]">
                {item}
              </span>
            </li>
          ))
        ) : (
          <li className="rounded-2xl border border-dashed border-navy-200/70 dark:border-white/10 px-4 py-6 text-sm text-[var(--color-muted)]">
            None added.
          </li>
        )}
      </ul>
    </section>
  )
}

function EndConfirmationModal({ open, onCancel, onConfirm }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/70 dark:border-white/10 bg-[var(--color-surface)] p-6 shadow-2xl">
        <div className="flex items-center gap-3 text-[var(--color-text)] mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-600">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">End session?</h2>
            <p className="text-sm text-[var(--color-muted)]">This will stop the timer and mark the session as completed.</p>
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-navy-200 dark:border-white/10 px-5 py-2.5 text-sm font-semibold text-[var(--color-text)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            End Session
          </button>
        </div>
      </div>
    </div>
  )
}

export default function DeepFocusActivePage() {
  const navigate = useNavigate()
  const intervalRef = useRef(null)
  const [sessionState, setSessionState] = useState(null)
  const [sessionMissing, setSessionMissing] = useState(false)
  const [showEndModal, setShowEndModal] = useState(false)

  useEffect(() => {
    const savedActive = readJson(ACTIVE_KEY)
    if (savedActive?.session?.id) {
      setSessionState(savedActive)
      return
    }

    const savedSetup = readJson(SETUP_KEY)
    if (savedSetup?.id && Array.isArray(savedSetup.goals) && savedSetup.goals.length > 0 && Number(savedSetup.duration) > 0) {
      const runtimeSession = createRuntimeSession(savedSetup)
      writeJson(ACTIVE_KEY, runtimeSession)
      setSessionState(runtimeSession)
      return
    }

    setSessionMissing(true)
  }, [])

  const totalSeconds = sessionState?.totalSeconds || Math.max(1, Number(sessionState?.session?.duration || 0)) * 60
  const remainingSeconds = sessionState?.remainingSeconds ?? totalSeconds
  const progressPercent = useMemo(() => getProgressPercent(totalSeconds, remainingSeconds), [totalSeconds, remainingSeconds])
  const formattedTime = useMemo(() => formatTime(remainingSeconds), [remainingSeconds])

  useEffect(() => {
    if (!sessionState || sessionState.status !== 'running') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return undefined
    }

    const syncTimer = () => {
      const nextRemaining = Math.max(0, Math.ceil((sessionState.endsAt - Date.now()) / 1000))

      if (nextRemaining <= 0) {
        const completedSession = {
          ...sessionState,
          status: 'completed',
          remainingSeconds: 0,
          updatedAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
          completedBy: 'timer',
        }
        localStorage.removeItem(ACTIVE_KEY)
        writeJson(COMPLETED_KEY, completedSession)
        navigate('/deep-focus', { replace: true })
        return
      }

      setSessionState(current => {
        if (!current || current.status !== 'running') return current
        const updatedSession = {
          ...current,
          remainingSeconds: nextRemaining,
          updatedAt: new Date().toISOString(),
        }
        writeJson(ACTIVE_KEY, updatedSession)
        return updatedSession
      })
    }

    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(syncTimer, 1000)
    syncTimer()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [navigate, sessionState])

  const pauseSession = () => {
    if (!sessionState || sessionState.status !== 'running') return

    const pausedSession = {
      ...sessionState,
      status: 'paused',
      remainingSeconds,
      updatedAt: new Date().toISOString(),
    }
    writeJson(ACTIVE_KEY, pausedSession)
    setSessionState(pausedSession)
  }

  const resumeSession = () => {
    if (!sessionState || sessionState.status !== 'paused') return

    const resumedSession = {
      ...sessionState,
      status: 'running',
      endsAt: Date.now() + remainingSeconds * 1000,
      updatedAt: new Date().toISOString(),
    }
    writeJson(ACTIVE_KEY, resumedSession)
    setSessionState(resumedSession)
  }

  const finalizeSession = completedBy => {
    if (!sessionState) return

    const completedSession = {
      ...sessionState,
      status: 'completed',
      remainingSeconds: completedBy === 'timer' ? 0 : remainingSeconds,
      updatedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      completedBy,
    }
    localStorage.removeItem(ACTIVE_KEY)
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(completedSession))
    navigate('/deep-focus', { replace: true })
  }

  if (sessionMissing) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] px-4 py-20">
        <AmbientOrb className="left-[-6rem] top-[-4rem] h-72 w-72 bg-navy-500/20" duration={12} />
        <AmbientOrb className="right-[-5rem] top-1/3 h-80 w-80 bg-forest-500/15" duration={14} delay={0.8} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(26,58,107,0.08),transparent_36%),radial-gradient(circle_at_bottom,rgba(13,107,58,0.05),transparent_28%)]" />
        <div className="relative mx-auto flex min-h-[calc(100vh-10rem)] max-w-2xl items-center justify-center">
          <div className="glass-card w-full rounded-[2rem] p-6 sm:p-8 text-center shadow-[0_24px_80px_rgba(26,58,107,0.12)]">
            <h1 className="text-3xl font-serif font-semibold text-[var(--color-text)]">No active session found</h1>
            <p className="mt-3 text-[var(--color-muted)]">Create a session first, then start it from the setup page.</p>
            <button
              type="button"
              onClick={() => navigate('/deep-focus')}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lg hover:shadow-navy-500/20"
            >
              Back to Setup
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (!sessionState) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] px-4 py-20">
        <AmbientOrb className="left-1/4 top-[-5rem] h-80 w-80 bg-navy-500/15" duration={13} />
        <AmbientOrb className="right-1/4 bottom-[-5rem] h-96 w-96 bg-forest-500/10" duration={15} delay={0.8} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(26,58,107,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(13,107,58,0.06),transparent_32%)]" />
        <div className="relative mx-auto flex min-h-[calc(100vh-10rem)] max-w-2xl items-center justify-center">
          <div className="glass-card w-full rounded-[2rem] p-6 sm:p-8 text-center text-[var(--color-muted)] shadow-[0_24px_80px_rgba(26,58,107,0.1)]">
            Loading session...
          </div>
        </div>
      </main>
    )
  }

  const isPaused = sessionState.status === 'paused'

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] px-4 py-8 sm:py-10">
      <AmbientOrb className="left-[-8rem] top-[-5rem] h-[28rem] w-[28rem] bg-navy-500/15" duration={14} />
      <AmbientOrb className="right-[-7rem] top-28 h-[24rem] w-[24rem] bg-forest-500/12" duration={16} delay={1.2} />
      <AmbientOrb className="left-1/3 bottom-[-8rem] h-[26rem] w-[26rem] bg-amber-400/10" duration={18} delay={0.6} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(26,58,107,0.09),transparent_28%),radial-gradient(circle_at_bottom,rgba(13,107,58,0.05),transparent_22%)] dot-grid opacity-[0.25] dark:opacity-[0.14]" />

      <EndConfirmationModal
        open={showEndModal}
        onCancel={() => setShowEndModal(false)}
        onConfirm={() => finalizeSession('manual')}
      />

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid gap-7 xl:grid-cols-[1.05fr_0.95fr] items-center"
        >
          <div className="text-center xl:text-left">
            <SectionHeader
              eyebrow="Active Focus Session"
              title="Stay locked in."
              description="Your focus block is live. Keep the layout quiet, the timer visible, and the next action obvious."
            />

            <div className="mt-6 flex flex-wrap items-center justify-center xl:justify-start gap-3 text-[var(--color-muted)] text-sm">
              <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 backdrop-blur-md ${isPaused ? 'border-amber-500/15 bg-amber-500/10 text-amber-700 dark:text-amber-300' : 'border-forest-500/15 bg-forest-500/10 text-forest-700 dark:text-forest-300'}`}>
                <span className={`h-2 w-2 rounded-full ${isPaused ? 'bg-amber-500' : 'bg-forest-500'} animate-pulse`} />
                {isPaused ? 'Paused' : 'Running'}
              </span>
              <span className="rounded-full border border-white/70 bg-white/55 px-3 py-1 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                {sessionState.session.duration} minute block
              </span>
              <span className="rounded-full border border-white/70 bg-white/55 px-3 py-1 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                {sessionState.session.goals.length} goals
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="relative mx-auto mt-8 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/70 dark:border-white/10 bg-white/72 p-5 sm:p-7 shadow-[0_24px_90px_rgba(26,58,107,0.14)] dark:bg-white/5 dark:shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.65),rgba(255,255,255,0.08))] pointer-events-none dark:bg-[linear-gradient(135deg,rgba(124,163,224,0.08),rgba(255,255,255,0.02))]" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
                  <span>Countdown Timer</span>
                  <span>{Math.round(progressPercent)}% complete</span>
                </div>

                <div className="mt-5 grid place-items-center">
                  <div className="relative grid place-items-center">
                    <motion.div
                      aria-hidden="true"
                      className="absolute h-[18rem] w-[18rem] rounded-full opacity-90 blur-[1px]"
                      style={getRingStyle(progressPercent)}
                      animate={{ scale: [1, 1.01, 1], rotate: [0, 8, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="absolute h-[15rem] w-[15rem] rounded-full border border-white/40 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.65),rgba(255,255,255,0.14)_58%,rgba(255,255,255,0.02)_100%)] shadow-[inset_0_0_40px_rgba(255,255,255,0.2)] dark:border-white/10 dark:bg-[radial-gradient(circle_at_center,rgba(124,163,224,0.14),rgba(124,163,224,0.04)_58%,rgba(255,255,255,0.01)_100%)]" />
                    <div className="relative flex h-[13rem] w-[13rem] flex-col items-center justify-center rounded-full border border-white/70 bg-[var(--color-surface)] shadow-[0_24px_80px_rgba(26,58,107,0.16)] dark:border-white/10 dark:bg-[var(--color-bg)]">
                      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} className="text-center">
                        <div className="font-mono text-6xl sm:text-7xl md:text-8xl font-semibold tracking-tight text-[var(--color-text)]">
                          {formattedTime}
                        </div>
                        <div className="mt-3 text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">
                          {isPaused ? 'Paused' : 'Focused'}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-navy-100/90 dark:bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-navy-600 via-blue-500 to-forest-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-[var(--color-muted)]">
                  <span>Progress</span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap justify-center xl:justify-start gap-3">
                {sessionState.status === 'running' ? (
                  <button
                    type="button"
                    onClick={pauseSession}
                    className="inline-flex items-center gap-2 rounded-full border border-navy-200/70 bg-white/75 px-5 py-3 text-sm font-semibold text-[var(--color-text)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-400 hover:shadow-md dark:border-white/10 dark:bg-white/5"
                  >
                    <Pause size={16} /> Pause
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={resumeSession}
                    className="inline-flex items-center gap-2 rounded-full bg-navy-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-navy-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700"
                  >
                    <Play size={16} /> Resume
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowEndModal(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500/15 dark:border-red-500/20 dark:text-red-300"
                >
                  <Square size={16} /> End Session
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-1"
            >
              <SessionList
                title="Session Goals"
                icon={CheckCircle2}
                items={sessionState.session.goals || []}
                toneClass="bg-forest-500/10 text-forest-700 dark:text-forest-300"
                dotClass="bg-forest-500"
              />
              <SessionList
                title="Not-To-Do List"
                icon={ListTodo}
                items={sessionState.session.notToDo || []}
                toneClass="bg-amber-500/10 text-amber-700 dark:text-amber-300"
                dotClass="bg-amber-500"
              />
              <section className="rounded-[1.75rem] border border-white/70 dark:border-white/10 bg-white/75 p-5 sm:p-6 shadow-[0_18px_60px_rgba(26,58,107,0.08)] backdrop-blur-xl dark:bg-white/5 dark:shadow-[0_18px_60px_rgba(0,0,0,0.3)] md:col-span-2 xl:col-span-1">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-[var(--color-text)]">Session Details</div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">Saved locally</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-[var(--color-muted)]">
                  <div className="rounded-2xl border border-white/60 bg-white/65 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5">
                    <div className="text-xs uppercase tracking-[0.2em] mb-1">Duration</div>
                    <div className="text-[var(--color-text)]">{sessionState.session.duration} min</div>
                  </div>
                  <div className="rounded-2xl border border-white/60 bg-white/65 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5">
                    <div className="text-xs uppercase tracking-[0.2em] mb-1">Remaining</div>
                    <div className="text-[var(--color-text)]">{formattedTime}</div>
                  </div>
                </div>
              </section>
            </motion.div>
          </motion.div>
        </section>
      </main>
    )
  }
