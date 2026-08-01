'use client'

import { useState } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { LaunchScreen } from './launch-screen'
import { BackgroundAudio } from './background-audio'
import { FloatingDecor } from './floating-decor'
import { Hero } from './hero'
import { Achievements } from './achievements'
import { MomentsWall } from './moments-wall'
import { BlessingsWall } from './blessings-wall'
import { MemoriesWall } from './memories-wall'
import { ClosingLetter } from './closing-letter'
import { JourneyTimeline } from './journey-timeline'
import { EventRsvp } from './event-rsvp'
import { celebrationEvent } from '@/lib/celebration-data'

export function Celebration() {
  const [launched, setLaunched] = useState(false)

  const sections = [
    ['hero', 'Welcome'],
    ['achievements', 'Achievements'],
    ['journey', 'Journey'],
    ['moments', 'Moments'],
    ['blessings', 'Blessings'],
    ...(celebrationEvent.rsvpEnabled
      ? (([['event', 'Event details']] as const))
      : []),
    ['memories', 'Memories'],
  ] as const

  const goTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen overflow-x-hidden pb-28 md:pb-0">
      {!launched && <LaunchScreen onLaunch={() => setLaunched(true)} />}

      <BackgroundAudio active={launched} />

      <AnimatePresence>
        {launched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* ambient background glows */}
            <div
              aria-hidden
              className="pointer-events-none fixed inset-0 z-0"
            >
              <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[130px]" />
              <div className="absolute -right-40 top-1/2 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[130px]" />
            </div>

            <FloatingDecor />

            <nav
              aria-label="Celebration sections"
              className="glass fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 rounded-full border border-border p-2 md:flex md:flex-col md:gap-2 lg:right-5"
            >
              {sections.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => goTo(id)}
                  aria-label={`Go to ${label}`}
                  title={label}
                  className="group flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-muted-foreground transition-colors hover:bg-primary/15 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-current transition-transform group-hover:scale-125" />
                </button>
              ))}
            </nav>

            {/* Mobile bottom navigation */}
            <nav
              aria-label="Celebration sections"
              className="glass fixed bottom-4 left-1/2 z-40 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 rounded-full border border-border p-1.5 md:hidden"
            >
              <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {sections.map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => goTo(id)}
                    className="whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-primary/15 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </nav>

            <div className="relative z-10">
              <Hero />
              <SectionDivider />
              <Achievements />
              <SectionDivider />
              <JourneyTimeline />
              <SectionDivider />
              <MomentsWall />
              <SectionDivider />
              <BlessingsWall />
              <SectionDivider />
              {celebrationEvent.rsvpEnabled && (
                <>
                  <EventRsvp />
                  <SectionDivider />
                </>
              )}
              <MemoriesWall />
              <ClosingLetter />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </main>
    </MotionConfig>
  )
}

function SectionDivider() {
  return (
    <div aria-hidden className="mx-auto h-px w-[min(82%,48rem)] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
  )
}
