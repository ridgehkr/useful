import { useState } from 'react'

// Define the List interface
interface List<T> {
  items: T[]
  add: (item: T) => void
  remove: (index: number) => void
  update: (index: number, newItem: T) => void
}

// Define the useList hook
const useList = <T>(initialItems: T[] = []): List<T> => {
  const [items, setItems] = useState<T[]>(initialItems)

  const add = (item: T) => {
    setItems((prevItems) => [...prevItems, item])
  }

  const remove = (index: number) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems]
      updatedItems.splice(index, 1)
      return updatedItems
    })
  }

  const update = (index: number, newItem: T) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems]
      updatedItems[index] = newItem
      return updatedItems
    })
  }

  return {
    items,
    add,
    remove,
    update,
  }
}

export default useList
