import { SelectOption } from '@hd/ui';

export const getLabelByValue = (value: string, options: SelectOption[]): string | undefined => {
  const option = options.find((opt) => opt.value === value);
  return option ? option.label : undefined;
};
