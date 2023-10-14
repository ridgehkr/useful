import { test, describe, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useStack from '../hooks/useStack'

describe('useStack', () => {
  /**
   * Contain an initially empty stack if no initial values argument given
   */
  test('should contain an initially empty stack if no argument given', () => {
    const { result } = renderHook(() => useStack())

    expect(result.current.items.length).toBe(0)
  })

  /**
   * Contain a stack of initial values if initial values argument given
   */
  test('should contain a stack of initial values if argument given', () => {
    const initialItems = ['a', 'b', 'c']
    const { result } = renderHook(() => useStack(initialItems))

    expect(result.current.items.length).toBe(3)
    expect(result.current.items).toEqual(initialItems)
  })

  /**
   * Push an item to the stack
   */
  test('should push an item to the stack', () => {
    const { result } = renderHook(() => useStack())

    act(() => {
      result.current.push('a')
    })

    expect(result.current.items.length).toBe(1)
    expect(result.current.items).toEqual(['a'])
  })

  /**
   * Pop an item from the stack
   */
  test('pop() should pop an item from the stack and return it', () => {
    const { result } = renderHook(() => useStack(['a', 'b', 'c']))
    let poppedItem

    act(() => {
      poppedItem = result.current.pop()
    })

    // Check that the stack length is now 2
    expect(result.current.items.length).toBe(2)

    // Check that the popped item was removed from the stack
    expect(result.current.items).toEqual(['a', 'b'])

    // Check that the popped item was the last item in the stack
    expect(poppedItem).toBe('c')
  })

  /**
   * Peek at the top item in the stack
   */
  test('peek() should peek at the top item in the stack', () => {
    const { result } = renderHook(() => useStack(['a', 'b', 'c']))
    let peekedItem

    act(() => {
      peekedItem = result.current.peek()
    })

    // Check that the stack length is still 3
    expect(result.current.items.length).toBe(3)

    // Check that the peeked item is the last item in the stack
    expect(peekedItem).toBe('c')
  })

  /**
   * Clear the stack
   */
  test('claer() should empty the stack', () => {
    const { result } = renderHook(() => useStack(['a', 'b', 'c']))

    act(() => {
      result.current.clear()
    })

    expect(result.current.items.length).toBe(0)
  })

  /**
   * Check if the stack contains an item
   */
  test('contains() should check if the stack contains an item', () => {
    const { result } = renderHook(() => useStack(['a', 'b', 'c']))

    expect(result.current.contains('b')).toBe(true)
    expect(result.current.contains('d')).toBe(false)
  })

  /**
   * Convert the stack to an array
   */
  test('toArray() should convert the stack to an array', () => {
    const { result } = renderHook(() => useStack(['a', 'b', 'c']))

    expect(result.current.toArray()).toEqual(['a', 'b', 'c'])
  })

  /**
   * Check the stack's size
   */
  test("size() should get the stack's size", () => {
    const { result } = renderHook(() => useStack(['a', 'b', 'c']))

    expect(result.current.size).toBe(3)
  })
})
