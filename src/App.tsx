import './App.css'
import demoData from './demoData'
import useIntersectionObserver from './hooks/useIntersectionObserver'

const Figure = ({ src, caption }) => {
  const { ref, entry } = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  })

  return (
    <article>
      <figure ref={ref}>
        {entry?.isIntersecting && (
          <>
            <img src={src} alt='Lazy-loaded image' />
            <figcaption>{caption}</figcaption>
          </>
        )}
      </figure>
    </article>
  )
}

function App() {
  return (
    <div>
      <header>
        <h1>Lazy-Load Images</h1>
      </header>

      {demoData.map(({ src, caption }, index) => {
        return <Figure key={index} src={src} caption={caption} />
      })}
    </div>
  )
}

export default App
