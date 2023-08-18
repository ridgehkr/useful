import { useState, useEffect } from 'react'

// The shape of the media query state object
type MediaQuery = {
  matches: boolean
  media: string
}

// The event name for the media query to listen for
const MEDIA_QUERY_EVENT = 'change'

/**
 * A hook to monitor a given media query's state
 * @param query - The media query to monitor
 * @returns - An object containing the current media query state
 *
 * @example
 * const { matches, media } = useMediaQuery('(prefers-color-scheme: dark)')
 */
const useMediaQuery = (query: string): MediaQuery => {
  const [mediaQuery, setMediaQuery] = useState<MediaQuery>({
    matches: false,
    media: query,
  })

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)

    const updateMediaQuery = (mqState: MediaQuery) => {
      setMediaQuery({
        matches: mqState.matches,
        media: mqState.media,
      })
    }

    // Initial check
    updateMediaQuery({
      matches: mediaQueryList.matches,
      media: mediaQueryList.media,
    })

    // Listen for changes to the media query state
    mediaQueryList.addEventListener(
      MEDIA_QUERY_EVENT,
      (e: MediaQueryListEvent) =>
        updateMediaQuery({ matches: e.matches, media: e.media })
    )

    // Clean up by detaching the event listener
    return () => {
      mediaQueryList.removeEventListener(MEDIA_QUERY_EVENT, updateMediaQuery)
    }
  }, [query])

  return mediaQuery
}

export default useMediaQuery
