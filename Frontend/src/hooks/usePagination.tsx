import { useState } from 'react';

export interface Pagination {
  totalDocs: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

function usePagination(
  initialPagination: Pagination = {
    totalDocs: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10
  }
) {
  const [pagination, setPagination] = useState<Pagination>(initialPagination);

  const updatePagination = (newPagination: Partial<Pagination>) => {
    setPagination((prev) => ({
      ...prev,
      ...newPagination
    }));
  };

  const nextPage = () => {
    setPagination((prev) => ({
      ...prev,
      currentPage: Math.min(prev.currentPage + 1, prev.totalPages)
    }));
  };

  const prevPage = () => {
    setPagination((prev) => ({
      ...prev,
      currentPage: Math.max(prev.currentPage - 1, 1)
    }));
  };

  const jumpToPage = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: Math.min(Math.max(page, 1), prev.totalPages)
    }));
  };

  const resetPagination = () => {
    setPagination(initialPagination);
  };

  return {
    pagination,
    setPagination: updatePagination,
    nextPage,
    prevPage,
    jumpToPage,
    resetPagination
  };
}

export default usePagination;
