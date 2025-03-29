'use client';

import React, { useRef, useState } from 'react';
import { Button, Input, TextAreaInput } from '@hd/ui';
import { DateInput, LocationInput, UrlInput } from '@hd/components';

export const FormContestReport = () => {
  const [error, setError] = useState<null | string>(null);

  const urlRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const categoriesRef = useRef<HTMLTextAreaElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const url = urlRef.current?.value;
    const name = nameRef.current?.value;
    const contact = contactRef.current?.value;
    const categories = categoriesRef.current?.value;
    const location = locationRef.current?.value;
    const date = dateRef.current?.value;
    const time = timeRef.current?.value;

    console.log('URL:', url);
    console.log('Name:', name);
    console.log('Contact:', contact);
    console.log('Categories:', categories);
    console.log('Place:', location);
    console.log('Date:', date);
    console.log('Time:', time);

    if (!url || !name) {
      setError(`All fields marked with '*' are required.`);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-10 rounded-xl bg-zinc-950/50 shadow-lg">
      <UrlInput
        id="url"
        label="Contest official website / Social media event page"
        ref={urlRef}
        placeholder="Enter the event URL"
        required
      />

      <Input
        label="Event name"
        id="name"
        ref={nameRef}
        required
        placeholder="Enter the event name"
      />

      <TextAreaInput
        label="Categories"
        id="categories"
        required
        rows={2}
        ref={categoriesRef}
        placeholder="Competition categories - for e.g. Pole Sport, Pole Art... (comma separated)"
      />

      <LocationInput ref={locationRef} label="Location / place" />

      <DateInput label="Date" id="date" ref={dateRef} />

      <Input
        label="Contact data"
        id="contact"
        ref={contactRef}
        placeholder="Enter your contact info - email or phone number"
      />

      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
