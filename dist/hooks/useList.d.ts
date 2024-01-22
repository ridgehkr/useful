/**
 * A List of items with helper functions. See https://en.wikipedia.org/wiki/List_(abstract_data_type) for more details.
 *
 * @property {T[]} items - The items in the list
 * @property {T | undefined} head - The first item in the list
 * @property {T[]} tail - All items in the list except the first
 * @property {number} size - The number of items in the list
 * @property {function} itemAt - Retrieve the item at a specified index (zero-based)
 * @property {function} prepend - Add an item to the beginning of the list
 * @property {function} append - Add an item to the end of the list
 * @property {function} remove - Delete an item from the list at a specified index
 * @property {function} update - Replace an item in the list at a specified index
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
