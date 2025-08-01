import { test, describe, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useFetch from '../hooks/useFetch'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('useFetch', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  /**
   * Run a mock fetch and analyze returned data
   */
  test('should fetch data', async () => {
    const mockData = { key: 'value', one: 'two' }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const { result } = renderHook(() => useFetch())

    await act(async () => {
      await result.current.load('http://echo.jsontest.com/key/value/one/two')
    })

    expect(result.current.data).toEqual({ key: 'value', one: 'two' })
    expect(mockFetch).toHaveBeenCalledWith(
      'http://echo.jsontest.com/key/value/one/two',
      {}
    )
  })

  /**
   * Run a mock fetch with custom headers and analyze returned data
   */
  test('should fetch data with custom headers', async () => {
    const mockData = { 'Useful-Hooks': 'Example-Header' }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

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
    expect(mockFetch).toHaveBeenCalledWith('http://headers.jsontest.com', {
      headers: {
        'Useful-Hooks': 'Example-Header',
      },
    })
  })

  /**
   * Run a mock fetch against a bogus URL and analyze the error message
   */
  test('should contain error message', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useFetch())

    await act(async () => {
      await result.current.load('https://docs.usefulhooks.com/bogus')
    })

    expect(
      result.current.error?.startsWith('Load operation could not be completed:')
    ).toBe(true)
    expect(result.current.error).toContain('Network error')
  })
})
