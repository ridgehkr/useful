/**
 * The options for generating a random string.
 *
 * @typedef {Object} StringGeneratorOptions
 * @property {number} [length=12] - The length of the string to generate.
 * @property {boolean} [symbols=true] - Whether to include symbols in the generated string.
 * @property {boolean} [numbers=true] - Whether to include numbers in the generated string.
 * @property {boolean} [uppercase=true] - Whether to include uppercase letters in the generated string.
 */
export type StringGeneratorOptions = {
    length?: number;
    symbols?: boolean;
    numbers?: boolean;
    uppercase?: boolean;
};
/**
 * A randomly-generated string, the properties it was created with, and functions to change these properties.
 *
 * @typedef {Object} RandomString
 * @property {string} value - The randomly-generated string.
 * @property {number} length - The length of the string to generate.
 * @property {function} setLength - Set the length of the string to generate.
 * @property {boolean} symbols - Whether to include symbols in the generated string.
 * @property {function} includeSymbols - Set whether to include symbols in the generated string.
 * @property {boolean} numbers - Whether to include numbers in the generated string.
 * @property {function} includeNumbers - Set whether to include numbers in the generated string.
 * @property {boolean} uppercase - Whether to include uppercase letters in the generated string.
 * @property {function} includeUppercase - Set whether to include uppercase letters in the generated string.
 */
export type RandomString = {
    value: string;
    length: number;
    setLength: (length: number) => void;
    symbols: boolean;
    includeSymbols: (includeSymbols: boolean) => void;
    numbers: boolean;
    includeNumbers: (includeNumbers: boolean) => void;
    uppercase: boolean;
    includeUppercase: (includeUppercase: boolean) => void;
};
/**
 * Generate a string of randomized characters and of a specific length.
 * @param {StringGeneratorOptions} options - The initial properties of the randomized string
 * @returns {RandomString} - a randomly-generated string, the properties it was created with, and functions to change these properties
 */
declare const useRandomString: (options: StringGeneratorOptions) => RandomString;
export default useRandomString;
