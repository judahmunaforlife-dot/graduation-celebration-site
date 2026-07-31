'use client'

import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

type Props = {
  icon: LucideIcon
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}

export function SectionHeading({
  icon: Icon,
  title,
  subtitle,
  align = 'center',
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={align === 'center' ? 'text-center' : 'text-left'}
    >
      <h2
        className={`flex items-center gap-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <Icon className="h-8 w-8 text-accent" />
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-pretty text-muted-foreground ${
            align === 'center' ? 'mx-auto max-w-xl' : 'max-w-md'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
