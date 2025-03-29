import type { Meta } from '@storybook/react';

import { IconButton } from './IconButton';
import { HomeIcon } from '@heroicons/react/24/outline';

const meta = {
  title: 'Designsystem / UI Atoms / Icon Button ',
  component: IconButton,
  args: {
    children: <HomeIcon aria-hidden="true" className={`size-6`} />,
  },
} satisfies Meta<typeof IconButton>;

export default meta;

export const Default = {};

export const TooltipVariant = {
  args: {
    tooltip: 'Tooltip text',
  },
};
