'use client';

import { Disclosure } from '@headlessui/react';
import { Bars4Icon, HomeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { DrawerMenu } from '../DrawerMenu';
import { useState } from 'react';
import { IconButton, NavButton, NavButtonProps } from '@hd/ui';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@hd/consts';
import Link from 'next/link';

const NAVIGATION_LINKS = [
  {
    children: <HomeIcon aria-hidden="true" className={`size-6`} />,
    href: ROUTES.HOME,
  },
  { children: 'Workshops', href: ROUTES.WORKSHOPS },
  { children: 'Contests', href: ROUTES.CONTESTS },
] satisfies Array<NavButtonProps>;

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Disclosure
      as="nav"
      className="z-40 flex w-[100%] justify-center top-0 left-0 w-full bg-black border-b sticky border-zinc-800"
    >
      <div className="mx-auto px-2 sm:px-6 lg:px-8 justify-center max-w-[1400px] w-full self-center">
        <div className="flex items-center justify-between gap-8">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden md:block">
              <div className="flex space-x-4">
                {NAVIGATION_LINKS.map((navItem, i) => (
                  <NavButton
                    animatedLoading
                    key={i}
                    href={navItem.href}
                    current={pathname === navItem.href}
                    className={`hidden ${
                      navItem.href !== ROUTES.HOME ? 'md:inline-block' : ''
                    } xl:inline-block`}
                  >
                    {navItem.children}
                  </NavButton>
                ))}
              </div>
            </div>
          </div>
          <Link href={ROUTES.HOME}>
            <Image
              priority
              height={100}
              width={300}
              alt="Highly Driven logo"
              src="/HeaderLogo.png"
              className="flex-1 max-w-[280px] h-[80px] md:h-[106px] w-[200px] md:w-[280px]"
            />
          </Link>
          <div className="flex-1 flex justify-end">
            <IconButton onClick={() => setIsOpen(true)} tooltip="Menu">
              <Bars4Icon className="size-7" />
            </IconButton>
          </div>
        </div>
      </div>
      <DrawerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </Disclosure>
  );
};
