import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, ArrowDown, Code2, Cpu, Zap, Database, Smartphone, BarChart3 } from 'lucide-react'
import { personal } from '../data/portfolioData'

const ROLES = [
  'Frontend Developer',
  'ML Researcher',
  'React Engineer',
  'Full-Stack Builder',
]

const TECH_ICONS = [
  { Icon: Code2, label: 'Code' },
  { Icon: Cpu, label: 'AI' },
  { Icon: Zap, label: 'Speed' },
  { Icon: Database, label: 'Data' },
  { Icon: Smartphone, label: 'Mobile' },
  { Icon: BarChart3, label: 'Analytics' },
]

function TypewriterRoles() {
  const [idx,   setIdx]   = useState(0)
  const [text,  setText]  = useState('')
  const [phase, setPhase] = useState('typing')

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

export default function GalaxyAnimation({ dark = true }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !dark) return

    const ctx = canvas.getContext('2d')
    let animationId

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Grid-based floating nodes across entire canvas
    const nodes = []
    const gridSize = 5
    const spacing = canvas.width / (gridSize + 1)
    
    for (let i = 1; i <= gridSize; i++) {
      for (let j = 1; j <= gridSize; j++) {
        nodes.push({
          baseX: i * spacing,
          baseY: j * spacing,
          x: i * spacing,
          y: j * spacing,
          offsetX: Math.random() * 40 - 20,
          offsetY: Math.random() * 40 - 20,
          size: 2 + Math.random() * 1.5,
          pulsePhase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        })
      }
    }

    // Flowing particles
    const floatingParticles = []
    for (let i = 0; i < 30; i++) {
      floatingParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        life: Math.random() * 0.8 + 0.2,
        maxLife: 1,
      })
    }

    let time = 0
    const isDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches

    const animate = () => {
      time += 0.008

      // Clear with exact theme-aware background
      const bgColor = isDarkMode() ? 'rgba(10, 15, 31, 1)' : '#faf8f5'
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const isDark = isDarkMode()

      // Only draw animations in dark mode
      if (isDark) {
        const nodeColor = '#6a90d1'
        const lineColor = 'rgba(124, 163, 224, 0.2)'
        const accentColor = '#8b7dd8'

        // ==== LAYER 1: Flowing wavy lines ====
        ctx.strokeStyle = 'rgba(124, 163, 224, 0.08)'
        ctx.lineWidth = 0.5
        for (let i = 0; i < 4; i++) {
          ctx.beginPath()
          ctx.moveTo(0, (canvas.height / 4.5) * (i + 1) + Math.sin(time * 0.1 + i) * 40)
          ctx.lineTo(canvas.width, (canvas.height / 4.5) * (i + 1) + Math.sin(time * 0.1 + i + 5) * 40)
          ctx.stroke()
        }

        // ==== LAYER 2: Vertical flowing lines ====
        for (let i = 0; i < 5; i++) {
          ctx.beginPath()
          ctx.moveTo((canvas.width / 6) * (i + 1) + Math.cos(time * 0.12 + i) * 30, 0)
          ctx.lineTo((canvas.width / 6) * (i + 1) + Math.cos(time * 0.12 + i) * 30, canvas.height)
          ctx.stroke()
        }

        // ==== LAYER 3: Rotating concentric circles ====
        const circles = [
          { x: canvas.width * 0.25, y: canvas.height * 0.3, maxR: 120 },
          { x: canvas.width * 0.75, y: canvas.height * 0.35, maxR: 100 },
          { x: canvas.width * 0.5, y: canvas.height * 0.7, maxR: 140 },
        ]
        
        circles.forEach((circle, idx) => {
          for (let ring = 1; ring <= 3; ring++) {
            const radius = (circle.maxR / 3) * ring + Math.sin(time * 0.15 + idx) * 20
            ctx.strokeStyle = `rgba(124, 163, 224, ${0.1 - ring * 0.03})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.arc(circle.x, circle.y, radius, 0, Math.PI * 2)
            ctx.stroke()
          }
        })

        // ==== LAYER 4: Mesh network nodes with enhanced glow ====
        nodes.forEach((node, i) => {
          const waveX = Math.sin(time * 0.15 + i * 0.3) * 40
          const waveY = Math.cos(time * 0.12 + i * 0.25) * 40
          
          node.x = node.baseX + node.offsetX + waveX
          node.y = node.baseY + node.offsetY + waveY

          // Draw connecting lines to nearby nodes
          nodes.slice(i + 1).forEach(other => {
            const dx = other.x - node.x
            const dy = other.y - node.y
            const dist = Math.hypot(dx, dy)
            
            if (dist < 200) {
              const opacity = (1 - dist / 200) * 0.3
              ctx.strokeStyle = `rgba(124, 163, 224, ${opacity})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(other.x, other.y)
              ctx.stroke()
            }
          })

          // Draw outer glow
          node.pulsePhase += 0.04
          const pulseSize = node.size * (1 + 0.4 * Math.sin(node.pulsePhase))
          
          const outerGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize * 4)
          outerGradient.addColorStop(0, `${nodeColor}30`)
          outerGradient.addColorStop(0.5, `${nodeColor}15`)
          outerGradient.addColorStop(1, `${nodeColor}00`)
          ctx.fillStyle = outerGradient
          ctx.beginPath()
          ctx.arc(node.x, node.y, pulseSize * 4, 0, Math.PI * 2)
          ctx.fill()

          // Draw middle glow
          const midGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize * 2)
          midGradient.addColorStop(0, `${nodeColor}50`)
          midGradient.addColorStop(1, `${nodeColor}00`)
          ctx.fillStyle = midGradient
          ctx.beginPath()
          ctx.arc(node.x, node.y, pulseSize * 2, 0, Math.PI * 2)
          ctx.fill()

          // Inner solid node with accent color
          ctx.fillStyle = nodeColor
          ctx.globalAlpha = 0.9
          ctx.beginPath()
          ctx.arc(node.x, node.y, pulseSize * 0.7, 0, Math.PI * 2)
          ctx.fill()

          // Accent core
          ctx.fillStyle = accentColor
          ctx.globalAlpha = 0.6
          ctx.beginPath()
          ctx.arc(node.x, node.y, pulseSize * 0.35, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalAlpha = 1.0
        })

        // ==== LAYER 5: High-energy floating particles ====
        floatingParticles.forEach((particle, i) => {
          particle.x += particle.vx
          particle.y += particle.vy
          particle.life -= 0.008

          // Wrap around screen
          if (particle.x < -10) particle.x = canvas.width + 10
          if (particle.x > canvas.width + 10) particle.x = -10
          if (particle.y < -10) particle.y = canvas.height + 10
          if (particle.y > canvas.height + 10) particle.y = -10

          const opacity = particle.life / particle.maxLife * 0.5
          
          // Outer glow
          const glowGradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)
          glowGradient.addColorStop(0, `rgba(139, 125, 216, ${opacity * 0.6})`)
          glowGradient.addColorStop(1, 'rgba(139, 125, 216, 0)')
          ctx.fillStyle = glowGradient
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
          ctx.fill()

          // Core particle
          ctx.fillStyle = `rgba(124, 163, 224, ${opacity})`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()

          // Regenerate when faded
          if (particle.life <= 0) {
            particle.x = Math.random() * canvas.width
            particle.y = Math.random() * canvas.height
            particle.vx = (Math.random() - 0.5) * 0.3
            particle.vy = (Math.random() - 0.5) * 0.3
            particle.life = particle.maxLife
            particle.size = Math.random() * 1.5 + 0.5
          }
        })

        // ==== LAYER 6: Radial depth effects ====
        const gradients = [
          { x: canvas.width * 0.2, y: canvas.height * 0.3, r: 300 },
          { x: canvas.width * 0.8, y: canvas.height * 0.7, r: 350 },
          { x: canvas.width * 0.5, y: canvas.height * 0.1, r: 250 },
          { x: canvas.width * 0.15, y: canvas.height * 0.85, r: 280 },
        ]

        gradients.forEach((grad, idx) => {
          const g = ctx.createRadialGradient(grad.x, grad.y, 0, grad.x, grad.y, grad.r)
          g.addColorStop(0, 'rgba(106, 144, 209, 0.08)')
          g.addColorStop(1, 'rgba(139, 125, 216, 0)')
          ctx.fillStyle = g
          ctx.fillRect(grad.x - grad.r, grad.y - grad.r, grad.r * 2, grad.r * 2)
        })
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Light mode animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dark) return

    const ctx = canvas.getContext('2d')
    let animationId
    let time = 0

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Create floating orbs for light mode
    const orbs = Array.from({ length: 6 }, (_, i) => ({
      x: (i + 1) * (canvas.width / 7),
      y: Math.random() * canvas.height,
      size: 40 + Math.random() * 60,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      color: ['rgba(59, 130, 246', 'rgba(99, 102, 241', 'rgba(139, 92, 246', 'rgba(168, 85, 247'][i % 4],
      opacity: 0.1 + Math.random() * 0.1,
    }))

    const animate = () => {
      time += 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      bgGradient.addColorStop(0, 'rgba(248, 250, 252, 0)')
      bgGradient.addColorStop(0.5, 'rgba(226, 232, 240, 0.03)')
      bgGradient.addColorStop(1, 'rgba(203, 213, 225, 0)')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw floating orbs with soft glow
      orbs.forEach((orb, idx) => {
        orb.x += orb.vx
        orb.y += orb.vy

        // Wrap around
        if (orb.x < -orb.size) orb.x = canvas.width + orb.size
        if (orb.x > canvas.width + orb.size) orb.x = -orb.size
        if (orb.y < -orb.size) orb.y = canvas.height + orb.size
        if (orb.y > canvas.height + orb.size) orb.y = -orb.size

        // Sine wave vertical motion
        const wave = Math.sin(time * 0.01 + idx) * 30
        const currentY = orb.y + wave

        // Outer soft glow
        const outerGlow = ctx.createRadialGradient(orb.x, currentY, 0, orb.x, currentY, orb.size * 2)
        outerGlow.addColorStop(0, `${orb.color}, ${orb.opacity * 0.6})`)
        outerGlow.addColorStop(0.5, `${orb.color}, ${orb.opacity * 0.2})`)
        outerGlow.addColorStop(1, `${orb.color}, 0)`)
        ctx.fillStyle = outerGlow
        ctx.beginPath()
        ctx.arc(orb.x, currentY, orb.size * 2, 0, Math.PI * 2)
        ctx.fill()

        // Middle glow
        const midGlow = ctx.createRadialGradient(orb.x, currentY, 0, orb.x, currentY, orb.size)
        midGlow.addColorStop(0, `${orb.color}, ${orb.opacity})`)
        midGlow.addColorStop(1, `${orb.color}, 0)`)
        ctx.fillStyle = midGlow
        ctx.beginPath()
        ctx.arc(orb.x, currentY, orb.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationId)
    }
  }, [dark])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden 
                 bg-[var(--color-bg)] dark:bg-[var(--color-bg)]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {dark && (
        <div className="absolute inset-0 dark:from-blue-950/20 dark:via-transparent dark:to-blue-950/10 pointer-events-none" />
      )}

      {/* Content overlay */}
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
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight mb-6
                     text-[var(--color-text)] dark:text-white"
        >
          <span className="text-blue-600 dark:text-blue-300">Md. </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 
                          dark:from-blue-400 dark:to-purple-400">
            Nazimuddin
          </span>
          <br />
          <span className="text-blue-600 dark:text-blue-300">Alam </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600
                          dark:from-blue-400 dark:to-purple-400">
            Thepo
          </span>
        </motion.h1>

        {/* Typewriter role row */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1
                     text-lg sm:text-xl text-blue-700 dark:text-blue-200 font-medium mb-4"
          style={{ minHeight: '2rem' }}
        >
          <TypewriterRoles />
          <span className="text-blue-500 dark:text-blue-300 select-none">·</span>
          <span>CSE @ RUET</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          {...fadeUp(0.38)}
          className="text-base text-blue-700 dark:text-blue-200 mb-11 font-light italic font-serif"
        >
          "{personal.heroTagline}"
        </motion.p>

        {/* CTA buttons */}
        <motion.div {...fadeUp(0.48)} className="flex flex-wrap gap-4 justify-center mb-12">
          <Link to="/about">
            <motion.div
              whileHover={{ scale: 1.06, y: -3, boxShadow: '0 20px 40px rgba(59,130,246,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full bg-blue-600 dark:bg-blue-500 text-white
                         text-sm font-semibold shadow-lg shadow-blue-500/40 hover:bg-blue-700 dark:hover:bg-purple-600 
                         transition-all duration-300 cursor-pointer"
            >
              View Profile
            </motion.div>
          </Link>
          <Link to="/contact">
            <motion.div
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full border-2 border-blue-600 dark:border-blue-400
                         text-blue-700 dark:text-blue-200 text-sm font-semibold
                         hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer"
            >
              Contact Me
            </motion.div>
          </Link>
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
                         text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 
                         backdrop-blur-sm bg-blue-500/10 dark:bg-blue-500/20 
                         transition-all duration-300 border border-blue-400/40 dark:border-blue-400/30"
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <Link to="/#about-home">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-10 flex flex-col items-center gap-2
                     text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 transition-colors cursor-pointer"
          aria-label="Scroll down"
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
    </section>
  )
}
