'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { achievements } from '@/lib/celebration-data'
import { SectionHeading } from './section-heading'

export function JourneyTimeline() {
  return (
    <section id="journey" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        icon={Sparkles}
        title="The Journey So Far"
        subtitle="Every milestone became part of the story worth celebrating today."
      />
      <div className="relative mx-auto mt-12 max-w-3xl">
        <div aria-hidden className="absolute bottom-4 left-4 top-4 w-px bg-gradient-to-b from-primary via-accent to-primary sm:left-1/2 sm:-translate-x-1/2" />
        <div className="space-y-8">
          {achievements.map((achievement, index) => (
            <motion.article
              key={`${achievement.year}-${achievement.title}`}
              initial={{ opacity: 0, x: index % 2 ? 24 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45 }}
              className={`relative pl-12 sm:w-[calc(50%-2rem)] sm:pl-0 ${
                index % 2 === 0 ? 'sm:mr-auto sm:pr-10 sm:text-right' : 'sm:ml-auto sm:pl-10'
              }`}
            >
              <span className="absolute left-[9px] top-6 flex h-3 w-3 rounded-full border-2 border-background bg-accent shadow-[0_0_0_5px_color-mix(in_oklch,var(--accent)_20%,transparent)] sm:hidden" />
              <span className={`absolute left-[9px] top-6 hidden h-3 w-3 rounded-full border-2 border-background bg-accent sm:block ${index % 2 === 0 ? 'sm:right-[-38px]' : 'sm:left-[-38px]'}`} />
              <div className="glass rounded-2xl border border-border p-5 shadow-lg shadow-primary/5">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary">{achievement.year}</p>
                <h3 className="mt-2 text-lg font-bold text-foreground">{achievement.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{achievement.detail}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
