'use client';

import { useCallback, useEffect, useState } from 'react';
import { ListItem, Timeline, TimelineElement, ExternalDomainImage } from '@hd/components';
import {
  formatDateString,
  getDateLabel,
  getTimelineItemStatus,
  toggleTimelineItemStatus,
} from '@hd/utils';
import { Chip } from '@hd/ui';
import { ROUTES } from '@hd/consts';
import { Workshop } from '@hd/types/Workshop';
import { WORKSHOPS } from './const';
import { TimelineItemStatus } from '@hd/types';

export const WorkshopTimeline = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusState, setStatusState] = useState<{
    [key: string]: TimelineItemStatus;
  }>({});

  useEffect(() => {
    // const fetchWorkshops = async () => {
    //   try {
    //     const response = await fetch(ROUTES.API.WORKSHOPS);
    //     const data = await response.json();

    //     // FIXME: for now ignore data - await proper implementation
    //     setWorkshops(data);
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching contests:', error);
    //   }
    // };
    const fetchWorkshops = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setWorkshops(WORKSHOPS);
      } catch (error) {
        console.error('Error fetching workshops:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  const handleIconClick = useCallback((itemId: string) => {
    const newStatus = toggleTimelineItemStatus('workshop', itemId);
    setStatusState((prevState) => ({
      ...prevState,
      [itemId]: newStatus,
    }));
  }, []);

  return (
    <Timeline isLoading={isLoading}>
      {workshops.map((workshop) => (
        <TimelineElement
          transparent
          href={ROUTES.GET_WORKSHOP_PAGE(workshop.workshop_id)}
          key={workshop.workshop_id}
          timelineItemStatus={
            statusState[workshop.workshop_id] ||
            getTimelineItemStatus('workshop', workshop.workshop_id)
          }
          handleIconClick={() => handleIconClick(workshop.workshop_id)}
        >
          {WorkshopTimelineItemContent(workshop)}
        </TimelineElement>
      ))}
    </Timeline>
  );
};

const WorkshopTimelineItemContent = (workshop: Workshop) => {
  const isSinglePersonOrganization = workshop.organizer === workshop.coaches;

  return (
    <div className="flex flex-col justify-between md:flex-row md:max-h-[380px] lg:gap-2">
      {workshop.thumbnail_url && (
        <div className="w-full overflow-y-hidden">
          <ExternalDomainImage
            className="max-h-[500px]"
            src={workshop.thumbnail_url}
            alt={workshop.workshop_topic}
          />
        </div>
      )}
      <div className="p-4 md:py-8 md:px-10 w-full bg-[#1e1e22] group-hover:bg-[#1e1e22]/[90]">
        <h5 className="text-xl font-bold md:text-justify">{workshop.workshop_topic}</h5>

        <ListItem
          label={isSinglePersonOrganization ? 'Organizer & Coach' : 'Coaches'}
          content={workshop.coaches}
        />

        {!isSinglePersonOrganization && <ListItem label="Organizer" content={workshop.organizer} />}

        <ListItem label="Location" content={workshop.location} />

        <ListItem
          label={`Event ${getDateLabel(workshop.start_date, workshop.end_date)}`}
          content={formatDateString(workshop.start_date, workshop.end_date)}
        />

        <ListItem
          label="Participation conditions"
          content={
            workshop.participation_condition ? (
              <Chip color="primary" variant="outline">
                {workshop.participation_condition}
              </Chip>
            ) : (
              <Chip color="success" variant="outline">
                Open<span className="hidden md:inline pl-1">/ FFA</span>
              </Chip>
            )
          }
        />
      </div>
    </div>
  );
};
