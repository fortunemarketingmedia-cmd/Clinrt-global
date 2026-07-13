import { makeHero, makeSeedImage } from "../factories";
import { deepFreeze } from "../utils";
import type { HeroContent, ServiceItem, StatItem } from "../types";
import { validateHero, validateServices, validateStats } from "../validators";

/** Services page hero. */
export const servicesHero: HeroContent = validateHero(
  makeHero({
    title: "Our services",
    breadcrumb: "Home / Our Services",
    image: makeSeedImage("labrix-services-hero", 1600, 900),
  }),
);

/** Service list cards. */
export const servicesList: ReadonlyArray<ServiceItem> = validateServices(
  deepFreeze([
    {
      title: "Analytical testing",
      text: "High precision assays with clear reporting cycles.",
       image: "/images/team-2.jpg",
    },
    {
      title: "Biomedical research",
      text: "Custom lab programs built for clinical rigor.",
      image: "/images/service1.png",
    },
    {
      title: "Toxicology analysis",
      text: "Compound safety and validation workflows.",
      image: "/images/service3.png",
    },
    {
      title: "Environmental science",
      text: "Data-driven monitoring for critical environments.",
      image: "/images/service4.png",
    },
    {
      title: "Diagnostics",
      text: "Rapid testing for high confidence decision making.",
      image: "/images/service5.png",
    },
    {
      title: "Innovation lab",
      text: "Prototyping new research pathways with speed.",
      image: "/images/service6.png",
    },
  ]),
);

/** Services performance stats. */
export const servicesStats: ReadonlyArray<StatItem> = validateStats(
  deepFreeze([
    { value: "980", label: "Projects delivered" },
    { value: "4.8", label: "Client satisfaction" },
    { value: "24/7", label: "Lab monitoring" },
    { value: "18", label: "Research hubs" },
  ]),
);

/** Services performance panel content. */
export const servicesPerformance = deepFreeze({
  label: "Performance",
  title: "98% client retention across long-term engagements",
  description:
    "Our lab partners stay with us because we keep clarity and accountability at every stage.",
  cta: { href: "/contact", label: "Start a project" },
});

/** Services engagement panel content. */
export const servicesEngagement = deepFreeze({
  label: "Engagement",
  title: "One team, one roadmap",
   image: "/images/one-team.png",
  description:
    "We operate like an embedded partner with weekly demos, shared channels, and clear milestones.",
});
