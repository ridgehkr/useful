import { useState, useLayoutEffect } from 'react'

/**
 * The size of an elementin pixels. (width, height)
 *
 * @property {number} width - The width of the element in pixels
 * @property {number} height - The height of the element in pixels
 */
export type ElementSize = {
  width: number
  height: number
}

/**
 * Track the size of an element (width, height)
 *
 * @param ref - A React ref object
 * @returns {ElementSize} - The size of the element in pixels (width, height)
 */
const useElementSize = (ref: React.RefObject<HTMLElement>) => {
  const [size, setSize] = useState<ElementSize>({
    width: 0,
    height: 0,
  })

  useLayoutEffect(() => {
    if (!ref.current) return

    const element = ref.current

    setSize({
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    })

    // listen for element resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          setSize({
            width: (entry.target as HTMLElement).offsetWidth,
            height: (entry.target as HTMLElement).offsetHeight,
          })
        }
      }
    })

    resizeObserver.observe(element)

    return () => {
      if (resizeObserver) {
        resizeObserver.unobserve(element)
      }
    }
  }, [ref])

  return size
}

export default useElementSize
