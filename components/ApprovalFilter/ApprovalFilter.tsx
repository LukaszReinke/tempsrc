'use client';

import { RadioButton } from '@hd/ui';
import { useState, useEffect } from 'react';

interface ApprovalFilterProps {
  onApprovalChange: (value: string | null) => void;
}

const APPROVAL_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Approved', value: 'true' },
  { label: 'Pending', value: 'false' }
];

export const ApprovalFilter = ({ onApprovalChange }: ApprovalFilterProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('all');

  useEffect(() => {
    onApprovalChange(selectedValue === 'all' ? null : selectedValue);
  }, [selectedValue, onApprovalChange]);

  return (
    <div className="inline-flex">
      <RadioButton
        options={APPROVAL_OPTIONS}
        value={selectedValue}
        onChange={setSelectedValue}
        className="flex-wrap"
      />
    </div>
  );
}; 