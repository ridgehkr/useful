import { useState } from 'react'

type ValueSetter<T> = (value: T) => void

const useSessionStorage = <T>(
  key: string,
  initialValue?: T
): [T | undefined, ValueSetter<T>] => {
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

  return [storedValue, setValue]
}

export default useSessionStorage
