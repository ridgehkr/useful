import { useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash'

type ThrottleOptions = {
  leading?: boolean
  trailing?: boolean
}

const useThrottle = <T extends (...args: []) => unknown>(
  callback: T,
  delay: number,
  options?: ThrottleOptions
) => {
  const [result, setResult] = useState<ReturnType<T> | undefined>()
  const throttledCallback = useRef(throttle(callback, delay, options))

  useEffect(() => {
    throttledCallback.current = throttle(callback, delay, options)
  }, [callback, delay, options])

  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    if (throttledCallback.current) {
      setResult(throttledCallback.current(...args))
    }
    return result
  }
}

export default useThrottle
