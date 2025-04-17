import { cookies } from 'next/headers';
import { ACCESS_TOKEN_KEY } from '@hd/consts';

export const authRequired = true;

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface ApiClientOptions extends RequestInit {
  authRequired?: boolean;
}

export const apiClient = async (endpoint: string, options: ApiClientOptions = {}) => {
  const isServer = typeof window === 'undefined';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (options.authRequired) {
    let accessToken: string | undefined;

    if (isServer) {
      const cookieStore = await cookies();
      accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
    }

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      throw new Error('Authorization token is missing.');
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};
