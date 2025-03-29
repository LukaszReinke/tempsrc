'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransitionContext } from '@hd/context';
import Link from 'next/link';

type TransitionLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const TransitionLink = ({
  href,
  children,
  className,
  onClick = () => {},
}: TransitionLinkProps) => {
  const router = useRouter();
  const currentPath = usePathname();
  const { startExitTransition } = useTransitionContext();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick();

    if (currentPath === href) {
      return;
    }
    await startExitTransition();
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};
