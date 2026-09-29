// AuthMessage.jsx
'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AuthMessage({ type = 'error', children }) {
  const reduceMotion = useReducedMotion();
  const isError = type === 'error';
  const Icon = isError ? AlertCircle : CheckCircle2;

  return (
    <AnimatePresence>
      {children && (
        <motion.div
          key={String(children)}
          role={isError ? 'alert' : 'status'}
          initial={reduceMotion ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`flex w-full items-start gap-2.5 rounded-xl border px-3.5 py-3 text-xs sm:text-sm leading-snug ${
            isError
              ? 'border-red-500/30 bg-red-500/10 text-red-200'
              : 'border-green-500/30 bg-green-500/10 text-green-200'
          }`}
        >
          <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="min-w-0 flex-1 break-words overflow-wrap-anywhere">{children}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}