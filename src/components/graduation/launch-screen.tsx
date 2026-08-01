'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Rocket } from 'lucide-react'
import Image from 'next/image'
import { graduate, portrait } from '@/lib/celebration-data'

const LINES = [
  '> Initializing Graduation System...',
  '> Target Found ✅',
  `> Name: ${graduate.fullName}`,
  `> Achievement: ${graduate.degree}, ${graduate.school}`,
  `> Status: Officially A Graduate`,
  '> Celebration Mode: Ready!',
]

type Props = {
  onLaunch: () => void
}

export function LaunchScreen({ onLaunch }: Props) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (visibleLines >= LINES.length) return
    const t = setTimeout(() => setVisibleLines((n) => n + 1), 550)
    return () => clearTimeout(t)
  }, [visibleLines])

  const ready = visibleLines >= LINES.length

  const handleLaunch = () => {
    const end = Date.now() + 900
    const colors = ['#e857a4', '#f5b642', '#ffffff', '#c23b8f']
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
    setLeaving(true)
    setTimeout(onLaunch, 700)
  }

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background px-4"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]"
          />
          <Image
            src={portrait.src}
            alt=""
            fill
            priority
            aria-hidden
            className="pointer-events-none object-cover opacity-[0.08] blur-sm"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-background/75" />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="glass relative w-full max-w-xl rounded-3xl border border-primary/30 p-6 shadow-2xl shadow-primary/20 sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between gap-3 border-b border-border pb-4">
              <span className="min-w-0 truncate font-mono text-xs font-bold tracking-wider text-primary sm:text-base">
                {'>_ GRADUATION_LAUNCH.SH'}
              </span>
              <span className="flex shrink-0 gap-1.5">
                <span className="h-3 w-3 rounded-full bg-destructive/80" />
                <span className="h-3 w-3 rounded-full bg-accent" />
                <span className="h-3 w-3 rounded-full bg-primary" />
              </span>
            </div>

            <div className="min-h-[220px] space-y-3 break-words font-mono text-[13px] leading-relaxed sm:text-base">
              {LINES.slice(0, visibleLines).map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    i === 2
                      ? 'font-bold text-foreground'
                      : 'text-muted-foreground'
                  }
                >
                  {line}
                </motion.p>
              ))}
              {!ready && (
                <motion.span
                  className="inline-block h-4 w-2 bg-primary align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              )}
            </div>

            <AnimatePresence>
              {ready && (
                <motion.button
                  type="button"
                  onClick={handleLaunch}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-grad-primary mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/30"
                >
                  Launch Celebration
                  <Rocket className="h-5 w-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-muted-foreground">
            Made with 💛 for a special graduate
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
