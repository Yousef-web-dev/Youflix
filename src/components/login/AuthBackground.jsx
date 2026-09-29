// Pure CSS cinematic backdrop — no images, so it still looks right if nothing loads.
export default function AuthBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-black" aria-hidden="true">
      <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#E50914]/25 blur-[120px]" />
      <div className="absolute -bottom-52 right-0 h-[30rem] w-[30rem] rounded-full bg-[#E50914]/10 blur-[140px]" />

      {/* Abstract poster-like panels */}
      <div className="absolute left-[8%] top-[14%] h-56 w-36 -rotate-12 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.06] to-transparent" />
      <div className="absolute left-[24%] top-[42%] h-64 w-40 rotate-6 rounded-2xl border border-white/5 bg-gradient-to-br from-[#E50914]/10 to-transparent" />
      <div className="absolute left-[4%] top-[62%] h-48 w-32 rotate-12 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}
