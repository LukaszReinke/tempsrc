import React, { ReactNode } from 'react';
import { Tooltip } from '../Tooltip';

type IconButtonProps = {
  children: ReactNode;
  onClick: () => void;
  tooltip?: string;
  className?: string;
  disabled?: boolean;
};

export const IconButton = ({
  children,
  onClick,
  tooltip,
  className = '',
  disabled = false,
}: IconButtonProps) => {
  const Button = () => (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`relative rounded-full outline-none p-2 text-gray-400 focus:outline-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-zinc-100 hover:bg-zinc-800'
      } ${className}`}
    >
      {children}
    </button>
  );

  return tooltip ? (
    <Tooltip position="bottom" content={tooltip}>
      <Button />
    </Tooltip>
  ) : (
    <Button />
  );
};
