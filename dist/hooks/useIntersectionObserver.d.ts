/**
 * Options to be passed into the IntersectionObserver constructor.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options for more details.
 *
 * @property {HTMLElement | null} root - The element that is used as the viewport for checking visibility of the target.
 * @property {string} rootMargin - Margin around the root. Can have values similar to the CSS margin property.
 * @property {number | number[]} threshold - Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed.
 */
export type IntersectionObserverOptions = {
    root: HTMLElement | null;
    rootMargin: string;
    threshold: number | number[];
};
/**
 * Track the intersection of an element with the viewport.
 * @param {IntersectionObserverOptions} options - Options to be passed into the IntersectionObserver constructor.
 * @returns - The current intersection observer entry and a ref to be passed to the element to be observed.
 */
declare const useIntersectionObserver: (options: IntersectionObserverOptions) => {
    ref: import("react").MutableRefObject<null>;
    entry: IntersectionObserverEntry | null;
};
export default useIntersectionObserver;
