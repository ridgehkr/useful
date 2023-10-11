type ElementSize = {
    width: number;
    height: number;
};
/**
 * Track the size of an element (width, height)
 * @param ref - A React ref object
 * @returns {ElementSize} - The size of the element in pixels (width, height)
 */
declare const useElementSize: (ref: React.RefObject<HTMLElement>) => ElementSize;
export default useElementSize;
