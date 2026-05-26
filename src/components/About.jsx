import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Mail, Phone, GraduationCap, Download } from 'lucide-react'
import { personal } from '../data/portfolioData'

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-navy-50 dark:border-navy-800/40 last:border-0">
      <span className="mt-0.5 text-navy-400 dark:text-navy-300 shrink-0">{icon}</span>
      <div>
        <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-medium text-[var(--color-text)]">{value}</p>
      </div>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="section-pad bg-[var(--color-bg)]">
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
            Who I am
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[var(--color-text)]">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-10 items-start"
        >
          {/* Left – summary */}
          <motion.div variants={itemVariants} className="space-y-6">

            {/* Profile card */}
            <div className="glass-card rounded-2xl p-6 flex items-center gap-5">
              {/* Animated avatar */}
              <div className="relative flex-shrink-0">
                {/* Outer pulse ring */}
                <motion.div
                  animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute -inset-2 rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, rgba(26,58,107,0.25), rgba(13,107,58,0.25))' }}
                />
                {/* Middle ring */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1], opacity: [0.6, 0.3, 0.6] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 0.5, ease: 'easeInOut' }}
                  className="absolute -inset-1 rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, rgba(26,58,107,0.3), rgba(13,107,58,0.3))' }}
                />
                {/* Avatar */}
                <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center
                                bg-gradient-to-br from-navy-500 to-forest-500
                                text-white font-serif text-3xl font-bold shadow-lg shadow-navy-500/30">
                  N
                </div>
                {/* Status dot */}
                <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-forest-400
                                border-2 border-white dark:border-[var(--color-bg)]
                                flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl font-semibold text-[var(--color-text)]">{personal.fullName}</h3>
                <p className="text-sm text-[var(--color-muted)] mt-0.5">{personal.title}</p>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-[var(--color-muted)]">
                  <MapPin size={12} />
                  {personal.location}
                </div>
                {/* Mini status badge */}
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                                bg-forest-50 dark:bg-forest-900/20 border border-forest-200 dark:border-forest-800/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse" />
                  <span className="text-[10px] font-semibold text-forest-600 dark:text-forest-400 uppercase tracking-wide">
                    Available for hire
                  </span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-2xl p-6"
            >
              <h4 className="font-semibold text-xs text-navy-500 dark:text-navy-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-gradient-to-r from-navy-500 to-forest-500 rounded-full" />
                Bio
              </h4>
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                {personal.about}
              </p>
            </motion.div>
          </motion.div>

          {/* Right – contact info */}
          <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
            <h4 className="font-semibold text-xs text-navy-500 dark:text-navy-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-gradient-to-r from-navy-500 to-forest-500 rounded-full" />
              Quick Info
            </h4>
            <InfoRow icon={<Mail size={15}/>}          label="Email"      value={personal.email} />
            <InfoRow icon={<Phone size={15}/>}         label="Phone"      value={personal.phone} />
            <InfoRow icon={<MapPin size={15}/>}        label="Location"   value={personal.location} />
            <InfoRow icon={<GraduationCap size={15}/>} label="University" value={personal.university} />
            <InfoRow icon={<span className="text-base">🌐</span>} label="Languages" value="Bangla (Native) · English (Professional)" />
            <InfoRow icon={<span className="text-base">💼</span>} label="Status"    value="Open to Internships & Collaborations" />

            {/* Download CV */}
            <motion.a
              href="/cv.pdf"
              download
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-xl
                         bg-navy-500 dark:bg-navy-400 text-white text-sm font-semibold
                         hover:bg-forest-500 transition-colors duration-300 shadow-lg shadow-navy-500/20"
            >
              <Download size={15} /> Download CV
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
