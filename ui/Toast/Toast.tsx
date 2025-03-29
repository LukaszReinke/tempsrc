'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { ReactNode, useEffect, useState } from 'react';

type ToastProps = {
  children: ReactNode;
  type: 'success' | 'error';
  handleToastClose: () => void;
  className?: string;
  isFixed?: boolean;
};

// TODO: Create Error and Success Message context - sprint 8 / 9 and use Toast
export const Toast = ({
  children,
  type,
  handleToastClose,
  className,
  isFixed = false,
}: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      handleToastClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [handleToastClose]);

  if (!visible) return null;

  return (
    <div
      id="toast-default"
      className={`${
        isFixed ? 'fixed z-50' : ''
      } w-full flex justify-between p-4 text-zinc-100 rounded-lg shadow-sm
        ${type === 'error' ? 'bg-rose-600/75' : 'bg-emerald-400/75'}
        ${className}
        md:right-6 md:bottom-6
        sm:w-auto
        ${type === 'error' ? 'left-1/2 -translate-x-1/2' : ''} 
        sm:left-auto sm:transform-none`}
      role="alert"
    >
      <div className="ms-3 text-md font-medium pr-2">{children}</div>
      <button
        onClick={() => {
          setVisible(false);
          handleToastClose();
        }}
        className={`
        ${type === 'error' ? 'hover:text-red-300' : 'hover:text-emerald-200/75'}
        `}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
