'use client';

import { DateInput, LocationInput, UrlInput } from '@hd/components';
import { ROUTES, SYSTEM_ROLES, GRID_CLASSES } from '@hd/consts';
import { ContestsGET } from '@hd/types';
import { Input, Modal, Tooltip, Switch } from '@hd/ui';
import { useCallback, useRef, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useUser } from '@hd/context';

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

  const hasPermissions = useMemo(() => {
    return (
      user?.role === SYSTEM_ROLES.EVENT_MOD ||
      user?.role === SYSTEM_ROLES.ADMIN ||
      user?.role === SYSTEM_ROLES.SUPER_ADMIN
    );
  }, [user?.role]);

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
    if (!hasPermissions) {
      toast.error('You do not have permission to perform this action');
      return;
    }

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
      await toast.promise(
        (async () => {
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

            if (isAproveContestChecked) {
              response = await fetch(ROUTES.API.CONTEST(openWithContest.contest_id), {
                ...requestParams,
                method: 'PATCH',
              });
            }
          } else {
            response = await fetch(ROUTES.API.CONTESTS, {
              ...requestParams,
              method: 'POST',
            });

            if (isAproveContestChecked && response.ok) {
              const newContest = await response.json();
              response = await fetch(ROUTES.API.CONTEST(newContest.contest_id), {
                headers: { 'Content-Type': 'application/json' },
                method: 'PATCH',
              });
            }
          }

          const data = await response.json();
          if (!response.ok) throw new Error(data.error || errMessage);

          return data;
        })(),
        {
          pending: openWithContest?.contest_id ? 'Updating contest...' : 'Creating new contest...',
          success: openWithContest?.contest_id
            ? 'Contest updated successfully!'
            : 'Contest created successfully!',
          error: {
            render: ({ data }: { data: Error }) => {
              return data?.message || errMessage;
            },
          },
        },
      );

      refreshContests();
      onClose();
    } catch (error) {
      console.error('Error saving contest:', error);
    } finally {
      setIsLoading(false);
    }
  }, [onClose, openWithContest, refreshContests, isAproveContestChecked, hasPermissions]);

  const handleContestDeletation = useCallback(async () => {
    if (!hasPermissions) {
      toast.error('You do not have permission to perform this action');
      return;
    }

    setIsLoading(true);
    const errMessage = 'Failed to delete the contest';

    try {
      await toast.promise(
        (async () => {
          const response = await fetch(ROUTES.API.CONTEST(openWithContest?.contest_id as string), {
            method: 'DELETE',
          });

          const data = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(data.error || errMessage);

          return data;
        })(),
        {
          pending: 'Deleting contest...',
          success: 'Contest deleted successfully!',
          error: {
            render: ({ data }: { data: Error }) => {
              return data?.message || errMessage;
            },
          },
        },
      );

      refreshContests();
    } catch (error) {
      console.error('Error deleting contest:', error);
    } finally {
      setIsLoading(false);
      onClose();
      setIsConfirmationOpen(false);
    }
  }, [onClose, openWithContest?.contest_id, refreshContests, hasPermissions]);

  const isFormDisabled = !hasPermissions;

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
            disabled: isFormDisabled,
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
        minSize={false}
        title={
          openWithContest?.contest_id
            ? hasPermissions
              ? 'Update Contest Data'
              : 'View Contest Data'
            : hasPermissions
              ? 'Add New Contest'
              : 'View Contest'
        }
        buttons={[
          {
            label: 'Delete',
            onClick: () => setIsConfirmationOpen(true),
            variant: 'danger',
            className: `${openWithContest?.contest_id && hasPermissions ? '' : 'hidden'}`,
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
            className: `${hasPermissions ? '' : 'hidden'}`,
          },
        ]}
      >
        {isConfirmationOpen ? null : (
          <div className="space-y-4 flex flex-col h-full">
            <UrlInput
              label="Contest URL"
              required
              ref={contestUrlRef}
              placeholder="Enter the contest URL"
              defaultValue={openWithContest?.contest_url}
              disabled={isFormDisabled}
            />

            <UrlInput
              label="Location URL"
              required
              ref={locationUrlRef}
              placeholder="Enter the location URL"
              defaultValue={openWithContest?.location_url}
              disabled={isFormDisabled}
            />

            <Input
              ref={contestNameRef}
              required
              label="Name"
              defaultValue={openWithContest?.contest_name}
              disabled={isFormDisabled}
            />
            
            <div className={GRID_CLASSES}>
              <DateInput
                ref={startDateRef}
                label="Start date"
                required
                defaultValue={openWithContest?.start_date}
                disabled={isFormDisabled}
              />

              <DateInput
                ref={endDateRef}
                label="End date"
                defaultValue={openWithContest?.end_date}
                disabled={isFormDisabled}
              />
            </div>

            <Input
              ref={categoriesRef}
              required
              label="Categories"
              defaultValue={openWithContest?.categories}
              disabled={isFormDisabled}
            />

            <div className={GRID_CLASSES}>
              <Input
                ref={federationRef}
                label="Federation"
                defaultValue={openWithContest?.federation}
                disabled={isFormDisabled}
              />

              <Input
                ref={contactRef}
                label="Contact"
                defaultValue={openWithContest?.contact}
                disabled={isFormDisabled}
              />
            </div>

            <UrlInput
              label="Thumbnail URL"
              ref={thumbnailUrlRef}
              placeholder="Enter the thumbnail URL"
              defaultValue={openWithContest?.thumbnail_url}
              disabled={isFormDisabled}
            />

            <div className="flex pt-2">
              <Switch
                onChange={() => setAproveContestChecked((prev) => !prev)}
                checked={isAproveContestChecked}
                disabled={isFormDisabled}
              />
              <div
                className={`pl-3 ${isAproveContestChecked ? '' : 'text-zinc-400'} font-semibold`}
              >
                {`I want to approve contest`}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
