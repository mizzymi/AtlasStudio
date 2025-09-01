import { describe, it, expect } from 'vitest'
import reducer, { setData, reset } from '../blocks.slice'

describe('blocks slice', () => {
  it('handles setData', () => {
    const state = reducer(undefined, setData(123))
    expect(state.data).toBe(123)
  })

  it('handles reset', () => {
    const preloaded = { data: 1, loading: true, error: 'x' }
    // @ts-expect-error allow partial for test
    const state = reducer(preloaded, reset())
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  })
})
