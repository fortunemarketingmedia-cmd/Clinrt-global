import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiDownload,
  FiExternalLink,
  FiFileText,
  FiShield,
} from "react-icons/fi";
import PageTransition from "@/components/animations/PageTransition";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Button from "@/components/ui/Button";
import { brochures, getBrochureBySlug, getBrochureGateHref } from "@/data";

type BrochurePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return brochures.map((brochure) => ({
    slug: brochure.slug,
  }));
}

export async function generateMetadata({
  params,
}: BrochurePageProps): Promise<Metadata> {
  const { slug } = await params;
  const brochure = getBrochureBySlug(slug);

  if (!brochure) {
    return {
      title: "Brochure not found",
    };
  }

  return {
    title: `${brochure.title} | ClinRT Brochures`,
    description: brochure.description,
  };
}

export default async function BrochurePage({ params }: BrochurePageProps) {
  const { slug } = await params;
  const brochure = getBrochureBySlug(slug);

  if (!brochure) {
    notFound();
  }

  const downloadGateHref = getBrochureGateHref(brochure.slug);

  return (
    <PageTransition>
      <section className="relative overflow-hidden bg-[#0a1d31] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(125,211,252,0.18),transparent_30%),linear-gradient(180deg,rgba(8,27,46,0.98)_0%,rgba(8,27,46,1)_100%)]" />
        <div className="absolute -left-16 top-16 h-72 w-72 rounded-full bg-[#f59e0b]/18 blur-3xl" />
        <div className="absolute -right-12 bottom-10 h-80 w-80 rounded-full bg-sky-300/12 blur-3xl" />

        <SectionWrapper className="relative z-10 py-16 md:py-20">
          <ScrollReveal>
            <div className="inline-flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/62">
              <Link
                href="/clinrt-world?tab=Brochures"
                className="inline-flex items-center gap-2 text-white/72 transition hover:text-white"
              >
                <FiArrowLeft className="h-3.5 w-3.5" />
                Back to brochure library
              </Link>
              <span className="rounded-full border border-white/14 bg-white/8 px-4 py-2">
                {brochure.meta}
              </span>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
            <ScrollReveal className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/72">
                <FiFileText className="h-3.5 w-3.5" />
                {brochure.eyebrow}
              </div>

              <div className="space-y-4">
                <p className="max-w-4xl text-4xl font-semibold leading-tight md:text-5xl xl:text-6xl">
                  {brochure.title}
                </p>
                <p className="max-w-3xl text-base leading-8 text-white/74 md:text-lg">
                  {brochure.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {brochure.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-3 rounded-[1.6rem] border border-white/12 bg-white/8 px-4 py-4 backdrop-blur"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/14 bg-white/10 text-white">
                      <FiCheckCircle className="h-4 w-4" />
                    </span>
                    <p className="text-sm leading-6 text-white/78">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="rounded-[2rem] border border-white/14 bg-white/10 p-6 shadow-[0_28px_90px_rgba(4,18,33,0.26)] backdrop-blur-2xl">
                <div className="rounded-[1.6rem] border border-white/14 bg-white/6 p-5">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/62">
                    Download Access
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    Preview first, download after signup
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    Open the full brochure below. When you are ready to keep a
                    copy, we route you through the Get in Touch form and start
                    the PDF download automatically after submission.
                  </p>

                  <div className="mt-6 grid gap-3">
                    <div className="flex items-start gap-3 rounded-[1.3rem] border border-white/12 bg-white/8 px-4 py-4">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/10 text-white">
                        <FiShield className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Industry-standard gated access
                        </p>
                        <p className="mt-1 text-sm leading-6 text-white/68">
                          A brochure request doubles as lead capture and unlocks
                          instant brochure delivery.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <Button
                      href={downloadGateHref}
                      label="Request Brochure & Download"
                      icon={FiDownload}
                    />
                    <Button
                      href={brochure.pdfSrc}
                      label="Open PDF in New Tab"
                      icon={FiExternalLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white/10 text-white hover:bg-white/15"
                    />
                  </div>

                  <p className="mt-5 text-xs uppercase tracking-[0.26em] text-white/52">
                    Instant download begins after form submission
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </SectionWrapper>
      </section>
    </PageTransition>
  );
}
