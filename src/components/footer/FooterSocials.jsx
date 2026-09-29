'use client';

import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaGithub } from 'react-icons/fa';
import { socialLinks } from '../../hooks/footerLinks';

const ICONS = { 
  facebook: FaFacebookF, 
  instagram: FaInstagram, 
  twitter: FaTwitter, 
  youtube: FaYoutube, 
  github: FaGithub 
};

export default function FooterSocials() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => {
        const Icon = ICONS[social.icon];
        const disabled = !social.url;

        // لو الأيقونة مش موجودة أو غير معرفة، نتخطاها عشان متعملش Crash
        if (!Icon) return null;

        if (disabled) {
          return (
            <span
              key={social.label}
              aria-label={`${social.label} (coming soon)`}
              title={`${social.label} — coming soon`}
              className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full border border-white/10 text-gray-600"
            >
              <Icon className="h-4 w-4" />
            </span>
          );
        }

        return (
          <motion.a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.15 }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-gray-400 transition-colors duration-200 hover:border-[#E50914] hover:text-[#E50914] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
          >
            <Icon className="h-4 w-4" />
          </motion.a>
        );
      })}
    </div>
  );
}