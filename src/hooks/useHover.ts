import { useCallback, useLayoutEffect, useRef, useState } from 'react'

const useHover = (includeTouch = false) => {
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

    const activeEvents = ['mouseenter']
    const inactiveEvents = ['mouseleave']

    if (includeTouch) {
      activeEvents.push('touchend')
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
