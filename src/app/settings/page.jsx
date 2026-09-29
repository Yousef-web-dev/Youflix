'use client';

import { useRouter } from 'next/navigation';
import useRequireAuth from '../../hooks/useRequireAuth';
import AccountShell from '../profile/AccountShell';

export default function SettingsPage() {
  const router = useRouter();
  const { isReady, isAuthenticated, logout } = useRequireAuth();

  if (!isReady || !isAuthenticated) {
    return <div className="px-4 pt-28 text-center text-sm text-gray-400 sm:px-8">Loading…</div>;
  }

  function handleLogout() {
    logout();
    router.push('/login');
  }

  return (
    <AccountShell title="Settings">
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-white">Appearance</p>
          <p className="mt-1 text-sm text-gray-400">YouFlix currently uses a single dark cinematic theme.</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Motion</p>
          <p className="mt-1 text-sm text-gray-400">
            Animations automatically reduce if your system&apos;s &quot;Reduce Motion&quot; setting is turned on.
          </p>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-sm font-semibold text-white">Session</p>
          <p className="mt-1 text-sm text-gray-400">Sign out of YouFlix on this device.</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Log Out
          </button>
        </div>
      </div>
    </AccountShell>
  );
}
