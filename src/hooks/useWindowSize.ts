import { useState, useEffect, useCallback } from 'react'

/**
 * Interface for the window size properties
 */
interface WindowSize {
  width: number
  height: number
}

/**
 * Tracks the size of the window (width, height)
 * @returns WindowSize - the size of the window in pixels (width, height)
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

  useEffect(() => {
    // listen for changes to the window size
    window.addEventListener('resize', updateWindowSize)

    // remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateWindowSize)
    }
  }, [updateWindowSize])

  return windowSize
}

export default useWindowSize
