import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Mail, Phone, GraduationCap } from 'lucide-react'
import { personal } from '../data/portfolioData'

const containerVariants = {
  hidden: {},
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
            {/* Avatar placeholder */}
            <div className="glass-card rounded-2xl p-6 flex items-center gap-5">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0
                           bg-gradient-to-br from-navy-500 to-forest-500 text-white font-serif text-3xl font-bold"
              >
                N
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-[var(--color-text)]">{personal.fullName}</h3>
                <p className="text-sm text-[var(--color-muted)] mt-0.5">{personal.title}</p>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-[var(--color-muted)]">
                  <MapPin size={12} />
                  {personal.location}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="glass-card rounded-2xl p-6">
              <h4 className="font-semibold text-sm text-navy-500 dark:text-navy-300 uppercase tracking-wider mb-3">
                Bio
              </h4>
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                {personal.about}
              </p>
            </div>
          </motion.div>

          {/* Right – contact info */}
          <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
            <h4 className="font-semibold text-sm text-navy-500 dark:text-navy-300 uppercase tracking-wider mb-4">
              Quick Info
            </h4>
            <InfoRow icon={<Mail size={15}/>}          label="Email"      value={personal.email} />
            <InfoRow icon={<Phone size={15}/>}         label="Phone"      value={personal.phone} />
            <InfoRow icon={<MapPin size={15}/>}        label="Location"   value={personal.location} />
            <InfoRow icon={<GraduationCap size={15}/>} label="University" value={personal.university} />
            <InfoRow icon={<span className="text-base">🌐</span>} label="Languages" value="Bangla (Native) · English (Professional)" />
            <InfoRow icon={<span className="text-base">💼</span>} label="Status"    value="Open to Internships & Collaborations" />

            {/* Download CV button */}
            <a
              href="/cv.pdf"
              download
              className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-xl
                         bg-navy-500 dark:bg-navy-400 text-white text-sm font-semibold
                         hover:bg-forest-500 transition-colors duration-300"
            >
              Download CV
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
