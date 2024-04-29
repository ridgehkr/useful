import { useState, useEffect, useCallback } from 'react'

export type GeolocationState = {
  location: Geolocation
  getLocation: () => void
}

/**
 * A latitude/longitude location with an optional error message.
 *
 * @typedef {Object} Geolocation
 * @property {number} latitude - The latitude of the user's current location.
 * @property {number} longitude - The longitude of the user's current location.
 * @property {string} error - An error message if a problem was encountered.
 */
export type Geolocation = {
  latitude: number | null
  longitude: number | null
  error: string | null
}

/**
 * Track the user's current location via the browser's geolocation API.
 *
 * @returns {Geolocation} - The current latitude and longitude of the user, or an error message if a problem was encountered.
 */
const useGeolocation = (): GeolocationState => {
  const [location, setLocation] = useState<Geolocation>({
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
  const getLocation = useCallback((): void => {
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
  }, [setLocation])

  useEffect(() => {
    getLocation()
  }, [getLocation])

  return { location, getLocation }
}

export default useGeolocation
