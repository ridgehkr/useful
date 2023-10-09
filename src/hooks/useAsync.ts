import { useState, useEffect, useMemo } from 'react'

// The shape of the async state object
type AsyncState<T> = {
  data: T | null
  loading: boolean
  error: null | Error
}

type AsyncFunction<T> = () => Promise<T>

/**
 * Manages the execution state of an async function.
 * @param {function} asyncFunction - The async function to manage.
 * @param {boolean} immediate - Whether to run the async function immediately.
 * @returns - The state of the async function and a function to run it.
 */
const useAsync = <T>(asyncFunction: AsyncFunction<T>, immediate = true) => {
  const [asyncState, setAsyncState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const executeAsyncFunction = useMemo(
    () => async () => {
      setAsyncState({ data: null, loading: true, error: null })

      try {
        const data = await asyncFunction()
        setAsyncState({ data, loading: false, error: null })
      } catch (error: unknown) {
        setAsyncState({ data: null, loading: false, error: error as Error })
      }
    },
    [asyncFunction, setAsyncState]
  )

  useEffect(() => {
    if (immediate) {
      executeAsyncFunction()
    }
  }, [immediate, executeAsyncFunction])

  return {
    ...asyncState,
    run: executeAsyncFunction,
  }
}

export default useAsync
