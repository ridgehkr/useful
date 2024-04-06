import { test, describe, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useTabs from '../hooks/useTabs'

describe('useTabs', () => {
  describe.todo('manages tab state')

  test('initial active tab index should be -1', () => {
    const { result } = renderHook(() => useTabs())

    expect(result.current.activeTab).toEqual(-1)
  })

  test('should add a tab without activating it', () => {
    const { result } = renderHook(() => useTabs())

    act(() => {
      result.current.addTab('Tab 1')
    })

    expect(result.current.tabs).toEqual(['Tab 1'])
    expect(result.current.tabs.length).toBe(1)
  })

  test('should add and activate it', () => {
    const { result } = renderHook(() => useTabs())

    act(() => {
      result.current.addTab('Tab 1')
    })

    act(() => {
      result.current.activateTab(0)
    })

    expect(result.current.activeTab).toBe(0)
  })

  test('should add tabs at specific indecis around other tabs', () => {
    const { result } = renderHook(() => useTabs())

    act(() => {
      result.current.addTab('Tab 1')
    })

    act(() => {
      result.current.addTab('Tab 2', 0)
    })

    act(() => {
      result.current.addTab('Tab 3', 1)
    })

    act(() => {
      result.current.addTab('Tab 4')
    })

    expect(result.current.tabs).toEqual(['Tab 2', 'Tab 3', 'Tab 1', 'Tab 4'])
  })

  test('should change active tab', () => {
    const { result } = renderHook(() => useTabs())

    act(() => {
      result.current.addTab('Tab 1')
    })

    act(() => {
      result.current.addTab('Tab 2')
    })

    act(() => {
      result.current.activateTab(0)
    })

    expect(result.current.activeTab).toBe(0)

    act(() => {
      result.current.activateTab(1)
    })

    expect(result.current.activeTab).toBe(1)
  })

  test('should remove sole tab and reset active tab index to -1', () => {
    const { result } = renderHook(() => useTabs())

    act(() => {
      result.current.addTab('Tab 1')
    })

    act(() => {
      result.current.removeTab(0)
    })

    expect(result.current.tabs).toEqual([])
    expect(result.current.activeTab).toBe(-1)
  })

  test('should remove a tab of multiples and set active tab to the previous tab', () => {
    const { result } = renderHook(() => useTabs())

    act(() => {
      result.current.addTab('Tab 1')
    })

    act(() => {
      result.current.addTab('Tab 2')
    })

    act(() => {
      result.current.addTab('Tab 3')
    })

    act(() => {
      result.current.activateTab(1)
    })

    act(() => {
      result.current.removeTab(1)
    })

    expect(result.current.tabs).toEqual(['Tab 1', 'Tab 3'])
    expect(result.current.activeTab).toBe(0)
  })

  test("should throw exception trying to activate a tab that doesn't exist", () => {
    const { result } = renderHook(() => useTabs())

    expect(() => result.current.activateTab(0)).toThrowError()
  })

  test('should throw exception trying to activate a deleted tab', () => {
    const { result } = renderHook(() => useTabs())

    act(() => {
      result.current.addTab('Tab 1')
    })

    act(() => {
      result.current.removeTab(0)
    })

    expect(() => result.current.activateTab(0)).toThrowError()
  })
})
