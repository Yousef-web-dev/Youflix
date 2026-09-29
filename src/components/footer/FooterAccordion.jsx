'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { footerLinkGroups } from '../../hooks/footerLinks';
import { FooterLinkList } from './FooterLinks';

export default function FooterAccordion() {
  const [openTitle, setOpenTitle] = useState(null);

  return (
    <div className="divide-y divide-white/10 md:hidden">
      {footerLinkGroups.map((group) => {
        const isOpen = openTitle === group.title;
        return (
          <div key={group.title}>
            <button
              type="button"
              onClick={() => setOpenTitle(isOpen ? null : group.title)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-white"
            >
              {group.title}
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pb-4">
                    <FooterLinkList links={group.links} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
