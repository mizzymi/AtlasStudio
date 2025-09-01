import { describe, it, expect } from 'vitest'
import { useUniqueId } from '../UniqueId'

describe('useUniqueId', () => {
  it('should be defined', () => {
    expect(useUniqueId).toBeDefined()
  })
})
