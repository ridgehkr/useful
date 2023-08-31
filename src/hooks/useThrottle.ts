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

  useEffect(() => {
    if (Date.now() - lastUpdated.current > interval) {
      setThrottledValue(value)
      lastUpdated.current = Date.now()
    }
  }, [value, interval])

  return throttledValue
}

export default useThrottle
