import { useState } from 'react'
import './App.css'
import useThrottle from './hooks/useThrottle'

function App() {
  const [val, setVal] = useState('')
  const throttledValue = useThrottle(val)

  return (
    <section>
      <h1>useThrottle</h1>
      <input
        placeholder='Type some text'
        style={{ background: 'var(--charcoal)' }}
        type='text'
        value={val}
        onChange={(e) => {
          setVal(e.target.value)
        }}
      />
      <p>Val: {val}</p>
      <p>Throttled: {throttledValue}</p>
    </section>
  )
}

export default App
