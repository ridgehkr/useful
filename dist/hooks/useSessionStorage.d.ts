/**
 * A function that sets a value.
 *
 * @template T - The type of the value to set.
 */
type ValueSetter<T> = (value: T) => void;
/**
 * The state of a value in session storage.
 *
 * @template T - The type of the value to store.
 * @property {T | undefined} value - The current value of the session storage item.
 * @property {ValueSetter<T>} setStoredValue - A function to update the session storage item.
 * @property {() => void} deleteStoredValue - A function to delete the session storage item.
 */
export type SessionStorageState<T> = {
    value: T | undefined;
    setStoredValue: ValueSetter<T>;
    deleteStoredValue: () => void;
};
/**
 * Monitor and update a value in session storage.
 * @param {string} key - The key to use for the session storage item.
 * @param {T} initialValue - The initial value to use for the session storage item.
 * @returns - An object containing the current value of the session storage item and a function to update it.
 */
declare const useSessionStorage: <T>(key: string, initialValue?: T | undefined) => SessionStorageState<T>;
export default useSessionStorage;
