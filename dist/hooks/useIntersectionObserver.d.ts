type IntersectionObserverOptions = {
    root: HTMLElement | null;
    rootMargin: string;
    threshold: number | number[];
};
declare const useIntersectionObserver: (options: IntersectionObserverOptions) => {
    ref: import("react").MutableRefObject<null>;
    entry: IntersectionObserverEntry | null;
};
export default useIntersectionObserver;
