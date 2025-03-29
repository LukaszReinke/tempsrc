import type { Meta } from '@storybook/react';

import { NavButton } from './NavButton';

const meta = {
  title: 'Designsystem / UI Atoms / Navigation Button',
  component: NavButton,
  args: {
    href: '#',
    children: 'Navigation Button',
  },
} satisfies Meta<typeof NavButton>;

export default meta;

export const Default = {
  args: {
    current: false,
  },
};

export const CurrentPage = {
  args: {
    current: true,
  },
};
