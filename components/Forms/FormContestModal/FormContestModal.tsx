'use client';

import { DateInput, LocationInput, UrlInput } from '@hd/components';
import { ROUTES } from '@hd/consts';
import { ContestsGET } from '@hd/types';
import { Input, Modal, Tooltip, Switch } from '@hd/ui';
import { useCallback, useRef, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useUser } from '@hd/context';
import { SYSTEM_ROLES, SYSTEM_ROLES_SELECT_OPTIONS } from '@hd/consts';

type ContestModalFormProps = {
  openWithContest: null | ContestsGET;
  onClose: () => void;
  refreshContests: () => void;
};

export const FormContestModal = ({
  openWithContest,
  onClose,
  refreshContests,
}: ContestModalFormProps) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isAproveContestChecked, setAproveContestChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const contestNameRef = useRef<HTMLInputElement>(null);
  const contestUrlRef = useRef<HTMLInputElement>(null);
  const locationUrlRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const categoriesRef = useRef<HTMLInputElement>(null);
  const federationRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const thumbnailUrlRef = useRef<HTMLInputElement>(null);

  const handleSave = useCallback(async () => {
    const contestData = {
      contest_name: contestNameRef.current?.value.trim() || '',
      contest_url: contestUrlRef.current?.value.trim() || '',
      location_url: locationUrlRef.current?.value.trim() || '',
      location: locationRef.current?.value.trim() || null,
      start_date: startDateRef.current?.value.trim() || '',
      end_date: endDateRef.current?.value.trim() || null,
      categories: categoriesRef.current?.value.trim() || '',
      federation: federationRef.current?.value.trim() || null,
      contact: contactRef.current?.value.trim() || null,
      thumbnail_url: thumbnailUrlRef.current?.value.trim() || null,
    };

    if (
      !contestData.contest_name ||
      !contestData.contest_url ||
      !contestData.location_url ||
      !contestData.start_date ||
      !contestData.categories
    ) {
      toast.error('Please fill out all required fields.');
      return;
    }

    setIsLoading(true);
    const errMessage = 'Saving contest data failed';

    try {
      let response;
      const cleanedData = Object.fromEntries(
        Object.entries(contestData).filter(([_, value]) => value !== null),
      );

      const requestParams = {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      };

      if (openWithContest?.contest_id) {
        response = await fetch(ROUTES.API.CONTEST(openWithContest.contest_id), {
          ...requestParams,
          method: 'PUT',
        });
      } else {
        response = await fetch(ROUTES.API.CONTESTS, {
          ...requestParams,
          method: 'POST',
        });
      }

      if (isAproveContestChecked && openWithContest?.contest_id) {
        response = await fetch(ROUTES.API.CONTEST(openWithContest.contest_id), {
          ...requestParams,
          method: 'PATCH',
        });
      }

      if (response && !response.ok) {
        throw new Error(errMessage);
      }

      toast.success(
        openWithContest?.contest_id
          ? 'Contest updated successfully'
          : 'Contest created successfully',
      );
      refreshContests();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : errMessage);
    } finally {
      setIsLoading(false);
    }
  }, [onClose, openWithContest, refreshContests, isAproveContestChecked]);

  const handleContestDeletation = useCallback(async () => {
    setIsLoading(true);
    const errMessage = 'Failed to delete the contest';

    try {
      const response = await fetch(ROUTES.API.CONTEST(openWithContest?.contest_id as string), {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(errMessage);
      }

      toast.success('Contest deleted successfully');
      refreshContests();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : errMessage);
    } finally {
      setIsLoading(false);
      onClose();
      setIsConfirmationOpen(false);
    }
  }, [onClose, openWithContest?.contest_id, refreshContests]);

  return (
    <>
      <Modal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        title="Confirm deletion"
        buttons={[
          {
            label: 'Cancel',
            onClick: () => setIsConfirmationOpen(false),
            variant: 'secondary',
          },
          {
            label: 'Yes, confirm',
            onClick: handleContestDeletation,
            variant: 'danger',
            loading: isLoading,
          },
        ]}
      >
        <h5>
          Are you sure to remove
          <Tooltip content={openWithContest?.contest_url}>
            <span className="font-bold text-rose-500 px-2">{openWithContest?.contest_name}</span>
          </Tooltip>
          Contest?
        </h5>
      </Modal>

      <Modal
        isOpen={!!openWithContest}
        onClose={onClose}
        fullScreen={true}
        title={openWithContest?.contest_id ? 'Update Content Data' : 'Add New Content'}
        buttons={[
          {
            label: 'Delete',
            onClick: () => setIsConfirmationOpen(true),
            variant: 'danger',

            className: `${openWithContest?.contest_id ? '' : 'hidden'}`,
          },
          {
            label: 'Cancel',
            onClick: onClose,
            variant: 'secondary',
            className: 'justify-self-end',
          },
          {
            label: 'Save',
            onClick: handleSave,
            variant: 'primary',
            loading: isLoading,
          },
        ]}
      >
        {isConfirmationOpen ? null : (
          <div className="space-y-4">
            <Input
              ref={contestNameRef}
              required
              label="Name"
              defaultValue={openWithContest?.contest_name}
            />

            <UrlInput
              label="Contest URL"
              required
              ref={contestUrlRef}
              placeholder="Enter the contest URL"
              defaultValue={openWithContest?.contest_url}
            />

            <Input ref={locationRef} label="Location" defaultValue={openWithContest?.location} />

            <UrlInput
              label="Location URL"
              required
              ref={locationUrlRef}
              placeholder="Enter the location URL"
              defaultValue={openWithContest?.location_url}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateInput
                ref={startDateRef}
                label="Start date"
                required
                defaultValue={openWithContest?.start_date}
              />

              <DateInput
                ref={endDateRef}
                label="End date"
                defaultValue={openWithContest?.end_date}
              />
            </div>

            <Input
              ref={categoriesRef}
              required
              label="Categories"
              defaultValue={openWithContest?.categories}
            />

            <Input
              ref={federationRef}
              label="Federation"
              defaultValue={openWithContest?.federation}
            />

            <Input ref={contactRef} label="Contact" defaultValue={openWithContest?.contact} />

            <UrlInput
              label="Thumbnail URL"
              ref={thumbnailUrlRef}
              placeholder="Enter the thumbnail URL"
              defaultValue={openWithContest?.thumbnail_url}
            />

            {openWithContest?.contest_id && (
              <div className="flex pt-2">
                <Switch
                  onChange={() => setAproveContestChecked((prev) => !prev)}
                  checked={isAproveContestChecked}
                />
                <div
                  className={`pl-3 ${isAproveContestChecked ? '' : 'text-zinc-400'} font-semibold`}
                >
                  {`I want to approve contest`}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};
