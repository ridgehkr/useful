import { useState } from 'react'

type ValueSetter<T> = (value: T) => void

type SessionStorageState<T> = {
  storedValue: T | undefined
  setValue: ValueSetter<T>
}

/**
 * Monitor and update a value in session storage.
 * @param key - The key to use for the session storage item.
 * @param initialValue - The initial value to use for the session storage item.
 * @returns - An object containing the current value of the session storage item and a function to update it.
 */
const useSessionStorage = <T>(
  key: string,
  initialValue?: T
): SessionStorageState<T> => {
  // Initialize state with the value from session storage, if available
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const item = sessionStorage.getItem(key)
      // Parse stored JSON or return initialValue if undefined
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading session storage key "${key}":`, error)
      return initialValue
    }
  })

  // A function to update the session storage value
  const setValue: ValueSetter<T> = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to session storage
      sessionStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error writing session storage key "${key}":`, error)
    }
  }

  return { storedValue, setValue }
}

export default useSessionStorage
