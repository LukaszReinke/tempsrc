import type { Meta } from '@storybook/react';
import { ListItem } from './ListItem';

const meta = {
  title: 'Components / ListItem',
  component: ListItem,
} satisfies Meta<typeof ListItem>;

export default meta;

export const Default = {
  args: {
    label: 'Label:',
    content: 'This is the content.',
  },
};

export const LongContent = {
  args: {
    label: 'Description:',
    content:
      'This is a longer content example that spans across multiple lines to demonstrate how it handles text wrapping.',
  },
};
