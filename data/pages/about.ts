import { makeHero, makeSeedImage } from "../factories";
import { deepFreeze } from "../utils";
import type { HeroContent, ImageCard, Testimonial } from "../types";
import {
  validateHero,
  validateImageCards,
  validateTestimonials,
} from "../validators";

/** About page images. */
export const aboutImages = deepFreeze({
  hero: makeSeedImage("labrix-about-hero", 1600, 900),
  card1: makeSeedImage("labrix-about-1", 640, 480),
  card2: makeSeedImage("labrix-about-2", 640, 480),
  card3: makeSeedImage("labrix-about-3", 640, 480),
  wide: makeSeedImage("labrix-about-wide", 1400, 700),
});

/** About page hero. */
export const aboutHero: HeroContent = validateHero(
  makeHero({
    title: "About us",
    breadcrumb: "Home / About Us",
    image: aboutImages.hero,
  }),
);

/** About page story cards. */
export const aboutStoryCards: ReadonlyArray<ImageCard> = validateImageCards(
  deepFreeze([
    {
      title: "How does it work",
      text: "Structured discovery and lab validation.",
      image: aboutImages.card1,
    },
    {
      title: "Research partners",
      text: "Cross-disciplinary collaborations worldwide.",
      image: aboutImages.card2,
    },
    {
      title: "Inside the lab",
      text: "Modern facilities with transparent workflows.",
      image: aboutImages.card3,
    },
  ]),
  "aboutStoryCards",
);

/** About mission block. */
export const aboutMission = deepFreeze({
  label: "Our mission",
  title: "Advancing research with disciplined scientific rigor",
  description:
    "We invest in modern facilities, expert teams, and clear protocols to shorten the distance between questions and answers.",
  cta: { label: "Our services", href: "/services" },
});

/** About intro block. */
export const aboutIntro = deepFreeze({
  label: "About Labrix",
  title:
    "Pioneering scientific research to transform knowledge into real-world solutions",
  description:
    "We are a multidisciplinary lab and research partner committed to reliable results, repeatable processes, and shared outcomes.",
  cta: { label: "Work with us", href: "/contact" },
  proof: "Proven track record across global research partners",
});

/** About secondary stat block. */
export const aboutStat = deepFreeze({
  value: "12+",
  label: "Years of continuous research programs",
  description:
    "Our teams stay embedded in client challenges, providing consistent guidance and scalable research workflows.",
  image: aboutImages.card2,
});

/** About highlight block. */
export const aboutHighlight = deepFreeze({
  value: "98%",
  label: "Environmental science accuracy",
  description:
    "Our lab delivers data-driven insights that protect ecosystems and guide strategic decisions.",
});

/** About testimonials. */
export const aboutTestimonials: ReadonlyArray<Testimonial> =
  validateTestimonials(
    deepFreeze([
      {
        quote:
          "Labrix delivered clarity and momentum to our research program.",
        name: "Elena Ford",
        role: "Chief Scientist, Novalab",
      },
      {
        quote: "Their team kept every stakeholder aligned from week one.",
        name: "Tariq Wells",
        role: "Operations Lead, BioPulse",
      },
    ]),
  );

/** About testimonials header content. */
export const aboutTestimonialsBlock = deepFreeze({
  label: "Testimonials",
  title: "Trusted by research leaders across disciplines",
});
