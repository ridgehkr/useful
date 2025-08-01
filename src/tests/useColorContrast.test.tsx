import { test, describe, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import useColorContrast, {
  getColorInfo,
  colorToHex,
  isValidColor,
} from '../hooks/useColorContrast'

describe('useColorContrast', () => {
  test('should calculate contrast ratio for black and white', () => {
    const { result } = renderHook(() => useColorContrast('#000000', '#FFFFFF'))
    expect(result.current).toBe(21)
  })

  test('should calculate contrast ratio for same colors', () => {
    const { result } = renderHook(() => useColorContrast('#FF0000', '#FF0000'))
    expect(result.current).toBe(1)
  })

  test('should calculate contrast ratio for standard colors', () => {
    const { result } = renderHook(() => useColorContrast('#FF0000', '#00FF00'))
    expect(result.current).toBeCloseTo(2.91, 1)
  })

  test('should handle RGB color format', () => {
    const { result } = renderHook(() =>
      useColorContrast('rgb(255, 0, 0)', 'rgb(0, 255, 0)')
    )
    expect(result.current).toBeCloseTo(2.91, 1)
  })

  test('should handle HSL color format', () => {
    const { result } = renderHook(() =>
      useColorContrast('hsl(0, 100%, 50%)', 'hsl(120, 100%, 50%)')
    )
    expect(result.current).toBeCloseTo(2.91, 1)
  })

  test('should handle HWB color format', () => {
    // HWB format is supported through custom parsing
    const { result } = renderHook(() =>
      useColorContrast('hwb(0 0% 0%)', 'hwb(120 0% 0%)')
    )
    expect(result.current).toBeGreaterThanOrEqual(1)
  })

  test('should handle LCH color format', () => {
    // LCH format is supported through custom parsing
    const { result } = renderHook(() =>
      useColorContrast('lch(50 50 0)', 'lch(70 30 120)')
    )
    expect(result.current).toBeGreaterThan(1)
  })

  test('should handle OKLCH color format', () => {
    // OKLCH format is supported through custom parsing
    const { result } = renderHook(() =>
      useColorContrast('oklch(0.5 0.1 0)', 'oklch(0.7 0.05 120)')
    )
    expect(result.current).toBeGreaterThan(1)
  })

  test('should handle named colors', () => {
    const { result } = renderHook(() => useColorContrast('red', 'blue'))
    expect(result.current).toBeCloseTo(2.15, 1)
  })

  test('should return 0 for empty strings', () => {
    const { result } = renderHook(() => useColorContrast('', ''))
    expect(result.current).toBe(0)
  })

  test('should return 0 for whitespace strings', () => {
    const { result } = renderHook(() => useColorContrast('   ', '   '))
    expect(result.current).toBe(0)
  })

  test('should return 0 for invalid color strings', () => {
    const { result } = renderHook(() =>
      useColorContrast('invalid', 'not-a-color')
    )
    expect(result.current).toBe(0)
  })

  test('should return 0 when one color is invalid', () => {
    const { result } = renderHook(() => useColorContrast('#FF0000', 'invalid'))
    expect(result.current).toBe(0)
  })

  test('should handle colors with alpha channels', () => {
    const { result } = renderHook(() =>
      useColorContrast('rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.8)')
    )
    expect(result.current).toBeCloseTo(2.91, 1)
  })

  test('should handle percentage values in RGB', () => {
    const { result } = renderHook(() =>
      useColorContrast('rgb(100%, 0%, 0%)', 'rgb(0%, 100%, 0%)')
    )
    expect(result.current).toBeCloseTo(2.91, 1)
  })

  test('should handle HWB with percentage values', () => {
    // HWB format is supported through custom parsing
    const { result } = renderHook(() =>
      useColorContrast('hwb(0deg 0% 0%)', 'hwb(120deg 0% 0%)')
    )
    expect(result.current).toBeGreaterThanOrEqual(1)
  })

  test('should handle LCH with percentage lightness', () => {
    // LCH format is supported through custom parsing
    const { result } = renderHook(() =>
      useColorContrast('lch(0% 0 0)', 'lch(100% 0 0)')
    )
    expect(result.current).toBeGreaterThan(1)
  })

  test('should recalculate when colors change', () => {
    const { result, rerender } = renderHook(
      ({ colorA, colorB }: { colorA: string; colorB: string }) =>
        useColorContrast(colorA, colorB),
      { initialProps: { colorA: '#000000', colorB: '#FFFFFF' } }
    )

    expect(result.current).toBeCloseTo(21, 0)

    rerender({ colorA: '#FF0000', colorB: '#00FF00' })
    expect(result.current).toBeCloseTo(2.91, 1)
  })

  test('should handle invalid colors gracefully', () => {
    const { result } = renderHook(() =>
      useColorContrast('invalid', 'also-invalid')
    )
    expect(result.current).toBe(0)
  })
})

describe('getColorInfo', () => {
  test('should return null for empty string', () => {
    expect(getColorInfo('')).toBeNull()
  })

  test('should return null for whitespace string', () => {
    expect(getColorInfo('   ')).toBeNull()
  })

  test('should return null for invalid color', () => {
    expect(getColorInfo('not-a-color')).toBeNull()
  })

  test('should return color info for valid hex color', () => {
    const info = getColorInfo('#FF0000')

    expect(info).toMatchObject({
      hex: '#FF0000',
      hasAlpha: false,
      alpha: 1,
      hexWithoutAlpha: expect.any(String),
      blendedWithWhite: expect.any(String),
    })
  })

  test('should return color info for RGB color', () => {
    const info = getColorInfo('rgb(255, 0, 0)')

    expect(info).toMatchObject({
      hex: '#FF0000',
      hasAlpha: false,
      alpha: 1,
      hexWithoutAlpha: expect.any(String),
      blendedWithWhite: expect.any(String),
    })
  })

  test('should handle alpha channel correctly', () => {
    const info = getColorInfo('rgba(255, 0, 0, 0.5)')

    expect(info).toMatchObject({
      hex: '#FF0000',
      hasAlpha: true,
      alpha: 0.5,
      hexWithoutAlpha: expect.any(String),
      blendedWithWhite: expect.any(String),
    })
  })

  test('should handle HSL color', () => {
    const info = getColorInfo('hsl(0, 100%, 50%)')

    expect(info).toMatchObject({
      hex: '#FF0000',
      hasAlpha: false,
      alpha: 1,
      hexWithoutAlpha: expect.any(String),
      blendedWithWhite: expect.any(String),
    })
  })

  test('should handle named colors', () => {
    const info = getColorInfo('red')

    expect(info).toMatchObject({
      hex: '#FF0000',
      hasAlpha: false,
      alpha: 1,
      hexWithoutAlpha: expect.any(String),
      blendedWithWhite: expect.any(String),
    })
  })

  test('should return color info for supported HWB format', () => {
    const info = getColorInfo('hwb(0 0% 0%)')

    expect(info).toMatchObject({
      hasAlpha: false,
      alpha: 1,
      hex: expect.any(String),
      hexWithoutAlpha: expect.any(String),
      blendedWithWhite: expect.any(String),
    })
  })

  test('should return null for invalid color input', () => {
    const info = getColorInfo('invalid-color')
    expect(info).toBeNull()
  })
})

describe('colorToHex', () => {
  test('should return empty string for empty input', () => {
    expect(colorToHex('')).toBe('')
  })

  test('should return empty string for whitespace input', () => {
    expect(colorToHex('   ')).toBe('')
  })

  test('should return empty string for invalid color', () => {
    expect(colorToHex('not-a-color')).toBe('')
  })

  test('should convert hex color to hex', () => {
    expect(colorToHex('#FF0000')).toBe('#FF0000')
  })

  test('should convert RGB to hex', () => {
    expect(colorToHex('rgb(255, 0, 0)')).toBe('#FF0000')
  })

  test('should convert HSL to hex', () => {
    expect(colorToHex('hsl(0, 100%, 50%)')).toBe('#FF0000')
  })

  test('should convert named color to hex', () => {
    expect(colorToHex('red')).toBe('#FF0000')
  })

  test('should handle RGB with alpha', () => {
    expect(colorToHex('rgba(255, 0, 0, 0.5)')).toBe('#FF0000')
  })

  test('should convert HWB to hex', () => {
    // HWB format is supported through custom parsing
    expect(colorToHex('hwb(0 0% 0%)')).toMatch(/#[0-9A-F]{6}/)
  })

  test('should handle percentage RGB values', () => {
    expect(colorToHex('rgb(100%, 0%, 0%)')).toBe('#FF0000')
  })

  test('should convert uppercase hex', () => {
    expect(colorToHex('#ff0000')).toBe('#FF0000')
  })

  test('should convert 3-digit hex', () => {
    expect(colorToHex('#F00')).toBe('#FF0000')
  })

  test('should return empty string for invalid color input', () => {
    const result = colorToHex('invalid-color')
    expect(result).toBe('')
  })
})

describe('isValidColor', () => {
  test('should return false for empty string', () => {
    expect(isValidColor('')).toBe(false)
  })

  test('should return false for whitespace string', () => {
    expect(isValidColor('   ')).toBe(false)
  })

  test('should return false for invalid color', () => {
    expect(isValidColor('not-a-color')).toBe(false)
  })

  test('should return true for valid hex color', () => {
    expect(isValidColor('#FF0000')).toBe(true)
  })

  test('should return true for valid RGB color', () => {
    expect(isValidColor('rgb(255, 0, 0)')).toBe(true)
  })

  test('should return true for valid HSL color', () => {
    expect(isValidColor('hsl(0, 100%, 50%)')).toBe(true)
  })

  test('should return true for named colors', () => {
    expect(isValidColor('red')).toBe(true)
    expect(isValidColor('blue')).toBe(true)
    expect(isValidColor('green')).toBe(true)
  })

  test('should return true for supported HWB color', () => {
    expect(isValidColor('hwb(0 0% 0%)')).toBe(true)
  })

  test('should return true for supported LCH color', () => {
    expect(isValidColor('lch(50 50 0)')).toBe(true)
  })

  test('should return true for supported OKLCH color', () => {
    expect(isValidColor('oklch(0.5 0.1 0)')).toBe(true)
  })

  test('should return true for colors with alpha', () => {
    expect(isValidColor('rgba(255, 0, 0, 0.5)')).toBe(true)
  })

  test('should return true for percentage RGB values', () => {
    expect(isValidColor('rgb(100%, 0%, 0%)')).toBe(true)
  })

  test('should return true for 3-digit hex', () => {
    expect(isValidColor('#F00')).toBe(true)
  })

  test('should return true for 8-digit hex with alpha', () => {
    expect(isValidColor('#FF000080')).toBe(true)
  })

  test('should return false for malformed hex', () => {
    expect(isValidColor('#GG0000')).toBe(false)
  })

  test('should return true for RGB with values over 255', () => {
    // The color library accepts rgb(300, 0, 0) and clamps it to valid range
    expect(isValidColor('rgb(300, 0, 0)')).toBe(true)
  })
})

describe('Modern CSS color formats', () => {
  test('should handle LCH with various formats', () => {
    // LCH format is supported through custom parsing
    expect(isValidColor('lch(50 50 0)')).toBe(true)
    expect(isValidColor('lch(50% 50 0deg)')).toBe(true)
  })

  test('should handle OKLCH with alpha', () => {
    // OKLCH format is supported through custom parsing
    expect(isValidColor('oklch(0.5 0.1 0 / 0.5)')).toBe(true)
  })

  test('should handle HWB with degree notation', () => {
    // HWB format is supported through custom parsing
    expect(isValidColor('hwb(0deg 0% 0%)')).toBe(true)
  })

  test('should calculate contrast for modern formats', () => {
    // Modern formats are supported and should return a valid contrast ratio
    const { result } = renderHook(() =>
      useColorContrast('lch(50 50 0)', 'oklch(0.7 0.1 120)')
    )
    expect(result.current).toBeGreaterThan(1)
  })
})

describe('Edge cases and error handling', () => {
  test('should handle extreme contrast ratios', () => {
    const { result } = renderHook(() => useColorContrast('#000000', '#FFFFFF'))
    expect(result.current).toBe(21)
  })

  test('should handle very similar colors', () => {
    const { result } = renderHook(() => useColorContrast('#000000', '#000001'))
    expect(result.current).toBeCloseTo(1, 2)
  })

  test('should handle colors that produce infinite/NaN ratios gracefully', () => {
    const { result } = renderHook(() => useColorContrast('invalid', '#FFFFFF'))
    expect(result.current).toBe(0)
    expect(Number.isFinite(result.current)).toBe(true)
  })

  test('should handle mixed valid and invalid colors', () => {
    const { result } = renderHook(() => useColorContrast('#FF0000', 'invalid'))
    expect(result.current).toBe(0)
  })

  test('should handle case sensitivity for named colors', () => {
    // The color library is case sensitive for named colors
    expect(isValidColor('RED')).toBe(false)
    expect(isValidColor('Blue')).toBe(false)
    expect(isValidColor('WHITE')).toBe(false)
  })
})
