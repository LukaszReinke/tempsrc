import type { Meta } from '@storybook/react';

import { AuthNavBar } from './AuthNavBar';

const meta = {
  title: 'Designsystem / Page Components / AuthNavBar',
  component: AuthNavBar,
} satisfies Meta<typeof AuthNavBar>;

export default meta;

export const Default = {};

export const WithLogoutModalOpen = {
  args: {
    isLogoutModalOpen: true,
  },
};

export const WithDrawerMenuOpen = {
  args: {
    isDrawerOpen: true,
  },
};
