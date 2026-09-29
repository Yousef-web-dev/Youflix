'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from './useAuth';

/**
 * Same shape as useAuth(), but redirects to /login once we know for sure
 * (isReady) that there's no session. Use this on any page that requires sign-in.
 */
export default function useRequireAuth() {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isReady && !auth.isAuthenticated) {
      router.replace('/login');
    }
  }, [auth.isReady, auth.isAuthenticated, router]);

  return auth;
}
