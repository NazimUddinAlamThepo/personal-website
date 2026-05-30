import HeroContent from './HeroContent'

export default function Hero() {
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

      <HeroContent
        nameClassName="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight mb-6"
        roleClassName="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 text-lg sm:text-xl text-[var(--color-muted)] font-medium mb-4"
        taglineClassName="text-base text-[var(--color-muted)] mb-11 font-light italic font-serif"
        primaryButtonClassName="px-8 py-3.5 rounded-full bg-navy-500 dark:bg-navy-800 text-white text-sm font-semibold shadow-lg shadow-navy-500/25 hover:bg-forest-500 transition-all duration-300 cursor-pointer"
        secondaryButtonClassName="px-8 py-3.5 rounded-full border-2 border-navy-500/30 dark:border-navy-400/30 text-navy-500 dark:text-navy-300 text-sm font-semibold hover:bg-navy-500 hover:text-white dark:hover:bg-navy-400 transition-all duration-300 cursor-pointer"
        socialButtonClassName="w-11 h-11 rounded-full flex items-center justify-center text-[var(--color-muted)] hover:text-navy-500 dark:hover:text-navy-300 glass-card transition-all duration-300"
        scrollClassName="absolute bottom-10 flex flex-col items-center gap-2 text-[var(--color-muted)] hover:text-navy-500 transition-colors cursor-pointer"
        scrollTo="/about"
        scrollLabel="Go to About"
      />
    </section>
  )
}
