/**
 * A hook to manage the state of a slideshow.
 *
 * @param {T[]} initialItems - The initial list of slides.
 * @param {boolean} loop - Whether the slideshow should loop back to the beginning when the end is reached.
 */
declare const useSlideshow: <T>(initialItems?: T[], loop?: boolean) => {
    slides: T[];
    activeSlideIndex: number;
    addSlide: (slide: T, index?: number) => void;
    removeSlide: (index: number) => void;
    activateSlide: (index: number) => void;
};
export default useSlideshow;
