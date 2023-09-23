import { useEffect, useRef, useState } from 'react'

/**
 * Limit the frequency of a value changing to once every @interval milliseconds.
 * @param value - the value to throttle
 * @param interval - (optional) the interval to throttle the value (default: 400ms
 * @returns - the throttled value
 */
const useThrottle = <T>(value: T, interval = 400) => {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastUpdated = useRef<number>(Date.now())
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (!Number.isInteger(interval) || interval < 0) {
      throw new Error('Throttle interval must be a positive integer')
    }

    const now = Date.now()
    const timeSinceLastUpdate = now - lastUpdated.current

    // the interval has passed since the last update, so update the value
    if (timeSinceLastUpdate > interval) {
      setThrottledValue(value)
      lastUpdated.current = now
    } else {
      // clear any existing timeout to prevent multiple updates
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }

      // set a timeout to update the value after the interval has passed
      timeoutRef.current = window.setTimeout(() => {
        setThrottledValue(value)
        lastUpdated.current = Date.now()
      }, interval - timeSinceLastUpdate)
    }

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [value, interval])

  return throttledValue
}

export default useThrottle
