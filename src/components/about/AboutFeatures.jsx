"use client";

import { motion } from "framer-motion";
import {
  Film,
  Tv,
  TrendingUp,
  LayoutGrid,
  Sparkles,
  Star,
  Search,
  Bookmark,
  Info,
  PlayCircle,
  Smartphone,
} from "lucide-react";

const FEATURES = [
  {
    icon: Film,
    title: "Discover Movies",
    description:
      "Explore movies using real TMDB data, with ratings, posters, release information, and more.",
  },
  {
    icon: Tv,
    title: "Explore Series",
    description:
      "Find TV series across different genres, ratings, and release periods.",
  },
  {
    icon: TrendingUp,
    title: "Trending",
    description: "See movies and series currently trending today or this week.",
  },
  {
    icon: LayoutGrid,
    title: "Genres",
    description:
      "Explore content by genre and discover stories that match your mood.",
  },
  {
    icon: Sparkles,
    title: "New & Popular",
    description:
      "Discover popular titles, new releases, trending content, and highly-rated movies and series.",
  },
  {
    icon: Star,
    title: "Top Rated",
    description: "Browse highly-rated movies and series using TMDB ratings.",
  },
  {
    icon: Search,
    title: "Search",
    description:
      "Search for movies and series and quickly find the titles you're looking for.",
  },
  {
    icon: Bookmark,
    title: "My List",
    description:
      "Save movies and series you want to remember and explore later.",
  },
  {
    icon: Info,
    title: "Movie Details",
    description: "Explore detailed information about individual movies.",
  },
  {
    icon: Info,
    title: "Series Details",
    description: "Explore detailed information about individual TV series.",
  },
  {
    icon: PlayCircle,
    title: "Trailer Discovery",
    description:
      "Watch available trailers when official video data is available.",
  },
  {
    icon: Smartphone,
    title: "Responsive Experience",
    description:
      "Enjoy the Youflix experience across desktop, tablet, and mobile devices.",
  },
];

export default function AboutFeatures() {
  return (
    <section className="border-t border-white/10 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Everything You Need to Discover
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
              >
                <Icon className="h-5 w-5 text-[#E50914]" />
                <h3 className="mt-2 text-sm font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
