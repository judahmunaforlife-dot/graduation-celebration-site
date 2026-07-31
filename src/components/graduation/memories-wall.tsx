'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderHeart, X } from 'lucide-react'
import { memories } from '@/lib/celebration-data'
import { SectionHeading } from './section-heading'

export function MemoriesWall() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="memories" className="mx-auto max-w-6xl px-4 py-24">
      {/* celebration continues banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        className="glass mx-auto mb-16 max-w-2xl rounded-3xl border border-accent/30 p-8 text-center"
      >
        <h3 className="text-2xl font-bold text-gradient">
          The celebration continues
        </h3>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          A new chapter begins, but the memories we made along the way stay with
          us forever. Here is a glimpse of the journey.
        </p>
      </motion.div>

      <SectionHeading
        icon={FolderHeart}
        title="Memories Wall"
        subtitle="A glimpse into the beautiful moments, laughs, and stories we share."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {memories.map((m, i) => (
          <motion.button
            type="button"
            key={m.src}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-2xl border-2 border-accent/40 bg-card p-2 text-left shadow-xl shadow-primary/10"
          >
            <div className="overflow-hidden rounded-xl">
              <Image
                src={m.src || '/placeholder.svg'}
                alt={m.caption}
                width={500}
                height={620}
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-x-2 bottom-2 rounded-xl bg-gradient-to-t from-background/95 to-transparent p-4 pt-10">
              <p className="text-sm font-semibold text-foreground">
                {m.caption}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg overflow-hidden rounded-2xl border-4 border-accent/60 bg-card p-3"
            >
              <Image
                src={memories[active].src || '/placeholder.svg'}
                alt={memories[active].caption}
                width={640}
                height={800}
                className="max-h-[70vh] w-auto rounded-xl object-contain"
              />
              <p className="mt-3 text-center font-semibold text-foreground">
                {memories[active].caption}
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="glass absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
