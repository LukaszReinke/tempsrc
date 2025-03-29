import type { Meta } from '@storybook/react';
import { Select, SelectOption } from './Select';

const options: SelectOption[] = [
  { label: 'Option One', value: '1' },
  { label: 'Option Two', value: '2' },
  { label: 'Option Three', value: '3' },
];

const meta = {
  title: 'Designsystem / UI Atoms / Select',
  component: Select,
  args: {
    label: 'Choose an option',
    options: options,
    placeholder: 'Select an option',
  },
} satisfies Meta<typeof Select>;

export default meta;

export const Default = {
  args: {
    defaultSelected: options[0],
    disabled: false,
  },
};

export const Disabled = {
  args: {
    selected: options[0],
    disabled: true,
  },
};
