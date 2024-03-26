import { useState, useEffect } from 'react'

/*
Note on the Battery Status API: The Battery Status API is not yet part of the TypeScript lib, so we need to use @ts-ignore to suppress the TypeScript errors.
*/

export type BatteryStatus = {
  level: number // battery charge level (0 to 1)
  charging: boolean // whether or not the device is curently charging
}

/**
 * Utilize the Battery Status API to monitor the device's battery level and charging status.
 *
 * @returns {BatteryStatus} - The current battery status.
 */
const useBatteryStatus = (): BatteryStatus => {
  const [batteryStatus, setBatteryStatus] = useState<BatteryStatus>({
    level: 1, // Default to full battery
    charging: false, // Default to not charging
  })

  useEffect(() => {
    // @ts-ignore: see note at top of file
    if (!navigator.getBattery) {
      console.error('Battery status API is not supported')
      return
    }

    const updateBatteryStatus = () => {
      navigator
        // @ts-ignore: see note at top of file
        .getBattery()
        // @ts-ignore: see note at top of file
        .then((battery: BatteryManager) => {
          setBatteryStatus({
            level: battery.level,
            charging: battery.charging,
          })
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            console.error('Failed to get battery status:', error.message)
            return
          } else {
            console.error('Failed to get battery status:', error)
          }
        })
    }

    updateBatteryStatus()

    // Add event listener for battery status changes
    // @ts-ignore: see note at top of file
    navigator.getBattery().then((battery: BatteryManager) => {
      battery.addEventListener('levelchange', updateBatteryStatus)
      battery.addEventListener('chargingchange', updateBatteryStatus)
    })

    return () => {
      // clean up by removing battery status event listeners
      // @ts-ignore: see note at top of file
      navigator.getBattery().then((battery: BatteryManager) => {
        battery.removeEventListener('levelchange', updateBatteryStatus)
        battery.removeEventListener('chargingchange', updateBatteryStatus)
      })
    }
  }, [])

  return batteryStatus
}

export default useBatteryStatus
