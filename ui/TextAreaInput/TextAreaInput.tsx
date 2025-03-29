import { Textarea } from '@headlessui/react';
import React, { Ref } from 'react';
import { TextareaHTMLAttributes } from 'react';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  ref?: Ref<HTMLTextAreaElement>;
  resizeEnabled?: boolean;
};

export const TextAreaInput = (props: TextAreaProps) => {
  const rows = props.rows ? props.rows : 6;

  return (
    <div>
      {props.label && (
        <label htmlFor={props.name} className="block font-medium text-zinc-300">
          {props.label} {props.required && <span className="text-amber-500">*</span>}
        </label>
      )}
      <Textarea
        {...props}
        id={props.name}
        ref={props.ref}
        required
        rows={rows}
        className={`${
          props.resizeEnabled ? '' : 'resize-none'
        } block w-full mt-2 rounded-lg border-none bg-zinc-700 py-2.5 px-3.5 text-md/8 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25`}
      />
    </div>
  );
};
