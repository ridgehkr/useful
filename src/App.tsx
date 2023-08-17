import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useFetch from './hooks/useFetch'

// const employeeConverter = ({ data }: ResponseData) => {
//   return {
//     id: data.id,
//     employee_name: data.employee_name,
//     exmployee_salary: data.exmployee_salary,
//     employee_age: data.employee_age,
//     profile_image: data.profile_image,
//   } as Employee
// }

// type Employee = {
//   id: number
//   employee_name: string
//   exmployee_salary: number
//   employee_age: number
//   profile_image: string
// }

// type ResponseData = {
//   status: string
//   data: Employee
//   message: string
// }

function App() {
  const [count, setCount] = useState(0)
  const { load, data, loading, error } = useFetch()

  useEffect(() => {
    load('https://dummy.restapiexample.com/api/v1/employee/1')
  }, [load])

  useEffect(() => {
    console.log('data', data)
    console.log('loading', loading)
    console.log('error', error)
  }, [data, loading, error])

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
