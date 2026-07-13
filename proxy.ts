import { NextRequest, NextResponse } from "next/server";

function buildContentSecurityPolicy(
  isDevelopment: boolean,
  allowSameOriginFrames: boolean,
) {
  const scriptSrc = isDevelopment
    ? "'self' 'unsafe-inline' 'unsafe-eval'"
    : "'self' 'unsafe-inline'";

  const connectSrc = [
    "'self'",
    "https://*.tile.openstreetmap.org",
    ...(isDevelopment ? ["ws:", "wss:"] : []),
  ].join(" ");

  const frameSrc = [
    "'self'",
    "https://www.linkedin.com",
    "https://linkedin.com",
  ].join(" ");

  return `
    default-src 'self';
    script-src ${scriptSrc};
    script-src-attr 'none';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https://images.unsplash.com https://picsum.photos https://tiles.stadiamaps.com https://*.tile.openstreetmap.org;
    media-src 'self' data: blob:;
    font-src 'self' data:;
    connect-src ${connectSrc};
    worker-src 'self' blob:;
    frame-src ${frameSrc};
    frame-ancestors ${allowSameOriginFrames ? "'self'" : "'none'"};
    base-uri 'self';
    form-action 'self';
    object-src 'none';
    ${isDevelopment ? "" : "upgrade-insecure-requests;"}
  `
    .replace(/\s{2,}/gu, " ")
    .trim();
}

export function proxy(request: NextRequest) {
  const isDevelopment = process.env.NODE_ENV !== "production";

  const allowSameOriginFrames =
    request.nextUrl.pathname.startsWith("/brochures/") &&
    request.nextUrl.pathname.endsWith(".pdf");

  const contentSecurityPolicy = buildContentSecurityPolicy(
    isDevelopment,
    allowSameOriginFrames,
  );

  const response = NextResponse.next();

  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicy,
  );

  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin",
  );

  response.headers.set(
    "X-Frame-Options",
    allowSameOriginFrames ? "SAMEORIGIN" : "DENY",
  );

  response.headers.set(
    "X-Content-Type-Options",
    "nosniff",
  );

  if (!isDevelopment) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload",
    );
  }

  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  response.headers.set(
    "X-DNS-Prefetch-Control",
    "on",
  );

  return response;
}

export const config = {
  matcher: "/:path*",
};