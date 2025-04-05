'use client';

import { DateInput } from '@hd/components/DateInput';
import { ROUTES } from '@hd/consts';
import { SYSTEM_ROLES, SYSTEM_ROLES_SELECT_OPTIONS } from '@hd/consts';
import { useUser } from '@hd/context';
import { WorkshopsGET } from '@hd/types';
import { Input, Modal, Select, SelectOption, Tooltip, InputUrl } from '@hd/ui';
import { getLabelByValue } from '@hd/utils';
import { useCallback, useMemo, useRef, useState } from 'react';

type WorkshopModalFormProps = {
    openWithWorkshop: null | WorkshopsGET;
    onClose: () => void;
    refreshWorkshops: () => void;
  };

  export const FormWorkshopModal = ({ openWithWorkshop, onClose, refreshWorkshops}: WorkshopModalFormProps) => {

    const [error, setError] = useState<string | null>(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

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
    const toApproveRef = useRef<HTMLInputElement>(null);

    const handleSave = useCallback(async () => {
        const workshop_topic = workshopTopicRef.current?.value.trim();
        const workshop_url = workshopUrlRef.current?.value.trim();
        const coaches = coachesRef.current?.value.trim();
        const organizer = organizerRef.current?.value.trim();
        const location = locationRef.current?.value.trim();
        const location_url = locationUrlRef.current?.value.trim();
        const start_date = startDateRef.current?.value.trim();
        const end_date = endDateRef.current?.value.trim();
        const thumbnail_url = thumbnailUrlRef.current?.value.trim() || null;
        const participation_condition = participationConditionRef.current?.value.trim() || null;
        const contact = contactRef.current?.value.trim() || null;
        const to_approve = toApproveRef.current?.checked || false;

        if (!workshop_topic || !workshop_url || !coaches || !organizer || !location || !location_url || !start_date || !end_date ) {
            setError('Please fill out all required fields.');
            return;
          }

        const errMessage = 'Saving workshop data failed';

        console.log(participation_condition)

        try {
            let response;
            const requestParams = {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    workshop_url, 
                    workshop_topic, 
                    coaches, organizer, 
                    location_url, location, 
                    start_date, 
                    end_date, 
                    ...(thumbnail_url && { thumbnail_url }),
                    ...(participation_condition && { participation_condition }),
                    ...(contact && { contact }) 
                }),
            }

            if (openWithWorkshop?.workshop_id) {
                response = await fetch(ROUTES.API.WORKSHOP(openWithWorkshop?.workshop_id), {
                    ...requestParams,
                    method: 'PUT',
                });
            } else {
                console.log(workshop_url)
                response = await fetch(ROUTES.API.WORKSHOPS, {
                    ...requestParams,
                    method: 'POST',
                })
            }

            if (response && !response.ok) {
                throw new Error(errMessage);
            }

            refreshWorkshops();
            onClose();
        } catch (error) {
            setError(error instanceof Error ? error.message : errMessage);
        } 
    }, [onClose, openWithWorkshop, refreshWorkshops]);

    const handleContestDeletation = useCallback(async () => {
        const errMessage = 'Failed to delete the workshop';

        try {
            const response = await fetch(ROUTES.API.WORKSHOP(openWithWorkshop?.workshop_id as string), {
                method: 'DELETE',
              });
        
              if (!response.ok) {
                throw new Error(errMessage);
              }
        
              refreshWorkshops();
        }   catch (error) {
            setError(error instanceof Error ? error.message : errMessage);
        } finally {
            onClose();
            setIsConfirmationOpen(false);
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
                  onClick: handleContestDeletation,
                  variant: 'danger',
                },
              ]}
            >
              <h5>
                Are you sure to remove
                <Tooltip content={openWithWorkshop?.location_url}>
                  <span className="font-bold text-rose-500 px-2">
                    {openWithWorkshop?.workshop_topic}
                  </span>
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
                  },
                ]}
            >
                {isConfirmationOpen ? null : (
                  <div className="space-y-4">
                    {error && (
                        <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md mb-4">
                          <p>{error}</p>
                        </div>
                    )}
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

                    <InputUrl
                      ref={workshopUrlRef}
                      required
                      placeholder="https://example.com"
                      label="Workshop URL"
                      defaultValue={openWithWorkshop?.workshop_url}
                    />

                    <Input
                      ref={locationRef}
                      required
                      label="Location"
                      defaultValue={openWithWorkshop?.location}
                    />

                    <InputUrl
                      ref={locationUrlRef}
                      required
                      placeholder="https://example.com"
                      label="Location URL"
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

                    <Input
                      ref={contactRef}
                      label="Contact"
                      defaultValue={openWithWorkshop?.contact}
                    />

                    <InputUrl
                      ref={thumbnailUrlRef}
                      placeholder="https://example.com"
                      label="Thumbnail URL"
                      defaultValue={openWithWorkshop?.thumbnail_url}
                    />
                  </div>
                )}
            </Modal>
        </>
    )
}