'use client';

import { DateInput, LocationInput, UrlInput } from '@hd/components';
import { ROUTES, SYSTEM_ROLES, GRID_CLASSES } from '@hd/consts';
import { WorkshopsGET } from '@hd/types';
import { Input, Modal, Tooltip, Switch } from '@hd/ui';
import { useCallback, useRef, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useUser } from '@hd/context';

type WorkshopModalFormProps = {
  openWithWorkshop: null | WorkshopsGET;
  onClose: () => void;
  refreshWorkshops: () => void;
};

export const FormWorkshopModal = ({
  openWithWorkshop,
  onClose,
  refreshWorkshops,
}: WorkshopModalFormProps) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isAproveWorkshopChecked, setAproveWorkshopChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const hasPermissions = useMemo(() => {
    return (
      user?.role === SYSTEM_ROLES.EVENT_MOD ||
      user?.role === SYSTEM_ROLES.ADMIN ||
      user?.role === SYSTEM_ROLES.SUPER_ADMIN
    );
  }, [user?.role]);

  const workshopTopicRef = useRef<HTMLInputElement>(null);
  const workshopUrlRef = useRef<HTMLInputElement>(null);
  const coachesRef = useRef<HTMLInputElement>(null);
  const organizerRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const locationUrlRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const thumbnailUrlRef = useRef<HTMLInputElement>(null);
  const participationConditionRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  const handleSave = useCallback(async () => {
    if (!hasPermissions) {
      toast.error('You do not have permission to perform this action');
      return;
    }

    const workshopData = {
      workshop_topic: workshopTopicRef.current?.value.trim() || '',
      workshop_url: workshopUrlRef.current?.value.trim() || '',
      coaches: coachesRef.current?.value.trim() || '',
      organizer: organizerRef.current?.value.trim() || '',
      location: locationRef.current?.value.trim() || null,
      location_url: locationUrlRef.current?.value.trim() || '',
      start_date: startDateRef.current?.value.trim() || '',
      end_date: endDateRef.current?.value.trim() || '',
      thumbnail_url: thumbnailUrlRef.current?.value.trim() || null,
      participation_condition: participationConditionRef.current?.value.trim() || null,
      contact: contactRef.current?.value.trim() || null,
    };

    if (
      !workshopData.workshop_topic ||
      !workshopData.workshop_url ||
      !workshopData.coaches ||
      !workshopData.organizer ||
      !workshopData.location_url ||
      !workshopData.start_date ||
      !workshopData.end_date
    ) {
      toast.error('Please fill out all required fields.');
      return;
    }

    setIsLoading(true);
    const errMessage = 'Saving workshop data failed';

    try {
      await toast.promise(
        (async () => {
          let response;
          const cleanedData = Object.fromEntries(
            Object.entries(workshopData).filter(([_, value]) => value !== null),
          );

          const requestParams = {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cleanedData),
          };

          if (openWithWorkshop?.workshop_id) {
            response = await fetch(ROUTES.API.WORKSHOP(openWithWorkshop.workshop_id), {
              ...requestParams,
              method: 'PUT',
            });

            if (isAproveWorkshopChecked) {
              response = await fetch(ROUTES.API.WORKSHOP(openWithWorkshop.workshop_id), {
                ...requestParams,
                method: 'PATCH',
              });
            }
          } else {
            response = await fetch(ROUTES.API.WORKSHOPS, {
              ...requestParams,
              method: 'POST',
            });

            const createData = await response.json();
            if (!response.ok) throw new Error(createData.error || errMessage);

            if (isAproveWorkshopChecked) {
              response = await fetch(ROUTES.API.WORKSHOP(createData.workshop_id), {
                headers: { 'Content-Type': 'application/json' },
                method: 'PATCH',
              });
            } else {
              return createData;
            }
          }

          const data = await response.json();
          if (!response.ok) throw new Error(data.error || errMessage);

          return data;
        })(),
        {
          pending: openWithWorkshop?.workshop_id
            ? 'Updating workshop...'
            : 'Creating new workshop...',
          success: openWithWorkshop?.workshop_id
            ? 'Workshop updated successfully!'
            : 'Workshop created successfully!',
          error: {
            render: ({ data }: { data: Error }) => {
              return data?.message || errMessage;
            },
          },
        },
      );

      refreshWorkshops();
      onClose();
    } catch (error) {
      console.error('Error saving workshop:', error);
    } finally {
      setIsLoading(false);
    }
  }, [onClose, openWithWorkshop, refreshWorkshops, isAproveWorkshopChecked, hasPermissions]);

  const handleWorkshopDeletation = useCallback(async () => {
    if (!hasPermissions) {
      toast.error('You do not have permission to perform this action');
      return;
    }

    setIsLoading(true);
    const errMessage = 'Failed to delete the workshop';

    try {
      await toast.promise(
        (async () => {
          const response = await fetch(
            ROUTES.API.WORKSHOP(openWithWorkshop?.workshop_id as string),
            {
              method: 'DELETE',
            },
          );

          const data = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(data.error || errMessage);

          return data;
        })(),
        {
          pending: 'Deleting workshop...',
          success: 'Workshop deleted successfully!',
          error: {
            render: ({ data }: { data: Error }) => {
              return data?.message || errMessage;
            },
          },
        },
      );

      refreshWorkshops();
    } catch (error) {
      console.error('Error deleting workshop:', error);
    } finally {
      onClose();
      setIsConfirmationOpen(false);
      setIsLoading(false);
    }
  }, [onClose, openWithWorkshop?.workshop_id, refreshWorkshops, hasPermissions]);

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
            onClick: handleWorkshopDeletation,
            variant: 'danger',
            loading: isLoading,
            disabled: isFormDisabled,
          },
        ]}
      >
        <h5>
          Are you sure to remove
          <Tooltip content={openWithWorkshop?.workshop_url}>
            <span className="font-bold text-rose-500 px-2">{openWithWorkshop?.workshop_topic}</span>
          </Tooltip>
          Workshop?
        </h5>
      </Modal>

      <Modal
        isOpen={!!openWithWorkshop}
        onClose={onClose}
        fullScreen={true}
        minSize={false}
        title={
          openWithWorkshop?.workshop_id
            ? hasPermissions
              ? 'Update Workshop Data'
              : 'View Workshop Data'
            : hasPermissions
              ? 'Add New Workshop'
              : 'View Workshop'
        }
        buttons={[
          {
            label: 'Delete',
            onClick: () => setIsConfirmationOpen(true),
            variant: 'danger',
            className: `${openWithWorkshop?.workshop_id && hasPermissions ? '' : 'hidden'}`,
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
              label="Workshop URL"
              required
              ref={workshopUrlRef}
              placeholder="Enter the workshop URL"
              defaultValue={openWithWorkshop?.workshop_url}
              disabled={isFormDisabled}
            />

            <UrlInput
              label="Location URL"
              required
              ref={locationUrlRef}
              placeholder="Enter the location URL"
              defaultValue={openWithWorkshop?.location_url}
              disabled={isFormDisabled}
            />
            
            <Input
              ref={workshopTopicRef}
              required
              label="Workshop Topic"
              defaultValue={openWithWorkshop?.workshop_topic}
              disabled={isFormDisabled}
            />

            <Input
              ref={coachesRef}
              required
              label="Coaches"
              defaultValue={openWithWorkshop?.coaches}
              disabled={isFormDisabled}
            />

            <Input
              ref={organizerRef}
              required
              label="Organizer"
              defaultValue={openWithWorkshop?.organizer}
              disabled={isFormDisabled}
            />

            <div className={GRID_CLASSES}>
              <DateInput
                ref={startDateRef}
                label="Start date"
                required
                defaultValue={openWithWorkshop?.start_date}
                disabled={isFormDisabled}
              />

              <DateInput
                ref={endDateRef}
                label="End date"
                required
                defaultValue={openWithWorkshop?.end_date}
                disabled={isFormDisabled}
              />
            </div>

            <div className={GRID_CLASSES}>
              <Input
                ref={participationConditionRef}
                label="Participation Condition"
                defaultValue={openWithWorkshop?.participation_condition}
                disabled={isFormDisabled}
              />

              <Input
                ref={contactRef}
                label="Contact"
                defaultValue={openWithWorkshop?.contact}
                disabled={isFormDisabled}
              />
            </div>
            
            <UrlInput
              label="Thumbnail URL"
              ref={thumbnailUrlRef}
              placeholder="Enter the thumbnail URL"
              defaultValue={openWithWorkshop?.thumbnail_url}
              disabled={isFormDisabled}
            />

            <div className="flex pt-2">
              <Switch
                onChange={() => setAproveWorkshopChecked((prev) => !prev)}
                checked={isAproveWorkshopChecked}
                disabled={isFormDisabled}
              />
              <div
                className={`pl-3 ${isAproveWorkshopChecked ? '' : 'text-zinc-400'} font-semibold`}
              >
                {`I want to approve workshop`}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
