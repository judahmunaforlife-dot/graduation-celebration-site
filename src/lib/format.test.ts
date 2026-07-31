import { describe, expect, it } from 'vitest'
import { displayDate, initials } from './format'

describe('initials', () => {
  it('returns uppercase initials for first and last name', () => {
    expect(initials('jane smith')).toBe('JS')
  })

  it('returns a single initial for one-word names', () => {
    expect(initials('cher')).toBe('C')
  })

  it('ignores extra whitespace and middle names', () => {
    expect(initials('  Ada  Lovelace  Babbage  ')).toBe('AL')
  })

  it('returns empty string for empty input', () => {
    expect(initials('')).toBe('')
    expect(initials('   ')).toBe('')
  })
})

describe('displayDate', () => {
  const now = Date.now()
  const iso = (msAgo: number) => new Date(now - msAgo).toISOString()

  it('labels just-posted items', () => {
    expect(displayDate(iso(30_000))).toBe('Just now')
  })

  it('labels minutes', () => {
    expect(displayDate(iso(5 * 60_000))).toBe('5m ago')
  })

  it('labels hours', () => {
    expect(displayDate(iso(3 * 3_600_000))).toBe('3h ago')
  })

  it('labels days under a week', () => {
    expect(displayDate(iso(2 * 86_400_000))).toBe('2d ago')
  })

  it('falls back to a short date after a week', () => {
    const date = new Date(now - 10 * 86_400_000)
    expect(displayDate(date.toISOString())).toBe(
      date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    )
  })
})
