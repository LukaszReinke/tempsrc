'use client';

import React, { ReactNode } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { EyeSlashIcon } from '@heroicons/react/24/outline';
import { ContentLoader, TransitionLink } from '@hd/ui';
import { TimelineItemStatus } from '@hd/types/TimelineItemStatus';
import { HeartIcon } from '@heroicons/react/20/solid';
import { TIMELINE_ITEM_STATUS } from '@hd/consts';

type TimelineProps = {
  children?: ReactNode;
  isLoading?: boolean;
};

export const Timeline = (props: TimelineProps) => {
  return (
    <div className="py-4 w-full pr-4">
      {props.isLoading ? (
        <ContentLoader />
      ) : (
        <VerticalTimeline lineColor="#1e1e22" layout="1-column">
          {props.children ? props.children : 'Records not found'}
        </VerticalTimeline>
      )}
    </div>
  );
};

type TimelineElementProps = {
  children: ReactNode;
  href: string;
  transparent: boolean;
  handleIconClick?: () => void;
  timelineItemStatus?: TimelineItemStatus | ReactNode;
};

export const TimelineElement = (props: TimelineElementProps) => (
  <VerticalTimelineElement
    className="bg-transparent duration-300 p-0 group"
    contentArrowStyle={{ borderRight: '12px solid #1e1e22', height: '16px' }}
    contentStyle={{
      backgroundColor: 'transparent',
      boxShadow: 'none',
      padding: 0,
    }}
    iconStyle={{ border: '3px solid #26262b', boxShadow: 'none' }}
    iconClassName="bg-zinc-900 hover:bg-zinc-950 duration-300 hover:bg-white cursor-pointer"
    icon={
      props.timelineItemStatus === TIMELINE_ITEM_STATUS.FOLLOWED ? (
        <HeartIcon className="h-7 w-6 text-rose-500" />
      ) : props.timelineItemStatus === TIMELINE_ITEM_STATUS.UNFOLLOWED ? (
        <EyeSlashIcon className="h-6 w-6 text-zinc-500" />
      ) : null
    }
    iconOnClick={props.handleIconClick}
  >
    <TransitionLink
      href={props.href}
      className={`${props.timelineItemStatus === TIMELINE_ITEM_STATUS.UNFOLLOWED ? 'opacity-50' : ''} flex text-zinc-400 transition-shadow duration-300`}
    >
      <div className="cursor-pointer w-full block group-hover:text-zinc-200 duration-300">
        {props.children}
      </div>
    </TransitionLink>
  </VerticalTimelineElement>
);
