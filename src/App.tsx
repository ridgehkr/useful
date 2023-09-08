import './App.css'
import useSlideshow from './hooks/useSlideshow'
import slideContent from './slideshowData.json'

function App() {
  // Initialize the slideshow using the custom hook
  const { slides, activeSlideIndex, addSlide, removeSlide, activateSlide } =
    useSlideshow<React.ReactNode>()

  // Function to add a new slide
  const handleAddSlide = () => {
    addSlide(`Slide ${slides.length + 1}: ${slideContent[slides.length]}`)
  }

  // Function to remove the active slide
  const handleRemoveSlide = () => {
    removeSlide(activeSlideIndex)
  }

  // Function to activate a specific slide by index
  const handleActivateSlide = (index: number) => {
    activateSlide(index)
  }

  // Function to navigate to the previous slide
  const handlePreviousSlide = () => {
    activateSlide(activeSlideIndex - 1)
  }

  // Function to navigate to the next slide
  const handleNextSlide = () => {
    activateSlide(activeSlideIndex + 1)
  }

  return (
    <div>
      <h1>Slideshow</h1>
      <button onClick={handleAddSlide}>Add Slide</button>
      <button onClick={handleRemoveSlide}>Remove Active Slide</button>
      <button onClick={handlePreviousSlide}>Previous Slide</button>
      <button onClick={handleNextSlide}>Next Slide</button>
      <ul>
        {slides.map((slide, index) => (
          <li
            key={index}
            className={
              index === activeSlideIndex ? 'activeSlide' : 'inactiveSlide'
            }
          >
            <button onClick={() => handleActivateSlide(index)}>{slide}</button>
          </li>
        ))}
      </ul>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          gap: '1em',
          justifyContent: 'center',
        }}
      >
        {slides.map((_, index) => (
          <li
            key={index}
            className={
              index === activeSlideIndex ? 'activeSlideDot' : 'inactiveSlideDot'
            }
          >
            <button onClick={() => activateSlide(index)}>&bull;</button>
          </li>
        ))}
      </ul>
      <p>Total slides: {slides.length}</p>
    </div>
  )
}

export default App
