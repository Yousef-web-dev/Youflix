'use client';

import useRequireAuth from '../../hooks/useRequireAuth';
import AccountShell from '../profile/AccountShell';

export default function ProfilePage() {
  const { isReady, isAuthenticated, user } = useRequireAuth();

  if (!isReady || !isAuthenticated) {
    return <div className="px-4 pt-28 text-center text-sm text-gray-400 sm:px-8">Loading…</div>;
  }

  const initials = `${user?.first_name?.[0] || ''}${user?.last_name?.[0] || ''}`.toUpperCase() || 'U';
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })
    : null;

  return (
    <AccountShell title="Profile">
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E50914] text-xl font-bold text-white">
          {initials}
        </span>
        <div>
          <p className="text-lg font-semibold text-white">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>
      </div>

      {memberSince && <p className="mt-6 text-sm text-gray-500">Member since {memberSince}</p>}

      <p className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-gray-400">
        Profile editing isn&apos;t available yet — this page currently shows the information from your account.
      </p>
    </AccountShell>
  );
}
