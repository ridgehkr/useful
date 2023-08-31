import './App.css'
import usePasswordGenerator from './hooks/usePasswordGenerator'

function App() {
  const {
    password,
    length,
    setLength,
    includeSymbols,
    setIncludeSymbols,
    includeNumbers,
    setIncludeNumbers,
    includeUppercase,
    setIncludeUppercase,
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
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(!!e.target.checked)}
          />{' '}
          Include Uppercase Characters? {includeUppercase ? 'Yes' : 'No'}
        </label>
      </p>

      <p>
        <label>
          <input
            type='checkbox'
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(!!e.target.checked)}
          />{' '}
          Include Symbos? {includeSymbols ? 'Yes' : 'No'}
        </label>
      </p>

      <p>
        <label>
          <input
            type='checkbox'
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(!!e.target.checked)}
          />{' '}
          Include Numbers? {includeNumbers ? 'Yes' : 'No'}
        </label>
      </p>
    </div>
  )
}

export default App
