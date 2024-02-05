import { useCallback, useLayoutEffect, useRef, useState } from 'react'

/**
 * Monitor the hover state of an element.
 * @param {boolean} includeTouch - Whether or not to include touch events in the hover state.
 * @returns {boolean} - Whether or not the element is currently being hovered over.
 */
const useHover = (includeTouch: boolean = false) => {
  const [hasHover, setHasHover] = useState(false)
  const ref = useRef<unknown>(null)

  /**
   * Handle mouse enter / touch start events
   */
  const handleMouseEnter = useCallback(() => {
    setHasHover(true)
  }, [setHasHover])

  /**
   * Handle mouse leave/touch end events
   */
  const handleMouseLeave = useCallback(() => {
    setHasHover(false)
  }, [setHasHover])

  useLayoutEffect(() => {
    const node = ref.current as HTMLElement

    if (!node) return

    // the names of events to listen for
    const activeEvents = ['mouseenter']
    const inactiveEvents = ['mouseleave']

    if (includeTouch) {
      activeEvents.push('touchstart')
      inactiveEvents.push('touchend')
    }

    activeEvents.forEach((eventName: string) =>
      node.addEventListener(eventName, handleMouseEnter)
    )
    inactiveEvents.forEach((eventName: string) =>
      node.addEventListener(eventName, handleMouseLeave)
    )

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter)
      node.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseLeave, handleMouseEnter, includeTouch])

  return { ref, hasHover }
}

export default useHover
