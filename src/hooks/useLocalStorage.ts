import { useCallback, useState } from 'react'

/**
 * useLocalStorage()
 * A hook to manage data persistence in the browser's local storage. This can be useful for maintaining user preferences or small pieces of data across sessions.
 */
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key)
      if (storedValue !== null) {
        return JSON.parse(storedValue)
      }
    } catch (e) {
      console.error(`Error parsing stored value for key "${key}": ${e}`)
    }

    return initialValue
  })

  const setStoredValue = useCallback(
    (newValue: T) => {
      setValue(newValue)
      try {
        localStorage.setItem(key, JSON.stringify(newValue))
      } catch (e) {
        console.error(`Error setting stored value for key "${key}": ${e}`)
      }
    },
    [setValue, key]
  )

  const deleteStoredValue = useCallback(() => {
    setValue(initialValue)
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error(`Error deleting stored value for key "${key}": ${e}`)
    }
  }, [setValue, key, initialValue])

  return [value, setStoredValue, deleteStoredValue]
}

export default useLocalStorage
