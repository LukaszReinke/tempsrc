import { useState, useCallback } from 'react';
import { DEFAULT_PAGE, DEFAULT_TABLE_PAGE_SIZE } from '@hd/consts';

interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface UsePaginationProps {
  initialPage?: number;
  initialItemsPerPage?: number;
}

export const usePagination = ({ 
  initialPage = DEFAULT_PAGE, 
  initialItemsPerPage = DEFAULT_TABLE_PAGE_SIZE 
}: UsePaginationProps = {}) => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    currentPage: initialPage,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: initialItemsPerPage
  });

  const updatePagination = useCallback((newState: Partial<PaginationState>) => {
    setPaginationState(prev => ({
      ...prev,
      ...newState
    }));
  }, []);

  const handlePageChange = useCallback((selectedItem: { selected: number }) => {
    updatePagination({ currentPage: selectedItem.selected + 1 });
  }, [updatePagination]);

  return {
    ...paginationState,
    handlePageChange,
    updatePagination
  };
}; 