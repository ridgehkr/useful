import { useState, useEffect } from 'react'

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const onlineStatusHandler = () => setIsOnline(true)
    const offlineStatusHandler = () => setIsOnline(false)

    window.addEventListener('online', onlineStatusHandler)
    window.addEventListener('offline', offlineStatusHandler)

    return () => {
      window.removeEventListener('online', onlineStatusHandler)
      window.removeEventListener('offline', offlineStatusHandler)
    }
  }, [setIsOnline])

  return isOnline
}

export default useOnlineStatus
