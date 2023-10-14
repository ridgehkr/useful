import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Options to be passed into the IntersectionObserver constructor.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options for more details.
 *
 * @property {HTMLElement | null} root - The element that is used as the viewport for checking visibility of the target.
 * @property {string} rootMargin - Margin around the root. Can have values similar to the CSS margin property.
 * @property {number | number[]} threshold - Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed.
 */
export type IntersectionObserverOptions = {
  root: HTMLElement | null
  rootMargin: string
  threshold: number | number[]
}

/**
 * Track the intersection of an element with the viewport.
 * @param {IntersectionObserverOptions} options - Options to be passed into the IntersectionObserver constructor.
 * @returns - The current intersection observer entry and a ref to be passed to the element to be observed.
 */
const useIntersectionObserver = (options: IntersectionObserverOptions) => {
  const ref = useRef(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  useLayoutEffect(() => {
    const elem = ref?.current

    if (!elem) {
      throw new Error('useIntersectionObserver ref is not defined')
    }

    const observer = new IntersectionObserver(
      ([e]) => {
        setEntry(e)
      },
      {
        root: options.root ?? null,
        rootMargin: options.rootMargin ?? '0px',
        threshold: options.threshold ?? 0,
      }
    )

    observer.observe(elem)

    return () => {
      observer.unobserve(elem)
    }
  }, [setEntry, options])

  return { ref, entry }
}

export default useIntersectionObserver
