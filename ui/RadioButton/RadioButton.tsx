'use client';

import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { SelectOption } from '@hd/types';

export const RadioButton = ({ 
  options, 
  value, 
  onChange, 
  className = '' 
}: { 
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string; 
}) => (
    <RadioGroup value={value} onChange={onChange} className={className}>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <RadioGroup.Option
            key={option.value}
            value={option.value}
            className={({ checked }) =>
              `${
                checked ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-400'
              } relative flex cursor-pointer rounded-lg px-5 h-11 items-center focus:outline-none hover:bg-zinc-800/75 hover:text-white transition-colors duration-200 flex-shrink-0`
            }
          >
            {({ checked }) => (
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm">
                    <RadioGroup.Label as="p" className={`font-medium ${checked ? 'text-white' : 'text-zinc-400'}`}>
                      {option.label}
                    </RadioGroup.Label>
                  </div>
                </div>
                {checked && (
                  <div className="shrink-0 text-white ml-2">
                    <CheckIcon className="h-5 w-5" />
                  </div>
                )}
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
); 