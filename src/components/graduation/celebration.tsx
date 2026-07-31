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

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen overflow-x-hidden">
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
              {[
                ['hero', 'Welcome'],
                ['achievements', 'Achievements'],
                ['journey', 'Journey'],
                ['moments', 'Moments'],
                ['blessings', 'Blessings'],
                ...(celebrationEvent.rsvpEnabled
                  ? (([['event', 'Event details']] as const))
                  : []),
                ['memories', 'Memories'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() =>
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                  }
                  aria-label={`Go to ${label}`}
                  title={label}
                  className="group flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-muted-foreground transition-colors hover:bg-primary/15 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-current transition-transform group-hover:scale-125" />
                </button>
              ))}
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
