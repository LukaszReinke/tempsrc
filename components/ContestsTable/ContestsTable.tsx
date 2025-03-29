'use client';

import { useEffect, useState, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { DetailedContest } from '@hd/types/Contest';
import { Input, ContentLoader } from '@hd/ui';
import { ROUTES } from '@hd/consts';
import { FormContestModal, Table } from '@hd/components';
import { exampleContests } from './exampleContests';

export const ContestsTable = () => {
  const [contests, setContests] = useState<DetailedContest[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpenWithContest, setModalOpenWithContest] = useState<null | DetailedContest>(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch(ROUTES.API.CONTESTS_ALL);
        if (!response.ok) throw new Error('Failed to fetch contests');
        const data = await response.json();
        setContests(data.length > 0 ? data : exampleContests);
      } catch (error) {
        console.error('Error fetching contests:', error);
        setContests(exampleContests);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const filteredContests = contests.filter((contest) =>
    `${contest.contest_name} ${contest.location} ${contest.start_date} ${contest.end_date}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  const headers = [
    { label: 'Contest Name' },
    { label: 'Location' },
    { label: 'Start Date' },
    { label: 'End Date' },
  ];
  

  const rows = filteredContests.map((contest) => ({
    columns: [
      contest.contest_name,
      contest.location,
      contest.start_date,
      contest.end_date,
    ],
    handleRowClick: () => setModalOpenWithContest(contest),
  }));


  return (
    <>
      <FormContestModal
        onClose={() => setModalOpenWithContest(null)}
        onSave={() => {
          console.log(modalOpenWithContest);
          setModalOpenWithContest(null);
        }}
        openWithContest={modalOpenWithContest}
      />
      <div className="w-full">
        <div className="pb-10">
          <Input
            type="text"
            placeholder="Search by name..."
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        {loading ? (
          <ContentLoader />
        ) : filteredContests.length === 0 ? (
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
