import { test, describe, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useUndoRedo from '../hooks/useUndoRedo'

describe('useUndoRedo', () => {
  describe.todo('manage undo/redo history')

  /**
   * Initial state should be an empty actions stack
   */
  test('should initialize with an empty actions stack', () => {
    const { result } = renderHook(() => useUndoRedo())

    expect(result.current.actions).toEqual([])
  })

  /**
   * Test redoing an action by first taking it, then undoing it, then redoing it
   */
  test('should redo an action successfully', () => {
    const { result } = renderHook(() => useUndoRedo())

    act(() => {
      result.current.takeAction('Action 1')
    })
    act(() => {
      result.current.undo()
    })
    act(() => {
      result.current.redo()
    })
    expect(result.current.actions).toEqual(['Action 1'])
  })

  /**
   * Test undoing an action by first taking it, then undoing it
   */
  test('should undo an action successfully', () => {
    const { result } = renderHook(() => useUndoRedo())

    act(() => {
      result.current.takeAction('Action 1')
    })
    act(() => {
      result.current.undo()
    })
    expect(result.current.actions).toEqual([])
  })

  /**
   * Undoing should throw an error if there are no actions to undo
   */
  test('should throw exception if undo is attempted without actions', () => {
    const { result } = renderHook(() => useUndoRedo())

    act(() => {
      result.current.takeAction('Action 1')
    })
    act(() => {
      result.current.clearActions()
    })

    expect(() => result.current.undo()).toThrowError()
  })

  /**
   * Redoing should throw an error if there are no actions to redo
   */
  test('should throw exception if redo is attempted without actions', () => {
    const { result } = renderHook(() => useUndoRedo())

    act(() => {
      result.current.takeAction('Action 1')
    })
    act(() => {
      result.current.clearActions()
    })

    expect(() => result.current.redo()).toThrowError()
  })
})
