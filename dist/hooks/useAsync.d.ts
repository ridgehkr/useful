type AsyncFunction<T> = () => Promise<T>;
/**
 * Manages the execution state of an async function.
 * @param {function} asyncFunction - The async function to manage.
 * @param {boolean} immediate - Whether to run the async function immediately.
 * @returns - The state of the async function and a function to run it.
 */
declare const useAsync: <T>(asyncFunction: AsyncFunction<T>, immediate?: boolean) => {
    run: () => Promise<void>;
    data: T | null;
    loading: boolean;
    error: null | Error;
};
export default useAsync;
