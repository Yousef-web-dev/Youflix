// Centralized session handling. Nothing else in the app should touch
// localStorage for auth — always go through these functions.
//
// NOTE: the browser talks directly to the external API (no backend/BFF), so the
// token lives in localStorage and is readable by any script on the page. That is
// the practical limit of this architecture; an HttpOnly cookie set by a server
// route would be the safer upgrade later.

const TOKEN_KEY = 'youflix-auth-token';
const USER_KEY = 'youflix-auth-user';
export const AUTH_CHANGE_EVENT = 'youflix-auth-changed';

function hasWindow() {
  return typeof window !== 'undefined';
}

function notify() {
  if (hasWindow()) window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

// Keep only what the UI needs — never store extra fields from the API response.
function pickUser(user) {
  return {
    id: user?.id ?? null,
    first_name: user?.first_name ?? '',
    last_name: user?.last_name ?? '',
    email: user?.email ?? '',
    image: user?.image ?? null,
  };
}

/** Returns true if the session was saved, false if browser storage is unavailable. */
export function setAuthSession({ token, user }) {
  if (!hasWindow() || !token || !user) return false;
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(pickUser(user)));
  } catch {
    return false;
  }
  notify();
  return true;
}

export function getAuthToken() {
  if (!hasWindow()) return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getCurrentUser() {
  if (!hasWindow()) return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}

/** Ready for a future Logout API call: call the API first, then this. */
export function clearAuthSession() {
  if (!hasWindow()) return;
  try {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  } catch {
    // Nothing to clear if storage is unavailable.
  }
  notify();
}
