import { useState, useEffect } from 'react'

// https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event#event_properties
export type DeviceOrientationData = {
  alpha: number | null
  beta: number | null
  gamma: number | null
}

/**
 * Monitor the device's orientation around the X (beta), Y (gamma), and Z (alpha) axes.
 *
 * @returns {DeviceOrientationData} - The current device orientation data.
 */
const useDeviceOrientation = (): DeviceOrientationData => {
  const [orientation, setOrientation] = useState<DeviceOrientationData>({
    alpha: null,
    beta: null,
    gamma: null,
  })

  useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      })
    }

    window.addEventListener('deviceorientation', handleDeviceOrientation, true)

    return () => {
      window.removeEventListener(
        'deviceorientation',
        handleDeviceOrientation,
        true
      )
    }
  }, [])

  return orientation
}

export default useDeviceOrientation
