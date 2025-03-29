import { Chip } from '@hd/ui';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type LinkCardProps = {
  heading: string;
  children?: ReactNode;
  href?: string;
  tags?: string[];
  onClick?: () => void;
  isActive?: boolean;
};

export const LinkCard = ({ href, children, heading, onClick, tags, isActive }: LinkCardProps) => {
  const LinkCardContent = () => (
    <div
      className={`max-w-sm h-full rounded-xl p-2 shadow-lg bg-zinc-950 font-semibold transform transition duration-200 cursor-pointer shadow-black/50
        ${
          isActive
            ? 'text-amber-500'
            : 'text-zinc-300/75 hover:scale-[103%] hover:text-amber-500 hover:shadow-amber-500/50'
        }`}
    >
      <div className="px-6 py-4 z-1">
        <div className="text-2xl">{heading}</div>
        {children && <p className="mt-3">{children}</p>}
      </div>
      {tags && (
        <div className="px-6 pt-4 pb-3">
          {tags.map((tag, i) => (
            <Chip key={i} variant="solid" color="secondary">
              #{tag}
            </Chip>
          ))}
        </div>
      )}
    </div>
  );

  return onClick ? (
    <button onClick={() => onClick && onClick()}>{LinkCardContent()}</button>
  ) : (
    <Link href={href ? href : '/'}>{LinkCardContent()}</Link>
  );
};
