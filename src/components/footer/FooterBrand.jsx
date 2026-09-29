import Link from "next/link";
import FooterSocials from "./FooterSocials";

export default function FooterBrand() {
  return (
    <div className="max-w-xs">
      <Link href="/" aria-label="Youflix home">
        <span className="text-2xl font-black italic tracking-tight text-[#E50914]">
          Youflix
        </span>
      </Link>
      <p className="mt-3 text-sm text-gray-400">
        Discover movies, series, and cinematic experiences with Youflix.
      </p>
      <div className="mt-4">
        <FooterSocials />
      </div>
    </div>
  );
}
