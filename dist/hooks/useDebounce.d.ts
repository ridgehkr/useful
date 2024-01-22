/**
 * A hook to debounce the given @value. No matter how often @value is updated, it will only update once after a delay of @delay milliseconds.
 * @param {T} value - The value to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {T} - The debounced version of @value.
 */
declare const useDebounce: <T>(value: T, delay: number) => T;
export default useDebounce;
