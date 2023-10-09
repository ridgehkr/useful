type MediaQuery = {
    matches: boolean;
    media: string;
};
/**
 * A hook to monitor a given media query's state
 * @param query - The media query to monitor
 * @returns - An object containing the current media query state
 *
 * @example
 * const { matches, media } = useMediaQuery('(prefers-color-scheme: dark)')
 */
declare const useMediaQuery: (query: string) => MediaQuery;
export default useMediaQuery;