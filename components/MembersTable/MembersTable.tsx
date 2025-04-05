'use client';

import { useEffect, useState, Fragment, useCallback } from 'react';
import { Transition } from '@headlessui/react';
import { User } from '@hd/types';
import { Input, ContentLoader, IconButton } from '@hd/ui';
import { ROUTES, SYSTEM_ROLES, SYSTEM_ROLES_SELECT_OPTIONS } from '@hd/consts';
import { getLabelByValue } from '@hd/utils';
import { FormMemberModal, Table } from '@hd/components';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useUser } from '@hd/context';
import { redirect } from 'next/navigation';
import { StarIcon } from '@heroicons/react/20/solid';

export const MembersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpenWithUser, setModalOpenWithUser] = useState<null | User>(null);
  const [error, setError] = useState('');

  const { user } = useUser();

  const rolesPermited =
    user?.role === SYSTEM_ROLES.ADMIN ||
    user?.role === SYSTEM_ROLES.SUPER_ADMIN ||
    user?.role === SYSTEM_ROLES.USER_MOD;

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(ROUTES.API.USERS);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.email} ${user.phone_number}`
      .toLowerCase()
      .includes(filter.toLowerCase()),
  );

  const headers = [{ label: 'Name' }, { label: 'Phone' }, { label: 'Email' }, { label: 'Role' }];

  const rows = filteredUsers.map((u) => ({
    columns: [
      <div
        key={u.user_id}
        className={`flex items-center ${user?.user_id !== u.user_id ? 'pl-6' : ''}`}
      >
        {user?.user_id === u.user_id && <StarIcon className="inline w-4 h-4 text-amber-500 mr-2" />}
        {u.first_name} {u.last_name}
      </div>,
      u.phone_number,
      u.email,
      getLabelByValue(u.role, SYSTEM_ROLES_SELECT_OPTIONS),
    ],
    handleRowClick: () =>
      user?.user_id !== u.user_id
        ? rolesPermited && setModalOpenWithUser(u)
        : redirect(ROUTES.CREW_EDIT_PROFILE),
  }));

  return (
    <>
      <FormMemberModal
        onClose={() => setModalOpenWithUser(null)}
        openWithUser={modalOpenWithUser}
        refreshUsers={fetchUsers}
      />
      <div className="w-full">
        <div className="pb-10 flex gap-4 items-center">
          <Input
            type="text"
            placeholder="Search by name, surname, email or phone..."
            onChange={(e) => setFilter(e.target.value)}
          />
          <IconButton
            disabled={!rolesPermited}
            onClick={() => setModalOpenWithUser({} as User)}
            tooltip="Add new user"
          >
            <UserPlusIcon className="w-10 h-10 text-amber-600" />
          </IconButton>
        </div>
        {loading ? (
          <ContentLoader />
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-white">No users found...</p>
        ) : (
          <Transition
            as={Fragment}
            appear={true}
            show={!loading}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="overflow-x-auto">
              <Table headers={headers} rows={rows} />
            </div>
          </Transition>
        )}
      </div>
    </>
  );
};
