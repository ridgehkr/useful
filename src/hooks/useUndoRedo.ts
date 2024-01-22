import { useState } from 'react'

/**
 * Manages a stack of user actions to undo/redo
 *
 * @returns { actions: T[], redo: () => void, undo: () => void, takeAction: (a: T) => void, clearActions: () => void }
 */
const useUndoRedo = <T>() => {
  // define an array of Actions<T> to undo/redo
  const [actions, setActions] = useState<T[]>([])
  const [limboActions, setLimboActions] = useState<T[]>([])

  /**
   * Redo the last action performed by the user
   *
   * @returns void
   */
  const redo = (): void => {
    const limboClone: T[] = [...limboActions]

    // pop action from limboActions stack
    //    - if stack is empty (i.e. nothing to "redo") do nothing
    if (limboClone.length > 0) {
      const a: T | undefined = limboClone.pop()

      if (a !== undefined) {
        // push action onto actions stack
        setActions([...actions, a])
      } else {
        throw new Error('Could not redo. Action was undefined')
      }
    }
  }

  /**
   * Undo the last action performed by the user
   *
   * @returns void
   */
  const undo = (): void => {
    const actionsClone: T[] = [...actions]

    // pop action from actions stack
    if (actionsClone.length > 0) {
      const a: T | undefined = actionsClone.pop()

      if (a !== undefined) {
        setActions(actionsClone)

        // push action onto limboActions stacks
        setLimboActions([...limboActions, a])
      } else {
        throw new Error('Could not undo. Action was undefined')
      }
    }
  }

  /**
   * Add a new action to the undo/redo stack, representing a new action performed by the user
   *
   * @param a Action<T> to take
   * @returns void
   */
  const takeAction = (a: T): void => {
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
  }

  return { actions, redo, undo, takeAction, clearActions }
}

export default useUndoRedo
