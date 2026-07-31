'use client'

import { motion } from 'framer-motion'
import { Award, Trophy } from 'lucide-react'
import { achievements } from '@/lib/celebration-data'
import { SectionHeading } from './section-heading'

export function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        icon={Trophy}
        title="Achievements"
        subtitle="A journey full of milestones worth celebrating."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass group relative overflow-hidden rounded-2xl border border-border p-6"
          >
            <div
              aria-hidden
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition-colors group-hover:bg-primary/20"
            />
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent/40 bg-accent/10">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              {a.year}
            </span>
            <h3 className="mt-1 text-lg font-bold text-foreground">
              {a.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {a.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
