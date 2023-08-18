import { useState, useCallback } from 'react'

type ConverterFunction<T> = (data: unknown) => T

/**
 * Provides a hook to fetch data from a given @url.
 *
 * @param converter - Optional converter function to convert the response data to a given type.
 * @returns - An object containing the data, loading, and error states.
 */
export default function useFetch(
  converter: ConverterFunction<unknown> | null = null
) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Loads data from a given @url.
   *
   * @param url - The url to fetch data from.
   * @param options - Optional fetch() options. https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
   */
  const load = useCallback(
    async (url: string, options = {}) => {
      setError(null)
      setLoading(true)
      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(
            'Network response to fetch() was not OK.' + response.statusText
          )
        }

        const jsonData = await response.json()

        setData(converter ? converter(jsonData) : jsonData)
        setLoading(false)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Load operation could not be completed: ${err.message}`)
        } else {
          setError(`An unknown error occurred.`)
        }

        setLoading(false)
      }
    },
    [setLoading, setData, setError, converter]
  )

  return { load, data, loading, error }
}
