import { makeHero } from "../factories";
import { deepFreeze } from "../utils";
import type { GalleryCategory, GalleryItem, HeroContent } from "../types";
import { validateGalleryItems, validateHero } from "../validators";

const imagePool = [
  "/images/service1.png",
  "/images/service2.png",
  "/images/service3.png",
  "/images/service4.png",
  "/images/service5.png",
  "/images/service6.png",
  "/images/about-lab.png",
  "/images/one-team.png",
  "/images/why-choose-image.jpg",
  "/images/why-choose-body-image.jpg",
  "/images/case-study-1.jpg",
  "/images/case-study-2.jpg",
  "/images/case-study-3.jpg",
];

const thumbPool = [
  "/images/about-lab.png",
  "/images/one-team.png",
  "/images/why-choose-image.jpg",
];

const itemCategories = ["Research", "Team", "Facility", "Equipment"] as const;

/** Gallery hero. */
export const galleryHero: HeroContent = validateHero(
  makeHero({
    title: "Gallery",
    breadcrumb: "Home / Gallery",
    image: "/images/why-choose-image.jpg",
  }),
);

/** Gallery categories for filtering. */
export const galleryCategories = deepFreeze([
  "All",
  ...itemCategories,
] as const satisfies ReadonlyArray<GalleryCategory>);

/** Gallery items. */
export const galleryItems: ReadonlyArray<GalleryItem> = validateGalleryItems(
  deepFreeze(
    Array.from({ length: 50 }, (_, index) => {
      const isVideo = index % 4 === 0;
      return {
        id: index + 1,
        type: isVideo ? "video" : "image",
        src: isVideo
          ? "/videos/homePageVideo.mp4"
          : imagePool[index % imagePool.length],
        thumb: isVideo ? thumbPool[index % thumbPool.length] : undefined,
        title: `Gallery Item ${index + 1}`,
        category: itemCategories[index % itemCategories.length],
      };
    }),
  ),
);

/** Gallery page configuration. */
export const galleryConfig = deepFreeze({
  perPage: 9,
});

/** Gallery UI copy. */
export const galleryCopy = deepFreeze({
  emptyState: "No items found",
  endLabel: "End of gallery",
});
