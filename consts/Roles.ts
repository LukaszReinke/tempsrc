import { SelectOption } from '@hd/ui';

// Assigning backend's role values
export const SYSTEM_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EVENT_MOD: 'event_moderator',
  USER_MOD: 'user_moderator',
};

export const SYSTEM_ROLES_SELECT_OPTIONS: SelectOption[] = [
  {
    value: SYSTEM_ROLES.SUPER_ADMIN,
    label: 'Super Admin!',
  },
  {
    value: SYSTEM_ROLES.ADMIN,
    label: 'Admin',
  },
  {
    value: SYSTEM_ROLES.EVENT_MOD,
    label: 'Events Moderator',
  },
  {
    value: SYSTEM_ROLES.USER_MOD,
    label: 'User Manager',
  },
];
