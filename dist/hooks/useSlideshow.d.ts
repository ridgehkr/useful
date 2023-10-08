/**
 * A hook to manage the state of a slideshow.
 */
declare const useSlideshow: <T>(initialItems?: T[], loop?: boolean) => {
    slides: T[];
    activeSlideIndex: number;
    addSlide: (slide: T, index?: number) => void;
    removeSlide: (index: number) => void;
    activateSlide: (index: number) => void;
};
export default useSlideshow;
