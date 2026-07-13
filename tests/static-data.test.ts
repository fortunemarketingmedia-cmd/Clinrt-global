import { test } from "node:test";
import assert from "node:assert/strict";
import { appConfig } from "../config/app-config";
import { footerData } from "../data/footer";
import { navigation } from "../data/navigation";
import { siteMeta } from "../data/site";
import {
  aboutHero,
  aboutStoryCards,
  blogHero,
  blogPosts,
  brochures,
  galleryCategories,
  galleryCopy,
  galleryItems,
  contactDetails,
  contactHero,
  homeFaqItems,
  homeMovingWords,
  homeNewsItems,
  homePosterItems,
  homeResearchFields,
  homeWhyChoosePoints,
  servicesHero,
  servicesList,
  servicesStats,
} from "../data";

test("app config has a valid environment", () => {
  assert.ok(["development", "staging", "production"].includes(appConfig.env));
});

test("site metadata is populated", () => {
  assert.ok(siteMeta.name.length > 0);
  assert.ok(siteMeta.description.length > 0);
  assert.ok(siteMeta.url.length > 0);
});

test("navigation and footer data are present", () => {
  assert.ok(navigation.items.length > 0);
  assert.ok(footerData.quickLinks.length > 0);
  assert.ok(footerData.services.length > 0);
});

test("page data collections are populated", () => {
  assert.ok(aboutHero.title.length > 0);
  assert.ok(aboutStoryCards.length > 0);
  assert.ok(blogHero.title.length > 0);
  assert.ok(blogPosts.length > 0);
  assert.ok(brochures.length > 0);
  assert.ok(contactHero.punchline.length > 0);
  assert.ok(homeFaqItems.length > 0);
  assert.ok(homeMovingWords.length > 0);
  assert.ok(homeNewsItems.length > 0);
  assert.ok(homePosterItems.length > 0);
  assert.ok(homeResearchFields.length > 0);
  assert.ok(homeWhyChoosePoints.length > 0);
  assert.ok(servicesHero.title.length > 0);
  assert.ok(servicesList.length > 0);
  assert.ok(servicesStats.length > 0);
  assert.ok(galleryCategories.length > 0);
  assert.ok(galleryItems.length > 0);
  assert.ok(galleryCopy.emptyState.length > 0);
});

test("contact details are consistent", () => {
  assert.ok(contactDetails.email.includes("@"));
  assert.ok(contactDetails.phone.length > 0);
});
