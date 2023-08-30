import { useCallback, useMemo, useState } from 'react'

// the Stack type
type Stack<T> = {
  items: T[]
  push: (item: T) => void
  pop: () => T | undefined
  peek: () => T | undefined
  size: number
}

/**
 * A custom hook that implements a stack data structure
 * @returns {Stack} A stack object
 */
const useStack = <T>(): Stack<T> => {
  const [items, setItems] = useState<T[]>([])

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
   * Returns the size of the stack
   */
  const size = useMemo(() => items.length, [items])

  return {
    items,
    push,
    pop,
    peek,
    size,
  }
}

export default useStack
