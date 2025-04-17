'use client';

import { ROUTES } from '@hd/consts';
import { IconButton, NavButton } from '@hd/ui';
import { Disclosure } from '@headlessui/react';
import {
  Bars4Icon,
  TrophyIcon,
  SparklesIcon,
  EnvelopeOpenIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LogoutModal, DrawerMenu } from '@hd/components';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/20/solid';

export const AuthNavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Disclosure
      as="nav"
      className="z-40 sticky flex items-center flex w-full md:h-[106px] justify-center top-0 left-0 w-full bg-black border-b border-zinc-800"
    >
      <div className="max-w-[1400px] w-full flex px-2 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <div className="flex flex-wrap justify-start md:space-x-5 md:justify-center align-center h-full pt-1">
            {NAVIGATION_LINKS.map((navItem, i) => (
              <NavButton
                key={i}
                onClick={navItem.openModal ? () => setIsLogoutModalOpen(true) : undefined}
                href={navItem.href}
                current={pathname === navItem.href}
                className="flex items-center"
              >
                {navItem.children}
              </NavButton>
            ))}
          </div>
        </div>
        <div className="flex self-center">
          <IconButton onClick={() => setIsDrawerOpen(true)} tooltip="Menu">
            <Bars4Icon className="size-7" />
          </IconButton>
        </div>
      </div>

      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
      <DrawerMenu isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </Disclosure>
  );
};

const LINK_ICON_STYLES = 'w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 inline mr-0 lg:mr-2';
const LINK_LABEL_STYLES = 'hidden lg:inline';

const NAVIGATION_LINKS = [
  {
    href: ROUTES.CREW_DASHBOARD,
    children: (
      <>
        <EnvelopeOpenIcon className={LINK_ICON_STYLES} />
        <span className={LINK_LABEL_STYLES}>Requests</span>
      </>
    ),
  },
  {
    href: ROUTES.CREW_WORKSHOP_MANAGEMENT,
    children: (
      <>
        <SparklesIcon className={LINK_ICON_STYLES} />
        <span className={LINK_LABEL_STYLES}>Workshops</span>
      </>
    ),
  },
  {
    href: ROUTES.CREW_CONTEST_MANAGEMENT,
    children: (
      <>
        <TrophyIcon className={LINK_ICON_STYLES} />
        <span className={LINK_LABEL_STYLES}>Contests</span>
      </>
    ),
  },
  {
    href: ROUTES.CREW_HR_MANAGEMENT,
    children: (
      <>
        <UserGroupIcon className={LINK_ICON_STYLES} />
        <span className={LINK_LABEL_STYLES}>Crew</span>
      </>
    ),
  },
  {
    href: ROUTES.CREW_EDIT_PROFILE,
    children: (
      <>
        <UserIcon className={LINK_ICON_STYLES} />
        <span className={LINK_LABEL_STYLES}>Profile</span>
      </>
    ),
  },
  {
    openModal: true,
    children: (
      <>
        <ArrowLeftEndOnRectangleIcon className={LINK_ICON_STYLES} />
        <span className={LINK_LABEL_STYLES}>Log out</span>
      </>
    ),
  },
];
