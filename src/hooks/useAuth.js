'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  AUTH_CHANGE_EVENT,
  clearAuthSession,
  getAuthToken,
  getCurrentUser,
  isAuthenticated,
  setAuthSession,
} from '../hooks/auth';

/**
 * Reactive view of the auth session. The token itself is deliberately not held
 * in React state — use getToken() when an API call needs it.
 * `isReady` is false until the client has read storage, so pages can avoid
 * flashing a signed-out state (and avoid hydration mismatches).
 */
export default function useAuth() {
  const [state, setState] = useState({ user: null, authenticated: false, ready: false });

  useEffect(() => {
    function sync() {
      setState({ user: getCurrentUser(), authenticated: isAuthenticated(), ready: true });
    }
    sync();
    window.addEventListener(AUTH_CHANGE_EVENT, sync);
    window.addEventListener('storage', sync); // other tabs
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const login = useCallback((session) => setAuthSession(session), []);
  const logout = useCallback(() => clearAuthSession(), []);

  return {
    user: state.user,
    isAuthenticated: state.authenticated,
    isReady: state.ready,
    getToken: getAuthToken,
    login,
    logout,
  };
}
