'use client';

import { useEffect, useState, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { Workshop } from '@hd/types/Workshop';
import { Input, ContentLoader } from '@hd/ui';
import { ROUTES } from '@hd/consts';
import { FormWorkshopModal, Table } from '@hd/components';
import { exampleWorkshops } from './exampleWorkshops';

export const WorkshopsTable = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpenWithWorkshop, setModalOpenWithWorkshop] = useState<Workshop | null>(null);

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const response = await fetch(ROUTES.API.WORKSHOPS_ALL);
      if (!response.ok) throw new Error('Failed to fetch workshops');
      const data = await response.json();
      
      // Sprawdzenie czy data jest tablicą
      if (Array.isArray(data)) {
        setWorkshops(data);
        // FIXME: Jeśli brak danych z API, używamy mockowanych danych
        if (data.length === 0) {
          setWorkshops(exampleWorkshops);
        }
      } else {
        console.error('API returned non-array data:', data);
        // FIXME: Dane z API nie są tablicą, używamy mockowanych danych
        setWorkshops(exampleWorkshops);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workshops:', error);
      // FIXME: W przypadku błędu ustawiamy mockowane dane
      setWorkshops(exampleWorkshops);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const filteredWorkshops = workshops.filter((workshop) => {
    if (!workshop) return false;
    return `${workshop.workshop_topic || ''} ${workshop.location || ''} ${workshop.start_date || ''} ${workshop.end_date || ''}`
      .toLowerCase()
      .includes(filter.toLowerCase());
  });

  const headers = [
    { label: 'Workshop Topic' },
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
        refreshWorkshops={fetchWorkshops}
        openWithWorkshop={modalOpenWithWorkshop}
      />
      
      <div className="mb-4">
        <Input
          placeholder="Search workshops..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {loading ? (
        <ContentLoader />
      ) : filteredWorkshops.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No workshops found...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table headers={headers} rows={rows} />
        </div>
      )}
    </>
  );
};