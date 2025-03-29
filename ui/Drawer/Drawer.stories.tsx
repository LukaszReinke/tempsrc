import type { Meta } from '@storybook/react';

import { Drawer } from './Drawer';
import { useState } from 'react';
import { Button } from '../Button';

const meta = {
  title: 'Designsystem / UI Atoms / Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;

export const Default = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button size="sm" variant="secondary" onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>
      <Drawer open={isOpen} setOpen={setIsOpen}>
        content
      </Drawer>
    </>
  );
};
