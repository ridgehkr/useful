import { useState } from 'react'

/**
 * Determines if a slide index is within the bounds of the list of slides.
 * @param index - The index to check.
 * @param length - The length of the list of slides.
 * @returns - True if the index is within the bounds of the list of slides, false otherwise.
 */
const indexInBounds = (index: number, length: number): boolean => {
  return index >= 0 && index < length
}

/**
 * A hook to manage the state of a slideshow.
 */
const useSlideshow = <T>(loop: boolean = false) => {
  const [slides, setSlides] = useState<T[]>([])
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  /**
   * Add a new slide to the slideshow.
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
      throw new Error(`Invalid slide index: ${index}`)
    }
  }

  /**
   * Set the active slide to a specific index.
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
      throw new Error(`Invalid slide index: ${index}`)
    }
  }

  return { slides, activeSlideIndex, addSlide, removeSlide, activateSlide }
}

export default useSlideshow
