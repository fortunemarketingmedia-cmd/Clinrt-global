"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
  type ChangeEvent,
} from "react";
import type { IconType } from "react-icons";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiCamera,
  FiClock,
  FiDownload,
  FiExternalLink,
  FiEye,
  FiFileText,
  FiMonitor,
  FiPlay,
  FiRadio,
  FiSearch,
  FiX,
} from "react-icons/fi";

import PageTransition from "@/components/animations/PageTransition";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { BlogArticleModal } from "@/components/BlogArticleModal";
import { BrochurePreviewModal } from "@/components/BrochurePreviewModal";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Button from "@/components/ui/Button";
import SectionBadge from "@/components/ui/SectionBadge";
import {
  brochures,
  clinrtWorldBlogArticles,
  getBrochureGateHref,
  type Brochure,
} from "@/data";
import { cn } from "@/lib/cn";

const tabs = ["News", "Events", "Moments", "Blogs", "Brochures"] as const;

const INITIAL_VISIBLE = 6;

type Tab = (typeof tabs)[number];

type BlogArticle = (typeof clinrtWorldBlogArticles)[number];

type MomentImage = {
  src: string;
  alt: string;
};

type ResourceItem = {
  title: string;
  summary: string;
  eyebrow: string;
  meta: string;
  featured?: boolean;
  href?: string;
  highlights?: readonly string[];
  blog?: BlogArticle;
  brochure?: Brochure;
  momentImages?: readonly MomentImage[];
  coverImage?: string;
  linkedinEmbedUrl?: string;
  linkedinPostUrl?: string;
};

type TabContent = {
  title: string;
  description: string;
  icon: IconType;
  cta?: {
    href: string;
    label: string;
  };
  items: readonly ResourceItem[];
};

const brochureItems: readonly ResourceItem[] = brochures.map(
  (brochure, index) => ({
    eyebrow: brochure.eyebrow,
    title: brochure.title,
    summary: brochure.summary,
    meta: brochure.meta,
    featured: index === 0,
    highlights: brochure.highlights,
    brochure,
  }),
);

const blogItems: readonly ResourceItem[] = clinrtWorldBlogArticles.map(
  (article) => ({
    eyebrow: article.eyebrow,
    title: article.title,
    summary: article.summary,
    meta: article.meta,
    featured: article.featured,
    blog: article,
  }),
);

const contentByTab: Record<Tab, TabContent> = {
  News: {
    title: "Latest News",
    description:
      "Product releases, milestones, and industry activity collected in one modern feed.",
    icon: FiRadio,
    items: [
      {
        eyebrow: "Launch",
        title: "iClinRT is now live",
        summary:
          "ClinRT's Interactive Response Technology platform is now live, bringing configurable trial execution, supply oversight, and operational visibility into one system.",
        meta: "Launch update",
        featured: true,
      },
    ],
  },

  Events: {
    title: "Upcoming Events",
    description:
      "Designed to scale well as the library grows, with clear structure for sessions, topics, and follow-up resources.",
    icon: FiMonitor,
    cta: {
      href: "/contact",
      label: "Get Webinar Invites",
    },
    items: [
      {
        eyebrow: "Upcoming event",
        title:
          "ClinRT is excited to attend the 17th Annual Clinical Trials Summit 2026 in Mumbai",
        summary:
          "Where industry leaders come together to exchange insights, explore emerging trends, and engage in impactful conversations shaping the future of clinical research.",
        meta: "Industry event",
        featured: true,
      },
    ],
  },

  Moments: {
    title: "ClinRT Moments",
    description:
      "A visual stream of awareness initiatives, employee wellness, team culture, and shared moments from ClinRT.",
    icon: FiCamera,
    items: [
      {
        eyebrow: "Awareness",
        title: "World Environment Day",
        summary:
          "ClinRT Global marked World Environment Day through an environment photography challenge.",
        meta: "4 photos",
        coverImage: "/images/clinrt-moments/environment-day-1.jpg",
        linkedinPostUrl:
          "https://www.linkedin.com/posts/clinrt-global-services_worldenvironmentday2026-clinrtglobal-environmentphotographychallenge-activity-7468982448316575744-q7Y7",
        momentImages: [
          {
            src: "/images/clinrt-moments/environment-day-1.jpg",
            alt: "World Environment Day at ClinRT",
          },
          {
            src: "/images/clinrt-moments/environment-day-2.jpg",
            alt: "Environment photography challenge at ClinRT",
          },
          {
            src: "/images/clinrt-moments/environment-day-3.jpg",
            alt: "Environment Day activity at ClinRT",
          },
          {
            src: "/images/clinrt-moments/environment-day-4.jpg",
            alt: "ClinRT World Environment Day moment",
          },
        ],
      },
      {
        eyebrow: "Awareness",
        title: "World Day Against Child Labour",
        summary:
          "ClinRT Global joined the global call against child labour and supported awareness for a safer future.",
        meta: "8 photos",
        coverImage: "/images/clinrt-moments/child-labour-1.jpg",
        linkedinPostUrl:
          "https://www.linkedin.com/posts/clinrt-global-services_worlddayagainstchildlabour-redcardtochildlabour-activity-7473694852887515136-uXOU",
        momentImages: [
          {
            src: "/images/clinrt-moments/child-labour-1.jpg",
            alt: "World Day Against Child Labour at ClinRT",
          },
          {
            src: "/images/clinrt-moments/child-labour-2.jpg",
            alt: "Child labour awareness activity at ClinRT",
          },
          {
            src: "/images/clinrt-moments/child-labour-3.jpg",
            alt: "ClinRT child labour awareness campaign",
          },
          {
            src: "/images/clinrt-moments/child-labour-4.jpg",
            alt: "Awareness moment at ClinRT",
          },
          {
            src: "/images/clinrt-moments/child-labour-5.jpg",
            alt: "ClinRT team supporting child labour awareness",
          },
          {
            src: "/images/clinrt-moments/child-labour-6.jpg",
            alt: "World Day Against Child Labour campaign",
          },
          {
            src: "/images/clinrt-moments/child-labour-7.jpg",
            alt: "Child labour awareness initiative",
          },
          {
            src: "/images/clinrt-moments/child-labour-8.jpg",
            alt: "ClinRT awareness activity",
          },
        ],
      },
      {
        eyebrow: "Wellness",
        title: "International Yoga Day",
        summary:
          "The ClinRT team came together for a moment focused on wellness, mindfulness, and balance.",
        meta: "Video",
        coverImage: "/images/clinrt-moments/yoga-day-cover.jpg",
        linkedinEmbedUrl:
          "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7474028883198050304?compact=1",
        linkedinPostUrl:
          "https://www.linkedin.com/feed/update/urn:li:ugcPost:7474028883198050304",
      },
      {
        eyebrow: "Team Culture",
        title: "ClinRT Team Outing",
        summary:
          "A refreshing team outing filled with shared experiences, meaningful connections, and memorable moments.",
        meta: "Video",
        coverImage: "/images/clinrt-moments/team-outing-cover.jpg",
        linkedinEmbedUrl:
          "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7479152943011840002?compact=1",
        linkedinPostUrl:
          "https://www.linkedin.com/feed/update/urn:li:ugcPost:7479152943011840002",
      },
      {
        eyebrow: "Celebration",
        title: "Women's Day Celebration",
        summary:
          "A heartfelt celebration recognizing the strength, contributions, and achievements of women at ClinRT, reflecting our commitment to inclusion and appreciation.",
        meta: "2 photos",
        coverImage: "/images/moment4.jpg",
        momentImages: [
          {
            src: "/images/moment4.jpg",
            alt: "Women's Day Celebration at ClinRT",
          },
          {
            src: "/images/moment3.jpg",
            alt: "ClinRT team celebrating Women's Day",
          },
        ],
      },
      {
        eyebrow: "Celebration",
        title: "Christmas Celebration",
        summary:
          "A cheerful moment where colleagues came together to celebrate the season, strengthening bonds and creating memorable experiences at ClinRT.",
        meta: "2 photos",
        coverImage: "/images/moment3.jpg",
        momentImages: [
          {
            src: "/images/moment3.jpg",
            alt: "Christmas Celebration at ClinRT",
          },
          {
            src: "/images/moment2.jpg",
            alt: "ClinRT colleagues celebrating Christmas",
          },
        ],
      },
    ],
  },

  Blogs: {
    title: "Insights and Blogs",
    description:
      "Editorial content arranged for quick scanning, filtering, and future expansion as more articles are added.",
    icon: FiBookOpen,
    items: blogItems,
  },

  Brochures: {
    title: "Brochures",
    description:
      "Open the full brochure in-browser, explore the entire document, and unlock the PDF download through a short contact request.",
    icon: FiFileText,
    items: brochureItems,
  },
};

function isTab(value: string | null): value is Tab {
  return tabs.includes(value as Tab);
}

function getSearchableText(item: ResourceItem) {
  const blogSections =
    item.blog?.sections.flatMap((section) => [
      section.title,
      ...(section.paragraphs ?? []),
      ...(section.bullets ?? []),
    ]) ?? [];

  const brochureText = item.brochure
    ? [
        item.brochure.description,
        item.brochure.fileName,
        ...item.brochure.highlights,
      ]
    : [];

  const momentText =
    item.momentImages?.flatMap((image) => [image.alt, image.src]) ?? [];

  const linkedinText =
    item.linkedinEmbedUrl || item.linkedinPostUrl
      ? ["LinkedIn", "social post", item.linkedinPostUrl ?? ""]
      : [];

  return [
    item.eyebrow,
    item.title,
    item.summary,
    item.meta,
    item.blog?.readTime ?? "",
    ...(item.blog?.lead ?? []),
    ...blogSections,
    ...(item.blog?.closing ?? []),
    ...brochureText,
    ...momentText,
    item.coverImage ?? "",
    ...linkedinText,
  ].join(" ");
}

export default function WhatsNewPage() {
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get("tab");

  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);
  const [activeBlog, setActiveBlog] = useState<BlogArticle | null>(null);
  const [activeBrochure, setActiveBrochure] = useState<Brochure | null>(null);
  const [activeMoment, setActiveMoment] = useState<ResourceItem | null>(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [isPending, startTransition] = useTransition();

  const activeTab =
    selectedTab ?? (isTab(requestedTab) ? requestedTab : "News");

  const activeContent = contentByTab[activeTab];
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredItems = activeContent.items.filter((item) =>
    getSearchableText(item).toLowerCase().includes(normalizedQuery),
  );

  const visibleItems = filteredItems.slice(0, visibleCount);
  const remainingItems = filteredItems.length - visibleItems.length;

  function handleTabSelect(tab: Tab) {
    startTransition(() => {
      setSelectedTab(tab);
      setActiveBlog(null);
      setActiveBrochure(null);
      setActiveMoment(null);
      setQuery("");
      setVisibleCount(INITIAL_VISIBLE);
    });
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setVisibleCount(INITIAL_VISIBLE);
  }

  return (
    <PageTransition>
      <section className="relative flex min-h-[78svh] items-end overflow-hidden sm:min-h-[88svh] lg:min-h-screen">
        <Image
          src="/images/Stay connected with our latest updates, resources, and milestones_compressed.webp"
          alt="What's new"
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(224,242,254,0.2)_0%,rgba(167,243,208,0.16)_22%,rgba(14,116,144,0.4)_52%,rgba(15,23,42,0.84)_100%)]" />

        <div className="hero-content-lift section-shell relative z-10 w-full pb-10 pt-24 text-white sm:pb-14 sm:pt-28 md:pb-20 md:pt-36 lg:pb-24">
          <ScrollReveal className="max-w-3xl">
            <p className="page-banner-title font-semibold">
              Stay connected with our latest updates, resources, and milestones.
            </p>

            <p className="type-h4 mt-3 max-w-2xl font-semibold">
              Here&apos;s everything happening across ClinRT right now.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#content-hub" label="Explore Content Hub" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionWrapper fullBleed id="content-hub">
        <div className="relative overflow-hidden rounded-4xl border border-black/8 bg-[radial-gradient(circle_at_top_left,rgba(15,36,58,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(243,123,33,0.14),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-3 shadow-[0_28px_120px_rgba(15,36,58,0.08)] sm:p-4 lg:p-6 xl:p-8">
          <div className="pointer-events-none absolute inset-[1.1rem] rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(253,186,116,0.12),transparent_34%),linear-gradient(135deg,rgba(255,248,243,0.78)_0%,rgba(255,255,255,0.38)_52%,rgba(255,244,236,0.64)_100%)]" />

          <motion.div
            className="pointer-events-none absolute -left-14 top-12 h-44 w-44 rounded-full bg-sky-200/35 blur-3xl"
            animate={{ y: [0, -16, 0] }}
            transition={{
              duration: 9,
              repeat: Infinity,
            }}
          />

          <motion.div
            className="pointer-events-none absolute -right-10 bottom-8 h-52 w-52 rounded-full bg-orange-200/40 blur-3xl"
            animate={{ y: [0, 18, 0] }}
            transition={{
              duration: 11,
              repeat: Infinity,
            }}
          />

          <div className="relative grid gap-6 md:gap-5 lg:grid-cols-[minmax(15.75rem,16.75rem)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[280px_1fr]">
            <aside className="lg:sticky lg:top-10 lg:h-fit xl:top-12">
              <ScrollReveal className="rounded-[1.75rem] border border-orange-100/80 bg-[linear-gradient(180deg,rgba(255,248,243,0.96)_0%,rgba(255,255,255,0.86)_100%)] p-4 shadow-[0_20px_60px_rgba(15,36,58,0.08)] backdrop-blur sm:p-5 xl:p-6">
                <SectionBadge>Content Hub</SectionBadge>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-(--color-primary) p-4 text-white">
                    <p className="text-2xl font-semibold">{tabs.length}</p>

                    <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-white/60">
                      Channels
                    </p>
                  </div>

                  <div className="rounded-2xl border border-black/8 bg-white/80 p-4">
                    <p className="text-2xl font-semibold text-black">
                      {activeContent.items.length}
                    </p>

                    <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-black/40">
                      In View
                    </p>
                  </div>
                </div>

                <div className="-mx-1 mt-6 flex gap-3 overflow-x-auto px-1 pb-1 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:flex lg:grid-cols-none lg:flex-col">
                  {tabs.map((tab) => (
                    <TabButton
                      key={tab}
                      tab={tab}
                      isActive={activeTab === tab}
                      itemCount={contentByTab[tab].items.length}
                      icon={contentByTab[tab].icon}
                      onClick={() => handleTabSelect(tab)}
                    />
                  ))}
                </div>
              </ScrollReveal>
            </aside>

            <div className="min-w-0 space-y-6">
              <ScrollReveal>
                <div className="rounded-[1.75rem] border border-orange-100/75 bg-[linear-gradient(180deg,rgba(255,248,243,0.94)_0%,rgba(255,255,255,0.88)_100%)] p-4 shadow-[0_18px_50px_rgba(15,36,58,0.08)] backdrop-blur sm:p-5 xl:p-7">
                  <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="min-w-0 max-w-2xl">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-primary) text-white shadow-lg sm:h-14 sm:w-14">
                          <activeContent.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </span>

                        <div className="min-w-0">
                          <SectionBadge>Active Collection</SectionBadge>

                          <p className="mt-2 text-2xl font-semibold leading-tight text-black sm:text-3xl md:text-4xl">
                            {activeContent.title}
                          </p>

                          <p className="mt-3 text-sm leading-7 text-black/60 md:text-base">
                            {activeContent.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:max-w-xs lg:max-w-sm">
                      <label className="relative block">
                        <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />

                        <input
                          value={query}
                          onChange={handleSearchChange}
                          placeholder={`Search in ${activeTab.toLowerCase()}`}
                          className="h-13 w-full rounded-2xl border border-orange-100/80 bg-white/86 pl-11 pr-4 text-sm text-black outline-none transition focus:border-orange-200 focus:bg-white"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-black/45">
                      <span className="rounded-full border border-orange-100/70 bg-white/88 px-4 py-2">
                        {filteredItems.length} results
                      </span>

                      <span className="rounded-full border border-orange-100/70 bg-white/88 px-4 py-2">
                        Showing {visibleItems.length}
                      </span>

                      {normalizedQuery && (
                        <span className="rounded-full border border-black/8 bg-orange-50 px-4 py-2 text-orange-700">
                          Filtered by &quot;{deferredQuery}&quot;
                        </span>
                      )}

                      {isPending && (
                        <span className="rounded-full border border-black/8 bg-slate-950 px-4 py-2 text-white">
                          Updating
                        </span>
                      )}
                    </div>

                    {activeContent.cta && (
                      <Button
                        href={activeContent.cta.href}
                        label={activeContent.cta.label}
                        size="sm"
                      />
                    )}
                  </div>
                </div>
              </ScrollReveal>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className={
                    activeTab === "Moments"
                      ? "grid grid-cols-1 gap-5 md:grid-cols-2"
                      : activeTab === "Brochures"
                        ? "grid grid-cols-1 gap-5"
                        : "grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3"
                  }
                >
                  {visibleItems.length > 0 ? (
                    visibleItems.map((item, index) => (
                      <ResourceCard
                        key={`${item.title}-${index}`}
                        item={item}
                        tab={activeTab}
                        index={index}
                        onOpenBlog={setActiveBlog}
                        onOpenBrochure={setActiveBrochure}
                        onOpenMoment={setActiveMoment}
                      />
                    ))
                  ) : (
                    <div className="md:col-span-2 2xl:col-span-3">
                      <div className="rounded-[1.75rem] border border-dashed border-black/12 bg-white/75 p-10 text-center shadow-sm">
                        <p className="text-xl font-semibold text-black">
                          No matches yet
                        </p>

                        <p className="mt-3 text-sm leading-7 text-black/60">
                          Try a different keyword or switch to another content
                          channel.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {remainingItems > 0 && (
                <div className="flex justify-center pt-2">
                  <Button
                    label={`Load ${Math.min(
                      INITIAL_VISIBLE,
                      remainingItems,
                    )} More`}
                    size="sm"
                    onClick={() =>
                      setVisibleCount((current) => current + INITIAL_VISIBLE)
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <AnimatePresence>
        {activeBlog && (
          <BlogArticleModal
            article={activeBlog}
            onClose={() => setActiveBlog(null)}
          />
        )}

        {activeBrochure && (
          <BrochurePreviewModal
            brochure={activeBrochure}
            onClose={() => setActiveBrochure(null)}
          />
        )}

        {activeMoment && (
          <MomentPreviewModal
            item={activeMoment}
            onClose={() => setActiveMoment(null)}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}

type TabButtonProps = {
  tab: Tab;
  isActive: boolean;
  itemCount: number;
  icon: IconType;
  onClick: () => void;
};

function TabButton({
  tab,
  isActive,
  itemCount,
  icon: Icon,
  onClick,
}: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group min-w-[13rem] rounded-2xl border px-4 py-3.5 text-left transition duration-300 sm:min-w-[15rem] sm:py-4 md:min-w-0",
        isActive
          ? "bg-(--color-primary) text-white shadow-lg"
          : "border-black/8 bg-white/75 text-black hover:-translate-y-0.5 hover:border-black/18 hover:bg-white",
      )}
      aria-pressed={isActive}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-2xl border",
              isActive
                ? "border-white/10 bg-white/10"
                : "border-black/8 bg-slate-50",
            )}
          >
            <Icon className="h-5 w-5" />
          </span>

          <div className="min-w-0">
            <p className="font-semibold">{tab}</p>

            <p
              className={cn(
                "text-[11px] uppercase tracking-[0.3em]",
                isActive ? "text-white/55" : "text-black/35",
              )}
            >
              {itemCount} items
            </p>
          </div>
        </div>

        <FiArrowRight
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            isActive
              ? "translate-x-0"
              : "text-black/35 group-hover:translate-x-1",
          )}
        />
      </div>
    </button>
  );
}

type ResourceCardProps = {
  item: ResourceItem;
  tab: Tab;
  index: number;
  onOpenBlog: (article: BlogArticle) => void;
  onOpenBrochure: (brochure: Brochure) => void;
  onOpenMoment: (item: ResourceItem) => void;
};

function ResourceCard({
  item,
  tab,
  index,
  onOpenBlog,
  onOpenBrochure,
  onOpenMoment,
}: ResourceCardProps) {
  const reduceMotion = useReducedMotion();

  if (tab === "Brochures" && item.brochure) {
    const brochure = item.brochure;

    return (
      <BrochureCard
        item={{ ...item, brochure }}
        index={index}
        onOpen={() => onOpenBrochure(brochure)}
      />
    );
  }

  if (tab === "Blogs" && item.blog) {
    const article = item.blog;

    return (
      <BlogCard
        item={{ ...item, blog: article }}
        index={index}
        onOpen={() => onOpenBlog(article)}
      />
    );
  }

  if (
    tab === "Moments" &&
    (item.linkedinEmbedUrl || item.momentImages?.length)
  ) {
    return (
      <MomentSocialCard
        item={item}
        index={index}
        onOpen={() => onOpenMoment(item)}
      />
    );
  }

  return (
    <motion.article
      initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: reduceMotion ? 0 : index * 0.04,
      }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-black/8 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,36,58,0.08)] sm:p-6",
        item.featured && "md:col-span-2",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-18 bg-linear-to-r from-sky-100/60 via-orange-50/70 to-transparent" />

      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <span className="inline-flex rounded-full border border-black/8 bg-slate-50 px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-black/55">
            {item.eyebrow}
          </span>

          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-(--color-primary) text-white shadow-md transition duration-300 group-hover:-translate-y-0.5">
            <FiArrowRight className="h-4 w-4" />
          </span>
        </div>

        <p className="type-h3 mt-6 font-semibold leading-tight text-black sm:mt-8 sm:text-2xl">
          {item.title}
        </p>

        <p className="mt-4 text-sm leading-7 text-black/65">{item.summary}</p>

        <div className="mt-8 border-t border-black/8 pt-4 text-[11px] uppercase tracking-[0.32em] text-black/40">
          {item.meta}
        </div>
      </div>
    </motion.article>
  );
}

function MomentSocialCard({
  item,
  index,
  onOpen,
}: {
  item: ResourceItem;
  index: number;
  onOpen: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const coverImage = item.coverImage ?? item.momentImages?.[0]?.src;
  const isVideo = Boolean(item.linkedinEmbedUrl);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: reduceMotion ? 0 : index * 0.05,
      }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className="group relative min-w-0 overflow-hidden rounded-[1.5rem] border border-black/8 bg-white text-left shadow-[0_20px_60px_rgba(15,36,58,0.1)] transition hover:border-black/14 hover:shadow-[0_24px_70px_rgba(15,36,58,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[504/399] overflow-hidden bg-slate-900">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={`${item.title} cover`}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-[1.035]"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.38),transparent_34%),linear-gradient(135deg,#102a43_0%,#081423_100%)]" />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/15 to-slate-950/5" />

        <span className="absolute left-4 top-4 inline-flex rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">
          {item.meta}
        </span>

        <span className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white shadow-xl backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-(--color-primary) sm:h-16 sm:w-16">
          {isVideo ? (
            <FiPlay className="ml-0.5 h-6 w-6 fill-current" />
          ) : (
            <FiEye className="h-6 w-6" />
          )}
        </span>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 text-white sm:p-5">
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/70">
            {isVideo ? "Video preview" : "Photo collage"}
          </span>

          <span className="inline-flex items-center gap-2 text-xs font-semibold">
            {isVideo ? "Watch video" : "See all pics"}
            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="line-clamp-2 text-xl font-semibold leading-tight text-[#102a43]">
          {item.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-black/60">
          {item.summary}
        </p>
      </div>
    </motion.button>
  );
}

function MomentPreviewModal({
  item,
  onClose,
}: {
  item: ResourceItem;
  onClose: () => void;
}) {
  const isVideo = Boolean(item.linkedinEmbedUrl);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} preview`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/82 p-3 backdrop-blur-sm sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.985 }}
        transition={{ duration: 0.25 }}
        className="flex max-h-[94svh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-black/8 bg-[linear-gradient(135deg,#ffffff_0%,#fff7ed_100%)] p-4 sm:p-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-orange-700">
                {item.eyebrow}
              </span>
              <span className="rounded-full border border-black/8 bg-white px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-black/45">
                {item.meta}
              </span>
            </div>

            <h2 className="mt-3 text-xl font-semibold leading-tight text-[#102a43] sm:text-2xl">
              {item.title}
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-black/60">
              {item.summary}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-[#e9edf1] p-3 sm:p-5">
          {item.momentImages?.length ? (
            <div className="mx-auto h-[min(72svh,760px)] w-full max-w-4xl overflow-hidden rounded-xl bg-slate-100">
              <MomentImageCarousel
                images={item.momentImages}
                title={item.title}
              />
            </div>
          ) : item.linkedinEmbedUrl ? (
            <div className="mx-auto aspect-[504/399] w-full max-w-[900px] overflow-hidden rounded-xl bg-black shadow-lg">
              <iframe
                src={item.linkedinEmbedUrl}
                title={`${item.title} LinkedIn video`}
                loading="eager"
                allowFullScreen
                scrolling="no"
                width="504"
                height="399"
                className="h-full w-full border-0 bg-black"
              />
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 border-t border-black/8 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <span className="text-[10px] uppercase tracking-[0.22em] text-black/35">
            ClinRT Global
          </span>

          {item.linkedinPostUrl && (
            <a
              href={item.linkedinPostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0a66c2] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#084f96]"
            >
              View original on LinkedIn
              <FiExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function MomentImageCarousel({
  images,
  title,
}: {
  images: readonly MomentImage[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentImage = images[activeIndex];

  function showPrevious() {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <div className="group relative h-full w-full overflow-hidden bg-slate-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage.src}
          initial={{ opacity: 0, scale: 1.015 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-contain"
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-black/5" />

      <span className="absolute right-4 top-4 rounded-full bg-black/65 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
        {activeIndex + 1} / {images.length}
      </span>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={showPrevious}
            aria-label={`Show previous image from ${title}`}
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <FiArrowLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={showNext}
            aria-label={`Show next image from ${title}`}
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <FiArrowRight className="h-4 w-4" />
          </button>
        </>
      )}

      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5 px-14">
        {images.map((image, imageIndex) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(imageIndex)}
            aria-label={`Show image ${imageIndex + 1} from ${title}`}
            aria-current={activeIndex === imageIndex ? "true" : undefined}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              activeIndex === imageIndex
                ? "w-6 bg-white"
                : "w-2 bg-white/55 hover:bg-white/80",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function BlogCard({
  item,
  index,
  onOpen,
}: {
  item: ResourceItem & { blog: BlogArticle };
  index: number;
  onOpen: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: reduceMotion ? 0 : index * 0.04,
      }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      onClick={onOpen}
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-black/8 bg-white/88 p-5 text-left shadow-[0_18px_50px_rgba(15,36,58,0.08)] transition duration-300 hover:border-black/14 hover:shadow-[0_22px_60px_rgba(15,36,58,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 sm:p-6",
        item.featured && "md:col-span-2",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.22),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(167,243,208,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.92)_100%)]" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full border border-black/8 bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-black/55">
              {item.eyebrow}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-sky-700">
              <FiClock className="h-3.5 w-3.5" />
              {item.blog.readTime}
            </span>
          </div>

          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-(--color-primary) text-white shadow-md transition duration-300 group-hover:-translate-y-0.5">
            <FiArrowRight className="h-4 w-4" />
          </span>
        </div>

        <p className="mt-6 text-xl font-semibold leading-tight text-black transition group-hover:text-(--color-primary) sm:mt-8 sm:text-2xl md:text-[2rem]">
          {item.title}
        </p>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-black/65 md:text-base">
          {item.summary}
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-black/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[11px] uppercase tracking-[0.32em] text-black/40">
            {item.meta}
          </span>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-(--color-primary)">
            Read full article
            <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function BrochureCard({
  item,
  index,
  onOpen,
}: {
  item: ResourceItem & { brochure: Brochure };
  index: number;
  onOpen: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const downloadHref = getBrochureGateHref(item.brochure.slug);

  return (
    <motion.article
      initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: reduceMotion ? 0 : index * 0.05,
      }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className="relative overflow-hidden rounded-[1.9rem] border border-black/8 bg-white/88 p-5 shadow-[0_22px_70px_rgba(15,36,58,0.08)] sm:p-6"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.2),transparent_35%),radial-gradient(circle_at_top_right,rgba(167,243,208,0.16),transparent_28%)]" />

      <div className="relative flex min-w-0 flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full border border-black/8 bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-black/50">
              {item.eyebrow}
            </span>

            <span className="rounded-full border border-black/8 bg-slate-50 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-black/45">
              {item.meta}
            </span>
          </div>

          <p className="mt-5 text-2xl font-semibold leading-tight text-black sm:text-3xl">
            {item.title}
          </p>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-black/65 sm:text-base">
            {item.summary}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:w-auto lg:min-w-[14rem] lg:flex-col">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-[#0f243a] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#163451]"
          >
            <FiEye className="h-4 w-4" />
            Preview brochure
          </button>

          <Link
            href={downloadHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-[#0f243a] transition hover:border-black/18 hover:bg-slate-50"
          >
            <FiDownload className="h-4 w-4" />
            Join & Download
          </Link>
        </div>
      </div>
    </motion.article>
  );
}