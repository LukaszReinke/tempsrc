'use client';

import { useEffect, useState, Fragment, useCallback } from 'react';
import { Transition } from '@headlessui/react';
import { WorkshopsGET, WorkshopApiResponse } from '@hd/types';
import { ContentLoader, IconButton, Tooltip } from '@hd/ui';
import { Table, FormWorkshopModal } from '@hd/components';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ROUTES, SYSTEM_ROLES } from '@hd/consts';
import { useUser } from '@hd/context';

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
          const data: WorkshopApiResponse  = await response.json();
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

        const headers = [{ label: 'Workshop Topic' }, { label: 'Organizer' }, { label: 'Coaches' }, { label: 'Location' }, { label: 'Date' }, { label: 'Participation Condition' }];

        const rows = workshops.map((w) => ({
            columns: [
                <div
                    key={w.workshop_id}
                    className={`flex items-center pl-6`}
                    >
                    {w.workshop_topic}
                </div>,
                w.organizer,
                w.coaches,
                <div key={`location-${w.workshop_id}`}>
                    <Tooltip content={w.location_url} isUrl={true}>
                        <span className=" px-2">
                          {w.location}
                        </span>
                    </Tooltip>
                </div>,
                <div key={`date-${w.workshop_id}`}>
                    {`${w.start_date} - ${w.end_date}`} 
                </div>,
                w.participation_condition
            ],
            handleRowClick: () =>
                setModalOpenWithWorkshop(w)
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