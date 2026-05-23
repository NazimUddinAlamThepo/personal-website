import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { personal } from '../data/portfolioData'

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 40 },
  animate:   { opacity: 1, y: 0 },
  transition:{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center hero-gradient overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-[0.07] dark:opacity-[0.04]
                      bg-navy-500 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-[0.07] dark:opacity-[0.04]
                      bg-forest-500 blur-3xl pointer-events-none" />

      <div className="container-narrow px-6 text-center relative z-10">

        {/* Badge */}
        <motion.div {...fadeUp(0.1)} className="mb-6 flex justify-center">
          <span className="tag text-xs tracking-widest uppercase">
            Open to Internships & Research
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1 {...fadeUp(0.2)} className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight mb-4">
          <span className="text-[var(--color-text)]">Md. </span>
          <span className="text-gradient">Nazimuddin</span>
          <br />
          <span className="text-[var(--color-text)]">Alam </span>
          <span className="text-gradient">Thepo</span>
        </motion.h1>

        {/* Title */}
        <motion.p {...fadeUp(0.3)} className="text-lg sm:text-xl text-[var(--color-muted)] font-medium mb-3">
          Frontend Developer
          <span className="mx-3 text-navy-300 dark:text-navy-400">·</span>
          Machine Learning Researcher
          <span className="mx-3 text-navy-300 dark:text-navy-400">·</span>
          CSE @ RUET
        </motion.p>

        {/* Tagline */}
        <motion.p {...fadeUp(0.4)} className="text-base text-[var(--color-muted)] mb-10 font-light italic font-serif">
          "{personal.heroTagline}"
        </motion.p>

        {/* CTA buttons */}
        <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-4 justify-center mb-12">
          <motion.button
            onClick={() => scrollTo('#about')}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="px-7 py-3.5 rounded-full bg-navy-500 dark:bg-navy-400 text-white
                       text-sm font-semibold shadow-lg shadow-navy-500/20 hover:bg-forest-500 transition-all duration-300"
          >
            View Profile
          </motion.button>
          <motion.button
            onClick={() => scrollTo('#contact')}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="px-7 py-3.5 rounded-full border border-navy-500/30 dark:border-navy-400/30
                       text-navy-500 dark:text-navy-300 text-sm font-semibold
                       hover:bg-navy-500 hover:text-white dark:hover:bg-navy-400 transition-all duration-300"
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Social icons */}
        <motion.div {...fadeUp(0.6)} className="flex gap-5 justify-center">
          {[
            { icon: <Github size={19} />,   href: personal.github,   label: 'GitHub'   },
            { icon: <Linkedin size={19} />, href: personal.linkedin, label: 'LinkedIn' },
            { icon: <Mail size={19} />,     href: `mailto:${personal.email}`, label: 'Email' },
          ].map(s => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              whileHover={{ scale: 1.15, y: -3 }}
              className="w-10 h-10 rounded-full flex items-center justify-center
                         text-[var(--color-muted)] hover:text-navy-500 dark:hover:text-navy-300
                         glass-card transition-all duration-300"
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 text-[var(--color-muted)] hover:text-navy-500 transition-colors"
        aria-label="Scroll down"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <ArrowDown size={22} />
        </motion.div>
      </motion.button>
    </section>
  )
}
