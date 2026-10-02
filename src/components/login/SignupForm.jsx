'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { registerUser } from '../../hooks/authApi';
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePasswordRequired,
} from '../../hooks/authValidation';
import AuthCard from './AuthCard';
import AuthInput from './AuthInput';
import PasswordInput from './PasswordInput';
import AuthMessage from './AuthMessage';

const EMPTY = { first_name: '', last_name: '', email: '', password: '', password_confirmation: '' };

export default function SignupForm() {
  const router = useRouter();
  const { isAuthenticated, isReady } = useAuth();

  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const busy = status === 'submitting';

  useEffect(() => {
    if (isReady && isAuthenticated && status === 'idle') router.replace('/');
  }, [isReady, isAuthenticated, status, router]);

  // Registration returns no token, so after success we send the user to sign in.
  useEffect(() => {
    if (status !== 'success') return undefined;
    const timer = setTimeout(() => router.push('/login?registered=1'), 1600);
    return () => clearTimeout(timer);
  }, [status, router]);

  function handleChange(field) {
    return (event) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: '' }));
      setFormError('');
    };
  }

  function validateAll() {
    return {
      first_name: validateName(values.first_name, 'First name'),
      last_name: validateName(values.last_name, 'Last name'),
      email: validateEmail(values.email),
      password: validatePasswordRequired(values.password),
      password_confirmation: validateConfirmPassword(values.password, values.password_confirmation),
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status !== 'idle') return;

    const nextErrors = validateAll();
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setFormError('');
    setStatus('submitting');

    const result = await registerUser({
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      email: values.email.trim(),
      password: values.password,
      password_confirmation: values.password_confirmation,
    });

    if (!result.ok) {
const errorMsg = result.message?.includes('1062') || result.message?.includes('unique')
        ? "This email is already in use; please log in or use another email"
        : (result.message || "This email is already in use; please log in or use another email");
        
      setFormError(errorMsg);
      setErrors({
        first_name: result.fieldErrors?.first_name || '',
        last_name: result.fieldErrors?.last_name || '',
        email: result.fieldErrors?.email || '',
        password: result.fieldErrors?.password || '',
        password_confirmation: result.fieldErrors?.password_confirmation || '',
      });
      setStatus('idle');
      return;
    }

    setValues(EMPTY); // don't keep passwords in memory longer than needed
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <AuthCard title="Account created successfully.">
        <div className="flex flex-col items-center gap-3 py-2 text-center">
          <CheckCircle2 className="h-10 w-10 text-green-400" aria-hidden="true" />
          <p role="status" className="text-sm text-gray-300">
            Your YouFlix account is ready. Taking you to sign in...
          </p>
          <Link
            href="/login?registered=1"
            className="mt-2 rounded-lg bg-[#E50914] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#f6121d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Continue to Sign In
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create Your YouFlix Account"
      subtitle="Join YouFlix and start building your personal movie and series experience."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <AuthMessage type="error">{formError}</AuthMessage>

        <div className="grid gap-4 sm:grid-cols-2">
          <AuthInput
            label="First Name"
            name="first_name"
            value={values.first_name}
            onChange={handleChange('first_name')}
            error={errors.first_name}
            autoComplete="given-name"
            disabled={busy}
          />
          <AuthInput
            label="Last Name"
            name="last_name"
            value={values.last_name}
            onChange={handleChange('last_name')}
            error={errors.last_name}
            autoComplete="family-name"
            disabled={busy}
          />
        </div>

        <AuthInput
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          error={errors.email}
          autoComplete="email"
          disabled={busy}
          placeholder="you@example.com"
        />

        <PasswordInput
          label="Password"
          name="password"
          value={values.password}
          onChange={handleChange('password')}
          error={errors.password}
          autoComplete="new-password"
          disabled={busy}
          showStrength
        />

        <PasswordInput
          label="Confirm Password"
          name="password_confirmation"
          value={values.password_confirmation}
          onChange={handleChange('password_confirmation')}
          error={errors.password_confirmation}
          autoComplete="new-password"
          disabled={busy}
        />

        <motion.button
          type="submit"
          disabled={busy}
          whileTap={busy ? undefined : { scale: 0.98 }}
          className="w-full rounded-lg bg-[#E50914] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#f6121d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {busy ? 'Creating account...' : 'Create Account'}
        </motion.button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{' '}
        <Link
          href="/login"
          className="rounded font-semibold text-white underline-offset-4 transition-colors hover:text-[#E50914] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          Sign In
        </Link>
      </p>
    </AuthCard>
  );
}
