import { useCallback, useState } from 'react'

// the Stack type
export type Stack<T> = {
  items: T[]
  push: (item: T) => void
  pop: () => T | undefined
  peek: () => T | undefined
  clear: () => void
  contains: (item: T) => boolean
  toArray: () => T[]
  size: () => number
}

/**
 * A custom hook that implements a stack data structure
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
  const size = useCallback(() => items.length, [items])

  return {
    items,
    push,
    pop,
    peek,
    clear,
    contains,
    toArray,
    size,
  }
}

export default useStack
