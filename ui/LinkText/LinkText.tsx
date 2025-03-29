import Link, { LinkProps } from 'next/link';
import React, { ReactNode } from 'react';

type LinkTextProps = LinkProps & {
  children: ReactNode;
  handleLinkClick?: () => void;
  target?: '_blank' | '_parent';
};

export const LinkText = (props: LinkTextProps) => (
  <Link
    target={props.target}
    onClick={() => props.handleLinkClick && props.handleLinkClick()}
    id={`link-to-${props.href}`}
    href={props.href}
    className="text-zinc-400/[65%] hover:border-amber-500 hover:text-amber-500 cursor-pointer py-1 text-left px-1 transition tracking-wide border-b-2 border-transparent duration-300"
  >
    {props.children}
  </Link>
);
