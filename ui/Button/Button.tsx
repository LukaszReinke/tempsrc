import { ButtonProps as HDButtonProps, Button as HUButton } from '@headlessui/react';
import { BasicSize, BasicVariant } from '@hd/types';
import { Spinner } from '../Loaders';
import { ReactNode } from 'react';

export type ButtonProps = {
  size?: BasicSize;
  children?: ReactNode;
  variant?: BasicVariant;
  isCustom?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
} & HDButtonProps;

export const Button = (props: ButtonProps) => {
  const { loading, ...buttonProps } = props;

  const getSize = (): string => {
    switch (props.size) {
      case 'sm':
        return 'text-sm py-2 px-4';
      case 'md':
        return 'text-md py-2.5 px-5';
      case 'lg':
        return 'text-lg py-3 px-6';
      default:
        return 'text-md py-2.5 px-5';
    }
  };

  const getVariant = (): string => {
    switch (props.variant) {
      case 'primary':
        return 'bg-amber-500/75';
      case 'secondary':
        return 'bg-zinc-700';
      case 'danger':
        return 'bg-rose-600/75';
      default:
        return 'bg-amber-500/75';
    }
  };

  const disabledStyles = 'opacity-70 hover:opacity-70 cursor-not-allowed';

  return (
    <HUButton
      {...buttonProps}
      disabled={loading}
      className={`rounded-lg hover:opacity-85 flex justify-center ${props?.fullWidth ? 'w-full' : ''} ${
        !props.isCustom ? 'text-white shadow-lg' : ''
      } ${!props.isCustom ? getSize() : ''} ${
        !props.isCustom ? getVariant() : ''
      } ${props.disabled || loading ? disabledStyles : ''} ${props?.className}`}
    >
      <div className="flex items-center">
        {props.children}
        {loading && <Spinner />}
      </div>
    </HUButton>
  );
};
