import { Meta } from '@storybook/react';
import { Modal } from './Modal';

export default {
  title: 'Designsystem / UI Atoms / Modal',
  component: Modal,
  args: {
    isOpen: true,
    onClose: () => {},
  },
} satisfies Meta<typeof Modal>;

export const Default = {
  args: {
    title: 'Default Modal',
    children: <p>This is the modal content.</p>,
    buttons: [{ label: 'Close', props: { onClick: () => alert('Closed') } }],
  },
};

export const WithMultipleButtons = {
  args: {
    title: 'Modal with Multiple Buttons',
    children: <p>This is the modal content with multiple buttons.</p>,
    buttons: [
      { label: 'Cancel', props: { onClick: () => alert('Cancelled') } },
      {
        label: 'Save',
        props: { onClick: () => alert('Saved'), className: 'bg-blue-500 text-white' },
      },
    ],
  },
};
