import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { education } from '../data/portfolioData'

export default function Education() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="education" className="section-pad bg-[var(--color-surface)] dark:bg-[#0d111e]">
      <div className="container-narrow">

        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-forest-500 dark:text-forest-400 font-semibold mb-3">
            Academic background
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[var(--color-text)]">
            Education <span className="text-gradient">Timeline</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        {inView && (
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block timeline-line" />

            <div className="space-y-10">
              {education.map((item, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`relative md:flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6`}
                  >
                    {/* Card */}
                    <div className="flex-1">
                      <div className="glass-card rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                          <span className="text-3xl shrink-0">{item.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-semibold text-base text-[var(--color-text)] leading-snug">{item.degree}</h3>
                              <span className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full
                                ${item.status === 'Ongoing'
                                  ? 'bg-forest-500 text-white'
                                  : 'tag'}`}>
                                {item.status}
                              </span>
                            </div>
                            <p className="text-sm text-navy-500 dark:text-navy-300 font-medium">{item.school}</p>
                            <p className="text-xs text-[var(--color-muted)] mt-0.5 mb-3">{item.location} · {item.period}</p>
                            {item.highlights.length > 0 && (
                              <ul className="space-y-1">
                                {item.highlights.map((h, j) => (
                                  <li key={j} className="flex items-start gap-2 text-xs text-[var(--color-muted)]">
                                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-navy-400 shrink-0" />
                                    {h}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Centre dot (desktop) */}
                    <div className="hidden md:flex w-5 h-5 rounded-full border-2 shrink-0 z-10
                                    border-navy-500 dark:border-navy-300
                                    bg-[var(--color-surface)] dark:bg-[#0d111e]" />

                    {/* Spacer for the other side */}
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
