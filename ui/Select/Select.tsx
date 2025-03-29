'use client';

import { forwardRef, useImperativeHandle, useState } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export type SelectOption = {
  label?: string;
  value: string;
};

export type SelectProps = {
  label?: string;
  name?: string;
  options: SelectOption[];
  defaultSelected?: SelectOption;
  onChange?: (option: SelectOption) => void;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
};

export const Select = forwardRef<{ getValue: () => SelectOption | null }, SelectProps>(
  (
    {
      label,
      name,
      options,
      defaultSelected,
      onChange,
      disabled = false,
      placeholder = ' ',
      required = false,
    },
    ref,
  ) => {
    const [internalSelected, setInternalSelected] = useState<SelectOption | null>(
      defaultSelected || null,
    );

    const handleChange = (option: SelectOption) => {
      setInternalSelected(option);
      onChange?.(option);
    };

    useImperativeHandle(ref, () => ({
      getValue: () => internalSelected,
    }));

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={name} className="block font-medium text-zinc-300 mb-2">
            {label}
            {required && <span className="text-amber-500 ml-1">*</span>}
          </label>
        )}
        <Listbox value={internalSelected} onChange={handleChange} disabled={disabled}>
          <div className="relative">
            <ListboxButton
              id={name}
              className={`relative w-full h-11 cursor-default rounded-lg bg-zinc-700 py-2.5 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-white/25 sm:text-sm ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-required={required}
            >
              <span className="block truncate text-white">
                {internalSelected ? internalSelected.label : placeholder}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-zinc-400" aria-hidden="true" />
              </span>
            </ListboxButton>
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-zinc-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, index) => (
                <ListboxOption
                  key={index}
                  value={option}
                  className={({ selected }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 text-white hover:bg-amber-600 hover:text-white ${
                      selected ? 'font-medium' : 'font-normal'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className="block truncate">{option.label}</span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
    );
  },
);

Select.displayName = 'Select';
