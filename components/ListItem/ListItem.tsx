import { ReactNode } from 'react';

type ListItemProps = {
  label: ReactNode;
  content: ReactNode;
};

export const ListItem = ({ label, content }: ListItemProps) => (
  <div className="flex gap-3 items-center">
    <p className="opacity-70">{label}:</p>
    <p>{content}</p>
  </div>
);
