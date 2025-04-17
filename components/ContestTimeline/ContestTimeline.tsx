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
import { Contest } from '@hd/types';
import { useScrollTrigger, usePagination } from '@hd/hooks';
import { useTimelineStatus } from '@hd/hooks';

export const ContestTimeline = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { toggleStatus, getStatus } = useTimelineStatus('contest');

  const { currentPage, totalPages, updatePagination } = usePagination({
    initialItemsPerPage: DEFAULT_TIMELINE_PAGE_SIZE,
  });

  const fetchContests = useCallback(
    async (page: number) => {
      try {
        const query = buildQueryString({ page, per_page: DEFAULT_TIMELINE_PAGE_SIZE });
        const response = await fetch(`${ROUTES.API.CONTESTS}?${query}`);
        const data = await response.json();

        setContests((prev) => {
          const combined = [...prev, ...data.data.items];
          const unique = Array.from(
            new Map(combined.map((item) => [item.contest_id, item])).values(),
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
        console.error('Error fetching contests:', error);
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
      }
    },
    [updatePagination],
  );

  useEffect(() => {
    fetchContests(1);
  }, [fetchContests]);

  useScrollTrigger(() => {
    if (!isFetchingMore && currentPage < (totalPages ?? 1)) {
      setIsFetchingMore(true);
      fetchContests(currentPage + 1);
    }
  });

  const shouldShowSkeleton = isFetchingMore && currentPage < totalPages;

  return (
    <Timeline isLoading={isLoading}>
      {contests.length === 0 && !isLoading && !isFetchingMore ? (
        <div className="h-1 bg-white w-full mt-4" />
      ) : (
        <>
          <TimelineBeginning />
          {contests.map((contest, i) => (
            <TimelineElement
              transparent
              href={ROUTES.GET_CONTEST_PAGE(contest.contest_id)}
              key={contest.contest_id + i}
              timelineItemStatus={getStatus(contest.contest_id)}
              handleIconClick={() => toggleStatus(contest.contest_id)}
            >
              {ContestTimelineItemContent(contest)}
            </TimelineElement>
          ))}

          {shouldShowSkeleton && <TimelineSkeleton />}
          <TimelineEnding />
        </>
      )}
    </Timeline>
  );
};

const ContestTimelineItemContent = (contest: Contest) => {
  return (
    <div className="flex flex-col justify-between md:flex-row md:max-h-[360px] lg:gap-2">
      {contest.thumbnail_url && (
        <div className="w-full overflow-y-hidden">
          <ExternalDomainImage
            className="max-h-[500px]"
            src={contest.thumbnail_url}
            alt={contest.contest_name}
          />
        </div>
      )}
      <div className="p-4 md:py-8 md:px-10 w-full bg-[#1e1e22] group-hover:bg-[#1e1e22]/[90]">
        <h5 className="text-xl font-bold md:text-justify">{contest.contest_name}</h5>

        <ListItem label="Starting categories" content={contest.categories} />
        <ListItem label="Location" content={contest.location} />
        <ListItem
          label={`Event ${getDateLabel(contest.start_date, contest.end_date)}`}
          content={formatDateString(contest.start_date, contest.end_date)}
        />

        {contest.federation && (
          <ListItem
            label="Federation"
            content={<Chip color="secondary">{contest.federation}</Chip>}
          />
        )}
      </div>
    </div>
  );
};
