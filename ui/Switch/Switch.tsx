'use client';

import { useState } from 'react';
import { Switch as HDSwitch, SwitchProps } from '@headlessui/react';

type SwProps = SwitchProps & { label?: string; required?: boolean };

export const Switch = (props: SwProps) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      {props.label && (
        <label htmlFor={props.name} className="block font-medium text-zinc-300 mb-2">
          {props.label} {props.required && <span className="text-amber-500">*</span>}
        </label>
      )}
      <HDSwitch
        {...props}
        checked={enabled}
        onChange={setEnabled}
        disabled={props.disabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 transition duration-300 
          ${enabled ? 'bg-amber-500 border-amber-600' : 'bg-zinc-600 border-zinc-600'}
          ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full shadow-md transition duration-300 
            ${enabled ? 'translate-x-5 border border-black bg-zinc-800' : 'translate-x bg-zinc-800'}
            ${props.disabled ? 'bg-zinc-700' : ''}`}
        />
      </HDSwitch>
    </div>
  );
};
