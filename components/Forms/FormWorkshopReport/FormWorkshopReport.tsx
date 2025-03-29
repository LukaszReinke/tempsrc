'use client';

import React, { useRef } from 'react';
import { Input } from '@hd/ui';

export const FormWorkshopReport = () => {
  // Create refs for the uncontrolled inputs
  const urlRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const categoriesRef = useRef<HTMLInputElement>(null);
  const placeRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Accessing the values of the uncontrolled inputs
    const url = urlRef.current?.value;
    const name = nameRef.current?.value;
    const contact = contactRef.current?.value;
    const categories = categoriesRef.current?.value;
    const place = placeRef.current?.value;
    const date = dateRef.current?.value;
    const time = timeRef.current?.value;

    // For now, just log the values to console (you can send them to your server here)
    console.log('URL:', url);
    console.log('Name:', name);
    console.log('Contact:', contact);
    console.log('Categories:', categories);
    console.log('Place:', place);
    console.log('Date:', date);
    console.log('Time:', time);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-10 rounded-xl bg-zinc-950/50 shadow-lg">
      <Input
        id="url"
        label="Event official website"
        ref={urlRef}
        placeholder="Enter the event URL"
      />

      <Input label="Event name" id="name" ref={nameRef} placeholder="Enter the event name" />

      <Input
        label="Contact data"
        id="contact"
        ref={contactRef}
        placeholder="Enter your contact info - email or phone number"
      />

      <Input
        label="Categories"
        id="categories"
        ref={categoriesRef}
        placeholder="Enter categories (comma separated)"
      />

      <div>
        <label htmlFor="place" className="block text-sm font-medium text-gray-700">
          Place
        </label>
        <Input
          id="place"
          ref={placeRef}
          type="text"
          className="mt-1 block w-full"
          placeholder="Enter the event place"
        />
      </div>

      <Input label="Date" id="date" ref={dateRef} type="date" className="mt-1 block w-full" />

      {/* Time Field */}
      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
          Time
        </label>
        <Input id="time" ref={timeRef} type="time" className="mt-1 block w-full" />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">
          Submit
        </button>
      </div>
    </form>
  );
};
