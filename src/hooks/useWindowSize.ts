import { useState, useCallback, useLayoutEffect } from 'react'

// the event names to listen for
const WINDOW_RESIZE_EVENT = 'resize'
const ORIENTATION_CHANGE_EVENT = 'change'

/**
 * Window size properties (in pixels)
 *
 * @typedef {Object} WindowSize
 * @property {number} width - The width of the window.
 * @property {number} height - The height of the window.
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

  // Callback to update the window size
  const updateWindowSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [setWindowSize])

  useLayoutEffect(() => {
    // listen for changes to the window size
    window.addEventListener(WINDOW_RESIZE_EVENT, updateWindowSize)
    screen.orientation.addEventListener(
      ORIENTATION_CHANGE_EVENT,
      updateWindowSize
    )

    // remove the event listener when the component unmounts
    return () => {
      window.removeEventListener(WINDOW_RESIZE_EVENT, updateWindowSize)
      screen.orientation.removeEventListener(
        ORIENTATION_CHANGE_EVENT,
        updateWindowSize
      )
    }
  }, [updateWindowSize])

  return windowSize
}

export default useWindowSize
