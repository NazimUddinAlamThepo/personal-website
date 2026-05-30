import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { personal } from '../data/portfolioData'

const ROLES = [
  'Frontend Developer',
  'ML Researcher',
  'React Engineer',
  'Full-Stack Builder',
]

function TypewriterRoles() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const target = ROLES[idx]
    let timeoutId

    if (phase === 'typing') {
      if (text.length < target.length) {
        timeoutId = setTimeout(() => setText(target.slice(0, text.length + 1)), 75)
      } else {
        timeoutId = setTimeout(() => setPhase('deleting'), 2200)
      }
    } else {
      if (text.length > 0) {
        timeoutId = setTimeout(() => setText(current => current.slice(0, -1)), 38)
      } else {
        setIdx(current => (current + 1) % ROLES.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeoutId)
  }, [text, phase, idx])

  return (
    <span className="inline-flex items-center gap-0.5 text-gradient font-semibold">
      <span>{text}</span>
      <span className="inline-block w-[2px] h-5 bg-navy-500 dark:bg-navy-300 animate-blink rounded-full align-middle ml-0.5" />
    </span>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

function SocialLink({ href, label, className, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.2, y: -4 }}
      whileTap={{ scale: 0.9 }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

export default function HeroContent({
  nameClassName,
  roleClassName,
  taglineClassName,
  primaryButtonClassName,
  secondaryButtonClassName,
  socialButtonClassName,
  scrollClassName,
  scrollTo,
  scrollLabel,
  accentClassName = 'text-gradient',
  nameToneClassName = 'text-[var(--color-text)]',
  separatorClassName = 'text-navy-300 dark:text-navy-600 select-none',
}) {
  return (
    <div className="container-narrow px-6 text-center relative z-10">
      <motion.div {...fadeUp(0.1)} className="mb-6 flex justify-center">
        <motion.span
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="tag text-xs tracking-widest uppercase"
        >
          ✨ Open to Internships &amp; Research
        </motion.span>
      </motion.div>

      <motion.h1 {...fadeUp(0.2)} className={nameClassName}>
        <span className={nameToneClassName}>Md. </span>
        <span className={accentClassName}>Mahi</span>
        <br />
        <span className={nameToneClassName}>Alam </span>
        <span className={accentClassName}>Dipu</span>
      </motion.h1>

      <motion.div
        {...fadeUp(0.3)}
        className={roleClassName}
        style={{ minHeight: '2rem' }}
      >
        <TypewriterRoles />
        <span className={separatorClassName}>·</span>
        <span>CSE @ RUET</span>
      </motion.div>

      <motion.p {...fadeUp(0.38)} className={taglineClassName}>
        "{personal.heroTagline}"
      </motion.p>

      <motion.div {...fadeUp(0.48)} className="flex flex-wrap gap-4 justify-center mb-12">
        <Link to="/about">
          <motion.div
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className={primaryButtonClassName}
          >
            View Profile
          </motion.div>
        </Link>
        <Link to="/contact">
          <motion.div
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className={secondaryButtonClassName}
          >
            Contact Me
          </motion.div>
        </Link>
      </motion.div>

      <motion.div {...fadeUp(0.58)} className="flex gap-5 justify-center">
        {[
          { icon: <Github size={19} />, href: personal.github, label: 'GitHub' },
          { icon: <Linkedin size={19} />, href: personal.linkedin, label: 'LinkedIn' },
          { icon: <Mail size={19} />, href: `mailto:${personal.email}`, label: 'Email' },
        ].map(link => (
          <SocialLink
            key={link.label}
            href={link.href}
            label={link.label}
            className={socialButtonClassName}
          >
            {link.icon}
          </SocialLink>
        ))}
      </motion.div>

      <Link to={scrollTo}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className={scrollClassName}
          aria-label={scrollLabel}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </motion.div>
      </Link>
    </div>
  )
}