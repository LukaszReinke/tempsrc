import type { Meta } from '@storybook/react';

import { Login } from './Login';

const meta = {
  title: 'Designsystem / Page Components / Login',
  component: Login,
} satisfies Meta<typeof Login>;

export default meta;

export const Default = {};

export const Error = {
  args: {
    error: 'Example Error toast',
  },
};
