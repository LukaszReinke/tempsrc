import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Designsystem / UI Atoms / Tooltip',
  component: Tooltip,
  argTypes: {
    position: {
      control: { type: 'radio' },
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <button className="text-white">Hover Me</button>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  args: { content: 'Tooltip at bottom', position: 'bottom' },
  render: Default.render,
};

export const Left: Story = {
  args: { content: 'Tooltip on left', position: 'left' },
  render: Default.render,
};

export const Right: Story = {
  args: { content: 'Tooltip on right', position: 'right' },
  render: Default.render,
};
