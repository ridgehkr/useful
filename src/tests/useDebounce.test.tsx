import { test, describe, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import useDebounce from '../hooks/useDebounce'

describe('useDebounce', () => {
  describe.todo('debounce rapid value-setting')

  test('should return the initial value', () => {
    const { result } = renderHook(() => useDebounce('a', 100))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is 0', () => {
    const { result } = renderHook(() => useDebounce('a', 0))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is negative', () => {
    const { result } = renderHook(() => useDebounce('a', -1))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is NaN', () => {
    const { result } = renderHook(() => useDebounce('a', NaN))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is Infinity', () => {
    const { result } = renderHook(() => useDebounce('a', Infinity))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is -Infinity', () => {
    const { result } = renderHook(() => useDebounce('a', -Infinity))

    expect(result.current).toBe('a')
  })
})
