import type { Meta } from '@storybook/react';

import { MemberFormModal } from './FormMemberModal';

const meta = {
  title: 'Designsystem / Page Components / MembersModalForm',
  component: MemberFormModal,
  args: {
    onClose: () => {},
    openWithUser: {
      id: 1,
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      role: 'super_admin',
      permission: 'none',
    },
  },
} satisfies Meta<typeof MemberFormModal>;

export default meta;

export const Default = {};
