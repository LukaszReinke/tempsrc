'use client';

import { useCallback, useRef, useState } from 'react';
import { Button, Input, Switch } from '@hd/ui';
import { UrlInput, DateInput, LocationInput } from '@hd/components';
import { Transition } from '@headlessui/react';
import { WorkshopPOST } from '@hd/types';
import { API_GENERIC_ERROR } from './const';
import { ROUTES } from '@hd/consts';
import { toast } from 'react-toastify';

export const FormWorkshopReport = () => {
  const [error, setError] = useState<null | string>(null);
  const [isOrganizerChecked, setIsOrganizerChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const workshopUrlRef = useRef<HTMLInputElement>(null);
  const workshopTopicRef = useRef<HTMLInputElement>(null);
  const locationUrlRef = useRef<HTMLInputElement>(null);
  const coachesRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const organizerRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const thumbnailUrlRef = useRef<HTMLInputElement>(null);
  const participationConditionRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    setIsLoading(true);
    event.preventDefault();

    const body = {
      workshop_url: workshopUrlRef.current?.value,
      workshop_topic: workshopTopicRef.current?.value,
      location_url: locationUrlRef.current?.value,
      coaches: coachesRef.current?.value,
      start_date: startDateRef.current?.value,
      end_date: endDateRef.current?.value,
      organizer: organizerRef.current?.value,
      contact: contactRef.current?.value,
      thumbnail_url: contactRef.current?.value,
      participation_condition: participationConditionRef.current?.value,
    } as WorkshopPOST;

    if (
      !body.workshop_url ||
      !body.workshop_topic ||
      !body.location_url ||
      !body.coaches ||
      !body.start_date
    ) {
      setError(`All fields marked with '*' are required.`);
      return;
    }

    try {
      await toast.promise(
        (async () => {
          const response = await fetch(ROUTES.API.WORKSHOPS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || API_GENERIC_ERROR);
          }
        })(),
        {
          pending: 'Submitting workshop report...',
          success: 'Workshop reported successfully! Redirecting...',
          error: 'Submission failed. Please try again later.',
        },
      );

      setTimeout(() => {
        window.location.href = ROUTES.HOME;
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-4 md:p-10 rounded-xl bg-zinc-950/50 shadow-lg"
    >
      <UrlInput
        label="Workshop's website / Social media page"
        ref={workshopUrlRef}
        placeholder="Enter the workshop's URL"
        required
      />

      <LocationInput ref={locationUrlRef} required label="Google Maps Location" />

      <Input
        label="Event name"
        ref={workshopTopicRef}
        required
        placeholder="Workshop topic / name"
      />

      <Input label="Coaches" required ref={coachesRef} placeholder="Coaches (comma separated)" />

      <div className="flex gap-6 sm:gap-3 flex-col sm:flex-row">
        <DateInput label="Start date" required ref={startDateRef} />
        <DateInput label="End date - if differs" ref={endDateRef} />
      </div>

      <Input label="Organizer" ref={organizerRef} placeholder="Organizer or club name" />

      <div className="flex pt-2">
        <Switch
          onChange={() => setIsOrganizerChecked((prev) => !prev)}
          checked={isOrganizerChecked}
        />
        <div
          className={`pl-3 font-semibold transition-colors duration-300 ${
            isOrganizerChecked ? '' : 'text-zinc-400'
          }`}
        >
          {`I'm an `}
          <span
            className={`transition-colors duration-200 ${
              isOrganizerChecked ? 'text-amber-500' : ''
            }`}
          >
            organizer
          </span>
          {` and want to provide more data`}
        </div>
      </div>

      <Transition
        show={isOrganizerChecked}
        enter="transition ease-out duration-400 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-300 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <div className="space-y-6">
          <Input
            label="Contact data"
            ref={contactRef}
            placeholder="Enter your contact info - email or phone number"
          />

          <UrlInput
            label="Thumbail URL (vertical aspect ratio prefered)"
            ref={thumbnailUrlRef}
            placeholder="Provide prefered thumbnail / poster URL"
          />

          <Input
            label="Conditional participation"
            required
            ref={participationConditionRef}
            placeholder="Is dedicated for a specific level / club only?"
          />
        </div>
      </Transition>
      <div className="flex justify-center">
        <Button loading={isLoading} type="submit" size="lg">
          Submit
        </Button>
      </div>
    </form>
  );
};
