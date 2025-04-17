import { Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { Button, ButtonProps, IconButton } from '@hd/ui';
import { XMarkIcon } from '@heroicons/react/24/outline';

const TransitionElements = ({ children }: { children: ReactNode }) => (
  <TransitionChild
    as={Fragment}
    enter="ease-out duration-400"
    enterFrom="opacity-0 scale-95"
    enterTo="opacity-100 scale-100"
    leave="ease-in duration-200"
    leaveFrom="opacity-100 scale-100"
    leaveTo="opacity-0 scale-95"
  >
    {children}
  </TransitionChild>
);

type ModalButton = ButtonProps & {
  label: string;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  buttons?: ModalButton[];
  fullScreen?: boolean;
  minSize?: boolean;
};

export const Modal = ({
  isOpen,
  fullScreen,
  onClose,
  title,
  children,
  buttons,
  minSize = false,
}: ModalProps) => {
  const containerClasses = minSize 
    ? 'max-w-sm h-auto bg-zinc-800 rounded-2xl shadow-lg transform transition-all p-4' 
    : fullScreen 
      ? 'w-full max-w-[1400px] h-screen bg-zinc-800 rounded-2xl shadow-lg transform transition-all overflow-y-auto' 
      : 'w-full bg-zinc-800 rounded-2xl shadow-lg transform transition-all overflow-hidden md:max-w-2xl md:p-6 md:rounded-2xl sm:p-6 sm:relative sm:inset-auto sm:max-w-xl sm:rounded-2xl sm:transform sm:transition-all sm:m-auto sm:h-auto sm:max-h-[90vh]';
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionElements>
          <div className="fixed inset-0 bg-zinc-950 bg-opacity-70" aria-hidden="true" />
        </TransitionElements>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center">
            <TransitionElements>
              <div className={containerClasses}>
                <div className="flex justify-between items-center border-b border-zinc-700 px-4 py-3">
                  <DialogTitle className="text-xl font-bold text-zinc-100">{title}</DialogTitle>
                  <IconButton onClick={onClose} className="text-zinc-400 hover:text-zinc-200">
                    <XMarkIcon className="w-5 h-5" />
                  </IconButton>
                </div>
                {children && (
                  <div className={`px-4 py-2 text-zinc-300 ${fullScreen ? 'overflow-y-auto flex-1' : ''}`}>
                    {children}
                  </div>
                )}
                {buttons && (
                  <div className="flex gap-3 px-4 py-3 justify-center border-t border-zinc-700">
                    {buttons.map((button, index) => (
                      <Button key={index} {...button}>
                        {button.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </TransitionElements>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
