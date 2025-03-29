import type { Meta } from '@storybook/react';

import { DrawerMenu } from './DrawerMenu';

const meta = {
  title: 'Designsystem / Page Components / Menu',
  component: DrawerMenu,
} satisfies Meta<typeof DrawerMenu>;

export default meta;

export const Default = () => <DrawerMenu isOpen={true} setIsOpen={() => {}} />;
