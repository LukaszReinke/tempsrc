'use client';

import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  containerClassName?: string;
}

export const Pagination = ({ 
  pageCount, 
  currentPage, 
  onPageChange,
  containerClassName = 'flex justify-center mt-4' 
}: PaginationProps) => {
  return (
    <div className={containerClassName}>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={onPageChange}
        containerClassName="flex flex-wrap items-center justify-center gap-2"
        pageClassName="transition-colors duration-200"
        pageLinkClassName="px-3 py-2 rounded-md bg-zinc-800 text-zinc-400 hover:bg-zinc-800/75 hover:text-white flex items-center justify-center min-w-[36px] text-sm"
        activeClassName="!bg-none"
        activeLinkClassName="!bg-amber-600 text-zinc-900 hover:!bg-amber-500 hover:text-zinc-900"
        previousClassName="transition-colors duration-200"
        nextClassName="transition-colors duration-200"
        previousLinkClassName="px-3 py-2 rounded-md bg-zinc-800 text-zinc-400 hover:bg-zinc-800/75 hover:text-white flex items-center justify-center text-sm"
        nextLinkClassName="px-3 py-2 rounded-md bg-zinc-800 text-zinc-400 hover:bg-zinc-800/75 hover:text-white flex items-center justify-center text-sm"
        disabledClassName="opacity-50 cursor-not-allowed"
        breakClassName="px-2 text-zinc-400"
        breakLinkClassName="text-zinc-400"
        forcePage={currentPage}
        previousLabel="←"
        nextLabel="→"
      />
    </div>
  );
}; 