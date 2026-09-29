'use client';

import { useRouter } from 'next/navigation';
import useRequireAuth from '../../hooks/useRequireAuth';
import AccountShell from '../profile/AccountShell';

export default function AccountPage() {
  const router = useRouter();
  const { isReady, isAuthenticated, user, logout } = useRequireAuth();

  if (!isReady || !isAuthenticated) {
    return <div className="px-4 pt-28 text-center text-sm text-gray-400 sm:px-8">Loading…</div>;
  }

  function handleLogout() {
    logout();
    router.push('/login');
  }

  return (
    <AccountShell title="Account">
      <div className="space-y-5">
        <div>
          <p className="text-xs text-gray-500">Email</p>
          <p className="mt-1 text-sm text-white">{user?.email}</p>
        </div>

        <p className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-gray-400">
          Changing your email or password isn&apos;t available yet — there&apos;s no update-account API connected
          to YouFlix right now.
        </p>

        <div className="border-t border-white/10 pt-5">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Log Out
          </button>
        </div>
      </div>
    </AccountShell>
  );
}
