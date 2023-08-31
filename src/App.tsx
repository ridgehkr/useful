import './App.css'
import usePasswordGenerator from './hooks/usePasswordGenerator'

function App() {
  const {
    password,
    length,
    setLength,
    symbols,
    includeSymbols,
    numbers,
    includeNumbers,
    uppercase,
    includeUppercase,
  } = usePasswordGenerator()

  return (
    <div>
      <h1>Random Password Generator</h1>

      <h2>{password}</h2>

      <p>
        <label>
          Length:
          <input
            type='number'
            min={1}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
        </label>
      </p>

      <p>
        <label>
          <input
            type='checkbox'
            checked={uppercase}
            onChange={(e) => includeUppercase(!!e.target.checked)}
          />{' '}
          Include Uppercase Characters? {uppercase ? 'Yes' : 'No'}
        </label>
      </p>

      <p>
        <label>
          <input
            type='checkbox'
            checked={symbols}
            onChange={(e) => includeSymbols(!!e.target.checked)}
          />{' '}
          Include Symbols? {symbols ? 'Yes' : 'No'}
        </label>
      </p>

      <p>
        <label>
          <input
            type='checkbox'
            checked={numbers}
            onChange={(e) => includeNumbers(!!e.target.checked)}
          />{' '}
          Include Numbers? {numbers ? 'Yes' : 'No'}
        </label>
      </p>
    </div>
  )
}

export default App
