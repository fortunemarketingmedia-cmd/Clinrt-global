import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import { getContactFormHref } from "@/data";

export default function ComingSoonPage() {
  return (
    <PageTransition>
      <SectionWrapper
        fullBleed
        className="relative overflow-hidden py-16 sm:py-20 lg:py-28"
      >
        <div className="coming-hero">
          <div className="coming-aurora" aria-hidden="true" />
          <div className="coming-grid" aria-hidden="true" />
          <div className="coming-orb orb-1" aria-hidden="true" />
          <div className="coming-orb orb-2" aria-hidden="true" />
          <div className="coming-orb orb-3" aria-hidden="true" />

          <div className="hero-content-lift section-shell px-4 sm:px-6">
            <ScrollReveal className="coming-card mx-auto w-full max-w-4xl px-6 py-12 text-center text-white sm:px-10 sm:py-14">
              <span className="coming-pill">Coming Soon</span>
              <h1 className="mt-5 page-banner-title font-semibold text-white">
                This ClinRT module is on the way
              </h1>
              <p className="mt-4 text-white/80">
                We&apos;re actively building this capability. Contact us for
                early access updates and launch timelines.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href={getContactFormHref("touch")} label="Contact Us" />
              </div>
              <div className="mt-10 coming-progress">
                <div className="coming-progress-bar" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.35em] text-white/60">
                Launch window is approaching
              </p>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}


