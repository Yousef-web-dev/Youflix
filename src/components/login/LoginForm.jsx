'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import { loginUser } from '../../hooks/authApi';
import { validateEmail, validatePasswordRequired } from '../../hooks/authValidation';
import AuthCard from './AuthCard';
import AuthInput from './AuthInput';
import PasswordInput from './PasswordInput';
import AuthMessage from './AuthMessage';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isReady, login } = useAuth();

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const justRegistered = searchParams.get('registered') === '1';
  const busy = status !== 'idle';

  // Already signed in? Skip the login screen.
  useEffect(() => {
    if (isReady && isAuthenticated && status === 'idle') router.replace('/');
  }, [isReady, isAuthenticated, status, router]);

  function handleChange(field) {
    return (event) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: '' }));
      setFormError('');
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;

    const nextErrors = {
      email: validateEmail(values.email),
      password: validatePasswordRequired(values.password),
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    setFormError('');
    setStatus('submitting');

    const result = await loginUser({ email: values.email.trim(), password: values.password });

    if (!result.ok) {
      setFormError(result.message);
      setErrors({ email: result.fieldErrors?.email || '', password: result.fieldErrors?.password || '' });
      setStatus('idle');
      return;
    }

    const saved = login({ token: result.token, user: result.user });
    if (!saved) {
      setFormError('We could not save your session because browser storage is unavailable.');
      setStatus('idle');
      return;
    }

    setStatus('success');
    setValues({ email: '', password: '' });
    router.replace('/');
  }

  return (
    <AuthCard title="Welcome Back" subtitle="Sign in to continue to YouFlix.">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {status === 'success' ? (
          <AuthMessage type="success">Welcome back!</AuthMessage>
        ) : (
          <>
            {justRegistered && !formError && (
              <AuthMessage type="success">Account created successfully. Please sign in.</AuthMessage>
            )}
            <AuthMessage type="error">{formError}</AuthMessage>
          </>
        )}

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
          autoComplete="current-password"
          disabled={busy}
          placeholder="Enter your password"
        />

        <motion.button
          type="submit"
          disabled={busy}
          whileTap={busy ? undefined : { scale: 0.98 }}
          className="w-full rounded-lg bg-[#E50914] px-4 py-3 text-sm font-semibold text-white transition-colors  hover:bg-red-950 duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'submitting' ? 'Signing in...' : status === 'success' ? 'Welcome back!' : 'Sign In'}
        </motion.button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="rounded font-semibold text-white underline-offset-4 transition-colors hover:text-[#E50914] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          Create Account
        </Link>
      </p>
    </AuthCard>
  );
}
