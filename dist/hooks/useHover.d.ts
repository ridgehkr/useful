/**
 * Monitor the hover state of an element.
 * @param {boolean} includeTouch - Whether or not to include touch events in the hover state.
 * @returns {boolean} - Whether or not the element is currently being hovered over.
 */
declare const useHover: (includeTouch?: boolean) => {
    ref: import("react").MutableRefObject<unknown>;
    hasHover: boolean;
};
export default useHover;
