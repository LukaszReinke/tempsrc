'use client';

import { ROUTES } from '@hd/consts';
import { SYSTEM_ROLES, SYSTEM_ROLES_SELECT_OPTIONS } from '@hd/consts';
import { useUser } from '@hd/context';
import { User } from '@hd/types';
import { Input, Modal, Select, SelectOption, Tooltip } from '@hd/ui';
import { getLabelByValue } from '@hd/utils';
import { useCallback, useMemo, useRef, useState } from 'react';

type MemberModalFormProps = {
  openWithUser: null | User;
  onClose: () => void;
  refreshUsers: () => void;
};

export const FormMemberModal = ({ openWithUser, onClose, refreshUsers }: MemberModalFormProps) => {
  // TODO: implement this with react toastify instead of state
  const [error, setError] = useState<string | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { user } = useUser();

  const permittedOptions = useMemo(() => {
    if (user?.role === SYSTEM_ROLES.SUPER_ADMIN) {
      return SYSTEM_ROLES_SELECT_OPTIONS;
    } else if (user?.role === SYSTEM_ROLES.ADMIN) {
      return SYSTEM_ROLES_SELECT_OPTIONS.filter(
        (option) => option.value !== SYSTEM_ROLES.SUPER_ADMIN,
      );
    } else if (user?.role === SYSTEM_ROLES.USER_MOD) {
      return SYSTEM_ROLES_SELECT_OPTIONS.filter(
        (option) =>
          option.value === SYSTEM_ROLES.USER_MOD || option.value === SYSTEM_ROLES.EVENT_MOD,
      );
    }
    return [];
  }, [user?.role]);

  const disabledByPermission = useMemo(() => {
    return !permittedOptions.some((option) => option.value === openWithUser?.role);
  }, [openWithUser?.role, permittedOptions]);

  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<{ getValue: () => SelectOption | null }>(null);

  const handleSave = useCallback(async () => {
    const first_name = nameRef.current?.value.trim();
    const last_name = surnameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const role = roleRef.current?.getValue()?.value;
    const phone_number = phoneNumberRef.current?.value.trim();

    if (!first_name || !last_name || !email || !role) {
      setError('Please fill out all required fields.');
      return;
    }

    const errMessage = 'Saving user data failed';

    try {
      let response;
      const requestParams = {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, first_name, last_name, role, phone_number }),
      };

      if (openWithUser?.user_id) {
        response = await fetch(ROUTES.API.GET_USER(openWithUser?.user_id as string), {
          ...requestParams,
          method: 'PUT',
        });
      } else {
        response = await fetch(ROUTES.API.USERS, {
          ...requestParams,
          method: 'POST',
        });
      }

      if (response && !response.ok) {
        throw new Error(errMessage);
      }

      // TODO: after implementing toast  enabled
      refreshUsers();
    } catch (error) {
      setError(error instanceof Error ? error.message : errMessage);
    } finally {
      onClose();
      setIsConfirmationOpen(false);
    }
  }, [onClose, openWithUser, refreshUsers]);

  const handleUserDeletion = useCallback(async () => {
    const errMessage = 'Failed to delete the user';

    try {
      const response = await fetch(ROUTES.API.GET_USER(openWithUser?.user_id as string), {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(errMessage);
      }

      refreshUsers();
    } catch (error) {
      setError(error instanceof Error ? error.message : errMessage);
    } finally {
      onClose();
      setIsConfirmationOpen(false);
    }
  }, [onClose, openWithUser?.user_id, refreshUsers]);

  return (
    <>
      <Modal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        title="Confirm deletion"
        buttons={[
          {
            label: 'Cancel',
            onClick: () => setIsConfirmationOpen(false),
            variant: 'secondary',
          },
          {
            label: 'Yes, confirm',
            onClick: handleUserDeletion,
            variant: 'danger',
          },
        ]}
      >
        <h5>
          Are you sure to remove
          <Tooltip content={openWithUser?.email}>
            <span className="font-bold text-rose-500 px-2">
              {openWithUser?.first_name} {openWithUser?.last_name}
            </span>
          </Tooltip>
          Higly Driven Account?
        </h5>
      </Modal>

      <Modal
        isOpen={!!openWithUser}
        onClose={onClose}
        title={openWithUser?.user_id ? 'Update User Data' : 'Add New User'}
        buttons={[
          {
            label: 'Delete',
            onClick: () => setIsConfirmationOpen(true),
            variant: 'danger',
            className: `${openWithUser?.user_id ? '' : 'hidden'}`,
          },
          {
            label: 'Cancel',
            onClick: onClose,
            variant: 'secondary',
            className: 'justify-self-end',
          },
          {
            label: 'Save',
            onClick: handleSave,
            variant: 'primary',
          },
        ]}
      >
        {isConfirmationOpen ? null : (
          <div className="space-y-4">
            <Input ref={nameRef} required label="Name" defaultValue={openWithUser?.first_name} />

            <Input
              ref={surnameRef}
              required
              label="Surname"
              defaultValue={openWithUser?.last_name}
            />

            <Select
              ref={roleRef}
              required
              label="System role"
              disabled={openWithUser?.user_id ? disabledByPermission : false}
              defaultSelected={
                openWithUser?.role
                  ? {
                      value: openWithUser?.role,
                      label: getLabelByValue(openWithUser.role, SYSTEM_ROLES_SELECT_OPTIONS),
                    }
                  : { value: '', label: '' }
              }
              options={permittedOptions}
            />

            <Input
              ref={emailRef}
              required
              disabled={openWithUser?.user_id ? disabledByPermission : false}
              type="email"
              label="Email"
              defaultValue={openWithUser?.email}
            />

            <Input
              ref={phoneNumberRef}
              label="Phone number"
              defaultValue={openWithUser?.phone_number}
            />
          </div>
        )}
      </Modal>
    </>
  );
};
