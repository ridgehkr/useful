/**
 * Monitor the user's idle state.
 * @param {number} timeout - The amount of time (in milliseconds) before the user is considered idle.
 * @returns {boolean} - Whether or not the user is currently idle.
 */
declare const useIdleTimeout: (timeout: number) => boolean;
export default useIdleTimeout;
