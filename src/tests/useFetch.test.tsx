import { test, describe, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useFetch from '../hooks/useFetch'

describe('useFetch', () => {
  /**
   * Run a mock fetch and analyze returned data
   */
  test('should fetch data', async () => {
    const { result } = renderHook(() => useFetch())

    await act(async () => {
      await result.current.load('http://echo.jsontest.com/key/value/one/two')
    })

    expect(result.current.data).toEqual({ key: 'value', one: 'two' })
  })

  /**
   * Run a mock fetch with custom headers and analyze returned data
   */
  test('should fetch data with custom headers', async () => {
    const { result } = renderHook(() => useFetch<Record<string, string>>())

    await act(async () => {
      await result.current.load('http://headers.jsontest.com', {
        headers: {
          'Useful-Hooks': 'Example-Header',
        },
      })
    })

    expect(result.current.data && result.current.data['Useful-Hooks']).toBe(
      'Example-Header'
    )
  })

  /**
   * Run a mock fetch against a bogus URL and analyze the error message
   */
  test('should contain error message', async () => {
    const { result } = renderHook(() => useFetch())

    await act(async () => {
      await result.current.load('https://docs.usefulhooks.com/bogus')
    })

    expect(
      result.current.error?.startsWith('Load operation could not be completed:')
    ).toBe(true)
  })
})
