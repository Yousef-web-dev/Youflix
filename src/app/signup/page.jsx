import AuthLayout from '../../components/login/AuthLayout';
import SignupForm from '../../components/login/SignupForm';

export const metadata = {
  title: 'Create Your YouFlix Account',
  description: 'Create a YouFlix account to save movies and series to your personal list.',
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
