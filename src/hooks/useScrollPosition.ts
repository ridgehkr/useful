import { useState, useCallback, useLayoutEffect } from 'react'

/**
 * The position of the user's scroll.
 *
 * @typedef {Object} ScrollPosition
 * @property {number} x - The horizontal position (in pixels) of the user's scroll.
 * @property {number} y - The vertical position (in pixels) of the user's scroll.
 */
export type ScrollPosition = {
  x: number
  y: number
}

/**
 * Monitors the user's scroll position.
 * @returns {ScrollPosition} - The current scroll position of the window (x, y).
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
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return scrollPosition
}

export default useScrollPosition
