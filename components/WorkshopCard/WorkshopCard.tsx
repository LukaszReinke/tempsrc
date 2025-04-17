'use client';

import { Workshop } from '@hd/types';
import { Button } from '@hd/ui';
import { CheckCircleIcon, MinusCircleIcon } from '@heroicons/react/20/solid';

type WorkshopCardProps = {
  workshop: Workshop;
  isApproved: boolean;
  onApprove?: () => void;
  onToggleStatus?: () => void;
  onMoreOptions?: () => void;
};

export const WorkshopCard = ({
  workshop,
  isApproved,
  onApprove,
  onToggleStatus,
}: WorkshopCardProps) => {
  return (
    <div className="bg-zinc-900 rounded-2xl p-4 shadow-md w-full space-y-4 text-zinc-100">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold">{workshop.workshop_topic}</h4>
          <span className="text-sm text-zinc-400">{workshop.location}</span>
          <span className="text-sm text-zinc-500">
            {new Date(workshop.start_date).toLocaleDateString()} –{' '}
            {new Date(workshop.end_date).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Button
          className="text-sm px-3 py-1 rounded-xl border-zinc-600 hover:border-zinc-400"
          onClick={onApprove}
        >
          {isApproved ? 'Approved' : 'Approve'}
        </Button>

        <button
          onClick={onToggleStatus}
          className="flex items-center text-zinc-400 hover:text-zinc-100 transition"
        >
          {isApproved ? (
            <CheckCircleIcon className="mr-1 size-6 text-green-400" />
          ) : (
            <MinusCircleIcon className="mr-1 size-6" />
          )}
          <span className="text-sm">Toggle Status</span>
        </button>
      </div>
    </div>
  );
};
