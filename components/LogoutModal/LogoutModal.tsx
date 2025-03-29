import { useUser } from '@hd/context';
import { Modal, ModalProps } from '@hd/ui';

export const LogoutModal = (props: Omit<ModalProps, 'title'>) => {
  const { logout } = useUser();

  return (
    <Modal
      {...props}
      minSize
      title="Log out"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttons={[
        {
          label: 'Close',
          onClick: props.onClose,
          variant: 'secondary',
        },
        {
          label: 'Log out',
          onClick: logout,
          variant: 'danger',
        },
      ]}
    />
  );
};
