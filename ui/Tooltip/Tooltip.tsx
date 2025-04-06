'use client';

import { ReactNode, useState } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = ({ children, content, position = 'top' }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onClick={() => setIsVisible(false)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div
        className={`absolute whitespace-nowrap px-3 py-2 bg-zinc-900/75 text-zinc-200 text-sm rounded-lg shadow-lg transition-all duration-300 ease-in-out opacity-0 scale-95 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } ${
          position === 'top'
            ? 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
            : position === 'bottom'
              ? 'top-full left-1/2 transform -translate-x-1/2 mt-2'
              : position === 'left'
                ? 'right-full top-1/2 transform -translate-y-1/2 mr-2'
                : 'left-full top-1/2 transform -translate-y-1/2 ml-2'
        }`}
      >
        {content}
      </div>
    </div>
  );
};