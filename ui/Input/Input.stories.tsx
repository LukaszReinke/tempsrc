import type { Meta } from '@storybook/react';
import { Input } from './Input';
import { GlobeAsiaAustraliaIcon } from '@heroicons/react/24/outline';

const meta = {
  title: 'Designsystem / UI Atoms / Input',
  component: Input,
  args: {
    label: 'Label',
    placeholder: 'Placeholder...',
  },
} satisfies Meta<typeof Input>;

export default meta;

export const Default = {};

export const Password = {
  args: {
    type: 'password',
    value: 'password',
  },
};

export const Required = {
  args: { required: true },
};

export const WithError = {
  args: {
    errormessage: 'This is an error message',
  },
};

export const WithIcon = {
  args: {
    icon: <GlobeAsiaAustraliaIcon className="w-5 h-5" />,
  },
};

export const Disabled = {
  args: {
    disabled: true,
    value: 'Disabled text',
  },
};
