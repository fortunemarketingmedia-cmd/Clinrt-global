"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiFileText, FiX } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { getBrochureGateHref, type Brochure } from "@/data";

type BrochurePreviewModalProps = {
  brochure: Brochure;
  onClose: () => void;
};

export function BrochurePreviewModal({
  brochure,
  onClose,
}: BrochurePreviewModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const downloadHref = getBrochureGateHref(brochure.slug);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-2 sm:p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#07131d]/72 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 22 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 18 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="brochure-preview-title"
        className="relative z-10 max-h-[94vh] w-full max-w-6xl overflow-hidden rounded-[1.5rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.98)_100%)] text-black shadow-[0_30px_120px_rgba(15,36,58,0.24)] sm:rounded-[2rem]"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-sky-200/45 blur-3xl" />
          <div className="absolute right-0 top-1/4 h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl" />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white/88 text-slate-700 transition hover:bg-white sm:right-4 sm:top-4 sm:h-11 sm:w-11"
          aria-label="Close brochure preview"
        >
          <FiX className="h-5 w-5" />
        </button>

        <div className="relative border-b border-black/8 bg-white/78 p-5 backdrop-blur-sm sm:p-6">
          <div className="flex flex-wrap items-center gap-3 pr-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-black/50">
              <FiFileText className="h-3.5 w-3.5" />
              Brochure Preview
            </span>
            <span className="rounded-full border border-black/8 bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-black/45">
              {brochure.meta}
            </span>
          </div>

          <h2
            id="brochure-preview-title"
            className="mt-4 max-w-3xl text-2xl font-semibold leading-tight text-black sm:text-3xl"
          >
            {brochure.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-black/62 sm:text-base">
            {brochure.description}
          </p>
        </div>

        <div className="relative grid max-h-[calc(94vh-11rem)] gap-4 overflow-y-auto p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:p-6">
          <div className="overflow-hidden rounded-[1.35rem] border border-black/8 bg-slate-100 shadow-[0_18px_40px_rgba(15,36,58,0.08)]">
            <iframe
              src={`${brochure.pdfSrc}#toolbar=0&navpanes=0&view=FitH`}
              title={`${brochure.title} PDF preview`}
              className="h-[56vh] w-full bg-white sm:h-[62vh] lg:h-[68vh]"
            />
          </div>

          <aside className="space-y-4">
            <div className="rounded-[1.35rem] border border-black/8 bg-white/88 p-4 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/40">
                Included
              </p>
              <div className="mt-4 grid gap-2.5">
                {brochure.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-black/8 bg-slate-50/80 px-3.5 py-3 text-sm leading-6 text-black/68"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            <Button
              href={downloadHref}
              label="Request & Download"
              size="sm"
              icon={FiDownload}
              className="w-full"
            />
          </aside>
        </div>
      </motion.div>
    </div>
  );
}
