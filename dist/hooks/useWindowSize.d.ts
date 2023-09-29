/**
 * Interface for the window size properties
 */
interface WindowSize {
    width: number;
    height: number;
}
/**
 * Tracks the size of the window (width, height)
 * @returns WindowSize - the size of the window in pixels (width, height)
 */
declare const useWindowSize: () => WindowSize;
export default useWindowSize;
