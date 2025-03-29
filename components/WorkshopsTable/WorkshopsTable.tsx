'use client';

import { useEffect, useState, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { Workshop } from '@hd/types/Workshop';
import { Input, ContentLoader } from '@hd/ui';
import { ROUTES } from '@hd/consts';
import { FormWorkshopModal, Table } from '@hd/components';
import { exampleWorkshops } from './exampleWorkshops';

export const WorkshopsTable = () => {
  const [workshop, setWorkshops] = useState<Workshop[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpenWithWorkshop, setModalOpenWithWorkshop] = useState<null | Workshop>(null);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch(ROUTES.API.WORKSHOPS_ALL);
        if (!response.ok) throw new Error('Failed to fetch workshops');
        const data = await response.json();
        setWorkshops(data.length > 0 ? data : exampleWorkshops);
      } catch (error) {
        console.error('Error fetching workshops:', error);
        setWorkshops(exampleWorkshops);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  const filteredWorkshops = workshop.filter((workshop) =>
    `${workshop.workshop_topic} ${workshop.location} ${workshop.start_date} ${workshop.end_date}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  const headers = [
    { label: 'Contest Name' },
    { label: 'Location' },
    { label: 'Start Date' },
    { label: 'End Date' },
  ];

  const rows = filteredWorkshops.map((workshop) => ({
    columns: [
      workshop.workshop_topic,
      workshop.location,
      workshop.start_date,
      workshop.end_date,
    ],
    handleRowClick: () => setModalOpenWithWorkshop(workshop),
  }));

  return (
    <>
      <FormWorkshopModal
        onClose={() => setModalOpenWithWorkshop(null)}
        onSave={(data) => {
          console.log('Saving workshop:', data);
          setModalOpenWithWorkshop(null);
        }}
        openWithWorkshop={modalOpenWithWorkshop}
      />
      <div className="w-full">
        <div className="pb-10">
          <Input
            type="text"
            placeholder="Search by topic..."
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        {loading ? (
          <ContentLoader />
        ) : filteredWorkshops.length === 0 ? (
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
