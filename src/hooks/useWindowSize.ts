import { useState, useCallback, useLayoutEffect } from 'react'

/**
 * Window size properties
 */
export type WindowSize = {
  width: number
  height: number
}

/**
 * Tracks the size of the window (width, height)
 * @returns {WindowSize} - an object with the size of the window in pixels (width, height)
 */
const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  // Function to update the window size
  const updateWindowSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [setWindowSize])

  useLayoutEffect(() => {
    // listen for changes to the window size
    window.addEventListener('resize', updateWindowSize)
    screen.orientation.addEventListener('change', updateWindowSize)

    // remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateWindowSize)
      screen.orientation.removeEventListener('change', updateWindowSize)
    }
  }, [updateWindowSize])

  return windowSize
}

export default useWindowSize
