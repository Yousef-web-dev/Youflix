"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Play, Check, Plus, Info } from "lucide-react";
import { posterUrl } from "../../lib/tmdb";
import useMyList from "../../hooks/useMyList";
import SeriesTrailerModal from "./SeriesTrailerModal";

export default function SeriesCard({ series }) {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { isInList, toggle } = useMyList();

  const year = series.first_air_date ? series.first_air_date.slice(0, 4) : null;
  const image = posterUrl(series.poster_path, "w500");
  const inList = isInList(series.id, "tv");

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 300, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        whileHover={{ scale: 1.05, zIndex: 10 }}
        className="group relative"
      >
        <Link href={`/series/${series.id}`} className="block">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-white/5 shadow-md transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-black/60">
            {image ? (
              <Image
                src={image}
                alt={series.name}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 200px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-500">
                No image
              </div>
            )}

            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-3 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
              <p className="line-clamp-2 text-sm font-semibold text-white">
                {series.name}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs text-gray-300">
                {series.vote_average > 0 && (
                  <span>★ {series.vote_average.toFixed(1)}</span>
                )}
                {year && <span>{year}</span>}
              </div>

              <div className="mt-2 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    setTrailerOpen(true);
                  }}
                  aria-label="Watch trailer"
                  className="flex h-7 w-7 items-center cursor-pointer hover:text-white hover:bg-red-900 transition-colors duration-300 justify-center rounded-full bg-white text-black"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    toggle(series, "tv");
                  }}
                  aria-label={inList ? "Remove from My List" : "Add to My List"}
                  className="flex h-7 w-7 items-center cursor-pointer hover:bg-red-900 transition-colors duration-300 justify-center rounded-full border border-white/50 text-white"
                >
                  {inList ? (
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" />
                  )}
                </button>

                {/* تم استبدال الـ Link الداخلي بـ span/div لمنع تداخل الروابط */}
                <span
                  aria-label="More info"
                  className="flex h-7 w-7 items-center cursor-pointer hover:bg-red-900 transition-colors duration-300 justify-center rounded-full border border-white/50 text-white"
                >
                  <Info className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {trailerOpen && (
        <SeriesTrailerModal
          id={series.id}
          title={series.name}
          onClose={() => setTrailerOpen(false)}
        />
      )}
    </>
  );
}
