'use client';

import { classNames } from '@hd/utils';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const SKELETON_ITEMS_AMOUNT = 4;

const SkeletonBlock = ({ className = '' }) => (
  <div className={classNames('bg-zinc-800 rounded-md animate-pulse', className)} />
);

export const TimelineSkeleton = () => {
  return (
    <>
      {[...Array(SKELETON_ITEMS_AMOUNT)].map((_, idx) => (
        <VerticalTimelineElement
          key={idx}
          className="p-0"
          contentArrowStyle={{ borderRight: '12px solid #26262b', height: '16px' }}
          contentStyle={{ backgroundColor: 'transparent', boxShadow: 'none', padding: 0 }}
          iconStyle={{ border: '3px solid #26262b', boxShadow: 'none' }}
          iconClassName="bg-zinc-900"
          icon={<div className="w-full h-full" />}
        >
          <div className="flex flex-col md:flex-row md:max-h-[380px] lg:gap-2">
            <div className="w-full md:w-1/2">
              <SkeletonBlock className="h-[260px] md:h-full w-full" />
            </div>
            <div className="w-full p-4 md:py-8 md:px-10 bg-[#1e1e22] space-y-4">
              <SkeletonBlock className="h-6 w-3/4" />
              <SkeletonBlock className="h-4 w-1/2" />
              <SkeletonBlock className="h-4 w-1/3" />
              <SkeletonBlock className="h-4 w-1/2" />
              <SkeletonBlock className="h-4 w-2/3" />
              <div className="pt-2">
                <SkeletonBlock className="h-6 w-28 rounded-full" />
              </div>
            </div>
          </div>
        </VerticalTimelineElement>
      ))}
    </>
  );
};
