/**
 * Represents detailed information about a parsed color
 */
export interface ColorInfo {
    /** Whether the color has an alpha channel with transparency */
    hasAlpha: boolean;
    /** Alpha channel value (0-1) */
    alpha: number;
    /** Hex representation including alpha if present */
    hex: string;
    /** Hex representation without alpha channel */
    hexWithoutAlpha: string;
    /** Hex representation blended with white background */
    blendedWithWhite: string;
}
/**
 * Gets detailed information about a color including alpha channel data
 * Provides comprehensive color analysis including transparency handling
 * @param colorString - Color string in any supported format
 * @returns ColorInfo object with detailed color data, or null if parsing fails
 * @example
 * ```typescript
 * const info = getColorInfo('rgba(255, 0, 0, 0.5)')
 * // Returns: { hasAlpha: true, alpha: 0.5, hex: '#FF0000', ... }
 * ```
 */
export declare function getColorInfo(colorString: string): ColorInfo | null;
/**
 * Converts any valid CSS color string to hex format
 * Supports all modern CSS color formats including OKLCH, HWB, and LCH
 * @param colorString - Color string in any supported format
 * @returns Hex color string (e.g., '#FF0000') or empty string if invalid
 * @example
 * ```typescript
 * colorToHex('rgb(255, 0, 0)') // '#FF0000'
 * colorToHex('hwb(0 0% 0%)') // '#FF0000'
 * colorToHex('invalid') // ''
 * ```
 */
export declare function colorToHex(colorString: string): string;
/**
 * Validates if a color string is valid and parseable
 * Tests against all supported color formats
 * @param colorString - Color string to validate
 * @returns True if the color string can be parsed successfully
 * @example
 * ```typescript
 * isValidColor('#FF0000') // true
 * isValidColor('rgb(255, 0, 0)') // true
 * isValidColor('oklch(0.5 0.2 180)') // true
 * isValidColor('not-a-color') // false
 * ```
 */
export declare function isValidColor(colorString: string): boolean;
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
 *
 * @example
 * ```typescript
 * // Basic usage
 * const ratio = useColorContrast('#000000', '#FFFFFF') // 21 (perfect contrast)
 * const ratio = useColorContrast('rgb(255, 0, 0)', 'hsl(240, 100%, 50%)') // ~2.14
 *
 * // Modern CSS color formats
 * const ratio = useColorContrast('oklch(0.5 0.2 180)', 'hwb(0 20% 20%)')
 *
 * // Check accessibility compliance
 * const textColor = '#333333'
 * const bgColor = '#FFFFFF'
 * const ratio = useColorContrast(textColor, bgColor)
 * const isAccessible = ratio >= 4.5 // WCAG AA compliant for normal text
 * ```
 */
export default function useColorContrast(colorA?: string, colorB?: string): number;
export { useColorContrast };
