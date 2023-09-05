import './App.css'
import { useRef, useState } from 'react'
import useElementSize from './hooks/useElementSize'

function App() {
  const sizeRef = useRef<HTMLDivElement>(null)
  const { width, height, offsetWidth, offsetHeight } = useElementSize(sizeRef)
  const [modSize, setModSize] = useState(200)

  return (
    <div>
      <h1>Use Element Size</h1>

      <p>
        This is a box that is originally 500px square, but has been scaled in
        half via `transform`. The width and height are the actual rendered size,
        while the offset width and height represent how much rendered space the
        box takes up on the page.
      </p>

      <p>
        <label>
          Change box size:
          <br />
          <input
            type='range'
            min='100'
            max='800'
            value={modSize}
            step='10'
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setModSize(parseInt(e.currentTarget.value))
            }
          />
        </label>
      </p>
      <textarea
        style={{
          width: modSize,
          height: modSize,
          margin: '0 auto',
          border: '1px solid black',
          backgroundColor: '#cfcfcf',
          resize: 'both',
          transform: 'scale(0.5)',
        }}
        ref={sizeRef}
      />

      <h2>Box size:</h2>
      <p>
        width: <code>{width}</code>
        <br />
        height: <code>{height}</code>
        <br />
        offset width: <code>{offsetWidth}</code>
        <br />
        offset height: <code>{offsetHeight}</code>
        <br />
      </p>
    </div>
  )
}

export default App
