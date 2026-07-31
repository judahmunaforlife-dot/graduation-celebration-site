import { afterEach, describe, expect, it, vi } from 'vitest'
import { getCountdown, isEventOver } from './countdown'

const EVENT_START = Date.parse('2026-08-29T15:00:00.000Z')

afterEach(() => {
  vi.useRealTimers()
})

describe('getCountdown', () => {
  it('computes the remaining days, hours, minutes and seconds', () => {
    vi.useFakeTimers()
    vi.setSystemTime(Date.parse('2026-08-27T00:00:00.000Z'))
    const countdown = getCountdown()
    expect(countdown.days).toBe(2)
    expect(countdown.hours).toBe(15)
    expect(countdown.minutes).toBe(0)
    expect(countdown.seconds).toBe(0)
  })

  it('never returns negative values after the event', () => {
    vi.useFakeTimers()
    vi.setSystemTime(Date.parse('2026-09-10T00:00:00.000Z'))
    const countdown = getCountdown()
    expect(countdown.days).toBe(0)
    expect(countdown.hours).toBe(0)
    expect(countdown.minutes).toBe(0)
    expect(countdown.seconds).toBe(0)
  })
})

describe('isEventOver', () => {
  it('is false before the event', () => {
    vi.useFakeTimers()
    vi.setSystemTime(EVENT_START - 86_400_000)
    expect(isEventOver()).toBe(false)
  })

  it('is true after the event', () => {
    vi.useFakeTimers()
    vi.setSystemTime(EVENT_START + 86_400_000)
    expect(isEventOver()).toBe(true)
  })
})
