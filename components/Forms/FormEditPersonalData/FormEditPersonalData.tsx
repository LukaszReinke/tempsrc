'use client';

import { ROUTES } from '@hd/consts';
import { User } from '@hd/types';
import { Input, Button, ContentLoader, Modal } from '@hd/ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export const FormEditPersonalData = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordConfirmationRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(ROUTES.API.PROFILE);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error loading your profile. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const resetForm = useCallback(() => {
    if (newPasswordRef.current) newPasswordRef.current.value = '';
    if (newPasswordConfirmationRef.current) newPasswordConfirmationRef.current.value = '';
    if (currentPasswordRef.current) currentPasswordRef.current.value = '';
  }, []);

  const handlePersonalDataUpdate = async () => {
    const first_name = nameRef.current?.value.trim();
    const last_name = surnameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const phone_number = phoneNumberRef.current?.value.trim();
    const current_password = currentPasswordRef.current?.value;
    const new_password = newPasswordRef.current?.value;
    const new_password_confirmation = newPasswordConfirmationRef.current?.value;

    if (!first_name || !last_name || !email || !current_password) {
      toast.error('Please fill out all required fields.');
      return;
    }

    if (new_password && new_password !== new_password_confirmation) {
      toast.error(`Passwords do not match.`);
      setIsConfirmationOpen(false);
      if (newPasswordRef.current) newPasswordRef.current.value = '';
      if (newPasswordConfirmationRef.current) newPasswordConfirmationRef.current.value = '';
      return;
    }

    const payload = {
      email,
      first_name,
      last_name,
      phone_number,
      password: current_password,
      new_password: new_password || undefined,
    };

    try {
      await toast.promise(
        (async () => {
          const response = await fetch(ROUTES.API.PROFILE, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error('Failed to update profile.');
          }

          const updatedUserData = await response.json();
          setUserData(updatedUserData);
        })(),
        {
          pending: 'Updating profile...',
          success: 'Your profile has been updated!',
          error: 'Failed to update profile.',
        },
      );

      resetForm();
    } catch (error) {
      console.error('Error updating personal data:', error);
    } finally {
      setIsConfirmationOpen(false);
    }
  };

  return loading ? (
    <ContentLoader />
  ) : (
    <>
      <Modal
        minSize
        title="Confirmation"
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      >
        <div className="space-y-6">
          <h3 className="pb-2 md:pb-4">
            To update your profile there is one last step required - provide your current password
          </h3>
          <Input required ref={currentPasswordRef} type="password" label="Current password" />
          <Button onClick={() => handlePersonalDataUpdate()} fullWidth>
            Confirm
          </Button>
        </div>
      </Modal>

      <form className="w-[500px]" autoComplete="off">
        <div className="space-y-4 max-w-[500px]">
          <h5 className="text-2xl pb-2 md:pb-4">Set up new password:</h5>
          <Input
            ref={newPasswordRef}
            type="password"
            label="New password"
            autoComplete="new-password"
          />
          <Input
            ref={newPasswordConfirmationRef}
            type="password"
            label="Confirm new password"
            autoComplete="new-password"
          />

          <h5 className="text-2xl pb-2 md:pb-4 pt-6 md:pt-8">Edit personal data:</h5>
          <Input required ref={nameRef} label="Name" defaultValue={userData?.first_name} />

          <Input required ref={surnameRef} label="Surname" defaultValue={userData?.last_name} />

          <Input
            required
            ref={emailRef}
            type="email"
            label="Email"
            defaultValue={userData?.email}
          />

          <Input ref={phoneNumberRef} label="Phone number" defaultValue={userData?.phone_number} />

          <Button onClick={() => setIsConfirmationOpen(true)} className="w-full mt-6 flex">
            Submit changes
          </Button>
        </div>
      </form>
    </>
  );
};
