import { useCallback, useState } from 'react'

export type LocalStorageState<T> = {
  value: T
  setStoredValue: (newValue: T) => void
  deleteStoredValue: () => void
}

/**
 * A hook to manage data persistence in the browser's local storage.
 *
 * @param {string} key - The key to use for the local storage item.
 * @param {T} initialValue - The initial value to use if no value is found in local storage.
 * @returns An object containing the current value, a function to set the value, and a function to delete the value.
 */
const useLocalStorage = <T>(
  key: string,
  initialValue: T
): LocalStorageState<T> => {
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

  /**
   * Set the stored value in local storage.
   */
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

  /**
   * Delete the stored value from local storage.
   */
  const deleteStoredValue = useCallback(() => {
    setValue(initialValue)
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error(`Error deleting stored value for key "${key}": ${e}`)
    }
  }, [setValue, key, initialValue])

  return { value, setStoredValue, deleteStoredValue }
}

export default useLocalStorage
