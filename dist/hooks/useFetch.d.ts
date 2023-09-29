type ConverterFunction<T> = (data: unknown) => T;
/**
 * Provides a hook to fetch data from a given @url.
 *
 * @param converter - Optional converter function to convert the response data to a given type.
 * @returns - An object containing the data, loading, and error states.
 */
declare const useFetch: <T>(converter?: ConverterFunction<T> | undefined) => {
    load: (url: string, options?: {}) => Promise<void>;
    data: T | undefined;
    loading: boolean;
    error: string | null;
};
export default useFetch;
