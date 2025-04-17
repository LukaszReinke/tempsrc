'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  ListItem,
  Timeline,
  TimelineElement,
  ExternalDomainImage,
  TimelineSkeleton,
  TimelineBeginning,
  TimelineEnding,
} from '@hd/components';
import { buildQueryString, formatDateString, getDateLabel } from '@hd/utils';
import { Chip } from '@hd/ui';
import { DEFAULT_TIMELINE_PAGE_SIZE, ROUTES } from '@hd/consts';
import { Workshop } from '@hd/types/Workshop';
import { useScrollTrigger, usePagination, useTimelineStatus } from '@hd/hooks';

export const WorkshopTimeline = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { toggleStatus, getStatus } = useTimelineStatus('workshop');

  const { currentPage, totalPages, updatePagination } = usePagination({
    initialItemsPerPage: DEFAULT_TIMELINE_PAGE_SIZE,
  });

  const fetchWorkshops = useCallback(
    async (page: number) => {
      try {
        const query = buildQueryString({ page, per_page: DEFAULT_TIMELINE_PAGE_SIZE });
        const response = await fetch(`${ROUTES.API.WORKSHOPS}?${query}`);
        const data = await response.json();

        setWorkshops((prev) => {
          const combined = [...prev, ...data.data.items];
          const unique = Array.from(
            new Map(combined.map((item) => [item.workshop_id, item])).values(),
          );
          return unique;
        });

        updatePagination({
          totalPages: data.meta.total_pages,
          totalItems: data.meta.total_items,
          currentPage: data.meta.page,
          itemsPerPage: data.meta.items,
        });
      } catch (error) {
        console.error('Error fetching workshops:', error);
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
      }
    },
    [updatePagination],
  );

  useEffect(() => {
    fetchWorkshops(1);
  }, [fetchWorkshops]);

  useScrollTrigger(() => {
    if (!isFetchingMore && currentPage < (totalPages ?? 1)) {
      setIsFetchingMore(true);
      fetchWorkshops(currentPage + 1);
    }
  });

  const shouldShowSkeleton = isFetchingMore && currentPage < totalPages;

  return (
    <Timeline isLoading={isLoading}>
      {workshops.length === 0 && !isLoading && !isFetchingMore ? (
        <div className="h-1 bg-white w-full mt-4" />
      ) : (
        <>
          <TimelineBeginning />
          {workshops.map((workshop, i) => (
            <TimelineElement
              transparent
              href={ROUTES.GET_WORKSHOP_PAGE(workshop.workshop_id)}
              key={workshop.workshop_id + i}
              timelineItemStatus={getStatus(workshop.workshop_id)}
              handleIconClick={() => toggleStatus(workshop.workshop_id)}
            >
              {WorkshopTimelineItemContent(workshop)}
            </TimelineElement>
          ))}
          {shouldShowSkeleton && <TimelineSkeleton />}
          <TimelineEnding />
        </>
      )}
    </Timeline>
  );
};

const WorkshopTimelineItemContent = (workshop: Workshop) => {
  const isSinglePersonOrganization = workshop.organizer === workshop.coaches;

  return (
    <div className="flex flex-col justify-between md:flex-row md:max-h-[360px] lg:gap-2">
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
