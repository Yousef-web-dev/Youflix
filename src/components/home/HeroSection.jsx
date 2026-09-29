'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { Play, Plus, Info, X } from 'lucide-react';
import { backdropUrl } from '../../lib/tmdb';
import { genreNames } from '../../lib/genres';
import { addToMyList, isInMyList } from '../../hooks/myList';

const HeroParticles = dynamic(() => import('./HeroParticles'), { ssr: false });

export default function HeroSection({ item }) {
  const containerRef = useRef(null);
  const router = useRouter();

  // حالة التحكم في فتح وغلْق النافذة المنبثقة ورابط التريلر
  const [trailerKey, setTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);

  useEffect(() => {
    if (!item) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('[data-hero-animate]', { opacity: 1, y: 0, scale: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('[data-hero-backdrop]', { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.2 })
        .fromTo('[data-hero-title]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
        .fromTo('[data-hero-meta]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
        .fromTo('[data-hero-desc]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .fromTo(
          '[data-hero-buttons] > *',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
          '-=0.2'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [item]);

  if (!item) return null;

  const title = item.title || item.name;
  const year = (item.release_date || item.first_air_date || '').slice(0, 4);
  const runtime = item.runtime
    ? `${item.runtime} min`
    : item.number_of_seasons
      ? `${item.number_of_seasons} Seasons`
      : null;
  const genres = genreNames(item.genre_ids).slice(0, 3);
  const mediaType = item.media_type || (item.title ? 'movie' : 'tv');

  const handleAddToList = () => {
    if (!isInMyList(item.id, mediaType)) {
      addToMyList(item, mediaType);
      window.dispatchEvent(new Event('mylist-updated'));
    }
    router.push('/my-list');
  };

  // جلب بيانات التريلر وفتح الـ Modal
  const handleWatchTrailer = async () => {
    try {
      setIsLoadingTrailer(true);
      const res = await fetch(`/api/trailer?id=${item.id}&type=${mediaType}`);
      const data = await res.json();
      
      if (data?.key) {
        setTrailerKey(data.key);
        setIsModalOpen(true);
      } else {
        alert('عذراً، التريلر غير متوفر لهذا العرض حالياً.');
      }
    } catch (err) {
      console.error('Failed to load trailer:', err);
    } finally {
      setIsLoadingTrailer(false);
    }
  };

  return (
    <>
      <section ref={containerRef} className="relative flex h-[105vh] w-full items-center md:items-end lg:items-end overflow-hidden">
        <div data-hero-backdrop className="absolute inset-0">
          {item.backdrop_path && (
            <Image
              src={backdropUrl(item.backdrop_path)}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        </div>

        <HeroParticles />

        <div className="relative z-10 max-w-2xl px-4 pb-16 sm:px-8 sm:pb-55">
          <h1 data-hero-title className="text-3xl font-black leading-tight text-white sm:text-5xl">
            {title}
          </h1>

          <div data-hero-meta className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-300">
            {item.vote_average > 0 && <span className="text-green-400">★ {item.vote_average.toFixed(1)}</span>}
            {year && <span>{year}</span>}
            {runtime && <span>{runtime}</span>}
            {genres.length > 0 && <span>{genres.join(' • ')}</span>}
          </div>

          <p data-hero-desc className="mt-4 line-clamp-3 text-sm text-gray-200 sm:text-base">
            {item.overview}
          </p>

          <div data-hero-buttons className="mt-6 flex flex-wrap items-center gap-3">
            {/* زر Watch Now يفتح الـ Modal بدل التاب الجديدة */}
            <button
              type="button"
              onClick={handleWatchTrailer}
              disabled={isLoadingTrailer}
              className="group flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-950/60 transition-all duration-300 hover:bg-red-950 hover:shadow-red-600/50 hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Play className="h-4 w-4 fill-current transition-transform duration-300 group-hover:scale-110" />
              {isLoadingTrailer ? 'Loading...' : 'Watch Now'}
            </button>

            {/* زر My List */}
            <button
              type="button"
              onClick={handleAddToList}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-zinc-900/70 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-zinc-800 hover:border-white/20 hover:scale-105 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              My List
            </button>

            {/* زر More Info */}
            <button
              type="button"
              onClick={() => {
                const detailsPath = mediaType === 'tv' ? `/series/${item.id}` : `/movies/${item.id}`;
                router.push(detailsPath);
              }}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-zinc-900/70 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-zinc-800 hover:border-white/20 hover:scale-105 active:scale-95"
            >
              <Info className="h-4 w-4" />
              More Info
            </button>
          </div>
        </div>
      </section>

      {/* نافذة الـ Modal المنبثقة لتشغيل الفيديو */}
      {isModalOpen && trailerKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
          <div className="relative w-full max-w-4xl aspect-video bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {/* زرار الإغلاق (X) */}
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setTrailerKey(null);
              }}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-red-600"
            >
              <X className="h-5 w-5" />
            </button>

            {/* مشغل يوتيوب مضمن */}
            <iframe
            
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}