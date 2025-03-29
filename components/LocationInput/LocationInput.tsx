'use client';

import { InputProps } from '@hd/ui';
import { GOOGLE_MAP_REGEX } from '@hd/consts';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { UrlInput } from '@hd/components';

type LocationInputProps = {
  customRegex?: RegExp;
};

const MAP_URL_ERROR = 'Invalid URL. Please enter a valid Google Maps link.';

export const LocationInput = (props: InputProps & LocationInputProps) => (
  <UrlInput
    {...props}
    customRegex={GOOGLE_MAP_REGEX}
    customErrorMessage={MAP_URL_ERROR}
    icon={<MapPinIcon className="w-5 h-5" />}
    placeholder="Paste Google Maps link"
  />
);
