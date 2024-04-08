import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'

export type HoverState = {
  ref: React.RefObject<HTMLElement>
  hasHover: boolean
}

/**
 * Monitor the hover state of an element.
 *
 * @param {boolean} includeTouch - Whether or not to include touch events in the hover state.
 * @returns {boolean} - Whether or not the element is currently being hovered over.
 */
const useHover = (includeTouch: boolean = false): HoverState => {
  const [hasHover, setHasHover] = useState(false)
  const ref = useRef<HTMLElement>(null)

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

  /**
   * The names of events to listen for
   */
  const eventListeners = useMemo(() => {
    // the names of events to listen for
    const activeEvents = ['mouseenter']
    const inactiveEvents = ['mouseleave']

    if (includeTouch) {
      activeEvents.push('touchstart')
      inactiveEvents.push('touchend')
    }

    return { activeEvents, inactiveEvents }
  }, [includeTouch])

  useLayoutEffect(() => {
    const node = ref?.current

    if (!node) return

    const { activeEvents, inactiveEvents } = eventListeners

    // bind event listeners
    activeEvents.forEach((eventName) =>
      node.addEventListener(eventName, handleMouseEnter)
    )
    inactiveEvents.forEach((eventName) =>
      node.addEventListener(eventName, handleMouseLeave)
    )

    // unbind event listeners on cleanup
    return () => {
      activeEvents.forEach((eventName) =>
        node.removeEventListener(eventName, handleMouseEnter)
      )
      inactiveEvents.forEach((eventName) =>
        node.removeEventListener(eventName, handleMouseLeave)
      )
    }
  }, [eventListeners, handleMouseEnter, handleMouseLeave, ref])

  return { ref, hasHover }
}

export default useHover
