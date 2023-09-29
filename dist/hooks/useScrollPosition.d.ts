interface ScrollPosition {
    x: number;
    y: number;
}
/**
 * Monitors the user's scroll position.
 * @returns The current scroll position of the window.
 */
declare const useScrollPosition: () => ScrollPosition;
export default useScrollPosition;
