"use client";
import { useState } from "react";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import CountUpOnView from "@/components/CountUpOnView";
import { FaqItem } from "@/components/FaqItem";
import Clients from "@/components/ui/Clients";
import GlassCard from "@/components/GlassCard";
import GlassSlider from "@/components/GlassSlider";
import SectionBadge from "@/components/ui/SectionBadge";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FaqModal } from "@/components/FaqModal";
import { FiArrowRight } from "react-icons/fi";
import {
  FaFlask,
  FaCogs,
  FaShieldAlt,
  FaHandshake,
  FaGlobeAmericas,
} from "react-icons/fa";
import {
  brandLogoSrc,
  getContactFormHref,
  homeFaqItems as faqs,
  homeMovingWords,
  homeNewsItems as newsItems,
  homePosterItems as posterItems,
  homeResearchFields as researchFields,
  homeWhyChoosePoints as whyChoosePoints,
} from "@/data";

const movingTrack = [...homeMovingWords, ...homeMovingWords];
const trustedClientAvatars = [
  { src: "/images/author-1.jpg" },
  { src: "/images/author-2.jpg" },
  { src: "/images/author-3.jpg" },
  { src: "/images/author-2.jpg" },
];
const stats = [
  {
    eyebrow: "Experience",
    value: 50,
    label: "Years of experience",
    suffix: "+",
  },
  {
    eyebrow: "Delivery",
    value: 1000,
    label: "Trials supported",
    suffix: "+",
  },
  {
    eyebrow: "Trusted by",
    value: 500,
    label: "Satisfied clients",
    suffix: "+",
    hasClients: true,
  },
];

export default function HomePage() {
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [activeNewsIndex, setActiveNewsIndex] = useState<number | null>(null);
  const [hoveredNewsIndex, setHoveredNewsIndex] = useState<number | null>(null);
  const PREVIEW_COUNT = 5;
  const previewFaqs = faqs.slice(0, PREVIEW_COUNT);
  const previewNewsIndex = hoveredNewsIndex ?? activeNewsIndex;

  return (
    <PageTransition>
      <section className="relative flex min-h-[90vh] items-end overflow-hidden sm:min-h-screen lg:min-h-[110vh]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/home-video.webm"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(224,242,254,0.2)_0%,rgba(167,243,208,0.16)_22%,rgba(14,116,144,0.4)_52%,rgba(15,23,42,0.84)_100%)]" />

        <div className="hero-content-lift relative z-10 section-shell w-full pb-12 pt-24 text-white sm:pb-16 sm:pt-28 md:pb-20 md:pt-36 lg:pb-24">
          <div className="grid items-end gap-8 md:gap-14 lg:grid-cols-2 lg:gap-1">
            {/* LEFT CONTENT */}
            <ScrollReveal
              variant="left"
              className="mb-2 max-w-3xl sm:mb-12 lg:mb-16"
            >
              <Image
                src="/images/logo-final.png"
                alt="ClinRT Logo"
                width={220}
                height={65}
                className="drop-shadow-[0_16px_36px_rgba(8,20,35,0.2)] will-change-transform motion-safe:animate-[float-slow_12s_ease-in-out_infinite]"
                loading="lazy"
              />
              <p className=" page-banner-title font-semibold">
                Intelligent, Interactive and Innovative IRT Platform
              </p>
              <p className="mt-2 max-w-2xl type-h5 ">
                Customised and scalable IRT platform for managing clinical
                trials in an efficient way
              </p>

              {/* Buttons */}

              {/* Hero Bottom Stats */}
              <div className=" max-w-4xl relative">
                {/* background glow */}
                <div className="pointer-events-none absolute inset-0" />

                {/* stats */}
                <div className="relative grid sm:grid-cols-2 xl:grid-cols-3">
                  {stats.map((item, i) => (
                    <div
                      key={i}
                      className="px-5 py-2 sm:px-6 sm:py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/60">
                          {item.eyebrow}
                        </span>
                        <CountUpOnView
                          to={item.value}
                          suffix={item.suffix}
                          className=" inline-block text-right text-white font-semibold tabular-nums text-3xl sm:text-5xl"
                        />
                        <p className=" text-sm text-white/80">{item.label}</p>

                        {item.hasClients && (
                          <Clients
                            avatars={trustedClientAvatars}
                            label=""
                            size={28}
                            className=" shrink-0"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* bottom section */}
                <div className=" flex justify-start">
                  <span className="relative inline-flex items-start rounded-full px-5 py-2 text-xs font-semibold  tracking-widest text-(--color-orange) border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    {/* glow effect */}
                    <span className="absolute inset-0 rounded-full bg-linear-to-r from-white/20 via-transparent to-rose-400/20 opacity-40 blur-sm" />

                    {/* text */}
                    <span className="relative z-10">In CTMS Domain</span>
                  </span>
                </div>
              </div>
              <div className="mt-4 ">
                <Button href="/who-we-are" label="Get Started" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Moving words */}
      <SectionWrapper fullBleed className="py-0">
        <div className="bg-(--primary-color) text-white rounded-2xl">
          <div className="section-shell py-2 md:py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1 overflow-hidden">
                <div className="ticker-track text-white/80">
                  {movingTrack.map((item, index) => (
                    <span
                      key={`${item}-${index}`}
                      className="inline-flex items-center gap-3 type-h6 font-semibold uppercase tracking-[0.50 em]"
                    >
                      <span className="h-2 w-2 rounded-full bg-white/50" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Posters + News */}
      <SectionWrapper fullBleed>
        <div className="relative overflow-hidden rounded-4xl border border-slate-200/70 bg-linear-to-br from-orange-50 via-white to-sky-50 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-5 lg:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_32%)]" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-white/90 to-transparent" />
          <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-linear-to-r from-transparent via-slate-200/80 to-transparent" />

          <div className="relative grid items-start gap-5 lg:grid-cols-[2fr_1fr]">
            {/* <div className="flex h-full min-h-80 flex-col rounded-[1.75rem] border border-white/80 bg-white/1 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-4"> */}
            <GlassSlider
              items={posterItems}
              ariaLabel="At a glance posters"
              className="h-72 sm:h-80 lg:h-102"
              scrollerClassName="h-full w-full pb-0 pt-0"
              controlsClassName="pointer-events-none absolute inset-x-3 top-1/2 z-10 -translate-y-1/2 justify-between sm:inset-x-4"
              edgeFadeClassName=""
              pageSize={1}
              itemClassName="h-full w-full"
              renderItem={(poster, index) => (
                <ScrollReveal delay={index * 80}>
                  <Link
                    href={poster.href}
                    className="group relative block h-full w-full overflow-hidden rounded-2xl bg-white transition-all hover:shadow-xl hover:shadow-slate-200/50"
                  >
                    <div className="relative h-full min-h-72 w-full overflow-hidden sm:min-h-100">
                      <Image
                        src={poster.image}
                        alt={poster.title}
                        fill
                        loading="lazy"
                        sizes="100vw"
                        className="object-contain object-center transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                      <div className="absolute bottom-0 left-0 w-full p-5">
                        <span className="inline-block rounded-md bg-(--color-orange)/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                          {poster.tag}
                        </span>
                        <p className="mt-3 type-h4 font-medium leading-snug text-white">
                          {poster.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              )}
            />
            {/* </div> */}

            <motion.aside
              layout
              transition={{
                layout: {
                  duration: 0.32,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              className="flex h-auto flex-col rounded-[1.75rem] border border-orange-400/80 bg-white/72 p-5 text-slate-900 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm lg:p-7"
            >
              <SectionBadge
                className="bg-white/80 text-slate-900"
                borderClassName="border border-orange-200"
              >
                News & Updates
              </SectionBadge>

              <div className="relative mt-5 space-y-3 sm:mt-6 sm:space-y-4">
                {newsItems.map((item, index) => {
                  const isOpen = previewNewsIndex === index;

                  return (
                    <div
                      key={item.title}
                      onMouseEnter={() => setHoveredNewsIndex(index)}
                      onMouseLeave={() =>
                        setHoveredNewsIndex((current) =>
                          current === index ? null : current,
                        )
                      }
                      onFocusCapture={() => setHoveredNewsIndex(index)}
                      onBlurCapture={(event) => {
                        const nextTarget = event.relatedTarget;

                        if (
                          !(nextTarget instanceof Node) ||
                          !event.currentTarget.contains(nextTarget)
                        ) {
                          setHoveredNewsIndex((current) =>
                            current === index ? null : current,
                          );
                        }
                      }}
                      className={`rounded-2xl border p-4 shadow-[0_10px_28px_rgba(15,23,42,0.04)] transition-all duration-300 ${
                        isOpen
                          ? "border-orange-200 bg-white shadow-[0_18px_40px_rgba(249,115,22,0.12)]"
                          : "border-slate-200/80 bg-white/90"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveNewsIndex((current) =>
                            current === index ? null : index,
                          )
                        }
                        aria-expanded={isOpen}
                        className="w-full text-left"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="type-h5 font-semibold text-slate-900">
                              {item.title}
                            </p>
                            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                              {item.date}
                            </p>
                          </div>
                          <span
                            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                              isOpen
                                ? "rotate-45 border-orange-200 bg-orange-50 text-orange-500"
                                : "border-slate-200 bg-slate-50 text-slate-500"
                            }`}
                            aria-hidden="true"
                          >
                            <FiArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.24,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 border-t border-slate-200/80 pt-4">
                              <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                                {item.description}
                              </p>
                              <div className="mt-4 flex flex-wrap gap-3">
                                {item.ctas.map((cta) => {
                                  const isExternal =
                                    cta.href.startsWith("http") ||
                                    cta.href.startsWith("mailto:");

                                  return (
                                    <Link
                                      key={cta.label}
                                      href={cta.href}
                                      target={
                                        isExternal ? "_blank" : undefined
                                      }
                                      rel={
                                        isExternal
                                          ? "noopener noreferrer"
                                          : undefined
                                      }
                                      className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 transition hover:text-orange-700"
                                    >
                                      <span>{cta.label}</span>
                                      <FiArrowRight className="h-4 w-4" />
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.aside>
          </div>
        </div>
      </SectionWrapper>

      {/* key features section */}
      <SectionWrapper fullBleed>
        <div className="mx-auto rounded-3xl bg-(--primary-color) px-4 py-12 text-(--text-invert) sm:px-6 sm:py-16 md:py-20">
          {/* Section Header */}
          <ScrollReveal className="">
            <SectionBadge>Key Features</SectionBadge>
            <div className="mt-2 flex flex-col gap-1 sm:gap-4 lg:gap-8 lg:flex-row lg:items-start lg:justify-between">
              <p className=" type-h3 font-semibold ">
                Leading innovation across critical fields
              </p>

              <p className=" type-h5 mt-4 text-(--text-invert)">
                These features collectively enable streamlined clinical trial
                execution by reducing manual effort, minimizing operational
                risks, and ensuring real-time control across subjects, supplies,
                and study data. The platform is designed to adapt to complex
                protocol requirements while maintaining strong regulatory
                compliance, transparency, and operational efficiency throughout
                the trial lifecycle.
              </p>
            </div>
          </ScrollReveal>

          {/* Glass Cards */}
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {researchFields.map((field, i) => (
              <ScrollReveal key={field.title} delay={i * 120}>
                <GlassCard
                  image={field.image}
                  title={field.title}
                  description={field.description}
                  height="h-64 sm:h-72 lg:h-80"
                  glowColor="bg-(--color-orange)"
                  hoverEffect="both"
                  contentClassName="hover:bg-black/80"
                />
              </ScrollReveal>
            ))}
          </div>

          {/* CTA Button */}
          <ScrollReveal delay={300}>
            <div className="mt-14 flex justify-center">
              <Button href="/iclinrt" label="See What We Build" />
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Why choose ClinRT section */}
      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-14">
          {/* LEFT IMAGE */}
          <ScrollReveal className="h-full lg:flex lg:items-start">
            <div className="relative pb-20 lg:w-full lg:max-w-[34rem] lg:pb-0">
              <Image
                src="/images/Powered by technology and clinical expertise Updated.webp"
                alt=" 	Why ClinRT"
                width={520}
                height={400}
                className="w-full rounded-2xl object-cover lg:h-[28rem]"
                loading="lazy"
              />

              {/* Floating client badge */}
              <div className="absolute -bottom-8 left-4 right-4 rounded-xl bg-black/40 px-4 py-3 text-white shadow-lg backdrop-blur-sm sm:left-6 sm:right-auto sm:max-w-sm sm:px-5">
                <p className="text-sm font-semibold leading-6 text-white">
                  Your Partner for Proven, Practical, and High Performance
                  Technology
                </p>
                <Clients
                  avatars={trustedClientAvatars}
                  label="Trusted By"
                  title="500+ Clients"
                  className="mt-3"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT CONTENT */}
          <div className="flex h-full flex-col justify-start">
            <ScrollReveal>
              <SectionBadge>Why Choose Us</SectionBadge>

              <p className="mt-4 type-h2 font-semibold">
                Powered by technology and clinical expertise
              </p>

              <p className="mt-4 type-h6 text-(--muted-color)">
                Our platform and delivery teams help research organizations
                streamline trial execution, improve coordination, and maintain
                compliance across the full clinical lifecycle.
              </p>
            </ScrollReveal>

            {/* POINTS */}
            <div className="mt-8 space-y-6">
              {whyChoosePoints.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 120}>
                  <div className="group flex cursor-pointer items-start gap-4">
                    {/* icon */}
                    <div
                      className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg 
          bg-(--color-primary)/80 text-(--text-invert)
          transition-all duration-300 ease-out
          group-hover:scale-110 group-hover:rotate-3
          group-hover:shadow-lg group-hover:shadow-indigo-400/40 sm:h-14 sm:w-14"
                    >
                      <div className="transition-transform duration-300 group-hover:scale-125">
                        {index === 0 && (
                          <FaFlask className="h-7 w-7 sm:h-8 sm:w-8" />
                        )}
                        {index === 1 && (
                          <FaCogs className="h-7 w-7 sm:h-8 sm:w-8" />
                        )}
                        {index === 2 && (
                          <FaHandshake className="h-7 w-7 sm:h-8 sm:w-8" />
                        )}
                        {index === 3 && (
                          <FaShieldAlt className="h-7 w-7 sm:h-8 sm:w-8" />
                        )}
                        {index === 4 && (
                          <FaGlobeAmericas className="h-7 w-7 sm:h-8 sm:w-8" />
                        )}
                      </div>
                    </div>

                    {/* content */}
                    <div className="min-w-0">
                      <p className="type-h5 font-semibold transition-colors duration-300 group-hover:text-(--color-primary)">
                        {item.title}
                      </p>
                      <p className=" text-sm leading-6 text-(--muted-color)">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* BUTTON */}
            <ScrollReveal delay={300}>
              <div className="mt-10">
                <Button href={getContactFormHref("touch")} label="Contact Us" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQs section  */}

      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <ScrollReveal>
            <SectionBadge>FAQs</SectionBadge>
            <p className="mt-3 type-h2 font-semibold">
              Clear Answers.
              <br />
              Confident Decisions.
            </p>

            {/* Using your custom Button component */}
            <div className="mt-6">
              <Button
                label={`Read More`}
                onClick={() => setIsFaqModalOpen(true)}
                size="md"
                icon={FiArrowRight} // Swapping default icon if you want a horizontal arrow
                className="bg-transparent text-[#0f243a] border border-[#0f243a]/20 hover:bg-[#0f243a] hover:text-white transition-all duration-300"
              />
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {previewFaqs.map((item, index) => (
              <ScrollReveal key={item.q} delay={index * 70}>
                <FaqItem q={item.q} a={item.a} />
              </ScrollReveal>
            ))}

            {faqs.length > PREVIEW_COUNT && (
              <div className="pt-4 text-center">
                <button
                  onClick={() => setIsFaqModalOpen(true)}
                  className="text-sm font-medium text-[#0f243a]/60 hover:text-[#0f243a] transition-colors"
                >
                  + Show {faqs.length - PREVIEW_COUNT} more
                </button>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {isFaqModalOpen && (
            <FaqModal onClose={() => setIsFaqModalOpen(false)} allFaqs={faqs} />
          )}
        </AnimatePresence>
      </SectionWrapper>
    </PageTransition>
  );
}