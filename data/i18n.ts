import { deepFreeze } from "./utils";

/** Supported locales for future localization. */
export const i18nConfig = deepFreeze({
  defaultLocale: "en",
  locales: ["en"],
});
