type Stack<T> = {
    items: T[];
    push: (item: T) => void;
    pop: () => T | undefined;
    peek: () => T | undefined;
    clear: () => void;
    contains: (item: T) => boolean;
    toArray: () => T[];
    size: () => number;
};
/**
 * A custom hook that implements a stack data structure
 * @returns {Stack} A stack object
 */
declare const useStack: <T>(initialItems?: T[]) => Stack<T>;
export default useStack;
