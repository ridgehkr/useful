import { useCallback, useMemo, useState } from 'react'

// Define the List interface
interface List<T> {
  items: T[]
  isEmpty: boolean
  head: T | undefined
  tail: T[]
  itemAt: (index: number) => T | undefined
  prepend: (item: T) => void
  append: (item: T) => void
  remove: (index: number) => void
  update: (index: number, newItem: T) => void
}

/**
 * Creates a list of items with helper functions
 * @param initialItems - The initial items to populate the list with
 * @returns - A list of items with helper functions
 */
const useList = <T>(initialItems: T[] = []): List<T> => {
  const [items, setItems] = useState<T[]>(initialItems)

  /**
   * Checks if the list is empty
   */
  const isEmpty: boolean = useMemo(() => !items.length, [items])

  /**
   * Add an item to the beginning of the list
   * @param item - The item to add to the list
   */
  const prepend = useCallback(
    (item: T) => {
      setItems((prevItems) => [item, ...prevItems])
    },
    [setItems]
  )

  /**
   * Add an item to the end of the list
   * @param item - The item to add to the list
   */
  const append = useCallback(
    (item: T) => {
      setItems((prevItems) => [...prevItems, item])
    },
    [setItems]
  )

  /**
   * Retrieve the item at the "head" (i.e. the first item in the list)
   */
  const head = useMemo(() => items[0], [items])

  /**
   * Retrieve the items at the "tail" (i.e. all items in the list except the first)
   */
  const tail = useMemo(() => items.slice(1), [items])

  /**
   * Retrieve the item at a specified index
   * @param index - The index of the item to retrieve
   */
  const itemAt = useCallback((index: number) => items[index], [items])

  /**
   * Delete an item from the list at a specified index
   * @param index - The index of the item to delete
   */
  const remove = (index: number) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems]
      updatedItems.splice(index, 1)
      return updatedItems
    })
  }

  /**
   * Replace an item in the list at a specified index
   * @param index - The index of the item to replace
   * @param newItem - The new item to replace the old item with
   */
  const update = (index: number, newItem: T) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems]
      updatedItems[index] = newItem
      return updatedItems
    })
  }

  return {
    items,
    isEmpty,
    head,
    tail,
    itemAt,
    prepend,
    append,
    remove,
    update,
  }
}

export default useList
