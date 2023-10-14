/**
 * The current position of the mouse
 *
 * @typedef {Object} MousePosition
 * @property {number} x - The current x position (in pixels) of the mouse
 * @property {number} y - The current y position (in pixels) of the mouse
 */
export type MousePosition = {
    x: number;
    y: number;
};
/**
 * A hook to track the current position of the mouse
 * @returns {MousePosition} - The current x and y position (in pixels) of the mouse
 */
declare const useMousePosition: () => MousePosition;
export default useMousePosition;
