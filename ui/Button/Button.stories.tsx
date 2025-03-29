import type { Meta, StoryFn } from '@storybook/react';

import { Button, ButtonProps } from './Button';
import { StorybookStack } from '../../Stack';

const meta = {
  title: 'Designsystem / UI Atoms / Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

export const Default = (args: ButtonProps) => {
  return <Button {...args}>Button</Button>;
};

export const Variants: StoryFn<ButtonProps> = () => (
  <StorybookStack>
    <Button variant="primary">Button</Button>
    <Button variant="secondary">Button</Button>
    <Button variant="danger">Button</Button>
  </StorybookStack>
);

export const Sizes = () => (
  <StorybookStack>
    <Button size="sm">Button</Button>
    <Button size="md">Button</Button>
    <Button size="lg">Button</Button>
  </StorybookStack>
);

export const CustomExample = () => (
  <Button isCustom className="text-black bg-white p-6 border-purple-500 border-2 shadow-lg">
    Btn
  </Button>
);
