import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { personal } from '../data/portfolioData'

const links = [
  { label: 'About',    href: '#about'     },
  { label: 'Skills',   href: '#skills'    },
  { label: 'Projects', route: '/projects' },
  { label: 'Education',href: '#education' },
  { label: 'Research', href: '#research'  },
  { label: 'Learning', route: '/learning' },
  { label: 'Contact',  href: '#contact'   },
]

export default function Navbar({ dark, toggle }) {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleNavClick = (link) => {
    setOpen(false)
    if (link.route) {
      navigate(link.route)
    } else {
      // If we're on home page, just scroll
      if (location.pathname === '/') {
        scrollTo(link.href)
      } else {
        // If we're on a different page, navigate to home first, then scroll
        navigate('/')
        setTimeout(() => scrollTo(link.href), 300)
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? 'glass border-b border-white/60 dark:border-white/8 shadow-sm py-3'
          : 'bg-transparent py-5'}`}
    >
      <div className="container-wide px-4 sm:px-8 lg:px-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-serif text-xl font-semibold text-gradient hover:opacity-80 transition-opacity"
        >
          <motion.div whileHover={{ scale: 1.03 }}>
            {personal.shortName}
            <span className="text-forest-500 dark:text-forest-400">.</span>
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <button
              key={l.label}
              onClick={() => handleNavClick(l)}
              className="text-sm font-medium text-[var(--color-muted)] hover:text-navy-500 dark:hover:text-navy-300
                         transition-colors duration-200 relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-navy-500 dark:bg-navy-300
                               group-hover:w-full transition-all duration-300 rounded-full" />
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full flex items-center justify-center
                       text-[var(--color-muted)] hover:text-navy-500 dark:hover:text-navy-300
                       hover:bg-navy-50 dark:hover:bg-navy-800 transition-all"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </motion.button>

          {/* Contact CTA (desktop) */}
          <motion.button
            onClick={() => {
              if (location.pathname === '/') {
                scrollTo('#contact')
              } else {
                navigate('/')
                setTimeout(() => scrollTo('#contact'), 300)
              }
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:block px-4 py-2 text-xs font-semibold rounded-full
                       bg-navy-500 dark:bg-navy-400 text-white hover:bg-forest-500 transition-colors duration-300"
          >
            Hire Me
          </motion.button>

          {/* Hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center text-[var(--color-muted)]"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden glass border-t border-white/60 dark:border-white/8"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map(l => (
                <button
                  key={l.label}
                  onClick={() => handleNavClick(l)}
                  className="text-sm font-medium text-left text-[var(--color-muted)]
                             hover:text-navy-500 dark:hover:text-navy-300 transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setOpen(false)
                  if (location.pathname === '/') {
                    scrollTo('#contact')
                  } else {
                    navigate('/')
                    setTimeout(() => scrollTo('#contact'), 100)
                  }
                }}
                className="mt-1 w-full py-2.5 text-sm font-semibold rounded-full
                           bg-navy-500 text-white hover:bg-forest-500 transition-colors"
              >
                Hire Me
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
