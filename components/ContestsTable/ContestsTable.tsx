'use client';

import { useEffect, useState, Fragment, useCallback } from 'react';
import { Transition } from '@headlessui/react';
import { ContestsGET, ContestsGetApiResponse } from '@hd/types';
import { ContentLoader, IconButton, Tooltip } from '@hd/ui';
import { Table, FormContestModal, EventStatus } from '@hd/components';
import { PlusIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ROUTES, SYSTEM_ROLES } from '@hd/consts';
import { useUser } from '@hd/context';
import { formatDateString } from '@hd/utils';

export const ContestsTable = () => {
  const [contests, setContests] = useState<ContestsGET[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpenWithContest, setModalOpenWithContest] = useState<null | ContestsGET>(null);

  const { user } = useUser();

  const rolesPermited =
    user?.role === SYSTEM_ROLES.ADMIN ||
    user?.role === SYSTEM_ROLES.SUPER_ADMIN ||
    user?.role === SYSTEM_ROLES.EVENT_MOD;

  const fetchContests = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(ROUTES.API.CONTESTS_ALL);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data: ContestsGetApiResponse = await response.json();
      setContests(data.data.items);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContests();
  }, [fetchContests]);

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
      <div key={`location-${contest.contest_id}`}>
        <Tooltip content={contest.location_url}>
          <span className="px-2">{contest.location}</span>
        </Tooltip>
      </div>,
      <div key={`date-${contest.contest_id}`}>
        {contest.end_date
          ? formatDateString(contest.start_date, contest.end_date)
          : contest.start_date}
      </div>,
      contest.categories,
      <div key={`approved-${contest.contest_id}`} className="flex items-center justify-center">
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
        <IconButton
          disabled={!rolesPermited}
          onClick={() => setModalOpenWithContest({} as ContestsGET)}
          tooltip="Add new contest"
        >
          <PlusIcon className="w-10 h-10 text-amber-600" />
        </IconButton>
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
            <div className="overflow-x-auto">
              <Table headers={headers} rows={rows} />
            </div>
          </Transition>
        )}
      </div>
    </>
  );
};
