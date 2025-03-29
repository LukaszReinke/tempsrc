import React, { ReactNode } from 'react';

type StorybookStackProps = { children: Array<ReactNode> };

export const StorybookStack = ({ children }: StorybookStackProps) => {
  return (
    <div className="flex gap-4 items-center">
      {children?.map((child, i) => <div key={i}>{child}</div>)}
    </div>
  );
};
