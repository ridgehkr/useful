import { useEffect, useRef, useState } from 'react'

type IntersectionObserverOptions = {
  root: HTMLElement | null
  rootMargin: string
  threshold: number | number[]
}

const useIntersectionObserver = (options: IntersectionObserverOptions) => {
  const ref = useRef(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  useEffect(() => {
    const elem = ref?.current

    if (!elem) {
      throw new Error('useIntersectionObserver ref is not defined')
    }

    const observer = new IntersectionObserver(([e]) => {
      setEntry(e)
    }, options)

    observer.observe(elem)

    return () => {
      observer.unobserve(elem)
    }
  }, [setEntry, options])

  return { ref, entry }
}

export default useIntersectionObserver
