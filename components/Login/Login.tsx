'use client';
import { ROUTES } from '@hd/consts';
import { useUser } from '@hd/context';
import { Button, Input, LinkText } from '@hd/ui';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useGoogleReCaptcha } from '@google-recaptcha/react';

export const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const { executeV3 } = useGoogleReCaptcha();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast.error(`Both fields marked with '*' are required`);
      return;
    }

    if (!executeV3) {
      console.log('not available to execute recaptcha');
      return;
    }
    const gRecaptchaToken = await executeV3('login');

    const captcha_response = await fetch('/api/recaptchaSubmit', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gRecaptchaToken,
      }),
    });

    const data = await captcha_response.json();

    if (data?.success !== true) {
      toast.error('Failed to verify recaptcha! You must be a robot!');
      return;
    }

    setLoading(true);

    try {
      await toast.promise(
        (async () => {
          const response = await fetch(ROUTES.API.LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) throw new Error(data.error || 'Login failed');

          login(data.user);
          window.location.href = ROUTES.CREW_DASHBOARD;
        })(),
        {
          pending: 'Signing in...',
          success: 'Login successful! Redirecting...',
          error: 'Login failed. Please check your credentials.',
        },
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
          <Input ref={emailRef} required label="Email" placeholder="Email address" />
          <Input
            required
            ref={passwordRef}
            label="Password"
            type="password"
            placeholder="Account password"
          />

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
