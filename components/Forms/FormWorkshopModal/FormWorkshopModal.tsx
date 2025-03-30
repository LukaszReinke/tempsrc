'use client';

import { DateInput } from '@hd/components/DateInput';
import { Workshop } from '@hd/types';
import { Input, Modal, TextAreaInput, Switch } from '@hd/ui';
import { useCallback, useRef, useState, useMemo } from 'react';
import { ROUTES, SYSTEM_ROLES } from '@hd/consts';
import { useToast } from '@hd/context';
import { useUser } from '@hd/context';

type WorkshopModalFormProps = {
  openWithWorkshop: null | Workshop;
  onClose: () => void;
  refreshWorkshops: () => void;
};

export const FormWorkshopModal = ({
  openWithWorkshop,
  onClose,
  refreshWorkshops,
}: WorkshopModalFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();
  const { user } = useUser();
  const [isApproved] = useState(true);
  
  const rolesPermited = useMemo(() => {
    return user?.role === SYSTEM_ROLES.ADMIN || 
           user?.role === SYSTEM_ROLES.SUPER_ADMIN || 
           user?.role === SYSTEM_ROLES.EVENT_MOD;
  }, [user?.role]);
  
  const workshopTopicsRef = useRef<HTMLInputElement>(null);
  const coachesRef = useRef<HTMLInputElement>(null);
  const organizerRef = useRef<HTMLInputElement>(null);
  const startsDateRef = useRef<HTMLInputElement>(null);
  const endsDateRef = useRef<HTMLInputElement>(null);
  const workshopUrlRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const attendanceLimitationRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLTextAreaElement>(null);
  const thumbnailUrlRef = useRef<HTMLInputElement>(null);
  const participationConditionRef = useRef<HTMLInputElement>(null);
  const isApprovedRef = useRef<HTMLInputElement>(null);

  const handleSave = useCallback(async () => {
    if (!rolesPermited) {
      setError('You do not have permission to perform this action.');
      addToast('error', 'Permission denied. You cannot modify workshops.');
      return;
    }

    const workshop_topic = workshopTopicsRef.current?.value?.trim();
    const coaches = coachesRef.current?.value?.trim();
    const organizer = organizerRef.current?.value?.trim();
    const start_date = startsDateRef.current?.value?.trim();
    const end_date = endsDateRef.current?.value?.trim();
    const workshop_url = workshopUrlRef.current?.value?.trim();
    const location = locationRef.current?.value?.trim();
    const attendance_limitation = attendanceLimitationRef.current?.value?.trim();
    const category = categoryRef.current?.value?.trim();
    const thumbnail_url = thumbnailUrlRef.current?.value?.trim();
    const participation_condition = participationConditionRef.current?.value?.trim();
    const is_approved = isApprovedRef.current?.checked || false;

    if (!workshop_topic || !start_date || !location) {
      setError('Please fill out all required fields.');
      return;
    }

    const errMessage = 'Saving workshop data failed';

    try {
      let response;
      const requestParams = {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          workshop_topic, 
          coaches, 
          organizer, 
          start_date, 
          end_date, 
          workshop_url, 
          location, 
          attendance_limitation,
          category,
          is_approved,
          thumbnail_url,
          participation_condition
        }),
      };

      if (openWithWorkshop?.workshop_id) {
        response = await fetch(ROUTES.API.GET_WORKSHOP(openWithWorkshop.workshop_id), {
          ...requestParams,
          method: 'PUT',
        });
      } else {
        response = await fetch(ROUTES.API.WORKSHOPS, {
          ...requestParams,
          method: 'POST',
        });
      }

      if (response && !response.ok) {
        throw new Error(errMessage);
      }

      addToast('success', openWithWorkshop?.workshop_id ? 'Workshop updated successfully' : 'Workshop created successfully');
      refreshWorkshops();
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : errMessage);
      addToast('error', error instanceof Error ? error.message : errMessage);
    }
  }, [onClose, openWithWorkshop, refreshWorkshops, addToast, rolesPermited, isApproved]);

  return (
    <Modal
      isOpen={!!openWithWorkshop}
      onClose={onClose}
      title={openWithWorkshop?.workshop_id ? 'Edit Workshop' : 'Add New Workshop'}
      fullScreen={true}
      buttons={[
        {
          label: 'Cancel',
          onClick: onClose,
          variant: 'secondary',
        },
        {
          label: 'Save',
          onClick: handleSave,
          variant: 'primary',
          className: !rolesPermited ? 'opacity-50 cursor-not-allowed' : '',
        },
      ]}
    >
      {error && <div className="bg-rose-600/20 text-rose-200 p-3 rounded mb-4">{error}</div>}
      {!rolesPermited && (
        <div className="bg-amber-600/20 text-amber-200 p-3 rounded mb-4">
          You are in view-only mode. You do not have permission to edit workshops.
        </div>
      )}
      <div className="space-y-6">
        <Input
          ref={workshopTopicsRef}
          required
          label="Workshop Topic"
          defaultValue={openWithWorkshop?.workshop_topic}
          disabled={!rolesPermited}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            ref={coachesRef}
            label="Coaches"
            defaultValue={openWithWorkshop?.coaches}
            disabled={!rolesPermited}
          />
  
          <Input
            ref={organizerRef}
            label="Organizer"
            defaultValue={openWithWorkshop?.organizer}
            disabled={!rolesPermited}
          />
        </div>
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateInput
            ref={startsDateRef}
            required
            label="Start Date"
            defaultValue={openWithWorkshop?.start_date}
            disabled={!rolesPermited}
          />

          <DateInput
            ref={endsDateRef}
            label="End Date"
            defaultValue={openWithWorkshop?.end_date}
            disabled={!rolesPermited}
          />
        </div>

        <Input
          ref={locationRef}
          required
          label="Location"
          defaultValue={openWithWorkshop?.location}
          disabled={!rolesPermited}
        />

        <Input
          ref={attendanceLimitationRef}
          label="Attendance Limitation"
          defaultValue={openWithWorkshop?.attendance_limitation}
          disabled={!rolesPermited}
        />

        <Input
          ref={participationConditionRef}
          label="Participation Condition"
          defaultValue={openWithWorkshop?.participation_condition}
          disabled={!rolesPermited}
        />

        <Input
          ref={workshopUrlRef}
          type="url"
          label="Workshop Url"
          defaultValue={openWithWorkshop?.workshop_url}
          disabled={!rolesPermited}
        />

        <Input
          ref={thumbnailUrlRef}
          type="url"
          label="Thumbnail Url"
          defaultValue={openWithWorkshop?.thumbnail_url}
          disabled={!rolesPermited}
        />

        <TextAreaInput
          ref={categoryRef}
          label="Categories"
          rows={2}
          defaultValue={openWithWorkshop?.category}
          disabled={!rolesPermited}
        />
      </div>
      
      {rolesPermited && (
          <div className="flex items-center space-x-4 py-2">
            <label htmlFor="approve-workshop" className="text-zinc-300 font-medium">
              Automatically approve workshop upon saving
            </label>
            <input
              id="approve-workshop"
              ref={isApprovedRef}
              type="checkbox"
              defaultChecked={openWithWorkshop?.is_approved === true}
              disabled={!rolesPermited}
              className="form-checkbox h-5 w-5 text-amber-500 rounded focus:ring-amber-500 focus:ring-offset-0 border-zinc-600 bg-zinc-700"
            />
          </div>
        )}
    </Modal>
  );
};