'use client';

import { AnimatePresence, motion } from 'framer-motion';
import MyListCard from './MyListCard';

export default function MyListGrid({ items = [], onRemove }) {
  // حماية إضافية لضمان عدم حدوث أي خطأ لو items غير معرفة
  const safeItems = Array.isArray(items) ? items : [];

  if (safeItems.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 sm:px-8 md:grid-cols-4 lg:grid-cols-5">
      <AnimatePresence initial={false}>
        {safeItems.map((item) => (
          <motion.div
            key={`${item.type}-${item.id}`}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <MyListCard item={item} onRemove={onRemove} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}