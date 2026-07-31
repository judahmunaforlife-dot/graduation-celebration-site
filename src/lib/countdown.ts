import { celebrationEvent } from './celebration-data'

export type Countdown = { days: number; hours: number; minutes: number; seconds: number }

export function getCountdown(): Countdown {
  const remaining = Math.max(0, new Date(celebrationEvent.date).getTime() - Date.now())
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
  }
}

export function isEventOver(): boolean {
  return Date.now() > new Date(celebrationEvent.date).getTime()
}
