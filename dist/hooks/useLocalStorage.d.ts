/**
 * useLocalStorage()
 * A hook to manage data persistence in the browser's local storage. This can be useful for maintaining user preferences or small pieces of data across sessions.
 *
 * @param key - The key to use for the local storage item.
 * @param initialValue - The initial value to use if no value is found in local storage.
 * @returns An object containing the current value, a function to set the value, and a function to delete the value.
 */
declare const useLocalStorage: <T>(key: string, initialValue: T) => {
    value: T;
    setStoredValue: (newValue: T) => void;
    deleteStoredValue: () => void;
};
export default useLocalStorage;
