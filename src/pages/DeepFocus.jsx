import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Plus, X, Sparkles, Clock3, ListTodo } from 'lucide-react'
import { motion } from 'framer-motion'

const PRESETS = [25, 45, 60, 90]
const STORAGE_KEY = 'deep-focus-session'

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `df-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function FieldSection({ title, description, icon: Icon, children }) {
  return (
    <section className="glass-card rounded-3xl p-5 sm:p-6 border border-white/70 dark:border-white/10">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-navy-500/10 text-navy-700 dark:text-navy-300">
          <Icon size={18} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-text)]">{title}</h2>
          <p className="text-sm text-[var(--color-muted)] mt-1">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

function ChecklistItem({ label, tone = 'goal', onRemove }) {
  const toneClass = tone === 'goal'
    ? 'bg-forest-500/10 text-forest-700 dark:text-forest-300'
    : 'bg-amber-500/10 text-amber-700 dark:text-amber-300'

  return (
    <li className="flex items-center justify-between gap-3 rounded-2xl border border-white/70 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-3">
      <div className="flex items-start gap-3 min-w-0">
        <span className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full ${toneClass}`}>
          <CheckCircle2 size={14} />
        </span>
        <span className="break-words text-sm sm:text-base text-[var(--color-text)]">{label}</span>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 rounded-full p-2 text-[var(--color-muted)] transition-colors hover:bg-red-500/10 hover:text-red-600"
        aria-label={`Remove ${label}`}
      >
        <X size={16} />
      </button>
    </li>
  )
}

export default function DeepFocusPage() {
  const navigate = useNavigate()
  const [goalInput, setGoalInput] = useState('')
  const [goals, setGoals] = useState([])
  const [avoidInput, setAvoidInput] = useState('')
  const [notToDo, setNotToDo] = useState([])
  const [durationMode, setDurationMode] = useState('')
  const [customDuration, setCustomDuration] = useState('')
  const [errors, setErrors] = useState({})

  const selectedDuration = useMemo(() => {
    if (durationMode === 'custom') {
      return customDuration ? Number(customDuration) : 0
    }
    return durationMode ? Number(durationMode) : 0
  }, [durationMode, customDuration])

  useEffect(() => {
    if (durationMode !== 'custom') {
      setCustomDuration('')
    }
  }, [durationMode])

  const addGoal = () => {
    const nextGoal = goalInput.trim()
    if (!nextGoal) return
    setGoals(current => [...current, nextGoal])
    setGoalInput('')
    setErrors(current => ({ ...current, goals: '' }))
  }

  const addNotToDo = () => {
    const nextItem = avoidInput.trim()
    if (!nextItem) return
    setNotToDo(current => [...current, nextItem])
    setAvoidInput('')
  }

  const handleSubmit = event => {
    event.preventDefault()

    const nextErrors = {}
    if (goals.length === 0) {
      nextErrors.goals = 'Add at least one goal before starting.'
    }
    if (!selectedDuration || selectedDuration <= 0) {
      nextErrors.duration = 'Select a session duration.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    const session = {
      id: createId(),
      goals,
      notToDo,
      duration: selectedDuration,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    navigate('/deep-focus/active')
  }

  return (
    <main className="pt-24 pb-16 min-h-screen bg-[var(--color-bg)]">
      <section className="container-wide px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <span className="tag inline-flex items-center gap-2">
              <Sparkles size={14} /> Deep Focus Session
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-[var(--color-text)]">
              Set up your next focused block.
            </h1>
            <p className="max-w-2xl text-[var(--color-muted)] text-base sm:text-lg leading-relaxed">
              Capture the outcome, list the distractions to avoid, and choose how long you want to stay locked in.
            </p>
          </motion.div>

          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-white/70 dark:border-white/10">
            <div className="flex items-center gap-3 mb-3 text-[var(--color-text)]">
              <Clock3 size={18} className="text-navy-600 dark:text-navy-300" />
              <span className="font-semibold">Session Summary</span>
            </div>
            <div className="space-y-3 text-sm text-[var(--color-muted)]">
              <div className="rounded-2xl bg-white/70 dark:bg-white/5 px-4 py-3 border border-white/60 dark:border-white/10">
                <div className="text-xs uppercase tracking-[0.2em] mb-1">Goals</div>
                <div>{goals.length || 0} added</div>
              </div>
              <div className="rounded-2xl bg-white/70 dark:bg-white/5 px-4 py-3 border border-white/60 dark:border-white/10">
                <div className="text-xs uppercase tracking-[0.2em] mb-1">Not to do</div>
                <div>{notToDo.length || 0} listed</div>
              </div>
              <div className="rounded-2xl bg-white/70 dark:bg-white/5 px-4 py-3 border border-white/60 dark:border-white/10">
                <div className="text-xs uppercase tracking-[0.2em] mb-1">Duration</div>
                <div>{selectedDuration ? `${selectedDuration} min` : 'Not selected yet'}</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-6 lg:grid-cols-2">
          <FieldSection
            title="Main Outcome / Session Goals"
            description="Add one or more specific outcomes you want to finish during this session."
            icon={ListTodo}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={goalInput}
                onChange={event => setGoalInput(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    addGoal()
                  }
                }}
                className="flex-1 rounded-2xl border border-navy-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-3 text-[var(--color-text)] outline-none focus:border-navy-500 dark:focus:border-navy-300"
                placeholder="e.g. Finish project proposal draft"
              />
              <button
                type="button"
                onClick={addGoal}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-navy-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-navy-700"
              >
                <Plus size={16} /> Add Goal
              </button>
            </div>
            {errors.goals ? <p className="mt-3 text-sm text-red-600">{errors.goals}</p> : null}

            <ul className="mt-4 space-y-3">
              {goals.length > 0 ? (
                goals.map((goal, index) => (
                  <ChecklistItem
                    key={`${goal}-${index}`}
                    label={goal}
                    tone="goal"
                    onRemove={() => setGoals(current => current.filter((_, i) => i !== index))}
                  />
                ))
              ) : (
                <li className="rounded-2xl border border-dashed border-navy-200 dark:border-white/10 px-4 py-6 text-sm text-[var(--color-muted)]">
                  No goals yet. Add at least one to continue.
                </li>
              )}
            </ul>
          </FieldSection>

          <FieldSection
            title="Not-To-Do List"
            description="List the distractions, tasks, or habits you want to avoid during the session."
            icon={X}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={avoidInput}
                onChange={event => setAvoidInput(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    addNotToDo()
                  }
                }}
                className="flex-1 rounded-2xl border border-navy-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-3 text-[var(--color-text)] outline-none focus:border-navy-500 dark:focus:border-navy-300"
                placeholder="e.g. Check social media"
              />
              <button
                type="button"
                onClick={addNotToDo}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-forest-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-forest-700"
              >
                <Plus size={16} /> Add Item
              </button>
            </div>

            <ul className="mt-4 space-y-3">
              {notToDo.length > 0 ? (
                notToDo.map((item, index) => (
                  <ChecklistItem
                    key={`${item}-${index}`}
                    label={item}
                    tone="avoid"
                    onRemove={() => setNotToDo(current => current.filter((_, i) => i !== index))}
                  />
                ))
              ) : (
                <li className="rounded-2xl border border-dashed border-navy-200 dark:border-white/10 px-4 py-6 text-sm text-[var(--color-muted)]">
                  Keep distractions here so you can protect the session.
                </li>
              )}
            </ul>
          </FieldSection>

          <FieldSection
            title="Session Duration"
            description="Pick a preset or set a custom duration in minutes."
            icon={Clock3}
          >
            <div className="flex flex-wrap gap-3 rounded-3xl border border-navy-200/70 bg-gradient-to-br from-white/70 via-white/50 to-navy-500/5 p-3 shadow-[0_12px_40px_rgba(26,58,107,0.08)] backdrop-blur-sm dark:border-white/10 dark:from-white/5 dark:via-white/5 dark:to-white/0">
              {PRESETS.map(minutes => {
                const active = durationMode === String(minutes)
                return (
                  <button
                    key={minutes}
                    type="button"
                    onClick={() => setDurationMode(String(minutes))}
                    className={`min-w-[88px] rounded-2xl px-4 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ${active
                      ? 'border border-transparent bg-gradient-to-r from-navy-600 via-blue-600 to-cyan-600 text-white shadow-lg shadow-navy-500/30 ring-1 ring-navy-400/40 -translate-y-0.5'
                      : 'border border-navy-200/80 bg-white/85 text-[var(--color-text)] shadow-sm hover:-translate-y-0.5 hover:border-navy-400 hover:bg-navy-500/10 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-navy-300 dark:hover:bg-white/10'}`}
                  >
                    {minutes} min
                  </button>
                )
              })}
              <button
                type="button"
                onClick={() => setDurationMode('custom')}
                className={`min-w-[144px] rounded-2xl px-4 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ${durationMode === 'custom'
                  ? 'border border-transparent bg-gradient-to-r from-forest-600 via-emerald-600 to-teal-600 text-white shadow-lg shadow-forest-500/30 ring-1 ring-forest-400/40 -translate-y-0.5'
                  : 'border border-navy-200/80 bg-white/85 text-[var(--color-text)] shadow-sm hover:-translate-y-0.5 hover:border-forest-500 hover:bg-forest-500/10 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-forest-300 dark:hover:bg-white/10'}`}
              >
                Custom duration
              </button>
            </div>

            {durationMode === 'custom' ? (
              <div className="mt-4">
                <label className="block text-sm font-medium text-[var(--color-muted)] mb-2">
                  Custom duration in minutes
                </label>
                <input
                  type="number"
                  min="1"
                  value={customDuration}
                  onChange={event => setCustomDuration(event.target.value)}
                  className="w-full rounded-2xl border border-navy-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-3 text-[var(--color-text)] outline-none focus:border-navy-500 dark:focus:border-navy-300"
                  placeholder="Enter a duration"
                />
              </div>
            ) : null}

            {errors.duration ? <p className="mt-3 text-sm text-red-600">{errors.duration}</p> : null}
          </FieldSection>

          <div className="lg:col-span-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-navy-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-navy-500/20 transition-colors hover:bg-navy-700"
            >
              <Sparkles size={16} /> Start Session
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}