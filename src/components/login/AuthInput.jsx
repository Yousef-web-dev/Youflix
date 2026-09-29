'use client';

import { useId } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function AuthInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  autoComplete,
  disabled,
  rightSlot,
  ...rest
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-200">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`w-full rounded-lg border bg-white/5 px-3.5 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/40 disabled:opacity-60 ${
            error ? 'border-red-500/70' : 'border-white/15'
          } ${rightSlot ? 'pr-11' : ''}`}
          {...rest}
        />
        {rightSlot && <div className="absolute inset-y-0 right-1.5 flex items-center">{rightSlot}</div>}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            initial={reduceMotion ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-red-300"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
