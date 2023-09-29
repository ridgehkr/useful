type ValueSetter<T> = (value: T) => void;
type SessionStorageState<T> = {
    value: T | undefined;
    setStoredValue: ValueSetter<T>;
    deleteStoredValue: () => void;
};
/**
 * Monitor and update a value in session storage.
 * @param key - The key to use for the session storage item.
 * @param initialValue - The initial value to use for the session storage item.
 * @returns - An object containing the current value of the session storage item and a function to update it.
 */
declare const useSessionStorage: <T>(key: string, initialValue?: T | undefined) => SessionStorageState<T>;
export default useSessionStorage;
