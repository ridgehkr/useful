import { test, describe, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import useCustomCSSProp from '../hooks/useCustomCSSProp'

describe('useCustomCSSProp', () => {
  /**
   * Contain an initially empty stack if no initial values argument given
   */
  test('should reflect the value of a global CSS custom prop', () => {
    document.documentElement.style.setProperty('--test', 'hello')
    const { result } = renderHook(() => useCustomCSSProp('--test'))

    expect(result.current).toBe('hello')
  })
})
