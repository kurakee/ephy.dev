import type { RequestHandler } from "@builder.io/qwik-city";
import { isDev } from "@builder.io/qwik/build";

export const onRequest: RequestHandler = (event) => {
  if (isDev) return; // Will not return CSP headers in dev mode
  const nonce = Date.now().toString(36); // Your custom nonce logic here
  event.sharedMap.set("@nonce", nonce);
  const csp = [
    `default-src 'self' 'unsafe-inline' *.newt.so *.cloudflareaccess.com`,
    `connect-src 'self' data: blob:`,
    `script-src 'self' 'unsafe-inline' https: 'nonce-${nonce}' 'strict-dynamic'`,
    `frame-src 'self' 'nonce-${nonce}' youtube.com *.youtube.com *.ytimg.com *.google.com`,
  ];

  event.headers.set("Content-Security-Policy", csp.join("; "));
};
