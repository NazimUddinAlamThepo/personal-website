import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Star, ArrowUpRight } from 'lucide-react'
import { projects } from '../data/portfolioData'

const categories = ['All', 'AI / ML', 'Full-Stack Web', 'Backend']

export default function Projects() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <section id="projects" className="section-pad bg-[var(--color-bg)]">
      <div className="container-wide">

        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-forest-500 dark:text-forest-400 font-semibold mb-3">
            What I've built
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[var(--color-text)]">
            Selected <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        {inView && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
                  ${active === cat
                    ? 'bg-navy-500 text-white border-navy-500 shadow-md shadow-navy-500/20'
                    : 'border-navy-200 dark:border-navy-700 text-[var(--color-muted)] hover:border-navy-400 hover:text-[var(--color-text)]'}`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col group
                           transition-shadow duration-300
                           hover:shadow-xl hover:shadow-navy-500/10 dark:hover:shadow-black/30"
              >
                {/* Top accent bar */}
                <div className="relative h-1.5 w-full overflow-hidden">
                  <div className={`absolute inset-0 ${p.color === 'forest'
                    ? 'bg-gradient-to-r from-forest-400 to-forest-600'
                    : 'bg-gradient-to-r from-navy-400 to-navy-600'}`}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-forest-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Badge row */}
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full
                      ${p.color === 'forest' ? 'tag-green' : 'tag'}`}>
                      {p.badge}
                    </span>
                    {p.featured && (
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                        className="flex items-center gap-1 text-[10px] text-amber-500 font-semibold"
                      >
                        <Star size={10} fill="currentColor" /> Featured
                      </motion.span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-base text-[var(--color-text)] mb-2 leading-snug
                                 group-hover:text-navy-500 dark:group-hover:text-navy-300 transition-colors">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-4 flex-1">{p.description}</p>

                  {/* Bullet points */}
                  <ul className="space-y-1.5 mb-5">
                    {p.points.map((pt, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 + j * 0.05 + 0.2 }}
                        className="flex items-start gap-2 text-xs text-[var(--color-muted)]"
                      >
                        <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0
                          ${p.color === 'forest' ? 'bg-forest-500' : 'bg-navy-500'}`} />
                        {pt}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-md
                                               bg-navy-50 dark:bg-navy-800/30
                                               text-navy-600 dark:text-navy-300
                                               border border-navy-100 dark:border-navy-700/30
                                               hover:bg-navy-100 dark:hover:bg-navy-700/40 transition-colors cursor-default">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-navy-50 dark:border-navy-800/30">
                    <motion.a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-muted)]
                                 hover:text-navy-500 dark:hover:text-navy-300 transition-colors"
                    >
                      <Github size={13} /> Code
                    </motion.a>
                    {p.demo && (
                      <motion.a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ x: 2 }}
                        className="flex items-center gap-1.5 text-xs font-medium text-forest-600 dark:text-forest-400
                                   hover:text-forest-700 dark:hover:text-forest-300 transition-colors"
                      >
                        <ExternalLink size={13} /> Live Demo
                        <ArrowUpRight size={11} className="opacity-60" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
