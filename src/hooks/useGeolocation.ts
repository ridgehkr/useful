import { useState, useEffect, useCallback } from 'react'

/**
 * A latitude/longitude location with an optional error message.
 *
 * @typedef {Object} GeoLocation
 * @property {number} latitude - The latitude of the user's current location.
 * @property {number} longitude - The longitude of the user's current location.
 * @property {string} error - An error message if a problem was encountered.
 */
export type GeoLocation = {
  latitude: number | null
  longitude: number | null
  error: string | null
}

/**
 * Track the user's current location via the browser's geolocation API.
 * @returns {GeoLocation} - The current latitude and longitude of the user, or an error message if a problem was encountered.
 */
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
