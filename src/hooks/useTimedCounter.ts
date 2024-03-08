import { useState, useCallback, useEffect } from 'react'

/**
 * Count upwards at a given timed interval (in milliseconds) from an initial value to a maximum value, looping back to 0 if the maximum value is reached
 *
 * @param {number} initialValue - The initial, non-negative value of the counter
 * @param {number} maxValue - The maximum, non-negative value of the counter
 * @param {number} interval - The interval (in milliseconds) at which the counter should advance
 * @param {boolean} loop - Whether the counter should loop back to 0 when the maximum value is reached
 * @returns {object} - An object containing:
 *    index: the current index
 *    pause(): pause the counter
 *    play(): play the counter
 *    reset(): reset the counter
 *    goToIndex(): go to a specific index
 *    running: whether the counter is currently running
 */
const useTimedCounter = (
  initialValue: number,
  maxValue: number,
  interval: number,
  loop: boolean = false
) => {
  if (initialValue < 0 || maxValue < 0 || interval < 0) {
    throw new Error(
      'Initial value, maximum value, and interval must be non-negative'
    )
  }

  const [index, setIndex] = useState<number>(initialValue)
  const [intervalID, setIntervalID] = useState<number>(-1)
  const [running, setRunning] = useState<boolean>(false)

  /**
   * Clear the interval when the component is unmounted
   */
  useEffect(() => {
    return () => clearInterval(intervalID)
  }, [intervalID])

  /**
   * Pause the counter at its current index
   */
  const pause = useCallback(() => {
    clearInterval(intervalID)
    setIntervalID(-1)
    setRunning(false)
  }, [intervalID, setIntervalID])

  /**
   * Advance the index by one, looping back to the initial value if at the max value and looping is enabled
   */
  const incrementIndex = useCallback(() => {
    setIndex((prevIndex) => {
      if (prevIndex >= maxValue) {
        return loop ? initialValue : prevIndex
      } else {
        return prevIndex + 1
      }
    })
  }, [maxValue, loop, setIndex, initialValue])

  /**
   * Start the counter from its current index
   */
  const play = useCallback(() => {
    clearInterval(intervalID)

    const id = window.setInterval(() => incrementIndex(), interval)

    setIntervalID(id)
    setRunning(true)
  }, [intervalID, setIntervalID, incrementIndex, interval, setRunning])

  /**
   * Go to a specific index and reset the interval
   */
  const goToIndex = useCallback(
    (i: number) => {
      if (i < 0 || i > maxValue) {
        throw new Error(`Index out of range: ${i}`)
      }

      clearInterval(intervalID)
      setIndex(i)

      if (running) {
        play()
      }
    },
    [intervalID, setIndex, maxValue, running, play]
  )

  /**
   * Reset the counter to its initial start value
   */
  const reset = useCallback(() => {
    goToIndex(0)
  }, [goToIndex])

  return { index, pause, play, reset, goToIndex, running }
}

export default useTimedCounter
