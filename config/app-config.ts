import type { AppEnvironment } from "@/data/types";

type AppConfig = Readonly<{
  env: AppEnvironment;
  siteUrl: string;
  enableCursorEffects: boolean;
  enableAnimations: boolean;
}>;

function resolveEnv(value: string | undefined): AppEnvironment {
  if (
    value === "development" ||
    value === "staging" ||
    value === "production"
  ) {
    return value;
  }

  if (value !== undefined) {
    throw new Error(
      "NEXT_PUBLIC_APP_ENV must be one of: development, staging, production.",
    );
  }

  if (process.env.VERCEL_ENV === "production") {
    return "production";
  }

  if (process.env.VERCEL_ENV === "preview") {
    return "staging";
  }

  if (process.env.VERCEL_ENV === "development") {
    return "development";
  }

  return process.env.NODE_ENV === "production"
    ? "production"
    : "development";
}

function resolveBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback;

  if (value !== "true" && value !== "false") {
    throw new Error("Feature flags must be provided as 'true' or 'false'.");
  }

  return value === "true";
}

function normalizeAbsoluteUrl(value: string) {
  return new URL(value).toString().replace(/\/$/, "");
}

function resolveBrowserSiteUrl() {
  if (typeof window === "undefined") {
    return null;
  }

  return normalizeAbsoluteUrl(window.location.origin);
}

function normalizeVercelUrl(value: string | undefined) {
  const normalized = value?.trim();

  if (!normalized) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(normalized)
    ? normalized
    : `https://${normalized}`;

  return normalizeAbsoluteUrl(withProtocol);
}

function resolveVercelSiteUrl() {
  const vercelEnv = process.env.VERCEL_ENV;
  const vercelUrlCandidates =
    vercelEnv === "production"
      ? [
          process.env.VERCEL_PROJECT_PRODUCTION_URL,
          process.env.VERCEL_BRANCH_URL,
          process.env.VERCEL_URL,
        ]
      : [
          process.env.VERCEL_BRANCH_URL,
          process.env.VERCEL_URL,
          process.env.VERCEL_PROJECT_PRODUCTION_URL,
        ];

  for (const candidate of vercelUrlCandidates) {
    const resolvedUrl = normalizeVercelUrl(candidate);

    if (resolvedUrl) {
      return resolvedUrl;
    }
  }

  return null;
}

function resolveSiteUrl(value: string | undefined) {
  const normalized = value?.trim();

  if (!normalized) {
    const browserSiteUrl = resolveBrowserSiteUrl();

    if (browserSiteUrl) {
      return browserSiteUrl;
    }

    const vercelSiteUrl = resolveVercelSiteUrl();

    if (vercelSiteUrl) {
      return vercelSiteUrl;
    }

    if (process.env.NODE_ENV === "production") {
      return "http://localhost:3000";
    }

    return "http://localhost:3000";
  }

  try {
    return normalizeAbsoluteUrl(normalized);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
  }
}

class AppConfigManager {
  private static instance: AppConfigManager | null = null;
  private readonly config: AppConfig;

  private constructor() {
    const env = resolveEnv(process.env.NEXT_PUBLIC_APP_ENV);
    const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
    const enableCursorEffects = resolveBoolean(
      process.env.NEXT_PUBLIC_ENABLE_CURSOR,
      true,
    );
    const enableAnimations = resolveBoolean(
      process.env.NEXT_PUBLIC_ENABLE_ANIMATIONS,
      true,
    );

    this.config = Object.freeze({
      env,
      siteUrl,
      enableCursorEffects,
      enableAnimations,
    });
  }

  static getInstance() {
    if (!AppConfigManager.instance) {
      AppConfigManager.instance = new AppConfigManager();
    }

    return AppConfigManager.instance;
  }

  getConfig() {
    return this.config;
  }
}

/** Singleton access to application configuration. */
export const appConfig = AppConfigManager.getInstance().getConfig();
