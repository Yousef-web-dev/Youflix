'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import AuthInput from './AuthInput';
import { getPasswordStrength } from '../../hooks/authValidation';

function PasswordStrength({ password }) {
  const { level, label } = getPasswordStrength(password);
  const bar = ['bg-red-500', 'bg-yellow-400', 'bg-green-500'][level - 1];

  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((segment) => (
          <span
            key={segment}
            className={`h-1 flex-1 rounded-full transition-colors ${segment <= level ? bar : 'bg-white/10'}`}
          />
        ))}
      </div>
      <p className="mt-1 text-xs text-gray-400">Password strength: {label}</p>
    </div>
  );
}

export default function PasswordInput({ showStrength = false, value, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <AuthInput
        {...props}
        value={value}
        type={visible ? 'text' : 'password'}
        rightSlot={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
            className="flex h-8 w-8 items-center justify-center rounded text-gray-400 transition-colors hover:text-red-500 duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />
      {showStrength && value && <PasswordStrength password={value} />}
    </div>
  );
}
