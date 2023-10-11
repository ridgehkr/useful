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
