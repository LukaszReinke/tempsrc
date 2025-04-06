'use client';

import React, { useCallback, useRef, useState } from 'react';
import { Button, Input, Switch, TextAreaInput } from '@hd/ui';
import { DateInput, LocationInput, UrlInput } from '@hd/components';
import { Transition } from '@headlessui/react';
import { ROUTES } from '@hd/consts';
import { API_GENERIC_ERROR } from './const';
import { ContestsPOST } from '@hd/types';
import { toast } from 'react-toastify';

export const FormContestReport = () => {
  const [isOrganizerChecked, setIsOrganizerChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const urlRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const categoriesRef = useRef<HTMLTextAreaElement>(null);
  const locationUrlRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const federationRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const thumbnailUrlRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    const body = {
      contest_url: urlRef.current?.value,
      contest_name: nameRef.current?.value,
      location_url: locationUrlRef.current?.value,
      categories: categoriesRef.current?.value,
      start_date: startDateRef.current?.value,
      end_date: endDateRef.current?.value,
      federation: federationRef.current?.value,
      contact: contactRef.current?.value,
      thumbnail_url: thumbnailUrlRef.current?.value,
    } as ContestsPOST;

    if (
      !body.contest_url ||
      !body.contest_name ||
      !body.location_url ||
      !body.categories ||
      !body.start_date
    ) {
      toast.error(`All fields marked with '*' are required.`);
      return;
    }

    setIsLoading(true);

    try {
      await toast.promise(
        (async () => {
          const response = await fetch(ROUTES.API.CONTESTS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || API_GENERIC_ERROR);
        })(),
        {
          pending: 'Submitting contest report...',
          success: 'Contest reported successfully! Redirecting...',
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
        label="Contest official website / Social media event page"
        ref={urlRef}
        placeholder="Enter the event URL"
        required
      />

      <LocationInput ref={locationUrlRef} required label="Location / place" />

      <Input label="Event name" ref={nameRef} required placeholder="Official name of the contest" />

      <TextAreaInput
        label="Categories"
        required
        rows={2}
        ref={categoriesRef}
        placeholder="Competition categories - for e.g. Pole Sport, Pole Art... (comma separated)"
      />

      <div className="flex gap-6 sm:gap-3 flex-col sm:flex-row">
        <DateInput label="Start date" required ref={startDateRef} />
        <DateInput label="End date - if differs" ref={endDateRef} />
      </div>

      <Input label="Federation" ref={federationRef} placeholder="Official federation name" />

      <div className="flex pt-2">
        <Switch
          onChange={() => setIsOrganizerChecked((prev) => !prev)}
          checked={isOrganizerChecked}
        />
        <div className={`pl-3 ${isOrganizerChecked ? '' : 'text-zinc-400'} font-semibold`}>
          {`I'm an `}
          <span className={`${isOrganizerChecked ? 'font-semibold text-amber-500' : ''}`}>
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
