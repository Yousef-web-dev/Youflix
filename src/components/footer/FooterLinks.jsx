import Link from 'next/link';
import { footerLinkGroups } from '../../hooks/footerLinks';

export function FooterLinkList({ links }) {
  return (
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.href}>
          {link.comingSoon ? (
            <span className="flex items-center gap-2 text-sm text-gray-600">
              {link.label}
              <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-gray-500">Soon</span>
            </span>
          ) : (
            <Link
              href={link.href}
              className="rounded text-sm text-gray-400 transition-colors duration-200 hover:text-[#E50914] focus-visible:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
            >
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function FooterLinks() {
  return (
    <div className="hidden gap-10 md:grid md:grid-cols-4">
      {footerLinkGroups.map((group) => (
        <div key={group.title}>
          <h3 className="mb-3 text-sm font-semibold text-white">{group.title}</h3>
          <FooterLinkList links={group.links} />
        </div>
      ))}
    </div>
  );
}
