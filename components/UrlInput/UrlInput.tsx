'use client';

import { Input, InputProps } from '@hd/ui';
import { URL_REGEX } from '@hd/consts';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { useCallback, useState } from 'react';

type UrlInputProps = {
  customRegex?: RegExp;
  customErrorMessage?: string;
};

const VALIDATE_ERROR_MSG =
  'Invalid URL. Please check the link and try again. If you’re sure the URL is correct, contact us for assistance.';

export const UrlInput = (props: InputProps & UrlInputProps) => {
  const regExpToValidate = props.customRegex ? props.customRegex : URL_REGEX;
  const messageToDisplay = props.customErrorMessage ? props.customErrorMessage : VALIDATE_ERROR_MSG;

  const [error, setError] = useState('');

  const handleBlur = useCallback(() => {
    let inputValue: string | undefined;

    if (props.ref && typeof props.ref === 'object' && 'current' in props.ref) {
      inputValue = props.ref.current?.value;
    }

    if (inputValue && !regExpToValidate.test(inputValue)) {
      if (
        props.ref &&
        typeof props.ref === 'object' &&
        'current' in props.ref &&
        props.ref.current
      ) {
        props.ref.current.value = '';
      }
      setError(messageToDisplay);
    } else {
      setError('');
    }
  }, [messageToDisplay, props.ref, regExpToValidate]);

  return (
    <Input
      {...props}
      onBlur={handleBlur}
      errorMessage={error}
      icon={props.icon ? props.icon : <GlobeAltIcon className="w-5 h-5" />}
      style={{ paddingLeft: '2.5rem' }}
    />
  );
};
