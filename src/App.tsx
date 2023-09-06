import './App.css'
import useWindowSize from './hooks/useWindowSize'

function App() {
  const { width, height } = useWindowSize()

  return (
    <div>
      <p>
        Window width: <strong>{width}</strong>
      </p>
      <p>
        Window height: <strong>{height}</strong>
      </p>
      <p>(Resize the window to see how the width and height values change.)</p>
    </div>
  )
}

export default App
