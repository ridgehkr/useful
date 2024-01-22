/**
 * The position of the user's scroll.
 *
 * @typedef {Object} ScrollPosition
 * @property {number} x - The horizontal position (in pixels) of the user's scroll.
 * @property {number} y - The vertical position (in pixels) of the user's scroll.
 */
export type ScrollPosition = {
    x: number;
    y: number;
};
/**
 * Monitors the user's scroll position.
 * @returns {ScrollPosition} - The current scroll position of the window (x, y).
 */
declare const useScrollPosition: () => ScrollPosition;
export default useScrollPosition;
