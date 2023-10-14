import { useState, useEffect } from 'react'

// Connection event names to listen for
const ONLINE_EVENT = 'online'
const OFFLINE_EVENT = 'offline'

/**
 * Monitors the user's online status.
 * @returns {boolean} - Whether or not the user is currently online.
 */
const useOnlineStatus = (): boolean => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const onlineStatusHandler = () => setIsOnline(true)
    const offlineStatusHandler = () => setIsOnline(false)

    window.addEventListener(ONLINE_EVENT, onlineStatusHandler)
    window.addEventListener(OFFLINE_EVENT, offlineStatusHandler)

    return () => {
      window.removeEventListener(ONLINE_EVENT, onlineStatusHandler)
      window.removeEventListener(OFFLINE_EVENT, offlineStatusHandler)
    }
  }, [setIsOnline])

  return isOnline
}

export default useOnlineStatus
