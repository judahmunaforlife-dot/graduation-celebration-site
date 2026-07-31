'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Music, VolumeX } from 'lucide-react'

/**
 * A gentle, continuously-looping instrumental synthesized with the Web Audio
 * API. A soft chord pad with a shimmering bell arpeggio on top. No external
 * audio file needed, so it always plays. Started by a user gesture (the
 * "Launch Celebration" button) to satisfy autoplay policies.
 */

// Warm, uplifting progression (root note frequencies, Hz).
const PROGRESSION = [
  [174.61, 220.0, 261.63], // F major-ish
  [130.81, 164.81, 196.0], // C major
  [196.0, 246.94, 293.66], // G major
  [220.0, 261.63, 329.63], // A minor
]
const BAR_SECONDS = 4

type Props = {
  active: boolean
}

export function BackgroundAudio({ active }: Props) {
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const barRef = useRef(0)
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)

  const scheduleBar = useCallback(() => {
    const ctx = ctxRef.current
    const master = masterRef.current
    if (!ctx || !master) return

    const now = ctx.currentTime
    const chord = PROGRESSION[barRef.current % PROGRESSION.length]

    // Pad: soft sustained sines for each chord tone.
    chord.forEach((freq) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      g.gain.setValueAtTime(0.0001, now)
      g.gain.linearRampToValueAtTime(0.09, now + 1.2)
      g.gain.linearRampToValueAtTime(0.0001, now + BAR_SECONDS)
      osc.connect(g).connect(master)
      osc.start(now)
      osc.stop(now + BAR_SECONDS + 0.1)
    })

    // Bell arpeggio: gentle triangle plucks over the octave above.
    const arp = [chord[0] * 2, chord[2] * 2, chord[1] * 2, chord[2] * 2]
    arp.forEach((freq, i) => {
      const t = now + i * (BAR_SECONDS / arp.length)
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.value = freq
      g.gain.setValueAtTime(0.0001, t)
      g.gain.linearRampToValueAtTime(0.05, t + 0.04)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1)
      osc.connect(g).connect(master)
      osc.start(t)
      osc.stop(t + 1.2)
    })

    barRef.current += 1
  }, [])

  // Start audio when the celebration launches.
  useEffect(() => {
    if (!active || ctxRef.current) return
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    if (!Ctx) return

    let cancelled = false
    const ctx = new Ctx()
    const master = ctx.createGain()
    master.gain.value = 0.6
    master.connect(ctx.destination)
    ctxRef.current = ctx
    masterRef.current = master

    const startAudio = async () => {
      await ctx.resume()
      if (cancelled) return

      setStarted(true)
      scheduleBar()
      intervalRef.current = setInterval(scheduleBar, BAR_SECONDS * 1000)
    }

    void startAudio()

    return () => {
      cancelled = true
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = null
      if (ctxRef.current === ctx) {
        ctxRef.current = null
        masterRef.current = null
      }
      void ctx.close()
    }
  }, [active, scheduleBar])

  const toggleMute = useCallback(() => {
    const master = masterRef.current
    const ctx = ctxRef.current
    if (!master || !ctx) return
    void ctx.resume()
    const next = !muted
    master.gain.setTargetAtTime(next ? 0.0001 : 0.6, ctx.currentTime, 0.05)
    setMuted(next)
  }, [muted])

  if (!started) return null

  return (
    <motion.button
      type="button"
      onClick={toggleMute}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={muted ? 'Unmute background music' : 'Mute background music'}
      className="glass fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 text-foreground shadow-lg shadow-primary/20"
    >
      {!muted && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-primary/50"
          animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      {muted ? (
        <VolumeX className="h-6 w-6 text-muted-foreground" />
      ) : (
        <Music className="h-6 w-6 text-primary" />
      )}
      <span className="sr-only">
        {muted ? 'Music is muted' : 'Music is playing'}
      </span>
    </motion.button>
  )
}
