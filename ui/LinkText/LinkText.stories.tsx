import type { Meta } from '@storybook/react';

import { LinkText } from './LinkText';

const meta = {
  title: 'Designsystem / UI Atoms / Link ',
  component: LinkText,
  args: {
    href: '#',
    children: 'Navigation link',
  },
} satisfies Meta<typeof LinkText>;

export default meta;

export const Default = {};
