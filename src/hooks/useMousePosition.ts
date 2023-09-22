import { useState, useCallback, useLayoutEffect } from 'react'

type MousePosition = {
  x: number
  y: number
}

/**
 * A hook to track the current position of the mouse
 * @returns {MousePosition}: The current x and y position of the mouse
 */
const useMousePosition = () => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    },
    [setPosition]
  )

  useLayoutEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  return position
}

export default useMousePosition
