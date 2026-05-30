import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { personal } from '../data/portfolioData'

const links = [
  { label: 'Home',           route: '/'               },
  { label: 'About',          route: '/about'          },
  { label: 'Skills',         route: '/skills'         },
  { label: 'Projects',       route: '/projects'       },
  { label: 'Education',      route: '/education'      },
  { label: 'Research',       route: '/research'       },
  { label: 'Certifications', route: '/certifications' },
  { label: 'Learning',       route: '/learning'       },
  { label: 'Deep Focus',     route: '/deep-focus'     },
  { label: 'Contact',        route: '/contact'        },
]

// Active link style helper for NavLink className prop
const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors duration-200 relative group
   ${isActive
     ? 'text-navy-600 dark:text-navy-300 font-semibold'
     : 'text-navy-700 dark:text-slate-300 hover:text-navy-600 dark:hover:text-navy-300'}`

export default function Navbar({ dark, toggle }) {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const navigate = useNavigate()

  function isActiveFocusSession() {
    try {
      const raw = localStorage.getItem('deep-focus-active-session')
      if (!raw) return false
      const parsed = JSON.parse(raw)
      return parsed?.status === 'running'
    } catch {
      return false
    }
  }

  const handleNavClick = (event, route) => {
    if (typeof window === 'undefined') return
    if (isActiveFocusSession()) {
      event.preventDefault()
      setOpen(false)
      navigate('/deep-focus/active')
      return
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu whenever a link is clicked
  const closeMenu = () => setOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? 'backdrop-blur-md bg-white/70 dark:bg-blue-950/40 border-b border-navy-200 dark:border-white/8 shadow-sm py-3'
          : 'bg-transparent py-5'}`}
    >
      <div className="container-wide px-4 sm:px-8 lg:px-16 flex items-center justify-between">

        {/* Logo */}
        <div className="inline-block">
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="font-serif text-xl font-semibold inline-block"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="text-gradient hover:brightness-110 transition-all duration-200 cursor-pointer"
            >
              {personal.shortName}
              <span className="text-forest-500 dark:text-forest-400">.</span>
            </motion.div>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <NavLink
              key={l.label}
              to={l.route}
              onClick={(e) => handleNavClick(e, l.route)}
              className={navLinkClass}
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-navy-500 dark:bg-navy-300
                               group-hover:w-full transition-all duration-300 rounded-full" />
            </NavLink>
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
                       text-navy-600 dark:text-slate-300 hover:text-navy-700 dark:hover:text-navy-300
                       hover:bg-navy-100 dark:hover:bg-navy-800 transition-all"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </motion.button>

          {/* Hire Me CTA (desktop) */}
          <NavLink
            to="/contact"
            className="hidden md:block px-4 py-2 text-xs font-semibold rounded-full
                       bg-navy-600 dark:bg-navy-500 text-white hover:bg-navy-700 dark:hover:bg-navy-600 transition-colors duration-300"
          >
            Hire Me
          </NavLink>

          {/* Hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center text-navy-600 dark:text-slate-300"
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
            className="md:hidden overflow-hidden backdrop-blur-md bg-white/80 dark:bg-blue-950/50 border-t border-navy-200 dark:border-white/8"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map(l => (
                <NavLink
                  key={l.label}
                  to={l.route}
                  onClick={(e) => { handleNavClick(e, l.route); closeMenu() }}
                  className={({ isActive }) =>
                    `text-sm font-medium py-2.5 px-3 rounded-lg transition-all duration-200
                     ${isActive
                       ? 'text-navy-600 dark:text-navy-300 bg-navy-100 dark:bg-navy-800/40 font-semibold'
                        : 'text-navy-700 dark:text-slate-300 hover:text-navy-600 dark:hover:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-800/20'}`
                        }
                      >
                  {l.label}
                </NavLink>
              ))}

              <NavLink
                to="/contact"
                onClick={closeMenu}
                className="mt-2 w-full py-2.5 text-sm font-semibold rounded-full text-center text-white
                           bg-navy-600 dark:bg-navy-500 hover:bg-navy-700 dark:hover:bg-navy-600 transition-colors"
              >
                Hire Me
              </NavLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
