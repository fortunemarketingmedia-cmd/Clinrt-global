"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FullScreenCard } from "@/hooks/FullScreenCard";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/GlassCard";
import SectionBadge from "@/components/ui/SectionBadge";
import { FiActivity, FiArrowRight, FiCheck, FiZap } from "react-icons/fi";
import StudyFlowSvg from "@/components/StudyFlowSvg";
import { cn } from "@/lib/cn";
import { getContactFormHref } from "@/data";
import {
  iclinrtPotential as iclinrtPotential,
  iclinrtPotentialMedia as potentialMedia,
  iclinrtProblemSolutions as problemSolutions,
  iclinrtRegulatoryStandards as regulatoryStandards,
  iclinrtServiceMedia as serviceMedia,
  iclinrtServices as iclinrtServices,
  iclinrtStudyTypes as studyTypes,
  iclinrtUsps as iclinrtUsps,
  iclinrtUspIcons as uspIcons,
} from "@/data";

type StickyCardsProps = {
  iclinrtUsps: typeof iclinrtUsps;
  activeIndex: number;
  onSelect: (index: number) => void;
};

type StickyCardItem = (typeof iclinrtUsps)[number];

const StickyCards = ({
  iclinrtUsps,
  activeIndex,
  onSelect,
}: StickyCardsProps) => {
  const totalCards = iclinrtUsps.length;

  function handlePrevious() {
    onSelect((activeIndex - 1 + totalCards) % totalCards);
  }

  function handleNext() {
    onSelect((activeIndex + 1) % totalCards);
  }

  return (
    <div className="relative min-h-160 overflow-hidden rounded-4xl border border-white/10 shadow-[0_24px_80px_rgba(4,18,33,0.18)] sm:min-h-[44rem] lg:h-[min(42rem,calc(100vh-5.75rem))]">
      <div className="pointer-events-none absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/usp-video.webm"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,27,46,0.8)_0%,rgba(8,27,46,0.5)_40%,rgba(8,27,46,0.82)_100%)]" />
        <div className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-sky-300/18 blur-3xl" />
        <div className="absolute -right-10 bottom-4 h-64 w-64 rounded-full bg-orange-300/16 blur-3xl" />
      </div>

      <div className="relative grid h-full gap-4 p-3 sm:p-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-5 lg:p-5">
        <div className="relative min-h-92 sm:min-h-104 lg:min-h-0">
          {iclinrtUsps.map((item: StickyCardItem, index: number) => {
            const Icon = uspIcons[index % uspIcons.length] || FiZap;

            return (
              <FullScreenCard
                key={item.title}
                item={item}
                index={index}
                activeIndex={activeIndex}
                Icon={Icon}
              />
            );
          })}
        </div>

        <div className="relative rounded-[1.6rem] border border-white/12 bg-white/8 p-3 backdrop-blur md:p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <SectionBadge>
                <span className="text-white">USP</span>
              </SectionBadge>
              <p className="mt-2 text-lg font-semibold text-white">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(totalCards).padStart(2, "0")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevious}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 transition hover:bg-white/16"
                aria-label="Show previous USP"
              >
                <FiArrowRight className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 transition hover:bg-white/16"
                aria-label="Show next USP"
              >
                <FiArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {iclinrtUsps.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => onSelect(index)}
                onMouseEnter={() => onSelect(index)}
                className={cn(
                  "min-h-[4rem] rounded-2xl border px-2.5 py-2.5 text-left transition duration-300",
                  activeIndex === index
                    ? "border-white/28 bg-white/18 text-white shadow-[0_16px_36px_rgba(4,18,33,0.18)]"
                    : "border-white/10 bg-white/6 text-white/72 hover:border-white/18 hover:bg-white/10",
                )}
                aria-pressed={activeIndex === index}
              >
                <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-[11px] font-medium leading-[1.125rem] sm:text-[13px] sm:leading-5">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function IclinrtPage() {
  const reduceMotion = useReducedMotion();
  const regulatoryTrack = [...regulatoryStandards, ...regulatoryStandards];
  const problemTrack = [...problemSolutions, ...problemSolutions];
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(
    null,
  );
  const [selectedPotentialIndex, setSelectedPotentialIndex] = useState(0);
  const [activeUspIndex, setActiveUspIndex] = useState(0);

  const activeService =
    activeServiceIndex !== null ? iclinrtServices[activeServiceIndex] : null;
  const activeServiceMedia =
    activeServiceIndex !== null
      ? serviceMedia[activeServiceIndex % serviceMedia.length]
      : null;
  const activePotential = iclinrtPotential[selectedPotentialIndex];
  const activePotentialMedia =
    potentialMedia[selectedPotentialIndex % potentialMedia.length];

  useEffect(() => {
    if (activeServiceIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveServiceIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeServiceIndex]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (activeServiceIndex !== null) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [activeServiceIndex]);
  return (
    <PageTransition>
      <section className="relative flex min-h-[90vh] items-end overflow-hidden sm:min-h-screen lg:min-h-[110vh]">
        <Image
          src="/images/Configuration That Matters_compressed.webp"
          alt="Background"
          fill
          loading="lazy"
          className="object-cover scale-105"
          sizes="100vw" // Helps with responsive loading
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(224,242,254,0.2)_0%,rgba(167,243,208,0.16)_22%,rgba(14,116,144,0.4)_52%,rgba(15,23,42,0.84)_100%)]" />
        <div className="hero-content-lift relative z-10 section-shell w-full pb-12 pt-24 text-white sm:pb-16 sm:pt-28 md:pb-20 md:pt-36 lg:pb-20">
          <ScrollReveal className="mb-8 max-w-3xl text-white sm:mb-12 lg:mb-20">
            <Image
              src="/images/logo-final.png"
              alt="ClinRT Logo"
              width={250}
              height={82}
              loading="lazy"
              // className="rounded-[1.75rem] border border-white/14 bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_58%,rgba(255,255,255,0.05)_100%)] px-3 py-2 shadow-[0_18px_40px_rgba(8,20,35,0.14)] backdrop-blur-[18px] transition duration-300 hover:border-white/20 sm:px-4"
            />
            <p className="mt-4 page-banner-title font-semibold text-white">
              Configuration That Matters
            </p>
            <p className="mt-4 text-white/85">
              Your Trial&apos;s Operational Control Center.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href={getContactFormHref("touch")} label="Contact Us" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionWrapper
        id="iclinrt-overview"
        fullBleed
        className="bg-(--color-primary)"
      >
        <div className="mx-auto rounded-3xl bg-white px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <ScrollReveal>
              <SectionBadge>What is iClinRT</SectionBadge>
              <p className="mt-3 type-h2 font-semibold">
                Your Trial&apos;s Operational Control Center.
              </p>

              <p className="mt-3 type-h6 text-(--muted-color)">
                iClinRT is ClinRT&apos;s dynamic, fully configurable Interactive
                Response Technology platform designed to streamline and
                safeguard clinical trial execution across the globe. It serves
                as the central coordination engine that connects subject
                workflows, treatment allocation logic, supply movement, site
                actions, and real-time insights ensuring your trial runs exactly
                as designed.
              </p>
              <p className="mt-3 text-sm text-(--muted-color)">
                It understands your protocol, adapts to study complexity, and
                ensures each operational step is executed with precision,
                visibility, and compliance.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button href={getContactFormHref("touch")} label="Contact Us" />
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <Link className="link" href="/contact">
                  Your Trial&apos;s Operational Control Center.
                </Link>

                <Link className="link" href="/">
                  Discover What Sets Us Apart
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <div className="relative h-full min-h-80 overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
                <video
                  className="h-full w-full object-contain"
                  // src="/videos/infographic.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                >
                  <source src="/videos/infographicv6.webm" type="video/webm" />
                </video>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed id="iclinrt-services">
        <LayoutGroup id="iclinrt-services">
          {/* HEADING */}
          <ScrollReveal>
            <div className="mb-12">
              <SectionBadge>Services iClinRT Delivers</SectionBadge>
              <h2 className="mt-3 type-h2 font-semibold max-w-2xl">
                Operational depth for every subject and kit movement
              </h2>
            </div>
          </ScrollReveal>

          {/* GRID */}
          <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
            {iclinrtServices.map((service, index) => (
              <ScrollReveal key={index} delay={index * 60}>
                <motion.div
                  layoutId={`service-card-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="group relative cursor-pointer h-full"
                  onClick={() => setActiveServiceIndex(index)}
                  tabIndex={0}
                  role="button"
                  aria-haspopup="dialog"
                  aria-expanded={activeServiceIndex === index}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveServiceIndex(index);
                    }
                  }}
                >
                  <GlassCard
                    image={serviceMedia[index % serviceMedia.length]}
                    height="h-72 sm:h-80 lg:h-92"
                    contentPadding="p-6"
                    overlayOpacity="bg-gradient-to-b from-black/20 via-black/50 to-black/90"
                    borderColor="border-white/10"
                    className="
                relative overflow-hidden rounded-2xl
                bg-white/5 backdrop-blur-xl shadow-md
                border border-white/10
                transition-all duration-500 ease-out
                group-hover:scale-[1.02]
                group-hover:-translate-y-2
                group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]
                group-hover:border-white/25
              "
                    imageClassName="
                transition-all duration-700 ease-out
                group-hover:scale-120
              "
                  >
                    {/* SERVICE NUMBER */}
                    <div className="flex items-center justify-between text-[10px]  tracking-[0.3em] text-white/80">
                      <span>{`${String(index + 1).padStart(2, "0")}`}</span>
                      <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] backdrop-blur-sm border border-white/10">
                        iClinRT
                      </span>
                    </div>
                    {/* TITLE */}
                    <div className="flex flex-3 items-center justify-center">
                      <p className="type-h4 max-w-full text-center font-semibold leading-snug text-white">
                        {service.title}
                      </p>
                    </div>

                    {/* READ MORE CTA */}
                    <div className="mt-6 flex justify-end">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-white opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 backdrop-blur-sm">
                        Read More
                        <FiArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    {/* GLOW */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_100%,rgba(131,133,188,0.15),transparent_60%)]" />
                  </GlassCard>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* MODAL - unchanged */}
          <AnimatePresence>
            {activeService && activeServiceMedia && (
              <motion.div
                className="fixed inset-0 z-60 flex items-center justify-center px-4 py-8 sm:px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
                role="dialog"
                aria-modal="true"
              >
                <motion.div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setActiveServiceIndex(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  layoutId={`service-card-${activeServiceIndex}`}
                  className="relative z-10 w-full max-w-5xl"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 160, damping: 22 }
                  }
                  onClick={(event) => event.stopPropagation()}
                >
                  <GlassCard
                    image={activeServiceMedia}
                    height="min-h-[70vh] md:min-h-[75vh]"
                    contentPadding="p-6 sm:p-8 md:p-10"
                    contentPosition="top"
                    overlayOpacity="bg-gradient-to-b from-black/40 via-black/70 to-black/95"
                    borderColor="border-white/20"
                    hoverEffect="none"
                    className="bg-white/10 backdrop-blur-2xl shadow-[0_35px_120px_rgba(0,0,0,0.6)]"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveServiceIndex(null)}
                      className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 transition hover:bg-white/20"
                      aria-label="Close modal"
                    >
                      X
                    </button>
                    <div className="flex items-center gap-3 text-[10px]  tracking-[0.3em] text-white/70">
                      <span>{`Service ${String((activeServiceIndex ?? 0) + 1).padStart(2, "0")}`}</span>
                      <span className="rounded-full bg-white/15 px-2 py-1 text-[10px]">
                        iClinRT
                      </span>
                    </div>
                    <p className="mt-3 type-h2 font-semibold text-white">
                      {activeService.title}
                    </p>
                    <p className="mt-2 text-sm text-white">
                      Every workflow, rule, and operational detail for this
                      service is listed below in full.
                    </p>
                    <div className="mt-6 max-h-[40vh] overflow-y-auto pr-2 no-scrollbar">
                      <ul className="space-y-3 type-h4 text-white/90">
                        {activeService.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-white/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button href="/contact" label="Talk to ClinRT" />
                      <Button href="/what-we-build" label="See What We Build" />
                    </div>
                  </GlassCard>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <div className="mx-auto rounded-3xl bg-(--primary-color) px-6 py-14 text-white md:px-10">
          <ScrollReveal>
            <SectionBadge>Global Compliance</SectionBadge>
            <p className="mt-3 type-h2 font-semibold text-white">
              Built to meet global regulatory and data-integrity requirements
            </p>
          </ScrollReveal>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/20 bg-white/5">
            <div className="flex w-max animate-[ticker_30s_linear_infinite] items-center gap-4 px-6 py-5">
              {regulatoryTrack.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className="flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/90"
                >
                  {Boolean(item.logo) ? (
                    <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-white px-1.5">
                      <Image
                        src={item.logo}
                        alt={item.label + " logo"}
                        width={52}
                        height={76}
                        loading="lazy"
                        className="h-auto max-h-6 w-auto object-contain"
                      />
                    </span>
                  ) : (
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 px-1 text-[10px] font-semibold">
                      {item.abbr}
                    </span>
                  )}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed id="iclinrt-potential">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/30 bg-(--primary-color) px-4 py-6 text-white shadow-[0_30px_120px_rgba(15,23,42,0.2)] sm:px-6 sm:py-8 md:px-8 md:py-10">
          <div className="pointer-events-none absolute -left-16 top-10 h-48 w-48 rounded-full bg-(--color-accent)/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-6 h-64 w-64 rounded-full bg-(--color-orange)/20 blur-3xl" />
          <div className="relative z-10 grid gap-8 xl:grid-cols-[0.7fr_1.3fr] xl:items-start">
            <div>
              <ScrollReveal>
                <SectionBadge>iClinRT&apos;s Potential</SectionBadge>
              </ScrollReveal>

              <div className="mt-6 max-h-96 space-y-3 overflow-y-auto pr-2 no-scrollbar sm:mt-8 sm:max-h-112 xl:max-h-140">
                {iclinrtPotential.map((item, index) => {
                  const isActive = selectedPotentialIndex === index;

                  return (
                    <motion.button
                      key={item.title}
                      type="button"
                      onClick={() => setSelectedPotentialIndex(index)}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ delay: reduceMotion ? 0 : index * 0.04 }}
                      className={`w-full rounded-3xl border px-4 py-4 text-left transition duration-300 ${
                        isActive
                          ? "border-white/30 bg-white/15 shadow-lg"
                          : "border-white/12 bg-white/10 hover:border-white/20 hover:bg-white/12"
                      }`}
                      aria-pressed={isActive}
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-sm font-semibold ${
                            isActive
                              ? "border-white/25 bg-white/15 text-white"
                              : "border-white/10 bg-black/10 text-white/70"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-base font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-white/68">
                            {item.items[0]}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPotentialIndex}
                initial={
                  reduceMotion ? undefined : { opacity: 0, y: 20, scale: 0.98 }
                }
                animate={
                  reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
                }
                exit={
                  reduceMotion ? undefined : { opacity: 0, y: -20, scale: 0.99 }
                }
                transition={
                  reduceMotion ? undefined : { duration: 0.35, ease: "easeOut" }
                }
                className="relative"
              >
                <GlassCard
                  image={activePotentialMedia}
                  height="min-h-[26rem] sm:min-h-[32rem] lg:min-h-[38rem]"
                  contentPadding="p-5 sm:p-6 lg:p-8"
                  contentPosition="top"
                  overlayOpacity="bg-gradient-to-b from-black/25 via-black/55 to-black/88"
                  hoverEffect="none"
                  borderColor="border-white/18"
                  className="bg-white/10 backdrop-blur-2xl shadow-[0_35px_100px_rgba(0,0,0,0.35)]"
                  imageClassName={
                    reduceMotion
                      ? "object-cover"
                      : "object-cover scale-[1.02] transition duration-700"
                  }
                >
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/80">
                        {`Potential ${String(selectedPotentialIndex + 1).padStart(2, "0")}`}
                      </span>
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70">
                        Large Focus View
                      </span>
                    </div>

                    <div className="mt-8">
                      <div className="max-w-3xl rounded-[1.75rem] p-5 backdrop-blur-sm sm:p-6">
                        <p className="type-h2 font-semibold text-white">
                          {activePotential.title}
                        </p>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">
                          Built to deliver clarity, control, and speed across
                          every operational layer while keeping teams aligned
                          with protocol and supply realities.
                        </p>
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          {activePotential.items.map((point) => (
                            <div
                              key={point}
                              className="rounded-[1.25rem] border border-white/12 bg-black/10 px-4 py-4 text-sm leading-6 text-white/88"
                            >
                              <div className="flex gap-3">
                                <span className="mt-1.5 h-2 w-2 rounded-full bg-white/75" />
                                <span>{point}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                          <Button
                            href={getContactFormHref("demo")}
                            label="Request a Demo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <div className="rounded-3xl border bg-white/70 p-4 shadow-xl backdrop-blur-xl sm:p-6 md:p-8 lg:p-10">
          <SectionBadge>How it works</SectionBadge>
          <StudyFlowSvg />
        </div>
      </SectionWrapper> 

      <SectionWrapper fullBleed>
        <ScrollReveal delay={120}>
          <div className="relative mt-6 overflow-hidden rounded-4xl border border-white/50 shadow-xl">
            {/* LEFT BG - gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-orange-100/90 via-white/95 to-sky-100/90 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(100,102,174,0.08)_0%,rgba(100,102,174,0.22)_100%)] md:hidden" />

            {/* RIGHT BG - solid primary color with diagonal clip */}
            <div
              className="absolute inset-0 hidden bg-(--primary-color) md:block"
              style={{
                clipPath: "polygon(45% 0%, 100% 0%, 100% 100%, 35% 100%)",
              }}
            />

            {/* DECORATIVE */}
            <div className="pointer-events-none absolute -left-10 top-8 h-40 w-40 rounded-full bg-(--color-accent)/20 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-(--color-orange)/20 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-black/10 to-transparent" />

            <div className="relative z-10 grid gap-6 p-4 sm:p-6 md:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              {/* LEFT CONTENT */}
              <div>
                <SectionBadge>
                  <span className="inline-flex items-center gap-2">
                    Study Types We Support
                  </span>
                </SectionBadge>
                <p className="mt-3 type-h2 font-semibold">
                  Built for complex programs across phases, therapies, and
                  regions
                </p>
                <p className="type-h6 mt-4 max-w-xl text-(--muted-color)">
                  iClinRT adapts to nuanced trial designs without losing control
                  of supply, protocol execution, or inspection-ready
                  documentation.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/50 bg-white/70 p-5 shadow-sm backdrop-blur">
                    <p className="type-h6 uppercase tracking-[0.3em] text-(--muted-color)">
                      Coverage
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-(--primary-color)">
                      {studyTypes.length.toString().padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-sm text-black">
                      study archetypes represented in this capability view.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/50 bg-black/3 p-5 shadow-sm backdrop-blur">
                    <p className="type-h6 uppercase tracking-[0.3em] text-(--muted-color)">
                      Operating Mode
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-(--primary-color)">
                      Global-ready
                    </p>
                    <p className="mt-2 text-sm text-black">
                      Supports adaptive designs, regional supply complexity, and
                      cross-functional teams.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-[1.75rem] border border-white/50 bg-white/80 p-5 shadow-sm backdrop-blur">
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="relative mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-accent)/10 text-(--primary-color)"
                      animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                      transition={
                        reduceMotion
                          ? undefined
                          : {
                              duration: 4.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }
                      }
                    >
                      <span className="absolute inset-0 rounded-2xl border border-black/10" />
                      <FiZap className="relative h-5 w-5" />
                    </motion.div>

                    <div>
                      <p className="type-h6 uppercase tracking-[0.3em] text-(--muted-color)">
                        Operational Fit
                      </p>
                      <p className="mt-2 text-sm leading-6 text-black">
                        iClinRT supports early to late phase studies, adaptive
                        designs, and global programs that require precision
                        supply, protocol control, and inspection-ready
                        documentation.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {[
                          "Protocol control",
                          "Supply precision",
                          "Inspection-ready docs",
                        ].map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-black/5 bg-black/3 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-(--muted-color)"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT CONTENT - white text on dark bg */}
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-transparent p-3 sm:p-5 2xl:min-h-[47rem]">
                <div className="pointer-events-none absolute inset-4 rounded-3xl border border-white/20" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 24, repeat: Infinity, ease: "linear" }
                  }
                />

                <motion.div
                  className="relative z-10 mx-auto flex h-40 w-full max-w-[18rem] flex-col justify-center rounded-[1.75rem] border border-white/20 bg-white/10 px-6 py-5 text-center shadow-lg backdrop-blur 2xl:absolute 2xl:left-1/2 2xl:top-1/2 2xl:mb-0 2xl:h-48 2xl:w-48 2xl:-translate-x-1/2 2xl:-translate-y-1/2"
                  animate={
                    reduceMotion
                      ? undefined
                      : { y: [0, -8, 0], scale: [1, 1.02, 1] }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  <div className="type-h6 uppercase tracking-[0.35em] text-white/60">
                    Trial Spectrum
                  </div>
                  <p className="mt-3 text-4xl font-semibold text-white">
                    Precision
                  </p>
                  <p className="mt-2 text-sm text-white/60">
                    Matching randomization, supply, and oversight to study
                    complexity.
                  </p>
                </motion.div>

                <div className="relative z-10 mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:absolute 2xl:inset-0 2xl:mt-0 2xl:block">
                  {studyTypes.map((type, index) => {
                    const Icon = type.icon;
                    return (
                      <motion.div
                        key={type.label}
                        className={`rounded-3xl border border-white/25 bg-white/12 p-5 shadow-lg backdrop-blur transition-transform duration-300 hover:-translate-y-1.5 2xl:absolute 2xl:min-h-[10.5rem] 2xl:w-[220px] ${type.position}`}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.45,
                          delay: reduceMotion ? 0 : index * 0.08,
                        }}
                        whileHover={
                          reduceMotion ? undefined : { y: -6, scale: 1.02 }
                        }
                      >
                        <motion.div
                          animate={
                            reduceMotion
                              ? undefined
                              : {
                                  y: [0, index % 2 === 0 ? -8 : 8, 0],
                                  x: [0, index % 3 === 0 ? 4 : -4, 0],
                                }
                          }
                          transition={
                            reduceMotion
                              ? undefined
                              : {
                                  duration: 5.5 + index * 0.35,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }
                          }
                        >
                          <div className="flex items-center justify-between">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white">
                              <Icon className="h-5 w-5" />
                            </span>
                            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
                              {(index + 1).toString().padStart(2, "0")}
                            </span>
                          </div>
                          <div className="mt-4 flex items-start gap-2">
                            <span
                              className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${type.dotClass}`}
                            />
                            <p className="text-base leading-snug font-semibold text-white">
                              {type.label}
                            </p>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-white/80">
                            {type.detail}
                          </p>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper
        fullBleed
        id="iclinrt-usps"
        className="py-1 sm:py-3 md:py-4 lg:py-5"
      >
        <div className="relative space-y-4">
          <StickyCards
            iclinrtUsps={iclinrtUsps}
            activeIndex={activeUspIndex}
            onSelect={setActiveUspIndex}
          />
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <div className="relative mx-auto overflow-hidden rounded-3xl border border-white/40 bg-white/70 px-4 py-10 shadow-xl backdrop-blur-2xl sm:px-6 sm:py-12 md:px-10 md:py-14">
          <div className="pointer-events-none absolute -left-16 top-10 h-52 w-52 rounded-full bg-(--color-accent)/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-6 h-64 w-64 rounded-full bg-(--color-orange)/25 blur-3xl" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <ScrollReveal>
              <SectionBadge>
                <span className="inline-flex items-center gap-2">
                  Problem to Solution
                </span>
              </SectionBadge>
              <p className="mt-3 type-h2 font-semibold">
                Solve operational bottlenecks with iClinRT
              </p>
              <p className="mt-4 text-(--muted-color)">
                Each real-world problem is matched to a concrete operational
                solution, rolling continuously for quick scanning.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button href="/contact" label="Talk to the ClinRT team" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="relative h-[28rem] overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-4 shadow-xl backdrop-blur-2xl sm:h-[32rem] sm:p-6">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-white/80 via-white/40 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white/80 via-white/40 to-transparent" />

                <motion.div
                  className="space-y-4 pr-1"
                  animate={reduceMotion ? undefined : { y: ["0%", "-50%"] }}
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 90, repeat: Infinity, ease: "linear" }
                  }
                >
                  {problemTrack.map((item, index) => (
                    <div
                      key={`${item.problem}-${index}`}
                      className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-(--color-accent)/25 blur-2xl" />
                        <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-(--color-orange)/20 blur-2xl" />
                      </div>
                      <div className="relative z-10 flex items-start gap-3">
                        <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-(--color-orange)/30 bg-(--color-orange)/10 text-(--color-orange)">
                          <FiActivity className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-(--muted-color)">
                            Problem
                          </p>
                          <p className="mt-1 type-h5 font-semibold text-(--primary-color)">
                            {item.problem}
                          </p>
                          <div className="mt-3 flex items-start gap-2 type-h6 text-(--muted-color)">
                            <FiCheck className="mt-0.5 h-4 w-4 text-(--color-orange)" />
                            <span>{item.solution}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <div className="relative mx-auto overflow-hidden rounded-3xl border border-white/25 bg-(--color-primary) px-4 py-12 text-center text-white shadow-2xl sm:px-6 sm:py-14 md:px-10">
          <ScrollReveal>
            <div className="flex flex-col items-center">
              <SectionBadge>
                <span className="inline-flex items-center justify-center gap-2">
                  Ready to See iClinRT
                </span>
              </SectionBadge>
              <p className="mt-3 type-h2 font-semibold text-(--text-invert)">
                Bring operational clarity to every trial milestone
              </p>
              <p className="mt-4 max-w-2xl text-(--text-invert)">
                Connect your teams, sites, and supply workflows with a platform
                designed for protocol fidelity, compliance, and real-time
                insight.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <Button href="/contact" label="Request iClinRT Demo" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
