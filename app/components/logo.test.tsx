import React from 'react'
import { render } from '@testing-library/react'
import { Logo } from './logo'

describe('Logo', () => {
  it('renders without crashing', () => {
    const { container } = render(<Logo />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Logo className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('has correct viewBox', () => {
    const { container } = render(<Logo />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
  })

  it('contains correct number of path elements', () => {
    const { container } = render(<Logo />)
    const paths = container.querySelectorAll('path')
    expect(paths.length).toBe(2)
  })
})

