import { useCallback, useMemo, useState } from 'react'

/**
 * A Stack data structure. See https://en.wikipedia.org/wiki/Stack_(abstract_data_type) for more details.
 *
 * @template T - The type of the items in the stack
 * @property {T[]} items - The items in the stack
 * @property {number} size - Returns the size of the stack
 * @property {(item: T) => void} push - Pushes an item to the top of the stack
 * @property {() => T | undefined} pop - Pops (i.e. removes) an item from the top of the stack
 * @property {() => T | undefined} peek - Returns the item at the top of the stack without removing it
 * @property {() => void} clear - Clears the stack of all items
 * @property {(item: T) => boolean} contains - Checks if the stack contains an item
 * @property {() => T[]} toArray - Returns the stack's values as an array
 */
export type Stack<T> = {
  items: T[]
  size: number
  push: (item: T) => void
  pop: () => T | undefined
  peek: () => T | undefined
  clear: () => void
  contains: (item: T) => boolean
  toArray: () => T[]
}

/**
 * A custom hook that implements a stack data structure
 *
 * @param {T[]} initialItems (optional) - The initial items to populate the stack with
 * @returns {Stack} A stack object
 */
const useStack = <T>(initialItems: T[] = []): Stack<T> => {
  const [items, setItems] = useState<T[]>([...initialItems])

  /**
   * Pushes an item to the top of the stack
   */
  const push = useCallback(
    (item: T): void => {
      setItems((prevItems) => [...prevItems, item])
    },
    [setItems]
  )

  /**
   * Pops (i.e. removes) an item from the top of the stack
   */
  const pop = useCallback((): T | undefined => {
    if (items.length === 0) {
      return undefined
    }
    const poppedItem = items.pop()
    setItems([...items])

    return poppedItem
  }, [items, setItems])

  /**
   * Returns the item at the top of the stack without removing it
   */
  const peek = useCallback((): T | undefined => {
    if (items.length === 0) {
      return undefined
    }

    return items[items.length - 1]
  }, [items])

  /**
   * Clears the stack of all items
   */
  const clear = useCallback(() => {
    setItems([])
  }, [setItems])

  /**
   * Checks if the stack contains an item
   */
  const contains = useCallback(
    (item: T): boolean => {
      return items.includes(item)
    },
    [items]
  )

  /**
   * Returns the stack's values as an array
   */
  const toArray = useCallback((): T[] => {
    return [...items]
  }, [items])

  /**
   * Returns the size of the stack
   */
  const size = useMemo(() => items.length, [items])

  return {
    items,
    size,
    push,
    pop,
    peek,
    clear,
    contains,
    toArray,
  }
}

export default useStack
