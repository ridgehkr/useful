import { useCallback, useState } from 'react'

export type UndoRedoState<T> = {
  actions: T[]
  redo: () => void
  undo: () => void
  takeAction: (a: T) => void
  clearActions: () => void
}

/**
 * Manages a stack of user actions to undo/redo
 *
 * @returns {UndoRedoState}
 */
const useUndoRedo = <T>(): UndoRedoState<T> => {
  // define an array of Actions<T> to undo/redo
  const [actions, setActions] = useState<T[]>([])
  const [limboActions, setLimboActions] = useState<T[]>([])

  /**
   * Swaps the top (i.e. last-indexed) action from @source to @target
   *
   * @returns two new stacks with the swapped action in its new place in @target
   */
  const swapBetweenStacks = useCallback((source: T[], target: T[]) => {
    if (source.length === 0) {
      throw new Error('The source stack contains no actions to swap')
    }

    const sourceClone: T[] = [...source]
    const targetClone: T[] = [...target]

    // We can be certain that the source stack has at least one action and that that action is not null or undefined,
    // as takeAction() will throw an error if an undefined or null action is passed to it
    targetClone.push(sourceClone.pop() as T)

    return [sourceClone, targetClone]
  }, [])

  /**
   * Redo the last action undone by the user
   *
   * @returns void
   */
  const redo = (): void => {
    try {
      const [newLimbo, newActions] = swapBetweenStacks(limboActions, actions)

      setLimboActions(newLimbo)
      setActions(newActions)
    } catch (error) {
      throw new Error(`Could not redo an action. ${error}`)
    }
  }

  /**
   * Undo the last action performed by the user
   *
   * @returns void
   */
  const undo = (): void => {
    try {
      const [newActions, newLimbo] = swapBetweenStacks(actions, limboActions)

      setActions(newActions)
      setLimboActions(newLimbo)
    } catch (error) {
      throw new Error(`Could not undo an action. ${error}`)
    }
  }

  /**
   * Add a new action to the undo/redo stack, representing a new action performed by the user
   *
   * @param a Action<T> to take
   * @returns void
   */
  const takeAction = (a: T): void => {
    if (a === undefined || a === null) {
      console.error('Cannot take an undefined or null action')
    }

    setActions([...actions, a])
    setLimboActions([])
  }

  /**
   * Clear all actions from the undo/redo stack
   *
   * @returns void
   */
  const clearActions = (): void => {
    setActions([])
    setLimboActions([])
  }

  return { actions, redo, undo, takeAction, clearActions }
}

export default useUndoRedo
