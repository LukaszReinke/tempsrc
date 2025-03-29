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
import { Contest, TimelineItemStatus } from '@hd/types';
import { CONTESTS } from './const';

export const ContestTimeline = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusState, setStatusState] = useState<{
    [key: string]: TimelineItemStatus;
  }>({});

  useEffect(() => {
    // const fetchContests = async () => {
    //   try {
    //     const response = await fetch(ROUTES.API.contests);
    //     const data = await response.json();

    //     // FIXME: for now ignore data - await proper implementation
    //     setContests(data);
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching contests:', error);
    //   }
    // };
    const fetchContests = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setContests(CONTESTS);
      } catch (error) {
        console.error('Error fetching contests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContests();
  }, []);

  const handleIconClick = useCallback((itemId: string) => {
    const newStatus = toggleTimelineItemStatus('contest', itemId);
    setStatusState((prevState) => ({
      ...prevState,
      [itemId]: newStatus,
    }));
  }, []);

  return (
    <Timeline isLoading={isLoading}>
      {contests.map((contest) => (
        <TimelineElement
          transparent
          href={ROUTES.GET_WORKSHOP_PAGE(contest.contest_id)}
          key={contest.contest_id}
          timelineItemStatus={
            statusState[contest.contest_id] || getTimelineItemStatus('contest', contest.contest_id)
          }
          handleIconClick={() => handleIconClick(contest.contest_id)}
        >
          {ContestTimelineItemContent(contest)}
        </TimelineElement>
      ))}
    </Timeline>
  );
};

const ContestTimelineItemContent = (contest: Contest) => {
  return (
    <div className="flex flex-col justify-between md:flex-row md:max-h-[380px] lg:gap-2">
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

        <ListItem label="Starting categories" content={contest.category} />

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
