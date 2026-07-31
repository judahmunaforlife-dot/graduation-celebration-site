'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, PartyPopper, Heart, HandHeart, Images } from 'lucide-react'
import { graduate } from '@/lib/celebration-data'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass mb-8 inline-flex items-center gap-2 rounded-full border border-accent/40 px-4 py-1.5 text-sm font-medium text-accent"
      >
        <Sparkles className="h-4 w-4" />
        {graduate.date}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
      >
        <span className="text-foreground">Congratulations,</span>
        <span className="text-gradient animate-shimmer mt-2 block">
          {graduate.fullName}
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring' }}
        className="my-6"
      >
        <PartyPopper className="mx-auto h-12 w-12 text-accent" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        Today we celebrate your dedication, your late nights, and every hard-won
        step. You earned this — {graduate.degree}, {graduate.school}.
      </motion.p>

      {/* Framed graduate portrait */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="relative mt-12"
      >
        <div
          aria-hidden
          className="absolute -inset-6 rounded-[2rem] bg-primary/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-[300px] sm:w-[360px]"
        >
          {/* portrait sits inside the frame's transparent opening */}
          <div
            className="absolute z-0 overflow-hidden rounded-sm"
            style={{ top: '19%', bottom: '19.5%', left: '28.5%', right: '28%' }}
          >
            <Image
              src="/graduate-portrait.png"
              alt={`Portrait of ${graduate.fullName} in graduation cap and gown`}
              fill
              priority
              sizes="360px"
              className="object-cover"
            />
          </div>
          {/* carved gold frame overlay */}
          <Image
            src="/gold-frame.png"
            alt=""
            aria-hidden
            width={720}
            height={720}
            priority
            className="pointer-events-none relative z-10 h-auto w-full drop-shadow-2xl"
          />
          <div className="bg-grad-primary absolute -bottom-2 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full px-5 py-1.5 text-sm font-bold text-primary-foreground shadow-lg">
            {graduate.degree}
          </div>
        </motion.div>
      </motion.div>

      {/* Quote card */}
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass mt-16 max-w-2xl rounded-2xl border border-accent/30 p-6 sm:p-8"
      >
        <p className="text-pretty text-base italic leading-relaxed text-foreground/90 sm:text-lg">
          “{graduate.quote}”
        </p>
      </motion.blockquote>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <button
          type="button"
          onClick={() => scrollTo('moments')}
          className="bg-grad-primary flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
        >
          <Heart className="h-5 w-5" />
          Leave a Moment
        </button>
        <button
          type="button"
          onClick={() => scrollTo('blessings')}
          className="glass flex items-center gap-2 rounded-full border border-accent/40 px-6 py-3 font-semibold text-foreground transition-transform hover:scale-105"
        >
          <HandHeart className="h-5 w-5 text-accent" />
          Add a Blessing
        </button>
        <button
          type="button"
          onClick={() => scrollTo('memories')}
          className="glass flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 font-semibold text-foreground transition-transform hover:scale-105"
        >
          <Images className="h-5 w-5 text-primary" />
          View Memories
        </button>
      </motion.div>
    </section>
  )
}
