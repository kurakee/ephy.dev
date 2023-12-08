import type { RequestHandler } from "@builder.io/qwik-city";
import { isDev } from "@builder.io/qwik/build";

export const onRequest: RequestHandler = (event) => {
  if (isDev) return;
  const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const nonce = Array.from({ length: 16 }, () => str[Math.floor(Math.random() * str.length)]).join("");
  event.sharedMap.set("@nonce", nonce);
  const csp = [
    ["default-src", "'self'", "'unsafe-inline'"],
    ["connect-src", "'self'", "data:", "blob:"],
    ["script-src", "'self'", "'unsafe-inline'", "https:", `'nonce-${nonce}'`, "strict-dynamic"],
    ["frame-src", "'self'", `'nonce-${nonce}'`, "*.youtube.com", "*.google.com"],
    ["img-src", "'self'", "*.newt.so", "*.ytimg.com"],
    ["media-src", "'self'", "*.newt.so"],
  ];

  event.headers.set("Content-Security-Policy", csp.map((k) => k.join(" ")).join("; "));
};
