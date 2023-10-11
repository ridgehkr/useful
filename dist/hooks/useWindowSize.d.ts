/**
 * Window size properties
 */
export type WindowSize = {
    width: number;
    height: number;
};
/**
 * Tracks the size of the window (width, height)
 * @returns {WindowSize} - an object with the size of the window in pixels (width, height)
 */
declare const useWindowSize: () => WindowSize;
export default useWindowSize;
