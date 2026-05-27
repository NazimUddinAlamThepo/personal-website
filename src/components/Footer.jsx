import { motion } from 'framer-motion'
import { NavLink, Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { personal } from '../data/portfolioData'

const navLinks = [
  { label: 'About',          route: '/about'          },
  { label: 'Skills',         route: '/skills'         },
  { label: 'Projects',       route: '/projects'       },
  { label: 'Education',      route: '/education'      },
  { label: 'Research',       route: '/research'       },
  { label: 'Certifications', route: '/certifications' },
  { label: 'Learning',       route: '/learning'       },
  { label: 'Contact',        route: '/contact'        },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-surface)] dark:bg-[#0d111e] border-t border-navy-50 dark:border-navy-900/50">
      <div className="container-narrow px-4 sm:px-8 lg:px-16 py-12">

        <div className="flex flex-col items-center gap-8">

          {/* Logo & tagline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Link to="/" className="font-serif text-2xl font-semibold text-gradient mb-1 inline-block">
              {personal.shortName}<span className="text-forest-500">.</span>
            </Link>
            <p className="text-xs text-[var(--color-muted)] max-w-xs">
              Frontend Developer &amp; ML Researcher based in Dhaka, Bangladesh.
            </p>
          </motion.div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-4 justify-center">
            {navLinks.map((l, i) => (
              <motion.div
                key={l.route}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <NavLink
                  to={l.route}
                  className={({ isActive }) =>
                    `text-xs transition-colors ${
                      isActive
                        ? 'text-navy-500 dark:text-navy-300 font-semibold'
                        : 'text-[var(--color-muted)] hover:text-navy-500 dark:hover:text-navy-300'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex gap-4">
            {[
              { icon: <Github size={17}/>,   href: personal.github,            label: 'GitHub'   },
              { icon: <Linkedin size={17}/>, href: personal.linkedin,           label: 'LinkedIn' },
              { icon: <Mail size={17}/>,     href: `mailto:${personal.email}`,  label: 'Email'    },
            ].map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full flex items-center justify-center
                           text-[var(--color-muted)] hover:text-navy-500 dark:hover:text-navy-300
                           border border-navy-100 dark:border-navy-800 hover:border-navy-300
                           hover:bg-navy-50 dark:hover:bg-navy-800/40 transition-all"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="section-divider w-full" />

          {/* Copyright */}
          <p className="text-xs text-[var(--color-muted)] text-center flex items-center gap-1 flex-wrap justify-center">
            © {year} Md. Mahi Alam Dipu. Built with
            <Heart size={11} className="text-red-400 mx-0.5" fill="currentColor" />
            using React + Tailwind + Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  )
}
