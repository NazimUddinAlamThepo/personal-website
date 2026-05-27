import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, ExternalLink, CheckCircle } from 'lucide-react'
import { skills } from '../data/portfolioData'

const certColors = [
  {
    bg: 'from-navy-500 to-navy-700',
    badge: 'bg-navy-50 dark:bg-navy-900/40 text-navy-600 dark:text-navy-300 border-navy-200 dark:border-navy-700/40',
  },
  {
    bg: 'from-forest-500 to-forest-700',
    badge: 'bg-forest-50 dark:bg-forest-900/40 text-forest-600 dark:text-forest-300 border-forest-200 dark:border-forest-700/40',
  },
]

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function CertificationsPage() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <main className="pt-20 min-h-screen">
      <section className="section-pad bg-[var(--color-bg)]">
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
              Credentials &amp; Achievements
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[var(--color-text)]">
              My <span className="text-gradient">Certifications</span>
            </h2>
            <p className="mt-4 text-sm text-[var(--color-muted)] max-w-md mx-auto">
              Industry-recognized credentials demonstrating expertise in machine learning, AI, and software engineering.
            </p>
          </motion.div>

          {/* Stats bar */}
          {inView && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap gap-4 justify-center mb-12"
            >
              {[
                { label: 'Certifications Earned', value: skills.certifications.length, icon: '🏆' },
                { label: 'Issuing Platforms',     value: [...new Set(skills.certifications.map(c => c.issuer))].length, icon: '🎓' },
                { label: 'Latest Year',           value: Math.max(...skills.certifications.map(c => parseInt(c.year))), icon: '📅' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  whileHover={{ y: -3, scale: 1.03 }}
                  className="flex items-center gap-3 px-5 py-3 glass-card rounded-xl cursor-default"
                >
                  <span className="text-xl">{stat.icon}</span>
                  <div>
                    <p className="text-lg font-bold text-[var(--color-text)] leading-none">{stat.value}</p>
                    <p className="text-xs text-[var(--color-muted)] mt-0.5">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Certification cards */}
          {inView && (
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {skills.certifications.map((cert, i) => {
                const palette = certColors[i % certColors.length]
                return (
                  <motion.div
                    key={cert.name}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="glass-card rounded-2xl overflow-hidden flex flex-col
                               transition-shadow duration-300
                               hover:shadow-xl hover:shadow-navy-500/10 dark:hover:shadow-black/30"
                  >
                    {/* Gradient header */}
                    <div className={`bg-gradient-to-br ${palette.bg} p-6 relative overflow-hidden`}>
                      {/* Background decoration */}
                      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
                      <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-white/5" />

                      <div className="relative z-10 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                          <Award size={22} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-base leading-snug">{cert.name}</h3>
                          <p className="text-white/70 text-sm mt-1">{cert.issuer}</p>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex-1 flex flex-col gap-4">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold
                                         px-3 py-1.5 rounded-full border ${palette.badge}`}>
                          <CheckCircle size={11} />
                          Completed {cert.year}
                        </span>
                        <span className="text-xs text-[var(--color-muted)]">Issued by {cert.issuer}</span>
                      </div>

                      {cert.url && (
                        <motion.a
                          href={cert.url}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ x: 3 }}
                          className="inline-flex items-center gap-2 text-xs font-medium
                                     text-navy-500 dark:text-navy-300
                                     hover:text-forest-500 dark:hover:text-forest-400 transition-colors"
                        >
                          <ExternalLink size={12} />
                          View Certificate
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Currently studying / upcoming certs banner */}
          {inView && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1a3a6b 0%, #0d6b3a 100%)' }}
            >
              <div className="px-8 py-7 flex flex-col sm:flex-row items-center gap-5">
                <div className="text-4xl">📚</div>
                <div className="text-center sm:text-left flex-1">
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                    Currently pursuing
                  </p>
                  <h4 className="text-white text-xl font-serif font-semibold">
                    Deep Learning Specialization
                  </h4>
                  <p className="text-white/70 text-sm mt-1">
                    Exploring CNNs, sequence models, and transformer architectures through Coursera + fast.ai.
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                                   bg-white/20 text-white text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    In Progress
                  </span>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </section>
    </main>
  )
}
