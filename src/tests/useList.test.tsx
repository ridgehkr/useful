import { test, describe, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useList from '../hooks/useList'

/**
  items,
  size,
  head,
  tail,
  itemAt,
  prepend,
  append,
  remove,
  update,
*/

describe('useList', () => {
  /**
   * Initial state w/o initial items argument
   */
  test('should initially contain an empty list if no argument given', () => {
    const { result } = renderHook(() => useList())

    expect(result.current.items.length).toBe(0)
    expect(result.current.items).toEqual([])
  })

  /**
   * Initial state w/ initial items argument
   */
  test('should contain a list of initial values if argument given', () => {
    const initialItems = ['a', 'b', 'c']
    const { result } = renderHook(() => useList(initialItems))

    expect(result.current.items.length).toBe(3)
    expect(result.current.items).toEqual(initialItems)
  })

  /**
   * Prepend an item to the list
   */
  test('prepend() should add an item to the beginning of the list', () => {
    const { result } = renderHook(() => useList(['b', 'c']))

    act(() => {
      result.current.prepend('a')
    })

    expect(result.current.items.length).toBe(3)
    expect(result.current.items).toEqual(['a', 'b', 'c'])
  })

  /**
   * Append an item to the list
   */
  test('append() should add an item to the end of the list', () => {
    const { result } = renderHook(() => useList(['a', 'b']))

    act(() => {
      result.current.append('c')
    })

    expect(result.current.items.length).toBe(3)
    expect(result.current.items).toEqual(['a', 'b', 'c'])
  })

  /**
   * Remove an item from the list
   */
  test('remove() should remove an item from the list', () => {
    const { result } = renderHook(() => useList(['a', 'b', 'c']))

    act(() => {
      result.current.remove(1)
    })

    expect(result.current.items).toEqual(['a', 'c'])
  })

  /**
   * Update an item in the list
   */
  test('update() should update an item in the list', () => {
    const { result } = renderHook(() => useList(['a', 'b', 'c']))

    act(() => {
      result.current.update(1, 'd')
    })

    expect(result.current.items).toEqual(['a', 'd', 'c'])
  })

  /**
   * Get the size of the list
   */
  test('size() should get the size of the list', () => {
    const { result } = renderHook(() => useList(['a', 'b', 'c']))

    expect(result.current.size()).toBe(3)
  })

  /**
   * Get the head of the list
   */
  test('head() should get the head of the list', () => {
    const { result } = renderHook(() => useList(['a', 'b', 'c']))

    expect(result.current.head).toBe('a')
  })

  /**
   * Get the tail of the list
   */
  test('tail() should get the tail of the list', () => {
    const { result } = renderHook(() => useList(['a', 'b', 'c']))

    expect(result.current.tail).toEqual(['b', 'c'])
  })

  /**
   * Get an item at a given index
   */
  test('itemAt() should get an item at a given index', () => {
    const { result } = renderHook(() => useList(['a', 'b', 'c']))

    expect(result.current.itemAt(1)).toBe('b')
  })
})
