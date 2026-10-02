"use client";

import Link from "next/link";
import { Heart, Plus, Star, Users } from "lucide-react";
import Img from "@/components/ui/Img";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/format";

const badgeFor = (tags) => (tags.includes("new") ? "New" : tags.includes("bestseller") ? "Bestseller" : null);

export default function ProductCard({ item, sizes = "(min-width:1024px) 22vw, (min-width:640px) 45vw, 90vw", priority = false }) {
  const { addToCart, toggleWishlist, isWished, hydrated } = useStore();
  const wished = hydrated && isWished(item.id);
  const badge = badgeFor(item.tags);

  return (
    <article className="group relative">
      {/* الحاوية الخارجية للكارد مع مساحة داخلية (p-3) ولون خلفية يترك هامشاً حول الصورة */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-ink-900/60 p-3 sm:p-4 border border-white/10 transition-colors group-hover:border-gold/40">
        
        {/* حاوية الصورة الداخلية التي تعطي شكل الإطار المرتب والمتباعد عن الحواف */}
        <div className="relative w-full h-full overflow-hidden rounded-2xl bg-ink-800">
          <Link href={`/menu/${item.id}`} aria-label={`${item.name} — details`} className="absolute inset-0 z-10" />
          
          <Img
            src={item.image}
            alt={item.name}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-brew group-hover:scale-[1.05]"
          />
          
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink-950/70 via-transparent to-transparent" />
        </div>

        {badge && (
          <span className="absolute top-6 left-6 z-20 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink-950 shadow-md">
            {badge}
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(item);
          }}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${item.name} from wishlist` : `Save ${item.name} to wishlist`}
          className="absolute top-6 right-6 z-20 grid size-10 place-items-center rounded-full border border-white/15 bg-ink-900/70 backdrop-blur-md transition-colors hover:border-gold shadow-md"
        >
          <Heart className={`size-[18px] transition-colors ${wished ? "fill-gold text-gold" : "text-cream"}`} aria-hidden />
        </button>

        {item.game && (
          <p className="absolute bottom-6 left-6 z-20 inline-flex items-center gap-1.5 rounded-full bg-ink-900/80 px-3 py-1 text-xs backdrop-blur-md shadow-md">
            <Users className="size-3.5 text-gold" aria-hidden />
            {item.game.players} players · {item.game.time}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-xl leading-tight">
            <Link href={`/menu/${item.id}`} className="hover:text-gold">
              {item.name}
            </Link>
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-mist">{item.blurb}</p>
        </div>
        <button
          onClick={() => addToCart(item)}
          aria-label={`Add ${item.name} to your order`}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-ink-950 transition-transform duration-200 hover:scale-110 hover:bg-cream active:scale-95 cursor-pointer"
        >
          <Plus className="size-5" aria-hidden />
        </button>
      </div>

      <p className="mt-3 flex items-center gap-3 text-sm">
        <span className="font-semibold text-gold tabular-nums">
          {formatPrice(item.price)}
          {item.unit ? <span className="font-normal text-mist"> / {item.unit}</span> : null}
        </span>
        <span className="inline-flex items-center gap-1 text-mist">
          <Star className="size-3.5 fill-gold text-gold" aria-hidden />
          {item.rating.toFixed(1)}
        </span>
      </p>
    </article>
  );
}