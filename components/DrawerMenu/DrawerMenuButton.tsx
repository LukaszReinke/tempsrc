import { TransitionLink } from '@hd/ui';
import { ReactNode } from 'react';

type DrawerMenuButtonType = {
  children: ReactNode;
  isActiveRoute: boolean;
  href: string;
  handleLinkClick?: () => void;
};

export const DrawerMenuButton = (props: DrawerMenuButtonType) => (
  <TransitionLink
    onClick={() => props.handleLinkClick && props.handleLinkClick()}
    href={props.href}
    className={`w-full py-3 text-left px-4 transition font-semibold text-lg tracking-wide border-b-2 border-transparent duration-300 ${
      props.isActiveRoute
        ? 'text-amber-500 cursor-default'
        : 'text-zinc-300 hover:border-amber-500 hover:text-white cursor-pointer'
    }`}
  >
    {props.children}
  </TransitionLink>
);
