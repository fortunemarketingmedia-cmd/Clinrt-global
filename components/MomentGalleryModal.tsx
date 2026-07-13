"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiCamera, FiX } from "react-icons/fi";
type MomentImage = {
  src: string;
  alt: string;
};

export type MomentGalleryItem = {
  eyebrow: string;
  title: string;
  summary: string;
  meta: string;
  image: string;
  momentImages: readonly MomentImage[];
};

type MomentGalleryModalProps = {
  moment: MomentGalleryItem;
  onClose: () => void;
};

export function MomentGalleryModal({
  moment,
  onClose,
}: MomentGalleryModalProps) {
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

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-2 sm:p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#07131d]/78 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 18 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="moment-gallery-title"
        className="relative z-10 max-h-[94vh] w-full max-w-6xl overflow-hidden rounded-[1.6rem] border border-white/12 bg-[#081423] text-white shadow-[0_30px_120px_rgba(4,18,33,0.3)] sm:rounded-[2rem]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white transition hover:bg-black/35 sm:right-4 sm:top-4 sm:h-11 sm:w-11"
          aria-label="Close moment gallery"
        >
          <FiX className="h-5 w-5" />
        </button>

        <div className="relative  overflow-hidden h-40 sm:h-52 lg:h-60">
          <div className="absolute inset-0 bg-(--color-primary)/30" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-white/75">
                {moment.eyebrow || "Celebration"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white/70">
                <FiCamera className="h-3.5 w-3.5" />
                {moment.momentImages.length} photos
              </span>
            </div>
            <p
              id="moment-gallery-title"
              className="mt-4 max-w-4xl text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl"
            >
              {moment.title}
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72 sm:text-base">
              {moment.summary}
            </p>
          </div>
        </div>

        <div className="max-h-[calc(94vh-15rem)] overflow-y-auto p-4 sm:p-5 lg:max-h-[calc(94vh-18rem)] lg:p-4">
          <div className="space-y-4 lg:space-y-5">
            {moment.momentImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="group relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/6 shadow-[0_18px_50px_rgba(4,18,33,0.2)]"
              >
                <div className="absolute left-4 top-4 z-10 inline-flex rounded-full border border-white/15 bg-black/28 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em] text-white/78 backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading="lazy"
                    sizes="100vw"
                    className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/18 to-transparent p-4">
                  <p className="text-sm font-medium text-white/82">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
