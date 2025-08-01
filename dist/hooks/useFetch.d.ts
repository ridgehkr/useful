export type ConverterFunction<T> = (data: unknown) => T;
export type FetchState<T> = {
    load: (url: string, options?: object) => void;
    data: T | undefined;
    loading: boolean;
    error: string | null;
};
/**
 * Provides a hook to fetch data from a given @url.
 *
 * @param {ConverterFunction} converter - Optional converter function to convert the response data to a given type.
 * @returns - An object containing the data, loading, and error states.
 */
declare const useFetch: <T>(converter?: ConverterFunction<T>) => FetchState<T>;
export default useFetch;
