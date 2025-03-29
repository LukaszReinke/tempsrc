import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast'; // Adjust path as needed

const meta: Meta<typeof Toast> = {
  title: 'Designsystem / UI Atoms / Toast',
  component: Toast,
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['success', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const SuccessToast: Story = {
  args: {
    children: 'Success! Operation completed.',
    type: 'success',
  },
};

export const ErrorToast: Story = {
  args: {
    children: 'Error! Something went wrong.',
    type: 'error',
  },
};
