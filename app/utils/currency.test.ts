import { formatPrice } from './currency'

describe('formatPrice', () => {
  it('formats price correctly for whole numbers', () => {
    expect(formatPrice(1000)).toBe('₡1.000')
    expect(formatPrice(1)).toBe('₡1')
    expect(formatPrice(1000000)).toBe('₡1.000.000')
  })

  it('formats price correctly for decimal numbers', () => {
    expect(formatPrice(1000.5)).toBe('₡1.001')
    expect(formatPrice(1.4)).toBe('₡1')
    expect(formatPrice(1000000.75)).toBe('₡1.000.001')
  })

  it('handles zero correctly', () => {
    expect(formatPrice(0)).toBe('₡0')
  })

  it('handles negative numbers correctly', () => {
    expect(formatPrice(-1000)).toBe('-₡1.000')
    expect(formatPrice(-1.5)).toBe('-₡2')
  })
})

