import { describe, expect, it } from 'vitest'
import { wrapText } from './canvas-text'

function stub(widthPerChar = 10) {
  return { measureText: (text: string) => ({ width: text.length * widthPerChar }) }
}

describe('wrapText', () => {
  it('keeps a short line whole', () => {
    expect(wrapText(stub(), 'hello world', 500)).toEqual(['hello world'])
  })

  it('wraps when a line exceeds the max width', () => {
    expect(wrapText(stub(), 'hello wonderful world', 100)).toEqual([
      'hello',
      'wonderful',
      'world',
    ])
  })

  it('puts a long word on its own line', () => {
    expect(wrapText(stub(), 'Congratulations graduate', 60)).toEqual([
      'Congratulations',
      'graduate',
    ])
  })

  it('handles empty strings', () => {
    expect(wrapText(stub(), '', 100)).toEqual([])
  })
})
