"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, Check, Plus, Info } from "lucide-react";
import { posterUrl } from "../../lib/tmdb";
import useMyList from "../../hooks/useMyList";
import TrailerModal from "./TrailerModal";

export default function MovieCard({ movie }) {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { isInList, toggle } = useMyList();
  const router = useRouter();

  const year = movie.release_date ? movie.release_date.slice(0, 4) : null;
  const image = posterUrl(movie.poster_path, "w500");
  const inList = isInList(movie.id, "movie");

  return (
    <>
      <motion.div
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

            {/* صندوق معلومات الكارت والأزرار */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/40 to-transparent p-3 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
              <p className="line-clamp-2 text-sm font-semibold text-white">
                {movie.title}
              </p>
              
              <div className="mt-1 flex items-center gap-2 text-xs text-gray-300 mb-2.5">
                {movie.vote_average > 0 && (
                  <span>★ {movie.vote_average.toFixed(1)}</span>
                )}
                {year && <span>{year}</span>}
              </div>

              {/* الأزرار (تفاعلية تماماً بدون تداخل روابط) */}
              <div className="flex items-center gap-1.5" onClick={(e) => e.preventDefault()}>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setTrailerOpen(true);
                  }}
                  aria-label="Watch trailer"
                  className="flex h-7 w-7 cursor-pointer hover:bg-red-900 transition-colors duration-300 hover:text-white items-center justify-center rounded-full bg-white text-black shadow-lg"
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
                  className="flex h-7 w-7 cursor-pointer hover:bg-red-900 transition-colors duration-300 items-center justify-center rounded-full border border-white/50 text-white bg-black/60 hover:border-white shadow-lg"
                >
                  {inList ? (
                    <Check className="h-3.5 w-3.5 text-green-400" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    router.push(`/movies/${movie.id}`);
                  }}
                  aria-label="More info"
                  className="flex h-7 w-7 cursor-pointer hover:bg-red-900 transition-colors duration-300 items-center justify-center rounded-full border border-white/50 text-white bg-black/60 hover:border-white shadow-lg"
                >
                  <Info className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </Link>
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