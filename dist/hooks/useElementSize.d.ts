/**
 * The size of an elementin pixels. (width, height)
 *
 * @property {number} width - The width of the element in pixels
 * @property {number} height - The height of the element in pixels
 */
export type ElementSize = {
    width: number;
    height: number;
};
/**
 * Track the size of an element (width, height)
 *
 * @param ref - A React ref object
 * @returns {ElementSize} - The size of the element in pixels (width, height)
 */
declare const useElementSize: (ref: React.RefObject<HTMLElement>) => ElementSize;
export default useElementSize;
