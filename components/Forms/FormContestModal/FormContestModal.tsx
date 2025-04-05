'use client';

import { DateInput } from '@hd/components/DateInput';
import { ROUTES } from '@hd/consts';
import { SYSTEM_ROLES, SYSTEM_ROLES_SELECT_OPTIONS } from '@hd/consts';
import { useUser } from '@hd/context';
import { ContestsGET } from '@hd/types';
import { Input, Modal, Tooltip, InputUrl } from '@hd/ui';
import { getLabelByValue } from '@hd/utils';
import { useCallback, useMemo, useRef, useState } from 'react';

type ContestModalFormProps = {
    openWithContest: null | ContestsGET;
    onClose: () => void;
    refreshContests: () => void;
  };

  export const FormContestModal = ({ openWithContest, onClose, refreshContests}: ContestModalFormProps) => {

    const [error, setError] = useState<string | null>(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

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
    const toApproveRef = useRef<HTMLInputElement>(null);

    const handleSave = useCallback(async () => {
        const contest_name = contestNameRef.current?.value.trim();
        const contest_url = contestUrlRef.current?.value.trim();
        const location_url = locationUrlRef.current?.value.trim();
        const location = locationRef.current?.value.trim();
        const start_date = startDateRef.current?.value.trim();
        const end_date = endDateRef.current?.value.trim() || null;
        const categories = categoriesRef.current?.value.trim();
        const federation = federationRef.current?.value.trim() || null;
        const contact = contactRef.current?.value.trim() || null;
        const thumbnail_url = thumbnailUrlRef.current?.value.trim() || null;
        const to_approve = toApproveRef.current?.checked || false;

        if (!contest_name || !contest_url || !location_url || !location || !start_date || !location) {
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
                  location_url, 
                  location, 
                  start_date, 
                  categories,
                  ...(end_date && {end_date}), 
                  ...(federation && {federation}), 
                  ...(contact && {federation}), 
                  ...(thumbnail_url && {federation}) 
                }),
            }

            if (openWithContest?.contest_id) {
                response = await fetch(ROUTES.API.CONTEST(openWithContest?.contest_id), {
                    ...requestParams,
                    method: 'PUT',
                });
            } else {
                response = await fetch(ROUTES.API.CONTESTS, {
                    ...requestParams,
                    method: 'POST',
                })
            }

            if (response && !response.ok) {
                throw new Error(errMessage);
            }

            refreshContests();
            onClose();
        } catch (error) {
            setError(error instanceof Error ? error.message : errMessage);
        }
    }, [onClose, openWithContest, refreshContests]);

    const handleContestDeletation = useCallback(async () => {
        const errMessage = 'Failed to delete the contest';

        try {
            const response = await fetch(ROUTES.API.CONTEST(openWithContest?.contest_id as string), {
                method: 'DELETE',
              });
        
              if (!response.ok) {
                throw new Error(errMessage);
              }
        
              refreshContests();
        }   catch (error) {
            setError(error instanceof Error ? error.message : errMessage);
        } finally {
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
                },
              ]}
            >
              <h5>
                Are you sure to remove
                <Tooltip content={openWithContest?.location_url}>
                  <span className="font-bold text-rose-500 px-2">
                    {openWithContest?.contest_name}
                  </span>
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
                        ref={contestNameRef} 
                        required 
                        label="Name" 
                        defaultValue={openWithContest?.contest_name} 
                    />
        
                    <InputUrl
                      ref={contestUrlRef}
                      required
                      placeholder="https://example.com"
                      label="Contest URL"
                      defaultValue={openWithContest?.contest_url}
                    />

                    <Input
                      ref={locationRef}
                      required
                      label="Location"
                      defaultValue={openWithContest?.location}
                    />

                    <InputUrl
                      ref={locationUrlRef}
                      required
                      placeholder="https://example.com"
                      label="Location URL"
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

                    <Input
                      ref={contactRef}
                      label="Contact"
                      defaultValue={openWithContest?.contact}
                    />

                    <InputUrl
                      ref={thumbnailUrlRef}
                      placeholder="https://example.com"
                      label="Thumbnail URL"
                      defaultValue={openWithContest?.thumbnail_url}
                    />
                  </div>
                )}
            </Modal>
        </>
    )
}