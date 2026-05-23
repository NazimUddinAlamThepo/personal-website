import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { mlResearch } from '../data/portfolioData'

const badgeColors = {
  amber:  'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30',
  forest: 'bg-forest-50 text-forest-700 border-forest-200 dark:bg-forest-900/20 dark:text-forest-400 dark:border-forest-800/30',
  navy:   'tag',
}

export default function MLResearch() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="research" className="section-pad bg-[var(--color-bg)]">
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
            Deep Learning & AI
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[var(--color-text)]">
            Research <span className="text-gradient">Focus</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        {inView && (
          <div className="grid sm:grid-cols-2 gap-6">
            {mlResearch.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.icon}</span>
                    <h3 className="font-semibold text-base text-[var(--color-text)] leading-snug">{item.title}</h3>
                  </div>
                  <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1
                                   rounded-full border ${badgeColors[item.color] ?? 'tag'}`}>
                    {item.badge}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Currently studying banner */}
        {inView && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 rounded-2xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1a3a6b 0%, #0d6b3a 100%)' }}
          >
            <div className="px-8 py-7 flex flex-col sm:flex-row items-center gap-5">
              <div className="text-4xl">🧠</div>
              <div className="text-center sm:text-left">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                  Currently deep-diving into
                </p>
                <h4 className="text-white text-xl font-serif font-semibold">
                  LSTM Networks & Sequential Modelling
                </h4>
                <p className="text-white/70 text-sm mt-1">
                  Exploring gating mechanisms, bidirectional architectures, and NLP applications.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
