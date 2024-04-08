import { useEffect, useState } from 'react'

const STANDARD_INTERACTION_EVENTS = [
  'mousemove',
  'mousedown',
  'resize',
  'keydown',
  'touchstart',
  'touchmove',
  'wheel',
]

const VIS_CHANGE_EVENT = 'visibilitychange'

/**
 * Monitor the user's idle state.
 * @param {number} timeout - The amount of time (in milliseconds) before the user is considered idle.
 * @returns {boolean} - Whether or not the user is currently idle.
 */
const useIdleTimeout = (timeout: number): boolean => {
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    let idleTimer: NodeJS.Timeout

    const resetIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        setIdle(true)
      }, timeout)
    }

    const handleUserActivity = () => {
      if (idle) setIdle(false)
      resetIdleTimer()
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        handleUserActivity()
      }
    }

    // Attach event listeners for user activity
    STANDARD_INTERACTION_EVENTS.forEach((event) =>
      document.addEventListener(event, handleUserActivity)
    )

    document.addEventListener(VIS_CHANGE_EVENT, handleVisibilityChange)

    // Initialize the idle timer
    resetIdleTimer()

    return () => {
      // Clean up event listeners on unmount
      STANDARD_INTERACTION_EVENTS.forEach((event) =>
        document.removeEventListener(event, handleUserActivity)
      )

      document.removeEventListener(VIS_CHANGE_EVENT, handleVisibilityChange)

      clearTimeout(idleTimer)
    }
  }, [timeout, idle])

  return idle
}

export default useIdleTimeout
