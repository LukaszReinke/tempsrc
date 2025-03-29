'use client';

import { ReactNode, Ref } from 'react';
import { Input as HDInput, InputProps as HDInputProps } from '@headlessui/react';

export type InputProps = HDInputProps & {
  label?: string;
  ref?: Ref<HTMLInputElement>;
  icon?: ReactNode;
  errorMessage?: string;
};

export const Input = (props: InputProps) => {
  const disabledStyles = 'opacity-50 hover:opacity-50 cursor-not-allowed';

  return (
    <div className="w-full">
      {props.label && (
        <label htmlFor={props.name} className="block font-medium text-zinc-300 mb-2">
          {props.label} {props.required && <span className="text-amber-500">*</span>}
        </label>
      )}
      <div className="flex relative items-center">
        {props.icon && <span className="absolute left-3 text-zinc-400">{props.icon}</span>}
        <HDInput
          {...props}
          id={props.name}
          ref={props.ref}
          required
          className={`block w-full rounded-lg border-none bg-zinc-700 py-2.5 px-3.5 text-md/8 text-white 
            focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 
            pl-${props.icon ? '10' : '3'} ${props.disabled ? disabledStyles : ''}`}
          style={{ paddingLeft: props.icon ? '2.5rem' : '1rem' }}
        />
      </div>
      {props.errorMessage && <p className="mt-1 text-sm text-amber-500">{props.errorMessage}</p>}
    </div>
  );
};
