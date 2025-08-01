import { useMemo } from 'react'
import Color from 'color'

// Color space conversion constants
const COLOR_CONSTANTS = {
  // XYZ to RGB transformation matrix coefficients
  XYZ_TO_RGB: {
    R: { X: 3.2406, Y: -1.5372, Z: -0.4986 },
    G: { X: -0.9689, Y: 1.8758, Z: 0.0415 },
    B: { X: 0.0557, Y: -0.204, Z: 1.057 },
  },

  // Standard illuminant D65 white point
  WHITE_POINT: { X: 0.95047, Y: 1.0, Z: 1.08883 },

  // Gamma correction threshold
  GAMMA_THRESHOLD: 0.0031308,

  // LAB color space constants
  LAB: {
    DELTA: 6 / 29,
    DELTA_SQUARED: (6 / 29) ** 2,
    DELTA_CUBED: (6 / 29) ** 3,
    KAPPA: (29 / 3) ** 3,
    EPSILON: (6 / 29) ** 3,
  },

  // sRGB luminance coefficients (ITU-R BT.709)
  LUMINANCE: { R: 0.2126, G: 0.7152, B: 0.0722 },
} as const

/**
 * Represents detailed information about a parsed color
 */
export interface ColorInfo {
  /** Whether the color has an alpha channel with transparency */
  hasAlpha: boolean

  /** Alpha channel value (0-1) */
  alpha: number

  /** Hex representation including alpha if present */
  hex: string

  /** Hex representation without alpha channel */
  hexWithoutAlpha: string

  /** Hex representation blended with white background */
  blendedWithWhite: string
}

/**
 * Regular expressions for parsing different color formats
 */
const COLOR_REGEX = {
  HWB: /hwb\(\s*([0-9.]+)(?:deg)?\s+([0-9.%]+)\s+([0-9.%]+)\s*(?:\/\s*([0-9.%]+))?\s*\)/,
  LCH: /lch\(\s*([0-9.%]+)\s+([0-9.]+)\s+([0-9.]+)(?:deg)?\s*(?:\/\s*([0-9.%]+))?\s*\)/,
  OKLCH:
    /oklch\(\s*([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\s*(?:\/\s*([0-9.%]+))?\s*\)/,
} as const

/**
 * Parses a percentage or numeric string value
 * @param value - String value that may contain '%' or be numeric
 * @param isPercentage - Whether to treat as percentage (divide by 100)
 * @returns Parsed numeric value
 */
function parseNumericValue(value: string, isPercentage = false): number {
  const hasPercent = value.includes('%')
  const numValue = parseFloat(value)

  if (isPercentage && hasPercent) {
    return numValue / 100
  }

  return hasPercent && !isPercentage ? numValue / 100 : numValue
}

/**
 * Normalizes an angle to 0-360 degrees
 * @param angle - Angle in degrees
 * @returns Normalized angle between 0-360
 */
function normalizeAngle(angle: number): number {
  return ((angle % 360) + 360) % 360
}

/**
 * Applies gamma correction to an RGB component
 * @param component - RGB component value (0-1)
 * @returns Gamma-corrected value
 */
function applyGammaCorrection(component: number): number {
  return component > COLOR_CONSTANTS.GAMMA_THRESHOLD
    ? 1.055 * Math.pow(component, 1 / 2.4) - 0.055
    : 12.92 * component
}

/**
 * Clamps a value to the 0-255 RGB range
 * @param value - Value to clamp
 * @returns Clamped integer value
 */
function clampToRGB(value: number): number {
  return Math.round(Math.max(0, Math.min(1, value)) * 255)
}

/**
 * Parse HWB color format and convert to RGB
 * HWB format: hwb(H W B / A) where H=hue, W=whiteness, B=blackness, A=alpha
 * @param hwbString - HWB color string to parse
 * @returns Color instance or null if parsing fails
 */
function parseHWB(hwbString: string): InstanceType<typeof Color> | null {
  const match = hwbString.match(COLOR_REGEX.HWB)
  if (!match) return null

  const [, hStr, wStr, bStr, aStr] = match
  const H = normalizeAngle(parseFloat(hStr))
  const W = parseNumericValue(wStr, true)
  const B = parseNumericValue(bStr, true)
  const A = aStr ? parseNumericValue(aStr, aStr.includes('%')) : 1

  try {
    return convertHWBToColor(H, W, B, A)
  } catch {
    return null
  }
}

/**
 * Converts HWB values to a Color instance
 * @param H - Hue (0-360)
 * @param W - Whiteness (0-1)
 * @param B - Blackness (0-1)
 * @param A - Alpha (0-1)
 * @returns Color instance
 */
function convertHWBToColor(
  H: number,
  W: number,
  B: number,
  A: number
): InstanceType<typeof Color> {
  const sum = W + B

  if (sum >= 1) {
    // Gray color when W + B >= 1
    const gray = Math.round((W / sum) * 255)
    return Color.rgb(gray, gray, gray).alpha(A)
  }

  // Convert to HSL
  const lValue = (1 - B) / 2
  const sValue = sum === 0 ? 0 : (1 - W - B) / (1 - Math.abs(2 * lValue - 1))

  // Convert HSL to RGB using Color library
  return Color.hsl(H, sValue * 100, lValue * 100).alpha(A)
}

/**
 * Parse LCH color format and convert to RGB
 * LCH format: lch(L C H / A) where L=lightness, C=chroma, H=hue, A=alpha
 * @param lchString - LCH color string to parse
 * @returns Color instance or null if parsing fails
 */
function parseLCH(lchString: string): InstanceType<typeof Color> | null {
  const match = lchString.match(COLOR_REGEX.LCH)
  if (!match) return null

  const [, lStr, cStr, hStr, aStr] = match
  const L = parseNumericValue(lStr, lStr.includes('%'))
  const C = parseFloat(cStr)
  const H = parseFloat(hStr)
  const A = aStr ? parseNumericValue(aStr, aStr.includes('%')) : 1

  try {
    return convertLCHToColor(L, C, H, A)
  } catch {
    return null
  }
}

/**
 * Converts LCH values to a Color instance using simplified approximation
 * Note: This is a basic approximation - proper LCH conversion requires LAB intermediate
 * @param L - Lightness (0-100)
 * @param C - Chroma
 * @param H - Hue (0-360 degrees)
 * @param A - Alpha (0-1)
 * @returns Color instance
 */
function convertLCHToColor(
  L: number,
  C: number,
  H: number,
  A: number
): InstanceType<typeof Color> {
  // Convert LCH to LAB
  const hRad = (H * Math.PI) / 180
  const a = C * Math.cos(hRad)
  const b = C * Math.sin(hRad)

  // Convert LAB to XYZ
  const xyz = convertLABToXYZ(L, a, b)

  // Convert XYZ to RGB
  const rgb = convertXYZToRGB(xyz.x, xyz.y, xyz.z)

  return Color.rgb(rgb.r, rgb.g, rgb.b).alpha(A)
}

/**
 * Converts LAB color values to XYZ color space
 * @param L - Lightness
 * @param a - Green-Red component
 * @param b - Blue-Yellow component
 * @returns XYZ color values
 */
function convertLABToXYZ(
  L: number,
  a: number,
  b: number
): { x: number; y: number; z: number } {
  const fy = (L + 16) / 116
  const fx = a / 500 + fy
  const fz = fy - b / 200

  const xr = fx > COLOR_CONSTANTS.LAB.DELTA ? fx ** 3 : (fx - 16 / 116) / 7.787
  const yr = fy > COLOR_CONSTANTS.LAB.DELTA ? fy ** 3 : (fy - 16 / 116) / 7.787
  const zr = fz > COLOR_CONSTANTS.LAB.DELTA ? fz ** 3 : (fz - 16 / 116) / 7.787

  return {
    x: COLOR_CONSTANTS.WHITE_POINT.X * xr,
    y: COLOR_CONSTANTS.WHITE_POINT.Y * yr,
    z: COLOR_CONSTANTS.WHITE_POINT.Z * zr,
  }
}

/**
 * Converts XYZ color values to RGB color space
 * @param x - X component
 * @param y - Y component
 * @param z - Z component
 * @returns RGB color values (0-255)
 */
function convertXYZToRGB(
  x: number,
  y: number,
  z: number
): { r: number; g: number; b: number } {
  // Apply XYZ to RGB transformation matrix
  let r =
    x * COLOR_CONSTANTS.XYZ_TO_RGB.R.X +
    y * COLOR_CONSTANTS.XYZ_TO_RGB.R.Y +
    z * COLOR_CONSTANTS.XYZ_TO_RGB.R.Z

  let g =
    x * COLOR_CONSTANTS.XYZ_TO_RGB.G.X +
    y * COLOR_CONSTANTS.XYZ_TO_RGB.G.Y +
    z * COLOR_CONSTANTS.XYZ_TO_RGB.G.Z

  let b =
    x * COLOR_CONSTANTS.XYZ_TO_RGB.B.X +
    y * COLOR_CONSTANTS.XYZ_TO_RGB.B.Y +
    z * COLOR_CONSTANTS.XYZ_TO_RGB.B.Z

  // Apply gamma correction
  r = applyGammaCorrection(r)
  g = applyGammaCorrection(g)
  b = applyGammaCorrection(b)

  return {
    r: clampToRGB(r),
    g: clampToRGB(g),
    b: clampToRGB(b),
  }
}

/**
 * Parse OKLCH color format and convert to RGB
 * OKLCH format: oklch(L C H / A) where L=lightness, C=chroma, H=hue, A=alpha
 * @param oklchString - OKLCH color string to parse
 * @returns Color instance or null if parsing fails
 */
function parseOKLCH(oklchString: string): InstanceType<typeof Color> | null {
  const match = oklchString.match(COLOR_REGEX.OKLCH)
  if (!match) return null

  const [, lStr, cStr, hStr, aStr] = match
  const L = parseFloat(lStr)
  const C = parseFloat(cStr)
  const H = parseFloat(hStr)
  const A = aStr ? parseNumericValue(aStr, aStr.includes('%')) : 1

  try {
    return convertOKLCHToColor(L, C, H, A)
  } catch {
    return null
  }
}

/**
 * Converts OKLCH values to a Color instance using approximation
 * Note: This is a simplified conversion - for production use, consider a proper color space library
 * @param L - Lightness (0-1)
 * @param C - Chroma
 * @param H - Hue (0-360 degrees)
 * @param A - Alpha (0-1)
 * @returns Color instance
 */
function convertOKLCHToColor(
  L: number,
  C: number,
  H: number,
  A: number
): InstanceType<typeof Color> {
  // Convert to approximate sRGB values
  // This is a basic approximation - OKLCH conversion is complex
  const hRad = (H * Math.PI) / 180
  const a = C * Math.cos(hRad)
  const b = C * Math.sin(hRad)

  // Simplified OKLCH to sRGB conversion (approximate)
  // For accurate conversion, you'd need the full OKLCH->XYZ->sRGB transform
  const r = Math.max(0, Math.min(1, L + 0.3963377774 * a + 0.2158037573 * b))
  const g = Math.max(0, Math.min(1, L - 0.1055613458 * a - 0.0638541728 * b))
  const bComponent = Math.max(
    0,
    Math.min(1, L - 0.0894841775 * a - 1.291485548 * b)
  )

  // Convert to 0-255 range
  const rgb = [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(bComponent * 255),
  ]

  return Color.rgb(rgb[0], rgb[1], rgb[2]).alpha(A)
}

/**
 * Enhanced color parsing that supports OKLCH, HWB, LCH and other formats
 * Attempts to parse modern CSS color functions first, then falls back to standard formats
 * @param colorString - Color string to parse in any supported format
 * @returns Color instance or null if parsing fails
 */
function parseColor(colorString: string): InstanceType<typeof Color> | null {
  if (!colorString || colorString.trim() === '') {
    return null
  }

  const trimmed = colorString.trim()

  // Try modern CSS color functions first
  if (trimmed.startsWith('oklch(')) {
    const oklchColor = parseOKLCH(trimmed)
    if (oklchColor) return oklchColor
  }

  if (trimmed.startsWith('hwb(')) {
    const hwbColor = parseHWB(trimmed)
    if (hwbColor) return hwbColor
  }

  if (trimmed.startsWith('lch(')) {
    const lchColor = parseLCH(trimmed)
    if (lchColor) return lchColor
  }

  // Fall back to standard Color library for rgb, hsl, hex, named colors, etc.
  try {
    return Color(trimmed)
  } catch {
    return null
  }
}

/**
 * Calculates the relative luminance of a color according to WCAG guidelines
 * Uses the ITU-R BT.709 standard for sRGB color space
 * @param c - Color instance to calculate luminance for
 * @returns Relative luminance value (0-1)
 */
function relativeLuminance(c: InstanceType<typeof Color>): number {
  const rgb = c
    .rgb()
    .array()
    .map((ch: number) => {
      const v = ch / 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })

  return (
    COLOR_CONSTANTS.LUMINANCE.R * rgb[0] +
    COLOR_CONSTANTS.LUMINANCE.G * rgb[1] +
    COLOR_CONSTANTS.LUMINANCE.B * rgb[2]
  )
}

/**
 * Gets detailed information about a color including alpha channel data
 * Provides comprehensive color analysis including transparency handling
 * @param colorString - Color string in any supported format
 * @returns ColorInfo object with detailed color data, or null if parsing fails
 */
export function getColorInfo(colorString: string): ColorInfo | null {
  if (!colorString || colorString.trim() === '') {
    return null
  }

  try {
    const color = parseColor(colorString)
    if (!color) return null

    const alpha = color.alpha()
    const hasAlpha = alpha < 1

    // Get the color without alpha
    const colorWithoutAlpha = color.alpha(1)

    // Blend with white background if alpha is present
    const blendedWithWhite = hasAlpha
      ? Color.rgb(
          Math.round(color.red() * alpha + 255 * (1 - alpha)),
          Math.round(color.green() * alpha + 255 * (1 - alpha)),
          Math.round(color.blue() * alpha + 255 * (1 - alpha))
        )
      : color

    return {
      hasAlpha,
      alpha,
      hex: color.hex(),
      hexWithoutAlpha: colorWithoutAlpha.hex(),
      blendedWithWhite: blendedWithWhite.hex(),
    }
  } catch (error) {
    console.warn('Invalid color provided to getColorInfo:', {
      colorString,
      error,
    })
    return null
  }
}

/**
 * Converts any valid CSS color string to hex format
 * Supports all modern CSS color formats including OKLCH, HWB, and LCH
 * @param colorString - Color string in any supported format
 * @returns Hex color string (e.g., '#FF0000') or empty string if invalid
 */
export function colorToHex(colorString: string): string {
  if (!colorString || colorString.trim() === '') {
    return ''
  }

  try {
    const color = parseColor(colorString)
    if (!color) return ''
    return color.hex()
  } catch (error) {
    console.warn('Invalid color provided to colorToHex:', {
      colorString,
      error,
    })
    return ''
  }
}

/**
 * Validates if a color string is valid and parseable
 * Tests against all supported color formats
 * @param colorString - Color string to validate
 * @returns True if the color string can be parsed successfully
 */
export function isValidColor(colorString: string): boolean {
  if (!colorString || colorString.trim() === '') {
    return false
  }

  const color = parseColor(colorString)
  return color !== null
}

/**
 * React hook that calculates the contrast ratio between two colors according to WCAG guidelines
 *
 * The contrast ratio is calculated using the relative luminance of both colors and follows
 * the WCAG 2.1 specification. Higher ratios indicate better contrast for accessibility.
 *
 * WCAG contrast requirements:
 * - Normal text: 4.5:1 (AA), 7:1 (AAA)
 * - Large text: 3:1 (AA), 4.5:1 (AAA)
 *
 * @param colorA - First color string in any supported CSS format
 * @param colorB - Second color string in any supported CSS format
 * @returns Contrast ratio as a number (1:1 to 21:1), or 0 if colors are invalid
 */
export default function useColorContrast(
  colorA: string = '',
  colorB: string = ''
): number {
  return useMemo(() => {
    // Handle empty string cases
    if (!colorA || !colorB || colorA.trim() === '' || colorB.trim() === '') {
      return 0
    }

    try {
      const c1 = parseColor(colorA)
      const c2 = parseColor(colorB)

      if (!c1 || !c2) return 0

      const L1 = relativeLuminance(c1)
      const L2 = relativeLuminance(c2)

      const lighter = Math.max(L1, L2)
      const darker = Math.min(L1, L2)

      const ratio = (lighter + 0.05) / (darker + 0.05)

      // Ensure we return a valid number
      if (!isFinite(ratio) || isNaN(ratio)) {
        return 0
      }

      return parseFloat(ratio.toFixed(2))
    } catch (error) {
      // Handle Color constructor errors (invalid color strings)
      console.warn('Invalid color provided to useColorContrast:', {
        colorA,
        colorB,
        error,
      })
      return 0
    }
  }, [colorA, colorB])
}

// Also export as named export for consistency
export { useColorContrast }
