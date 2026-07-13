"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiBookOpen, FiClock, FiFileText, FiX } from "react-icons/fi";
import type { ClinrtWorldBlogArticle } from "@/data";

type BlogArticleModalProps = {
  article: ClinrtWorldBlogArticle;
  onClose: () => void;
};

export function BlogArticleModal({
  article,
  onClose,
}: BlogArticleModalProps) {
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
    <div className="fixed inset-0 z-100 flex items-start justify-center p-2 pt-4 sm:items-center sm:p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#07131d]/70 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 18 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-article-title"
        className="relative z-10 max-h-[94vh] w-full max-w-6xl overflow-hidden rounded-[1.5rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.98)_100%)] text-black shadow-[0_30px_120px_rgba(15,36,58,0.24)] sm:rounded-[2rem]"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-sky-200/55 blur-3xl" />
          <div className="absolute right-0 top-1/4 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-orange-200/35 blur-3xl" />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white/85 text-slate-700 transition hover:bg-white sm:right-4 sm:top-4 sm:h-11 sm:w-11"
          aria-label="Close article"
        >
          <FiX className="h-5 w-5" />
        </button>

        <div className="relative grid max-h-[94vh] overflow-y-auto lg:grid-cols-[280px_1fr]">
          <aside className="border-b border-black/8 bg-white/72 p-5 backdrop-blur-sm sm:p-6 lg:border-b-0 lg:border-r lg:p-8">
            <span className="inline-flex rounded-full border border-black/8 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-black/55">
              ClinRT World
            </span>

            <div className="mt-5 rounded-[1.6rem] bg-[#0f243a] p-4 text-white shadow-[0_18px_40px_rgba(15,36,58,0.16)] sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/55">
                {article.eyebrow}
              </p>
              <p className="mt-3 text-xl font-semibold leading-tight sm:text-2xl">
                {article.title}
              </p>
              <p className="mt-4 text-sm leading-7 text-white/72">
                {article.summary}
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="rounded-[1.35rem] border border-black/8 bg-white/85 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                    <FiClock className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-black/40">
                      Read Time
                    </p>
                    <p className="mt-1 font-semibold text-black">
                      {article.readTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.35rem] border border-black/8 bg-white/85 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <FiFileText className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-black/40">
                      Article Type
                    </p>
                    <p className="mt-1 font-semibold text-black">
                      {article.meta}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-black/40">
                In This Article
              </p>
              <div className="mt-4 space-y-2">
                {article.sections.map((section) => (
                  <div
                    key={section.title}
                    className="rounded-2xl border border-black/8 bg-white/80 px-4 py-3 text-sm leading-6 text-black/70"
                  >
                    {section.title}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/90 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-black/45">
                  <FiBookOpen className="h-3.5 w-3.5" />
                  Full article
                </span>
                <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-orange-700">
                  {article.eyebrow}
                </span>
              </div>

              <h2
                id="blog-article-title"
                className="mt-6 text-2xl font-semibold leading-tight text-black sm:text-3xl lg:text-[2.75rem]"
              >
                {article.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-black/62 sm:text-base sm:leading-8">
                {article.summary}
              </p>

              <div className="mt-8 space-y-5 rounded-[1.75rem] border border-black/8 bg-white/78 p-5 shadow-[0_18px_40px_rgba(15,36,58,0.06)] sm:p-8">
                {article.lead.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-8 text-black/72 sm:text-[1.02rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 space-y-6">
                {article.sections.map((section) => (
                  <section
                    key={section.title}
                      className="rounded-[1.75rem] border border-black/8 bg-white/82 p-5 shadow-[0_18px_44px_rgba(15,36,58,0.06)] sm:p-8"
                  >
                    <h3 className="text-xl font-semibold leading-tight text-black sm:text-2xl">
                      {section.title}
                    </h3>

                    {section.paragraphs?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mt-4 text-sm leading-7 text-black/68 sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.bullets && (
                      <ul className="mt-5 grid gap-3">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-3 rounded-[1.25rem] border border-black/8 bg-slate-50/80 px-3.5 py-4 sm:px-4"
                          >
                            <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-(--color-primary)" />
                            <span className="text-sm leading-7 text-black/70 sm:text-base">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

                <div className="mt-8 rounded-[1.9rem] bg-[#0f243a] p-5 text-white shadow-[0_22px_60px_rgba(15,36,58,0.18)] sm:p-8">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/55">
                  Closing Thought
                </p>
                <div className="mt-4 space-y-4">
                  {article.closing.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-7 text-white/78 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
