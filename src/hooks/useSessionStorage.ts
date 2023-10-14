import { useCallback, useState } from 'react'

/**
 * A function that sets a value.
 *
 * @template T - The type of the value to set.
 */
type ValueSetter<T> = (value: T) => void

/**
 * The state of a value in session storage.
 *
 * @template T - The type of the value to store.
 * @property {T | undefined} value - The current value of the session storage item.
 * @property {ValueSetter<T>} setStoredValue - A function to update the session storage item.
 * @property {() => void} deleteStoredValue - A function to delete the session storage item.
 */
export type SessionStorageState<T> = {
  value: T | undefined
  setStoredValue: ValueSetter<T>
  deleteStoredValue: () => void
}

/**
 * Monitor and update a value in session storage.
 * @param {string} key - The key to use for the session storage item.
 * @param {T} initialValue - The initial value to use for the session storage item.
 * @returns - An object containing the current value of the session storage item and a function to update it.
 */
const useSessionStorage = <T>(
  key: string,
  initialValue?: T
): SessionStorageState<T> => {
  // Initialize state with the value from session storage, if available
  const [value, setValue] = useState<T | undefined>(() => {
    try {
      const item = sessionStorage.getItem(key)
      // Parse stored JSON or return initialValue if undefined
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading session storage key "${key}":`, error)
      return initialValue
    }
  })

  /**
   * Update the session storage value
   * @param {T} value - The value to store in session storage.
   */
  const setStoredValue: ValueSetter<T> = useCallback(
    (value: T): void => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = value instanceof Function ? value(value) : value

        // Save state
        setValue(valueToStore)

        // Save to session storage
        sessionStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(`Error writing session storage key "${key}":`, error)
      }
    },
    [setValue, key]
  )

  /**
   * Delete the session storage value.
   */
  const deleteStoredValue = useCallback((): void => {
    setValue(undefined)
    try {
      sessionStorage.removeItem(key)
    } catch (error) {
      console.error(`Error deleting session storage key "${key}":`, error)
    }
  }, [setValue, key])

  return { value, setStoredValue, deleteStoredValue }
}

export default useSessionStorage
