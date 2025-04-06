'use client';

import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

type EventStatusProps = {
  isApproved: boolean;
  pendingText?: string;
  approvedText?: string;
  useClockIcon?: boolean;
};
export const EventStatus = ({
  isApproved,
  pendingText = 'Pending',
  approvedText = 'Approved',
  useClockIcon = false
}: EventStatusProps) => {
  return isApproved ? (
    <div className="flex items-center text-green-600">
      <CheckCircleIcon className="h-5 w-5 mr-1" />
      <span>{approvedText}</span>
    </div>
  ) : (
    <div className="flex items-center text-orange-500">
      {useClockIcon ? (
        <ClockIcon className="h-5 w-5 mr-1" />
      ) : (
        <XCircleIcon className="h-5 w-5 mr-1" />
      )}
      <span>{pendingText}</span>
    </div>
  );
};