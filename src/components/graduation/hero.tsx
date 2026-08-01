'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, PartyPopper, Heart, HandHeart, Images, ChevronDown } from 'lucide-react'
import { graduate, portrait } from '@/lib/celebration-data'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
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
        className="text-balance text-[2.1rem] font-extrabold leading-[1.05] tracking-tight min-[420px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
      >
        <span className="text-foreground">Congratulations,</span>
        <span className="text-gradient animate-shimmer mt-2 block font-[family-name:var(--font-cormorant)] font-semibold tracking-normal">
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
        className="relative mt-10"
      >
        <div
          aria-hidden
          className="absolute -inset-6 rounded-[2rem] bg-primary/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full max-w-[480px] sm:max-w-[620px] lg:max-w-[700px]"
        >
          {/* portrait sits inside the frame's transparent opening */}
          <div
            className="absolute z-0 overflow-hidden rounded-sm"
            style={{ top: '26.5%', bottom: '23.5%', left: '29.5%', right: '30%' }}
          >
            <Image
              src={portrait.src}
              alt={`Portrait of ${graduate.fullName} in graduation cap and gown`}
              fill
              priority
              sizes="(min-width: 1024px) 700px, (min-width: 640px) 620px, 100vw"
              className="object-cover"
              style={{ objectPosition: portrait.objectPosition }}
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
        className="glass mt-12 max-w-2xl rounded-2xl border border-accent/30 p-6 sm:p-8"
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
        className="mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3"
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

      <button
        type="button"
        onClick={() => scrollTo('achievements')}
        className="mt-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Scroll to celebrate
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  )
}
