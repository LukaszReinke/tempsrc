'use client';

import { DateInput } from '@hd/components/DateInput';
import { Workshop } from '@hd/types';
import { Input, Modal, Select } from '@hd/ui';
import { useRef } from 'react';

type WorkshopModalFormProps = {
  openWithWorkshop: null | Workshop;
  onClose: () => void;
  onSave: (data: Workshop) => void;
};

export const FormWorkshopModal = ({
  openWithWorkshop,
  onClose,
  onSave,
}: WorkshopModalFormProps) => {
  const workshopTopicsRef = useRef<HTMLInputElement>(null);
  const coachesRef = useRef<HTMLInputElement>(null);
  const organizerRef = useRef<HTMLInputElement>(null);
  const startsDateRef = useRef<HTMLInputElement>(null);
  const endsDateRef = useRef<HTMLInputElement>(null);
  const workshopUrlRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const attendanceLimitationRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onSave({
      workshop_id: openWithWorkshop?.workshop_id || '',
      workshop_topic: workshopTopicsRef.current?.value || '',
      coaches: coachesRef.current?.value || '',
      organizer: organizerRef.current?.value || '',
      start_date: startsDateRef.current?.value || '',
      end_date: endsDateRef.current?.value || '',
      is_approved: openWithWorkshop?.is_approved ?? true,
      thumbnail_url: openWithWorkshop?.thumbnail_url || null,
      location: locationRef.current?.value || '',
      attendance_limitation: attendanceLimitationRef.current?.value || '',
      participation_condition: openWithWorkshop?.participation_condition,
      workshop_url: workshopUrlRef.current?.value || '',
      category: categoryRef.current?.value?.split(',').map(s => s.trim()) || [],
    });
    onClose();
  };

  return (
    <Modal
      isOpen={!!openWithWorkshop}
      onClose={onClose}
      title="Edit Workshop"
      buttons={[
        { label: 'Cancel', onClick: onClose, variant: 'secondary' },
        { label: 'Save', onClick: handleSave, variant: 'primary' },
      ]}
    >
      <div className="space-y-4">
        <Input
          ref={workshopTopicsRef}
          label="Workshop Topic"
          defaultValue={openWithWorkshop?.workshop_topic}
        />

        <Input
          ref={coachesRef}
          label="Coaches"
          defaultValue={openWithWorkshop?.coaches}
        />

        <Input
          ref={organizerRef}
          label="Organizer"
          defaultValue={openWithWorkshop?.organizer}
        />

        <DateInput
          ref={startsDateRef}
          label="Start Date"
          defaultValue={openWithWorkshop?.start_date}
        />

        <DateInput
          ref={endsDateRef}
          label="End Date"
          defaultValue={openWithWorkshop?.end_date}
        />

        <Input
          ref={locationRef}
          label="Location"
          defaultValue={openWithWorkshop?.location}
        />

        <Input
          ref={attendanceLimitationRef}
          label="Attendance Limitation"
          defaultValue={openWithWorkshop?.attendance_limitation}
        />

        <Input
          ref={workshopUrlRef}
          type="url"
          label="Workshop Url"
          defaultValue={openWithWorkshop?.workshop_url}
        />

        <Input
          ref={categoryRef}
          label="Categories"
          defaultValue={openWithWorkshop?.category.join(', ')}
        />
      </div>
    </Modal>
  );
};
