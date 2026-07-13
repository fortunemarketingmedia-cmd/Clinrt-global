import type {
  BlogPost,
  CaseStudy,
  ContactDetails,
  FaqItem,
  FooterData,
  GalleryItem,
  HeroContent,
  ImageCard,
  NavigationData,
  ResearchField,
  ServiceItem,
  StatItem,
  Testimonial,
  TeamMember,
  WhatWeDoData,
} from "./types";

type ValidatorResult<T> = Readonly<T>;

function assertNonEmptyString(value: string, path: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid string at ${path}`);
  }
}

function assertArray<T>(
  value: ReadonlyArray<T>,
  path: string,
  minLength = 1,
) {
  if (!Array.isArray(value) || value.length < minLength) {
    throw new Error(`Invalid array at ${path}`);
  }
}

function assertUnique(values: ReadonlyArray<string>, path: string) {
  const set = new Set(values);
  if (set.size !== values.length) {
    throw new Error(`Duplicate values found at ${path}`);
  }
}

/** Validate hero content. */
export function validateHero(hero: HeroContent): ValidatorResult<HeroContent> {
  assertNonEmptyString(hero.title, "hero.title");
  assertNonEmptyString(hero.breadcrumb, "hero.breadcrumb");
  assertNonEmptyString(hero.image, "hero.image");
  return hero;
}

/** Validate navigation data. */
export function validateNavigation(
  navigation: NavigationData,
): ValidatorResult<NavigationData> {
  assertArray(navigation.items, "navigation.items");
  navigation.items.forEach((item, index) => {
    assertNonEmptyString(item.href, `navigation.items[${index}].href`);
    assertNonEmptyString(item.label, `navigation.items[${index}].label`);
  });
  assertUnique(
    navigation.items.map((item) => item.href),
    "navigation.items.href",
  );
  assertNonEmptyString(navigation.cta.href, "navigation.cta.href");
  assertNonEmptyString(navigation.cta.label, "navigation.cta.label");
  return navigation;
}

/** Validate footer data. */
export function validateFooter(footer: FooterData): ValidatorResult<FooterData> {
  assertNonEmptyString(footer.description, "footer.description");
  assertNonEmptyString(footer.newsletterLabel, "footer.newsletterLabel");
  assertNonEmptyString(
    footer.newsletterPlaceholder,
    "footer.newsletterPlaceholder",
  );
  assertNonEmptyString(footer.newsletterCta, "footer.newsletterCta");
  assertNonEmptyString(footer.newsletterAgreement, "footer.newsletterAgreement");
  assertNonEmptyString(footer.quickLinksLabel, "footer.quickLinksLabel");
  assertNonEmptyString(footer.siteNavigationLabel, "footer.siteNavigationLabel");
  assertNonEmptyString(footer.servicesLabel, "footer.servicesLabel");
  assertNonEmptyString(footer.hoursLabel, "footer.hoursLabel");
  assertArray(footer.quickLinks, "footer.quickLinks");
  assertArray(footer.siteNavigation, "footer.siteNavigation");
  assertArray(footer.services, "footer.services");
  assertArray(footer.hours, "footer.hours");
  footer.quickLinks.forEach((link, index) => {
    assertNonEmptyString(link.href, `footer.quickLinks[${index}].href`);
    assertNonEmptyString(link.label, `footer.quickLinks[${index}].label`);
  });
  footer.siteNavigation.forEach((link, index) => {
    assertNonEmptyString(link.href, `footer.siteNavigation[${index}].href`);
    assertNonEmptyString(link.label, `footer.siteNavigation[${index}].label`);
  });
  return footer;
}

/** Validate image cards. */
export function validateImageCards(
  cards: ReadonlyArray<ImageCard>,
  path = "cards",
): ValidatorResult<ReadonlyArray<ImageCard>> {
  assertArray(cards, path);
  cards.forEach((card, index) => {
    assertNonEmptyString(card.title, `${path}[${index}].title`);
    assertNonEmptyString(card.text, `${path}[${index}].text`);
    assertNonEmptyString(card.image, `${path}[${index}].image`);
  });
  return cards;
}

/** Validate service cards. */
export function validateServices(
  services: ReadonlyArray<ServiceItem>,
): ValidatorResult<ReadonlyArray<ServiceItem>> {
  assertArray(services, "services");
  services.forEach((service, index) => {
    assertNonEmptyString(service.title, `services[${index}].title`);
    assertNonEmptyString(service.text, `services[${index}].text`);
  });
  return services;
}

/** Validate stats. */
export function validateStats(
  stats: ReadonlyArray<StatItem>,
): ValidatorResult<ReadonlyArray<StatItem>> {
  assertArray(stats, "stats");
  stats.forEach((stat, index) => {
    assertNonEmptyString(stat.value, `stats[${index}].value`);
    assertNonEmptyString(stat.label, `stats[${index}].label`);
  });
  return stats;
}

/** Validate blog posts. */
export function validateBlogPosts(
  posts: ReadonlyArray<BlogPost>,
): ValidatorResult<ReadonlyArray<BlogPost>> {
  assertArray(posts, "blogPosts");
  posts.forEach((post, index) => {
    assertNonEmptyString(post.title, `blogPosts[${index}].title`);
    assertNonEmptyString(post.date, `blogPosts[${index}].date`);
    assertNonEmptyString(post.image, `blogPosts[${index}].image`);
  });
  return posts;
}

/** Validate research fields. */
export function validateResearchFields(
  fields: ReadonlyArray<ResearchField>,
): ValidatorResult<ReadonlyArray<ResearchField>> {
  assertArray(fields, "researchFields");
  fields.forEach((field, index) => {
    assertNonEmptyString(field.title, `researchFields[${index}].title`);
    assertNonEmptyString(field.description, `researchFields[${index}].description`);
    assertNonEmptyString(field.image, `researchFields[${index}].image`);
  });
  return fields;
}

/** Validate case studies. */
export function validateCaseStudies(
  cases: ReadonlyArray<CaseStudy>,
): ValidatorResult<ReadonlyArray<CaseStudy>> {
  assertArray(cases, "caseStudies");
  cases.forEach((item, index) => {
    assertNonEmptyString(item.title, `caseStudies[${index}].title`);
    assertNonEmptyString(item.image, `caseStudies[${index}].image`);
    assertNonEmptyString(item.href, `caseStudies[${index}].href`);
  });
  return cases;
}

/** Validate FAQs. */
export function validateFaqs(
  faqs: ReadonlyArray<FaqItem>,
): ValidatorResult<ReadonlyArray<FaqItem>> {
  assertArray(faqs, "faqs");
  faqs.forEach((faq, index) => {
    assertNonEmptyString(faq.q, `faqs[${index}].q`);
    assertNonEmptyString(faq.a, `faqs[${index}].a`);
  });
  return faqs;
}

/** Validate testimonials. */
export function validateTestimonials(
  testimonials: ReadonlyArray<Testimonial>,
): ValidatorResult<ReadonlyArray<Testimonial>> {
  assertArray(testimonials, "testimonials");
  testimonials.forEach((entry, index) => {
    assertNonEmptyString(entry.quote, `testimonials[${index}].quote`);
    assertNonEmptyString(entry.name, `testimonials[${index}].name`);
    assertNonEmptyString(entry.role, `testimonials[${index}].role`);
  });
  return testimonials;
}

/** Validate gallery items. */
export function validateGalleryItems(
  items: ReadonlyArray<GalleryItem>,
): ValidatorResult<ReadonlyArray<GalleryItem>> {
  assertArray(items, "galleryItems");
  items.forEach((item, index) => {
    if (typeof item.id !== "number") {
      throw new Error(`Invalid id at galleryItems[${index}].id`);
    }
    assertNonEmptyString(item.title, `galleryItems[${index}].title`);
    assertNonEmptyString(item.src, `galleryItems[${index}].src`);
    assertNonEmptyString(item.category, `galleryItems[${index}].category`);
  });
  return items;
}

/** Validate team members. */
export function validateTeamMembers(
  members: ReadonlyArray<TeamMember>,
): ValidatorResult<ReadonlyArray<TeamMember>> {
  assertArray(members, "teamMembers");
  members.forEach((member, index) => {
    assertNonEmptyString(member.name, `teamMembers[${index}].name`);
    assertNonEmptyString(member.role, `teamMembers[${index}].role`);
    assertNonEmptyString(member.image, `teamMembers[${index}].image`);
  });
  return members;
}

/** Validate contact details. */
export function validateContactDetails(
  details: ContactDetails,
): ValidatorResult<ContactDetails> {
  assertNonEmptyString(details.email, "contact.email");
  assertNonEmptyString(details.location, "contact.location");
  assertNonEmptyString(details.phone, "contact.phone");
  return details;
}

/** Validate the "what we do" section. */
export function validateWhatWeDo(
  data: WhatWeDoData,
): ValidatorResult<WhatWeDoData> {
  assertNonEmptyString(data.label, "whatWeDo.label");
  assertNonEmptyString(data.description, "whatWeDo.description");
  assertNonEmptyString(data.cta.label, "whatWeDo.cta.label");
  assertNonEmptyString(data.cta.href, "whatWeDo.cta.href");
  assertNonEmptyString(data.counter.title, "whatWeDo.counter.title");
  assertNonEmptyString(data.counter.text, "whatWeDo.counter.text");
  assertArray(data.items, "whatWeDo.items");
  data.items.forEach((item, index) => {
    assertNonEmptyString(item.title, `whatWeDo.items[${index}].title`);
    assertNonEmptyString(item.text, `whatWeDo.items[${index}].text`);
  });
  return data;
}
