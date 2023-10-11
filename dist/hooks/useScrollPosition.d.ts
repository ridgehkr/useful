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
