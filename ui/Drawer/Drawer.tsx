'use client';

import { BG_COLORS } from '@hd/consts';
import { classNames } from '@hd/utils';
import { IconButton, Tooltip } from '@hd/ui';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type Props = {
  open: boolean;
  setOpen: (b: boolean) => void;
  title?: string;
  children: ReactNode;
};

export const Drawer = (props: Props) => {
  return (
    <Transition show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={() => props.setOpen(false)}>
        <TransitionChild
          as={Fragment}
          enter="transition-opacity duration-300 ease-in-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300 ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-900/50" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transition-transform duration-300 ease-in-out"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition-transform duration-300 ease-in-out"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel
                  className={classNames(
                    'pointer-events-auto relative w-screen max-w-md transform transition-all',
                    BG_COLORS.DRAWER,
                  )}
                >
                  <div className="flex justify-end pt-9 pr-10">
                    <IconButton onClick={() => props.setOpen(false)}>
                      <XMarkIcon className="h-6 w-6" />
                    </IconButton>
                  </div>
                  <div className="flex h-full flex-col py-6 shadow-xl">
                    {props.title && (
                      <div className="px-4 sm:px-6 flex">
                        <DialogTitle className="text-base font-semibold text-gray-900">
                          {props.title}
                        </DialogTitle>
                        <Tooltip content="Close panel">
                          <div className="flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                            <button
                              type="button"
                              onClick={() => props.setOpen(false)}
                              className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden"
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon aria-hidden="true" className="w-6 h-6" />
                            </button>
                          </div>
                        </Tooltip>
                      </div>
                    )}
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">{props.children}</div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
