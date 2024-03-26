import { useCallback, useState, useMemo } from 'react'

// options for configuring the pagination behavior
export type PaginationOptions = {
  initialPage?: number
  initialItemsPerPage?: number
}

// state for managing pagination
export type PaginationState = {
  currentPage: number
  itemsPerPage: number
  setPage: (page: number) => void
  setItemsPerPage: (itemsPerPage: number) => void
}

const DEFAULT_OPTIONS: PaginationOptions = {
  initialPage: 1,
  initialItemsPerPage: 10,
}

/**
 * Manages pagination state for a list of items.
 *
 * @param {number} totalItems - The total number of items to paginate.
 * @param {PaginationOptions} options - The pagination configuration options.
 * @returns {PaginationState} - The pagination state and functions to update it.
 */
const usePagination = (
  totalItems: number,
  options: PaginationOptions = DEFAULT_OPTIONS
): PaginationState => {
  const { initialPage, initialItemsPerPage } = options

  // the current page of paginated items
  const [currentPage, setCurrentPage] = useState(initialPage || 1)

  // the number of items to display per page
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage || 10)

  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  )

  /**
   * Updates the current page, ensuring it is within the bounds of the total number of pages.
   */
  const setPage = useCallback(
    (page: number) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page)
      } else if (totalItems === 0) {
        // reset to first page if there are no paginated items
        setCurrentPage(1)
      } else {
        // adjust page to valid range if out of bounds
        setCurrentPage(Math.min(totalPages, Math.max(1, page)))
      }
    },
    [totalPages, totalItems, setCurrentPage]
  )

  /**
   * Updates the number of items to display per page, ensuring it is a positive number.
   */
  const setItemsPerPageHandler = useCallback(
    (perPage: number) => {
      if (perPage > 0) {
        setItemsPerPage(perPage)
      }
    },
    [setItemsPerPage]
  )

  return {
    currentPage,
    itemsPerPage,
    setPage,
    setItemsPerPage: setItemsPerPageHandler,
  }
}

export default usePagination
