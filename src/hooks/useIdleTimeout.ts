import { useEffect, useState } from 'react'

interface IdleTimeoutOptions {
  timeout: number // Timeout duration in milliseconds
  onIdle: () => void // Callback function to execute when user becomes idle
}

const useIdleTimeout = ({ timeout, onIdle }: IdleTimeoutOptions) => {
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    let idleTimer: NodeJS.Timeout

    const resetIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        setIdle(true)
        onIdle()
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
    document.addEventListener('mousemove', handleUserActivity)
    document.addEventListener('mousedown', handleUserActivity)
    document.addEventListener('resize', handleUserActivity)
    document.addEventListener('keydown', handleUserActivity)
    document.addEventListener('touchstart', handleUserActivity)
    document.addEventListener('touchmove', handleUserActivity)
    document.addEventListener('wheel', handleUserActivity)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Initialize the idle timer
    resetIdleTimer()

    return () => {
      // Clean up event listeners on unmount
      document.addEventListener('mousemove', handleUserActivity)
      document.addEventListener('mousedown', handleUserActivity)
      document.addEventListener('resize', handleUserActivity)
      document.addEventListener('keydown', handleUserActivity)
      document.addEventListener('touchstart', handleUserActivity)
      document.addEventListener('touchmove', handleUserActivity)
      document.addEventListener('wheel', handleUserActivity)
      document.addEventListener('visibilitychange', handleUserActivity)
      clearTimeout(idleTimer)
    }
  }, [timeout, onIdle, idle])

  return idle
}

export default useIdleTimeout
