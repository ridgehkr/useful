/**
 * A List of items with helper functions
 */
export type List<T> = {
    items: T[];
    head: T | undefined;
    tail: T[];
    size: number;
    itemAt: (index: number) => T | undefined;
    prepend: (item: T) => void;
    append: (item: T) => void;
    remove: (index: number) => void;
    update: (index: number, newItem: T) => void;
};
/**
 * Creates a list of items with helper functions
 * @param {T[]} initialItems - The initial items to populate the list with
 * @returns {List} - A list of items with helper functions
 */
declare const useList: <T>(initialItems?: T[]) => List<T>;
export default useList;
