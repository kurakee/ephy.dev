import type { RequestHandler } from "@builder.io/qwik-city";
import { isDev } from "@builder.io/qwik/build";

export const onRequest: RequestHandler = (event) => {
  if (isDev) return;
  const csp = [
    ["default-src", "'self'", "'unsafe-inline'"],
    ["connect-src", "'self'", "data:", "blob:"],
    [
      "script-src",
      "'self'",
      "https:",
      "'unsafe-inline'", // あまりよくないが個人サイトなので
      "strict-dynamic",
      "cdn.iframe.ly",
      "www.googletagmanager.com",
    ],
    ["frame-src", "'self'", "*.youtube.com", "*.google.com", "cdn.iframe.ly"],
    [
      "img-src",
      "'self'",
      "*.ephy.dev",
      "*.ytimg.com",
      "images.microcms-assets.io",
      "cdn.iframe.ly",
      "www.googletagmanager.com",
    ],
    ["media-src", "'self'", "*.ephy.dev"],
  ];

  event.headers.set("Content-Security-Policy", csp.map((k) => k.join(" ")).join("; "));
};
