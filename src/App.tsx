import { useEffect } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'

type UserAddress = {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: {
    lat: string
    lng: string
  }
}

interface RequestResponse {
  id: number
  name: string
  username: string
  email: string
  address: UserAddress
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

interface User extends RequestResponse {
  //
}

function userConverter<User>(data: RequestResponse): User {
  return {
    id: data.id,
    name: data.name,
    username: data.username,
    email: data.email,
    address: data.address,
    phone: data.phone,
    website: data.website,
    company: {
      name: data.company.name,
      catchPhrase: data.company.catchPhrase,
      bs: data.company.bs,
    },
  } as User
}

function App() {
  const { load, data, loading, error } = useFetch(userConverter)

  useEffect(() => {
    load('https://jsonplaceholder.typicode.com/users/1')
  }, [load])

  useEffect(() => {
    // console.log('data', data)
    // console.log('loading', loading)
    // console.log('error', error)
  }, [data, loading, error])

  return (
    <>
      <h1>useFetch()</h1>

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      {data && (
        <article>
          <h2>{data.name}</h2>
          <p>Username: {data.username}</p>
          <p>
            Email: <a href={`mailto:${data.email}`}>{data.email}</a>
          </p>
        </article>
      )}
    </>
  )
}

export default App
