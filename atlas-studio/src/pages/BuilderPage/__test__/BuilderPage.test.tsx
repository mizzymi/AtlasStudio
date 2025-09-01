import { render, screen } from '@testing-library/react'
import BuilderPagePage from '../BuilderPage'

test('renders page title', () => {
  render(<BuilderPagePage />)
  expect(screen.getByRole('heading', { name: /BuilderPage/i })).toBeInTheDocument()
})
