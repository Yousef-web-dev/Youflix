'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

// Icon + text (never color alone) so the state is clear to everyone.
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
          className={`flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm ${
            isError
              ? 'border-red-500/40 bg-red-500/10 text-red-200'
              : 'border-green-500/40 bg-green-500/10 text-green-200'
          }`}
        >
          <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{children}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
