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
  const [modalOpenWithContest, setModalOpenWithContest] = useState<DetailedContest | null>(null);

  const fetchContests = async () => {
    try {
      setLoading(true);
      const response = await fetch(ROUTES.API.CONTESTS_ALL);
      if (!response.ok) throw new Error('Failed to fetch contests');
      const data = await response.json();
      
      // Sprawdzenie czy data jest tablicą
      if (Array.isArray(data)) {
        setContests(data);
        // FIXME: Jeśli brak danych z API, używamy mockowanych danych
        if (data.length === 0) {
          setContests(exampleContests);
        }
      } else {
        console.error('API returned non-array data:', data);
        // FIXME: Dane z API nie są tablicą, używamy mockowanych danych
        setContests(exampleContests);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contests:', error);
      // FIXME: W przypadku błędu ustawiamy mockowane dane
      setContests(exampleContests);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const filteredContests = contests.filter((contest) => {
    if (!contest) return false;
    return `${contest.contest_name || ''} ${contest.location || ''} ${contest.start_date || ''} ${contest.end_date || ''}`
      .toLowerCase()
      .includes(filter.toLowerCase());
  });

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
        refreshContests={fetchContests}
        openWithContest={modalOpenWithContest}
      />
      
      <div className="mb-4">
        <Input
          placeholder="Search contests..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {loading ? (
        <ContentLoader />
      ) : filteredContests.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No contests found...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table headers={headers} rows={rows} />
        </div>
      )}
    </>
  );
};