'use client';

import { useEffect, useState, Fragment, useCallback } from 'react';
import { Transition } from '@headlessui/react';
import { WorkshopsGET, WorkshopsGetApiResponse } from '@hd/types';
import { ContentLoader, IconButton, Tooltip } from '@hd/ui';
import { Table, FormWorkshopModal, EventStatus } from '@hd/components';
import { PlusIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ROUTES, SYSTEM_ROLES } from '@hd/consts';
import { useUser } from '@hd/context';
import { formatDateString } from '@hd/utils';

export const WorkshopsTable = () => {
  const [workshops, setWorkshops] = useState<WorkshopsGET[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpenWithWorkshop, setModalOpenWithWorkshop] = useState<null | WorkshopsGET>(null);

  const { user } = useUser();

  const rolesPermited =
    user?.role === SYSTEM_ROLES.ADMIN ||
    user?.role === SYSTEM_ROLES.SUPER_ADMIN ||
    user?.role === SYSTEM_ROLES.EVENT_MOD;

  const fetchWorkshops = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(ROUTES.API.WORKSHOPS_ALL);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data: WorkshopsGetApiResponse = await response.json();
      setWorkshops(data.data.items);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkshops();
  }, [fetchWorkshops]);

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
      <div key={`location-${workshop.workshop_id}`}>
        <Tooltip content={workshop.location_url}>
          <span className=" px-2">{workshop.location}</span>
        </Tooltip>
      </div>,
      formatDateString(workshop.start_date, workshop.end_date),
      workshop.participation_condition,
      <div key={`approved-${workshop.workshop_id}`} className="flex items-center justify-center">
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
        <IconButton
          disabled={!rolesPermited}
          onClick={() => setModalOpenWithWorkshop({} as WorkshopsGET)}
          tooltip="Add new workshop"
        >
          <PlusIcon className="w-10 h-10 text-amber-600" />
        </IconButton>
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
            <div className="overflow-x-auto">
              <Table headers={headers} rows={rows} />
            </div>
          </Transition>
        )}
      </div>
    </>
  );
};
