export type ListResponse<T> = {
  data: T[]
  meta?: {
    totalItems: number
    totalPages: number
    currentPage: number
    itemsPerPage: number
  }
}

export type SingleResponse<T> = T
