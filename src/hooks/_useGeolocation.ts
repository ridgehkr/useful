import { useState, useEffect } from 'react'

interface GeoLocation {
  latitude: number | null
  longitude: number | null
  error: string | null
}

const useGeoLocation = (): GeoLocation => {
  const [location, setLocation] = useState<GeoLocation>({
    latitude: null,
    longitude: null,
    error: null,
  })

  useEffect(() => {
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

  return location
}

export default useGeoLocation
