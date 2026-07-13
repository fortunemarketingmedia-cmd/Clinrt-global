"use client";

import { useSearchParams } from "next/navigation";
import { FiArrowLeft, FiCheckCircle, FiEye } from "react-icons/fi";
import BrochureAutoDownload from "@/components/brochures/BrochureAutoDownload";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Button from "@/components/ui/Button";
import { getBrochureBySlug, getBrochureHref } from "@/data";

export default function ContactSuccessPage() {
  const searchParams = useSearchParams();
  const brochure = getBrochureBySlug(searchParams.get("brochure"));

  return (
    <PageTransition>
      <section className="relative min-h-screen overflow-hidden bg-[#0f243a] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.22),transparent_28%),linear-gradient(180deg,rgba(8,27,46,0.92)_0%,rgba(8,27,46,1)_100%)]" />
        <div className="absolute -left-16 top-20 h-64 w-64 rounded-full bg-[#f59e0b]/20 blur-3xl" />
        <div className="absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <SectionWrapper className="hero-content-lift relative z-10 flex min-h-screen items-center py-12">
          <div className="mx-auto w-full max-w-3xl rounded-[2.2rem] border border-white/15 bg-white/10 p-8 text-center shadow-[0_35px_120px_rgba(4,18,33,0.28)] backdrop-blur-2xl md:p-12">
            <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-400/15 text-emerald-300">
              <FiCheckCircle className="h-9 w-9" />
            </div>

            <p className="mt-6 text-[11px] uppercase tracking-[0.32em] text-white/65">
              Submission Received
            </p>
            <p className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              {brochure
                ? "You are in. Your brochure is on the way."
                : "Thank you. Your message is on its way."}
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/72">
              {brochure
                ? `Thanks for your brochure request. We are starting the ${brochure.title} download automatically, and you can preview or retry it below at any time.`
                : "We have received your submission successfully. Our team will review it and get back to you as soon as possible."}
            </p>

            {brochure && <BrochureAutoDownload brochure={brochure} />}

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {brochure ? (
                <>
                  <Button
                    href={getBrochureHref(brochure.slug)}
                    label="Open Brochure"
                    icon={FiEye}
                  />
                  <Button
                    href="/contact"
                    label="Back to Contact"
                    icon={FiArrowLeft}
                    className="bg-white/10 text-white hover:bg-white/15"
                  />
                </>
              ) : (
                <>
                  <Button href="/" label="Back to Home" />
                  <Button
                    href="/contact"
                    label="Submit Another Request"
                    className="bg-white/10 text-white hover:bg-white/15"
                  />
                </>
              )}
            </div>
          </div>
        </SectionWrapper>
      </section>
    </PageTransition>
  );
}

