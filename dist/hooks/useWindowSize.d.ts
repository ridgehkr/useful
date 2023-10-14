/**
 * Window size properties (in pixels)
 *
 * @typedef {Object} WindowSize
 * @property {number} width - The width of the window.
 * @property {number} height - The height of the window.
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
