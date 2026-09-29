// AuthCard.jsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function AuthCard({ title, subtitle, children }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-8 shadow-2xl shadow-black/60 backdrop-blur-xl box-border overflow-hidden"
    >
      <h1 className="text-xl sm:text-2xl font-bold text-white break-words">{title}</h1>
      {subtitle && <p className="mt-1.5 text-xs sm:text-sm text-gray-400 break-words">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </motion.div>
  );
}