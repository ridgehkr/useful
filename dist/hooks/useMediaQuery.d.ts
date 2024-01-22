/**
 * A hook to monitor a given media query's state
 *
 * @param {string} query - The media query string to monitor
 * @returns {boolean} - Whether or not the media query string currently matches
 *
 * @example
 * const matches = useMediaQuery('(prefers-color-scheme: dark)')
 */
declare const useMediaQuery: (query: string) => boolean;
export default useMediaQuery;
