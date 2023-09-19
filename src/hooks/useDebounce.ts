import { useState, useEffect } from 'react'

/**
 * A hook to debounce the given @value. No matter how often @value is updated, it will only update once after a delay of @delay milliseconds.
 * @param value - The value to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @returns - The debounced version of @value.
 */
const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeoutID: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timeoutID)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
