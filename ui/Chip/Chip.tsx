import React from 'react';

export type ChipProps = {
  variant?: 'solid' | 'outline';
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  children: React.ReactNode;
};

export const Chip: React.FC<ChipProps> = ({ variant = 'solid', color = 'primary', children }) => {
  const colorClasses = {
    primary: {
      solid: 'bg-amber-500 text-white',
      outline: 'border border-amber-500 text-amber-500',
    },
    secondary: {
      solid: 'bg-zinc-700 text-white',
      outline: 'border border-zinc-500 text-zinc-500',
    },
    danger: {
      solid: 'bg-rose-500 text-white',
      outline: 'border border-rose-500 text-rose-500',
    },
    success: {
      solid: 'bg-emerald-400 opacity-[80] text-white',
      outline: 'border border-emerald-400/75 text-emerald-400/75',
    },
  };

  const variantClass = colorClasses[color][variant];

  return (
    <span
      className={`inline-flex items-center px-3 mr-1 mb-1 py-1 text-sm font-semibold rounded-full ${variantClass}`}
    >
      {children}
    </span>
  );
};
