'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LaunchScreen } from './launch-screen'
import { BackgroundAudio } from './background-audio'
import { FloatingDecor } from './floating-decor'
import { Hero } from './hero'
import { Achievements } from './achievements'
import { MomentsWall } from './moments-wall'
import { BlessingsWall } from './blessings-wall'
import { MemoriesWall } from './memories-wall'
import { ClosingLetter } from './closing-letter'

export function Celebration() {
  const [launched, setLaunched] = useState(false)

  return (
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

            <div className="relative z-10">
              <Hero />
              <Achievements />
              <MomentsWall />
              <BlessingsWall />
              <MemoriesWall />
              <ClosingLetter />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
