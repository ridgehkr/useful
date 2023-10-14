import { useState, useCallback, useLayoutEffect } from 'react'

/**
 * The current position of the mouse
 *
 * @typedef {Object} MousePosition
 * @property {number} x - The current x position (in pixels) of the mouse
 * @property {number} y - The current y position (in pixels) of the mouse
 */
export type MousePosition = {
  x: number
  y: number
}

// The mouse move event name to listen for
const MOUSE_MOVE_EVENT = 'mousemove'

/**
 * A hook to track the current position of the mouse
 * @returns {MousePosition} - The current x and y position (in pixels) of the mouse
 */
const useMousePosition = (): MousePosition => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })

  /**
   * Callback invoked by the MOUSE_MOVE_EVENT to update the position state with the current mouse position
   */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    },
    [setPosition]
  )

  useLayoutEffect(() => {
    document.addEventListener(MOUSE_MOVE_EVENT, handleMouseMove)

    return () => document.removeEventListener(MOUSE_MOVE_EVENT, handleMouseMove)
  }, [handleMouseMove])

  return position
}

export default useMousePosition
