import { useMemo, useEffect } from 'react'
import { debounce } from 'lodash'

/**
 * A hook to debounce the given callback function. Functions as a thin wrapper around lodash's debounce() function.
 * @param callback - The callback function to debounce.
 * @param delay - The delay in milliseconds.
 * @returns - The debounced callback function.
 */
const useDebounce = <T>(callback: (...args: T[]) => void, delay: number) => {
  const debouncedCallback = useMemo(
    () => debounce(callback, delay),
    [callback, delay]
  )

  useEffect(() => {
    debouncedCallback.cancel()
    debouncedCallback()

    // clean up
    return () => debouncedCallback.cancel()
  }, [debouncedCallback])

  return debouncedCallback
}

export default useDebounce
