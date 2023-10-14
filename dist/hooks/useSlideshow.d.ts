/**
 * The state of a slideshow.
 *
 * @typedef {Object} SlideshowState
 * @property {T[]} slides - The list of slides.
 * @property {number} activeSlideIndex - The index of the active slide.
 * @property {function} addSlide - Add a new slide to the slideshow.
 * @property {function} removeSlide - Remove a slide from the slideshow.
 * @property {function} activateSlide - Set the active slide to a specific index.
 */
export type SlideshowState<T> = {
    slides: T[];
    activeSlideIndex: number;
    addSlide: (slide: T, index?: number) => void;
    removeSlide: (index: number) => void;
    activateSlide: (index: number) => void;
};
/**
 * A hook to manage the state of a slideshow.
 *
 * @param {T[]} initialItems - The initial list of slides.
 * @param {boolean} loop - Whether the slideshow should loop back to the beginning when the end is reached.
 */
declare const useSlideshow: <T>(initialItems?: T[], loop?: boolean) => SlideshowState<T>;
export default useSlideshow;
