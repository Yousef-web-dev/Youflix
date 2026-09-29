"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Play, Check, Plus, Info } from "lucide-react";
import { posterUrl } from "../../lib/tmdb";
import useMyList from "../../hooks/useMyList";
import TrailerModal from "./TrailerModal";

export default function MovieCard({ movie }) {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { isInList, toggle } = useMyList();

  const year = movie.release_date ? movie.release_date.slice(0, 4) : null;
  const image = posterUrl(movie.poster_path, "w500");
  const inList = isInList(movie.id, "movie");

  return (
    <>
      <motion.div
        // هنا تم زيادة المسافة الرأسية وتبطيء الزمن عشان تلاحظ الحركة براحتك
        initial={{ opacity: 0, y: 300, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        whileHover={{ scale: 1.05, zIndex: 10 }}
        className="group relative"
      >
        <Link href={`/movies/${movie.id}`} className="block">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-white/5 shadow-md transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-black/60">
            {image ? (
              <Image
                src={image}
                alt={movie.title}
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
              <p className="line-clamp-2 text-sm mb-3 font-semibold text-white">
                {movie.title}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs text-gray-300">
                {movie.vote_average > 0 && (
                  <span>★ {movie.vote_average.toFixed(1)}</span>
                )}
                {year && <span>{year}</span>}
              </div>
            </div>
          </div>
        </Link>

        {/* أزرار التفاعل */}
        <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setTrailerOpen(true);
            }}
            aria-label="Watch trailer"
            className="flex h-7 w-7 cursor-pointer hover:bg-red-900 transition-colors duration-300 hover:text-white items-center justify-center rounded-full bg-white text-black"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              toggle(movie, "movie");
            }}
            aria-label={inList ? "Remove from My List" : "Add to My List"}
            className="flex h-7 w-7 cursor-pointer hover:bg-red-900 transition-colors duration-300 items-center justify-center rounded-full border border-white/50 text-white bg-black/40 hover:border-white"
          >
            {inList ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Plus className="h-3.5 w-3.5" />
            )}
          </button>

          <Link
            href={`/movies/${movie.id}`}
            onClick={(e) => e.stopPropagation()}
            aria-label="More info"
            className="flex h-7 w-7 cursor-pointer hover:bg-red-900 transition-colors duration-300 items-center justify-center rounded-full border border-white/50 text-white bg-black/40 hover:border-white"
          >
            <Info className="h-3.5 w-3.5" />
          </Link>
        </div>
      </motion.div>

      {trailerOpen && (
        <TrailerModal
          id={movie.id}
          title={movie.title}
          onClose={() => setTrailerOpen(false)}
        />
      )}
    </>
  );
}
