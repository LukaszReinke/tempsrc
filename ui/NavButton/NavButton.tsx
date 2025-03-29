'use client';

import { classNames } from '@hd/utils';
import { ReactNode } from 'react';
import { TransitionLink } from '@hd/ui';
import Link from 'next/link';

export type NavButtonProps = {
  children: ReactNode;
  current?: boolean;
  href?: string;
  className?: string;
  onClick?: () => void;
  animatedLoading?: boolean;
};

export const NavButton = (props: NavButtonProps) => {
  const classes = classNames(
    props.current
      ? 'text-amber-500 cursor-default'
      : 'text-zinc-300 hover:border-amber-500 hover:text-white cursor-pointer',
    'py-3 text-left px-3 transition font-semibold text-lg tracking-wide border-b-2 border-transparent duration-300 lg:a-xl',
    props.className ? props.className : '',
  );

  return props.onClick ? (
    <button className={classes} onClick={() => props.onClick && props.onClick()}>
      {props.children}
    </button>
  ) : props.animatedLoading ? (
    <TransitionLink className={classes} href={props.href ? props.href : '/'}>
      {props.children}
    </TransitionLink>
  ) : (
    <Link className={classes} href={props.href ? props.href : '/'}>
      {props.children}
    </Link>
  );
};
