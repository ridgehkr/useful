/**
 * Limit the frequency of a value changing to once every @interval milliseconds.
 * @param value - the value to throttle
 * @param interval - (optional) the interval to throttle the value (default: 400ms
 * @returns - the throttled value
 */
declare const useThrottle: <T>(value: T, interval?: number) => T;
export default useThrottle;
