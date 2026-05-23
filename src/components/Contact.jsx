import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Mail, Phone, MapPin, MessageCircle, Github, Linkedin } from 'lucide-react'
import { personal } from '../data/portfolioData'

// ── If you have EmailJS set up, replace these with your real IDs ──
const EMAILJS_SERVICE  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE = 'YOUR_TEMPLATE_ID'
const EMAILJS_KEY      = 'YOUR_PUBLIC_KEY'

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' })
  const [status,  setStatus]  = useState('idle') // idle | sending | sent | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    // ── Option A: EmailJS (requires @emailjs/browser installed) ──
    // try {
    //   await import('@emailjs/browser').then(({ default: emailjs }) =>
    //     emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, form, EMAILJS_KEY))
    //   setStatus('sent')
    //   setForm({ name: '', email: '', subject: '', message: '' })
    // } catch { setStatus('error') }

    // ── Option B: FormSubmit.co (no account needed) ──
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${personal.email}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify({ ...form, _subject: `Portfolio contact: ${form.subject}` }),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  const inputClass = `w-full rounded-xl px-4 py-3 text-sm
    bg-white/60 dark:bg-white/5
    border border-navy-100 dark:border-navy-700/40
    text-[var(--color-text)] placeholder:text-[var(--color-muted)]
    focus:outline-none focus:ring-2 focus:ring-navy-400/40 dark:focus:ring-navy-500/40
    transition-all duration-200`

  return (
    <section id="contact" className="section-pad bg-[var(--color-surface)] dark:bg-[#0d111e]">
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
            Let's talk
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[var(--color-text)]">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="mt-4 text-sm text-[var(--color-muted)] max-w-md mx-auto">
            Whether you have an opportunity, a project idea, or just want to say hello — I'd love to hear from you.
          </p>
        </motion.div>

        {inView && (
          <div className="grid md:grid-cols-5 gap-8">

            {/* Left info panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2 space-y-5"
            >
              {/* Contact items */}
              {[
                { icon: <Mail size={16}/>,    label: 'Email',    value: personal.email,    href: `mailto:${personal.email}` },
                { icon: <Phone size={16}/>,   label: 'Phone',    value: personal.phone,    href: `tel:${personal.phone.replace(/\s/g,'')}` },
                { icon: <MapPin size={16}/>,  label: 'Location', value: personal.location, href: null },
              ].map(item => (
                <div key={item.label} className="glass-card rounded-2xl p-5 flex items-center gap-4">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center
                                   bg-navy-50 dark:bg-navy-800/40 text-navy-500 dark:text-navy-300 shrink-0">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider">{item.label}</p>
                    {item.href
                      ? <a href={item.href} className="text-sm font-medium text-[var(--color-text)] hover:text-navy-500 transition-colors">{item.value}</a>
                      : <p className="text-sm font-medium text-[var(--color-text)]">{item.value}</p>}
                  </div>
                </div>
              ))}

              {/* Social links */}
              <div className="glass-card rounded-2xl p-5">
                <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider mb-4">Follow & Connect</p>
                <div className="flex gap-3">
                  {[
                    { icon: <Github size={18}/>,          href: personal.github,   label: 'GitHub'    },
                    { icon: <Linkedin size={18}/>,        href: personal.linkedin, label: 'LinkedIn'  },
                    { icon: <MessageCircle size={18}/>,   href: personal.whatsapp, label: 'WhatsApp'  },
                  ].map(s => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      className="w-11 h-11 rounded-xl flex items-center justify-center
                                 bg-navy-50 dark:bg-navy-800/40 text-navy-500 dark:text-navy-300
                                 hover:bg-navy-500 hover:text-white dark:hover:bg-navy-400 transition-all duration-300"
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <motion.a
                href={personal.whatsapp}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                className="glass-card rounded-2xl p-5 flex items-center gap-4 group cursor-pointer
                           hover:border-forest-300 dark:hover:border-forest-700 transition-all duration-300"
              >
                <span className="text-2xl">💬</span>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text)] group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
                    Chat on WhatsApp
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">Quick response guaranteed</p>
                </div>
              </motion.a>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-3"
            >
              <div className="glass-card rounded-2xl p-7">
                {status === 'sent' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-14 gap-4 text-center"
                  >
                    <span className="text-5xl">✅</span>
                    <h4 className="font-semibold text-lg text-[var(--color-text)]">Message Sent!</h4>
                    <p className="text-sm text-[var(--color-muted)]">Thanks for reaching out. I'll reply as soon as possible.</p>
                    <button onClick={() => setStatus('idle')}
                            className="mt-2 text-xs text-navy-500 hover:underline">Send another</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-[var(--color-muted)] block mb-1.5">Name *</label>
                        <input name="name" value={form.name} onChange={handleChange} required
                               placeholder="Your name" className={inputClass} />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[var(--color-muted)] block mb-1.5">Email *</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} required
                               placeholder="your@email.com" className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[var(--color-muted)] block mb-1.5">Subject</label>
                      <input name="subject" value={form.subject} onChange={handleChange}
                             placeholder="What's this about?" className={inputClass} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[var(--color-muted)] block mb-1.5">Message *</label>
                      <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                                placeholder="Tell me about your project, idea, or opportunity..."
                                className={`${inputClass} resize-none`} />
                    </div>

                    {status === 'error' && (
                      <p className="text-xs text-red-500">Something went wrong. Please try again or email directly.</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3.5 rounded-xl bg-navy-500 dark:bg-navy-400 text-white
                                 text-sm font-semibold flex items-center justify-center gap-2
                                 hover:bg-forest-500 transition-colors duration-300 disabled:opacity-60"
                    >
                      {status === 'sending' ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <><Send size={15} /> Send Message</>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
