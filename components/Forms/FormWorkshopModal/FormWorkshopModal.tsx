'use client';

import { DateInput, LocationInput, UrlInput } from '@hd/components';
import { ROUTES } from '@hd/consts';
import { WorkshopsGET } from '@hd/types';
import { Input, Modal, Tooltip, Switch } from '@hd/ui';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-toastify';

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
      } else {
        response = await fetch(ROUTES.API.WORKSHOPS, {
          ...requestParams,
          method: 'POST',
        });
      }

      if (isAproveWorkshopChecked && openWithWorkshop?.workshop_id) {
        response = await fetch(ROUTES.API.WORKSHOP(openWithWorkshop?.workshop_id), {
          ...requestParams,
          method: 'PATCH',
        });
      }

      if (response && !response.ok) {
        throw new Error(errMessage);
      }

      toast.success(
        openWithWorkshop?.workshop_id
          ? 'Workshop updated successfully'
          : 'Workshop created successfully',
      );
      refreshWorkshops();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : errMessage);
    } finally {
      setIsLoading(false);
    }
  }, [onClose, openWithWorkshop, refreshWorkshops, isAproveWorkshopChecked]);

  const handleWorkshopDeletation = useCallback(async () => {
    setIsLoading(true);
    const errMessage = 'Failed to delete the workshop';

    try {
      const response = await fetch(ROUTES.API.WORKSHOP(openWithWorkshop?.workshop_id as string), {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(errMessage);
      }

      toast.success('Workshop deleted successfully');
      refreshWorkshops();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : errMessage);
    } finally {
      onClose();
      setIsConfirmationOpen(false);
      setIsLoading(false);
    }
  }, [onClose, openWithWorkshop?.workshop_id, refreshWorkshops]);

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
        title={openWithWorkshop?.workshop_id ? 'Update Content Data' : 'Add New Content'}
        buttons={[
          {
            label: 'Delete',
            onClick: () => setIsConfirmationOpen(true),
            variant: 'danger',
            className: `${openWithWorkshop?.workshop_id ? '' : 'hidden'}`,
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
              ref={workshopTopicRef}
              required
              label="Workshop Topic"
              defaultValue={openWithWorkshop?.workshop_topic}
            />

            <Input
              ref={coachesRef}
              required
              label="Coaches"
              defaultValue={openWithWorkshop?.coaches}
            />

            <Input
              ref={organizerRef}
              required
              label="Organizer"
              defaultValue={openWithWorkshop?.organizer}
            />

            <UrlInput
              label="Workshop URL"
              required
              ref={workshopUrlRef}
              placeholder="Enter the workshop URL"
              defaultValue={openWithWorkshop?.workshop_url}
            />

            <Input ref={locationRef} label="Location" defaultValue={openWithWorkshop?.location} />

            <UrlInput
              label="Location URL"
              required
              ref={locationUrlRef}
              placeholder="Enter the location URL"
              defaultValue={openWithWorkshop?.location_url}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateInput
                ref={startDateRef}
                label="Start date"
                required
                defaultValue={openWithWorkshop?.start_date}
              />

              <DateInput
                ref={endDateRef}
                label="End date"
                required
                defaultValue={openWithWorkshop?.end_date}
              />
            </div>

            <Input
              ref={participationConditionRef}
              label="Participation Condition"
              defaultValue={openWithWorkshop?.participation_condition}
            />

            <Input ref={contactRef} label="Contact" defaultValue={openWithWorkshop?.contact} />

            <UrlInput
              label="Thumbnail URL"
              ref={thumbnailUrlRef}
              placeholder="Enter the thumbnail URL"
              defaultValue={openWithWorkshop?.thumbnail_url}
            />

            {openWithWorkshop?.workshop_id && (
              <div className="flex pt-2">
                <Switch
                  onChange={() => setAproveWorkshopChecked((prev) => !prev)}
                  checked={isAproveWorkshopChecked}
                />
                <div
                  className={`pl-3 ${isAproveWorkshopChecked ? '' : 'text-zinc-400'} font-semibold`}
                >
                  {`I want to approve workshop`}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};
