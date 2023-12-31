import { useState } from 'react'

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
  slides: T[]
  activeSlideIndex: number
  addSlide: (slide: T, index?: number) => void
  removeSlide: (index: number) => void
  activateSlide: (index: number) => void
}

/**
 * Determines if a slide index is within the bounds of the list of slides.
 *
 * @param index - The index to check.
 * @param length - The length of the list of slides.
 * @returns - True if the index is within the bounds of the list of slides, false otherwise.
 */
const indexInBounds = (index: number, length: number): boolean => {
  return index >= 0 && index < length
}

/**
 * A hook to manage the state of a slideshow.
 *
 * @param {T[]} initialItems - The initial list of slides.
 * @param {boolean} loop - Whether the slideshow should loop back to the beginning when the end is reached.
 */
const useSlideshow = <T>(
  initialItems: T[] = [],
  loop: boolean = false
): SlideshowState<T> => {
  const [slides, setSlides] = useState<T[]>([...initialItems])
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  /**
   * Add a new slide to the slideshow.
   *
   * @param slide - The content of the new slide.
   * @param index - Optional: The index where the new slide should be added (default: at the end).
   */
  const addSlide = (slide: T, index?: number): void => {
    const newSlides = [...slides]

    if (index !== undefined && indexInBounds(index, slides.length)) {
      newSlides.splice(index, 0, slide)
      setSlides(newSlides)
    } else {
      newSlides.push(slide)
      setSlides(newSlides)
    }
  }

  /**
   * Remove a slide from the slideshow and adjust the active slide index if needed.
   *
   * @param index - The index of the slide to remove.
   */
  const removeSlide = (index: number): void => {
    if (indexInBounds(index, slides.length)) {
      const newSlides = slides.filter((_, i) => i !== index)
      setSlides(newSlides)

      // Adjust the active slide index if the removed slide was the active one.
      if (index === activeSlideIndex) {
        setActiveSlideIndex(Math.max(index, 0))
      }
    } else {
      console.error(`Invalid slide index: ${index}`)
    }
  }

  /**
   * Set the active slide to a specific index.
   *
   * @param index - The index of the slide to activate.
   */
  const activateSlide = (index: number): void => {
    if (loop) {
      if (index < 0) {
        setActiveSlideIndex(slides.length - 1)
      } else if (index >= slides.length) {
        setActiveSlideIndex(0)
      } else {
        setActiveSlideIndex(index)
      }
    } else if (!loop && indexInBounds(index, slides.length)) {
      setActiveSlideIndex(index)
    } else {
      console.error(`Invalid slide index: ${index}`)
    }
  }

  return { slides, activeSlideIndex, addSlide, removeSlide, activateSlide }
}

export default useSlideshow
