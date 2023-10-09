import { useState, useCallback, useLayoutEffect } from 'react'

// A specific X and Y scroll position
export type ScrollPosition = {
  x: number
  y: number
}

/**
 * Monitors the user's scroll position.
 * @returns The current scroll position of the window.
 */
const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: window.scrollX,
    y: window.scrollY,
  })

  const handleScroll = useCallback(() => {
    setScrollPosition({
      x: window.scrollX,
      y: window.scrollY,
    })
  }, [setScrollPosition])

  useLayoutEffect(() => {
    // Attach the event listener
    window.addEventListener('scroll', handleScroll)

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return scrollPosition
}

export default useScrollPosition
