import { appConfig } from "@/config/app-config";
import { deepFreeze } from "./utils";
import type { SiteMeta } from "./types";

/** Core site metadata used in layout and SEO. */
export const siteMeta: SiteMeta = deepFreeze({
  name: "ClinRT",
  description: "Connected clinical research technology for faster execution.",
  url: appConfig.siteUrl,
});

/** Shared brand asset path with a version suffix to avoid stale browser caches. */
export const brandLogoSrc = "/images/header-logo.png";
