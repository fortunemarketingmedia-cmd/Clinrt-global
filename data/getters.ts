import { footerData } from "./footer";
import { navigation } from "./navigation";
import { siteMeta } from "./site";

/** Safe getter with default fallback. */
export function getOrDefault<T>(value: T | null | undefined, fallback: T): T {
  return value ?? fallback;
}

/** Access the primary navigation items. */
export function getNavItems() {
  return navigation.items;
}

/** Access the primary navigation CTA. */
export function getNavCta() {
  return navigation.cta;
}

/** Access footer data. */
export function getFooterData() {
  return footerData;
}

/** Access site metadata. */
export function getSiteMeta() {
  return siteMeta;
}
