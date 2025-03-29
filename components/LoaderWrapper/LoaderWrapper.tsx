'use client';

import { ReactNode, useEffect, useState } from 'react';
import { PageLoader } from '@hd/ui/Loaders/PageLoader/PageLoader';
import { Transition } from '@headlessui/react';

export const LoaderWrapper = ({ children }: { children: ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsHydrated(true);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Transition
        show={!isHydrated}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-100"
        enterTo="opacity-0"
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-0"
        leaveTo="opacity-100"
      >
        <PageLoader />
      </Transition>

      <Transition
        show={isHydrated}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div>{children}</div>
      </Transition>
    </>
  );
};
