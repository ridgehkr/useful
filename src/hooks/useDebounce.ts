import { useState, useEffect } from 'react'

/**
 * A hook to debounce the given @value. No matter how often @value is updated, it will only update once after a delay of @delay milliseconds.
 *
 * @param {T} value - The value to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {T} - The debounced version of @value.
 */
const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    if (!Number.isInteger(delay) || delay < 0) {
      console.error('Delay must be a positive integer')
    } else {
      const timeoutID: NodeJS.Timeout = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(timeoutID)
      }
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
