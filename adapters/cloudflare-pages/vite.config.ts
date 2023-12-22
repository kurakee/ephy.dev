import { cloudflarePagesAdapter } from "@builder.io/qwik-city/adapters/cloudflare-pages/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.cloudflare-pages.tsx", "@qwik-city-plan"],
        external: ["fs", "path"],
      },
    },
    plugins: [
      cloudflarePagesAdapter({
        ssg: {
          include: ["/*"],
          origin: "https://ephy.dev",
          sitemapOutFile: "sitemap.xml",
        },
      }),
    ],
  };
});
