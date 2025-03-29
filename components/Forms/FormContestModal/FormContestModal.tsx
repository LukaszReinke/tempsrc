'use client';

import { DateInput } from '@hd/components/DateInput';
import { DetailedContest } from '@hd/types';
import { Input, Modal } from '@hd/ui';
import { useRef } from 'react';

type ContestModalFormProps = {
  openWithContest: null | DetailedContest;
  onClose: () => void;
  onSave: (data: DetailedContest) => void;
}

export const FormContestModal = ({
  openWithContest,
  onClose,
  onSave,
}: ContestModalFormProps) => {
  const contestNameRef = useRef<HTMLInputElement>(null);
  const contestUrlRef = useRef<HTMLInputElement>(null);
  const startsDateRef = useRef<HTMLInputElement>(null);
  const endsDateRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const thumbnailUrlRef = useRef<HTMLInputElement>(null);
  const federationRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onSave({
      contest_id: openWithContest?.contest_id || '',
      contest_name: contestNameRef.current?.value || '',
      contest_url: contestUrlRef.current?.value || '',
      start_date: startsDateRef.current?.value || '',
      end_date: endsDateRef.current?.value || '',
      location: locationRef.current?.value || '',
      contact: contactRef.current?.value || '',
      category: categoryRef.current?.value?.split(',').map(s => s.trim()) || [],
      is_approved: openWithContest?.is_approved ?? true,
      thumbnail_url: thumbnailUrlRef.current?.value || '',
      federation: federationRef.current?.value || '',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={!!openWithContest}
      onClose={onClose}
      title="Edit Contest"
      fullScreen={true}
      buttons={[
        { label: 'Cancel', onClick: onClose, variant: 'secondary' },
        { label: 'Save', onClick: handleSave, variant: 'primary' },
      ]}
    >
      <div className="space-y-4">
        <Input
          ref={contestNameRef}
          label="Contest Name"
          defaultValue={openWithContest?.contest_name}
        />

        <Input
          ref={contestUrlRef}
          type="url"
          label="Contest URL"
          defaultValue={openWithContest?.contest_url}
        />

        <DateInput
          ref={startsDateRef}
          label="Starts date"
          defaultValue={openWithContest?.start_date}
        />

        <DateInput
          ref={endsDateRef}
          label="Ends date"
          defaultValue={openWithContest?.end_date}
        />

        <Input
          ref={locationRef}
          label="Location"
          defaultValue={openWithContest?.location}
        />

        <Input
          ref={contactRef}
          label="Contact"
          defaultValue={openWithContest?.contact}
        />

        <Input
          ref={categoryRef}
          label="Categories"
          defaultValue={openWithContest?.category}
        />

        <Input
          ref={thumbnailUrlRef}
          label="Thumbnail Url"
          defaultValue={openWithContest?.thumbnail_url}
        />

        <Input
          ref={federationRef}
          label="Federation"
          defaultValue={openWithContest?.federation}
        />
      </div>
    </Modal>
  );
};
