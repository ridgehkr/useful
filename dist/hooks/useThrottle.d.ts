/**
 * Limit the frequency of a value changing to once every @interval milliseconds.
 *
 * @param {T} value - the value to throttle
 * @param {number} interval - (optional) the interval to throttle the value (default: 400ms
 * @returns {T} - the throttled value
 */
declare const useThrottle: <T>(value: T, interval?: number) => T;
export default useThrottle;
