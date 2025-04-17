'use client';

import { FormContestModal, FormWorkshopModal } from '@hd/components';
import { WorkshopCard } from '@hd/components/WorkshopCard';
import { WORKSHOPS } from '@hd/components/WorkshopTimeline/const';

export default function RequestBoardPage() {
  return (
    <>
      {/* <FormContestModal /> */}
      {/* <FormWorkshopModal /> */}
      <div className="flex flex-col md:flex-row h-[70vh] gap-8 justify-center">
        <div className="w-full flex justify-center text-3xl text-white font-semibold">
          <div className="self-center">
            <WorkshopCard
              isApproved={true}
              onApprove={() => {}}
              workshop={WORKSHOPS[0]}
              onMoreOptions={() => {}}
              onToggleStatus={() => {}}
            />
          </div>
        </div>
        <div className="w-full flex justify-center bg-zinc-900 text-3xl text-white font-semibold">
          <div className="self-center">Contest Placehodler</div>
        </div>
      </div>
    </>
  );
}
