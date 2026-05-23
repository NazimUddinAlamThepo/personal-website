import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { personal } from '../data/portfolioData'

const navLinks = [
  { label: 'About',    href: '#about'     },
  { label: 'Skills',   href: '#skills'    },
  { label: 'Projects', href: '#projects'  },
  { label: 'Education',href: '#education' },
  { label: 'Research', href: '#research'  },
  { label: 'Contact',  href: '#contact'   },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[var(--color-surface)] dark:bg-[#0d111e] border-t border-navy-50 dark:border-navy-900/50">
      <div className="container-narrow section-pad py-12! px-4 sm:px-8 lg:px-16">

        <div className="flex flex-col items-center gap-8">

          {/* Logo & tagline */}
          <div className="text-center">
            <p className="font-serif text-2xl font-semibold text-gradient mb-1">
              {personal.shortName}<span className="text-forest-500">.</span>
            </p>
            <p className="text-xs text-[var(--color-muted)] max-w-xs">
              Frontend Developer & ML Researcher based in Dhaka, Bangladesh.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-5 justify-center">
            {navLinks.map(l => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-xs text-[var(--color-muted)] hover:text-navy-500 dark:hover:text-navy-300 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex gap-4">
            {[
              { icon: <Github size={17}/>,   href: personal.github,   label: 'GitHub'   },
              { icon: <Linkedin size={17}/>, href: personal.linkedin, label: 'LinkedIn' },
              { icon: <Mail size={17}/>,     href: `mailto:${personal.email}`, label: 'Email' },
            ].map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-9 h-9 rounded-full flex items-center justify-center
                           text-[var(--color-muted)] hover:text-navy-500 dark:hover:text-navy-300
                           border border-navy-100 dark:border-navy-800 hover:border-navy-300 transition-all"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="section-divider w-full" />

          {/* Copyright */}
          <p className="text-xs text-[var(--color-muted)] text-center flex items-center gap-1 flex-wrap justify-center">
            © {year} Md. Nazimuddin Alam Thepo. Built with
            <Heart size={11} className="text-red-400 mx-0.5" fill="currentColor" />
            using React + Tailwind + Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  )
}
