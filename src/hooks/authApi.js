// API layer for the real YouFlix auth endpoints. No UI logic in here.

const AUTH_API_BASE = 'https://bookstore.eraasoft.pro/api';

const NETWORK_ERROR = 'Network error. Check your connection and try again.';
const UNEXPECTED_RESPONSE = 'Unexpected response from the server. Please try again.';

// Walks the different shapes an API may use for `errors`:
// "text" | ["text"] | { field: ["text"] } | { field: "text" }
function collectErrors(errors) {
  const fieldErrors = {};
  const general = [];

  if (!errors) return { fieldErrors, general };

  if (typeof errors === 'string') {
    general.push(errors);
  } else if (Array.isArray(errors)) {
    errors.forEach((entry) => {
      if (typeof entry === 'string') {
        general.push(entry);
      } else if (entry && typeof entry === 'object') {
        const nested = collectErrors(entry);
        Object.assign(fieldErrors, nested.fieldErrors);
        general.push(...nested.general);
      }
    });
  } else if (typeof errors === 'object') {
    Object.entries(errors).forEach(([field, value]) => {
      const message = Array.isArray(value) ? value.find((v) => typeof v === 'string') : value;
      if (typeof message === 'string' && message) fieldErrors[field] = message;
    });
  }

  return { fieldErrors, general };
}

function fallbackMessage(status) {
  if (status === 401 || status === 403) return 'Invalid email or password.';
  if (status === 422) return 'Please check the highlighted fields.';
  if (status >= 500) return 'Something went wrong on our side. Please try again later.';
  return 'Something went wrong. Please try again.';
}

/** Turns any API error body into { message, fieldErrors } — safe for the UI. */
export function parseApiError(body, status) {
  const { fieldErrors, general } = collectErrors(body?.errors);
  const hasFieldErrors = Object.keys(fieldErrors).length > 0;
  const serverMessage = typeof body?.message === 'string' && body.message.trim() ? body.message.trim() : '';

  let message = general[0] || '';
  if (!message && hasFieldErrors) message = 'Please fix the highlighted fields.';
  if (!message) message = serverMessage || fallbackMessage(status);

  return { message, fieldErrors };
}

export function getApiErrorMessage(body, status) {
  return parseApiError(body, status).message;
}

async function postForm(path, fields) {
  // FormData without a manual Content-Type: the browser adds the multipart boundary.
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => formData.append(key, value));

  let res;
  try {
    res = await fetch(`${AUTH_API_BASE}${path}`, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });
  } catch {
    return { ok: false, message: NETWORK_ERROR, fieldErrors: {} };
  }

  const body = await res.json().catch(() => null);
  const statusCode = typeof body?.statusCode === 'number' ? body.statusCode : res.status;

  if (!res.ok || statusCode >= 400) {
    return { ok: false, ...parseApiError(body, statusCode) };
  }
  if (!body) {
    return { ok: false, message: UNEXPECTED_RESPONSE, fieldErrors: {} };
  }

  return { ok: true, body };
}

export async function loginUser({ email, password }) {
  const result = await postForm('/login', { email, password });
  if (!result.ok) return result;

  const token = result.body?.data?.token;
  const user = result.body?.data?.user;
  if (!token || !user) {
    return { ok: false, message: UNEXPECTED_RESPONSE, fieldErrors: {} };
  }

  return { ok: true, token, user, message: result.body.message || '' };
}

export async function registerUser({ first_name, last_name, email, password, password_confirmation }) {
  const result = await postForm('/register', {
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
  });
  if (!result.ok) return result;

  // The register endpoint returns no token, so this never creates a session.
  return { ok: true, message: result.body.message || '' };
}
