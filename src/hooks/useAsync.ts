import { useState, useEffect, useCallback } from 'react'

type AsyncState<T> = {
  data: T | null
  loading: boolean
  error: unknown | null
}

type AsyncFunction<T> = () => Promise<T>

/**
 * Manages the state of an async function.
 * @param asyncFunction - The async function to manage.
 * @param immediate - Whether to run the async function immediately.
 * @returns - The state of the async function and a function to run it.
 */
const useAsync = <T>(asyncFunction: AsyncFunction<T>, immediate = true) => {
  const [asyncState, setAsyncState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const executeAsyncFunction = useCallback(
    () => async () => {
      setAsyncState({ data: null, loading: true, error: null })

      try {
        const data = await asyncFunction()
        setAsyncState({ data, loading: false, error: null })
      } catch (error: unknown) {
        setAsyncState({ data: null, loading: false, error })
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
