import type { RequestHandler } from "@builder.io/qwik-city";
import { isDev } from "@builder.io/qwik/build";

export const onRequest: RequestHandler = (event) => {
  if (isDev) return;
  const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const nonce = Array.from({ length: 16 }, () => str[Math.floor(Math.random() * str.length)]).join("");
  event.sharedMap.set("@nonce", nonce);
  const csp = [
    ["default-src", "'self'"],
    ["connect-src", "'self'", "data:", "blob:"],
    [
      "script-src",
      "'self'",
      "https:",
      `'nonce-${nonce}'`,
      "strict-dynamic",
      "cdn.iframe.ly",
      "www.googletagmanager.com",
    ],
    ["frame-src", "'self'", `'nonce-${nonce}'`, "*.youtube.com", "*.google.com", "cdn.iframe.ly"],
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
