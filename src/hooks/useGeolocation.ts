import { useState, useEffect, useCallback } from 'react'

interface GeoLocation {
  latitude: number | null
  longitude: number | null
  error: string | null
}

const useGeoLocation = () => {
  const [location, setLocation] = useState<GeoLocation>({
    latitude: null,
    longitude: null,
    error: null,
  })

  /**
   * Get the current location of the user via the browser's geolocation API.
   *
   * Sets the location state to the user's current latitude and longitude.
   * If the user denies access to their location or the API is unavailable,
   *  the error state is left unchanged and an error message is set.
   */
  const getLocation = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          })
        },
        (error) => {
          setLocation((prevLocation) => ({
            ...prevLocation,
            error: error.message,
          }))
        }
      )
    } else {
      setLocation((prevLocation) => ({
        ...prevLocation,
        error: 'Geolocation is not available in this browser.',
      }))
    }
  }, [])

  useEffect(() => {
    getLocation()
  }, [getLocation])

  return { location, getLocation }
}

export default useGeoLocation