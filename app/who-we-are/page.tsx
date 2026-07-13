"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CountUpOnView from "@/components/CountUpOnView";
import Button from "@/components/ui/Button";
import SectionBadge from "@/components/ui/SectionBadge";
import CultureGraphic from "@/components/CultureGraphic";
import {
  FiCheck,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { useRef, useState } from "react";
import { IconType } from "react-icons";
import {
  whoWeAreCulture as culture,
  whoWeAreHowWeWorkPoints as howWeWorkPoints,
  whoWeAreLeadershipPrinciples as leadershipPrinciples,
  whoWeAreMeaningPoints as meaningPoints,
  whoWeAreMissionPoints as missionPoints,
  whoWeAreTeamStats as teamStats,
  whoWeAreWhatThisMeansPoints as whatThisMeansPoints,
} from "@/data";

/* ---------------- UI helpers ---------------- */

type StickyCardsProps = {
  iclinrtUsps: readonly string[];
};

type EnhancedPoint = {
  title: string;
  icon: IconType;
  color: string;
  description: string;
  metrics: string;
};

const StickyCards = ({ iclinrtUsps }: StickyCardsProps) => {
  const iconMap: IconType[] = [FiStar, FiShield, FiTrendingUp, FiUsers];
  const colorMap = [
    "from-blue-500 to-cyan-400",
    "from-emerald-500 to-teal-400",
    "from-purple-500 to-pink-400",
    "from-orange-500 to-amber-400",
  ];
  const descriptionMap = [
    "Years of specialized expertise in complex trial management",
    "Precision delivery under regulatory scrutiny",
    "End-to-end accountability with measurable results",
    "Collaborative relationships that drive success",
  ];
  const metricsMap = [
    "98% client satisfaction",
    "100% inspection readiness",
    "99.9% on-time delivery",
    "5+ years average partnership",
  ];

  const enhancedPoints: EnhancedPoint[] = iclinrtUsps.map((title, index) => ({
    title,
    icon: iconMap[index % iconMap.length],
    color: colorMap[index % colorMap.length],
    description: descriptionMap[index % descriptionMap.length],
    metrics: metricsMap[index % metricsMap.length],
  }));

  // Predefined deterministic positions for particles
  const getParticlePosition = (index: number, particleIndex: number) => {
    const positions = [
      { x: "15%", y: "25%" },
      { x: "75%", y: "85%" },
      { x: "45%", y: "15%" },
      { x: "85%", y: "45%" },
      { x: "25%", y: "75%" },
      { x: "65%", y: "55%" },
    ];
    return positions[particleIndex % positions.length];
  };

  return (
    <div className="relative w-full py-3 sm:py-4 md:py-5">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 h-56 w-56 rounded-full bg-linear-to-r from-sky-200/60 to-cyan-100/45 blur-[80px] animate-pulse md:h-[22rem] md:w-[22rem] md:blur-[95px]" />
        <div className="absolute bottom-1/4 -right-1/4 h-56 w-56 rounded-full bg-linear-to-r from-orange-200/45 to-amber-100/40 blur-[80px] animate-pulse animation-delay-1000 md:h-[22rem] md:w-[22rem] md:blur-[95px]" />
      </div>

      {/* Cards Grid */}
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-3 px-0 sm:gap-4 sm:px-3 md:grid-cols-2 md:gap-5">
        {enhancedPoints.map((point, index) => {
          const Icon = point.icon;

          return (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative"
            >
              <div
                className={`
                  relative overflow-hidden rounded-3xl 
                  bg-linear-to-br ${point.color}
                  p-0.5 shadow-2xl
                  transition-all duration-300
                `}
              >
                <div className="relative h-full rounded-3xl bg-blue-800/40 p-4 backdrop-blur-xl sm:p-5 md:p-6">
                  {/* Animated background effect */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-white/5 to-transparent"
                    animate={{
                      x: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <div className="relative z-10">
                    {/* Header with icon and badge */}
                    <div className="mb-4 flex items-start justify-between">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        className={`
                          rounded-2xl bg-linear-to-br p-2.5 ${point.color}
                          shadow-lg
                        `}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </motion.div>
                    </div>

                    {/* Title */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                      className="mb-2.5 text-lg font-bold text-white sm:text-xl md:text-2xl xl:text-[1.7rem]"
                    >
                      {point.title}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                      className="mb-4 text-xs leading-[1.35rem] text-white/72 sm:text-sm sm:leading-6 md:text-[0.95rem]"
                    >
                      {point.description}
                    </motion.p>

                    {/* Animated progress indicator */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.6 }}
                      className="h-[2px] bg-linear-to-r from-white/50 to-white/20 origin-left"
                    />

                    {/* Floating particles effect */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/20 rounded-full"
                          initial={getParticlePosition(index, i)}
                          animate={{
                            y: [null, -20, 20, -10, 0],
                            x: [null, 10, -10, 5, 0],
                            opacity: [0, 0.5, 0.3, 0.5, 0],
                          }}
                          transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Counter badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.8 }}
                className="absolute -right-2.5 -top-2.5 sm:-right-3 sm:-top-3 md:-right-4 md:-top-4"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-white to-slate-200 shadow-lg sm:h-10 sm:w-10 md:h-11 md:w-11">
                  <span className="text-[11px] font-bold text-slate-900 sm:text-xs md:text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/* ---------------- Page ---------------- */

export default function WhoWeArePage() {
  const [activeCultureCard, setActiveCultureCard] = useState(0);
  const uspsSectionRef = useRef<HTMLDivElement | null>(null);
  const revealUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  } as const;
  const cinematicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const overviewLines = [
    "We are a team",
    "of people who",
    "work closely with",
    "clinical research teams",
  ];
  const impactLines = ["Our experience", "helps research", "teams thrive"];
  const overviewStats = [{ value: "50+", label: "Years in ctsm" }];

  return (
    <PageTransition>
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[82svh] items-end overflow-hidden sm:min-h-screen">
        <Image
          src="/images/Experienced people. Thoughtful work. Trusted outcomes.webp"
          alt="Background"
          fill
          loading="lazy"
          className="object-cover scale-105"
          sizes="100vw" // Helps with responsive loading
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(224,242,254,0.2)_0%,rgba(167,243,208,0.16)_22%,rgba(14,116,144,0.4)_52%,rgba(15,23,42,0.84)_100%)]" />

        {/* animated gradient blobs */}
        <motion.div
          className="absolute left-4 top-24 h-52 w-52 rounded-full bg-green-400/20 blur-3xl sm:left-10 sm:top-20 sm:h-72 sm:w-72"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-16 right-0 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl sm:bottom-20 sm:right-10 sm:h-80 sm:w-80"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="hero-content-lift relative z-10 flex h-full items-end section-shell pb-12 pt-24 text-white sm:pb-16 sm:pt-28 md:pb-20 lg:pb-24">
          <ScrollReveal className="max-w-3xl">
            <p className="mt-6 max-w-3xl page-banner-title font-semibold">
              Experienced people.
              <br />
              Thoughtful work.
              <br />
              Trusted outcomes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/65">
                Know more
              </p>
              <Button href="#leadership" label="Leadership" size="sm" />
              <Button href="#culture" label="Culture" size="sm" />
              <Button href="#team" label="Team" size="sm" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= WHAT IT MEANS ================= */}
      <SectionWrapper fullBleed>
        <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-(--color-primary) p-8 shadow-[0_28px_90px_rgba(2,6,23,0.55)] md:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_55%_at_50%_-10%,rgba(125,168,255,0.2),transparent)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_45%_at_85%_85%,rgba(249,115,22,0.12),transparent)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.045] bg-[linear-gradient(rgba(255,255,255,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:76px_76px]" />
          <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-white/12 to-transparent" />

          <motion.div
            className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-blue-400/15 blur-[90px]"
            animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-14 bottom-0 h-72 w-72 rounded-full bg-orange-400/12 blur-[95px]"
            animate={{ y: [0, 20, 0], x: [0, -12, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative grid gap-14 text-white lg:grid-cols-2 lg:items-start">
            <ScrollReveal className="max-w-3xl">
              <motion.div
                {...revealUp}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <SectionBadge>Overview</SectionBadge>
                </motion.div>

                <div className="overflow-hidden">
                  {overviewLines.map((line, index) => (
                    <motion.div
                      key={line}
                      initial={{ opacity: 0, y: 60, skewY: 3 }}
                      whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.15 + index * 0.1,
                        ease: cinematicEase,
                      }}
                      viewport={{ once: true }}
                    >
                      <span className="block text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.6rem]">
                        {line}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  {...revealUp}
                  transition={{ duration: 0.7, delay: 0.62 }}
                  className="space-y-4 border-l border-white/12 pl-5"
                >
                  <p className="text-base leading-8 text-white/60">
                    Our background spans clinical operations, technology, and
                    delivery - giving us a practical view of what works and what
                    does not.
                  </p>
                  <p className="text-base leading-8 text-white/60">
                    We believe good work comes from clear thinking, strong
                    ownership, and dependable execution throughout the study
                    lifecycle.
                  </p>
                </motion.div>

                <motion.div
                  {...revealUp}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex flex-wrap items-center gap-8 pt-2"
                >
                  {overviewStats.map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <p className="text-3xl font-semibold text-white">
                        {stat.value}
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                  <div className="h-8 w-px bg-white/15" />
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="flex items-center gap-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-orange-400" />
                    <span className="text-[11px] uppercase tracking-[0.28em] text-orange-300/95">
                      Active
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal className="max-w-3xl">
              <motion.div
                {...revealUp}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="space-y-7 rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl md:p-8"
              >
                <motion.div
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <SectionBadge>What this means for you</SectionBadge>
                </motion.div>

                <div className="overflow-hidden">
                  {impactLines.map((line, index) => (
                    <motion.div
                      key={line}
                      initial={{ opacity: 0, y: 60, skewY: 3 }}
                      whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.28 + index * 0.1,
                        ease: cinematicEase,
                      }}
                      viewport={{ once: true }}
                    >
                      <span className="block type-h2 font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.5rem]">
                        {line}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.ul
                  {...revealUp}
                  transition={{ duration: 0.5, delay: 0.55 }}
                  className="space-y-2"
                >
                  {whatThisMeansPoints.map((point, i) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.55 + i * 0.08,
                        ease: cinematicEase,
                      }}
                      viewport={{ once: true }}
                      whileHover={{ x: 4, scale: 1.01 }}
                      className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                    >
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-400/70 text-white ring-1 ring-orange-400/25">
                        <FiCheck className="h-3.5 w-3.5" />
                      </span>
                      <p className="text-sm leading-7 text-white/65 transition-colors duration-300 group-hover:text-white/85">
                        {point}
                      </p>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  {...revealUp}
                  transition={{ duration: 0.6, delay: 0.85 }}
                  className="flex items-start gap-4 rounded-2xl border border-white/12 bg-linear-to-br from-white/10 to-white/4 px-5 py-5 backdrop-blur"
                >
                  <motion.span
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                    }}
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-400"
                  />
                  <p className="text-sm leading-7 text-white/70">
                    We aim to bring{" "}
                    <span className="font-medium text-white italic">
                      steadiness and order
                    </span>{" "}
                    to environments that are often fast moving and complex.
                  </p>
                </motion.div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(180deg,#85a6d2_0%,#eef5ff_48%,#eccb88_100%)] shadow-[0_30px_100px_rgba(148,163,184,0.18)]">
          {/* CINEMATIC BACKGROUND */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_18%_0%,rgba(125,168,255,0.3),transparent_62%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_46%_46%_at_100%_88%,rgba(251,146,60,0.18),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_42%_34%_at_52%_18%,rgba(255,255,255,0.82),transparent_72%)]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage: `linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)`,
              backgroundSize: "72px 72px",
            }}
          />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-sky-300/70 to-transparent" />
          <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-linear-to-r from-transparent via-orange-200/80 to-transparent" />

          {/* FLOATING ORBS */}
          <motion.div
            className="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-sky-300/45 blur-[110px]"
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-20 bottom-6 h-80 w-80 rounded-full bg-orange-200/55 blur-[120px]"
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
            {/* SECTION EYEBROW */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14 flex items-center gap-3"
            ></motion.div>

            <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
              {/* MISSION */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group relative flex-1 lg:flex-[1.4] rounded-2xl border border-white/70 bg-white/58 p-8 md:p-10 backdrop-blur-2xl shadow-[0_18px_50px_rgba(148,163,184,0.14)] transition-all duration-500 hover:border-white hover:bg-white/72 hover:shadow-[0_28px_80px_rgba(148,163,184,0.2)] cursor-default"
              >
                {/* CARD GLOW ON HOVER */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.82),transparent_62%)]" />

                {/* EYEBROW */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-5 bg-linear-to-r from-sky-500/75 to-transparent" />
                  <span className="type-h6 font-medium uppercase tracking-[0.4em] text-sky-700">
                    Mission
                  </span>
                </div>

                {/* HEADLINE */}
                <div className="overflow-hidden mb-6">
                  {[
                    "Supporting clinical",
                    "research teams with",
                    "practical ways of working",
                  ].map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 40, skewY: 2 }}
                      whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.65,
                        delay: 0.1 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span className="block text-2xl font-semibold leading-snug text-slate-950">
                        {line}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="mb-6 border-l border-slate-200/90 pl-4 text-sm leading-7 text-slate-600"
                >
                  We focus on improving coordination, strengthening visibility,
                  and supporting consistent execution across studies reflecting
                  real world needs.
                </motion.p>

                {/* POINTS */}
                <div className="space-y-2 mt-auto">
                  {missionPoints.map((point, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: 0.5 + idx * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-start gap-3 group/item"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 group-hover/item:bg-sky-400/80 transition-colors" />
                      <span className="text-sm italic leading-7 text-slate-500 group-hover/item:text-slate-700 transition-colors">
                        {point}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* VERTICAL DIVIDER */}
              <div className="hidden lg:block w-px bg-slate-200/80 mx-1" />

              {/* VISION */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="group relative flex-1 lg:flex-[1.2] rounded-2xl border border-white/70 bg-white/58 p-8 md:p-10 backdrop-blur-2xl shadow-[0_18px_50px_rgba(148,163,184,0.14)] transition-all duration-500 hover:border-white hover:bg-white/72 hover:shadow-[0_28px_80px_rgba(148,163,184,0.2)] cursor-default"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.82),transparent_62%)]" />

                {/* EYEBROW */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-5 bg-linear-to-r from-orange-500/75 to-transparent" />
                  <span className="type-h6 font-medium uppercase tracking-[0.4em] text-orange-600">
                    Vision
                  </span>
                </div>

                {/* HEADLINE */}
                <div className="overflow-hidden mb-6">
                  {["Clinical research,", "easier to run", "and manage"].map(
                    (line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40, skewY: 2 }}
                        whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.65,
                          delay: 0.2 + i * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span className="block text-2xl font-semibold leading-snug text-slate-950">
                          {line}
                        </span>
                      </motion.div>
                    ),
                  )}
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="border-l border-slate-200/90 pl-4 text-sm leading-7 text-slate-600"
                >
                  Clear information, connected ways of working, and dependable
                  support so studies move forward with fewer disruptions helping
                  research teams{" "}
                  <span className="font-medium text-slate-900">
                    focus on progress instead of process.
                  </span>
                </motion.p>

                {/* DECORATIVE STAT */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mt-8 flex items-center gap-6 border-t border-slate-200/90 pt-6"
                >
                  <div>
                    <p className="text-2xl font-semibold text-slate-950">
                      100%
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.3em] text-slate-500">
                      Research-focused
                    </p>
                  </div>
                  <div className="h-8 w-px bg-slate-200/90" />
                  <div>
                    <p className="text-2xl font-semibold text-slate-950">
                      Global
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.3em] text-slate-500">
                      Ready
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* VERTICAL DIVIDER */}
              <div className="hidden lg:block w-px bg-slate-200/80 mx-1" />

              {/* HOW WE WORK */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.24,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="group relative flex-1 rounded-2xl border border-white/70 bg-white/58 p-8 md:p-10 backdrop-blur-2xl shadow-[0_18px_50px_rgba(148,163,184,0.14)] transition-all duration-500 hover:border-white hover:bg-white/72 hover:shadow-[0_28px_80px_rgba(148,163,184,0.2)] cursor-default"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.82),transparent_62%)]" />

                {/* EYEBROW */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-5 bg-linear-to-r from-emerald-500/75 to-transparent" />
                  <span className="type-h6 font-medium uppercase tracking-[0.4em] text-emerald-600">
                    How We Work
                  </span>
                </div>

                {/* HEADLINE */}
                <div className="overflow-hidden mb-8">
                  {["Structured", "approach", "and consistent"].map(
                    (line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40, skewY: 2 }}
                        whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.65,
                          delay: 0.3 + i * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span className="block text-2xl font-semibold leading-snug text-slate-950">
                          {line}
                        </span>
                      </motion.div>
                    ),
                  )}
                </div>

                {/* POINTS */}
                <div className="space-y-2">
                  {howWeWorkPoints.map((point, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: 0.55 + idx * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ x: 4 }}
                      className="group/item flex items-start gap-3 rounded-xl border border-white/75 bg-white/62 px-4 py-3 transition-all duration-300 hover:border-emerald-200/90 hover:bg-white/85"
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/12 ring-1 ring-emerald-500/20">
                        <FiCheck className="h-3 w-3 text-emerald-600" />
                      </span>
                      <span className="text-sm leading-6 text-slate-600 group-hover/item:text-slate-900 transition-colors">
                        {point}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* LIVE INDICATOR */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                  className="mt-6 flex items-center gap-2"
                >
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-700/80">
                    Active approach
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed className="py-1 sm:py-3 md:py-4 lg:py-5">
        <ScrollReveal delay={120}>
          <div className="relative overflow-hidden rounded-3xl bg-[#f4f8fc] p-3 text-slate-950 shadow-[0_28px_80px_rgba(148,163,184,0.16)] sm:p-4 md:rounded-[28px] md:p-5 lg:p-6">
            {/* Animated background */}
            <motion.div
              className="pointer-events-none absolute inset-[-10%] opacity-85 sm:inset-[-8%]"
              animate={{
                x: ["0%", "2%", "-1%", "0%"],
                y: ["0%", "3%", "-2%", "0%"],
                scale: [1, 1.04, 0.99, 1],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(96,165,250,0.14),transparent_48%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_78%,rgba(251,146,60,0.12),transparent_44%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_36%,rgba(255,255,255,0.5),transparent_34%)]" />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-y-[-4%] right-[-14%] w-[96%] bg-(--primary-color) sm:right-[-10%] sm:w-[84%] md:right-[-6%] md:w-[72%]"
              style={{
                clipPath: "polygon(45% 0%, 100% 0%, 100% 100%, 35% 100%)",
              }}
              animate={{
                x: ["0%", "2%", "0%"],
                scale: [1, 1.015, 1],
                opacity: [0.92, 0.98, 0.92],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="pointer-events-none absolute -left-[18%] top-[-30%] hidden h-[170%] w-[44%] rotate-[14deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)] blur-3xl sm:block"
              animate={{
                x: ["0%", "135%", "0%"],
                opacity: [0, 0.38, 0],
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="pointer-events-none absolute right-[8%] top-[12%] h-36 w-36 rounded-full border border-white/14 sm:h-48 sm:w-48 md:right-[10%] md:top-[14%] md:h-64 md:w-64"
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.2, 0.42, 0.2],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="pointer-events-none absolute right-[11%] top-[15%] h-24 w-24 rounded-full border border-white/10 sm:h-36 sm:w-36 md:right-[13%] md:top-[17%] md:h-48 md:w-48"
              animate={{
                scale: [1, 1.14, 1],
                opacity: [0.12, 0.28, 0.12],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            />
            {/* Grid pattern */}
            <motion.div
              className="pointer-events-none absolute inset-[-3%] bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:18px_18px] sm:bg-[size:20px_20px] md:bg-[size:24px_24px]"
              animate={{
                x: [0, 10, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-[14%] h-px bg-linear-to-r from-transparent via-white/45 to-transparent md:top-[18%]"
              animate={{
                opacity: [0.2, 0.55, 0.2],
                scaleX: [0.92, 1, 0.92],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-sky-200/80 to-transparent sm:inset-x-6 md:inset-x-8" />
            <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-linear-to-r from-transparent via-orange-200/70 to-transparent sm:inset-x-6 md:inset-x-8" />

            <div className="relative z-10">
              <SectionBadge
                className="bg-white/70 text-slate-900 shadow-[0_10px_30px_rgba(148,163,184,0.12)] backdrop-blur-sm"
                borderClassName="border border-orange-300/80"
              >
                What We&lsquo;re Known For
              </SectionBadge>

              <div ref={uspsSectionRef} className="relative mt-4 md:mt-5">
                <StickyCards iclinrtUsps={meaningPoints} />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>
      {/* ================= LEADERSHIP ================= */}
      <SectionWrapper id="leadership" fullBleed className="scroll-mt-24">
        <div className="relative overflow-hidden rounded-[2.4rem] border border-black/8 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(125,211,252,0.16),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_30px_100px_rgba(15,23,42,0.08)] md:p-10">
          <div className="pointer-events-none absolute -left-10 top-10 h-36 w-36 rounded-full bg-orange-200/45 blur-3xl" />
          <div className="pointer-events-none absolute -right-8 bottom-0 h-44 w-44 rounded-full bg-sky-200/35 blur-3xl" />

          <div className="relative">
            <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
              <ScrollReveal className="max-w-3xl">
                <div className="max-w-3xl">
                  <SectionBadge>Our Leadership</SectionBadge>
                  <p className="mt-5 text-3xl font-semibold leading-tight text-black md:text-5xl">
                    Experience That Guides Our Direction
                  </p>
                  <p className="mt-5 text-base leading-8 text-black/65">
                    Our leadership team brings over 50 years of consolidated
                    experience in Clinical Trial Supply Management and IRT. With
                    over 1000 Trials and 500+ Clients served globally, we
                    deliver unmatched domain expertise and operational
                    excellence.
                  </p>
                  <p className="mt-4 text-base leading-8 text-black/58">
                    Their priority is to support teams with clarity and
                    direction, making thoughtful decisions that hold up across
                    programs, regions, and real world conditions.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={140}>
                <div className="rounded-[1.9rem] border border-black/8 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur md:p-7">
                  <SectionBadge> Principles We Lead By</SectionBadge>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {leadershipPrinciples.map((principle) => (
                      <div
                        key={principle.title}
                        className="rounded-2xl border border-black/8 bg-slate-50/90 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-black/12 hover:bg-white hover:shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/10 text-orange-600">
                            <FiCheck className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="font-semibold text-black">
                              {principle.title}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-black/60">
                              {principle.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ================= CULTURE ================= */}

      <SectionWrapper
        id="culture"
        fullBleed
        className="py-1 sm:py-3 md:py-2 lg:py-2"
        innerClassName="overflow-visible"
      >
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-[linear-gradient(135deg,#eef6ff_0%,#f8f7ff_48%,#fff4e8_100%)] text-slate-950 shadow-[0_28px_80px_rgba(148,163,184,0.18)]">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-sky-200/90 to-transparent" />
          <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-linear-to-r from-transparent via-orange-200/90 to-transparent" />
          <div className="pointer-events-none absolute -left-12 top-10 h-40 w-40 rounded-full bg-sky-200/65 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-1/3 h-52 w-52 rounded-full bg-indigo-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-8 right-10 h-44 w-44 rounded-full bg-orange-200/60 blur-3xl" />
          <div className="relative z-10">
            <div className="px-5 pt-5 sm:px-6 sm:pt-6 lg:px-6 lg:pt-5 xl:px-7 xl:pt-6">
              <SectionBadge>Our Culture</SectionBadge>
            </div>
            <p className="px-5 type-h2 font-semibold leading-tight sm:px-6 lg:px-7">
              Principles that shape how we work
            </p>
            <div className="grid gap-0 lg:min-h-[40rem] lg:grid-cols-[0.92fr_1.08fr] xl:min-h-[42rem]">
              {/* LEFT - sticky graphic panel */}
              <div className="relative flex h-72 flex-col items-center justify-center border-b border-slate-200/80 bg-white/22 p-3 backdrop-blur-[2px] sm:h-96 lg:sticky lg:top-10 lg:h-full lg:border-b-0 lg:border-r lg:p-2 xl:top-10">
                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 self-start"
                ></motion.div>

                {/* Dynamic SVG graphic */}
                <div className="relative h-full w-full lg:h-full lg:w-full">
                  <div className="pointer-events-none absolute inset-[10%] rounded-4xl bg-(--color-primary) shadow-[0_24px_60px_rgba(15,23,42,0.24)]" />
                  <div className="relative z-10 flex h-full w-full items-center justify-center">
                    <CultureGraphic index={activeCultureCard} />
                  </div>
                </div>

                {/* Dot nav */}
                <div className="mt-4 flex items-center gap-2 lg:mt-2">
                  {culture.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveCultureCard(i)}
                      className={`rounded-full transition-all duration-300 ${
                        activeCultureCard === i
                          ? "h-1.5 w-6 bg-(--color-primary) shadow-[0_0_20px_rgba(100,102,174,0.35)]"
                          : "h-1.5 w-1.5 bg-slate-400/40 hover:bg-slate-500/60"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT - stacked scroll cards */}
              <div className="space-y-2 px-4 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5 lg:px-7 lg:py-2 xl:px-8 xl:py-1">
                {/* Heading */}

                {/* Cards */}
                {culture.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    onViewportEnter={() => setActiveCultureCard(i)}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ x: 6 }}
                    onClick={() => setActiveCultureCard(i)}
                    className={`group cursor-pointer rounded-2xl border p-3.5 transition-all duration-500 sm:p-4 ${
                      activeCultureCard === i
                        ? "border-[rgba(100,102,174,0.28)] bg-white/88 shadow-[0_20px_50px_rgba(100,102,174,0.12)]"
                        : "border-slate-200/80 bg-white/58 hover:border-slate-300 hover:bg-white/74"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Number */}
                      <span
                        className={`text-[10px] font-medium uppercase tracking-[0.3em] mt-1 transition-colors duration-300 ${
                          activeCultureCard === i
                            ? "text-slate-500"
                            : "text-slate-400"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="type-h4 font-semibold text-slate-950">
                            {c.title}
                          </p>
                          {/* Active indicator */}
                          <motion.div
                            animate={{ scale: activeCultureCard === i ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="h-1.5 w-1.5 rounded-full bg-orange-500 "
                          />
                        </div>
                        <motion.p
                          animate={{
                            height: activeCultureCard === i ? "auto" : 0,
                            opacity: activeCultureCard === i ? 1 : 0,
                          }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="type-h6 overflow-hidden leading-6 text-slate-600"
                        >
                          <span className="block mt-2">{c.text}</span>
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Bottom CTA card */}
                <ScrollReveal delay={180}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="grid gap-2 rounded-[30px] border border-slate-200/80 bg-white/72 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-4 md:mt-4 md:grid-cols-[1.1fr_auto] md:items-center"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                        Shared Moments
                      </p>
                      <p className="mt-2 max-w-2xl text-2xl font-semibold leading-tight text-slate-950">
                        Our culture comes alive through shared moments.
                      </p>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                        Explore the events, celebrations, and team experiences
                        that shape how we work together across ClinRT.
                      </p>
                    </div>
                    <div className="md:justify-self-end">
                      <Button
                        href="/clinrt-world?tab=Moments#content-hub"
                        label="Explore Our Moments"
                      />
                    </div>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
      {/* ================= TEAM ================= */}

      {/* ================= CTA ================= */}
      <SectionWrapper fullBleed>
        <div className="rounded-4xl bg-(--color-orange) px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center sm:gap-8">
            <div className="flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-4 text-white sm:gap-x-4 sm:gap-y-5">
              <span className="text-[1.85rem] font-semibold leading-[1.1] sm:text-[2.5rem] lg:text-[3rem]">
                Want to
              </span>
              <span className="inline-flex items-center rounded-xl bg-(--btn-bg) px-3 py-1.5 text-[1.85rem] font-bold italic leading-none text-white shadow-[0_10px_30px_rgba(15,23,42,0.12)] sm:px-4 sm:py-2 sm:text-[2.5rem] lg:text-[3rem]">
                work with us
              </span>
              <span className="text-[1.85rem] font-semibold leading-[1.1] sm:text-[2.5rem] lg:text-[3rem]">
                and create
              </span>
              <span className="inline-flex items-center rounded-xl bg-(--btn-bg) px-3 py-1.5 text-[1.85rem] font-bold italic leading-none text-white shadow-[0_10px_30px_rgba(15,23,42,0.12)] sm:px-4 sm:py-2 sm:text-[2.5rem] lg:text-[3rem]">
                real impact?
              </span>
            </div>

            <Button
              href="/clinrt-world?tab=Moments#content-hub"
              label="Explore now"
              size="lg"
            />
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
