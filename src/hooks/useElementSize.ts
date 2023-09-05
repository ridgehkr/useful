import { useState, useLayoutEffect } from 'react'

type ElementSize = {
  width: number
  height: number
  offsetWidth: number
  offsetHeight: number
}

const useElementSize = (ref: React.RefObject<HTMLElement>) => {
  const [size, setSize] = useState<ElementSize>({
    width: 0,
    height: 0,
    offsetWidth: 0,
    offsetHeight: 0,
  })

  useLayoutEffect(() => {
    if (!ref.current) return

    const element = ref.current

    setSize({
      width: ref.current.getBoundingClientRect().width,
      height: ref.current.getBoundingClientRect().height,
      offsetWidth: ref.current.offsetWidth,
      offsetHeight: ref.current.offsetHeight,
    })

    // listen for element resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          setSize({
            width: entry.target.getBoundingClientRect().width,
            height: entry.target.getBoundingClientRect().height,
            offsetWidth: (entry.target as HTMLElement).offsetWidth,
            offsetHeight: (entry.target as HTMLElement).offsetHeight,
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
