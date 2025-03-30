'use client';

import { DateInput } from '@hd/components/DateInput';
import { DetailedContest } from '@hd/types';
import { Input, Modal, TextAreaInput, Switch } from '@hd/ui';
import { useCallback, useRef, useState, useMemo } from 'react';
import { ROUTES, SYSTEM_ROLES } from '@hd/consts';
import { useToast } from '@hd/context';
import { useUser } from '@hd/context';

type ContestModalFormProps = {
  openWithContest: null | DetailedContest;
  onClose: () => void;
  refreshContests: () => void;
}

export const FormContestModal = ({
  openWithContest,
  onClose,
  refreshContests,
}: ContestModalFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();
  const { user } = useUser();
  
  const [isApproved] = useState(true);
  
  const rolesPermited = useMemo(() => {
    return user?.role === SYSTEM_ROLES.ADMIN || 
           user?.role === SYSTEM_ROLES.SUPER_ADMIN || 
           user?.role === SYSTEM_ROLES.EVENT_MOD;
  }, [user?.role]);
  
  const contestNameRef = useRef<HTMLInputElement>(null);
  const contestUrlRef = useRef<HTMLInputElement>(null);
  const startsDateRef = useRef<HTMLInputElement>(null);
  const endsDateRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLTextAreaElement>(null);
  const thumbnailUrlRef = useRef<HTMLInputElement>(null);
  const federationRef = useRef<HTMLInputElement>(null);
  const isApprovedRef = useRef<HTMLInputElement>(null);

  const handleSave = useCallback(async () => {
    if (!rolesPermited) {
      setError('You do not have permission to perform this action.');
      addToast('error', 'Permission denied. You cannot modify contests.');
      return;
    }

    const contest_name = contestNameRef.current?.value?.trim();
    const contest_url = contestUrlRef.current?.value?.trim();
    const start_date = startsDateRef.current?.value?.trim();
    const end_date = endsDateRef.current?.value?.trim();
    const location = locationRef.current?.value?.trim();
    const contact = contactRef.current?.value?.trim();
    const category = categoryRef.current?.value?.split(',').map(s => s.trim()) || [];
    const thumbnail_url = thumbnailUrlRef.current?.value?.trim();
    const federation = federationRef.current?.value?.trim();
    const is_approved = isApprovedRef.current?.checked || false;

    if (!contest_name || !start_date || !location) {
      setError('Please fill out all required fields.');
      return;
    }

    const errMessage = 'Saving contest data failed';

    try {
      let response;
      const requestParams = {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contest_name, 
          contest_url, 
          start_date, 
          end_date, 
          location, 
          contact, 
          category,
          thumbnail_url,
          federation,
          is_approved
        }),
      };

      if (openWithContest?.contest_id) {
        response = await fetch(ROUTES.API.GET_CONTEST(openWithContest.contest_id), {
          ...requestParams,
          method: 'PUT',
        });
      } else {
        response = await fetch(ROUTES.API.CONTESTS, {
          ...requestParams,
          method: 'POST',
        });
      }

      if (response && !response.ok) {
        throw new Error(errMessage);
      }

      addToast('success', openWithContest?.contest_id ? 'Contest updated successfully' : 'Contest created successfully');
      refreshContests();
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : errMessage);
      addToast('error', error instanceof Error ? error.message : errMessage);
    }
  }, [onClose, openWithContest, refreshContests, addToast, rolesPermited, isApproved]);

  return (
    <Modal
      isOpen={!!openWithContest}
      onClose={onClose}
      title={openWithContest?.contest_id ? 'Edit Contest' : 'Add New Contest'}
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
          You are in view-only mode. You do not have permission to edit contests.
        </div>
      )}
      <div className="space-y-6">
        <Input
          ref={contestNameRef}
          required
          label="Contest Name"
          defaultValue={openWithContest?.contest_name}
          disabled={!rolesPermited}
        />

        <Input
          ref={contestUrlRef}
          type="url"
          label="Contest URL"
          defaultValue={openWithContest?.contest_url}
          disabled={!rolesPermited}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateInput
            ref={startsDateRef}
            required
            label="Starts date"
            defaultValue={openWithContest?.start_date}
            disabled={!rolesPermited}
          />

          <DateInput
            ref={endsDateRef}
            label="Ends date"
            defaultValue={openWithContest?.end_date}
            disabled={!rolesPermited}
          />
        </div>

        <Input
          ref={locationRef}
          required
          label="Location"
          defaultValue={openWithContest?.location}
          disabled={!rolesPermited}
        />

        <Input
          ref={contactRef}
          label="Contact"
          defaultValue={openWithContest?.contact}
          disabled={!rolesPermited}
        />

        <TextAreaInput
          ref={categoryRef}
          label="Categories"
          rows={2}
          defaultValue={openWithContest?.category}
          disabled={!rolesPermited}
        />

        <Input
          ref={thumbnailUrlRef}
          label="Thumbnail Url"
          defaultValue={openWithContest?.thumbnail_url}
          disabled={!rolesPermited}
        />

        <Input
          ref={federationRef}
          label="Federation"
          defaultValue={openWithContest?.federation}
          disabled={!rolesPermited}
        />
      </div>
      
      {rolesPermited && (
          <div className="flex items-center space-x-4 py-2">
            <label htmlFor="approve-contest" className="text-zinc-300 font-medium">
              Automatically approve contest upon saving
            </label>
            <input
              id="approve-contest"
              ref={isApprovedRef}
              type="checkbox"
              defaultChecked={openWithContest?.is_approved === true}
              disabled={!rolesPermited}
              className="form-checkbox h-5 w-5 text-amber-500 rounded focus:ring-amber-500 focus:ring-offset-0 border-zinc-600 bg-zinc-700"
            />
          </div>
        )}
    </Modal>
  );
};