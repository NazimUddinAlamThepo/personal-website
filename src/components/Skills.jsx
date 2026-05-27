import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Award } from 'lucide-react'
import { skills, softSkills, languages } from '../data/portfolioData'

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const pop = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'backOut' } },
}

function TagGroup({ title, items, variant = 'blue' }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)] mb-3">{title}</p>
      <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-wrap gap-2">
        {items.map((item) => {
          const name   = typeof item === 'string' ? item : item.name
          const active = typeof item === 'object' && item.active
          return (
            <motion.span
              key={name}
              variants={pop}
              whileHover={{ scale: 1.06, y: -2 }}
              className={`cursor-default text-xs px-3 py-1.5 rounded-full font-medium border transition-all
                ${active
                  ? 'bg-forest-500 text-white border-forest-500'
                  : variant === 'green'
                    ? 'tag-green'
                    : 'tag'}`}
            >
              {name}
              {active && <span className="ml-1.5 text-[10px] opacity-80">●</span>}
            </motion.span>
          )
        })}
      </motion.div>
    </div>
  )
}

function LangBar({ name, level, pct }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium text-[var(--color-text)]">{name}</span>
        <span className="text-xs text-[var(--color-muted)]">{level}</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-navy-500 to-forest-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="section-pad bg-[var(--color-surface)] dark:bg-[#0d111e]">
      <div className="container-narrow">

        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-forest-500 dark:text-forest-400 font-semibold mb-3">
            What I work with
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[var(--color-text)]">
            Technical <span className="text-gradient">Skills</span>
          </h2>
        </motion.div>

        {inView && (
          <div className="grid md:grid-cols-2 gap-8">

            {/* Tech stack */}
            <div className="glass-card rounded-2xl p-7 space-y-7">
              <TagGroup title="Frontend"          items={skills.frontend} variant="blue" />
              <TagGroup title="Backend & Database" items={skills.backend}  variant="blue" />
              <TagGroup title="Tools"             items={skills.tools}    variant="blue" />
            </div>

            {/* ML stack + languages */}
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)] mb-1">
                  AI / ML Stack
                </p>
                <p className="text-[11px] text-forest-500 dark:text-forest-400 mb-4">
                  ● Active / Currently Studying
                </p>
                <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-wrap gap-2">
                  {skills.ml.map(item => (
                    <motion.span
                      key={item.name}
                      variants={pop}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium border cursor-default transition-all
                        ${item.active ? 'bg-forest-500 text-white border-forest-500' : 'tag-green'}`}
                    >
                      {item.name}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* Languages */}
              <div className="glass-card rounded-2xl p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">
                  Languages
                </p>
                {languages.map(l => <LangBar key={l.name} {...l} />)}
              </div>

              {/* Certifications teaser — links to /certifications */}
              <Link to="/certifications">
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="glass-card rounded-2xl p-6 cursor-pointer
                             hover:shadow-lg hover:shadow-navy-500/10 dark:hover:shadow-black/30
                             border border-transparent hover:border-navy-200 dark:hover:border-navy-700/40
                             transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      Certifications
                    </p>
                    <span className="text-xs font-semibold text-navy-500 dark:text-navy-300
                                     group-hover:text-forest-500 dark:group-hover:text-forest-400 transition-colors">
                      View all →
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {skills.certifications.map(c => (
                      <div key={c.name} className="flex items-start gap-3">
                        <Award size={14} className="mt-0.5 text-navy-400 dark:text-navy-300 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-[var(--color-text)]">{c.name}</p>
                          <p className="text-xs text-[var(--color-muted)]">{c.issuer} · {c.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Link>
            </div>

          </div>
        )}

        {/* Soft skills */}
        {inView && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-card rounded-2xl p-7 mt-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)] mb-5">
              Soft Skills
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {softSkills.map(s => (
                <motion.div
                  key={s.name}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-navy-50/50 dark:bg-navy-800/20
                             border border-navy-100/60 dark:border-navy-700/20 cursor-default"
                >
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-xs font-medium text-[var(--color-text)]">{s.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
