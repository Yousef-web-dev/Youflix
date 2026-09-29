export const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "Series", href: "/series" },
  { label: "Genres", href: "/genres" },
  { label: "Trending", href: "/trending" },
  { label: "Top Rated", href: "/top-rated" },
  { label: "New Releases", href: "/new-releases" },
];

// comingSoon: true = page isn't built yet, so the link renders as inert text
// with a "Soon" badge instead of pretending to work.
export const libraryLinks = [
  { label: "My List", href: "/my-list", comingSoon: true },
  { label: "Watch History", href: "/history", comingSoon: true },
  { label: "Profile", href: "/profile", comingSoon: true },
  { label: "Settings", href: "/settings", comingSoon: true },
];

export const supportLinks = [
  { label: "Help Center", href: "/help", comingSoon: true },
  { label: "Contact Us", href: "/contact", comingSoon: true },
  { label: "FAQ", href: "/faq", comingSoon: true },
  { label: "Feedback", href: "/feedback", comingSoon: true },
  { label: "Accessibility", href: "/accessibility", comingSoon: true },
];

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy", comingSoon: true },
  { label: "Terms of Use", href: "/terms", comingSoon: true },
  { label: "Cookie Policy", href: "/cookies", comingSoon: true },
  { label: "About Youflix", href: "/about", comingSoon: true },
];

export const footerLinkGroups = [
  { title: "Explore", links: exploreLinks },
  { title: "Your Library", links: libraryLinks },
  { title: "Help & Support", links: supportLinks },
  { title: "Legal", links: legalLinks },
];

// url: null = account not set up yet — icon renders disabled rather than
// pointing at a fake profile.
export const socialLinks = [
  { label: "Facebook", icon: "facebook", url: null },
  { label: "Instagram", icon: "instagram", url: null },
  { label: "X (Twitter)", icon: "twitter", url: null },
  { label: "YouTube", icon: "youtube", url: null },
  { label: "GitHub", icon: "github", url: null },
];
