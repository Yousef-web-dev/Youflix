"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Component,
  Palette,
  Database,
  Wand2,
  Braces,
} from "lucide-react";

const TECHNOLOGIES = [
  {
    icon: Code2,
    name: "Next.js",
    description: "Used as the foundation for the application and routing.",
  },
  {
    icon: Component,
    name: "React",
    description: "Used to build reusable and interactive UI components.",
  },
  {
    icon: Palette,
    name: "Tailwind CSS",
    description: "Used for responsive styling and the Youflix design system.",
  },
  {
    icon: Database,
    name: "TMDB API",
    description:
      "Provides movie, series, genre, rating, poster, and video metadata.",
  },
  {
    icon: Wand2,
    name: "Framer Motion",
    description: "Used for smooth UI animations and transitions.",
  },
  {
    icon: Braces,
    name: "JavaScript",
    description: "Used throughout the application logic and interactions.",
  },
];

export default function TechnologyStack() {
  return (
    <section className="border-t border-white/10 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Built With Modern Technologies
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {TECHNOLOGIES.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-center sm:text-left"
              >
                <Icon className="mx-auto h-5 w-5 text-[#E50914] sm:mx-0" />
                <h3 className="mt-2 text-sm font-semibold text-white">
                  {tech.name}
                </h3>
                <p className="mt-1 text-xs text-gray-400">{tech.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
