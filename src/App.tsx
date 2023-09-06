import './App.css'
import useCustomCSSProp from './hooks/useCustomCSSProp'

function App() {
  const customPropValue = useCustomCSSProp('--my-value')

  return (
    <div>
      <p>
        The value of --my-value is: <span>{customPropValue}</span>
      </p>

      <button
        onClick={() =>
          document.documentElement.style.setProperty('--my-value', 'red')
        }
      >
        Set --my-value to red
      </button>
    </div>
  )
}

export default App
