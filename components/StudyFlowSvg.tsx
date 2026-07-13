export default function StudyFlowSvg() {
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/70 shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
      <video
        className="block w-full scale-[1.0] pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/how-works.mp4" type="video/mp4" />
      </video>
    </div>
  );
}