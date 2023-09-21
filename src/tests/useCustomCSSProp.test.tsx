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

  /**
   * Check that the property to be observed is a valid CSS custom property
   */
  test('should return an empty string if the property is not a valid CSS custom property', () => {
    const { result } = renderHook(() => useCustomCSSProp('invalid'))

    expect(result.current).toBe('')
  })

  /**
   * Check that if the property to be observed does not exist, null is returned
   */
  test('should return an empty string if the property is not a defined CSS custom property', () => {
    const { result } = renderHook(() => useCustomCSSProp('--does-not-exist'))

    expect(result.current).toBe('')
  })

  /**
   * Check that if the property to be observed is not a string, null is returned
   */
  test('should return an empty string if the property is not a string', () => {
    const { result } = renderHook(() => useCustomCSSProp(1 as any))

    expect(result.current).toBe('')
  })

  /**
   * Check that if the property to be observed is an empty string, null is returned
   */
  test('should return an empty string if the property is an empty string', () => {
    const { result } = renderHook(() => useCustomCSSProp(''))

    expect(result.current).toBe('')
  })
})
