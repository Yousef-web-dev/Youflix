"use client";

import { motion } from "framer-motion";
import { Compass, Search, Bookmark, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Compass,
    title: "Explore",
    description: "Browse movies, series, genres, and trending content.",
  },
  {
    number: "02",
    icon: Search,
    title: "Discover",
    description: "Open titles and explore their details.",
  },
  {
    number: "03",
    icon: Bookmark,
    title: "Save",
    description: "Add movies and series to My List.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Choose",
    description:
      "Use the information and trailers available to decide what you want to watch.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-white/10 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          How Youflix Works
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="text-2xl font-black text-white/10">
                  {step.number}
                </span>
                <Icon className="mt-1 h-5 w-5 text-[#E50914]" />
                <h3 className="mt-2 text-sm font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs text-gray-400">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
