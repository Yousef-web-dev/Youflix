'use client';

import { motion } from 'framer-motion';
import FooterBrand from './FooterBrand';
import FooterLinks from './FooterLinks';
import FooterAccordion from './FooterAccordion';
import FooterNewsletter from './FooterNewsletter';
import TmdbAttribution from './TmdbAttribution';
import FooterCopyright from './FooterCopyright';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative border-t border-white/10 bg-[#0a0a0a] px-4 pb-8 pt-12 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E50914]/60 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <FooterBrand />
          <FooterLinks />
          <FooterAccordion />
        </div>

        <FooterNewsletter />

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <FooterCopyright />
          <TmdbAttribution />
        </div>
      </div>
    </motion.footer>
  );
}
