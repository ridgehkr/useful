export type PaginationOptions = {
    initialPage?: number;
    initialItemsPerPage?: number;
};
export type PaginationState = {
    currentPage: number;
    itemsPerPage: number;
    setPage: (page: number) => void;
    setItemsPerPage: (itemsPerPage: number) => void;
};
/**
 * Manages pagination state for a list of items.
 *
 * @param {number} totalItems - The total number of items to paginate.
 * @param {PaginationOptions} options - The pagination configuration options.
 * @returns {PaginationState} - The pagination state and functions to update it.
 */
declare const usePagination: (totalItems: number, options?: PaginationOptions) => PaginationState;
export default usePagination;
