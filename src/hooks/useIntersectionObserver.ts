import { useLayoutEffect, useRef, useState } from 'react'

type IntersectionObserverOptions = {
  root: HTMLElement | null
  rootMargin: string
  threshold: number | number[]
}

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
