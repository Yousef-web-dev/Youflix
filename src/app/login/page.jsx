import { Suspense } from 'react';
import AuthLayout from '../../components/login/AuthLayout';
import LoginForm from '../../components/login/LoginForm';
import PageTransition from '@/components/PageTransition';

export const metadata = {
  title: 'YouFlix Login',
  description: 'Sign in to your YouFlix account to pick up where you left off.',
};

export default function LoginPage() {
  return (
    <PageTransition>
    <AuthLayout>
      {/* LoginForm reads ?registered=1 via useSearchParams, which needs a Suspense boundary. */}
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
    </PageTransition>
  );
}
