import { contactFormSuccessPath, getContactFormHref } from "./contact";
import { deepFreeze } from "../utils";

export const brochures = deepFreeze([
  {
    slug: "iclinrt-platform-overview",
    eyebrow: "Featured brochure",
    title: "iClinRT platform overview",
    summary:
      "Explore the live iClinRT brochure with a browser preview, product context, and a guided contact flow for brochure requests.",
    meta: "Blue edition | PDF brochure | 1.6 MB",
    description:
      "A polished overview of the iClinRT platform, built for teams evaluating interactive response technology, operational visibility, and delivery readiness.",
    pdfSrc: "/brochures/iclinrt-platform-overview-brochure.pdf",
    fileName: "iClinRT-platform-overview-brochure.pdf",
    highlights: [
      "Platform capabilities and operating model overview",
      "A browser-based brochure preview with a full-document reading experience",
      "Contact-led brochure request flow for lead capture",
    ],
  },
] as const);

export type Brochure = (typeof brochures)[number];

export function getBrochureBySlug(slug: string | null | undefined) {
  return brochures.find((brochure) => brochure.slug === slug) ?? null;
}

export function getBrochureHref(slug: string) {
  return `/brochures/${slug}`;
}

export function getBrochureGateHref(slug: string) {
  return getContactFormHref("touch", { brochure: slug });
}

export function getBrochureSuccessPath(slug: string) {
  const params = new URLSearchParams({
    brochure: slug,
  });

  return `${contactFormSuccessPath}?${params.toString()}`;
}
