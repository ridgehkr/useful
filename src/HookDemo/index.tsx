import useAsync from '../hooks/useAsync'
import { createRoot } from 'react-dom/client'
import style from './HookDemo.module.css'
import '@fontsource-variable/inter'

const asyncFunction = async (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello, world!')
    }, 5000)
  })
}

const HookDemo = () => {
  const { data, loading, error } = useAsync<string>(asyncFunction, true)

  return (
    <div className={style.demo}>
      <header className={style.header}>
        <h1>useAsync</h1>
      </header>

      {loading && <p>Loading...</p>}

      {error?.message && <p>Error: {error.message}</p>}

      {data && <p>{data}</p>}
    </div>
  )
}

export default HookDemo

createRoot(document.getElementById('root') as HTMLElement).render(<HookDemo />)
