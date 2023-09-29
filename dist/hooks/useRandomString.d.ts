type StringGeneratorOptions = {
    length?: number;
    symbols?: boolean;
    numbers?: boolean;
    uppercase?: boolean;
};
/**
 * Generate a string of randomized characters and of a specific length.
 * @param options - The initial properties of the randomized string
 * @returns - a randomly-generated string, the properties it was created with, and functions to change these properties
 */
declare const useRandomString: (options: StringGeneratorOptions) => {
    value: string;
    length: number;
    setLength: import("react").Dispatch<import("react").SetStateAction<number>>;
    symbols: boolean;
    includeSymbols: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    numbers: boolean;
    includeNumbers: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    uppercase: boolean;
    includeUppercase: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
export default useRandomString;
