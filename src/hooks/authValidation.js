const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value) {
  const email = value.trim();
  if (!email) return 'Email is required.';
  if (!EMAIL_PATTERN.test(email)) return 'Enter a valid email address.';
  return '';
}

// Login only requires a value — the backend decides whether it's correct.
export function validatePasswordRequired(value) {
  return value ? '' : 'Password is required.';
}

export function validateName(value, label) {
  const name = value.trim();
  if (!name) return `${label} is required.`;
  if (name.length < 2) return `${label} must be at least 2 characters.`;
  if (name.length > 50) return `${label} must be 50 characters or fewer.`;
  return '';
}

export function validateConfirmPassword(password, confirmation) {
  if (!confirmation) return 'Please confirm your password.';
  if (password !== confirmation) return 'Passwords do not match.';
  return '';
}

// Frontend-only hint. It does not claim the backend will accept or reject a password.
export function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) return { level: 1, label: 'Weak' };
  if (score === 3) return { level: 2, label: 'Medium' };
  return { level: 3, label: 'Strong' };
}
