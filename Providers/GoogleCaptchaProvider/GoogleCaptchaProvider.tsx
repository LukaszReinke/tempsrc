'use client';
import { GoogleReCaptchaProvider } from '@google-recaptcha/react';
import React from 'react';

export const GoogleCaptchaProvider = ({ children }: { children: React.ReactNode }) => {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY as string;

  return recaptchaKey ? (
    <GoogleReCaptchaProvider siteKey={recaptchaKey} type="v3">
      {children}
    </GoogleReCaptchaProvider>
  ) : (
    children
  );
};
