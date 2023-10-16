import { useState, useLayoutEffect } from 'react'

// The event name for the media query to listen for
const MEDIA_QUERY_EVENT = 'change'

/**
 * A hook to monitor a given media query's state
 *
 * @param {string} query - The media query string to monitor
 * @returns {boolean} - Whether or not the media query string currently matches
 *
 * @example
 * const matches = useMediaQuery('(prefers-color-scheme: dark)')
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false)

  useLayoutEffect(() => {
    const mediaQueryList = window.matchMedia(query)

    const updateMediaQuery = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Initial query check
    setMatches(mediaQueryList.matches)

    // Listen for changes to the media query state
    mediaQueryList.addEventListener(
      MEDIA_QUERY_EVENT,
      (e: MediaQueryListEvent) => updateMediaQuery(e)
    )

    // Clean up by detaching the event listener
    return () =>
      mediaQueryList.removeEventListener(MEDIA_QUERY_EVENT, updateMediaQuery)
  }, [query])

  return matches
}

export default useMediaQuery
