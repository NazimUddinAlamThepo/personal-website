import { useScrollProgress } from '../hooks/useScrollProgress'
import { motion }             from 'framer-motion'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] h-[3px] origin-left"
      style={{
        scaleX: progress / 100,
        background: 'linear-gradient(90deg, #1a3a6b, #0d6b3a)',
        width: '100%',
      }}
    />
  )
}
