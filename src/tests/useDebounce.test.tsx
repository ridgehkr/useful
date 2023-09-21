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

  test('should return the initial value if delay is null', () => {
    const { result } = renderHook(() => useDebounce('a', null))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is undefined', () => {
    const { result } = renderHook(() => useDebounce('a', undefined))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a string', () => {
    const { result } = renderHook(() => useDebounce('a', '100'))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is an object', () => {
    const { result } = renderHook(() => useDebounce('a', {}))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is an array', () => {
    const { result } = renderHook(() => useDebounce('a', []))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a function', () => {
    const { result } = renderHook(() => useDebounce('a', () => {}))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a boolean', () => {
    const { result } = renderHook(() => useDebounce('a', true))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a symbol', () => {
    const { result } = renderHook(() => useDebounce('a', Symbol()))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a bigint', () => {
    const { result } = renderHook(() => useDebounce('a', BigInt(100)))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a function that returns a number', () => {
    const { result } = renderHook(() => useDebounce('a', () => 100))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a function that returns a string', () => {
    const { result } = renderHook(() => useDebounce('a', () => '100'))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a function that returns a boolean', () => {
    const { result } = renderHook(() => useDebounce('a', () => true))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a function that returns a symbol', () => {
    const { result } = renderHook(() => useDebounce('a', () => Symbol()))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a function that returns a bigint', () => {
    const { result } = renderHook(() => useDebounce('a', () => BigInt(100)))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a function that returns an object', () => {
    const { result } = renderHook(() => useDebounce('a', () => ({})))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a function that returns an array', () => {
    const { result } = renderHook(() => useDebounce('a', () => []))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a function that returns a function', () => {
    const { result } = renderHook(() => useDebounce('a', () => () => {}))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a function that returns null', () => {
    const { result } = renderHook(() => useDebounce('a', () => null))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a function that returns undefined', () => {
    const { result } = renderHook(() => useDebounce('a', () => undefined))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a function that returns NaN', () => {
    const { result } = renderHook(() => useDebounce('a', () => NaN))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a function that returns Infinity', () => {
    const { result } = renderHook(() => useDebounce('a', () => Infinity))

    expect(result.current).toBe('a')
  })

  test('should return the initial value if delay is a function that returns -Infinity', () => {
    const { result } = renderHook(() => useDebounce('a', () => -Infinity))

    expect(result.current).toBe('a')
  })
})
