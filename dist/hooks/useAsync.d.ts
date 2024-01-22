/**
 * The state of an async function.
 *
 * @property {any} data - The data returned by the async function.
 * @property {boolean} loading - Whether the async function is currently running.
 * @property {Error} error - The error thrown by the async function.
 */
export type AsyncState<T> = {
    data: T | null;
    loading: boolean;
    error: null | Error;
};
/**
 * An async function.
 *
 * @returns - The data returned by the async function.
 */
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
