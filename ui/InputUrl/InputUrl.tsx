'use client';

import { useState, useEffect, Ref, ChangeEvent } from 'react';
import { Input, InputProps } from '../Input';
import { LinkIcon } from '@heroicons/react/24/outline';

export type InputUrlProps = Omit<InputProps, 'icon' | 'type'> & {
  ref?: Ref<HTMLInputElement>;
  onUrlChange?: (isValid: boolean, url: string) => void;
};

export const InputUrl = (props: InputUrlProps) => {
  const [value, setValue] = useState<string>(props.defaultValue?.toString() || '');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // URL validation regex
  const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

  const validateUrl = (url: string): boolean => {
    if (!url.trim()) {
      // Empty is ok unless required
      setErrorMsg(props.required ? 'URL is required' : '');
      return !props.required;
    }

    if (!urlRegex.test(url)) {
      setErrorMsg('Please enter a valid URL');
      return false;
    }

    setErrorMsg('');
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    const valid = validateUrl(newValue);
    setIsValid(valid);
    
    // Call original onChange if provided
    if (props.onChange) {
      props.onChange(e);
    }
    
    // Call URL-specific callback if provided
    if (props.onUrlChange) {
      props.onUrlChange(valid, newValue);
    }
  };

  // Validate initial value if provided
  useEffect(() => {
    if (props.defaultValue) {
      const valid = validateUrl(props.defaultValue.toString());
      setIsValid(valid);
    }
  }, [props.defaultValue]);

  return (
    <Input
      {...props}
      type="url"
      icon={<LinkIcon className="w-5 h-5" />}
      value={value}
      onChange={handleChange}
      errorMessage={errorMsg || props.errorMessage}
      className={`${props.className || ''} ${!isValid && value ? 'border-2 border-amber-500' : ''}`}
    />
  );
};