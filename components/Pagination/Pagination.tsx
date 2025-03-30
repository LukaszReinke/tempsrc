import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  totalItems?: number;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  className?: string;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  totalItems,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30, 50],
  className = '',
}) => {
  // Calculate page numbers to show
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between my-4 ${className}`}>
      <div className="flex items-center text-sm text-zinc-400 mb-2 sm:mb-0">
        {totalItems !== undefined && pageSize && (
          <span>
            Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to{' '}
            {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
          </span>
        )}
      </div>

      <div className="flex items-center">
        {onPageSizeChange && pageSize && (
          <div className="mr-4">
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="bg-zinc-800 text-zinc-200 border border-zinc-700 rounded px-2 py-1 text-sm"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size} per page
                </option>
              ))}
            </select>
          </div>
        )}

        <nav className="flex items-center">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${
              currentPage === 1 
                ? 'text-zinc-600 cursor-not-allowed' 
                : 'text-zinc-300 hover:bg-zinc-700'
            }`}
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <div className="flex items-center">
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`mx-1 min-w-[2rem] h-8 px-3 rounded-md ${
                  currentPage === page
                    ? 'bg-amber-500 text-white'
                    : 'text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md ${
              currentPage === totalPages 
                ? 'text-zinc-600 cursor-not-allowed' 
                : 'text-zinc-300 hover:bg-zinc-700'
            }`}
            aria-label="Next page"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  );
};