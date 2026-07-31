'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Sparkles, Star, Heart } from 'lucide-react'

const ICONS = [GraduationCap, Sparkles, Star, Heart]

type Speck = {
  id: number
  left: number
  size: number
  delay: number
  duration: number
  drift: number
  Icon: (typeof ICONS)[number]
  color: string
}

export function FloatingDecor() {
  const [specks] = useState<Speck[]>(() => {
    const colors = ['text-primary/40', 'text-accent/50', 'text-primary/25']
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 22,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 10,
      drift: (Math.random() - 0.5) * 80,
      Icon: ICONS[i % ICONS.length],
      color: colors[i % colors.length],
    }))
  })

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {specks.map((s) => (
        <motion.div
          key={s.id}
          className={`absolute ${s.color}`}
          style={{ left: `${s.left}%`, bottom: -40 }}
          initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: [0, -900],
            x: [0, s.drift],
            opacity: [0, 1, 1, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <s.Icon style={{ width: s.size, height: s.size }} />
        </motion.div>
      ))}
    </div>
  )
}
