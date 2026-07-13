import type { ReactNode } from "react";
import type { IconType } from "react-icons";

/** Supported app environments. */
export type AppEnvironment = "development" | "staging" | "production";

/** Base link shape used across navigation and CTAs. */
export type LinkItem = Readonly<{
  href: string;
  label: string;
}>;

/** Primary navigation item. */
export type NavItem = LinkItem;

/** Hero content block. */
export type HeroContent = Readonly<{
  title: string;
  breadcrumb: string;
  subtitle?: string;
  image: string;
  align?: "center" | "left";
}>;

/** Simple card content with image. */
export type ImageCard = Readonly<{
  title: string;
  text: string;
  image: string;
}>;

/** Service summary card. */
export type ServiceItem = Readonly<{
  title: string;
  text: string;
   image?: string; 
}>;

/** Statistic block. */
export type StatItem = Readonly<{
  value: string;
  label: string;
}>;

/** Blog post summary. */
export type BlogPost = Readonly<{
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}>;

/** Blog category type */
export type BlogCategory = "All" | "Research" | "Lab Life" | "Technology" | "News" | "Interviews";




/** Research field card. */
export type ResearchField = Readonly<{
  title: string;
  description: string;
  image: string;
  icon?: string;
}>;

/** Case study card. */
export type CaseStudy = Readonly<{
  title: string;
  image: string;
  href: string;
}>;

/** FAQ item. */
export type FaqItem = Readonly<{
  q: string;
  a: string;
}>;

/** Testimonial entry. */
export type Testimonial = Readonly<{
  quote: string;
  name: string;
  role: string;
  image?: string;
  video?: string;
}>;

/** Team member profile. */
export type TeamMember = Readonly<{
  name: string;
  role: string;
  image: string;
}>;

/** "What we do" icon list item. */
export type WhatWeDoItem = Readonly<{
  icon: IconType;
  title: string;
  text: string;
}>;

/** "What we do" section data. */
export type WhatWeDoData = Readonly<{
  label: string;
  title: ReactNode;
  description: string;
  cta: LinkItem;
  counter: Readonly<{
    value: number;
    suffix: string;
    title: string;
    text: string;
  }>;
  items: ReadonlyArray<WhatWeDoItem>;
}>;

/** Site-level metadata. */
export type SiteMeta = Readonly<{
  name: string;
  description: string;
  url: string;
}>;

/** Footer configuration. */
export type FooterData = Readonly<{
  description: string;
  newsletterLabel: string;
  newsletterPlaceholder: string;
  newsletterCta: string;
  newsletterAgreement: string;
  quickLinksLabel: string;
  siteNavigationLabel: string;
  servicesLabel: string;
  hoursLabel: string;
  quickLinks: ReadonlyArray<LinkItem>;
  siteNavigation: ReadonlyArray<LinkItem>;
  services: ReadonlyArray<string>;
  hours: ReadonlyArray<Readonly<{ label: string; value: string }>>;
  copyright: string;
}>;

/** Global navigation configuration. */
export type NavigationData = Readonly<{
  items: ReadonlyArray<NavItem>;
  cta: LinkItem;
  brandLabel: string;
}>;

/** Contact details. */
export type ContactDetails = Readonly<{
  email: string;
  location: string;
  phone: string;
}>;

/** Contact form field definition. */
export type ContactFormField = Readonly<{
  type: "text" | "email";
  placeholder: string;
}>;

/** Contact form content. */
export type ContactFormContent = Readonly<{
  label: string;
  title: string;
  description: string;
  cta: string;
  fields: ReadonlyArray<ContactFormField>;
}>;

/** Gallery category union. */
export type GalleryCategory =
  | "All"
  | "Research"
  | "Team"
  | "Facility"
  | "Equipment";

/** Gallery item category (excludes All). */
export type GalleryItemCategory = Exclude<GalleryCategory, "All">;

/** Gallery media item. */
export type GalleryItem = Readonly<{
  id: number;
  type: "image" | "video";
  src: string;
  thumb?: string;
  title: string;
  category: GalleryItemCategory;
}>;
