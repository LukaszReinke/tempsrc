'use client';

import { useEffect, useState, Fragment, useCallback } from 'react';
import { Transition } from '@headlessui/react';
import { WorkshopsGET, WorkshopsGetApiResponse, FilterQuery, PaginatedResponse } from '@hd/types';
import { ContentLoader, IconButton, Tooltip } from '@hd/ui';
import { Table, FormWorkshopModal, EventStatus, Pagination, TableFilter, ApprovalFilter as ApprovalFilterComponent } from '@hd/components';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ROUTES, SYSTEM_ROLES, WORKSHOP_FILTER_FIELDS } from '@hd/consts';
import { INITIAL_FILTER_STATE, type FilterFieldType, type FilterValueType, type ApprovalFilterType } from '@hd/consts/filters';
import { useUser } from '@hd/context';
import { formatDateString } from '@hd/utils';
import { usePagination } from '@hd/hooks';

export const WorkshopsTable = () => {
  const [workshops, setWorkshops] = useState<WorkshopsGET[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpenWithWorkshop, setModalOpenWithWorkshop] = useState<null | WorkshopsGET>(null);
  const { currentPage, totalPages, totalItems, itemsPerPage, handlePageChange, updatePagination } = usePagination();
  const [filterField, setFilterField] = useState<FilterFieldType>(INITIAL_FILTER_STATE.fieldName);
  const [filterValue, setFilterValue] = useState<FilterValueType>(INITIAL_FILTER_STATE.fieldValue);
  const [approvalFilter, setApprovalFilter] = useState<ApprovalFilterType>(INITIAL_FILTER_STATE.approval);

  const { user } = useUser();

  const rolesPermited =
    user?.role === SYSTEM_ROLES.ADMIN ||
    user?.role === SYSTEM_ROLES.SUPER_ADMIN ||
    user?.role === SYSTEM_ROLES.EVENT_MOD;

  const fetchWorkshops = useCallback(async () => {
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

      const response = await fetch(`${ROUTES.API.WORKSHOPS_ALL}?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch workshops');
      }
      const data: WorkshopsGetApiResponse = await response.json();
      setWorkshops(data.data.items);
      updatePagination({
        totalPages: data.meta.total_pages,
        totalItems: data.meta.total_items
      });
    } catch (error) {
      console.error('Error fetching workshops:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, updatePagination, filterField, filterValue, approvalFilter]);

  useEffect(() => {
    fetchWorkshops();
  }, [fetchWorkshops]);

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
    { label: 'Workshop Topic' },
    { label: 'Organizer' },
    { label: 'Coaches' },
    { label: 'Location' },
    { label: 'Dates' },
    { label: 'Participation Condition' },
    { label: 'Is Approved' },
  ];

  const rows = workshops.map((workshop) => ({
    columns: [
      <div key={workshop.workshop_id} className={`flex items-center pl-6`}>
        {workshop.workshop_topic}
      </div>,
      workshop.organizer,
      workshop.coaches,
      <div key={`location-${workshop.workshop_id}`} className="flex items-center pl-6">
        <Tooltip content={
          <div className="max-w-[200px] truncate">
            {workshop.workshop_url}
          </div>
        }>
          <span>{workshop.location}</span>
        </Tooltip>
      </div>,
      formatDateString(workshop.start_date, workshop.end_date),
      workshop.participation_condition,
      <div key={`approved-${workshop.workshop_id}`} className="flex items-center">
        <EventStatus isApproved={workshop.is_approved} />
      </div>,
    ],
    handleRowClick: () => setModalOpenWithWorkshop(workshop),
  }));

  return (
    <>
      <FormWorkshopModal
        onClose={() => setModalOpenWithWorkshop(null)}
        openWithWorkshop={modalOpenWithWorkshop}
        refreshWorkshops={fetchWorkshops}
      />
      <div className="w-full">
        <div className="flex flex-col gap-4">
          <TableFilter
            filterFields={WORKSHOP_FILTER_FIELDS}
            onFilterChange={handleFilterChange}
            placeholder="Search workshops..."
          />
          <div className="flex flex-wrap items-center justify-center gap-2">
            <ApprovalFilterComponent onApprovalChange={handleApprovalChange} />
            <IconButton
              disabled={!rolesPermited}
              onClick={() => setModalOpenWithWorkshop({} as WorkshopsGET)}
              tooltip="Add new workshop"
              className="scale-90 hover:scale-100 transition-transform flex-shrink-0"
            >
              <PlusIcon className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
            </IconButton>
          </div>
        </div>
        {loading ? (
          <ContentLoader />
        ) : workshops.length === 0 ? (
          <p className="text-center text-white">No workshops found...</p>
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
