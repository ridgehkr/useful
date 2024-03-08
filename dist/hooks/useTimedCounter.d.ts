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
declare const useTimedCounter: (initialValue: number, maxValue: number, interval: number, loop?: boolean) => {
    index: number;
    pause: () => void;
    play: () => void;
    reset: () => void;
    goToIndex: (i: number) => void;
    running: boolean;
};
export default useTimedCounter;
