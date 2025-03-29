'use client';

import { ROUTES } from '@hd/consts';
import { useUser } from '@hd/context';
import { Button, Input, LinkText, Toast } from '@hd/ui';
import { useRef, useState } from 'react';

type LoginProps = {
  error?: null | string;
};

export const Login = (props: LoginProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(props.error ? props.error : null);
  const { login } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    try {
      const response = await fetch(ROUTES.API.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Login failed');

      login(data.user);

      window.location.href = ROUTES.CREW_DASHBOARD;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    }
    setLoading(false);
  };

  return (
    <div className="flex max-w-xl border-zinc-100 rounded-lg overflow-hidden min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-zinc-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-zinc-200">
          Sign in
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-5" onSubmit={handleLogin}>
          <Input ref={emailRef} label="Email" placeholder="Email address" />
          <Input
            ref={passwordRef}
            label="Password"
            type="password"
            placeholder="Account password"
          />

          {error && (
            <Toast type="error" handleToastClose={() => setError(null)}>
              {error}
            </Toast>
          )}
          <div>
            <Button type="submit" loading={loading} className="w-full mt-2 flex">
              Sign in
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center">
          <LinkText href={ROUTES.RESET_PASSWORD}>Forgot your password?</LinkText>
        </p>
        <p className="mt-4 text-center">
          <LinkText href={ROUTES.HOME}>
            Not a Highly Driven Team member? Go back to homepage
          </LinkText>
        </p>
      </div>
    </div>
  );
};
