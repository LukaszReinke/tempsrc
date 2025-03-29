'use client';

import React from 'react';
import { DrawerMenuButton } from './DrawerMenuButton';
import { ROUTES } from '@hd/consts';
import { usePathname } from 'next/navigation';
import { Drawer, LinkText } from '@hd/ui';

type DrawerMenuProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

const MENU_ITEMS = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Workshops', href: ROUTES.WORKSHOPS },
  { label: 'Classes', href: ROUTES.CLASSES },
  { label: 'Contests', href: ROUTES.CONTESTS },
  { label: 'Contact', href: ROUTES.CONTACT },
];

export const DrawerMenu = (props: DrawerMenuProps) => {
  const pathname = usePathname();

  return (
    <Drawer open={props.isOpen} setOpen={props.setIsOpen}>
      <nav className="xl:mt-16 relative flex flex-col gap-4 h-[calc(100vh - 200px)]">
        {MENU_ITEMS.map((item, i) => (
          <DrawerMenuButton
            handleLinkClick={() => props.setIsOpen(false)}
            key={i}
            isActiveRoute={pathname === item.href}
            href={item.href}
          >
            {item.label}
          </DrawerMenuButton>
        ))}
      </nav>
      <div className="fixed left-1/2 transform -translate-x-1/2 bottom-16">
        <LinkText handleLinkClick={() => props.setIsOpen(false)} href={ROUTES.CREW_DASHBOARD}>
          Crew panel
        </LinkText>
      </div>
    </Drawer>
  );
};
