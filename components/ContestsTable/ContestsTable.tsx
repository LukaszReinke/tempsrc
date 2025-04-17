'use client';

import { useEffect, useState, Fragment, useCallback } from 'react';
import { Transition } from '@headlessui/react';
import { ContestsGET, ContestsGetApiResponse, FilterQuery, PaginatedResponse } from '@hd/types';
import { ContentLoader, IconButton, Tooltip } from '@hd/ui';
import { Table, FormContestModal, EventStatus, Pagination, TableFilter, ApprovalFilter } from '@hd/components';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ROUTES, SYSTEM_ROLES, CONTEST_FILTER_FIELDS } from '@hd/consts';
import { INITIAL_FILTER_STATE, type FilterFieldType, type FilterValueType, type ApprovalFilterType } from '@hd/consts/filters';
import { useUser } from '@hd/context';
import { formatDateString } from '@hd/utils';
import { usePagination } from '@hd/hooks';

export const ContestsTable = () => {
  const [contests, setContests] = useState<ContestsGET[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpenWithContest, setModalOpenWithContest] = useState<null | ContestsGET>(null);
  const { currentPage, totalPages, itemsPerPage, handlePageChange, updatePagination } = usePagination();
  const [filterField, setFilterField] = useState<FilterFieldType>(INITIAL_FILTER_STATE.fieldName);
  const [filterValue, setFilterValue] = useState<FilterValueType>(INITIAL_FILTER_STATE.fieldValue);
  const [approvalFilter, setApprovalFilter] = useState<ApprovalFilterType>(INITIAL_FILTER_STATE.approval);

  const { user } = useUser();

  const rolesPermited =
    user?.role === SYSTEM_ROLES.ADMIN ||
    user?.role === SYSTEM_ROLES.SUPER_ADMIN ||
    user?.role === SYSTEM_ROLES.EVENT_MOD;

  const fetchContests = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        per_page: itemsPerPage.toString(),
      });

      if (filterField && filterValue) {
        queryParams.append('field_name', filterField);
        queryParams.append('field_value', filterValue);
      }

      if (approvalFilter !== null) {
        queryParams.append('is_approved', approvalFilter);
      }

      const response = await fetch(`${ROUTES.API.CONTESTS_ALL}?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch contests');
      }
      const data: ContestsGetApiResponse = await response.json();
      setContests(data.data.items);
      updatePagination({
        totalPages: data.meta.total_pages,
        totalItems: data.meta.total_items
      });
    } catch (error) {
      console.error('Error fetching contests:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, updatePagination, filterField, filterValue, approvalFilter]);

  useEffect(() => {
    fetchContests();
  }, [fetchContests]);

  const handleFilterChange = useCallback((query: FilterQuery) => {
    setFilterField(query.field_name as FilterFieldType || INITIAL_FILTER_STATE.fieldName);
    setFilterValue(query.field_value as FilterValueType || INITIAL_FILTER_STATE.fieldValue);
    updatePagination({ currentPage: 1 });
  }, [updatePagination]);

  const handleApprovalChange = useCallback((value: string | null) => {
    setApprovalFilter(value as ApprovalFilterType || INITIAL_FILTER_STATE.approval);
    updatePagination({ currentPage: 1 });
  }, [updatePagination]);

  const headers = [
    { label: 'Contest Name' },
    { label: 'Location' },
    { label: 'Dates' },
    { label: 'Categories' },
    { label: 'Is Approved' },
  ];

  const rows = contests.map((contest) => ({
    columns: [
      <div key={contest.contest_id} className={`flex items-center pl-6`}>
        {contest.contest_name}
      </div>,
      <div key={`location-${contest.contest_id}`} className="flex items-center pl-6">
        <Tooltip content={
          <div className="max-w-[200px] truncate">
            {contest.location_url}
          </div>
        }>
          <span>{contest.location}</span>
        </Tooltip>
      </div>,
      <div key={`date-${contest.contest_id}`}>
        {contest.end_date
          ? formatDateString(contest.start_date, contest.end_date)
          : contest.start_date}
      </div>,
      contest.categories,
      <div key={`approved-${contest.contest_id}`} className="flex items-center">
        <EventStatus isApproved={contest.is_approved} />
      </div>,
    ],
    handleRowClick: () => setModalOpenWithContest(contest),
  }));

  return (
    <>
      <FormContestModal
        onClose={() => setModalOpenWithContest(null)}
        openWithContest={modalOpenWithContest}
        refreshContests={fetchContests}
      />
      <div className="w-full">
        <div className="flex flex-col gap-4">
          <TableFilter
            filterFields={CONTEST_FILTER_FIELDS}
            onFilterChange={handleFilterChange}
            placeholder="Search contests..."
          />
          <div className="flex flex-wrap items-center justify-center gap-2">
            <ApprovalFilter onApprovalChange={handleApprovalChange} />
            <IconButton
              disabled={!rolesPermited}
              onClick={() => setModalOpenWithContest({} as ContestsGET)}
              tooltip="Add new contest"
              className="scale-90 hover:scale-100 transition-transform flex-shrink-0"
            >
              <PlusIcon className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
            </IconButton>
          </div>
        </div>
        {loading ? (
          <ContentLoader />
        ) : contests.length === 0 ? (
          <p className="text-center text-white">No contests found...</p>
        ) : (
          <Transition
            as={Fragment}
            appear={true}
            show={!loading}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex flex-col gap-4 mt-4">
              <div className="overflow-x-auto">
                <Table headers={headers} rows={rows} /> 
              </div>
              <div className="flex justify-center w-full">
                <Pagination
                  pageCount={totalPages}
                  currentPage={currentPage - 1}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </Transition>
        )}
      </div>
    </>
  );
};
