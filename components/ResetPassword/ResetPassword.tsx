'use client';

import { ROUTES } from '@hd/consts';
import { Button, Input, LinkText, Toast } from '@hd/ui';
import { useRef, useState } from 'react';

export const ResetPassword = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const email = emailRef.current?.value;
    if (!email) {
      setError('Please enter your email address.');
      setLoading(false);
      return;
    }

    try {
      // TODO: uncomment and fix after BE implementation

      // const response = await fetch(ROUTES.API.RESET_PASSWORD, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });

      // const data = await response.json();

      // if (!response.ok) {
      //   throw new Error(data.error || 'Failed to send reset link.');
      // }

      setMessage('If an account with that email exists, a reset link has been sent.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-xl border-zinc-100 rounded-lg overflow-hidden min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-zinc-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-zinc-200">
          Reset Your Password
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-300">
          {`Enter your email address below and we'll send you a link to reset your password.`}
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-5" onSubmit={handleReset}>
          <Input ref={emailRef} label="Email Address" placeholder="you@example.com" />
          {error && (
            <Toast type="error" handleToastClose={() => setError(null)}>
              {error}
            </Toast>
          )}
          {message && (
            <Toast type="success" handleToastClose={() => setMessage(null)}>
              {message}
            </Toast>
          )}
          <div>
            <Button type="submit" loading={loading} className="w-full mt-2 flex">
              Send Reset Link
            </Button>
          </div>
        </form>
        <p className="mt-10 text-center">
          <LinkText href={ROUTES.SIGN_IN}>Back to Sign in</LinkText>
        </p>
      </div>
    </div>
  );
};
