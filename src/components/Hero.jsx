import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { personal } from '../data/portfolioData'
import { useState, useEffect } from 'react'

const ROLES = [
  'Frontend Developer',
  'ML Researcher',
  'React Engineer',
  'Full-Stack Builder',
]

function TypewriterRoles() {
  const [idx,   setIdx]   = useState(0)
  const [text,  setText]  = useState('')
  const [phase, setPhase] = useState('typing') // typing | pausing | deleting

  useEffect(() => {
    const target = ROLES[idx]
    let t

    if (phase === 'typing') {
      if (text.length < target.length) {
        t = setTimeout(() => setText(target.slice(0, text.length + 1)), 75)
      } else {
        t = setTimeout(() => setPhase('deleting'), 2200)
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(s => s.slice(0, -1)), 38)
      } else {
        setIdx(i => (i + 1) % ROLES.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(t)
  }, [text, phase, idx])

  return (
    <span className="inline-flex items-center gap-0.5 text-gradient font-semibold">
      <span>{text}</span>
      <span className="inline-block w-[2px] h-5 bg-navy-500 dark:bg-navy-300 animate-blink rounded-full align-middle ml-0.5" />
    </span>
  )
}

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 40 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function Hero() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center hero-gradient overflow-hidden"
    >
      {/* Animated orbs */}
      <div className="orb w-[600px] h-[600px] -top-40 -left-40 opacity-[0.06] bg-navy-500" />
      <div className="orb orb-2 w-[500px] h-[500px] -bottom-20 -right-20 opacity-[0.05] bg-forest-500" />
      <div className="orb w-[350px] h-[350px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] bg-amber-400" />

      {/* Dot-grid layer */}
      <div className="absolute inset-0 dot-grid opacity-[0.35] dark:opacity-[0.15] pointer-events-none" />

      {/* Floating particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left:      `${5 + i * 6.5}%`,
            top:       `${10 + (i % 5) * 16}%`,
            '--dur':   `${7 + (i % 4) * 2.5}s`,
            '--delay': `${(i * 0.6) % 5}s`,
            width:     i % 3 === 0 ? '6px' : '3px',
            height:    i % 3 === 0 ? '6px' : '3px',
          }}
        />
      ))}

      {/* ── Content ───────────────────────────── */}
      <div className="container-narrow px-6 text-center relative z-10">

        {/* Badge */}
        <motion.div {...fadeUp(0.1)} className="mb-6 flex justify-center">
          <motion.span
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="tag text-xs tracking-widest uppercase"
          >
            ✨ Open to Internships &amp; Research
          </motion.span>
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.2)}
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight mb-6"
        >
          <span className="text-[var(--color-text)]">Md. </span>
          <span className="text-gradient">Nazimuddin</span>
          <br />
          <span className="text-[var(--color-text)]">Alam </span>
          <span className="text-gradient">Thepo</span>
        </motion.h1>

        {/* Typewriter role row */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1
                     text-lg sm:text-xl text-[var(--color-muted)] font-medium mb-4"
          style={{ minHeight: '2rem' }}
        >
          <TypewriterRoles />
          <span className="text-navy-300 dark:text-navy-600 select-none">·</span>
          <span>CSE @ RUET</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          {...fadeUp(0.38)}
          className="text-base text-[var(--color-muted)] mb-11 font-light italic font-serif"
        >
          "{personal.heroTagline}"
        </motion.p>

        {/* CTA buttons */}
        <motion.div {...fadeUp(0.48)} className="flex flex-wrap gap-4 justify-center mb-12">
          <motion.button
            onClick={() => scrollTo('#about')}
            whileHover={{ scale: 1.06, y: -3, boxShadow: '0 20px 40px rgba(26,58,107,0.28)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-full bg-navy-500 dark:bg-navy-400 text-white
                       text-sm font-semibold shadow-lg shadow-navy-500/25 hover:bg-forest-500 transition-all duration-300"
          >
            View Profile
          </motion.button>
          <motion.button
            onClick={() => scrollTo('#contact')}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-full border-2 border-navy-500/30 dark:border-navy-400/30
                       text-navy-500 dark:text-navy-300 text-sm font-semibold
                       hover:bg-navy-500 hover:text-white dark:hover:bg-navy-400 transition-all duration-300"
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Social icons */}
        <motion.div {...fadeUp(0.58)} className="flex gap-5 justify-center">
          {[
            { icon: <Github size={19} />,   href: personal.github,             label: 'GitHub'   },
            { icon: <Linkedin size={19} />, href: personal.linkedin,            label: 'LinkedIn' },
            { icon: <Mail size={19} />,     href: `mailto:${personal.email}`,   label: 'Email'    },
          ].map(s => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full flex items-center justify-center
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
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 flex flex-col items-center gap-2
                   text-[var(--color-muted)] hover:text-navy-500 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
